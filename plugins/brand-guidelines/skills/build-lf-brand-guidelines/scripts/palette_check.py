#!/usr/bin/env python3
"""
palette_check.py — compute WCAG contrast ratios for a brand.json palette (or a
list of hex values) against white, black and each other, so the Brand
Guidelines report measured ratios rather than estimates.

    python3 palette_check.py brand.json
    python3 palette_check.py brand.json --markdown        # table rows for the "Contrast and use" slide
    python3 palette_check.py "#0A7739" "#222222" "#F1F1F1"

AA thresholds: 4.5:1 normal text, 3:1 large text (18pt+, or bold 14pt+).
"""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import lfbrand  # noqa: E402


def verdict(ratio):
    if ratio >= 4.5:
        return "AA normal"
    if ratio >= 3.0:
        return "AA large only"
    return "fails"


def load(args):
    if len(args) == 1 and args[0].lower().endswith(".json"):
        raw = json.loads(Path(args[0]).read_text())
        pal = (raw.get("palette") or {})
        items = [(role, lfbrand.norm_hex(hx)) for role, hx in pal.items() if hx]
        if not items:
            raise SystemExit("brand.json has no palette values (palette is null or empty).")
        return items
    return [(f"color{i+1}", lfbrand.norm_hex(h)) for i, h in enumerate(args)]


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    md = "--markdown" in sys.argv
    if not args:
        raise SystemExit(__doc__)
    items = load(args)
    if md:
        print("| Role | Hex | On white | On black | Use |")
        print("|---|---|---|---|---|")
        for role, hx in items:
            w = lfbrand.contrast(hx, "FFFFFF"); b = lfbrand.contrast(hx, "000000")
            print(f"| {role} | #{hx} | {w:.2f}:1 — {verdict(w)} | {b:.2f}:1 — {verdict(b)} | |")
        return
    print(f"{'role':<14}{'hex':<9}{'on white':<22}{'on black':<22}")
    for role, hx in items:
        w = lfbrand.contrast(hx, "FFFFFF"); b = lfbrand.contrast(hx, "000000")
        print(f"{role:<14}#{hx:<8}{w:5.2f}:1 {verdict(w):<14}{b:5.2f}:1 {verdict(b):<14}")
    print("\npairwise (text on background):")
    for r1, h1 in items:
        for r2, h2 in items:
            if r1 >= r2:
                continue
            c = lfbrand.contrast(h1, h2)
            print(f"  {r1} on {r2}: {c:.2f}:1 {verdict(c)}")


if __name__ == "__main__":
    main()
