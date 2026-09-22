#!/usr/bin/env python3
"""
build_letter.py — Build a business letter on the LF Letterhead template.

    python3 build_letter.py letter.md output.docx [--brand brand.json]

Thin wrapper over build_doc.py --letterhead. Front matter keys:

    ---
    date: September 22, 2026
    to: |
      Jane Doe
      VP Engineering, Acme Corp
      123 Main St, Springfield
    salutation: Dear Jane,
    closing: Sincerely,
    signature: |
      Jim Zemlin
      Executive Director, The Linux Foundation
    ---
    Body paragraphs in Markdown …
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import build_doc  # noqa: E402

if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("--brand")]
    brand = None
    if "--brand" in sys.argv:
        brand = sys.argv[sys.argv.index("--brand") + 1]
        args = [a for a in args if a != brand]
    if len(args) != 2:
        print(__doc__); sys.exit(1)
    build_doc.build(args[0], args[1], brand, letterhead=True)
