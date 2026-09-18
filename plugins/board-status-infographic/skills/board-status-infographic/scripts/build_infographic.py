#!/usr/bin/env python3
"""
Build a one-page board status infographic (PDF + HTML) from a JSON content spec.

Usage:
    python build_infographic.py spec.json out.pdf [--html out.html] [--page letter|a4]

The spec format is documented in ../references/block-library.md and a worked
example lives in ../references/example-aaif.json.

The script renders HTML+CSS, converts it with WeasyPrint, and then checks the
page count. If the content spills onto a second page it lowers a global scale
factor and re-renders until everything fits on one page (down to a floor), so
the output is always a single page. If it still cannot fit at the floor, it
exits non-zero and tells you which blocks to trim.

Dependencies: weasyprint (pip install weasyprint --break-system-packages).
Page count is read with pypdf if present, otherwise `pdfinfo` from poppler.
"""
import argparse
import html
import json
import shutil
import subprocess
import sys
from pathlib import Path

# --------------------------------------------------------------------------- #
# Defaults
# --------------------------------------------------------------------------- #

DEFAULT_BRAND = {
    "primary": "#12233F",     # deep navy: headers, big numbers
    "accent": "#0B7285",      # teal: highlights, arrows
    "ink": "#1F2933",         # body text
    "muted": "#6B7280",       # labels, sources
    "rule": "#D9DEE5",        # hairlines
    "panel": "#F4F6F9",       # light panel background
    "warn": "#B45309",        # amber: at risk / review
    "danger": "#B91C1C",      # red: off track / vote
    "good": "#15803D",        # green: done / on track
}

ACTION_STYLE = {
    "DISCUSS": ("#E8EEF6", "#12233F"),
    "REVIEW": ("#FDF3E1", "#B45309"),
    "VOTE": ("#FBE4E4", "#B91C1C"),
    "APPROVE": ("#FBE4E4", "#B91C1C"),
    "INFORM": ("#EEF2F5", "#6B7280"),
    "DECIDE": ("#FBE4E4", "#B91C1C"),
}

STATUS_STYLE = {
    "done": ("good", "Done"),
    "on-track": ("good", "On track"),
    "at-risk": ("warn", "At risk"),
    "off-track": ("danger", "Off track"),
    "not-started": ("muted", "Not started"),
}

PAGE_SIZES = {"letter": "8.5in 11in", "a4": "210mm 297mm"}


def esc(s):
    return html.escape(str(s if s is not None else ""))


def cols(n, cap):
    """Explicit column count (WeasyPrint has no auto-fit)."""
    n = max(1, min(n, cap))
    return f'style="grid-template-columns: repeat({n}, 1fr)"'


# --------------------------------------------------------------------------- #
# Block renderers. Each returns an HTML string for one block.
# --------------------------------------------------------------------------- #

def block_header(b):
    out = ['<div class="bhead">']
    out.append(f'<h2>{esc(b.get("title", ""))}</h2>')
    if b.get("subtitle"):
        out.append(f'<span class="bsub">{esc(b["subtitle"])}</span>')
    out.append("</div>")
    return "".join(out)


def render_scorecard(b):
    items = b.get("items", [])
    n = 6 if b.get("width") == "full" else (2 if len(items) in (2, 4) else 3)
    out = [block_header(b), f'<div class="score-grid" {cols(n, 6)}>']
    for it in items:
        out.append('<div class="score">')
        if "from" in it:
            out.append(
                f'<div class="score-val"><span class="from">{esc(it["from"])}</span>'
                f'<span class="arrow">&rarr;</span><span class="to">{esc(it["to"])}</span></div>'
            )
        else:
            out.append(f'<div class="score-val"><span class="to">{esc(it.get("value", ""))}</span></div>')
        out.append(f'<div class="score-label">{esc(it.get("label", ""))}</div>')
        if it.get("note"):
            out.append(f'<div class="score-note">{esc(it["note"])}</div>')
        out.append("</div>")
    out.append("</div>")
    return "".join(out)


