# Generates the LF 2025 Template's two gradient PNGs for pptxgenjs:
#   /tmp/gradbar.png — the gradient top bar on every slide
#   /tmp/darkbg.png  — the dark-slide diagonal background
# Gradient stops extracted from the canonical Google Slides template
# ("LF 2025 Template", docs.google.com/presentation/d/1gOJakd6SdB7MLGflP-B0TVqsVU5lq-HGjI1TH4boCe8).
# Usage: python3 make_gradient.py   (requires Pillow)
from PIL import Image


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def color_at(stops, p):
    for i in range(len(stops) - 1):
        p0, c0 = stops[i]
        p1, c1 = stops[i + 1]
        if p0 <= p <= p1:
            return lerp(c0, c1, (p - p0) / (p1 - p0))
    return stops[-1][1]


# ---- Top bar: Azure #0094FF -> Cyan #12E2E2 (50%) -> Royal Navy #003778, left to right
W, H = 2000, 26
bar = Image.new("RGB", (W, H))
bar_stops = [(0.0, (0x00, 0x94, 0xFF)), (0.5, (0x12, 0xE2, 0xE2)), (1.0, (0x00, 0x37, 0x78))]
for x in range(W):
    c = color_at(bar_stops, x / (W - 1))
    for y in range(H):
        bar.putpixel((x, y), c)
bar.save("/tmp/gradbar.png")
print("wrote /tmp/gradbar.png")

# ---- Dark background: #3D3E5B (top-left) -> #100F18 (bottom-right), diagonal
BW, BH = 1920, 1080
bg = Image.new("RGB", (BW, BH))
bg_stops = [(0.0, (0x3D, 0x3E, 0x5B)), (1.0, (0x10, 0x0F, 0x18))]
denom = (BW - 1) + (BH - 1)
row = [0.0] * BW
for y in range(BH):
    for x in range(BW):
        bg.putpixel((x, y), color_at(bg_stops, (x + y) / denom))
bg.save("/tmp/darkbg.png")
print("wrote /tmp/darkbg.png")
