#!/usr/bin/env python3
"""Build the Marketing Impact report (.docx) from the catalog and a data file.

Usage:
  python3 build_report.py --catalog ../references/report_catalog.json \
                          --data report_data.json --out "CNCF Marketing Impact Report 2026-09-23.docx"

The catalog fixes every page, section and item (mirrors the v3 clickable prototype).
The data file carries what the run actually retrieved. Every catalog item is rendered:
  - present in data      -> value / table, with its source line
  - absent from data     -> "Data not available, requires <connector> connector."
Nothing is ever invented by this script. Requires python-docx
(pip install python-docx --break-system-packages).
"""
import argparse, json, datetime, sys
from docx import Document
from docx.shared import Pt, RGBColor, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_BREAK
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

BLUE = RGBColor(0x14, 0x6E, 0xF5)
INK = RGBColor(0x0F, 0x17, 0x2A)
INK2 = RGBColor(0x47, 0x55, 0x69)
INK3 = RGBColor(0x94, 0xA3, 0xB8)
AMBER = RGBColor(0xD9, 0x77, 0x06)
RED = RGBColor(0xE5, 0x48, 0x4D)
GREEN = RGBColor(0x18, 0x9D, 0x5D)
TAG_COLOR = {"DECISION": INK, "SIGNAL": AMBER, "WATCH": INK3}

def shade(cell, hex_fill):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement('w:shd'); shd.set(qn('w:val'), 'clear'); shd.set(qn('w:color'), 'auto'); shd.set(qn('w:fill'), hex_fill)
    tcPr.append(shd)

def run(p, text, size=10, bold=False, italic=False, color=None):
    r = p.add_run(text); r.font.size = Pt(size); r.bold = bold; r.italic = italic
    if color is not None: r.font.color.rgb = color
    return r

def notice(connector, connected):
    """Wording for a missing item."""
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
    if "document" in connector or "tracker" in connector or "tags" in connector:
        return f"Data not available, requires {connector}."
    return f"Data not available, requires {connector} connector."

