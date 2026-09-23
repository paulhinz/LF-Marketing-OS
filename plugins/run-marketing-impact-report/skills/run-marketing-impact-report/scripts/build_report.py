#!/usr/bin/env python3
"""Build the Marketing Dashboard report (.docx) on the LF Agent DOCS Template.

Usage:
  python3 build_report.py --catalog ../references/report_catalog.json \
                          --data report_data.json --out "CNCF Marketing Impact Report 2026-09-23.docx"
                          [--brand brand.json] [--formatter <lf-output-formatter/scripts dir>] [--md-only]

Pipeline: catalog + data → Markdown with LF front matter (report.md next to the output)
→ lf-output-formatter build_doc.py → .docx on the LF Agent DOCS Template.
The formatter is bundled under scripts/lf/ (build_doc.py, build_lf_doc.py, lfbrand.py) with the
template in ../assets/; --formatter points at another copy (e.g. the installed lf-output-formatter
plugin) when you want that one instead.

Every catalog item is rendered whether or not data exists:
  - present in data      -> value / table, with its source line
  - absent from data     -> "Data not available, requires <connector> connector."
Nothing is ever invented by this script.
"""
import argparse, json, datetime, subprocess, sys, os
from pathlib import Path

HERE = Path(__file__).resolve().parent

def notice(connector, connected):
    if connector == "LFX":
        return ("Data not available — the LFX query returned no rows for this project and period."
                if connected.get("lfx") else "Data not available, requires LFX connector.")
    if connector == "HubSpot":
        return ("Data not available — HubSpot returned no rows for this query."
                if connected.get("hubspot") else "Data not available, requires HubSpot connector.")
    if connector == "agent":
        return "Not written — no live figures were available to base this on."
    if connector == "mixed":
        return "Data not available for every medium — see per-row notices."
    if "document" in connector or "tracker" in connector or "tags" in connector or "Brief" in connector:
        return f"Data not available, requires {connector}."
    return f"Data not available, requires {connector} connector."

def esc(s):
    return str(s).replace("|", "\\|").replace("\n", "<br>") if s is not None else ""

def tag(t):
    return f" `{t}`" if t else ""

def kpi_table(items, data, connected):
    out = ["| Metric | Value | Detail | Source |", "|---|---|---|---|"]
    for it in items:
        d = data.get("metrics", {}).get(it["id"])
        label = f"**{esc(it['label'])}**{tag(it.get('tag'))}"
        if d and d.get("value") not in (None, ""):
            src = d.get("source") or it.get("source", "")
            if d.get("as_of"): src += f" · as of {d['as_of']}"
            out.append(f"| {label} | **{esc(d['value'])}** | {esc(d.get('detail',''))} | {esc(src)} |")
        else:
            out.append(f"| {label} | — | *{esc(notice(it.get('source',''), connected))}* | |")
    return "\n".join(out)

def data_table(it, data, connected):
    lines = [f"#### {it['label']}{tag(it.get('tag'))}"]
    d = data.get("tables", {}).get(it["id"])
    cols = (d or {}).get("columns") or it["columns"]
    rows = list((d or {}).get("rows") or [])
    row_sources = it.get("row_sources") or {}
    # per-medium notice rows for tables that mix connectors
    for label, conn in row_sources.items():
        if any(str(r[0]).strip().lower() == label.lower() for r in rows if r):
            continue
        rows.append([label, f"*{notice(conn, connected)}*"] + [""] * (len(cols) - 2))
    if not rows:
        lines.append(f"*{notice(it.get('source',''), connected)}*"
                     + (f" Partial data possible via {it['alt_source']}." if it.get("alt_source") else ""))
        return "\n".join(lines)
    lines.append("| " + " | ".join(esc(c) for c in cols) + " |")
    lines.append("|" + "---|" * len(cols))
    for r in rows:
        cells = [esc(r[j]) if j < len(r) else "" for j in range(len(cols))]
        if it["id"] == "defined_campaigns" and cells:
            lvl = cells[0].strip().upper()
            if lvl == "GOAL":
                cells = [f"**{c}**" if c else "" for c in cells]
            elif lvl == "TACTIC" and len(cells) > 1:
                cells[1] = "· " + cells[1]
        lines.append("| " + " | ".join(cells) + " |")
    if d and (d.get("source") or d.get("as_of")):
        lines.append(f"\n*Source: {esc(d.get('source', it.get('source','')))}"
                     + (f" · as of {d['as_of']}" if d.get("as_of") else "") + "*")
    if d and d.get("note"):
        lines.append(f"\n{d['note']}")
    return "\n".join(lines)

def note_block(it, data, connected):
    txt = data.get("notes", {}).get(it["id"])
    return f"#### {it['label']}\n\n" + (txt if txt else f"*{notice('agent', connected)}*")

