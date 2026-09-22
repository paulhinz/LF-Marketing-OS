---
name: lf-output-formatter
description: Shared output formatter for every LFX Marketing OS agent. Use it whenever an agent, or a Linux Foundation marketer, is about to deliver a slide deck, a Word document, a report, a brief, a one-pager, a memo, or a letter about The Linux Foundation or an LF project or foundation — it formats the deliverable on the three approved LF templates (the LF 2025 Google Slides template, the LF Agent DOCS template, and the LF Letterhead), and, when the document is for a specific foundation with a Brand Kit, re-skins the template with that foundation's logo, palette, typography and iconography. Also use when someone says "put this on the LF template", "make this on-brand", "format as an LF doc/deck/letter", "use the letterhead", "apply the [foundation] brand kit", or asks why a deliverable does not look like the LF templates.
---

# LF Output Formatter

One skill, three templates, one rule: **a Marketing OS deliverable never leaves an agent as a plain pptx/docx.** It is built on the matching LF template with the bundled scripts, re-skinned with the foundation's Brand Kit when the document belongs to a foundation, rendered, and looked at before it is handed over.

The templates are exported copies of the canonical LF Creative files (owner: LF Creative Services, `ccr@linuxfoundation.org`):

| Deliverable | Template (bundled in `assets/`) | Google source |
|---|---|---|
| Decks, slides, workbooks, briefings, plan decks | `LF-2025-Template.pptx` (16:9) | Google Slides `1gOJakd6SdB7MLGflP-B0TVqsVU5lq-HGjI1TH4boCe8` "LF 2025 Template" |
| Documents: Brand Kit, Message Foundation, ICP, campaign briefs, case studies, reports, QA digests, PRDs | `LF-Agent-DOCS-Template.docx` (Letter, running header + footer) | Google Doc `1RinjSuKojc9bqLLeviJfGE6yzSIfj8kSrTwIiWlH-HM` "LF Agent DOCS Template" |
| Letters, memos to a named recipient, confirmations, invitations, short official notices | `LF-Letterhead-Template.docx` | Google Doc `1T6y1xe50GCDV6My7_Zyeci5Yx60TKxyxzphe2mQgs2o` "LF Letterhead" |

Spreadsheets, HTML and PDFs made from HTML are out of scope; they use the LF brand tokens in `references/lf-brand-tokens.md` directly.

## When this skill applies

Trigger on the *deliverable*, not the wording: any agent step that ends in "build the .pptx" or "build the .docx" routes through here. In particular it is the formatting step for `brand-guidelines-agent`, `message-foundation-agent`, `icp-target-markets-agent`, `qtrly-plan-agent`, `qtrly-campaign-plan-agent`, `qtrly-marketing-review-agent`, `marketing-plan-workbook-agent`, `member-pitch-deck`, `member-benefits-briefing`, `case-study-agent`, `lfx-marketing-os-qa` digests and `marketing-os-product-manager` PRDs. Agents that already bundle the LF 2025 template (pitch deck, member briefing) keep their own layout logic; they use this skill for the brand-kit re-skin and the render check.

Do not use it for: a user's own non-LF document, content that is only pasted into chat, Google-native edits of a shared file (edit in place instead), or anything that impersonates another organization.

## Workflow

### 1. Pick the template

- Slides → `build_deck.py`. Anything the audience will page through on a screen.
- Document → `build_doc.py`. Anything read as pages with headings and tables. Long-form, internal-facing, or "for review" work always goes here.
- Letter → `build_letter.py`. Addressed to a named person or company, signed by a person, usually one or two pages. If it has section headings and tables, it is a document, not a letter.

If the requesting agent's SKILL.md already names a template, follow it. When unsure between document and letter, ask one question; between deck and document, default to what the user asked for by name.

### 2. Decide LF-default or foundation brand

Ask: *is this document about, or issued by, a specific LF project or foundation?*

- **No** (an LF corporate deliverable, a cross-foundation report, an internal LF marketing brief) → LF default. Build with no `--brand`.
- **Yes** → look for that foundation's Brand Kit (the `brand-guidelines-agent` output, `[Project] Brand Kit.docx`, usually in the user's working folder or Google Drive) and its logo files. Then:
  1. `python3 scripts/extract_brand_kit.py "<Brand Kit>.docx" brand.json --logo-dir <logos>` drafts `brand.json` (see `references/brand-override.md`). Read the `_review` list it prints.
  2. Confirm anything null or guessed with the user in **one** message: primary color, fonts, which logo file is for light and dark backgrounds. Never invent a color, font or logo. If the foundation has no Brand Kit yet, offer to run `brand-guidelines-agent`, and build LF-default in the meantime, saying so in the delivery note.
  3. Build with `--brand brand.json`. Keep `brand.json` and the logos next to the output so the next run reuses them.

Co-branding rule: a foundation document still carries "a Linux Foundation project" wording where the Message Foundation puts it, and the footer address on the letterhead stays the LF legal address unless the Brand Kit / LFX record supplies the foundation's own (`footer_address`). The LF logo is replaced, not stacked, on the templates; put the LF lockup on a closing slide or in the boilerplate instead when co-branding is wanted.

