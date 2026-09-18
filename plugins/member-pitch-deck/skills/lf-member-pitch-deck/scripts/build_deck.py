#!/usr/bin/env python3
"""
build_deck.py — Build a Member Pitch Deck from the bundled LF 2025 Template.

Every deck produced by the lf-member-pitch-deck skill MUST go through this
script. It opens assets/LF-2025-Template.pptx, removes the template's sample
slides, and adds one slide per entry in a JSON spec using ONLY the template's
own slide layouts. Fonts, sizes, colors, logo and footer come from the
template — never override them.

Usage:
    python3 build_deck.py spec.json output.pptx

Spec format (JSON):
{
  "slides": [
    {"layout": "title", "title": "Project Name", "subtitle": "Tagline · Presenter · Date",
     "notes": "Speaker notes / prep brief for this slide"},
    {"layout": "content", "title": "Their world", "bullets": ["...", "...", ["sub-bullet", 1]]},
    {"layout": "two_col", "title": "...", "left": ["..."], "right": ["..."]},
    {"layout": "content_image", "title": "...", "bullets": ["..."], "image": "path/to.png"},
    {"layout": "statement", "title": "Big statement", "body": ["supporting line", "..."]},
    {"layout": "logos", "title": "Members", "images": ["a.png", "b.png", "c.png", "d.png"]},
    {"layout": "table", "title": "Membership tiers",
     "table": {"header": ["Tier", "Fee", "Seats"], "rows": [["Premier", "$…", "1"], ["General", "$…", "0"]]}},
    {"layout": "section", "title": "Act 2 — Explain value"},
    {"layout": "closing"}
  ]
}

Bullets: a string is a level-0 bullet; a 2-item list ["text", level] sets the
indent level (0–2). Any slide may carry "notes".

Layout keys (→ template layout name):
  title           TITLE                    dark title slide (title + subtitle)
  title_light     TITLE_2                  light title slide
  title_image     TITLE_1                  dark title + square image (right)
  section         SECTION_HEADER           dark section divider
  section_light   SECTION_HEADER_2         light section divider
  statement       SECTION_HEADER_1         dark: big statement left, supporting body right
  statement_image TITLE_1_1                dark: big statement left, small square image right
  body_image      TITLE_1_1_1              dark: body text left, tall image right
  logos           SECTION_HEADER_3         dark: title + 4 square logos
  logos_light     SECTION_HEADER_3_1       light: title + 4 square logos
  content         TITLE_AND_BODY           light: title + bullets (default content slide)
  content_dense   TITLE_AND_BODY_1         light: title + more bullets, smaller text (appendix only)
  two_col         TITLE_AND_TWO_COLUMNS    light: title + two bullet columns
  two_col_dense   TITLE_AND_BODY_1_1       light: dense two columns (appendix only)
  content_image   TITLE_AND_TWO_COLUMNS_1  light: title + bullets left, square image right
  table           TITLE_ONLY               light: title + a table drawn in the body area
  chart           TITLE_ONLY               light: title + an image (chart PNG) in the body area
  title_only      TITLE_ONLY               light: title only (free placement)
  blank           BLANK
  closing         TITLE_2_1                LF logo closing slide (no text)
"""
import json
import sys
from pathlib import Path

from pptx import Presentation
from pptx.util import Inches, Pt

HERE = Path(__file__).resolve().parent
TEMPLATE = HERE.parent / "assets" / "LF-2025-Template.pptx"

LAYOUTS = {
    "title": "TITLE",
    "title_light": "TITLE_2",
    "title_image": "TITLE_1",
    "section": "SECTION_HEADER",
    "section_light": "SECTION_HEADER_2",
    "statement": "SECTION_HEADER_1",
    "statement_image": "TITLE_1_1",
    "body_image": "TITLE_1_1_1",
    "logos": "SECTION_HEADER_3",
    "logos_light": "SECTION_HEADER_3_1",
    "content": "TITLE_AND_BODY",
    "content_dense": "TITLE_AND_BODY_1",
    "two_col": "TITLE_AND_TWO_COLUMNS",
    "two_col_dense": "TITLE_AND_BODY_1_1",
    "content_image": "TITLE_AND_TWO_COLUMNS_1",
    "table": "TITLE_ONLY",
    "chart": "TITLE_ONLY",
    "title_only": "TITLE_ONLY",
    "blank": "BLANK",
    "closing": "TITLE_2_1",
}

# Body area on TITLE_ONLY (matches TITLE_AND_BODY's body placeholder)
BODY_BOX = (Inches(0.34), Inches(1.26), Inches(9.32), Inches(3.74))


def remove_all_slides(prs):
    sldIdLst = prs.slides._sldIdLst
    for sldId in list(sldIdLst):
        rId = sldId.rId
        prs.part.drop_rel(rId)
        sldIdLst.remove(sldId)


def layout_by_name(prs, name):
    for layout in prs.slide_layouts:
        if layout.name == name:
            return layout
    raise SystemExit(f"Template has no layout named {name!r}")


def placeholders(slide):
    """Return dict keyed by (type-name, idx) plus lists by type."""
    out = {"title": [], "body": [], "pic": [], "other": []}
    for ph in slide.placeholders:
        t = ph.placeholder_format.type
        tname = str(t).split(".")[-1].split(" ")[0]
        if tname in ("TITLE", "CENTER_TITLE", "SUBTITLE"):
            out["title"].append(ph)
        elif tname in ("BODY", "OBJECT"):
            out["body"].append(ph)
        elif tname == "PICTURE":
            out["pic"].append(ph)
        elif tname == "SLIDE_NUMBER":
            continue
        else:
            out["other"].append(ph)
    # keep document order (idx ascending) — idx 0 is always the main title
    for k in out:
        out[k].sort(key=lambda p: p.placeholder_format.idx)
    return out


