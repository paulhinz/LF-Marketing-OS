#!/usr/bin/env python3
"""
build_lf_doc.py — render a Markdown document onto the LF Agent DOCS Template.

Produces a Google Docs-ready .docx that follows the Linux Foundation "LF Agent
DOCS Template" (Open Sans body, Roboto Slab headings, LF logo header, centered
footer) with:

  * a cover page carrying the project's name, logo, document type, subtitle,
    an accent rule in the project's primary brand color, and a details table;
  * the project's primary / secondary brand colors applied to the cover
    accent, H1/H2/H3 headings and table header fills (fonts and layout stay
    on the template — "colors only" brand styling);
  * the template header  "{Project_Name} {Document_Type} · {Document_Status} · {Other_Details}"
    and footer            "{Platform} {Agent_Source} · {Date} · {Page_Number}" filled in;
  * Markdown → Word mapping: #..##### headings, paragraphs with **bold**,
    *italic*, `code` and [links](url), bullet and numbered lists (nested by
    indentation), GFM pipe tables, > blockquotes, fenced code blocks, --- rules,
    and a literal line "<<<PAGEBREAK>>>" for a manual page break.

Usage
-----
python3 build_lf_doc.py \
    --content "OpenSearch Brand Kit.md" \
    --out "OpenSearch Brand Kit.docx" \
    --project "OpenSearch" \
    --doc-type "Brand Kit" \
    --status "DRAFT — pre-filled, awaiting ED review" \
    --subtitle "Foundational identity, voice, positioning and visual direction — one of three LFX Marketing OS documents" \
    --agent "Brand Kit Agent" \
    --logo opensearch-logo.svg \
    --primary "#005EB8" --secondary "#00A3E0" \
    --detail "Repository=https://github.com/opensearch-project" \
    --detail "Prepared for=OpenSearch Software Foundation" \
    --detail "Prepared by=LFX Marketing OS — Brand Kit Agent"

Requires python-docx (and ImageMagick `convert` only for SVG logos). The
template .docx is looked up next to this script at
../assets/lf-agent-docs-template.docx unless --template is given.
"""

import argparse
import copy
import datetime as _dt
import os
import re
import shutil
import subprocess
import sys
import tempfile

try:
    import docx  # python-docx
    from docx.enum.section import WD_SECTION
    from docx.enum.table import WD_TABLE_ALIGNMENT
    from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_BREAK
    from docx.oxml import OxmlElement
    from docx.oxml.ns import qn
    from docx.shared import Emu, Inches, Pt, RGBColor
except ImportError:  # pragma: no cover
    sys.exit("python-docx is required: pip install python-docx --break-system-packages")

try:
    from PIL import Image
except ImportError:  # pragma: no cover
    Image = None

HERE = os.path.dirname(os.path.abspath(__file__))
DEFAULT_TEMPLATE = os.path.join(HERE, "..", "assets", "lf-agent-docs-template.docx")

TEMPLATE_DARK = "222222"      # template table-header fill / cover fallback
TEMPLATE_BORDER = "D5D5D5"    # template table border
TEMPLATE_ZEBRA = "F1F1F1"     # template alternate row fill
TEMPLATE_META = "434343"      # header / footer text color
BODY_PT = 9                   # template body size (w:sz 18)
TEXT_DARK = "222222"

# --------------------------------------------------------------------------
# color helpers
# --------------------------------------------------------------------------

def norm_hex(value, fallback=None):
    if not value:
        return fallback
    v = value.strip().lstrip("#")
    if len(v) == 3:
        v = "".join(ch * 2 for ch in v)
    if not re.fullmatch(r"[0-9A-Fa-f]{6}", v):
        raise SystemExit(f"Bad color '{value}' — use #RRGGBB")
    return v.upper()


def _lum(hex6):
    def chan(c):
        c = int(c, 16) / 255.0
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = chan(hex6[0:2]), chan(hex6[2:4]), chan(hex6[4:6])
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast(a, b):
    la, lb = _lum(a), _lum(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)


def darken(hex6, factor=0.75):
    r, g, b = (int(hex6[i:i + 2], 16) for i in (0, 2, 4))
    return "%02X%02X%02X" % (int(r * factor), int(g * factor), int(b * factor))


def readable_on_white(hex6):
    """Return the color itself if it passes WCAG AA (4.5:1) as text on white,
    otherwise a darkened version that does."""
    c = hex6
    for _ in range(8):
        if contrast(c, "FFFFFF") >= 4.5:
            return c
        c = darken(c, 0.8)
    return TEXT_DARK


def header_fill_and_text(primary):
    """Table header: brand fill with white text if that passes AA, else brand
    fill with dark text if that passes, else the template's dark fill."""
    if not primary:
        return TEMPLATE_DARK, "FFFFFF"
    if contrast(primary, "FFFFFF") >= 4.5:
        return primary, "FFFFFF"
    if contrast(primary, TEXT_DARK) >= 4.5:
        return primary, TEXT_DARK
    return TEMPLATE_DARK, "FFFFFF"


