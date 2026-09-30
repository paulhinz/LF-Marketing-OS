# Brand Guidelines Agent

Part of Linux Foundation's LFX Marketing OS agent suite. Guides a project
leader through a short intake, then generates a "[Project Name] Brand Kit"
document on the LF Agent DOCS Template (a Google Docs-ready .docx with the
project's name and logo on the cover and its brand colors applied) — the foundational identity, voice, positioning, and visual
direction document that other Marketing OS agents (Message Foundation, ICP,
Pitch Deck, and more) depend on.

**Current version: 0.4.0** — the agent now asks first whether the foundation already has its own brand or messaging documents, maps them into the standard fields, and interviews only for the gaps; the document opens with a two-page Review Sheet for the ED or SME and is held to a 6–8 page length budget. See "What changed in 0.4.0" below.

## Overview

LFX Marketing OS defines three foundational documents per project: the Brand
Kit, the Message Foundation Doc, and the ICP Document. This plugin produces
the first. It's a Level-1, single-prompt agent: launch it, say whether you
already have brand documents, answer the remaining questions, approve the
two-page Review Sheet.

## Components

| Component | Count | Purpose |
|---|---|---|
| Skills | 1 | `develop-lf-project-brand-kit` — the intake + generation workflow |
| Agents | 0 | Not needed — single-prompt pattern |
| Hooks | 0 | Not needed |
| MCP Servers | 0 | Not yet — a future version will pull inputs from a Velocity Engine MCP connection instead of manual intake |

## Setup

No environment variables or external accounts required for this version. The
document is rendered by the bundled `scripts/build_lf_doc.py` onto the bundled
LF Agent DOCS Template (`assets/lf-agent-docs-template.docx`); it needs
`python-docx`, which the Cowork sandbox already has, and ImageMagick only when
the project logo is an SVG. A Google Drive folder or a connected browser is
optional, for placing the finished document in the project's Drive as a
Google Doc.

## Usage

Say **"Develop LF Project Brand Kit"** (or "build a brand kit for [project]")
to start. Claude first asks whether you already have a brand, messaging,
positioning or competitive document to use as input. If you do, it reads it,
tells you how many of the 15 standard Brand Kit fields it covers, and asks
only about the gaps. If you don't, it asks seven questions one at a time:

1. Project name
2. GitHub repo/README URL
3. One-line description
4. Primary audience
5. Three voice adjectives
6. Constraints (colors/marks to avoid, existing LF-family look, trademark
   concerns)
7. Reference brands (admired or to differentiate from)

After the last answer, it generates the Brand Kit document and points you at
the two-page Review Sheet at the front: every field with its current wording,
where it came from (your document, the README or LFX record, or the agent's
inference), and a blank Approve / Edit column. You do not need to read the
reference body. After you approve or edit, it marks the document ED-reviewed
and recommends moving it to the project's common Drive folder, together with
the `.fields.yaml` sidecar downstream agents read.

## What changed in 0.4.0

- **Existing documents first.** New Step 0a asks for the foundation's own
  brand, messaging, audience or competitive documents before anything else;
  fields they cover are quoted verbatim with their source, and the interview
  shrinks to the gaps. A shared Project Inputs record means the Message
  Foundation and ICP agents do not ask for the same files again.
- **Review Sheet.** Two pages after the cover: the fields an ED or SME must
  approve, with Source and Approve / Edit columns. Replaces the YOUR INPUT
  closing section.
- **Length budget.** 6–8 pages, hard cap 10, no section over 300 words.
  Voice attributes become one three-column table; the personification
  paragraph, the per-audience messaging table (§4) and the channel quick
  reference (§9) are removed — audiences belong to the ICP document and
  channel guidance is generated on demand.
- **New fields.** Brand principle, Prefer / Avoid language table, What we
  don't claim.
- **Structured sidecar.** `[project-slug].brand-kit.fields.yaml` and
  `[project-slug].inputs.yaml` are written next to the document.
- **Shared spec.** `references/input-doc-mapping.md` (identical in all three
  foundation plugins) holds the field registry, micro-templates, Review Sheet,
  length budget and sidecar schema.

## Output format (v0.4.0)

Every Brand Kit is built on the Linux Foundation's **LF Agent DOCS Template**
(Google Docs master: `docs.google.com/document/d/1RinjSuKojc9bqLLeviJfGE6yzSIfj8kSrTwIiWlH-HM`):
Open Sans body, Roboto Slab headings, the LF logo header with
`Project · Document · Status`, a centered footer with the agent name, date and
page number. The cover carries the project's logo and name, and the project's
Component 2 palette colors the headings, the cover accent and the table
headers ("colors only" brand styling — fonts and layout stay on the template
so every LF project's documents look like one family). The skill writes the
document as Markdown and renders it with `scripts/build_lf_doc.py`; see
`skills/develop-lf-project-brand-kit/references/lf-docs-template.md` for the
template spec, the logo/color sourcing order and the Google Docs delivery.

## Notes for maintainers

- The output format lives in four files that are identical across the three
  foundation plugins (brand-guidelines-agent, message-foundation-agent,
  icp-target-markets-agent): `scripts/build_lf_doc.py`,
  `assets/lf-agent-docs-template.docx`, `references/lf-docs-template.md` and
  `references/input-doc-mapping.md`. Change them in all three at once.

- The full document template (every section, the voice-attribute format, the
  five visual-identity components, and the WCAG contrast-check method) lives in
  `skills/develop-lf-project-brand-kit/references/brand-kit-template.md`. Edit
  that file to change the document's structure without touching the intake
  flow in `SKILL.md`.
- This plugin deliberately does **not** generate 25/50-word summaries,
  boilerplate, `llms.txt`, or persona/ICP content — those belong to sibling
  agents (Message Foundation, ICP) that consume this Brand Kit as an input.
  Keep that boundary if you extend this plugin.
- Logo generation is scoped to a written creative brief with boundary
  conditions, not an actual AI-rendered logo — complex AI drafts weren't
  reliably usable by Creative Services in testing.
