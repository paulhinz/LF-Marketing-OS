# LF executive briefing template — design system

Matches Jim Zemlin's "…and the Linux Foundation" deck (Google Slides original). The example generator implements all of this; keep any new slides consistent with it.

## Canvas & typography

- 16:9 wide (13.33" × 7.5"), pptxgenjs `LAYOUT_WIDE`.
- Font: Arial everywhere (safe-list; the original uses a similar humanist sans).
- Slide titles: 21–25pt bold, sentence case, dark navy, top-left.
- Body: 9.5–11pt; caps micro-headers 10pt bold with letter-spacing.

## Colors

| Token | Hex | Use |
|---|---|---|
| navyD | `0B1C2E` | Title & section-divider background |
| navy | `0F2439` | Dark cards, quote boxes, table headers |
| title | `17293B` | Titles, stat numbers, bold leads on light |
| ink | `2E3B49` | Body text on light |
| gray | `5A6B7F` | Captions, caps kickers on light |
| cyan | `39ACD3` | Accent stripes |
| skyDark | `5CB6DF` | Caps kickers on dark |
| sky | `7CC8E8` | Light-blue italic/emphasis on dark |
| card | `F4F6F7` / border `DFE5EA` | Light cards |

## Signature elements (every slide)

1. **Gradient top bar** — full-width, ~0.1" tall, left→right: pale blue → cyan → teal → navy. pptxgenjs has no gradient fills, so it is a PNG (`make_gradient.py` → `/tmp/gradbar.png`) placed at (0,0).
2. **LF logo lockup** — bottom-left on every content slide (navy-on-white version) and top-left on title/dark slides (white version). Drawn from shapes in the generator (`lfLogo()`): square frame with a top-right notch + inner square, next to stacked "THE / LINUX / FOUNDATION". It is a recreation — swap for the official asset before external use.
3. **Page number** — bottom-right, 10pt gray, content slides only.
4. **Source line** — 8pt italic gray, right-aligned at the bottom, on data slides.

## Layout patterns

- **Title / section dividers** — full navyD background; caps kicker in skyDark (13–14pt bold, letter-spaced); huge white bold title (40–44pt); italic sky subtitle; logo (white).
- **4-up stat slide** — four square light cards (thin border, no rounding); number 27–36pt bold in `title` (dark, not blue), centered; 10pt centered label below. Beneath: the **quote box**.
- **Quote box** — full-width navy rectangle with a 0.09" cyan stripe on the left edge; bold italic white main line (13pt); optional second line "— …" in italic sky (11pt).
- **Asymmetric two-card slide** — LEFT card dark navy with a cyan strip across its top edge: caps skyDark micro-header, bold white statement (15pt), body with sky bold lead-ins + near-white text. RIGHT card near-white (`FAFBFC`, thin border) with a cyan stripe on its left edge: caps gray micro-header, bold navy statement, bulleted body with navy bold lead-ins + ink text. Bold italic navy footer line centered below.
- **Grid cards (3×2)** — light cards, cyan left stripe, 12.5pt bold navy head, 9.5pt ink body; bold italic navy footer.
- **Tables** — navy header row with white bold text; thin `DFE5EA` borders; white rows.
- **Ranked-row comparison** — full-width rows, cyan left stripe; the featured member's row inverts to navy with sky/white text.
- **Charts** — native pptxgenjs bar charts; colors navy/cyan; no legend; labeled values; quiet gridlines.

## Build & QA gotchas (pptxgenjs)

- Hex colors without `#`. Never share option objects across `add*` calls (mutated in place).
- Bullets: `bullet: { code: "2022", indent: 10 }` on the first run of a paragraph; `breakLine: true` ends it; space with `paraSpaceAfter`.
- Bold lead-in + plain rest inside one bullet = two runs: `{text: lead, bold, bullet}` then `{text: " — rest", breakLine: true}`.
- `pip install --break-system-packages "markitdown[pptx]" Pillow defusedxml lxml` for the pptx skill's `validate.py`; run it after every build.
- Visual QA: LibreOffice → PDF → `pdftoppm -jpeg -r 90`, inspect at least one render of every layout type. Most common defects: footer/card collisions on 3-row+ grids and stat labels overflowing their card.
