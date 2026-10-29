# LF executive briefing template — design system

**Canonical template: the "LF 2025 Template" Google Slides deck —
https://docs.google.com/presentation/d/1gOJakd6SdB7MLGflP-B0TVqsVU5lq-HGjI1TH4boCe8/**
Every output slide must be formatted to this template. The design tokens below were
extracted directly from that deck (gradient stops, table styling, layout furniture);
where the template is silent (charts, dense data layouts), fall back to the approved
Linux Foundation brand palette (https://www.linuxfoundation.org/brand-guidelines).
The example generator implements all of this; keep any new slides consistent with it.

## Canvas & typography

- 16:9 wide (13.33" × 7.5"), pptxgenjs `LAYOUT_WIDE`.
- Font: **Open Sans** everywhere (the template's typeface; the deck also loads
  Montserrat as a secondary). Set `fontFace: "Open Sans"` in pptxgenjs. For the
  LibreOffice QA render, install it first (`apt-get install -y fonts-open-sans`
  or accept the substitution note); if a target environment cannot ship Open Sans,
  Arial is the approved fallback.
- Slide titles: 21–25pt bold, sentence case, Royal Navy, top-left.
- Body: 9.5–11pt; caps micro-headers 10pt bold with letter-spacing.
- Section-divider titles: ~40pt white, centered horizontally and vertically.

## The two template backgrounds

Every slide is one of these two — no other slide backgrounds:

1. **Light slides** — pure white `FFFFFF`.
2. **Dark slides** (title, section dividers, dark spotlights) — the template's
   diagonal gradient, `3D3E5B` (top-left) → `100F18` (bottom-right). pptxgenjs has
   no gradient fills, so it is a PNG (`make_gradient.py` → `/tmp/darkbg.png`) set
   as the full-bleed background image. Never use a flat navy background for these.

## Colors

Template-extracted tokens (exact values from the Google Slides file):

| Token | Hex | Use |
|---|---|---|
| darkbg | `3D3E5B` → `100F18` | Dark-slide background gradient (diagonal) |
| bar | `0094FF` → `12E2E2` → `003778` | Gradient top bar (Azure → Cyan @50% → Royal Navy) |
| tableBlue | `4285F4` | Table header row fill; rounded-outline box strokes |
| tableAlt | `EEEEEE` | Alternating (zebra) table body rows |
| white | `FFFFFF` | Light-slide background; text on dark |

Approved LF brand palette for everything else (unchanged from the brand guidelines):

| Token | LF brand color | Hex | Use |
|---|---|---|---|
| navy | Deep Navy (primary shade) | `002857` | Dark cards, quote boxes |
| title | Royal Navy (primary) | `003778` | Titles, stat numbers, bold leads on light |
| ink | LF Gray | `222222` | Body text on light |
| gray | LF Gray | `6E6E6E` | Captions, caps kickers on light |
| cyan | Azure (primary) | `0094FF` | Accent stripes; caps kickers on dark |
| sky | Cyan (accent) | `12E2E2` | Light italic/emphasis on dark |
| card | LF Gray | `F6F7FA` / border `D6D6D6` | Light cards |
| — | Deep Azure (primary shade) | `0077CC` | Positive/OPEN status text |
| — | Pink (accent) | `FF00AA` | Negative/CLOSED status text |
| — | LF Gray | `A1A1A4` | Source lines |

Remaining approved colors, available if needed: Royal Purple `5B1DE7`, Deep Purple
`3D14A3`, Darkest Purple `11156D`, Darkest Azure `00548F`, grays `D6D6D6`/`818183`,
Acid Green `ACDE1F` (light backgrounds only — poor contrast for text).

## Signature elements (every slide)

1. **Gradient top bar** — full-width, ~0.1" tall, left→right, the template's exact
   stops: Azure `0094FF` (0%) → Cyan `12E2E2` (50%) → Royal Navy `003778` (100%).
   pptxgenjs has no gradient fills, so it is a PNG (`make_gradient.py` →
   `/tmp/gradbar.png`) placed at (0,0). Present on every slide, light or dark.
2. **LF logo** — the OFFICIAL logo assets from the brand guidelines, never a redrawn
   recreation. `assets/lf-stacked-color.svg` (for light backgrounds) and
   `assets/lf-stacked-white.svg` (for dark backgrounds); `make_logos.py` renders them
   to `/tmp/lf-stacked-*.png` for pptxgenjs. Placement per the template: title/divider
   (dark) slides top-left or bottom-left white version; content slides bottom-left
   color (light) / white (dark); optional closing slide = large color logo centered
   on white. Never edit, recolor, distort, or redraw the logo; keep clear space
   around it at least the height of the "X" in the FOUNDATION type. Full logo sets:
   https://www.linuxfoundation.org/hubfs/LF_Logo-1.zip
3. **Page number** — bottom-right, 10pt gray (light slides) / light gray (dark slides).
4. **Source line** — 8pt italic gray (`A1A1A4`), right-aligned at the bottom, on data slides.

## Layout patterns

- **Title slide** — dark gradient background; white logo; huge white bold title
  (40–44pt); italic Cyan-accent subtitle; caps kicker in Azure (13–14pt bold,
  letter-spaced) when needed.
- **Section dividers** — dark gradient background; large white centered title (~40pt);
  white logo bottom-left; page number bottom-right.
- **Rounded-outline content box** — the template's signature container: generous corner
  radius (`rectRadius` ≈ 0.25–0.4), no fill (or background-matching fill), 1pt stroke
  `4285F4`. Used for callouts/spotlight content on both dark and light slides.
- **Tables (template agenda style)** — header row filled `4285F4` with white bold text;
  body rows alternate white / `EEEEEE`; white (invisible-on-white) borders — visually
  an open zebra table, no dark header.
- **4-up stat slide** — four square light cards (thin `D6D6D6` border, no rounding);
  number 27–36pt bold in Royal Navy, centered; 10pt centered label below. Beneath: the
  **quote box**.
- **Quote box** — full-width Deep Navy rectangle with a 0.09" Azure stripe on the left
  edge; bold italic white main line (13pt); optional second line "— …" in italic Cyan
  accent (11pt).
- **Asymmetric two-card slide** — LEFT card Deep Navy with an Azure strip across its top
  edge: caps Azure micro-header, bold white statement (15pt), body with Cyan-accent bold
  lead-ins + near-white (`F6F7FA`) text. RIGHT card lightest gray (`F6F7FA`, thin border)
  with an Azure stripe on its left edge: caps gray micro-header, bold Royal Navy
  statement, bulleted body with Royal Navy bold lead-ins + ink text. Bold italic Royal
  Navy footer line centered below.
- **Grid cards (3×2)** — light cards, Azure left stripe, 12.5pt bold Royal Navy head,
  9.5pt ink body; bold italic Royal Navy footer.
- **Ranked-row comparison** — full-width rows, Azure left stripe; the featured member's
  row inverts to Deep Navy with Cyan-accent/white text.
- **Charts** — native pptxgenjs bar charts; colors Royal Navy/Azure; no legend; labeled
  values; quiet `D6D6D6` gridlines.

## Brand compliance

- Logo and palette come from https://www.linuxfoundation.org/brand-guidelines; trademark use must follow https://www.linuxfoundation.org/legal/trademark-usage.
- Include the attribution line in the deck's closing/fine-print slide notes: "The Linux Foundation and The Linux Foundation logo design are registered trademarks of The Linux Foundation. Linux is a registered trademark of Linus Torvalds."
- Brand questions: brand@linuxfoundation.org.

## Build & QA gotchas (pptxgenjs)

- Hex colors without `#`. Never share option objects across `add*` calls (mutated in place).
- Dark slides: `s.background = { path: "/tmp/darkbg.png" }` (image background), not a flat color.
- Rounded-outline boxes: `s.addShape("roundRect", { rectRadius: 0.3, fill: {...}, line: { color: "4285F4", width: 1 } })`.
- Bullets: `bullet: { code: "2022", indent: 10 }` on the first run of a paragraph; `breakLine: true` ends it; space with `paraSpaceAfter`.
- Bold lead-in + plain rest inside one bullet = two runs: `{text: lead, bold, bullet}` then `{text: " — rest", breakLine: true}`.
- `pip install --break-system-packages "markitdown[pptx]" Pillow defusedxml lxml cairosvg` for the pptx skill's `validate.py` and the logo/gradient helpers; run `validate.py` after every build.
- Visual QA: LibreOffice → PDF → `pdftoppm -jpeg -r 90`, inspect at least one render of every layout type, checking template fidelity (gradient bar present, correct background, logo variant, table zebra style). Most common defects: footer/card collisions on 3-row+ grids and stat labels overflowing their card.