def render_stats(b):
    out = [block_header(b)]
    stats = b.get("items", [])
    if stats:
        out.append(f'<div class="stat-row" {cols(len(stats), 4)}>')
        for it in stats:
            out.append(
                f'<div class="stat"><div class="stat-val">{esc(it.get("value", ""))}</div>'
                f'<div class="stat-label">{esc(it.get("label", ""))}</div></div>'
            )
        out.append("</div>")
    tbl = b.get("table")
    if tbl:
        out.append('<div class="mini-table">')
        if tbl.get("title"):
            out.append(f'<div class="mini-title">{esc(tbl["title"])}</div>')
        for row in tbl.get("rows", []):
            cells = "".join(f"<span>{esc(c)}</span>" for c in row)
            out.append(f'<div class="mini-row">{cells}</div>')
        out.append("</div>")
    co = b.get("callout")
    if co:
        out.append(
            f'<div class="callout"><span class="tag">{esc(co.get("tag", ""))}</span> '
            f'{esc(co.get("text", ""))}</div>'
        )
    return "".join(out)


def render_risks(b):
    items = b.get("items", [])
    n = len(items) if len(items) <= 4 else (3 if len(items) in (5, 6) else 4)
    if b.get("width") in ("half", "third"):
        n = min(n, 2)
    out = [block_header(b), f'<div class="risk-grid" {cols(n, 4)}>']
    b = dict(b, items=items)
    for it in b.get("items", []):
        out.append('<div class="risk">')
        if it.get("value"):
            out.append(f'<div class="risk-val">{esc(it["value"])}</div>')
        out.append(
            f'<div class="risk-text"><b>{esc(it.get("label", ""))}</b> {esc(it.get("text", ""))}</div>'
        )
        out.append("</div>")
    out.append("</div>")
    return "".join(out)


def render_goals(b):
    out = [block_header(b), '<table class="goals"><thead><tr>']
    heads = b.get("columns", ["Goal", "KPI", "Target", "Now", "Status"])
    for h in heads:
        out.append(f"<th>{esc(h)}</th>")
    out.append("</tr></thead><tbody>")
    for g in b.get("items", []):
        key, label = STATUS_STYLE.get(g.get("status", "on-track"), ("muted", g.get("status", "")))
        out.append("<tr>")
        out.append(f'<td class="g-goal">{esc(g.get("goal", ""))}</td>')
        out.append(f"<td>{esc(g.get('kpi', ''))}</td>")
        out.append(f"<td>{esc(g.get('target', ''))}</td>")
        out.append(f'<td class="g-now">{esc(g.get("actual", ""))}</td>')
        out.append(f'<td><span class="status status-{key}">{esc(g.get("status_label", label))}</span></td>')
        out.append("</tr>")
        if g.get("note"):
            out.append(f'<tr class="g-note"><td colspan="{len(heads)}">{esc(g["note"])}</td></tr>')
    out.append("</tbody></table>")
    return "".join(out)


def render_numbered(b):
    items = b.get("items", [])
    out = [block_header(b), f'<div class="num-row" {cols(len(items), 6)}>']
    for i, it in enumerate(b.get("items", []), 1):
        if isinstance(it, dict):
            label, detail = it.get("label", ""), it.get("detail", "")
        else:
            label, detail = it, ""
        out.append(
            f'<div class="num"><div class="num-n">{i:02d}</div>'
            f'<div class="num-label">{esc(label)}</div>'
            + (f'<div class="num-detail">{esc(detail)}</div>' if detail else "")
            + "</div>"
        )
    out.append("</div>")
    return "".join(out)


def render_timeline(b):
    out = [block_header(b), '<div class="tl">']
    for it in b.get("items", []):
        out.append(
            f'<div class="tl-item"><div class="tl-when">{esc(it.get("when", ""))}</div>'
            f'<div class="tl-what"><b>{esc(it.get("label", ""))}</b> {esc(it.get("text", ""))}</div></div>'
        )
    out.append("</div>")
    return "".join(out)


