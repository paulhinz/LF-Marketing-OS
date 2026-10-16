---
name: presentation-template
description: "This skill should be used to \"build the presentation template\", \"make the project's PowerPoint template\", \"make a Google Slides template\", \"build the slide masters\" or \"regenerate the deck template\" for a Linux Foundation project in the LFX Marketing OS. It renders a 16:9 .pptx with 12 real slide masters and a brand-reference appendix (message house, messaging framework, ICPs, boilerplates, FAQ, brand kit) from content the other skills already produced, plus an HTML preview of every slide.\n"
metadata:
  version: "0.5.0"
---

# Presentation template

A renderer: it lays out content the drafting skills returned and never writes copy. Input: `references/render-input.md`. Code: `scripts/` (same output as the Kit prototype).

## Run
1. Check the input has `content.mh`, `content.bp`, `content.faq` and `content.kit`. If any is missing, stop and say which skill to run first (messaging-framework, boilerplates, faq, brand-kit).
2. Write the input object to a file, then:
   ```
   cd scripts && npm install        # first run only: pptxgenjs, @resvg/resvg-js
   node build.js <input.json> <out_dir>
   ```
   **From a folder of skill outputs.** Instead of an input file, pass the folder that holds the drafting skills' JSON files (any names; full outputs like `{"mf", "icp", "mh", "nums", "report"}` or bare values like the boilerplates array both work) and the logo SVGs, plus the project name and domain:
   ```
   node build.js ./outputs-folder <out_dir> --name "Akrites" --domain akrites.org
   ```
   `scripts/assemble.js` combines them (`node assemble.js <folder> --name … --domain … -o input.json` writes the combined input and lists what's found and missing). Logos are picked by file name: the white/reversed file for dark grounds, the full-color one for light. If something is missing, the script stops and names the skill to run.

3. The script prints JSON: `pptx` (the file), `preview` (an HTML page with every slide at 960×540) and `slides` (the slide list). Return these paths to the caller.

## What it builds
- **Appendix first** ("Appendix · brand reference · delete before presenting"): divider, message house, why now and audiences, messaging framework (when `mf` is present), ICPs (when `icp` is present), boilerplates, FAQ (answered questions only, six per slide), brand kit (logos, colors, type, voice).
- **12 slide masters** that appear in the layout menu in PowerPoint and Google Slides: title, agenda, section header, content, two columns, big statement, key numbers, quote, full-bleed image, member logos, timeline, closing. One example slide per layout, filled from the message house; anything in `[brackets]` is for the deck owner to replace.
- Colors, font and the real logo (SVG rasterized to PNG) from `content.kit` and `logos`; placeholder marks from `kit.word` when there are no logo files.

## Google Slides
Upload the .pptx to Drive and open it with Google Slides (File → Save as Google Slides). All twelve layouts appear under Slide → Apply layout. The brand font is on Google Fonts.

## Accessibility (WCAG 2.2 AA)
Every output is built to pass, without changing the brand where it already passes:
- **Text contrast.** Text is 4.5:1 against what's behind it (3:1 for large text, 24px+ or 18.66px+ bold). Brand colours are kept wherever they pass; when one doesn't (an orange accent as small text on a charcoal band, say), that use gets the nearest passing tint of the same hue. The script's output lists each substitution under `colours`.
- **Logos.** Parts of a logo that fall under 3:1 against their background are recoloured white on dark grounds and near-black on light ones, so a charcoal wordmark never sits on a charcoal band. A supplied white/reversed logo is still preferred; the recolouring covers what it doesn't.
- **Check after rendering.** With headless Chrome available, the script renders the page, measures every piece of text against what is actually painted under it, corrects anything still failing before the PDF is made, and reports it under `a11y` (`textElements` checked, `corrected`, `stillFailing`, which should be empty). Without Chrome the colour fixes still apply and `a11y.note` says the check was skipped.
- **Structure.** HTML has a language and title, logos have alt text, and PDFs are tagged.

## Rules
- Never change the content. If the copy is wrong, it's fixed in the skill that drafted it, then the template is rebuilt.
- Unanswered FAQ questions are left out; say how many in your reply.
