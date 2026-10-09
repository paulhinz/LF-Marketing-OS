#!/usr/bin/env python3
"""
brand_graphics.py — generate the explanatory graphics a brand-guidelines deck
needs, from the project's real logo files and brand.json, so the slides show
the rules instead of describing them. Every image is drawn from the supplied
files; nothing is invented. Output PNGs go on `chart` slides.

    python3 brand_graphics.py backgrounds brand.json out.png
        The light and dark logo on each palette surface (white, neutral light,
        neutral dark, primary), labeled — "which variant on which background".

    python3 brand_graphics.py clearspace brand.json out.png [--unit 0.25]
        The light logo with the clear-space unit X drawn as a dashed frame; X is
        the given fraction of the logo height (default one quarter).

    python3 brand_graphics.py scaling brand.json out.png [--min-px 32]
        The logo at descending heights (128, 64, 32, 16 px) with the minimum size
        marked, so the "drop to the symbol below N px" rule is visible.

    python3 brand_graphics.py watchouts brand.json out.png
        Six tiles of the common misuses — stretched, recolored, rotated, busy
        background, drop shadow, elements rearranged — each struck through.

    python3 brand_graphics.py lockup brand.json out.png [--divider 1.5]
        A partnership lockup: the logo, a vertical divider of the given multiple
        of the logo height, and a placeholder partner box of matching weight.

    python3 brand_graphics.py symbol brand.json out.png --symbol icon.png
        The symbol alone in black-on-white and white-on-black, and inside a
        circle and a rounded square with one clear-space unit of margin.

Needs Pillow. brand.json follows references/brand-override.md; logo paths are
relative to the JSON file. Colors come from its palette (LF defaults if null).
"""
import argparse
import json
import math
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

sys.path.insert(0, str(Path(__file__).resolve().parent))
import lfbrand  # noqa: E402

W, H = 2400, 1350          # 16:9, fits the chart layout
MARGIN = 80


