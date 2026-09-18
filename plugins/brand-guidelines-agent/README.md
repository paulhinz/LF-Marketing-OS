# Brand Guidelines Agent

Part of Linux Foundation's LFX Marketing OS agent suite. Guides a project
leader through a short intake, then generates a "[Project Name] Brand Kit"
document on the LF Agent DOCS Template (a Google Docs-ready .docx with the
project's name and logo on the cover and its brand colors applied) — the foundational identity, voice, positioning, and visual
direction document that other Marketing OS agents (Message Foundation, ICP,
Pitch Deck, and more) depend on.

## Overview

LFX Marketing OS defines three foundational documents per project: the Brand
Kit, the Message Foundation Doc, and the ICP Document. This plugin produces
the first. It's a Level-1, single-prompt agent: launch it, answer seven
questions, review the draft.

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
to start. Claude will ask seven questions one at a time:

1. Project name
2. GitHub repo/README URL
3. One-line description
4. Primary audience
5. Three voice adjectives
6. Constraints (colors/marks to avoid, existing LF-family look, trademark
   concerns)
7. Reference brands (admired or to differentiate from)

After the last answer, it generates the Brand Kit document, walks you through
it, and — after you give feedback or confirm there's none — recommends moving
it to a shared repository so downstream agents can read it.

## Output format (v0.3.0)

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

- The output format lives in three files that are identical across the three
  foundation plugins (brand-guidelines-agent, message-foundation-agent,
  icp-target-markets-agent): `scripts/build_lf_doc.py`,
  `assets/lf-agent-docs-template.docx` and `references/lf-docs-template.md`.
  Change them in all three at once.

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
