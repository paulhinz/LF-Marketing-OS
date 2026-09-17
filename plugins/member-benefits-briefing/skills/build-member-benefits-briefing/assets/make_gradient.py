# Generates the LF executive-briefing template's gradient top bar as /tmp/gradbar.png
# Built exclusively from approved Linux Foundation brand colors
# (https://www.linuxfoundation.org/brand-guidelines).
# Usage: python3 make_gradient.py   (requires Pillow)
from PIL import Image

W, H = 2000, 26
img = Image.new("RGB", (W, H))
# gradient stops (position, rgb), left to right:
# Lightest Gray #F6F7FA -> Azure #0094FF -> Royal Navy #003778 -> Darkest Navy #00183C
stops = [(0.0, (246, 247, 250)), (0.35, (0, 148, 255)), (0.70, (0, 55, 120)), (1.0, (0, 24, 60))]

def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))

for x in range(W):
    p = x / (W - 1)
    for i in range(len(stops) - 1):
        p0, c0 = stops[i]
        p1, c1 = stops[i + 1]
        if p0 <= p <= p1:
            c = lerp(c0, c1, (p - p0) / (p1 - p0))
            break
    for y in range(H):
        img.putpixel((x, y), c)

img.save("/tmp/gradbar.png")
print("wrote /tmp/gradbar.png")
