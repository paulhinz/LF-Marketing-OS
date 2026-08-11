# Brand Guidelines Agent

Part of Linux Foundation's LFX Marketing OS agent suite. Guides a project
leader through a short intake, then generates a "[Project Name] Brand Kit"
Word document — the foundational identity, voice, positioning, and visual
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
skill uses Claude's built-in `docx` skill to produce the Word document — no
separate installation needed.

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

## Notes for maintainers

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
