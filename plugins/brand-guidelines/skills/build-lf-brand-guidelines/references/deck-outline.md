# Deck outline — the Brand Guidelines on the LF 2025 Slides template

Rendered from the finished Markdown with `scripts/build_deck.py --brand brand.json` (layout keys in `slides-template-guide.md`), so the deck is the first deliverable in the project's logo, palette and fonts: read the contact sheet as a test of the guidelines. It is **image-led**, like the published LF brand pages: every logo rule is a graphic drawn on the project's own mark by `scripts/brand_graphics.py`, the palette is a swatch strip, and each slide carries one rule in a line or two. Target 16–20 slides; hard cap 22. Text does not auto-shrink: cut words. Tables accept `font_size` (≥10) and `col_widths`. The cover, `statement_image` and `section` slides are dark: use the white logo variant there.

## Graphics to generate first

```bash
S=scripts
python3 $S/brand_graphics.py backgrounds brand.json gfx-backgrounds.png          # logo on each surface
python3 $S/brand_graphics.py scaling     brand.json gfx-scaling.png --min-px 32 # minimum size strip
python3 $S/brand_graphics.py clearspace  brand.json gfx-clearspace.png --unit 0.25
python3 $S/brand_graphics.py lockup      brand.json gfx-lockup.png --divider 1.5
python3 $S/brand_graphics.py watchouts   brand.json gfx-watchouts.png
python3 $S/brand_graphics.py symbol      brand.json gfx-symbol.png --symbol logos/<symbol>.png   # only when a symbol exists
python3 $S/make_palette_png.py brand.json palette.png --names "…"
python3 $S/palette_check.py brand.json --markdown
```

Pass the project's real rules (`--min-px`, `--unit`, `--divider`) when its guidelines state them; the defaults are the LF pages' conventions and are labeled `Proposed` on the slide when used.

## Slides

| # | Layout | Title | Content |
|---|---|---|---|
| 1 | `title_image` | `[Project] Brand Guidelines` | subtitle `Logo, color, type, voice and tone · <status> · <Mon YYYY>`; `image`: white square logo. Notes: identity basis per component, sources read. |
| 2 | `table` | `Review sheet: what needs your approval` | header `["#", "Field", "Current wording", "Source", "Approve / Edit", "Notes"]`, `col_widths [0.04, 0.16, 0.42, 0.14, 0.1, 0.14]`, `font_size` 10; ≤6 rows per slide; second slide `Review sheet (continued)`. `source`: status line and counts. |
| 3 | `statement` | the purpose paragraph's first sentence (from the Messaging Document) | body: `**Positioning —** …` · `**Tagline —** … (status)` · `**Pillars —** tags` · `**Audiences —** names`. `source`: "Words live in the Messaging Document; this deck governs how they look and sound." |
| 4 | `content` | `[N] brand attributes` | one bullet per attribute: `**Attribute —** gloss (from pillar tag)`. |
| 5 | `section` | `Logo` | — |
| 6 | `statement_image` | one sentence: what the mark is, what it references, where the files live | `image`: white square logo. Notes: download package URL, owner. |
| 7 | `chart` | `One mark, four surfaces` | `image`: `gfx-backgrounds.png`; `source`: which variant on which background; logo color options. |
| 8 | `chart` | `Minimum size: [N] px, then the symbol` | `image`: `gfx-scaling.png`; `source`: the rule and its basis (Documented / Proposed). |
| 9 | `chart` | `Clear space is measured in X` | `image`: `gfx-clearspace.png`; `source`: how X is defined and that it applies to the symbol too. |
| 10 | `chart` | `Partnership lockups` | `image`: `gfx-lockup.png`; `source`: divider rule, visual-weight rule, clearspace between elements. |
| 11 | `chart` | `Watchouts` | `image`: `gfx-watchouts.png`; `source`: "Any of these breaks the [attribute] the system is built on." Add "implying affiliation or endorsement" to the notes. |
| 12 | `chart` | `The symbol on its own` | `image`: `gfx-symbol.png`; `source`: where the symbol is used and its colorways. Skip when no symbol exists (say so on slide 6's notes and in Open decisions). |
| 13 | `table` | `Logo variations` | header `["Variant", "Exists", "Use", "Background"]`, `font_size` 11. Merge into slide 6's notes when every variant exists and the table would only say "Yes". |
| 14 | `section` | `Color` | — |
| 15 | `chart` | `Primary and secondary palette` | `image`: `palette.png`; `source`: identity basis; primary vs. secondary in one line. |
| 16 | `table` | `Color values and contrast` | header `["Name", "Role", "HEX", "RGB", "On white", "On black"]` (+ `"CMYK"`, `"Pantone"` columns only when published), `font_size` 10–11; `source`: "WCAG AA 4.5:1 normal, 3:1 large; computed. Proportions …; never …". |
| 17 | `section` | `Typography` | — |
| 18 | `table` | `Two typefaces, one job each` | header `["Role", "Family", "Weights", "Size", "Fallback"]`, `font_size` 11; `source`: scale, where to get the fonts, "the logo is a drawn mark, never set in a font", the name-casing rule. |
| 19 | `two_col` | `Iconography and imagery` | left `**Do**` (icon system, owned devices, backgrounds); right `**Don't**`; `source`: identity basis. |
| 20 | `section` | `Voice and tone` | — |
| 21 | `table` | `We are / we are not` | header `["Attribute", "What it means", "What it is not"]`, 3–5 rows, `font_size` 11; `source`: "Sounds like: … · Doesn't sound like: …". |
| 22 | `table` | `Prefer this, avoid that` | header `["Prefer", "Avoid", "Why"]`, 5–8 rows, `font_size` 10–11; `source`: the tone rules in one line. |
| 23 | `table` | `Member badges` | header `["Tier", "Exists", "Variants", "Used on"]`; only for projects with a membership program. |
| 24 | `content` | `Using the brand: what third parties may do` | five bullets (in general; advertising; education; names and domains; merchandise) and the attribution line; the full LF standard text and the contact in notes. |
| 25 | `table` | `Where the brand shows up` | header `["Surface", "Logo", "Palette", "Type", "Note"]`, 6–7 rows, `font_size` 10. |
| 26 | `two_col` | `Before this is approved: your decisions` | left decisions; right owners; last right bullet `**Next:** the ICP & Target Markets agent; brand.json is ready for every downstream agent`. |
| 27 | `closing` | — | project logo. |

Twenty-seven rows with four dividers and three conditional slides (12, 13, 23). Drop the dividers and merge where the project has no material (no symbol, no badges, all variants exist) to land at 16–20; never exceed 22.

## Build and check

```bash
python3 scripts/build_deck.py deck.json "[Project] Brand Guidelines.pptx" --brand brand.json --max-slides 22
python3 scripts/render_check.py "[Project] Brand Guidelines.pptx"
```

Project logo on light and dark slides; bar, subtitles and table headers in the brand palette (a fallback to the dark neutral means the primary fails AA on white — write that into §5); graphics inside the body area with their caption line visible; text inside placeholders; no "Click to add". LibreOffice substitutes brand fonts it lacks; the file carries the right names.
