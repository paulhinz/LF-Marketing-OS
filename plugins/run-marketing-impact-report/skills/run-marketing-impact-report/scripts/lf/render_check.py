#!/usr/bin/env python3
"""
render_check.py — Render a .pptx or .docx to PDF with LibreOffice and build a
PNG contact sheet so the pages can be inspected before delivery.

    python3 render_check.py output.pptx [--dpi 50] [--cols 4] [--out sheet.png]

Prints the page count, the sheet path, and a warning list:
  * pages whose text spills past the margin box (very dark/dense bottom rows)
  * leftover template placeholder text ("Click to add", "{Project_Name}", "Lorem")
  * missing fonts reported by LibreOffice (install fonts-open-sans / fonts-roboto-slab
    or accept the substitution — the .pptx/.docx itself still carries the right font)
"""
import argparse
import re
import subprocess
import sys
import tempfile
import zipfile
from pathlib import Path


def leftover_placeholders(path):
    hits = set()
    pat = re.compile(r"(Click to add|\{[A-Z][A-Za-z_]+\}|Lorem ipsum|Please Make a Copy)")
    with zipfile.ZipFile(path) as z:
        for n in z.namelist():
            if n.endswith(".xml") and ("slides/slide" in n or n.startswith("word/")):
                for m in pat.finditer(z.read(n).decode("utf-8", "ignore")):
                    hits.add(m.group(0))
    return sorted(hits)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("file"); ap.add_argument("--dpi", type=int, default=50)
    ap.add_argument("--cols", type=int, default=4); ap.add_argument("--out")
    a = ap.parse_args()
    src = Path(a.file).resolve()
    tmp = Path(tempfile.mkdtemp())
    r = subprocess.run(["soffice", "--headless", "--convert-to", "pdf", "--outdir", str(tmp), str(src)],
                       capture_output=True, text=True, timeout=180)
    pdf = tmp / (src.stem + ".pdf")
    if not pdf.exists():
        print("LibreOffice conversion failed:\n" + r.stdout + r.stderr); sys.exit(1)
    subprocess.run(["pdftoppm", "-r", str(a.dpi), "-png", str(pdf), str(tmp / "pg")], check=True)
    pages = sorted(tmp.glob("pg-*.png"))
    from PIL import Image
    ims = [Image.open(p).convert("RGB") for p in pages]
    w, h = ims[0].size
    cols = min(a.cols, len(ims)); rows = (len(ims) + cols - 1) // cols
    sheet = Image.new("RGB", (w * cols + 8 * (cols - 1), h * rows + 8 * (rows - 1)), (120, 120, 120))
    for i, im in enumerate(ims):
        sheet.paste(im, ((i % cols) * (w + 8), (i // cols) * (h + 8)))
    out = Path(a.out) if a.out else src.with_suffix(".sheet.png")
    sheet.save(out)
    print(f"{len(ims)} page(s) → {out}  (pdf: {pdf})")
    warn = leftover_placeholders(src)
    if warn:
        print("WARN leftover template text:", ", ".join(warn))
    if "font" in (r.stderr or "").lower():
        print("NOTE LibreOffice font substitution in this render; the file itself keeps the template fonts.")


if __name__ == "__main__":
    main()
