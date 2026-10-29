# Converts the official Linux Foundation logo SVGs (in this assets/ folder) to PNGs
# for pptxgenjs. The SVGs are the approved assets from
# https://www.linuxfoundation.org/brand-guidelines — never edit or recolor them.
# Usage: python3 make_logos.py   (pip install cairosvg --break-system-packages)
import os
import cairosvg

here = os.path.dirname(os.path.abspath(__file__))
for name in ("lf-stacked-color", "lf-stacked-white"):
    cairosvg.svg2png(url=os.path.join(here, name + ".svg"),
                     write_to=f"/tmp/{name}.png", output_width=1200)
print("wrote /tmp/lf-stacked-color.png and /tmp/lf-stacked-white.png")