def font(size):
    for name in ("DejaVuSans.ttf", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", "Arial.ttf"):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()


def rgb(hexstr):
    h = lfbrand.norm_hex(hexstr)
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def load(brand_path):
    brand = lfbrand.load_brand(brand_path)
    if not brand or not brand["logo"].get("light"):
        raise SystemExit("brand.json needs at least logo.light")
    light = Image.open(brand["logo"]["light"]).convert("RGBA")
    dark = Image.open(brand["logo"]["dark"]).convert("RGBA") if brand["logo"].get("dark") else None
    return brand, light, dark


def fit(img, max_w, max_h):
    r = min(max_w / img.width, max_h / img.height)
    return img.resize((max(1, int(img.width * r)), max(1, int(img.height * r))), Image.LANCZOS)


def text_color_for(bg):
    h = "%02X%02X%02X" % bg
    return (255, 255, 255) if lfbrand.contrast(h, "FFFFFF") > lfbrand.contrast(h, "000000") else (34, 34, 34)


def label(draw, xy, text, size=34, color=(34, 34, 34)):
    draw.text(xy, text, font=font(size), fill=color)


# ------------------------------------------------------------------ backgrounds
def cmd_backgrounds(a):
    brand, light, dark = load(a.brand)
    pal = brand["palette"]
    surfaces = [("White", (255, 255, 255), light), ("Neutral light", rgb(pal["neutral_light"]), light),
                ("Neutral dark", rgb(pal["neutral_dark"]), dark or light), ("Primary", rgb(pal["primary"]), dark or light)]
    im = Image.new("RGB", (W, H), (255, 255, 255))
    d = ImageDraw.Draw(im)
    tw = (W - MARGIN * 3) // 2; th = (H - MARGIN * 3) // 2
    for i, (name, bg, logo) in enumerate(surfaces):
        x = MARGIN + (i % 2) * (tw + MARGIN); y = MARGIN + (i // 2) * (th + MARGIN)
        d.rectangle((x, y, x + tw, y + th), fill=bg, outline=(220, 220, 220), width=3)
        lg = fit(logo, tw * 0.6, th * 0.5)
        im.paste(lg, (x + (tw - lg.width) // 2, y + (th - lg.height) // 2 - 20), lg)
        label(d, (x + 30, y + th - 70), f"{name}  #%02X%02X%02X" % bg, 32, text_color_for(bg))
    im.save(a.out); print(f"Wrote {a.out}")


# ------------------------------------------------------------------ clearspace
def cmd_clearspace(a):
    brand, light, _ = load(a.brand)
    im = Image.new("RGB", (W, H), (255, 255, 255)); d = ImageDraw.Draw(im)
    lg = fit(light, W * 0.5, H * 0.35)
    x = (W - lg.width) // 2; y = (H - lg.height) // 2
    X = int(lg.height * a.unit)
    # outer dashed frame = clear space boundary
    box = (x - X, y - X, x + lg.width + X, y + lg.height + X)
    dash(d, box, (34, 34, 34), 4, 24)
    d.rectangle((x, y, x + lg.width, y + lg.height), outline=(160, 160, 160), width=2)
    im.paste(lg, (x, y), lg)
    # X unit markers
    d.rectangle((x - X, y - X, x, y), fill=(230, 240, 255), outline=(34, 34, 34), width=2)
    label(d, (x - X + 10, y - X + 6), "X", 36)
    d.rectangle((x + lg.width, y + lg.height, x + lg.width + X, y + lg.height + X), fill=(230, 240, 255), outline=(34, 34, 34), width=2)
    label(d, (x + lg.width + 10, y + lg.height + 6), "X", 36)
    frac = {0.25: "one quarter", 0.5: "one half", 1.0: "the full"}.get(a.unit, f"{a.unit:g} ×")
    label(d, (MARGIN, H - MARGIN - 40), f"Clear space X = {frac} height of the mark. Nothing inside the dashed frame.", 36)
    im.save(a.out); print(f"Wrote {a.out}")


def dash(d, box, color, width, step):
    x0, y0, x1, y1 = box
    for x in range(x0, x1, step * 2):
        d.line((x, y0, min(x + step, x1), y0), fill=color, width=width); d.line((x, y1, min(x + step, x1), y1), fill=color, width=width)
    for y in range(y0, y1, step * 2):
        d.line((x0, y, x0, min(y + step, y1)), fill=color, width=width); d.line((x1, y, x1, min(y + step, y1)), fill=color, width=width)


# ------------------------------------------------------------------ scaling
def cmd_scaling(a):
    brand, light, _ = load(a.brand)
    im = Image.new("RGB", (W, H), (255, 255, 255)); d = ImageDraw.Draw(im)
    heights = [128, 64, 32, 16]
    scale = 3  # drawn at 3x so the smallest sizes are visible on the sheet; labels give true size
    x = MARGIN
    for hpx in heights:
        lg = light.resize((max(1, int(light.width * hpx / light.height)), hpx), Image.LANCZOS)
        lg = lg.resize((lg.width * scale, lg.height * scale), Image.NEAREST if hpx <= 32 else Image.LANCZOS)
        y = H // 2 - lg.height // 2
        im.paste(lg, (x, y), lg)
        ok = hpx >= a.min_px
        label(d, (x, y + lg.height + 30), f"{hpx} px" + ("" if ok else " — symbol"), 32, (34, 34, 34) if ok else (180, 30, 30))
        x += lg.width + 120
    label(d, (MARGIN, H - MARGIN - 40), f"Minimum height for the full lockup: {a.min_px} px. Below that, use the symbol alone.", 36)
    im.save(a.out); print(f"Wrote {a.out}")


# ------------------------------------------------------------------ watchouts
def cmd_watchouts(a):
    brand, light, _ = load(a.brand)
    pal = brand["palette"]
    im = Image.new("RGB", (W, H), (255, 255, 255)); d = ImageDraw.Draw(im)
    tw = (W - MARGIN * 4) // 3; th = (H - MARGIN * 3) // 2
    base = fit(light, tw * 0.7, th * 0.45)
    tiles = []
    # 1 stretched
    tiles.append(("Don't stretch or distort", base.resize((int(base.width * 1.5), int(base.height * 0.7))), (255, 255, 255)))
    # 2 recolored
    rec = Image.new("RGBA", base.size, rgb(pal["accent"]) + (255,)); rec.putalpha(base.split()[3])
    tiles.append(("Don't recolor outside the palette", rec, (255, 255, 255)))
    # 3 rotated
    tiles.append(("Don't rotate", base.rotate(14, expand=True, resample=Image.BICUBIC), (255, 255, 255)))
    # 4 busy background
    tiles.append(("Don't place on a busy or low-contrast background", base, "busy"))
    # 5 drop shadow
    sh = Image.new("RGBA", (base.width + 40, base.height + 40), (0, 0, 0, 0))
    shadow = Image.new("RGBA", base.size, (0, 0, 0, 160)); shadow.putalpha(base.split()[3].point(lambda p: p * 0.6))
    sh.paste(shadow, (24, 24), shadow); sh = sh.filter(ImageFilter.GaussianBlur(10)); sh.paste(base, (0, 0), base)
    tiles.append(("Don't add shadows or glows", sh, (255, 255, 255)))
    # 6 rearranged: split in two halves and stack
    half = base.width // 2
    top = base.crop((0, 0, half, base.height)); bottom = base.crop((half, 0, base.width, base.height))
    rearr = Image.new("RGBA", (max(top.width, bottom.width), base.height * 2 + 10), (0, 0, 0, 0))
    rearr.paste(top, (0, 0), top); rearr.paste(bottom, (0, base.height + 10), bottom)
    tiles.append(("Don't separate or rearrange the elements", rearr, (255, 255, 255)))

    for i, (caption, img, bg) in enumerate(tiles):
        x = MARGIN + (i % 3) * (tw + MARGIN); y = MARGIN + (i // 3) * (th + MARGIN)
        if bg == "busy":
            for k in range(0, tw, 28):
                d.line((x + k, y, x + k, y + th), fill=(170, 170, 170), width=9)
            for k in range(0, th, 28):
                d.line((x, y + k, x + tw, y + k), fill=(200, 200, 200), width=5)
        else:
            d.rectangle((x, y, x + tw, y + th), fill=bg)
        d.rectangle((x, y, x + tw, y + th), outline=(220, 220, 220), width=3)
        img = fit(img, tw * 0.85, th * 0.6)
        im.paste(img, (x + (tw - img.width) // 2, y + (th - img.height) // 2 - 30), img)
        # strike
        d.line((x + 40, y + 40, x + tw - 40, y + th - 80), fill=(200, 30, 30), width=10)
        d.line((x + tw - 40, y + 40, x + 40, y + th - 80), fill=(200, 30, 30), width=10)
        label(d, (x + 24, y + th - 64), caption, 30, (34, 34, 34))
    im.save(a.out); print(f"Wrote {a.out}")


# ------------------------------------------------------------------ lockup
def cmd_lockup(a):
    brand, light, _ = load(a.brand)
    im = Image.new("RGB", (W, H), (255, 255, 255)); d = ImageDraw.Draw(im)
    lg = fit(light, W * 0.32, H * 0.3)
    gap = int(lg.height * 0.8)
    div_h = int(lg.height * a.divider)
    partner_w = int(lg.width * 0.9)
    total = lg.width + gap + 6 + gap + partner_w
    x = (W - total) // 2; y = H // 2 - lg.height // 2
    im.paste(lg, (x, y), lg)
    dx = x + lg.width + gap
    d.rectangle((dx, H // 2 - div_h // 2, dx + 6, H // 2 + div_h // 2), fill=(34, 34, 34))
    px = dx + 6 + gap
    d.rectangle((px, y, px + partner_w, y + lg.height), outline=(120, 120, 120), width=4)
    dash(d, (px, y, px + partner_w, y + lg.height), (120, 120, 120), 4, 20)
    t = "PARTNER LOGO"; f = font(44); tw_ = d.textlength(t, font=f)
    d.text((px + (partner_w - tw_) / 2, y + lg.height / 2 - 24), t, font=f, fill=(120, 120, 120))
    label(d, (MARGIN, H - MARGIN - 40), f"Partnership lockup: divider {a.divider:g} × the logo height; size the partner mark to equal visual weight, not equal width.", 34)
    im.save(a.out); print(f"Wrote {a.out}")


# ------------------------------------------------------------------ symbol
def cmd_symbol(a):
    brand, light, _ = load(a.brand)
    sym = Image.open(a.symbol).convert("RGBA")
    im = Image.new("RGB", (W, H), (255, 255, 255)); d = ImageDraw.Draw(im)
    tw = (W - MARGIN * 5) // 4; th = H - MARGIN * 2 - 80
    cells = [("Black on white", (255, 255, 255), False, None), ("White on black", (34, 34, 34), True, None),
             ("In a circle", (255, 255, 255), False, "circle"), ("In a rounded square", (255, 255, 255), False, "square")]
    for i, (cap, bg, invert, shape) in enumerate(cells):
        x = MARGIN + i * (tw + MARGIN); y = MARGIN
        d.rectangle((x, y, x + tw, y + th), fill=bg, outline=(220, 220, 220), width=3)
        s = fit(sym, tw * 0.5, th * 0.5)
        if invert:
            inv = Image.new("RGBA", s.size, (255, 255, 255, 255)); inv.putalpha(s.split()[3]); s = inv
        cx, cy = x + tw // 2, y + th // 2
        if shape:
            r = int(s.width * 0.75)
            if shape == "circle":
                d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=(34, 34, 34))
            else:
                d.rounded_rectangle((cx - r, cy - r, cx + r, cy + r), radius=r // 4, fill=(34, 34, 34))
            inv = Image.new("RGBA", s.size, (255, 255, 255, 255)); inv.putalpha(s.split()[3]); s = inv
        im.paste(s, (cx - s.width // 2, cy - s.height // 2), s)
        label(d, (x + 20, y + th - 60), cap, 30, text_color_for(bg))
    label(d, (MARGIN, H - MARGIN - 30), "Symbol colorways and avatar containers; one clear-space unit of margin inside the container.", 32)
    im.save(a.out); print(f"Wrote {a.out}")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    for name in ("backgrounds", "clearspace", "scaling", "watchouts", "lockup", "symbol"):
        p = sub.add_parser(name); p.add_argument("brand"); p.add_argument("out")
        if name == "clearspace": p.add_argument("--unit", type=float, default=0.25)
        if name == "scaling": p.add_argument("--min-px", type=int, default=32)
        if name == "lockup": p.add_argument("--divider", type=float, default=1.5)
        if name == "symbol": p.add_argument("--symbol", required=True)
    a = ap.parse_args()
    globals()["cmd_" + a.cmd](a)


if __name__ == "__main__":
    main()
