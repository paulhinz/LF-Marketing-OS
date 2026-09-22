#!/usr/bin/env python3
"""
extract_brand_kit.py — Draft a brand.json from a project's Brand Kit document
(the output of the brand-guidelines-agent), a Markdown/text file, or a
directory containing one plus logo files.

    python3 extract_brand_kit.py "PyTorch Foundation Brand Kit.docx" brand.json [--logo-dir ./logos]

What it reads (best effort — always review the result before building):
  * Section 7 / Component 2 "Color Palette" table → palette roles by the Role
    column (primary, secondary, accent, neutral dark/light); falls back to the
    first five #RRGGBB values found in document order.
  * Component 3 "Typography Pairing" → heading (primary) and body (secondary)
    font family names.
  * Component 4 "Imagery & Iconography" → the first two sentences, stored as a
    note for the human (no programmatic effect).
  * Project name from the cover / first Heading 1.
  * --logo-dir: first file matching *logo*light*/*color* → logo.light,
    *logo*dark*/*white* → logo.dark; a lone logo file → logo.light.

Anything it cannot find is left null so the calling agent can ask the project
leader — never invent a color or a font.
"""
import argparse
import json
import re
import sys
from pathlib import Path

HEX_RE = re.compile(r"#([0-9A-Fa-f]{6})\b")
ROLE_WORDS = {
    "primary": "primary",
    "secondary": "secondary",
    "accent": "accent",
    "neutral dark": "neutral_dark", "dark neutral": "neutral_dark", "charcoal": "neutral_dark", "ink": "neutral_dark",
    "neutral light": "neutral_light", "light neutral": "neutral_light", "background": "neutral_light", "surface": "neutral_light",
}
FONT_HINTS = re.compile(
    r"\b(Inter|Roboto Slab|Roboto Mono|Roboto|Open Sans|Montserrat|Lato|Source Sans( 3| Pro)?|Source Serif( 4| Pro)?|"
    r"IBM Plex (Sans|Serif|Mono)|Poppins|Nunito( Sans)?|Work Sans|DM Sans|DM Serif Display|Space Grotesk|Space Mono|"
    r"Manrope|Raleway|Merriweather|Playfair Display|Fira (Sans|Code|Mono)|JetBrains Mono|Ubuntu( Mono)?|Noto (Sans|Serif)|"
    r"Barlow|Karla|Rubik|Outfit|Plus Jakarta Sans|Figtree|Public Sans|Red Hat (Display|Text)|Libre Franklin|Libre Baskerville|"
    r"Crimson (Pro|Text)|Lora|PT (Sans|Serif)|Oswald|Archivo|Sora|Urbanist|Mulish|Heebo|Cabin|Titillium Web|Exo 2|Overpass)\b"
)


def read_text(path):
    p = Path(path)
    if p.suffix.lower() == ".docx":
        from docx import Document
        d = Document(str(p))
        out = []
        body = d.element.body
        for el in body.iterchildren():
            tag = el.tag.split("}")[1]
            if tag == "p":
                from docx.text.paragraph import Paragraph
                para = Paragraph(el, d)
                style = para.style.name if para.style is not None else ""
                prefix = "# " if style.startswith("Heading 1") or style == "Title" else "## " if style.startswith("Heading") else ""
                out.append(prefix + para.text)
            elif tag == "tbl":
                from docx.table import Table
                t = Table(el, d)
                for row in t.rows:
                    out.append("| " + " | ".join(c.text.strip().replace("\n", " ") for c in row.cells) + " |")
        return "\n".join(out)
    return p.read_text(encoding="utf-8", errors="ignore")


def section(text, start_pat, end_pat):
    m = re.search(start_pat, text, re.I)
    if not m:
        return ""
    rest = text[m.end():]
    e = re.search(end_pat, rest, re.I)
    return rest[: e.start()] if e else rest[:4000]


def extract(text):
    brand = {"project_name": None, "logo": {}, "palette": {}, "fonts": {"heading": None, "body": None},
             "iconography": None, "cobrand": True, "_review": []}

    m = re.search(r"^#\s*(.+?)\s*(?:Brand Kit|—|-|$)", text, re.M)
    if m:
        brand["project_name"] = m.group(1).strip() or None

    pal = section(text, r"(Component\s*2|Color Palette)", r"(Component\s*3|Typography)")
    found = {}
    for line in pal.splitlines():
        hexes = HEX_RE.findall(line)
        if not hexes:
            continue
        low = line.lower()
        role = next((v for k, v in ROLE_WORDS.items() if k in low), None)
        if role and role not in found:
            found[role] = "#" + hexes[0].upper()
    if not found:
        order = ["primary", "secondary", "accent", "neutral_dark", "neutral_light"]
        for role, h in zip(order, HEX_RE.findall(pal or text)):
            found[role] = "#" + h.upper()
        if found:
            brand["_review"].append("palette roles guessed from color order — confirm")
    brand["palette"] = found
    if "primary" not in found:
        brand["_review"].append("no primary color found — ask the project leader")

    typ = section(text, r"(Component\s*3|Typography)", r"(Component\s*4|Imagery)")
    fonts = []
    for m in FONT_HINTS.finditer(typ):
        name = m.group(0)
        if name not in fonts:
            fonts.append(name)
    if fonts:
        brand["fonts"]["heading"] = fonts[0]
        brand["fonts"]["body"] = fonts[1] if len(fonts) > 1 else fonts[0]
    else:
        brand["_review"].append("no font family recognised — leave null to keep template fonts, or fill in")

    ico = section(text, r"(Component\s*4|Imagery\s*&\s*Iconography)", r"(##\s*8|Tagline)")
    sents = re.split(r"(?<=[.!?])\s+", " ".join(ico.split()))
    sents = [s for s in sents if len(s) > 20]
    if sents:
        brand["iconography"] = " ".join(sents[:2])[:400]
    return brand


def find_logos(logo_dir, brand):
    d = Path(logo_dir)
    files = [p for p in d.iterdir() if p.suffix.lower() in (".png", ".svg", ".jpg", ".jpeg")]
    for p in files:
        n = p.name.lower()
        if any(k in n for k in ("dark", "white", "reverse", "inverse")) and "dark" not in brand["logo"]:
            brand["logo"]["dark"] = str(p.resolve())
        elif "light" not in brand["logo"]:
            brand["logo"]["light"] = str(p.resolve())
    if not brand["logo"]:
        brand["_review"].append("no logo files found — the LF logo stays until one is supplied")


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("source", help="Brand Kit .docx / .md / .txt")
    ap.add_argument("output", help="brand.json to write")
    ap.add_argument("--logo-dir")
    ap.add_argument("--project-name")
    a = ap.parse_args()
    b = extract(read_text(a.source))
    if a.project_name:
        b["project_name"] = a.project_name
    if a.logo_dir:
        find_logos(a.logo_dir, b)
    Path(a.output).write_text(json.dumps(b, indent=2))
    print(json.dumps(b, indent=2))
    if b["_review"]:
        print("\nREVIEW BEFORE USE:\n - " + "\n - ".join(b["_review"]), file=sys.stderr)
