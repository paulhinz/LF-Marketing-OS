---
name: brand-kit
description: "This skill should be used to \"draft a brand kit\", \"pull brand colors and fonts\", \"make the brand kit for a project\" or \"build the brand kit PDF\" for a Linux Foundation project in the LFX Marketing OS. It reads the project's real logo files, website and brand page, returns the kit tokens (colors, typeface, voice) as JSON, and renders the 16-page brand kit book as HTML and PDF.\n"
metadata:
  version: "0.5.0"
---

# Brand kit

Two parts. **Draft** the tokens (stateless: input in, JSON out, never a database write). **Render** the book from those tokens with `scripts/`.

## Part 1 · Draft `kit`
Input: the shared input object (project, sources, `context.mf` / `context.mh`) plus `logos` (SVG text, see `references/render-input.md`).
Output:
```json
{
  "kit": { "colors": [["Navy", "#1A3A6B", "Logo and dark grounds"], ["White", "#FFFFFF", "Page"], ["Coral", "#F26B4F", "Accent, used sparingly"]],
           "font": "Inter", "fontNote": "…", "attrs": [["Attribute", "How it shows up in copy"]],
           "dark": "#1A3A6B", "accent": "#F26B4F", "spark": "#F26B4F", "word": "PROJECT" },
  "report": { "sources_read": [], "sources_failed": [], "gaps": [], "notes": "" }
}
```
1. **Logos.** Collect every fill and stroke color from the SVGs. No logo files: say so in `report.gaps`; the book uses placeholder marks until they're uploaded. Never draw, describe or reconstruct a logo.
2. **Brand page and site.** The project's `/brand` page if it exists, then the home page and its CSS. Prefer published palette values and the named typeface.
3. **Colors.** 4–5: first the primary dark, second white (or the light ground), then accents. Name each as the brand page does, or plainly. Give each a role. Every hex comes from the logo SVG, the brand page or the site CSS.
4. **Typeface.** The brand's typeface if it's on Google Fonts; otherwise the nearest Google Fonts family, and say so in `fontNote`.
5. **Voice.** Four `attrs` from the messaging framework (positioning, sound bites, say / avoid) and message house in `context`, plus the site's own writing; one sentence each on how it shows up in copy.
6. **Tokens.** `dark` = primary dark, `accent` = main accent, `spark` = the highlight used once per view, `word` = the short name in capitals.

7. **Contrast.** Check the tokens: `dark` with white text, and `accent` as text on white and on `dark`. Report any pair under 4.5:1 in `report.notes` (the renderers substitute an accessible tint for that use). If there's no white or reversed logo, add it to `report.gaps`.

Rules: no invented colors, fonts or marks; every value has a source. US English, sentence case.

## Part 2 · Render the book
Input: `references/render-input.md` (needs `content.kit`, `content.mh`, `content.bp`, and `logos` when available).
```
cd scripts && npm install        # first run only; installs puppeteer for the PDF
node build_book.js <input.json> <out_dir>
```
**From a folder of skill outputs.** Instead of an input file, pass the folder that holds the drafting skills' JSON files (any names; full outputs like `{"mf", "icp", "mh", "nums", "report"}` or bare values like the boilerplates array both work) and the logo SVGs, plus the project name and domain:
```
node build_book.js ./outputs-folder <out_dir> --name "Akrites" --domain akrites.org
```
`scripts/assemble.js` combines them (`node assemble.js <folder> --name … --domain … -o input.json` writes the combined input and lists what's found and missing). Logos are picked by file name: the white/reversed file for dark grounds, the full-color one for light. If something is missing, the script stops and names the skill to run.

Prints JSON with `html` (always, print-ready at 11 × 8.5 in) and `pdf` (when headless Chrome is available).

16 pages: cover, contents, logo system, colorways, clear space and minimum size, symbol and symbol in shape, partnership lockup, watchouts, color palette, color contrast (WCAG ratios computed from the palette), typography, iconography, imagery and graphic elements, example usage, voice in brief, back cover.

The book never changes copy or tokens; fix them in Part 1 and re-render.

## Accessibility (WCAG 2.2 AA)
Every output is built to pass, without changing the brand where it already passes:
- **Text contrast.** Text is 4.5:1 against what's behind it (3:1 for large text, 24px+ or 18.66px+ bold). Brand colours are kept wherever they pass; when one doesn't (an orange accent as small text on a charcoal band, say), that use gets the nearest passing tint of the same hue. The script's output lists each substitution under `colours`.
- **Logos.** Parts of a logo that fall under 3:1 against their background are recoloured white on dark grounds and near-black on light ones, so a charcoal wordmark never sits on a charcoal band. A supplied white/reversed logo is still preferred; the recolouring covers what it doesn't.
- **Check after rendering.** With headless Chrome available, the script renders the page, measures every piece of text against what is actually painted under it, corrects anything still failing before the PDF is made, and reports it under `a11y` (`textElements` checked, `corrected`, `stillFailing`, which should be empty). Without Chrome the colour fixes still apply and `a11y.note` says the check was skipped.
- **Structure.** HTML has a language and title, logos have alt text, and PDFs are tagged.