def fill_text(ph, text):
    tf = ph.text_frame
    tf.clear()
    tf.paragraphs[0].text = text


def fill_bullets(ph, bullets):
    tf = ph.text_frame
    tf.clear()
    first = True
    for b in bullets:
        if isinstance(b, (list, tuple)):
            text, level = b[0], int(b[1])
        else:
            text, level = b, 0
        p = tf.paragraphs[0] if first else tf.add_paragraph()
        first = False
        p.text = str(text)
        p.level = max(0, min(level, 2))


def insert_picture(ph, path):
    path = str(path)
    if not Path(path).exists():
        print(f"  ! image not found, leaving placeholder empty: {path}", file=sys.stderr)
        return
    try:
        ph.insert_picture(path)
    except Exception as e:  # not a PicturePlaceholder in some layouts
        print(f"  ! could not insert {path}: {e}", file=sys.stderr)


def add_table(slide, spec):
    header = spec.get("header", [])
    rows = spec.get("rows", [])
    ncols = max(len(header), max((len(r) for r in rows), default=0))
    nrows = len(rows) + (1 if header else 0)
    left, top, width, height = BODY_BOX
    height = min(height, Inches(0.42) * nrows)
    shape = slide.shapes.add_table(nrows, ncols, left, top, width, height)
    tbl = shape.table
    r0 = 0
    if header:
        for c, val in enumerate(header):
            cell = tbl.cell(0, c)
            cell.text = str(val)
            for p in cell.text_frame.paragraphs:
                for run in p.runs:
                    run.font.bold = True
                    run.font.size = Pt(14)
        r0 = 1
    for r, row in enumerate(rows):
        for c in range(ncols):
            val = row[c] if c < len(row) else ""
            cell = tbl.cell(r0 + r, c)
            cell.text = str(val)
            for p in cell.text_frame.paragraphs:
                for run in p.runs:
                    run.font.size = Pt(13)


def add_body_image(slide, path):
    if not Path(path).exists():
        print(f"  ! image not found: {path}", file=sys.stderr)
        return
    left, top, width, height = BODY_BOX
    pic = slide.shapes.add_picture(str(path), left, top, height=height)
    # center horizontally if narrower than the body box
    if pic.width < width:
        pic.left = left + (width - pic.width) // 2
    elif pic.width > width:
        ratio = width / pic.width
        pic.width = width
        pic.height = int(pic.height * ratio)


def strip_empty_placeholders(slide):
    for ph in list(slide.placeholders):
        tname = str(ph.placeholder_format.type).split(".")[-1].split(" ")[0]
        if tname == "SLIDE_NUMBER":
            continue
        if tname == "PICTURE":
            # an un-filled picture placeholder still exists as a placeholder shape
            if ph.shape_type is not None and ph.element.tag.endswith("}pic"):
                continue
            ph.element.getparent().remove(ph.element)
            continue
        if ph.has_text_frame and not ph.text_frame.text.strip():
            ph.element.getparent().remove(ph.element)


def build(spec_path, out_path):
    spec = json.loads(Path(spec_path).read_text())
    slides = spec["slides"]
    if len(slides) > 20:
        raise SystemExit(f"Deck has {len(slides)} slides; the limit is 20.")

    prs = Presentation(str(TEMPLATE))
    remove_all_slides(prs)

    for i, s in enumerate(slides, 1):
        key = s.get("layout", "content")
        if key not in LAYOUTS:
            raise SystemExit(f"Slide {i}: unknown layout key {key!r}. Valid: {sorted(LAYOUTS)}")
        layout = layout_by_name(prs, LAYOUTS[key])
        slide = prs.slides.add_slide(layout)
        ph = placeholders(slide)

        # Title / subtitle (idx 0 is the main title; a second TITLE-type ph is the subtitle)
        if s.get("title") and ph["title"]:
            fill_text(ph["title"][0], s["title"])
        if s.get("subtitle") and len(ph["title"]) > 1:
            fill_text(ph["title"][1], s["subtitle"])

        # Body text
        if key in ("two_col", "two_col_dense"):
            if ph["body"]:
                fill_bullets(ph["body"][0], s.get("left", []))
            if len(ph["body"]) > 1:
                fill_bullets(ph["body"][1], s.get("right", []))
        else:
            body = s.get("bullets") or s.get("body")
            if body and ph["body"]:
                fill_bullets(ph["body"][0], body)

        # Pictures
        imgs = s.get("images") or ([s["image"]] if s.get("image") else [])
        for pic_ph, img in zip(ph["pic"], imgs):
            insert_picture(pic_ph, img)

        # Free shapes on TITLE_ONLY
        if key == "table" and s.get("table"):
            add_table(slide, s["table"])
        if key == "chart" and s.get("image"):
            add_body_image(slide, s["image"])

        # Notes (prep brief)
        if s.get("notes"):
            slide.notes_slide.notes_text_frame.text = s["notes"]

        strip_empty_placeholders(slide)

    prs.save(out_path)
    print(f"Wrote {out_path} — {len(slides)} slides from LF 2025 Template")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(1)
    build(sys.argv[1], sys.argv[2])