# --------------------------------------------------------------------------
# low-level docx helpers
# --------------------------------------------------------------------------

def set_cell_shading(cell, fill_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:fill"), fill_hex)
    tcPr.append(shd)


def set_cell_margins(cell, top=70, left=90, bottom=70, right=90):
    tcPr = cell._tc.get_or_add_tcPr()
    mar = OxmlElement("w:tcMar")
    for side, val in (("top", top), ("left", left), ("bottom", bottom), ("right", right)):
        el = OxmlElement(f"w:{side}")
        el.set(qn("w:w"), str(val))
        el.set(qn("w:type"), "dxa")
        mar.append(el)
    tcPr.append(mar)


def set_cell_borders(cell, color=TEMPLATE_BORDER, sz=4, sides=("top", "left", "bottom", "right")):
    tcPr = cell._tc.get_or_add_tcPr()
    borders = OxmlElement("w:tcBorders")
    for side in sides:
        el = OxmlElement(f"w:{side}")
        el.set(qn("w:val"), "single")
        el.set(qn("w:sz"), str(sz))
        el.set(qn("w:space"), "0")
        el.set(qn("w:color"), color)
        borders.append(el)
    tcPr.append(borders)


def set_table_borders(table, color=TEMPLATE_BORDER, sz=4):
    tblPr = table._tbl.tblPr
    borders = OxmlElement("w:tblBorders")
    for side in ("top", "left", "bottom", "right", "insideH", "insideV"):
        el = OxmlElement(f"w:{side}")
        el.set(qn("w:val"), "single")
        el.set(qn("w:sz"), str(sz))
        el.set(qn("w:space"), "0")
        el.set(qn("w:color"), color)
        borders.append(el)
    tblPr.append(borders)


def set_repeat_header(row):
    trPr = row._tr.get_or_add_trPr()
    el = OxmlElement("w:tblHeader")
    el.set(qn("w:val"), "1")
    trPr.append(el)


def set_col_widths(table, widths_in):
    """Fixed layout: write the grid, the table width and every cell width so
    Word, LibreOffice and Google Docs all honor the same columns."""
    table.autofit = False
    tbl = table._tbl
    tblPr = tbl.tblPr
    layout = OxmlElement("w:tblLayout"); layout.set(qn("w:type"), "fixed"); tblPr.append(layout)
    tblW = tblPr.find(qn("w:tblW"))
    if tblW is None:
        tblW = OxmlElement("w:tblW"); tblPr.append(tblW)
    tblW.set(qn("w:type"), "dxa"); tblW.set(qn("w:w"), str(int(sum(widths_in) * 1440)))
    grid = tbl.tblGrid
    for gc in list(grid):
        grid.remove(gc)
    for w in widths_in:
        gc = OxmlElement("w:gridCol"); gc.set(qn("w:w"), str(int(w * 1440))); grid.append(gc)
    for row in table.rows:
        for idx, w in enumerate(widths_in):
            if idx < len(row.cells):
                row.cells[idx].width = Inches(w)


def para_border_bottom(paragraph, color, sz=12, space=1):
    pPr = paragraph._p.get_or_add_pPr()
    pbdr = OxmlElement("w:pBdr")
    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), "single")
    bottom.set(qn("w:sz"), str(sz))
    bottom.set(qn("w:space"), str(space))
    bottom.set(qn("w:color"), color)
    pbdr.append(bottom)
    pPr.append(pbdr)


def para_border_left(paragraph, color, sz=18, space=8):
    pPr = paragraph._p.get_or_add_pPr()
    pbdr = OxmlElement("w:pBdr")
    left = OxmlElement("w:left")
    left.set(qn("w:val"), "single")
    left.set(qn("w:sz"), str(sz))
    left.set(qn("w:space"), str(space))
    left.set(qn("w:color"), color)
    pbdr.append(left)
    pPr.append(pbdr)


def para_shading(paragraph, fill_hex):
    pPr = paragraph._p.get_or_add_pPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:fill"), fill_hex)
    pPr.append(shd)


def add_field(run, instr):
    """Insert a simple field (e.g. PAGE) into a run."""
    fld_begin = OxmlElement("w:fldChar")
    fld_begin.set(qn("w:fldCharType"), "begin")
    instr_el = OxmlElement("w:instrText")
    instr_el.set(qn("xml:space"), "preserve")
    instr_el.text = f" {instr} "
    fld_sep = OxmlElement("w:fldChar")
    fld_sep.set(qn("w:fldCharType"), "separate")
    txt = OxmlElement("w:t")
    txt.text = "1"
    fld_end = OxmlElement("w:fldChar")
    fld_end.set(qn("w:fldCharType"), "end")
    for el in (fld_begin, instr_el, fld_sep, txt, fld_end):
        run._r.append(el)


