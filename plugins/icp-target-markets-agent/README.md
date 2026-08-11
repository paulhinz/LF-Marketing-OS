# ICP & Target Markets Agent

An LFX Marketing OS plugin for Cowork/Claude Code. Produces the **ICP
Document** — one of the three LFX Marketing OS foundational documents
(alongside the Brand Kit and Message Foundation Doc) — for a Linux Foundation
project.

## What it does

Run the command:

```
Develop Target Markets and ICP
```

Claude will interview you one question at a time (project name, GitHub URL,
your Brand Kit and Message Foundation Doc links, then a handful of
gap-filling questions on business outcome, competitive landscape,
disqualifiers, and trigger events), read your existing Brand Kit and Message
Foundation Doc if you have them, optionally pull live membership data from LFX
if that connection is available, and then generate:

**`[Project Name] Target Markets and ICP.docx`**, containing:

- A market segment overview (category context, competitive/peer landscape,
  TAM/SAM/SOM framing, current member/adopter segments)
- Two organization-level ICPs (Community & Technical Adopter, and Enterprise
  Member) — the standard bottoms-up/top-down split for open-source projects
- 2-3 personas per ICP, with a full persona field set (goals, challenges,
  trusted sources, statements to share with the boss, example use cases, etc.)
- Fit & Warmth scoring inputs, weighted toward whatever business outcome you
  name (membership growth, event attendance, training enrollment, demand-gen)
- A messaging & content handoff table mapping each persona to a messaging
  pillar and proof point, so web/content/social/campaign teams can brief
  directly from this document

## Requirements

- The `docx` skill/capability (bundled with Claude Code and Cowork) to build
  the Word document.
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
        ├── references/
        │   ├── icp-document-template.md
        │   └── velocity-engine-field-reference.md
        └── examples/
            └── opensearch-target-markets-and-icp-sample.md
```

## Feedback

This is a first working version. If a generated document's assumptions,
section structure, or scoring logic need adjustment, edit
`skills/develop-target-markets-and-icp/SKILL.md` and its `references/` files
directly, or share feedback with the plugin author for the next revision.
