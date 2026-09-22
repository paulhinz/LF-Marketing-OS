# lf-output-formatter

The shared formatting layer for LFX Marketing OS. Every agent that ends its run with a slide deck, a Word document or a letter formats it through this skill, so all deliverables land on the three approved Linux Foundation templates and, when the work belongs to a specific foundation, carry that foundation's brand.

## What it does

| You have | It produces | Template |
|---|---|---|
| A JSON slide spec | `.pptx` on the LF 2025 Template (opens natively in Google Slides) | [LF 2025 Template](https://docs.google.com/presentation/d/1gOJakd6SdB7MLGflP-B0TVqsVU5lq-HGjI1TH4boCe8/) |
| Markdown with a front-matter block | `.docx` on the LF Agent DOCS Template: running header (project · doc type · status), footer (LFX Marketing OS · agent · date · page), Roboto Slab headings, template tables | [LF Agent DOCS Template](https://docs.google.com/document/d/1RinjSuKojc9bqLLeviJfGE6yzSIfj8kSrTwIiWlH-HM/) |
| Markdown with date / to / salutation / signature | `.docx` business letter on the LF Letterhead | [LF Letterhead](https://docs.google.com/document/d/1T6y1xe50GCDV6My7_Zyeci5Yx60TKxyxzphe2mQgs2o/) |
| A foundation's Brand Kit (from `brand-guidelines-agent`) plus logo files | `brand.json`, then any of the above re-skinned: project logo replaces the LF logo, LF palette maps to the project palette, template fonts map to the project fonts | — |

Then it renders the file with LibreOffice into a contact sheet and checks for leftover template text, so the agent looks at the result before delivering.

## Install

From the LFX Marketing OS marketplace in Cowork (Customize → Plugins → `paulhinz/LF-Marketing-OS` → **lf-output-formatter**), or in Claude Code:

```
/plugin marketplace add paulhinz/LF-Marketing-OS
/plugin install lf-output-formatter@lfx-marketing-os
```

Python requirements in the sandbox: `pip install --break-system-packages python-pptx python-docx Pillow` (plus `cairosvg` for SVG logos). LibreOffice and `pdftoppm` for the render check.

## Use

Ask any Marketing OS agent for its deliverable; it invokes this skill on its own. Direct commands also work: "format this on the LF doc template", "put this deck on the LF 2025 template", "write this as a letter on LF letterhead", "apply the PyTorch Foundation brand kit to this document".

Scripts (in `skills/lf-output-formatter/scripts/`):

```
build_deck.py   spec.json  out.pptx [--brand brand.json] [--max-slides N]
build_doc.py    doc.md     out.docx [--brand brand.json]
build_letter.py letter.md  out.docx [--brand brand.json]
extract_brand_kit.py "Project Brand Kit.docx" brand.json --logo-dir ./logos
render_check.py out.pptx|out.docx
```

## Layout

```
skills/lf-output-formatter/
  SKILL.md                      when to use, template choice, brand decision, workflow
  assets/                       LF-2025-Template.pptx, LF-Agent-DOCS-Template.docx,
                                LF-Letterhead-Template.docx, lf-stacked-{color,white}.svg
  scripts/                      build_deck.py, build_doc.py, build_lf_doc.py, build_letter.py,
                                extract_brand_kit.py, lfbrand.py, render_check.py
  references/                   slides-template-guide.md, docs-template-guide.md,
                                brand-override.md, lf-brand-tokens.md
```

## Template ownership

The bundled templates are exports of LF Creative Services' Google files (owner `ccr@linuxfoundation.org`). When Creative updates a template, re-export it (File → Download → .pptx / .docx), replace the file in `assets/`, bump the version in `.claude-plugin/plugin.json`, and push. Brand questions: brand@linuxfoundation.org.
