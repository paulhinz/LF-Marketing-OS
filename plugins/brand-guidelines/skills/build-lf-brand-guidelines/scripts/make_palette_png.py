#!/usr/bin/env python3
"""
make_palette_png.py — render the palette in brand.json as a swatch strip PNG
for the Brand Guidelines "Palette" slide (chart layout).

    python3 make_palette_png.py brand.json palette.png [--names "Ink,Slate,Signal Green,Mist,White"]

One tile per palette role in brand.json order; each tile shows the role, an
optional name, the hex and the RGB. Text is drawn dark or white depending on
the tile's luminance. Needs Pillow.
"""
import argparse
import json
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

sys.path.insert(0, str(Path(__file__).resolve().parent))
import lfbrand  # noqa: E402

LABELS = {"primary": "Primary", "secondary": "Secondary", "accent": "Accent",
          "neutral_dark": "Neutral dark", "neutral_light": "Neutral light"}


def font(size):
    for name in ("DejaVuSans.ttf", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", "Arial.ttf"):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("brand"); ap.add_argument("out")
    ap.add_argument("--names", help="comma-separated display names, in palette order")
    a = ap.parse_args()
    raw = json.loads(Path(a.brand).read_text())
    pal = [(k, lfbrand.norm_hex(v)) for k, v in (raw.get("palette") or {}).items() if v]
    if not pal:
        raise SystemExit("brand.json has no palette values.")
    names = [n.strip() for n in a.names.split(",")] if a.names else [""] * len(pal)

    W, H, PAD = 2400, 900, 24
    tile_w = (W - PAD * (len(pal) + 1)) // len(pal)
    im = Image.new("RGB", (W, H), (255, 255, 255))
    d = ImageDraw.Draw(im)
    f_role, f_name, f_hex = font(44), font(64), font(40)
    for i, (role, hx) in enumerate(pal):
        x0 = PAD + i * (tile_w + PAD)
        rgb = tuple(int(hx[j:j + 2], 16) for j in (0, 2, 4))
        d.rectangle((x0, PAD, x0 + tile_w, H - PAD), fill=rgb, outline=(220, 220, 220), width=3)
        txt = (255, 255, 255) if lfbrand.contrast(hx, "FFFFFF") < 3.0 and lfbrand.contrast(hx, "000000") > lfbrand.contrast(hx, "FFFFFF") else (34, 34, 34)
        if lfbrand.contrast(hx, "000000") >= lfbrand.contrast(hx, "FFFFFF"):
            txt = (34, 34, 34)
        else:
            txt = (255, 255, 255)
        y = H - PAD - 260
        d.text((x0 + 40, y), LABELS.get(role, role), font=f_role, fill=txt)
        if names[i] if i < len(names) else "":
            d.text((x0 + 40, y + 60), names[i], font=f_name, fill=txt)
        d.text((x0 + 40, y + 150), f"#{hx}", font=f_hex, fill=txt)
        d.text((x0 + 40, y + 200), f"RGB {rgb[0]}, {rgb[1]}, {rgb[2]}", font=f_hex, fill=txt)
    im.save(a.out)
    print(f"Wrote {a.out} — {len(pal)} swatches")


if __name__ == "__main__":
    main()