def render_bullets(b):
    out = [block_header(b), '<ul class="bul">']
    for it in b.get("items", []):
        if isinstance(it, dict):
            out.append(f'<li><b>{esc(it.get("label", ""))}</b> {esc(it.get("text", ""))}</li>')
        else:
            out.append(f"<li>{esc(it)}</li>")
    out.append("</ul>")
    return "".join(out)


def render_decisions(b):
    out = [block_header(b), '<table class="dec-table">']
    for i, it in enumerate(b.get("items", []), 1):
        action = str(it.get("action", "DISCUSS")).upper()
        bg, fg = ACTION_STYLE.get(action, ACTION_STYLE["DISCUSS"])
        out.append('<tr class="dec">')
        out.append(f'<td class="dec-n">{i}</td>')
        out.append('<td class="dec-body">')
        out.append(f'<div class="dec-q">{esc(it.get("question", ""))}</div>')
        if it.get("detail"):
            out.append(f'<div class="dec-d">{esc(it["detail"])}</div>')
        if it.get("reference"):
            out.append(f'<div class="dec-ref">{esc(it["reference"])}</div>')
        out.append("</td>")
        out.append(
            f'<td class="dec-act"><span class="dec-action" style="background:{bg};color:{fg};border-color:{fg}">{esc(action)}</span></td>'
        )
        out.append("</tr>")
    out.append("</table>")
    return "".join(out)


RENDERERS = {
    "scorecard": render_scorecard,
    "stats": render_stats,
    "risks": render_risks,
    "goals": render_goals,
    "numbered": render_numbered,
    "timeline": render_timeline,
    "bullets": render_bullets,
    "decisions": render_decisions,
}

DEFAULT_WIDTH = {
    "scorecard": "half",
    "stats": "half",
    "risks": "full",
    "goals": "full",
    "numbered": "full",
    "timeline": "half",
    "bullets": "half",
    "decisions": "full",
}


# --------------------------------------------------------------------------- #
# Page assembly
# --------------------------------------------------------------------------- #

