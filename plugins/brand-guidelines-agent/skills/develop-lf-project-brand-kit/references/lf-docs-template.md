# LF Agent DOCS Template — how every foundation document is formatted

All three LFX Marketing OS foundational documents (Brand Kit, Message
Foundation, Target Markets and ICP) are delivered on the Linux Foundation's
**LF Agent DOCS Template** (Google Docs master:
https://docs.google.com/document/d/1RinjSuKojc9bqLLeviJfGE6yzSIfj8kSrTwIiWlH-HM).
A copy of that template, with its fonts and the LF logo embedded, ships in
this skill at `assets/lf-agent-docs-template.docx`, and `scripts/build_lf_doc.py`
renders a Markdown draft onto it. Do not hand-build the .docx with the generic
`docx` skill any more; the template is the house style and the script is how
it is applied.

## What the template fixes (never change these)

| Element | Template setting |
|---|---|
| Page | US Letter, 0.5in side margins, header flush to the top edge |
| Body text | Open Sans, 9pt, 1.5 line spacing (`--body-size` can raise it; keep the family) |
| Headings | Roboto Slab: H1 24pt, H2 18pt, H3 14pt, H4 11pt bold; H5 Open Sans 11pt bold caps |
| Title / Subtitle | Roboto Slab Light 40pt / 26pt (cover only) |
| Header (every page) | LF logo left; right-aligned `{Project_Name} {Document_Type} · {Document_Status} · {Other_Details}` in 9pt #434343 |
| Footer (every page) | Centered `{Platform} {Agent_Source} · {Date} · {Page_Number}` in 9pt #434343 |
| Tables | #D5D5D5 borders, header row filled (brand primary or #222222), alternate rows #F1F1F1, header row repeats across pages |
| Bullets | ● / ○ / ■ at 0.5in steps, 9pt |

Open Sans and Roboto Slab are Google Fonts, so the file opens in Google Docs
with the right typography and no substitution.

## What the project's brand adds ("colors only")

The template is neutral; the project supplies its colors. Fonts and layout
stay on the template so the three documents look like one family across all
LF projects.

| Brand input | Where it lands |
|---|---|
| Project name | Cover title, header `{Project_Name}` |
| Project logo | Cover page, above the title, fitted inside a 2.6in × 1.2in box |
| Primary color | Cover accent rule, H1 rule and H1/H2 text, table header fills, cover details label column |
| Secondary color | Cover document-type line, H3 text |

The script checks WCAG AA contrast itself: a primary that cannot carry white
text gets dark (#222222) text on the fill instead; a primary or secondary too
light to read as text on white is darkened until it passes; with no colors
given, everything falls back to the template's #222222 neutral. So a light or
pastel brand never produces unreadable headings.

### Where the colors and logo come from

1. **Brand Kit exists (Message Foundation, ICP runs):** primary and secondary
   are the Brand Kit §7 Component 2 palette, verbatim. The logo is the file the
   Brand Kit's Component 1 names, or the project's current mark if the Brand
   Kit only holds the creative brief.
2. **Brand Kit run itself:** the palette you choose in Component 2 is the
   palette you render the document in. Build the palette before you build
   the file; if the requester gave color constraints, they are already
   honored in the palette.
3. **No Brand Kit and no palette yet:** read the project site's computed
   styles (H1 color, link color, primary button fill) and use the dominant
   brand color as primary; state in the delivery message that the colors were
   read from the site, not from a Brand Kit.
4. **Logo, in order:** the LFX project record (`get_project` returns a logo
   URL for most projects), the project site (`<link rel="icon">` is a last
   resort; prefer the header SVG), the GitHub organization avatar
   (`https://github.com/<org>.png`), then the LF-hosted project logo set
   (https://github.com/lf-edge, https://github.com/cncf/artwork for CNCF
   projects, https://www.linuxfoundation.org/projects for LF direct). Save
   it next to the Markdown draft; SVG, PNG and JPG all work (SVG is converted
   with ImageMagick). If nothing usable exists, build without `--logo` and
   say so; never generate a logo for the cover (see the Brand Kit skill's
   Component 1 rule).

## Cover page

The script generates the cover; you supply the fields.

```
[project logo]
Project Name                     ← Title, brand primary
Document Type                    ← Subtitle, brand secondary
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   ← accent rule, brand primary
One-line subtitle (what the document is, "one of three LFX Marketing OS
foundational documents")

| Project      | ... |            ← details table: Project, Document, Status,
| Document     | ... |              then every --detail, then Date and
| Status       | ... |              Prepared by "{Platform} — {Agent}"
| Repository   | ... |
| ...          | ... |
```

Standard `--detail` rows per document:

- **Brand Kit:** Repository, Prepared for, Governance (the derived sentence).
- **Message Foundation:** Repository, Source Brand Kit (file name and date, or
  "none — built from interview and README"), Prepared for.
- **Target Markets and ICP:** Repository, Source Brand Kit, Source Message
  Foundation, Optimized for (the business outcome), Prepared for.

Status strings: `Draft v1 — for review`, `DRAFT — pre-filled, awaiting ED
review`, `Approved v1 — <name>, <date>`. `--other` carries the version or the
copy label (`Internal` / `Agency-safe`) into the header.

## Writing the Markdown the script renders

Write the whole document as one Markdown file first (this is also the `.md`
you keep beside the `.docx`). The script understands:

- `#` … `#####` headings (H1 for numbered top-level sections and appendices,
  H2 for subsections, H3 for components / personas, H4–H5 sparingly).
- Paragraphs with `**bold**`, `*italic*`, `` `code` ``, `[text](url)` and bare
  URLs.
- `-` bullets and `1.` numbered lists, nested by two-space indentation.
  Numbering continues across nested bullets and restarts with each new list.
- GitHub pipe tables (`| a | b |` with a `|---|---|` row). Use `<br>` inside a
  cell for a line break. Column widths are set from content; keep the long
  prose in one column.
- `> ` blockquotes for verbatim governance / trademark sentences and quotes.
- Fenced code blocks for `llms.txt` and the elevator-pitch slide text.
- `---` for a thin rule; a line containing only `<<<PAGEBREAK>>>` for a page
  break (use it before each appendix).

Do not put the title, the cover details or the header/footer text in the
Markdown; the script adds them. Do not leave generation notes ("fonts are
stand-ins") anywhere in the file.

## Build command

```
python3 <skill dir>/scripts/build_lf_doc.py \
  --content "<Project> <Document Type>.md" \
  --out     "<Project> <Document Type>.docx" \
  --project "<Project>" \
  --doc-type "<Document Type>" \
  --status  "DRAFT — pre-filled, awaiting ED review" \
  --other   "v1" \
  --subtitle "<one-line description of the document>" \
  --agent   "<Brand Kit Agent | Message Foundation Agent | ICP & Target Markets Agent>" \
  --logo    "<project logo file>" \
  --primary "#RRGGBB" --secondary "#RRGGBB" \
  --detail  "Repository=<url>" --detail "Prepared for=<ED / project leadership>"
```

The script needs `python-docx` (present in the Cowork sandbox; otherwise
`pip install python-docx --break-system-packages`). Run `--help` for every
option, including `--body-size`, `--no-cover`, `--date`, `--platform` and
`--template`.

## Verify before delivering

Convert to PDF and look at every page (`soffice --headless --convert-to pdf`
then `pdftoppm -png -r 60`): the logo is on the cover and not distorted, the
header reads `<Project> <Document Type> · <status>`, tables do not run past
the right margin, headings are in the brand color and readable, no
`{Placeholder}` text survives anywhere, and the page numbers count from 1.
Fix the Markdown and rebuild rather than editing the .docx by hand.

## Deliver as a Google Doc

The template is a Google Docs template, and the `.docx` the script writes
opens in Google Docs with the header, footer, cover, fonts and tables intact.
Deliver two builds:

- `<Project> <Document Type>.docx` — the default build with fonts embedded,
  for anyone opening it in Word.
- `<Project> <Document Type> (Drive upload).docx` — the same document built
  with `--strip-fonts` (about 10× smaller; Google Docs has Open Sans and
  Roboto Slab natively). This is the copy that goes to Drive.

Getting it into the project's Drive folder:

1. **Browser connected (Claude in Chrome or the built-in browser):** open the
   project's shared Drive folder, use New → File upload with the Drive-upload
   build, then open the uploaded file with Google Docs so Drive converts it,
   and rename the converted doc to exactly `<Project> <Document Type>`. Put
   the resulting Google Docs link in the delivery message. Ask before
   uploading; it is a change to a shared folder.
2. **No browser:** present the `.docx` files and tell the requester to drag
   the Drive-upload build into the project folder and open it with Google
   Docs; the conversion keeps the template formatting.

Do not push the `.docx` through the Google Drive MCP `create_file` tool as
base64: the payload for a full document (100–800 KB) does not fit in one
call. That tool is fine for the companion `.md` (as `text/plain`, with
`disableConversionToGoogleType: true`) if the requester wants the source
next to the doc.

Keep the `.md` and both `.docx` builds in the working folder as the archive
copy either way.
