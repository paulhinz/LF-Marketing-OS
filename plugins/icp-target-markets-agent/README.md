# ICP & Target Markets Agent

An LFX Marketing OS plugin for Cowork/Claude Code. Produces the **ICP
Document** — one of the three LFX Marketing OS foundational documents
(alongside the Brand Kit and Message Foundation Doc) — for a Linux Foundation
project.

**Current version: 0.4.0** — the agent now asks first whether the foundation already has its own audience, persona or competitive documents, maps them persona by persona into the standard eleven-field template, and interviews only for the gaps; the document opens with a two-page Review Sheet for the ED and is held to an 8–10 page budget. See "What changed in 0.4.0" below.

## What it does

Run the command:

```
Develop Target Markets and ICP
```

Claude first asks whether you already have an audience, persona, segment or
competitive document to use as input. If you do, it reads it, tells you how
many of the 11 standard ICP fields and how many personas it covers, quotes
your wording verbatim, and asks only about the gaps. Otherwise it interviews
you one question at a time (project name, GitHub URL, your Brand Kit and
Message Foundation Doc links, then a handful of gap-filling questions on
business outcome, competitive landscape, disqualifiers, and trigger events).
Either way it reads your Brand Kit and Message Foundation Doc if you have
them, optionally pulls live membership data from LFX if that connection is
available, and then generates:

**`[Project Name] Target Markets and ICP.docx`** — Google Docs-ready, on the
LF Agent DOCS Template, with the project's logo and name on the cover and its
Brand Kit colors applied — containing:

- A two-page **Review Sheet**: every field the ED or SME must approve, with
  its current wording, where it came from (your document, the Brand Kit or
  Message Foundation, LFX, or the agent's inference) and a blank Approve /
  Edit column
- A market segment overview (category context, competitive/peer landscape
  with "who we actually lose to", TAM/SAM/SOM framing, current member/adopter
  segments)
- One firmographics table and two organization-level ICPs (Community &
  Technical Adopter, and Enterprise Member) — the standard bottoms-up/top-down
  split for open-source projects — each with five ICP dimensions
- 4–9 personas, every one on the same eleven-field template (role,
  organization, responsibilities, how they encounter the project, what they
  need to believe, what NOT to say, which offer matters first, content that
  moves them, the ask, key pillars, geographic note), framed by a persona
  selection-cues table and a persona map
- Fit × Warmth scoring rules: the attribute table, the 3×3 Hot / Warm /
  Viable grid and the hand-raiser signals, weighted toward whatever business
  outcome you name
- Regional emphasis, and a `.fields.yaml` sidecar the Segmentation and
  campaign agents read directly

## What changed in 0.4.0

- **Existing documents first.** New Step 0a asks for the foundation's own
  audience, persona or competitive documents before anything else; personas
  are mapped one by one onto the eleven-field template with their wording
  quoted verbatim, and the interview shrinks to the gaps. The shared
  `[project-slug].inputs.yaml` record means the Brand Kit and Message
  Foundation agents do not ask for the same files again.
- **Review Sheet.** Two pages after the cover, replacing the YOUR INPUT
  closing section; status moves to `Draft — pre-filled` / `Draft — from your
  documents` / `ED-reviewed`.
- **Fixed persona template.** The twelve Velocity Engine persona fields are
  replaced in the document by eleven fields that include per-persona
  messaging and "what NOT to say"; the separate messaging handoff table is
  gone because the messaging now lives inside each persona. The Velocity
  Engine mapping is kept in `references/velocity-engine-field-reference.md`.
- **Length budget.** 8–10 pages target, 12 hard cap, ≤350 words per persona.
- **Fit × Warmth** gains the 3×3 grid and hand-raiser signals from the
  Marketing OS definitions.
- **Structured sidecar.** `[project-slug].icp.fields.yaml` and
  `[project-slug].inputs.yaml` are written next to the document.
- **Shared spec.** `references/input-doc-mapping.md` (identical in all three
  foundation plugins) holds the field registry, micro-templates, Review Sheet,
  length budget and sidecar schema.

## Requirements

- `python-docx` (present in the Cowork sandbox) for the bundled
  `scripts/build_lf_doc.py`, which renders the document onto the bundled LF
  Agent DOCS Template; ImageMagick only when the project logo is an SVG.
- A Brand Kit and Message Foundation Doc for the project produce noticeably
  better output — the agent will still run without them, but will flag more
  sections as lower-confidence or TBD.
- Optional: a connected Google Drive (or equivalent) integration to read Brand
  Kit/Message Foundation docs directly from a shared link, and a connected LFX
  platform integration to pull real, live project membership data instead of
  relying on interview answers alone. Neither is required to run the skill.

## What it doesn't do (yet)

This version runs entirely on interview answers, the Brand Kit, the Message
Foundation Doc, the GitHub README, and (optionally) live LFX membership data.
A future version is planned to connect directly to a companion "Velocity
Engine" service via MCP to populate ICP/persona fields automatically — see
`skills/develop-target-markets-and-icp/references/velocity-engine-field-reference.md`
for the target schema this version already aligns to, so the swap won't
require re-templating the output document.

## Files

```
icp-target-markets-agent/
├── .claude-plugin/plugin.json
├── README.md
└── skills/
    └── develop-target-markets-and-icp/
        ├── SKILL.md
        ├── assets/
        │   └── lf-agent-docs-template.docx
        ├── scripts/
        │   └── build_lf_doc.py
        ├── references/
        │   ├── icp-document-template.md
        │   ├── input-doc-mapping.md
        │   ├── lf-docs-template.md
        │   └── velocity-engine-field-reference.md
        └── examples/
            └── opensearch-target-markets-and-icp-sample.md
```

## Output format (v0.4.0)

Every ICP document is built on the Linux Foundation's **LF Agent DOCS
Template** (Google Docs master:
`docs.google.com/document/d/1RinjSuKojc9bqLLeviJfGE6yzSIfj8kSrTwIiWlH-HM`):
Open Sans body, Roboto Slab headings, the LF logo header with
`Project · Document · Status · copy label`, a centered footer with the agent
name, date and page number. The cover carries the project's logo and name;
the Brand Kit's Component 2 primary and secondary colors color the headings,
the cover accent and the table headers ("colors only" brand styling — fonts
and layout stay on the template so every LF project's documents look like
one family). The spec, the logo/color sourcing order, the Markdown
conventions and the Google Docs delivery are in
`references/lf-docs-template.md`. The four files that implement it and
the shared intake spec (`scripts/build_lf_doc.py`,
`assets/lf-agent-docs-template.docx`, `references/lf-docs-template.md`,
`references/input-doc-mapping.md`) are identical across the three foundation
plugins; change them together.

## Feedback

This is a first working version. If a generated document's assumptions,
section structure, or scoring logic need adjustment, edit
`skills/develop-target-markets-and-icp/SKILL.md` and its `references/` files
directly, or share feedback with the plugin author for the next revision.
