#!/usr/bin/env python3
"""
lfbrand.py — shared brand helpers for the LF Output Formatter.

Loads a brand.json (see references/brand-override.md), validates it, and
provides the color / font / logo substitution used by build_deck.py,
build_doc.py and build_letter.py to re-skin the three LF templates for a
specific Linux Foundation project or foundation.

LF default tokens (extracted from the templates themselves):
  Azure        0094FF   primary accent (links, subtitles, footer address)
  Royal Navy   003778   secondary
  Cyan         12E2E2   accent
  Dark grad    3D3E5B -> 100F18   dark slide background
  LF Gray      222222   doc table header fill
  Zebra        F1F1F1   doc table alternating row
  Fonts        Open Sans Medium / Open Sans (slides + doc body), Montserrat
               (slides, secondary), Roboto Slab (doc headings)

brand.json schema (all keys optional except project_name):
{
  "project_name": "PyTorch Foundation",
  "logo": {"light": "logo-on-light.png", "dark": "logo-on-dark.png"},
  "palette": {"primary": "#EE4C2C", "secondary": "#2B2B2B", "accent": "#F6A21E",
              "neutral_dark": "#1B1B1B", "neutral_light": "#F4F4F4"},
  "fonts": {"heading": "Inter", "body": "Inter"},
  "dark_gradient": ["#1B1B1B", "#000000"],
  "iconography": "flat, single-weight line icons in the primary color",
  "footer_address": null,
  "cobrand": true
}
"""
import json
import re
import sys
from pathlib import Path

LF_DEFAULT = {
    "project_name": "The Linux Foundation",
    "palette": {
        "primary": "#0094FF",
        "secondary": "#003778",
        "accent": "#12E2E2",
        "neutral_dark": "#222222",
        "neutral_light": "#F1F1F1",
    },
    "fonts": {"heading": None, "body": None},
    "dark_gradient": ["#3D3E5B", "#100F18"],
    "logo": {},
    "cobrand": True,
}

# Template color -> brand role
SLIDE_COLOR_ROLES = {
    "0094FF": "primary",
    "003778": "secondary",
    "12E2E2": "accent",
}
DOC_COLOR_ROLES = {
    "0094ff": "primary",   # letterhead footer / links
    "222222": "table_header",
}

HEX_RE = re.compile(r"^#?([0-9a-fA-F]{6})$")


def norm_hex(value, default=None):
    if not value:
        return default
    m = HEX_RE.match(str(value).strip())
    if not m:
        raise SystemExit(f"Bad hex color {value!r}; use #RRGGBB")
    return m.group(1).upper()


def rel_lum(hexstr):
    r, g, b = (int(hexstr[i:i + 2], 16) / 255 for i in (0, 2, 4))

    def lin(c):
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4

    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)


def contrast(h1, h2):
    l1, l2 = rel_lum(h1), rel_lum(h2)
    return (max(l1, l2) + 0.05) / (min(l1, l2) + 0.05)


def load_brand(path):
    """Return a fully-populated brand dict, or None if path is falsy."""
    if not path:
        return None
    p = Path(path)
    if not p.exists():
        raise SystemExit(f"brand file not found: {p}")
    raw = json.loads(p.read_text())
    brand = json.loads(json.dumps(LF_DEFAULT))
    brand["project_name"] = raw.get("project_name") or brand["project_name"]
    pal = raw.get("palette") or {}
    for k in brand["palette"]:
        brand["palette"][k] = norm_hex(pal.get(k), norm_hex(brand["palette"][k]))
    fonts = raw.get("fonts") or {}
    brand["fonts"] = {"heading": fonts.get("heading"), "body": fonts.get("body")}
    if raw.get("dark_gradient"):
        brand["dark_gradient"] = [norm_hex(c) for c in raw["dark_gradient"]]
    else:
        brand["dark_gradient"] = [norm_hex(c) for c in brand["dark_gradient"]]
    logo = raw.get("logo") or {}
    brand["logo"] = {}
    for k in ("light", "dark"):
        if logo.get(k):
            lp = (p.parent / logo[k]) if not Path(logo[k]).is_absolute() else Path(logo[k])
            if not lp.exists():
                raise SystemExit(f"logo file not found: {lp}")
            brand["logo"][k] = str(lp)
    brand["iconography"] = raw.get("iconography")
    brand["footer_address"] = raw.get("footer_address")
    brand["cobrand"] = raw.get("cobrand", True)
    brand["_source"] = str(p)
    return brand


