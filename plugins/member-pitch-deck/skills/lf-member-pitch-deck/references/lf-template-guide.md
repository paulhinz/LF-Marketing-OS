# LF 2025 Template guide

Source: Google Slides "LF 2025 Template" (id `1gOJakd6SdB7MLGflP-B0TVqsVU5lq-HGjI1TH4boCe8`, owned by LF Creative). Bundled export: `assets/LF-2025-Template.pptx`. Every Member Pitch Deck is built from this file by `scripts/build_deck.py`; the script only adds slides on the template's own layouts, so the visual system below is inherited, never re-created.

## Visual system (inherited — do not override)

- Slide size 10 × 5.625 in (16:9)
- Fonts: Open Sans Medium for titles, Open Sans for body; Arial fallback
- Dark layouts: gradient background from `#3D3E5B` to `#100F18`, white title text, blue `#0094FF` subtitle text
- Light layouts: white background, dark text
- Accents: LF navy `#003778`, LF blue `#0094FF`, cyan `#12E2E2`; gradient footer bar (blue → cyan) and the LF logo on every content layout; slide number bottom right
- Default sizes: 36pt titles on dark layouts, 27pt on logo layouts, 14–17pt body text on light content layouts, 10–14pt on the "content heavy" variants (appendix only). Body text does not auto-shrink — cut words instead.

## Layout keys

Use the key in the left column in the JSON spec. The script maps it to the template layout in the middle column.

| Key | Template layout | Background | Fields the spec fills | Use it for |
|---|---|---|---|---|
| `title` | TITLE | dark | `title`, `subtitle` | Slide 1 — project name + tagline / presenter / date |
| `title_light` | TITLE_2 | light | `title`, `subtitle` | Alternate title slide (rarely) |
| `title_image` | TITLE_1 | dark | `title`, `subtitle`, `image` (square) | Title slide with the project logo |
| `section` | SECTION_HEADER | dark | `title` | Act dividers when needed (counts toward 20) |
| `section_light` | SECTION_HEADER_2 | light | `title` | Light divider |
| `statement` | SECTION_HEADER_1 | dark | `title` (big statement, left), `body` (bullets, right) | Slide 2 Their world, slide 4 One sentence, slide 5 Why now, slide 18 The ask |
| `statement_image` | TITLE_1_1 | dark | `title`, `image` (small square) | A single bold claim beside a logo or icon |
| `body_image` | TITLE_1_1_1 | dark | `bullets` (left), `image` (tall, right) | Case study with a member photo/visual |
| `logos` | SECTION_HEADER_3 | dark | `title`, `images` (up to 4 squares) | Slide 13 Who's involved — member logo wall |
| `logos_light` | SECTION_HEADER_3_1 | light | `title`, `images` (up to 4 squares) | Logo wall, light variant |
| `content` | TITLE_AND_BODY | light | `title`, `bullets` | Default content slide (3, 9, 14, 17) |
| `content_dense` | TITLE_AND_BODY_1 | light | `title`, `bullets` | Appendix only (slides 19–20) — smaller type |
| `two_col` | TITLE_AND_TWO_COLUMNS | light | `title`, `left`, `right` | Slide 8 Landscape, slide 16 ROI (pain → benefit) |
| `two_col_dense` | TITLE_AND_BODY_1_1 | light | `title`, `left`, `right` | Appendix only |
| `content_image` | TITLE_AND_TWO_COLUMNS_1 | light | `title`, `bullets`, `image` (square) | Slide 6 Ecosystem, slide 7 How it works, slides 11–12 case studies |
| `table` | TITLE_ONLY | light | `title`, `table` {`header`, `rows`} | Slide 15 Membership tiers & benefits |
| `chart` | TITLE_ONLY | light | `title`, `image` (chart PNG) | Slide 10 Traction, slide 14 Roadmap timeline |
| `title_only` | TITLE_ONLY | light | `title` | Free layout when nothing else fits |
| `blank` | BLANK | light | — | Avoid |
| `closing` | TITLE_2_1 | light | — | Optional final LF logo slide (counts toward 20) |

## Spec fields

- `title` — string; the main title placeholder
- `subtitle` — string; second title-type placeholder on `title`, `title_light`, `title_image`
- `bullets` / `body` — list; a string is a level-0 bullet, `["text", 1]` indents one level (max 2)
- `left`, `right` — bullet lists for the two-column layouts
- `image` — path to a PNG/JPG; `images` — list of paths for `logos` layouts (fills placeholders in order)
- `table` — `{"header": [...], "rows": [[...], ...]}`; drawn in the body area of `table`
- `notes` — speaker notes (the prep brief) for any slide

Images placed in a picture placeholder are cropped to the placeholder's shape (squares on this template); prepare square logos with padding. Charts and other wide images go on the `chart` layout, which scales them to the body area without cropping.

## Standard outline → default layouts

| # | Slide | Key |
|---|---|---|
| 1 | Title | `title_image` (project logo) or `title` |
| 2 | Their world | `statement` |
| 3 | The cost of going it alone | `content` |
| 4 | The project, in one sentence | `statement` |
| 5 | Why now | `statement` |
| 6 | The ecosystem | `content_image` or `chart` |
| 7 | How it works at 1,000 feet | `content_image` or `chart` (architecture PNG) |
| 8 | Landscape | `two_col` |
| 9 | The value of membership | `content` |
| 10 | Traction | `chart` |
| 11 | Case study #1 | `content_image` or `body_image` |
| 12 | Case study #2 / member voices | `content_image` or `two_col` |
| 13 | Who's involved | `logos` |
| 14 | Roadmap | `chart` or `content` |
| 15 | Membership tiers & benefits | `table` |
| 16 | ROI for you | `two_col` (pain points left, benefits right) |
| 17 | Getting started | `content` |
| 18 | The ask | `statement` |
| 19–20 | Appendix/backup | `content_dense`, `two_col_dense`, `table` |

## Checks before delivering

- Render every slide to an image and look at it. Text must sit inside its placeholder; if it spills, cut words.
- No empty placeholders remain (the script strips unused ones; if a "Click to add" box shows, the spec left a field blank on a layout that needed it — pick a different layout).
- The LF footer bar and logo appear on every content slide; the title slide is dark.
- Slide count ≤ 20 including any section or closing slides.