def add_hyperlink(paragraph, url, text, color="1155CC", size_pt=None, bold=False, italic=False):
    part = paragraph.part
    r_id = part.relate_to(url, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink", is_external=True)
    hyperlink = OxmlElement("w:hyperlink")
    hyperlink.set(qn("r:id"), r_id)
    new_run = OxmlElement("w:r")
    rPr = OxmlElement("w:rPr")
    c = OxmlElement("w:color"); c.set(qn("w:val"), color); rPr.append(c)
    u = OxmlElement("w:u"); u.set(qn("w:val"), "single"); rPr.append(u)
    if size_pt:
        sz = OxmlElement("w:sz"); sz.set(qn("w:val"), str(int(size_pt * 2))); rPr.append(sz)
        szcs = OxmlElement("w:szCs"); szcs.set(qn("w:val"), str(int(size_pt * 2))); rPr.append(szcs)
    if bold:
        rPr.append(OxmlElement("w:b"))
    if italic:
        rPr.append(OxmlElement("w:i"))
    new_run.append(rPr)
    t = OxmlElement("w:t"); t.text = text; t.set(qn("xml:space"), "preserve")
    new_run.append(t)
    hyperlink.append(new_run)
    paragraph._p.append(hyperlink)


def ensure_decimal_numbering(document):
    """The template ships a bullet list definition (numId 1). Add a decimal one
    and return its numId."""
    numbering = document.part.numbering_part.element
    abstract_ids = [int(a.get(qn("w:abstractNumId"))) for a in numbering.findall(qn("w:abstractNum"))]
    num_ids = [int(n.get(qn("w:numId"))) for n in numbering.findall(qn("w:num"))]
    new_abs = max(abstract_ids + [0]) + 1
    new_num = max(num_ids + [0]) + 1

    abstract = OxmlElement("w:abstractNum")
    abstract.set(qn("w:abstractNumId"), str(new_abs))
    ml = OxmlElement("w:multiLevelType"); ml.set(qn("w:val"), "hybridMultilevel"); abstract.append(ml)
    fmts = ["decimal", "lowerLetter", "lowerRoman"]
    for lvl in range(9):
        l = OxmlElement("w:lvl"); l.set(qn("w:ilvl"), str(lvl))
        st = OxmlElement("w:start"); st.set(qn("w:val"), "1"); l.append(st)
        nf = OxmlElement("w:numFmt"); nf.set(qn("w:val"), fmts[lvl % 3]); l.append(nf)
        lt = OxmlElement("w:lvlText"); lt.set(qn("w:val"), f"%{lvl + 1}."); l.append(lt)
        jc = OxmlElement("w:lvlJc"); jc.set(qn("w:val"), "left"); l.append(jc)
        pPr = OxmlElement("w:pPr")
        ind = OxmlElement("w:ind"); ind.set(qn("w:left"), str(720 * (lvl + 1))); ind.set(qn("w:hanging"), "360")
        pPr.append(ind); l.append(pPr)
        abstract.append(l)
    # abstractNum elements must precede num elements
    first_num = numbering.find(qn("w:num"))
    if first_num is not None:
        first_num.addprevious(abstract)
    else:
        numbering.append(abstract)
    num = OxmlElement("w:num"); num.set(qn("w:numId"), str(new_num))
    ref = OxmlElement("w:abstractNumId"); ref.set(qn("w:val"), str(new_abs)); num.append(ref)
    numbering.append(num)
    return new_num


def restart_numbering(document, base_num_id):
    """Create a fresh w:num pointing at the same abstractNum as base_num_id,
    with a level override that restarts at 1. Returns the new numId."""
    numbering = document.part.numbering_part.element
    base = None
    for n in numbering.findall(qn("w:num")):
        if n.get(qn("w:numId")) == str(base_num_id):
            base = n
            break
    if base is None:
        return base_num_id
    abs_id = base.find(qn("w:abstractNumId")).get(qn("w:val"))
    num_ids = [int(n.get(qn("w:numId"))) for n in numbering.findall(qn("w:num"))]
    new_id = max(num_ids) + 1
    num = OxmlElement("w:num"); num.set(qn("w:numId"), str(new_id))
    ref = OxmlElement("w:abstractNumId"); ref.set(qn("w:val"), abs_id); num.append(ref)
    ov = OxmlElement("w:lvlOverride"); ov.set(qn("w:ilvl"), "0")
    so = OxmlElement("w:startOverride"); so.set(qn("w:val"), "1"); ov.append(so)
    num.append(ov)
    numbering.append(num)
    return new_id


def set_list_paragraph(paragraph, num_id, level):
    pPr = paragraph._p.get_or_add_pPr()
    numPr = OxmlElement("w:numPr")
    ilvl = OxmlElement("w:ilvl"); ilvl.set(qn("w:val"), str(level)); numPr.append(ilvl)
    nid = OxmlElement("w:numId"); nid.set(qn("w:val"), str(num_id)); numPr.append(nid)
    pPr.append(numPr)
    paragraph.paragraph_format.left_indent = Emu(720 * 635 * (level + 1))  # 720 twips per level
    paragraph.paragraph_format.first_line_indent = Emu(-360 * 635)


# --------------------------------------------------------------------------
# inline markdown → runs
# --------------------------------------------------------------------------

INLINE_RE = re.compile(
    r"(\*\*\*(?P<bi>.+?)\*\*\*)"
    r"|(\*\*(?P<b>.+?)\*\*)"
    r"|(__(?P<b2>.+?)__)"
    r"|(\*(?P<i>[^*]+?)\*)"
    r"|(_(?P<i2>[^_]+?)_(?![A-Za-z0-9]))"
    r"|(`(?P<code>[^`]+?)`)"
    r"|(\[(?P<ltext>[^\]]+?)\]\((?P<lurl>[^)\s]+)\))"
    r"|(?P<url><?(https?://[^\s<>()]+)>?)"
)


def add_inline(paragraph, text, size_pt=BODY_PT, color=None, base_bold=False, base_italic=False, font=None):
    """Append runs to `paragraph` for a line of inline markdown."""
    pos = 0
    for m in INLINE_RE.finditer(text):
        if m.start() > pos:
            _run(paragraph, text[pos:m.start()], size_pt, color, base_bold, base_italic, font)
        if m.group("bi"):
            _run(paragraph, m.group("bi"), size_pt, color, True, True, font)
        elif m.group("b") or m.group("b2"):
            _run(paragraph, m.group("b") or m.group("b2"), size_pt, color, True, base_italic, font)
        elif m.group("i") or m.group("i2"):
            _run(paragraph, m.group("i") or m.group("i2"), size_pt, color, base_bold, True, font)
        elif m.group("code"):
            _run(paragraph, m.group("code"), size_pt, color, base_bold, base_italic, "Roboto Mono", shade=True)
        elif m.group("ltext"):
            add_hyperlink(paragraph, m.group("lurl"), m.group("ltext"), size_pt=size_pt, bold=base_bold, italic=base_italic)
        elif m.group("url"):
            raw = m.group("url").strip("<>")
            add_hyperlink(paragraph, raw, raw, size_pt=size_pt, bold=base_bold, italic=base_italic)
        pos = m.end()
    if pos < len(text):
        _run(paragraph, text[pos:], size_pt, color, base_bold, base_italic, font)


def _run(paragraph, text, size_pt, color, bold, italic, font=None, shade=False):
    if not text:
        return
    run = paragraph.add_run(text)
    run.font.size = Pt(size_pt)
    run.bold = bold or None
    run.italic = italic or None
    if color:
        run.font.color.rgb = RGBColor.from_string(color)
    if font:
        run.font.name = font
        rPr = run._r.get_or_add_rPr()
        rFonts = rPr.find(qn("w:rFonts"))
        if rFonts is None:
            rFonts = OxmlElement("w:rFonts"); rPr.append(rFonts)
        for attr in ("w:ascii", "w:hAnsi", "w:cs", "w:eastAsia"):
            rFonts.set(qn(attr), font)
    if shade:
        rPr = run._r.get_or_add_rPr()
        shd = OxmlElement("w:shd"); shd.set(qn("w:val"), "clear"); shd.set(qn("w:fill"), TEMPLATE_ZEBRA)
        rPr.append(shd)
    return run


# --------------------------------------------------------------------------
# block-level markdown parsing
# --------------------------------------------------------------------------

def parse_blocks(md_text):
    """Yield (kind, payload) blocks from markdown text."""
    lines = md_text.replace("\r\n", "\n").split("\n")
    i, n = 0, len(lines)
    para_buf = []

    def flush_para():
        nonlocal para_buf
        if para_buf:
            yield_list.append(("para", " ".join(s.strip() for s in para_buf)))
            para_buf = []

    yield_list = []
    while i < n:
        line = lines[i]
        stripped = line.strip()

        if stripped.startswith("```"):
            flush_para()
            lang = stripped[3:].strip()
            i += 1
            code = []
            while i < n and not lines[i].strip().startswith("```"):
                code.append(lines[i]); i += 1
            i += 1
            yield_list.append(("code", ("\n".join(code), lang)))
            continue

        if stripped == "<<<PAGEBREAK>>>":
            flush_para(); yield_list.append(("pagebreak", None)); i += 1; continue

        if not stripped:
            flush_para(); i += 1; continue

        m = re.match(r"^(#{1,6})\s+(.*?)\s*#*\s*$", stripped)
        if m:
            flush_para()
            yield_list.append(("heading", (len(m.group(1)), m.group(2))))
            i += 1; continue

        if re.fullmatch(r"(-{3,}|\*{3,}|_{3,})", stripped):
            flush_para(); yield_list.append(("hr", None)); i += 1; continue

        if stripped.startswith("|") and i + 1 < n and re.match(r"^\s*\|?\s*:?-{2,}", lines[i + 1]):
            flush_para()
            rows = []
            while i < n and lines[i].strip().startswith("|"):
                rows.append(lines[i].strip()); i += 1
            header = split_row(rows[0])
            aligns = [a.strip() for a in split_row(rows[1])]
            body = [split_row(r) for r in rows[2:]]
            yield_list.append(("table", (header, body, aligns)))
            continue

        if stripped.startswith(">"):
            flush_para()
            quote = []
            while i < n and lines[i].strip().startswith(">"):
                quote.append(lines[i].strip()[1:].strip()); i += 1
            yield_list.append(("quote", " ".join(q for q in quote if q) if any(quote) else ""))
            continue

        lm = re.match(r"^(\s*)([-*+]|\d+[.)])\s+(.*)$", line)
        if lm:
            flush_para()
            items = []
            while i < n:
                lm = re.match(r"^(\s*)([-*+]|\d+[.)])\s+(.*)$", lines[i])
                if lm:
                    indent = len(lm.group(1).replace("\t", "    "))
                    ordered = lm.group(2)[0].isdigit()
                    items.append([indent, ordered, lm.group(3).strip()])
                    i += 1
                elif i < n and lines[i].strip() and lines[i].startswith((" ", "\t")) and items:
                    items[-1][2] += " " + lines[i].strip(); i += 1   # continuation line
                else:
                    break
            yield_list.append(("list", items))
            continue

        para_buf.append(line)
        i += 1
    flush_para()
    return yield_list


def split_row(row):
    row = row.strip()
    if row.startswith("|"):
        row = row[1:]
    if row.endswith("|"):
        row = row[:-1]
    cells, cur, esc = [], "", False
    for ch in row:
        if ch == "\\" and not esc:
            esc = True; continue
        if ch == "|" and not esc:
            cells.append(cur.strip()); cur = ""
        else:
            if esc and ch != "|":
                cur += "\\"
            cur += ch
        esc = False
    cells.append(cur.strip())
    return cells


# --------------------------------------------------------------------------
# rendering
# --------------------------------------------------------------------------

class Renderer:
    def __init__(self, document, colors, body_pt):
        self.doc = document
        self.primary, self.secondary = colors
        self.body_pt = body_pt
        self.hdr_fill, self.hdr_text = header_fill_and_text(self.primary)
        self.h_color = readable_on_white(self.primary) if self.primary else None
        self.h3_color = readable_on_white(self.secondary) if self.secondary else self.h_color
        self.bullet_num = 1  # template's bullet definition
        self.decimal_num = ensure_decimal_numbering(document)
        self.usable_width_in = 7.5  # US Letter 8.5in − 2 × 0.5in margins

    # -- blocks -----------------------------------------------------------
    def render(self, blocks):
        for kind, payload in blocks:
            getattr(self, f"b_{kind}")(payload)

    def b_heading(self, payload):
        level, text = payload
        level = min(level, 5)
        p = self.doc.add_paragraph(style=f"Heading {level}")
        color = None
        if level in (1, 2):
            color = self.h_color
        elif level == 3:
            color = self.h3_color
        # headings keep the template's Roboto Slab via style; we only color them
        add_inline(p, text, size_pt=self._heading_pt(level), color=color)
        if level == 1 and self.primary:
            para_border_bottom(p, self.primary, sz=8, space=4)

    @staticmethod
    def _heading_pt(level):
        return {1: 24, 2: 18, 3: 14, 4: 11, 5: 11}[level]

    def b_para(self, text):
        p = self.doc.add_paragraph()
        p.paragraph_format.space_after = Pt(6)
        add_inline(p, text, size_pt=self.body_pt)

    def b_quote(self, text):
        p = self.doc.add_paragraph()
        p.paragraph_format.left_indent = Inches(0.25)
        p.paragraph_format.space_after = Pt(6)
        para_border_left(p, self.primary or TEMPLATE_DARK)
        add_inline(p, text, size_pt=self.body_pt, base_italic=True, color="444444")

    def b_hr(self, _):
        p = self.doc.add_paragraph()
        p.paragraph_format.space_after = Pt(6)
        para_border_bottom(p, TEMPLATE_BORDER, sz=6)

    def b_pagebreak(self, _):
        self.doc.add_paragraph().add_run().add_break(WD_BREAK.PAGE)

    def b_code(self, payload):
        code, _lang = payload
        for line in code.split("\n") or [""]:
            p = self.doc.add_paragraph()
            p.paragraph_format.space_after = Pt(0)
            p.paragraph_format.line_spacing = 1.15
            para_shading(p, TEMPLATE_ZEBRA)
            _run(p, line if line else " ", self.body_pt - 0.5, TEXT_DARK, False, False, "Roboto Mono")
        self.doc.add_paragraph().paragraph_format.space_after = Pt(4)

    def b_list(self, items):
        indents = sorted({it[0] for it in items})
        level_of = {ind: min(idx, 8) for idx, ind in enumerate(indents)}
        # one numbering instance per list block, so "1. 2. 3." survives nested
        # bullets between the numbered items; a new block restarts at 1.
        ordered_num = None
        for indent, ordered, text in items:
            level = level_of[indent]
            if ordered:
                if ordered_num is None:
                    ordered_num = restart_numbering(self.doc, self.decimal_num)
                num_id = ordered_num
            else:
                num_id = self.bullet_num
            p = self.doc.add_paragraph()
            p.paragraph_format.space_after = Pt(2)
            set_list_paragraph(p, num_id, level)
            add_inline(p, text, size_pt=self.body_pt)

    def b_table(self, payload):
        header, body, aligns = payload
        ncols = max([len(header)] + [len(r) for r in body]) if body else len(header)
        table = self.doc.add_table(rows=1, cols=ncols)
        table.alignment = WD_TABLE_ALIGNMENT.LEFT
        set_table_borders(table)
        self._fill_row(table.rows[0], header + [""] * (ncols - len(header)), is_header=True)
        set_repeat_header(table.rows[0])
        for ri, row in enumerate(body):
            cells = row + [""] * (ncols - len(row))
            r = table.add_row()
            self._fill_row(r, cells, is_header=False, zebra=(ri % 2 == 1))
        self._auto_widths(table, header, body, ncols)
        spacer = self.doc.add_paragraph()
        spacer.paragraph_format.space_after = Pt(6)

    def _fill_row(self, row, cells, is_header, zebra=False):
        for ci, text in enumerate(cells):
            cell = row.cells[ci]
            set_cell_borders(cell)
            set_cell_margins(cell)
            if is_header:
                set_cell_shading(cell, self.hdr_fill)
            elif zebra:
                set_cell_shading(cell, TEMPLATE_ZEBRA)
            p = cell.paragraphs[0]
            p.paragraph_format.line_spacing = 1.15
            p.paragraph_format.space_after = Pt(0)
            # allow <br> in cells
            parts = re.split(r"<br\s*/?>", text)
            for pi, part in enumerate(parts):
                if pi > 0:
                    p = cell.add_paragraph()
                    p.paragraph_format.line_spacing = 1.15
                    p.paragraph_format.space_after = Pt(0)
                add_inline(p, part.strip(), size_pt=self.body_pt,
                           color=self.hdr_text if is_header else None,
                           base_bold=is_header)

    def _auto_widths(self, table, header, body, ncols):
        # weight columns by their longest cell, min 0.8in, sum to usable width
        lengths = []
        for c in range(ncols):
            col = [header[c] if c < len(header) else ""] + [r[c] if c < len(r) else "" for r in body]
            lengths.append(max(8, min(60, max(len(x) for x in col))))
        total = float(sum(lengths))
        widths = [max(0.8, self.usable_width_in * l / total) for l in lengths]
        scale = self.usable_width_in / sum(widths)
        set_col_widths(table, [w * scale for w in widths])


# --------------------------------------------------------------------------
# header / footer / cover
# --------------------------------------------------------------------------

def replace_placeholder_text(paragraph, mapping, page_field=False):
    """Rewrite a header/footer paragraph whose runs contain {Placeholders}."""
    full = "".join(r.text for r in paragraph.runs)
    if "{" not in full:
        return
    # keep first run's formatting, drop the rest
    first = paragraph.runs[0]
    for r in paragraph.runs[1:]:
        r._r.getparent().remove(r._r)
    text = full
    for k, v in mapping.items():
        text = text.replace("{" + k + "}", v)
    # collapse empty " · " separators left by blank values
    text = re.sub(r"(\s*·\s*)+", " · ", text)
    text = re.sub(r"^\s*·\s*|\s*·\s*$", "", text).strip()
    if page_field and "{Page_Number}" in text:
        before, after = text.split("{Page_Number}", 1)
        first.text = before
        fld_run = paragraph.add_run()
        fld_run.font.size = Pt(9)
        fld_run.font.color.rgb = RGBColor.from_string(TEMPLATE_META)
        add_field(fld_run, "PAGE")
        if after:
            tail = paragraph.add_run(after)
            tail.font.size = Pt(9)
            tail.font.color.rgb = RGBColor.from_string(TEMPLATE_META)
    else:
        first.text = text.replace("{Page_Number}", "")


def fill_header_footer(document, mapping):
    for section in document.sections:
        for part in (section.header, section.footer):
            for p in part.paragraphs:
                replace_placeholder_text(p, mapping, page_field=True)
            for t in part.tables:
                for row in t.rows:
                    for cell in row.cells:
                        for p in cell.paragraphs:
                            replace_placeholder_text(p, mapping, page_field=True)


def clear_body(document):
    body = document.element.body
    for child in list(body):
        if child.tag == qn("w:sectPr"):
            continue
        body.remove(child)


def prepare_logo(path):
    """Return a PNG path for the logo (converts SVG via ImageMagick)."""
    if not path:
        return None
    if not os.path.exists(path):
        sys.exit(f"Logo not found: {path}")
    ext = os.path.splitext(path)[1].lower()
    if ext in (".png", ".jpg", ".jpeg"):
        return path
    tmp = os.path.join(tempfile.mkdtemp(), "logo.png")
    for cmd in (["convert", "-background", "none", "-density", "300", path, "-resize", "1600x800>", tmp],
                ["rsvg-convert", "-w", "1600", "-o", tmp, path]):
        if shutil.which(cmd[0]):
            try:
                subprocess.run(cmd, check=True, capture_output=True)
                if os.path.exists(tmp):
                    return tmp
            except subprocess.CalledProcessError:
                continue
    sys.exit("Could not convert the logo to PNG. Supply a PNG/JPG with --logo.")


def logo_size(path, max_w_in=2.6, max_h_in=1.2):
    """Fit the logo inside a max_w × max_h inch box, preserving aspect ratio.
    Treats the pixel size as if the image were rendered at 300 dpi so a small
    icon does not blow up to the full box."""
    if Image is None:
        return Inches(max_w_in), None
    with Image.open(path) as im:
        w, h = im.size
    if not w or not h:
        return Inches(max_w_in), None
    nat_w, nat_h = w / 300.0, h / 300.0          # natural size at 300 dpi
    ratio = min(max_w_in / nat_w, max_h_in / nat_h)
    ratio = max(ratio, 0.6 / nat_h) if nat_h * ratio < 0.6 else ratio  # never shorter than 0.6in
    ratio = min(ratio, max_w_in / nat_w, max_h_in / nat_h)
    return Inches(nat_w * ratio), Inches(nat_h * ratio)


def add_cover(document, args, colors, body_pt, logo_png):
    primary, secondary = colors
    accent = primary or TEMPLATE_DARK
    sub_color = readable_on_white(secondary) if secondary else "666666"

    # top spacer
    sp = document.add_paragraph()
    sp.paragraph_format.space_before = Pt(110)
    sp.paragraph_format.space_after = Pt(0)

    if logo_png:
        lp = document.add_paragraph()
        lp.alignment = WD_ALIGN_PARAGRAPH.LEFT
        lp.paragraph_format.space_after = Pt(18)
        w, h = logo_size(logo_png)
        run = lp.add_run()
        if h is not None:
            run.add_picture(logo_png, width=w, height=h)
        else:
            run.add_picture(logo_png, width=w)

    title = document.add_paragraph(style="Title")
    title.paragraph_format.space_before = Pt(0)
    title.paragraph_format.space_after = Pt(4)
    r = title.add_run(args.project)
    r.font.size = Pt(40)
    if primary:
        r.font.color.rgb = RGBColor.from_string(readable_on_white(primary))

    sub = document.add_paragraph(style="Subtitle")
    sub.paragraph_format.space_before = Pt(0)
    sub.paragraph_format.space_after = Pt(10)
    r = sub.add_run(args.doc_type)
    r.font.size = Pt(26)
    r.italic = False
    r.font.color.rgb = RGBColor.from_string(sub_color)

    # accent rule
    rule = document.add_paragraph()
    rule.paragraph_format.space_after = Pt(14)
    para_border_bottom(rule, accent, sz=24, space=1)

    if args.subtitle:
        d = document.add_paragraph()
        d.paragraph_format.space_after = Pt(22)
        add_inline(d, args.subtitle, size_pt=body_pt + 2, color="444444")

    # details table
    details = [("Project", args.project), ("Document", args.doc_type), ("Status", args.status)]
    for kv in args.detail or []:
        if "=" in kv:
            k, v = kv.split("=", 1)
            details.append((k.strip(), v.strip()))
    details.append(("Date", args.date))
    if args.agent:
        details.append(("Prepared by", f"{args.platform} — {args.agent}"))

    table = document.add_table(rows=0, cols=2)
    set_table_borders(table)
    hdr_fill, hdr_text = header_fill_and_text(primary)
    for i, (k, v) in enumerate(details):
        row = table.add_row()
        kc, vc = row.cells
        for c in (kc, vc):
            set_cell_borders(c); set_cell_margins(c)
            c.paragraphs[0].paragraph_format.line_spacing = 1.15
            c.paragraphs[0].paragraph_format.space_after = Pt(0)
        set_cell_shading(kc, hdr_fill)
        if i % 2 == 1:
            set_cell_shading(vc, TEMPLATE_ZEBRA)
        add_inline(kc.paragraphs[0], k, size_pt=body_pt, color=hdr_text, base_bold=True)
        add_inline(vc.paragraphs[0], v, size_pt=body_pt)
    set_col_widths(table, [1.6, 5.9])

    document.add_paragraph().add_run().add_break(WD_BREAK.PAGE)


# --------------------------------------------------------------------------
# main
# --------------------------------------------------------------------------

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--content", required=True, help="Markdown file with the document body")
    ap.add_argument("--out", required=True, help="Output .docx path")
    ap.add_argument("--project", required=True, help="Project name (cover title, header)")
    ap.add_argument("--doc-type", required=True, help='e.g. "Brand Kit", "Message Foundation", "Target Markets and ICP"')
    ap.add_argument("--status", default="Draft v1 — for review", help="Document status (cover + header)")
    ap.add_argument("--other", default="", help="Header {Other_Details}, e.g. a version or 'Internal'")
    ap.add_argument("--subtitle", default="", help="One-line description under the title on the cover")
    ap.add_argument("--agent", default="", help="Footer {Agent_Source}, e.g. 'Brand Kit Agent'")
    ap.add_argument("--platform", default="LFX Marketing OS", help="Footer {Platform}")
    ap.add_argument("--date", default=_dt.date.today().strftime("%B %d, %Y"))
    ap.add_argument("--logo", default=None, help="Project logo (PNG/JPG/SVG)")
    ap.add_argument("--primary", default=None, help="Primary brand color #RRGGBB")
    ap.add_argument("--secondary", default=None, help="Secondary brand color #RRGGBB")
    ap.add_argument("--detail", action="append", help='Extra cover detail "Label=Value" (repeatable)')
    ap.add_argument("--body-size", type=float, default=BODY_PT, help="Body text size in pt (template default 9)")
    ap.add_argument("--no-cover", action="store_true", help="Skip the cover page")
    ap.add_argument("--strip-fonts", action="store_true",
                    help="Drop the embedded fonts (small file for Google Drive upload; Docs has the fonts natively)")
    ap.add_argument("--template", default=DEFAULT_TEMPLATE, help="Path to lf-agent-docs-template.docx")
    args = ap.parse_args()

    if not os.path.exists(args.template):
        sys.exit(f"Template not found: {args.template}")
    with open(args.content, encoding="utf-8") as fh:
        md = fh.read()

    primary = norm_hex(args.primary)
    secondary = norm_hex(args.secondary)
    colors = (primary, secondary)

    document = docx.Document(args.template)
    clear_body(document)

    fill_header_footer(document, {
        "Project_Name": args.project,
        "Document_Type": args.doc_type,
        "Document_Status": args.status,
        "Other_Details": args.other,
        "Platform": args.platform,
        "Agent_Source": args.agent,
        "Date": args.date,
    })

    logo_png = prepare_logo(args.logo)
    if not args.no_cover:
        add_cover(document, args, colors, args.body_size, logo_png)

    renderer = Renderer(document, colors, args.body_size)
    renderer.render(parse_blocks(md))

    os.makedirs(os.path.dirname(os.path.abspath(args.out)) or ".", exist_ok=True)
    document.save(args.out)
    if args.strip_fonts:
        strip_embedded_fonts(args.out)
    print(f"Wrote {args.out} ({os.path.getsize(args.out) // 1024} KB)")


def strip_embedded_fonts(path):
    """Remove the embedded Open Sans / Roboto Slab files (≈0.9 MB). Google Docs
    has both fonts natively, so a copy meant for Drive upload does not need
    them; Word users should keep the default (embedded) build."""
    import zipfile
    tmp = path + ".tmp"
    with zipfile.ZipFile(path) as zin, zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            name = item.filename
            if name.startswith("word/fonts/") or name == "word/_rels/fontTable.xml.rels":
                continue
            data = zin.read(name)
            if name == "word/fontTable.xml":
                data = re.sub(rb"<w:embed(Regular|Bold|Italic|BoldItalic)[^>]*/>", b"", data)
            if name == "[Content_Types].xml":
                data = re.sub(rb'<Override[^>]*PartName="/word/fonts/[^"]*"[^>]*/>', b"", data)
                data = re.sub(rb'<Default Extension="(ttf|odttf)"[^>]*/>', b"", data)
            zout.writestr(item, data)
    os.replace(tmp, path)


if __name__ == "__main__":
    main()
