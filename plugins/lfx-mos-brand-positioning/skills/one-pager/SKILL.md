---
name: one-pager
description: "This skill should be used to \"build the one pager\", \"make a project one-sheet\", \"make a one-page PDF for members and partners\" or \"regenerate the one pager\" for a Linux Foundation project in the LFX Marketing OS. It renders a letter-size page (HTML and PDF) from the message house, the 50-word boilerplate and the brand kit.\n"
metadata:
  version: "0.5.0"
---

# One pager

A renderer: it lays out content the drafting skills returned and never writes copy. Input: `references/render-input.md`. Code: `scripts/` (same output as the Kit prototype).

## Run
1. Check the input has `content.mh`, `content.bp` and `content.kit`. If any is missing, stop and say which skill to run first.
2. Write the input object to a file, then:
   ```
   cd scripts && npm install        # first run only; installs puppeteer for the PDF
   node build.js <input.json> <out_dir>
   ```
   **From a folder of skill outputs.** Instead of an input file, pass the folder that holds the drafting skills' JSON files (any names; full outputs like `{"mf", "icp", "mh", "nums", "report"}` or bare values like the boilerplates array both work) and the logo SVGs, plus the project name and domain:
   ```
   node build.js ./outputs-folder <out_dir> --name "Akrites" --domain akrites.org
   ```
   `scripts/assemble.js` combines them (`node assemble.js <folder> --name … --domain … -o input.json` writes the combined input and lists what's found and missing). Logos are picked by file name: the white/reversed file for dark grounds, the full-color one for light. If something is missing, the script stops and names the skill to run.

3. The script prints JSON with `html` (always) and `pdf` (when headless Chrome is available; otherwise `note` says why it was skipped). The HTML is print-ready at 8.5 × 11 in, so "Print → Save as PDF" gives the same result.

## Layout (fixed, one page)
- Dark band in `kit.dark`: real logo (or placeholder mark), brand line in `kit.accent`, umbrella message.
- The 50-word boilerplate (`bp[2]`).
- The three pillars, each with title, supporting message and the first two proof points; first pillar ruled in `kit.spark`.
- "Who it's for": the four audiences from `mh.aud`.
- Footer: "Get involved" and the domain.

## Accessibility (WCAG 2.2 AA)
Every output is built to pass, without changing the brand where it already passes:
- **Text contrast.** Text is 4.5:1 against what's behind it (3:1 for large text, 24px+ or 18.66px+ bold). Brand colours are kept wherever they pass; when one doesn't (an orange accent as small text on a charcoal band, say), that use gets the nearest passing tint of the same hue. The script's output lists each substitution under `colours`.
- **Logos.** Parts of a logo that fall under 3:1 against their background are recoloured white on dark grounds and near-black on light ones, so a charcoal wordmark never sits on a charcoal band. A supplied white/reversed logo is still preferred; the recolouring covers what it doesn't.
- **Check after rendering.** With headless Chrome available, the script renders the page, measures every piece of text against what is actually painted under it, corrects anything still failing before the PDF is made, and reports it under `a11y` (`textElements` checked, `corrected`, `stillFailing`, which should be empty). Without Chrome the colour fixes still apply and `a11y.note` says the check was skipped.
- **Structure.** HTML has a language and title, logos have alt text, and PDFs are tagged.

## Rules
- The one pager has no copy of its own: it always pulls from the message house and the 50-word boilerplate, so edits are made there and the page is rebuilt.
- Never change the content. Fix copy in the drafting skill, then rebuild.
- If the page overflows (long pillar copy), say so; the fix is shorter copy in the message house, not a smaller font.