def build_html(spec, scale=1.0, page="letter"):
    brand = dict(DEFAULT_BRAND)
    brand.update(spec.get("brand", {}))
    css_vars = "\n".join(f"  --{k}: {v};" for k, v in brand.items())

    blocks_html = []
    for b in spec.get("blocks", []):
        t = b.get("type")
        if t not in RENDERERS:
            raise SystemExit(f"Unknown block type: {t!r}. Known: {sorted(RENDERERS)}")
        width = b.get("width", DEFAULT_WIDTH[t])
        blocks_html.append(f'<section class="block w-{width} t-{t}">{RENDERERS[t](b)}</section>')

    head = spec.get("header", {})
    org = esc(head.get("organization", spec.get("foundation", "")))
    title = esc(head.get("title", ""))
    subtitle = esc(head.get("subtitle", ""))
    byline = esc(head.get("byline", ""))
    when = esc(head.get("date", ""))

    headline = spec.get("headline")
    ask = spec.get("ask")
    footer = spec.get("footer", "")

    return f"""<!doctype html>
<html><head><meta charset="utf-8"><title>{org} board update</title>
<style>
:root {{
{css_vars}
  --s: {scale};
}}
@page {{ size: {PAGE_SIZES[page]}; margin: 0.38in 0.42in 0.36in 0.42in; }}
* {{ box-sizing: border-box; }}
html, body {{ margin:0; padding:0; }}
body {{
  font-family: "Inter", "Helvetica Neue", Helvetica, Arial, "Liberation Sans", sans-serif;
  color: var(--ink); font-size: calc(8.6pt * var(--s)); line-height: 1.28;
}}
b {{ font-weight: 700; }}

/* header */
.masthead {{ display:flex; justify-content:space-between; align-items:flex-end;
  border-bottom: 2.2px solid var(--primary); padding-bottom: calc(5pt*var(--s)); }}
.org {{ font-size: calc(7.4pt*var(--s)); letter-spacing: .26em; text-transform: uppercase;
  color: var(--accent); font-weight: 700; margin-bottom: calc(2pt*var(--s)); }}
.title {{ font-size: calc(19pt*var(--s)); font-weight: 800; color: var(--primary); line-height:1.05; }}
.subtitle {{ font-size: calc(10pt*var(--s)); color: var(--muted); margin-top: calc(2pt*var(--s)); }}
.meta {{ text-align:right; color: var(--muted); font-size: calc(8pt*var(--s)); line-height:1.35; }}
.meta b {{ color: var(--ink); }}

.lede {{ display:grid; grid-template-columns: 1.15fr 1fr; gap: calc(10pt*var(--s));
  margin: calc(7pt*var(--s)) 0 calc(6pt*var(--s)); }}
.headline {{ font-size: calc(12.5pt*var(--s)); font-weight: 700; color: var(--primary);
  line-height:1.2; border-left: 3px solid var(--accent); padding-left: calc(8pt*var(--s)); }}
.ask {{ background: var(--panel); padding: calc(6pt*var(--s)) calc(8pt*var(--s));
  border-radius: 4px; font-size: calc(8.6pt*var(--s)); }}
.ask .tag {{ display:block; font-size: calc(6.8pt*var(--s)); letter-spacing:.18em; text-transform:uppercase;
  color: var(--accent); font-weight:700; margin-bottom: calc(2pt*var(--s)); }}

/* block grid */
.grid {{ display:flex; flex-wrap:wrap; gap: calc(7pt*var(--s)); }}
.block {{ padding-top: calc(5pt*var(--s)); border-top: 1px solid var(--rule); }}
.w-full {{ flex: 1 1 100%; }}
.w-half {{ flex: 1 1 calc(50% - 4pt*var(--s)); min-width: 40%; }}
.w-third {{ flex: 1 1 calc(33.33% - 5pt*var(--s)); min-width: 28%; }}
.w-twothirds {{ flex: 1 1 calc(66.66% - 4pt*var(--s)); min-width: 55%; }}
.bhead {{ display:flex; align-items:baseline; gap: calc(6pt*var(--s)); margin-bottom: calc(4pt*var(--s)); }}
.bhead h2 {{ margin:0; white-space:nowrap; font-size: calc(7.6pt*var(--s)); letter-spacing:.2em; text-transform:uppercase;
  color: var(--primary); font-weight:800; }}
.bsub {{ color: var(--muted); font-size: calc(7.6pt*var(--s)); }}

/* scorecard */
.score-grid {{ display:grid; gap: calc(4pt*var(--s)) calc(8pt*var(--s)); }}
.score-val {{ font-weight: 800; color: var(--primary); font-size: calc(17pt*var(--s)); line-height:1; white-space:nowrap; }}
.score-val .from {{ color: var(--muted); font-weight: 600; font-size: calc(11pt*var(--s)); }}
.score-val .arrow {{ color: var(--accent); font-size: calc(11pt*var(--s)); margin: 0 3px; }}
.score-label {{ font-size: calc(7.8pt*var(--s)); color: var(--ink); margin-top: calc(1.5pt*var(--s)); }}
.score-note {{ font-size: calc(7pt*var(--s)); color: var(--muted); }}

/* stats */
.stat-row {{ display:grid; gap: calc(6pt*var(--s)); }}
.stat-val {{ font-size: calc(19pt*var(--s)); font-weight: 800; color: var(--accent); line-height:1; }}
.stat-label {{ font-size: calc(7.8pt*var(--s)); margin-top: calc(1.5pt*var(--s)); }}
.mini-table {{ margin-top: calc(5pt*var(--s)); }}
.mini-title {{ font-size: calc(7pt*var(--s)); color: var(--muted); text-transform:uppercase; letter-spacing:.1em; margin-bottom:2px; }}
.mini-row {{ display:flex; justify-content:space-between; border-top: 1px solid var(--rule);
  padding: calc(1.6pt*var(--s)) 0; font-size: calc(7.8pt*var(--s)); }}
.mini-row span:last-child {{ font-weight:700; color: var(--primary); }}
.callout {{ margin-top: calc(5pt*var(--s)); background: var(--panel); padding: calc(4.5pt*var(--s)) calc(6pt*var(--s));
  border-radius:3px; font-size: calc(7.9pt*var(--s)); }}
.tag {{ font-size: calc(6.6pt*var(--s)); letter-spacing:.16em; text-transform:uppercase; color: var(--accent); font-weight:800; margin-right:4px; }}

/* risks */
.risk-grid {{ display:grid; gap: calc(6pt*var(--s)); }}
.risk {{ border-left: 2.5px solid var(--warn); padding-left: calc(6pt*var(--s)); }}
.risk-val {{ font-size: calc(15pt*var(--s)); font-weight:800; color: var(--warn); line-height:1; margin-bottom:2px; }}
.risk-text {{ font-size: calc(7.7pt*var(--s)); }}

/* goals table */
table.goals {{ width:100%; border-collapse: collapse; font-size: calc(7.7pt*var(--s)); }}
table.goals th {{ text-align:left; font-size: calc(6.6pt*var(--s)); letter-spacing:.12em; text-transform:uppercase;
  color: var(--muted); font-weight:700; padding: 0 4px calc(2pt*var(--s)) 0; border-bottom: 1px solid var(--rule); }}
table.goals td {{ padding: calc(2.6pt*var(--s)) 4px calc(2.6pt*var(--s)) 0; border-bottom: 1px solid var(--rule); vertical-align: top; }}
td.g-goal {{ font-weight:700; color: var(--primary); width: 34%; }}
td.g-now {{ font-weight:700; }}
tr.g-note td {{ color: var(--muted); font-size: calc(7pt*var(--s)); padding-top:0; border-bottom: 1px solid var(--rule); }}
.status {{ display:inline-block; padding: 1px 6px; border-radius: 9px; font-size: calc(6.6pt*var(--s));
  font-weight:700; letter-spacing:.05em; color:#fff; white-space:nowrap; }}
.status-good {{ background: var(--good); }} .status-warn {{ background: var(--warn); }}
.status-danger {{ background: var(--danger); }} .status-muted {{ background: var(--muted); }}

/* numbered */
.num-row {{ display:grid; gap: calc(6pt*var(--s)); }}
.num-n {{ font-size: calc(13pt*var(--s)); font-weight:800; color: var(--accent); line-height:1; }}
.num-label {{ font-weight:700; color: var(--primary); font-size: calc(8pt*var(--s)); margin-top:2px; }}
.num-detail {{ font-size: calc(7.2pt*var(--s)); color: var(--muted); }}

/* timeline & bullets */
.tl-item {{ display:flex; gap: calc(6pt*var(--s)); padding: calc(2pt*var(--s)) 0; border-bottom: 1px solid var(--rule); font-size: calc(7.8pt*var(--s)); }}
.tl-when {{ min-width: 22%; font-weight:800; color: var(--accent); }}
ul.bul {{ margin: 0; padding-left: calc(11pt*var(--s)); font-size: calc(7.9pt*var(--s)); }}
ul.bul li {{ margin-bottom: calc(2pt*var(--s)); }}

/* decisions */
table.dec-table {{ width:100%; border-collapse: separate; border-spacing: 0 calc(3pt*var(--s)); margin-top: calc(-3pt*var(--s)); }}
tr.dec td {{ background: var(--panel); vertical-align: top; padding: calc(3pt*var(--s)) calc(5pt*var(--s)); }}
tr.dec td:first-child {{ border-radius: 4px 0 0 4px; }}
tr.dec td:last-child {{ border-radius: 0 4px 4px 0; }}
td.dec-n {{ width: 1.4em; font-size: calc(13pt*var(--s)); font-weight:800; color: var(--primary); line-height:1; }}
.dec-q {{ font-weight:700; color: var(--primary); font-size: calc(8.6pt*var(--s)); }}
.dec-d {{ font-size: calc(7.8pt*var(--s)); }}
.dec-ref {{ font-size: calc(6.8pt*var(--s)); color: var(--muted); }}
td.dec-act {{ width: 1%; white-space:nowrap; text-align:right; }}
.dec-action {{ display:inline-block; font-size: calc(6.8pt*var(--s)); font-weight:800; letter-spacing:.16em;
  padding: 2px 8px; border-radius: 3px; border: 1px solid; }}

.footer {{ margin-top: calc(6pt*var(--s)); padding-top: calc(3pt*var(--s)); border-top: 1px solid var(--rule);
  color: var(--muted); font-size: calc(6.6pt*var(--s)); }}
</style></head>
<body>
<div class="masthead">
  <div>
    <div class="org">{org}</div>
    <div class="title">{title}</div>
    {f'<div class="subtitle">{subtitle}</div>' if subtitle else ''}
  </div>
  <div class="meta">{f'<b>{byline}</b><br>' if byline else ''}{when}</div>
</div>
{'<div class="lede">' if (headline or ask) else ''}
{f'<div class="headline">{esc(headline)}</div>' if headline else ''}
{f'<div class="ask"><span class="tag">{esc(spec.get("ask_label", "The ask"))}</span>{esc(ask)}</div>' if ask else ''}
{'</div>' if (headline or ask) else ''}
<div class="grid">
{''.join(blocks_html)}
</div>
{f'<div class="footer">{esc(footer)}</div>' if footer else ''}
</body></html>"""