def add_kpi_grid(doc, items, data, connected):
    """KPI strip: 3 columns x N rows of (label / value / source)."""
    cols = 3
    rows = (len(items) + cols - 1) // cols
    t = doc.add_table(rows=rows * 2, cols=cols)
    t.alignment = WD_TABLE_ALIGNMENT.CENTER
    t.style = 'Table Grid'
    for i, it in enumerate(items):
        r, c = (i // cols) * 2, i % cols
        top, bot = t.cell(r, c), t.cell(r + 1, c)
        shade(top, "F6F8FA")
        p = top.paragraphs[0]; run(p, it["label"], 8.5, color=INK2)
        if it.get("tag"): run(p, f"  {it['tag']}", 7, bold=True, color=TAG_COLOR.get(it["tag"], INK3))
        d = data.get("metrics", {}).get(it["id"])
        p2 = bot.paragraphs[0]
        if d and d.get("value") not in (None, ""):
            run(p2, str(d["value"]), 14, bold=True, color=INK)
            if d.get("detail"): run(p2, f"\n{d['detail']}", 8.5, color=INK2)
            src = d.get("source") or it.get("source")
            run(p2, f"\nSource: {src}" + (f" · as of {d['as_of']}" if d.get("as_of") else ""), 7, italic=True, color=INK3)
        else:
            run(p2, notice(it.get("source", ""), connected), 8.5, italic=True, color=INK3)
    doc.add_paragraph()

def add_table(doc, it, data, connected):
    p = doc.add_paragraph(); run(p, it["label"], 10.5, bold=True, color=INK)
    if it.get("tag"): run(p, f"  {it['tag']}", 7.5, bold=True, color=TAG_COLOR.get(it["tag"], INK3))
    d = data.get("tables", {}).get(it["id"])
    cols = (d or {}).get("columns") or it["columns"]
    rows = (d or {}).get("rows") or []
    if not rows and not it.get("row_sources"):
        q = doc.add_paragraph(); run(q, notice(it.get("source", ""), connected), 9, italic=True, color=INK3)
        if it.get("alt_source"):
            run(q, f"  (partial data possible via {it['alt_source']}.)", 8, italic=True, color=INK3)
        return
    t = doc.add_table(rows=1, cols=len(cols)); t.style = 'Table Grid'
    for j, c in enumerate(cols):
        cell = t.rows[0].cells[j]; shade(cell, "EAF2FE"); run(cell.paragraphs[0], str(c), 8, bold=True, color=BLUE)
    for row in rows:
        cells = t.add_row().cells
        lvl = str(row[0]).strip().upper() if (it["id"] == "defined_campaigns" and row) else ""
        for j in range(len(cols)):
            v = row[j] if j < len(row) else ""
            if lvl == "GOAL": shade(cells[j], "0B1220")
            elif lvl == "CAMPAIGN": shade(cells[j], "EAF2FE")
            run(cells[j].paragraphs[0], "" if v is None else str(v), 8.5, bold=(lvl in ("GOAL", "CAMPAIGN") and j <= 1),
                color=RGBColor(0xFF, 0xFF, 0xFF) if lvl == "GOAL" else INK)
    # rows the run could not fill, by connector (e.g. Paid / Social rows of an inbound table)
    for label, conn in (it.get("row_sources") or {}).items():
        if any(str(r[0]).strip().lower() == label.lower() for r in rows if r): continue
        cells = t.add_row().cells
        run(cells[0].paragraphs[0], label, 8.5, bold=True, color=INK)
        m = cells[1].merge(cells[len(cols) - 1])
        run(m.paragraphs[0], notice(conn, connected), 8.5, italic=True, color=INK3)
    if d and (d.get("source") or d.get("as_of")):
        q = doc.add_paragraph(); run(q, f"Source: {d.get('source', it.get('source'))}" + (f" · as of {d['as_of']}" if d.get("as_of") else ""), 7.5, italic=True, color=INK3)
    if d and d.get("note"):
        q = doc.add_paragraph(); run(q, d["note"], 8.5, color=INK2)

def add_note(doc, it, data, connected):
    p = doc.add_paragraph(); run(p, it["label"], 10.5, bold=True, color=INK)
    txt = data.get("notes", {}).get(it["id"])
    q = doc.add_paragraph()
    if txt: run(q, txt, 9.5, color=INK)
    else: run(q, notice("agent", connected), 9, italic=True, color=INK3)

def build(catalog, data, out):
    connected = data.get("connectors", {"lfx": False, "hubspot": False})
    proj = data.get("project", {}); per = data.get("period", {})
    doc = Document()
    st = doc.styles['Normal']; st.font.name = 'Inter'; st.font.size = Pt(10)
    for s in doc.sections:
        s.left_margin = s.right_margin = Cm(1.8); s.top_margin = s.bottom_margin = Cm(1.6)
    # footer
    fp = doc.sections[0].footer.paragraphs[0]
    run(fp, f"LFX Marketing Dashboard report · {proj.get('name','')} · {per.get('label','')} · generated {data.get('generated', datetime.date.today().isoformat())} · run-marketing-impact-report v{catalog.get('version','')}", 7.5, color=INK3)

    # ---- cover
    p = doc.add_paragraph(); run(p, "LFX Marketing OS", 10, bold=True, color=BLUE)
    p = doc.add_paragraph(); run(p, "Marketing Dashboard", 26, bold=True, color=INK)
    p = doc.add_paragraph(); run(p, "Business Outcomes and Marketing Mediums and Source Metrics", 12, color=INK2)
    p = doc.add_paragraph(); run(p, f"{proj.get('name','(project)')}  ·  {per.get('label','(period)')}", 14, color=INK2)
    p = doc.add_paragraph(); run(p, f"Data window {per.get('start','?')} → {per.get('end','?')} · generated {data.get('generated', datetime.date.today().isoformat())}", 10, color=INK3)
    doc.add_paragraph()
    p = doc.add_paragraph(); run(p, "Connectors used in this run", 11, bold=True, color=INK)
    for name, key in (("LFX", "lfx"), ("HubSpot", "hubspot")):
        p = doc.add_paragraph(); run(p, f"{'●' if connected.get(key) else '○'}  {name}: {'connected' if connected.get(key) else 'not connected'}", 10, color=GREEN if connected.get(key) else INK3)
    others = catalog.get("connectors", {}).get("other", [])
    p = doc.add_paragraph(); run(p, "Not connected in Claude (sections that need them carry a notice): " + ", ".join(others), 8.5, italic=True, color=INK3)
    doc.add_paragraph()
    p = doc.add_paragraph(); run(p, "How to read this report", 11, bold=True, color=INK)
    p = doc.add_paragraph(); run(p, "One page per view of the Marketing Dashboard prototype, in the same hierarchy: All › Summary first, then the tabs under All (Paid, Social, Web, Direct, Defined Campaigns, Budget), then each business outcome (Memberships, Events, Education, Audience, Adoption), then campaign and source detail. Every metric is tagged DECISION (act on it), SIGNAL (context), or WATCH (monitor). Every figure carries its source and as-of date. Where a connector is missing the section stays and says so — nothing is estimated.", 9.5, color=INK2)
    if data.get("summary"):
        doc.add_paragraph(); p = doc.add_paragraph(); run(p, "Executive summary", 11, bold=True, color=INK)
        p = doc.add_paragraph(); run(p, data["summary"], 9.5, color=INK)
    # contents
    doc.add_paragraph(); p = doc.add_paragraph(); run(p, "Contents", 11, bold=True, color=INK)
    order = [pg for lvl in (1, 2, 3) for pg in catalog["pages"] if pg["level"] == lvl]
    for i, pg in enumerate(order, 1):
        p = doc.add_paragraph(); run(p, f"{i}.  {pg['title']}", 9.5, color=INK2)

    # ---- pages
    for i, pg in enumerate(order, 1):
        doc.add_paragraph().add_run().add_break(WD_BREAK.PAGE)
        p = doc.add_paragraph(); run(p, {1: "BUSINESS OUTCOME", 2: "UNDER ALL OUTCOMES", 3: "CAMPAIGN · SOURCE DETAIL"}[pg["level"]], 8, bold=True, color=INK3)
        p = doc.add_paragraph(); run(p, f"{i}. {pg['title']}", 18, bold=True, color=INK)
        p = doc.add_paragraph(); run(p, pg["question"], 12, bold=True, color=BLUE)
        p = doc.add_paragraph(); run(p, pg["subtitle"], 9, color=INK3)
        for sec in pg["sections"]:
            p = doc.add_paragraph(); run(p, sec["title"], 12, bold=True, color=INK)
            if sec.get("subtitle"): run(p, f"\n{sec['subtitle']}", 8.5, color=INK3)
            kpis = [it for it in sec["items"] if it["kind"] == "kpi"]
            if kpis: add_kpi_grid(doc, kpis, data, connected)
            for it in sec["items"]:
                if it["kind"] == "table": add_table(doc, it, data, connected)
                elif it["kind"] == "note": add_note(doc, it, data, connected)
        pn = data.get("page_notes", {}).get(pg["id"])
        if pn:
            p = doc.add_paragraph(); run(p, "Reading this page: ", 9, bold=True, color=INK2); run(p, pn, 9, color=INK2)

    # ---- appendix: coverage
    doc.add_paragraph().add_run().add_break(WD_BREAK.PAGE)
    p = doc.add_paragraph(); run(p, "Appendix · Data coverage", 18, bold=True, color=INK)
    p = doc.add_paragraph(); run(p, "Every item in the report, whether it was filled, and which connector it needs.", 9, color=INK3)
    t = doc.add_table(rows=1, cols=4); t.style = 'Table Grid'
    for j, c in enumerate(["Page", "Item", "Connector", "Status"]):
        cell = t.rows[0].cells[j]; shade(cell, "EAF2FE"); run(cell.paragraphs[0], c, 8, bold=True, color=BLUE)
    filled = total = 0
    for pg in order:
        for sec in pg["sections"]:
            for it in sec["items"]:
                total += 1
                ok = (it["id"] in data.get("metrics", {}) and data["metrics"][it["id"]].get("value") not in (None, "")) \
                     or (it["id"] in data.get("tables", {}) and data["tables"][it["id"]].get("rows")) \
                     or (it["id"] in data.get("notes", {}))
                filled += bool(ok)
                cells = t.add_row().cells
                for j, v in enumerate([pg["title"], it["label"], it.get("source", ""), "filled" if ok else "not available"]):
                    run(cells[j].paragraphs[0], v, 8, color=GREEN if (j == 3 and ok) else INK)
    p = doc.add_paragraph(); run(p, f"{filled} of {total} items filled from live data.", 9.5, bold=True, color=INK)
    doc.save(out)
    print(f"saved {out} · {len(order)} pages · {filled}/{total} items filled")

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--catalog", required=True); ap.add_argument("--data", required=True); ap.add_argument("--out", required=True)
    a = ap.parse_args()
    build(json.load(open(a.catalog)), json.load(open(a.data)), a.out)
