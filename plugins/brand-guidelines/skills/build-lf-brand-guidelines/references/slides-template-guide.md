# LF 2025 Template — slides guide

Source: Google Slides "LF 2025 Template" (`1gOJakd6SdB7MLGflP-B0TVqsVU5lq-HGjI1TH4boCe8`, LF Creative). Bundled export: `assets/LF-2025-Template.pptx`. `scripts/build_deck.py` only adds slides on the template's own layouts, so the visual system is inherited, never re-created.

## Visual system (inherited)

- 16:9, 10 × 5.625 in. Fonts Open Sans Medium (titles) / Open Sans (body); Montserrat secondary; Arial fallback.
- Dark layouts: diagonal gradient `#3D3E5B` → `#100F18`, white titles, Azure `#0094FF` subtitles, white LF logo.
- Light layouts: white, dark text, color LF logo bottom-left, slide number bottom-right.
- Footer/top bar gradient Azure `#0094FF` → Cyan `#12E2E2` → Royal Navy `#003778` on every content layout.
- Sizes: 36 pt titles on dark layouts, 27 pt on logo layouts, 14–17 pt body on light content, 10–14 pt on the "content heavy" variants. Text does not auto-shrink: cut words.
- Tables drawn by the script follow the template's agenda table (slide 13): header row `#4285F4` with white bold text, zebra rows white / `#EEEEEE`, 12–13 pt.

## Layout keys

| Key | Template layout | Bg | Fields | Use for |
|---|---|---|---|---|
| `title` | TITLE | dark | `title`, `subtitle` | Slide 1 |
| `title_light` | TITLE_2 | light | `title`, `subtitle` | Alternate cover |
| `title_image` | TITLE_1 | dark | `title`, `subtitle`, `image` (square) | Cover with project logo |
| `section` | SECTION_HEADER | dark | `title` | Dividers |
| `section_light` | SECTION_HEADER_2 | light | `title` | Light divider |
| `statement` | SECTION_HEADER_1 | split | `title` (big statement, left, light panel), `body` (bullets, right, dark panel) | One-idea slides, "the ask" |
| `statement_image` | TITLE_1_1 | dark | `title`, `image` (small square) | Claim beside a logo/icon |
| `body_image` | TITLE_1_1_1 | dark | `bullets`, `image` (tall) | Case study with visual |
| `logos` | SECTION_HEADER_3 | dark | `title`, `images` (≤ 4 squares) | Member logo wall |
| `logos_light` | SECTION_HEADER_3_1 | light | `title`, `images` (≤ 4) | Logo wall, light |
| `content` | TITLE_AND_BODY | light | `title`, `bullets` | Default content slide |
| `content_dense` | TITLE_AND_BODY_1 | light | `title`, `bullets` | Appendix only |
| `two_col` | TITLE_AND_TWO_COLUMNS | light | `title`, `left`, `right` | Comparisons, pain → benefit |
| `two_col_dense` | TITLE_AND_BODY_1_1 | light | `title`, `left`, `right` | Appendix only |
| `content_image` | TITLE_AND_TWO_COLUMNS_1 | light | `title`, `bullets`, `image` (square) | Bullets + diagram |
| `table` | TITLE_ONLY | light | `title`, `table` {`header`, `rows`} | Tiers, agendas, scorecards |
| `chart` | TITLE_ONLY | light | `title`, `image` (PNG), `source` | Charts, timelines, wide images |
| `title_only` | TITLE_ONLY | light | `title` | Free layout |
| `blank` | BLANK | light | — | Avoid |
| `closing` | TITLE_2_1 | light | — | Large LF (or project) logo, no text |

Spec fields: `title`, `subtitle`, `bullets`/`body` (string = level 0; `["text", 1]` indents, max 2), `left`/`right`, `image`, `images`, `table`, `source` (8 pt italic gray line under the body area), `notes` (speaker notes). `**bold**` inside any text becomes a bold run. Pictures in picture placeholders are cropped to the placeholder (squares): pad logos to square first. `chart` scales the image into the body area without cropping.

## Typical outlines

- Quarterly plan / review deck: `title` → `statement` (headline result) → `content`/`table` per goal → `chart` for trends → `section` "Next quarter" → `content` goals → `closing`.
- Executive briefing: `title_image` → `section` per act → `content_image` / `two_col` → `logos` → `table` → `statement` (the ask) → `closing`.
- Workbook (pre-filled, for review): `title` → `content` with **DRAFT** lead-ins → `two_col` "YOUR INPUT" questions → appendix on dense layouts.

## Checks before delivering

- Render (`render_check.py`) and look at every slide. Text inside its placeholder; no "Click to add"; footer bar and logo on every content slide; cover and dividers dark.
- With a brand override: project logo present on light and dark slides, bar and subtitles in the brand palette, table header readable (the script picks the brand primary only when it passes WCAG AA on white, otherwise the neutral dark).
- Slide count within the requesting agent's limit (`--max-slides`).