def count_pages(pdf_path):
    try:
        from pypdf import PdfReader  # type: ignore
        return len(PdfReader(str(pdf_path)).pages)
    except Exception:
        pass
    if shutil.which("pdfinfo"):
        out = subprocess.run(["pdfinfo", str(pdf_path)], capture_output=True, text=True).stdout
        for line in out.splitlines():
            if line.startswith("Pages:"):
                return int(line.split()[1])
    raise SystemExit("Cannot count PDF pages: install pypdf or poppler-utils (pdfinfo).")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("spec")
    ap.add_argument("out_pdf")
    ap.add_argument("--html", help="also write the rendered HTML here")
    ap.add_argument("--page", default="letter", choices=list(PAGE_SIZES))
    ap.add_argument("--min-scale", type=float, default=0.72)
    ap.add_argument("--max-scale", type=float, default=1.18)
    ap.add_argument("--no-grow", action="store_true", help="do not enlarge to fill a light page")
    args = ap.parse_args()

    spec = json.loads(Path(args.spec).read_text())
    try:
        from weasyprint import HTML  # type: ignore
    except ImportError:
        raise SystemExit("weasyprint missing: pip install weasyprint --break-system-packages")

    out_pdf = Path(args.out_pdf)

    def render(sc):
        d = build_html(spec, scale=sc, page=args.page)
        HTML(string=d).write_pdf(str(out_pdf))
        return d, count_pages(out_pdf)

    # Shrink until it fits on one page.
    scale = 1.0
    doc, pages = render(scale)
    while pages > 1:
        if scale <= args.min_scale:
            raise SystemExit(
                f"Still {pages} pages at scale {scale:.2f}. Trim content: fewer items in the largest "
                f"blocks, shorter detail lines, or drop a block. Blocks present: "
                f"{[b['type'] for b in spec.get('blocks', [])]}"
            )
        scale = round(scale - 0.04, 2)
        doc, pages = render(scale)

    # If it fit at 1.0 with room to spare, grow a little so the page is used well.
    if scale == 1.0 and not args.no_grow:
        while scale < args.max_scale:
            trial = round(scale + 0.04, 2)
            d, pgs = render(trial)
            if pgs > 1:
                doc, pages = render(scale)  # restore the last good render
                break
            scale, doc = trial, d

    if args.html:
        Path(args.html).write_text(doc)
    print(f"OK: {out_pdf} (1 page, scale {scale:.2f})")


if __name__ == "__main__":
    main()