def build_markdown(catalog, data):
    connected = data.get("connectors", {"lfx": False, "hubspot": False})
    proj = data.get("project", {}); per = data.get("period", {})
    gen = data.get("generated", datetime.date.today().isoformat())
    pages = list(catalog["pages"])
    fm = [
        "---",
        f"project_name: {proj.get('name','(project)')}",
        "document_type: Marketing Dashboard",
        f"document_status: {per.get('label','(period)')} · data through {per.get('end','?')}",
        f"other_details: run-marketing-impact-report v{catalog.get('version','')}",
        "platform: LFX Marketing OS",
        "agent_source: Marketing Impact Report Agent",
        f"date: {datetime.date.fromisoformat(gen).strftime('%B %d, %Y')}",
        "subtitle: Business Outcomes and Marketing Mediums and Source Metrics",
        "details:",
        f"  - Project={proj.get('name','')} ({proj.get('slug','')})",
        f"  - Period={per.get('label','')} · {per.get('start','?')} → {per.get('end','?')}",
        f"  - Connectors=LFX {'connected' if connected.get('lfx') else 'not connected'} · HubSpot {'connected' if connected.get('hubspot') else 'not connected'}",
        f"  - Prototype={catalog.get('prototype','')}",
        "  - Prepared for=Project leadership and marketing lead",
        "cover: true",
        "---",
    ]
    md = ["\n".join(fm), ""]
    # front section
    md.append("# How to read this report")
    md.append("One page per view of the Marketing Dashboard prototype, in the same hierarchy: **All › Summary**, then the tabs under All (**Paid, Social, Web, Direct, Defined Campaigns, Budget**), then each business outcome (**Memberships, Events, Education, Audience, Adoption**), then campaign and source detail. Every metric is tagged `DECISION` (act on it), `SIGNAL` (context) or `WATCH` (monitor). Every figure carries its source and as-of date. Where a connector is missing the section stays and says so — nothing is estimated.")
    others = catalog.get("connectors", {}).get("other", [])
    md.append(f"Connectors in this run: **LFX** {'connected' if connected.get('lfx') else 'not connected'}; **HubSpot** {'connected' if connected.get('hubspot') else 'not connected'}. Not connected in Claude today (sections that need them carry a notice): {', '.join(others)}.")
    if data.get("summary"):
        md.append("## Executive summary")
        md.append(data["summary"])
    md.append("## Contents")
    md.append("\n".join(f"{i}. {pg['title']}" for i, pg in enumerate(pages, 1)))
    lvl_label = {1: "Business outcome", 2: "Under All outcomes", 3: "Campaign and source detail"}
    for i, pg in enumerate(pages, 1):
        md.append("<<<PAGEBREAK>>>")
        md.append(f"# {i}. {pg['title']}")
        md.append(f"## {pg['question']}")
        md.append(f"*{lvl_label.get(pg['level'],'')} · {pg['subtitle']}*")
        for sec in pg["sections"]:
            md.append(f"### {sec['title']}")
            if sec.get("subtitle"):
                md.append(f"*{sec['subtitle']}*")
            kpis = [it for it in sec["items"] if it["kind"] == "kpi"]
            if kpis:
                md.append(kpi_table(kpis, data, connected))
            for it in sec["items"]:
                if it["kind"] == "table":
                    md.append(data_table(it, data, connected))
                elif it["kind"] == "note":
                    md.append(note_block(it, data, connected))
        pn = data.get("page_notes", {}).get(pg["id"])
        if pn:
            md.append(f"> **Reading this page.** {pn}")
    # appendix
    md.append("<<<PAGEBREAK>>>")
    md.append("# Appendix · Data coverage")
    md.append("Every item in the report, whether it was filled, and which connector it needs.")
    md.append("| Page | Item | Connector | Status |\n|---|---|---|---|")
    filled = total = 0
    for pg in pages:
        for sec in pg["sections"]:
            for it in sec["items"]:
                total += 1
                ok = (it["id"] in data.get("metrics", {}) and data["metrics"][it["id"]].get("value") not in (None, "")) \
                     or (it["id"] in data.get("tables", {}) and data["tables"][it["id"]].get("rows")) \
                     or (it["id"] in data.get("notes", {}))
                filled += bool(ok)
                md.append(f"| {esc(pg['title'])} | {esc(it['label'])} | {esc(it.get('source',''))} | {'**filled**' if ok else 'not available'} |")
    md.append(f"\n**{filled} of {total} items filled from live data.**")
    return "\n\n".join(md), filled, total

def find_formatter(explicit):
    cands = []
    if explicit: cands.append(Path(explicit))
    cands.append(HERE / "lf")
    env = os.environ.get("LF_OUTPUT_FORMATTER")
    if env: cands.append(Path(env))
    for c in cands:
        if (c / "build_doc.py").exists():
            return c
    return None

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--catalog", required=True); ap.add_argument("--data", required=True); ap.add_argument("--out", required=True)
    ap.add_argument("--brand", help="brand.json for a foundation re-skin (lf-output-formatter schema)")
    ap.add_argument("--formatter", help="path to an lf-output-formatter scripts directory (default: bundled scripts/lf)")
    ap.add_argument("--md-only", action="store_true", help="write the Markdown and stop")
    a = ap.parse_args()
    catalog = json.load(open(a.catalog)); data = json.load(open(a.data))
    md, filled, total = build_markdown(catalog, data)
    md_path = Path(a.out).with_suffix(".md")
    md_path.write_text(md, encoding="utf-8")
    print(f"wrote {md_path} · {len(catalog['pages'])} pages · {filled}/{total} items filled")
    if a.md_only:
        return
    fmt = find_formatter(a.formatter)
    if not fmt:
        sys.exit("lf-output-formatter not found: bundle it under scripts/lf/ or pass --formatter <dir>")
    cmd = [sys.executable, str(fmt / "build_doc.py"), str(md_path), a.out]
    if a.brand: cmd += ["--brand", a.brand]
    subprocess.run(cmd, check=True)
    print(f"saved {a.out} on the LF Agent DOCS Template ({'brand ' + a.brand if a.brand else 'LF default'})")

if __name__ == "__main__":
    main()