### 3. Write the content in the script's input format

- Decks: JSON spec, one entry per slide, using the layout keys in `references/slides-template-guide.md`. Titles ≤ 8 words; ≤ 6 bullets of ≤ 12 words on `content`; dense variants only in appendices. Use `**bold**` for lead-ins. Put speaker notes in `notes`, data provenance in `source`.
- Documents and letters: Markdown with the front-matter block from `references/docs-template-guide.md`. Fill every header/footer token (`project_name`, `document_type`, `document_status`, `agent_source`); the footer platform is always `LFX Marketing OS`. Give the cover a `subtitle` and `details` rows (Repository, Source Brand Kit, Prepared for). Headings `#`–`#####` map to the template's Heading 1–5; the first row of a pipe table becomes the header row; `<<<PAGEBREAK>>>` before each appendix; fenced code blocks for `llms.txt`-style text. Do not write the title or header/footer text into the body — the cover and template carry them.
- Write prose per the `plain-writing` skill when it is installed.

### 4. Build

```bash
S=<this skill dir>/scripts
python3 $S/build_deck.py   deck.json  "Project — Title.pptx" [--brand brand.json] [--max-slides 20]
python3 $S/build_doc.py    doc.md     "Project Document Type.docx" [--brand brand.json]
python3 $S/build_letter.py letter.md  "Project Letter to Name.docx" [--brand brand.json]
```

Requirements: `python-pptx`, `python-docx`, `Pillow` (`pip install --break-system-packages python-pptx python-docx Pillow`; add `cairosvg` for SVG logos). File names follow the agent's convention, otherwise `[Project] [Document Type] [Mon YYYY]`.

### 5. Render and look

```bash
python3 $S/render_check.py "Project Document Type.docx"   # → .sheet.png contact sheet + warnings
```

Open the sheet image and check: header logo and running header on every page; footer with page number; no `{Token}`, "Click to add", "Lorem" or "Please make a copy" text left (the script warns); text inside placeholders on slides (cut words, never shrink fonts); dark title/section slides and light content slides; tables in the template style (dark or brand header row, zebra rows). Fix and rebuild — up to three passes — before delivering. LibreOffice substitutes Open Sans / Roboto Slab / brand fonts if they are not installed; that is a render artifact, the file carries the right fonts. Say so only if the user asks why the preview font differs.

### 6. Deliver

Present the file. State which template was used and whether it is LF-default or `[Foundation]` brand (with the source of the brand values). If Google Drive is connected, offer to upload; both templates open natively in Google Slides / Google Docs. Offer to save `brand.json` for reuse. Note that final visual sign-off belongs to LF Creative Services (`brand@linuxfoundation.org`) for anything external.

## Boundaries

- Never edit the bundled templates or redraw the LF logo; use the official assets in `assets/` (`lf-stacked-color.svg`, `lf-stacked-white.svg`) if a logo is needed elsewhere.
- Never change template fonts, sizes, gradients or footer furniture by hand; the only sanctioned variation is the Brand Kit override via `brand.json`.
- No brand values from memory or the web. They come from the Brand Kit, the project's own brand page, or the user.
- Trademark line for external decks and documents (closing slide notes or fine print): "The Linux Foundation and The Linux Foundation logo design are registered trademarks of The Linux Foundation. Linux is a registered trademark of Linus Torvalds."

## Files

- `scripts/build_deck.py` — JSON spec → .pptx on the LF 2025 Template (template layouts only; brand re-skin)
- `scripts/build_doc.py` — Markdown + front matter → .docx on the LF Agent DOCS Template (cover page with project logo and details table, header/footer tokens, brand-colored headings and table headers, header-logo and font re-skin from `brand.json`)
- `scripts/build_lf_doc.py` — the rendering engine `build_doc.py` uses; the same renderer the three foundation agents ship, kept here as the single source. Its CLI (`--content --out --project --doc-type --status --agent --logo --primary --secondary --detail …`) still works for agents that call it directly.
- `scripts/build_letter.py` — Markdown → .docx on the LF Letterhead (date, address block, salutation, signature)
- `scripts/extract_brand_kit.py` — Brand Kit .docx/.md (+ logo folder) → draft `brand.json`
- `scripts/lfbrand.py` — shared brand loader, WCAG contrast, color/font/logo substitution
- `scripts/render_check.py` — LibreOffice render → contact sheet + leftover-placeholder warnings
- `references/slides-template-guide.md` — every layout key, what it is for, sizes, checks
- `references/docs-template-guide.md` — front-matter tokens, Markdown support, the document and letter visual systems
- `references/brand-override.md` — `brand.json` schema, what each field changes in each template, co-branding rules
- `references/lf-brand-tokens.md` — LF colors, fonts and logo rules for output this skill does not build (HTML, PDF, spreadsheets)
- `assets/` — the three templates and the two official LF logo SVGs
