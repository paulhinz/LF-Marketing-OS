# LF executive briefing template — design system

Matches Jim Zemlin's "…and the Linux Foundation" deck (Google Slides original), restyled to the approved Linux Foundation brand (https://www.linuxfoundation.org/brand-guidelines). The example generator implements all of this; keep any new slides consistent with it, and use only approved LF brand colors and the official logo assets.

## Canvas & typography

- 16:9 wide (13.33" × 7.5"), pptxgenjs `LAYOUT_WIDE`.
- Font: Arial everywhere (safe-list; the original uses a similar humanist sans).
- Slide titles: 21–25pt bold, sentence case, Royal Navy, top-left.
- Body: 9.5–11pt; caps micro-headers 10pt bold with letter-spacing.

## Colors — approved LF brand palette only

All colors below are from the official Linux Foundation brand guidelines. Do not introduce colors outside this palette.

| Token | LF brand color | Hex | Use |
|---|---|---|---|
| navyD | Darkest Navy (primary shade) | `00183C` | Title & section-divider background |
| navy | Deep Navy (primary shade) | `002857` | Dark cards, quote boxes, table headers |
| title | Royal Navy (primary) | `003778` | Titles, stat numbers, bold leads on light |
| ink | LF Gray | `222222` | Body text on light |
| gray | LF Gray | `6E6E6E` | Captions, caps kickers on light |
| cyan | Azure (primary) | `0094FF` | Accent stripes; caps kickers on dark |
| sky | Cyan (accent) | `12E2E2` | Light italic/emphasis on dark |
| card | LF Gray | `F6F7FA` / border `D6D6D6` | Light cards |
| — | Deep Azure (primary shade) | `0077CC` | Positive/OPEN status text |
| — | Pink (accent) | `FF00AA` | Negative/CLOSED status text |
| — | LF Gray | `A1A1A4` | Source lines |

Remaining approved colors, available if needed: Royal Purple `5B1DE7`, Deep Purple `3D14A3`, Darkest Purple `11156D`, Darkest Azure `00548F`, grays `D6D6D6`/`818183`, Acid Green `ACDE1F` (light backgrounds only — poor contrast for text).

## Signature elements (every slide)

1. **Gradient top bar** — full-width, ~0.1" tall, left→right, built only from approved colors: Lightest Gray `F6F7FA` → Azure `0094FF` → Royal Navy `003778` → Darkest Navy `00183C`. pptxgenjs has no gradient fills, so it is a PNG (`make_gradient.py` → `/tmp/gradbar.png`) placed at (0,0).
2. **LF logo** — the OFFICIAL logo assets from the brand guidelines, never a redrawn recreation. `assets/lf-stacked-color.svg` (primary, for light backgrounds) and `assets/lf-stacked-white.svg` (for dark backgrounds); `make_logos.py` renders them to `/tmp/lf-stacked-*.png` for pptxgenjs. Bottom-left on every content slide (color version) and top-left on title/dark slides (white version). Never edit, recolor, distort, or redraw the logo; keep clear space around it at least the height of the "X" in the FOUNDATION type. Full logo sets: https://www.linuxfoundation.org/hubfs/LF_Logo-1.zip
3. **Page number** — bottom-right, 10pt gray, content slides only.
4. **Source line** — 8pt italic gray (`A1A1A4`), right-aligned at the bottom, on data slides.

## Layout patterns

- **Title / section dividers** — full navyD background; caps kicker in Azure (13–14pt bold, letter-spaced); huge white bold title (40–44pt); italic Cyan-accent subtitle; official white logo.
- **4-up stat slide** — four square light cards (thin border, no rounding); number 27–36pt bold in Royal Navy, centered; 10pt centered label below. Beneath: the **quote box**.
- **Quote box** — full-width Deep Navy rectangle with a 0.09" Azure stripe on the left edge; bold italic white main line (13pt); optional second line "— …" in italic Cyan accent (11pt).
- **Asymmetric two-card slide** — LEFT card Deep Navy with an Azure strip across its top edge: caps Azure micro-header, bold white statement (15pt), body with Cyan-accent bold lead-ins + near-white (`F6F7FA`) text. RIGHT card lightest gray (`F6F7FA`, thin border) with an Azure stripe on its left edge: caps gray micro-header, bold Royal Navy statement, bulleted body with Royal Navy bold lead-ins + ink text. Bold italic Royal Navy footer line centered below.
- **Grid cards (3×2)** — light cards, Azure left stripe, 12.5pt bold Royal Navy head, 9.5pt ink body; bold italic Royal Navy footer.
- **Tables** — Deep Navy header row with white bold text; thin `D6D6D6` borders; white rows.
- **Ranked-row comparison** — full-width rows, Azure left stripe; the featured member's row inverts to Deep Navy with Cyan-accent/white text.
- **Charts** — native pptxgenjs bar charts; colors Royal Navy/Azure; no legend; labeled values; quiet `D6D6D6` gridlines.

## Brand compliance

- Logo and palette come from https://www.linuxfoundation.org/brand-guidelines; trademark use must follow https://www.linuxfoundation.org/legal/trademark-usage.
- Include the attribution line in the deck's closing/fine-print slide notes: "The Linux Foundation and The Linux Foundation logo design are registered trademarks of The Linux Foundation. Linux is a registered trademark of Linus Torvalds."
- Brand questions: brand@linuxfoundation.org.

## Build & QA gotchas (pptxgenjs)

- Hex colors without `#`. Never share option objects across `add*` calls (mutated in place).
- Bullets: `bullet: { code: "2022", indent: 10 }` on the first run of a paragraph; `breakLine: true` ends it; space with `paraSpaceAfter`.
- Bold lead-in + plain rest inside one bullet = two runs: `{text: lead, bold, bullet}` then `{text: " — rest", breakLine: true}`.
- `pip install --break-system-packages "markitdown[pptx]" Pillow defusedxml lxml cairosvg` for the pptx skill's `validate.py` and the logo/gradient helpers; run `validate.py` after every build.
- Visual QA: LibreOffice → PDF → `pdftoppm -jpeg -r 90`, inspect at least one render of every layout type. Most common defects: footer/card collisions on 3-row+ grids and stat labels overflowing their card.