def table_header_fill(brand):
    """Primary color if it carries white text at AA; else the LF dark gray."""
    prim = brand["palette"]["primary"]
    return prim if contrast(prim, "FFFFFF") >= 4.5 else brand["palette"]["neutral_dark"]


def color_map_for_slides(brand):
    """Return {template_hex: brand_hex} for XML substitution in a pptx."""
    m = {}
    for tpl, role in SLIDE_COLOR_ROLES.items():
        m[tpl] = brand["palette"][role]
    g0, g1 = brand["dark_gradient"]
    m["3D3E5B"] = g0
    m["100F18"] = g1
    return {k: v for k, v in m.items() if k != v}


def font_map_for_slides(brand):
    h, b = brand["fonts"]["heading"], brand["fonts"]["body"]
    m = {}
    if h:
        m["Open Sans Medium"] = h
        m["Montserrat"] = h
    if b:
        m["Open Sans"] = b
    return m


def font_map_for_docs(brand):
    h, b = brand["fonts"]["heading"], brand["fonts"]["body"]
    m = {}
    if h:
        m["Roboto Slab Light"] = h
        m["Roboto Slab"] = h
    if b:
        m["Open Sans Medium"] = b
        m["Open Sans"] = b
    return m


def replace_colors_in_xml(xml, color_map):
    """Replace srgbClr / w:color / w:fill hex values (case-insensitive)."""
    for old, new in color_map.items():
        xml = re.sub(
            r'(val|fill|color)="' + old + '"',
            lambda mo: f'{mo.group(1)}="{new}"',
            xml,
            flags=re.IGNORECASE,
        )
    return xml


def replace_fonts_in_xml(xml, font_map):
    # longest names first so "Open Sans Medium" is handled before "Open Sans"
    for old in sorted(font_map, key=len, reverse=True):
        new = font_map[old]
        xml = re.sub(r'typeface="' + re.escape(old) + '"', f'typeface="{new}"', xml)
        for attr in ("ascii", "hAnsi", "cs", "eastAsia"):
            xml = re.sub(r'w:' + attr + '="' + re.escape(old) + '"', f'w:{attr}="{new}"', xml)
    return xml


def fit_logo(src, target_w, target_h, out_path, pad_ratio=0.0):
    """Scale a logo (PNG/JPG/SVG) to fit inside target_w x target_h pixels,
    on a transparent canvas of exactly that size. Returns out_path."""
    from PIL import Image

    src = str(src)
    if src.lower().endswith(".svg"):
        import cairosvg  # pip install cairosvg
        png = Path(out_path).with_suffix(".src.png")
        cairosvg.svg2png(url=src, write_to=str(png), output_width=target_w * 2)
        src = str(png)
    im = Image.open(src).convert("RGBA")
    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    pad_w, pad_h = int(target_w * pad_ratio), int(target_h * pad_ratio)
    box_w, box_h = target_w - 2 * pad_w, target_h - 2 * pad_h
    scale = min(box_w / im.width, box_h / im.height)
    im = im.resize((max(1, int(im.width * scale)), max(1, int(im.height * scale))), Image.LANCZOS)
    canvas = Image.new("RGBA", (target_w, target_h), (0, 0, 0, 0))
    # left-align (logos sit at the left edge in all three templates), vertical center
    canvas.paste(im, (pad_w, (target_h - im.height) // 2), im)
    canvas.save(out_path)
    return out_path


def summarize(brand):
    if not brand:
        return "LF default (no brand override)"
    pal = brand["palette"]
    return (f"{brand['project_name']}: primary {pal['primary']}, secondary {pal['secondary']}, "
            f"accent {pal['accent']}; fonts {brand['fonts']['heading'] or 'template'}/"
            f"{brand['fonts']['body'] or 'template'}; logos {sorted(brand['logo'])}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(__doc__)
        sys.exit(1)
    b = load_brand(sys.argv[1])
    print(summarize(b))
    print("table header fill:", table_header_fill(b))
    for k, v in b["palette"].items():
        print(f"  {k:14s} {v}  vs white {contrast(v, 'FFFFFF'):.2f}:1  vs black {contrast(v, '000000'):.2f}:1")
