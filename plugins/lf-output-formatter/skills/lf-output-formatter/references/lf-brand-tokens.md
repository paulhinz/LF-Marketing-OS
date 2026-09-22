# LF brand tokens (for output the scripts do not build)

Use these for HTML pages, HTML-to-PDF infographics, spreadsheets and charts so they match the three templates. Values are extracted from the templates and the LF brand guidelines (https://www.linuxfoundation.org/brand-guidelines).

## Colors

| Token | Name | Hex | Use |
|---|---|---|---|
| azure | Azure (primary) | `#0094FF` | Links, subtitles on dark, accent stripes, letterhead footer |
| navy | Royal Navy (primary) | `#003778` | Titles on light, stat numbers, bar end |
| deepnavy | Deep Navy | `#002857` | Dark cards, quote boxes |
| deepazure | Deep Azure | `#0077CC` | Positive status, hover |
| cyan | Cyan (accent) | `#12E2E2` | Bar middle, emphasis on dark |
| pink | Pink (accent) | `#FF00AA` | Negative status, sparingly |
| purple | Royal Purple | `#5B1DE7` | Secondary accent |
| ink | LF Gray | `#222222` | Body text, doc table header |
| gray | LF Gray | `#6E6E6E` / `#434343` | Captions, running header/footer |
| line | LF Gray | `#D5D5D5` / `#D6D6D6` | Hairlines, card borders |
| zebra | LF Gray | `#F1F1F1` (docs) / `#EEEEEE` (slides) | Alternating table rows |
| surface | LF Gray | `#F6F7FA` | Light cards |
| darkgrad | Dark slide gradient | `#3D3E5B` → `#100F18` | Diagonal, dark slides only |
| bar | Footer/top bar | `#0094FF` → `#12E2E2` → `#003778` | Left → right |
| tableblue | Slide table header | `#4285F4` | Agenda-style tables on slides |
| acid | Acid Green | `#ACDE1F` | Light backgrounds only, never text |

## Typography

- Slides: Open Sans Medium (titles), Open Sans (body); Montserrat secondary; Arial fallback.
- Documents: Roboto Slab (headings), Roboto Slab Light (title/subtitle), Open Sans Medium (body 9 pt, 1.5 spacing).
- HTML: `font-family: "Open Sans", Arial, sans-serif;` headings may use `"Roboto Slab", Georgia, serif;` load from Google Fonts.

## Logo

- Official assets only: `assets/lf-stacked-color.svg` (light backgrounds), `assets/lf-stacked-white.svg` (dark). Full sets: https://www.linuxfoundation.org/hubfs/LF_Logo-1.zip
- Clear space at least the height of the "X" in FOUNDATION; never recolor, distort, redraw, or put on a busy background.
- Trademark line for external material: "The Linux Foundation and The Linux Foundation logo design are registered trademarks of The Linux Foundation. Linux is a registered trademark of Linus Torvalds." Usage policy: https://www.linuxfoundation.org/legal/trademark-usage. Questions: brand@linuxfoundation.org.

## Spreadsheets (xlsx skill)

Header row fill `#222222` white bold; zebra `#F1F1F1`; hairlines `#D5D5D5`; Open Sans or Arial 10 pt; freeze the header; LF logo not embedded (Google Sheets drops it) — put the document title and `LFX Marketing OS · [Agent] · [Date]` in row 1 instead.
