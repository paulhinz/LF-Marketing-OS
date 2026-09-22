# LF Agent DOCS Template and LF Letterhead — documents guide

Sources: Google Doc "LF Agent DOCS Template" (`1RinjSuKojc9bqLLeviJfGE6yzSIfj8kSrTwIiWlH-HM`) and "LF Letterhead" (`1T6y1xe50GCDV6My7_Zyeci5Yx60TKxyxzphe2mQgs2o`). Bundled exports in `assets/`. `scripts/build_doc.py` opens the template, fills the running header and footer, clears the sample body and writes the Markdown content with the template's own styles.

## The document template (default)

- US Letter, 0.5 in side margins, header flush to the top, 0.25 in bottom margin; body starts under the header table.
- **Running header** (every page): LF logo left (1000 × 329 px slot), right-aligned 9 pt gray `#434343` line `{Project_Name} {Document_Type} · {Document_Status} · {Other_Details}`.
- **Running footer**: centered 9 pt gray `{Platform} {Agent_Source} · {Date} · {Page_Number}` — the script turns `{Page_Number}` into a live PAGE field and drops empty tokens cleanly.
- Fonts: Roboto Slab for Heading 1–4 (24 / 18 / 14 / 11 pt; H4 bold), Heading 5 = 11 pt bold caps in body font, Title = Roboto Slab Light 36 pt, Subtitle = Roboto Slab Light 24 pt gray `#666666`; body Open Sans Medium 9 pt at 1.5 line spacing (the template default).
- Tables: header row fill `#222222`, white text; alternating rows `#F1F1F1`; hairlines `#D5D5D5`; cell padding 70/90 dxa. Links Azure `#0094FF`.
- Bullets: the template's own list numbering (● / ○ by level), 0.5 in indent, 9 pt. Ordered lists are numbered in text with a hanging indent.

### Cover page (generated, on by default)

```
[project logo — brand.json logo.light, or front-matter logo; fitted in 2.6 × 1.2 in]
Project Name                     ← Title, brand primary (template dark when LF-default)
Document Type                    ← Subtitle, brand secondary
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   ← accent rule
One-line subtitle
| Project | Document | Status | …details… | Date | Prepared by "LFX Marketing OS — Agent" |
```

Standard `details` rows: **Brand Kit** — Repository, Prepared for, Governance sentence · **Message Foundation** — Repository, Source Brand Kit (file + date or "none — built from interview and README"), Prepared for · **ICP & Target Markets** — Repository, Source Brand Kit, Source Message Foundation, Optimized for, Prepared for · **Campaign Brief / plans** — Quarter, Source Plan deck, Prepared for. Status strings: `Draft v1 — for review`, `DRAFT — pre-filled, awaiting ED review`, `Approved v1 — <name>, <date>`. Set `cover: false` for short internal notes.

### Front matter

```
---
project_name: PyTorch Foundation          # header + cover title (falls back to brand.json project_name)
document_type: Message Foundation          # header + cover (required)
document_status: DRAFT for ED review       # header + cover
other_details: v0.3                        # header — version or copy label (Internal / Agency-safe)
platform: LFX Marketing OS                 # footer, default shown
agent_source: Message Foundation Agent     # footer — the agent that produced the file
date: September 22, 2026                   # footer + cover, default today
subtitle: One of three LFX Marketing OS foundational documents   # cover
details:                                   # cover details rows
  - Repository=https://github.com/pytorch
  - Prepared for=PyTorch Foundation leadership
logo: pytorch-logo.png                     # cover logo when there is no brand.json
primary: "#EE4C2C"                         # colors when there is no brand.json ("colors only" mode)
secondary: "#2B2B2B"
cover: true
brand: ./brand.json                        # optional; same as --brand
---
```

Two ways to brand a document, from lightest to fullest: (a) `logo` + `primary`/`secondary` in front matter = the foundation agents' "colors only" convention — project logo on the cover, brand colors on headings, rule and table headers, LF logo stays in the running header, template fonts stay; (b) `brand.json` = full re-skin — everything in (a) plus the project logo replaces the LF logo in the running header and the brand fonts replace Roboto Slab / Open Sans. Use (b) when the document is issued by the foundation; (a) when it is an LF-produced document about the foundation.

### Markdown supported

`#`–`#####` headings → Heading 1–5 (H1/H2 in brand primary, H3 in secondary, H1 with a rule) · paragraphs with `**bold**`, `*italic*`, `` `code` ``, `[text](url)` and bare URLs · `- ` bullets and `1. ` numbered lists, nested by two-space indentation (numbering continues across nested bullets, restarts with each list) · GFM pipe tables (separator row required; `<br>` for in-cell line breaks; column widths from content) · `> ` blockquotes (verbatim governance / trademark sentences, quotes) · fenced code blocks (`llms.txt`, elevator-pitch slide text) · `---` thin rule · a line of exactly `<<<PAGEBREAK>>>` (also `---pagebreak---` or `\pagebreak`) = page break, use before each appendix.

Not supported (write around them): images in the body, nested tables, footnotes, HTML, multi-column layouts, landscape sections (split a wide table or reduce columns — the DOCS template is portrait). Do not leave generation notes ("fonts are stand-ins") in the file.

### Options

`--no-cover`, `--strip-fonts` (drops the embedded Open Sans / Roboto Slab, ≈10× smaller — the copy for Google Drive upload; Docs has both fonts natively), `--body-size` (keep the family, raise the size only for print), `--template`. Deliver the default build for Word users and, when uploading to Drive, the `--strip-fonts` build named `<Project> <Document Type> (Drive upload).docx`. Do not push a full .docx through the Drive MCP `create_file` as base64 (too large); upload through the browser, or hand the file to the user.

### Section-numbering convention

Marketing OS documents number their sections (`# 1. Vision`, `## 1.1 …`) in the heading text itself, so the numbers survive copy-paste into Google Docs.

## The letterhead (`--letterhead` / `build_letter.py`)

- US Letter, 0.75 in side margins, 1.5 in top / 1.75 in bottom to clear the header logo and the footer address block.
- Header: large LF logo (1750 × 570 EMU-ish slot) top-left. Footer: rule, then two centered Azure lines — LF legal address `2810 N Church St PMB 57274 | Wilmington, Delaware | 19802-4447 USA` and `TEL: +1 415 723 9709 | www.linuxfoundation.org`. Body 10 pt.
- The script lays out: date → blank → address block (single-spaced) → blank → salutation → body Markdown → closing → signature block. Keep letters to headings-free prose and short bullets.

Front matter: `date`, `to` (multi-line, `|` then indented lines), `salutation`, `closing`, `signature` (multi-line). Sender lines in `signature` should name the LF (or foundation) title exactly as in the LFX record.

## Brand override effects (see brand-override.md)

Document: cover logo and running-header logo → `logo.light`; Title/Heading fonts → `fonts.heading`; body font → `fonts.body`; H1/H2 and the cover rule → primary, H3 → secondary (both darkened automatically if too light to read on white); table header fill → primary with white text when it passes WCAG AA, otherwise primary with dark text; letterhead footer text → primary. Letterhead footer address → `footer_address` when given, else stays the LF legal address (the LF remains the legal entity for most projects — check the LFX project record via the QA skill if unsure).
