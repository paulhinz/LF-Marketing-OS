# Generates the LF executive-briefing template's gradient top bar as /tmp/gradbar.png
# Usage: python3 make_gradient.py   (requires Pillow)
from PIL import Image

W, H = 2000, 26
img = Image.new("RGB", (W, H))
# gradient stops (position, rgb): pale blue -> light cyan -> teal -> navy
stops = [(0.0, (224, 240, 250)), (0.28, (126, 205, 232)), (0.55, (38, 174, 200)), (1.0, (14, 38, 66))]

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
