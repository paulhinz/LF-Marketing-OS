# Message Foundation Agent

An LFX Marketing OS plugin for Cowork/Claude Code. Interviews a Linux Foundation project lead and produces a **`[Project Name] Message Foundation`** document — the messaging source of truth for web, content, social, campaign, pitch-deck and member-briefing work.

This is the "Message Foundation Agent" from the LFX Marketing OS 42-agent list (LF Media department, 9-Agent category 1: Foundation Setup).

**Current version: 0.5.0** — the agent now asks first whether the foundation already has its own messaging documents, maps them into the standard fields and interviews only for the gaps; the document opens with a two-page Review Sheet for the ED and is held to an 8–10 page budget (it was 43 pages). Talking points, sound-bite banks and the CTA library are no longer stored. See "What changed in 0.5.0" below; 0.4.0 moved output to the LF Agent DOCS Template; 0.2.0 restructured the content around the Linux Foundation's own communications framework.

## What it does

Run the command **"Develop LF Project Messaging Foundation"** and the agent will:

1. Ask whether the foundation already has a messaging, positioning, value or narrative document to use as input. If it does, read it, tell you how many of the 17 standard fields it covers, quote its wording verbatim, and ask only about the gaps.
2. Check for an existing `[Project Name] Brand Kit` and, if found, read it section by section using an explicit Brand Kit → Message Foundation field mapping.
3. Otherwise ask a short set of questions, one at a time — project name, GitHub URL, and either the Brand Kit location or five brand-discovery questions if none exists — then up to 8 targeted questions to close remaining gaps: vision and mission, the locked tagline, proof points to confirm (with source and date), positioning contrast, origin story, objections and honest concessions, CTA anchors.
4. Build the Stat Bank first — only rows with a source, as-of date, caveat and type (live LFX / published / third-party / interview / your doc) — optionally pulling live figures through the LFX MCP tools when connected. Claims with no evidence read `[PROOF POINT TBD]`.
5. Generate `[Project Name] Message Foundation.md` following the v0.3 template (Review Sheet first, 8–10 pages), write the `.fields.yaml` sidecar downstream agents read, render the document with the bundled `scripts/build_lf_doc.py` onto the LF Agent DOCS Template as `[Project Name] Message Foundation.docx` (plus a lighter Drive-upload build), and place it in the project's Drive folder as a Google Doc.

## Document structure (v0.3)

| # | Section | What it holds |
|---|---|---|
| — | **Review Sheet** (2 pages) | Every field the ED or SME must approve: current wording, source (your doc / Brand Kit / README–LFX / inferred / needs input), blank Approve / Edit column, agent flags |
| — | How to Use This Document | Routing block for downstream agents and writers; standing rules; three-document architecture; sidecar name |
| 1 | Brand Message Hierarchy | Vision → Mission → Positioning Platform (≤40 words) → locked Tagline, each with shelf-life, audience and source |
| 2 | Project Definition | What it is (with the LFX-derived governance sentence); the two offers (project portfolio, membership) |
| 3 | Copy Primitives | 25-word, 50-word, boilerplate (100–150), elevator pitch (≤90), `llms.txt` — quoted verbatim when the foundation already has them |
| 4 | Voice | Pointer to the Brand Kit's voice, Prefer / Avoid and What we don't claim; the six deck writing rules |
| 5 | **Messaging Pillars** | 3–6 pillars on a fixed scaffold — What's happening / Why it matters / How [Project] helps — ≤120 words each with a proof-point id; goals vocabulary |
| 6 | Message Matrix | Derived from §5: value proposition, key message, supporting points per pillar under Mission and Positioning header rows |
| 7 | Proof Points | Honest statement of the evidence bench, acceptance criteria, top eight sourced rows |
| 8 | **Objections & What We Don't Claim** | Challenge / thesis / evidence / what we admit; the inherited and extended list of claims never made |
| 9 | Origin, CTAs, Terminology, Next Steps | ≤150-word origin story; four CTA anchors; naming and constraints by reference; downstream agents |
| A / B / C | Appendices | Inputs and interview record with provenance; Stat Bank (sourced rows only); source trace |

Bold rows changed most in 0.5.0. Retired: target audiences and audience angles (now the ICP document's personas), UVP alternates, talking points and sound bites, the tiered CTA library, hero-number sets, the definitions glossary (cited from the LF framework reference instead).

## Document family

This plugin assumes (but doesn't require) a companion **Brand Kit** — the LFX Marketing OS document that owns identity, voice, prefer/avoid language, what we don't claim, positioning statement, strengths, guardrails, tagline options and visual direction. It also accepts the foundation's own messaging documents as a direct input. `references/brand-kit-field-mapping.md` states which Brand Kit section populates which Message Foundation section and which fields the Brand Kit never contains (vision, mission, origin story, objections, stat provenance). A third document, the **ICP & Target Markets Document**, is a separate skill.

Downstream consumers of the Message Foundation in LFX Marketing OS: ICP & Target Markets, Pitch Deck, Website Designer, Quarterly Campaign Plan, Case Study, and Member Benefits Briefing agents.

## Grounding rule

Every factual claim in the generated document — proof points, adopter names, positioning contrasts, figures — must trace to the interview answers, the project's GitHub README, its Brand Kit, or a Stat Bank row with a named source and date. Anything unsupported is marked **TBD — needs input** rather than invented. Named organizations are never cited without explicit user confirmation. No superlative appears without its qualifier and source.

## Output format (v0.4.0)

Every Message Foundation is built on the Linux Foundation's **LF Agent DOCS Template** (Google Docs master: `docs.google.com/document/d/1RinjSuKojc9bqLLeviJfGE6yzSIfj8kSrTwIiWlH-HM`): Open Sans body, Roboto Slab headings, the LF logo header with `Project · Document · Status · copy label`, a centered footer with the agent name, date and page number. The cover carries the project's logo and name; the Brand Kit's Component 2 primary and secondary colors color the headings, the cover accent and the table headers ("colors only" brand styling — fonts and layout stay on the template so every LF project's documents look like one family). The spec, the logo/color sourcing order, the Markdown conventions and the Google Docs delivery are in `skills/develop-lf-project-messaging-foundation/references/lf-docs-template.md`. The four files that implement it and the shared intake spec — `scripts/build_lf_doc.py`, `assets/lf-agent-docs-template.docx`, `references/lf-docs-template.md`, `references/input-doc-mapping.md` — are identical across the three foundation plugins; change them together.

## What changed in 0.5.0

- **Existing documents first.** New Step 0a asks for the foundation's own messaging documents before anything else; fields they cover are quoted verbatim with a `From your doc` source label, and the interview shrinks to the gaps. The shared `[project-slug].inputs.yaml` record means the Brand Kit and ICP agents do not ask for the same files again.
- **Review Sheet.** Two pages after the cover: the 13 field groups an ED or SME must approve, with Source and Approve / Edit columns. Replaces the YOUR INPUT closing section; status moves to `Draft — pre-filled` / `Draft — from your documents` / `ED-reviewed`.
- **Length budget.** 8–10 pages target, 12 hard cap, no section over 300 words (Stat Bank exempt). Pillars move to a fixed three-part scaffold; the message matrix is derived from them, not authored.
- **Retired from storage:** target audiences and audience angles, UVP alternates, talking points and sound bites, the tiered CTA library (four anchors remain), hero-number sets, the glossary appendix. Downstream agents generate these on demand.
- **Honest evidence.** The Stat Bank holds only sourced rows; `[PROOF POINT TBD]` replaces padding, and §7 states the size of the bench.
- **Structured sidecar.** `[project-slug].message-foundation.fields.yaml` and `[project-slug].inputs.yaml` are written next to the document.
- **Shared spec.** `references/input-doc-mapping.md` (identical in all three foundation plugins) holds the field registry, micro-templates, Review Sheet, length budget and sidecar schema.

## What changed in 0.4.0

- Output moves from a generic `docx`-skill Word document to the **LF Agent DOCS Template**, rendered by the bundled builder script from the Markdown draft.
- Cover page with the **project's logo and name**, document type, accent rule, subtitle and a details table (Repository, Source Brand Kit, Prepared for, Date, Prepared by).
- **Project brand colors** (from the Brand Kit palette) applied to headings, cover accent and table headers, with automatic WCAG AA fallbacks for light palettes.
- Header and footer placeholders filled per document; page numbers from a live field.
- Delivery step added: a fonts-stripped Drive-upload build and the Google Docs placement in the project's shared folder.

## What changed in 0.2.0

Based on a review of the Linux Foundation Communications Framework and Marketing Template shared by Jim Zemlin, plus five LF executive decks built from that kind of messaging (Oracle and IBM/Red Hat executive briefings, the "Where the world builds together" narrative deck, a DPI/OpenWallet keynote, and the CNCF Governing Board deck):

- Added the **Brand Message Hierarchy** (Vision → Mission → Positioning Platform → Tagline) and the **definitions glossary** from the LF framework.
- Added the one-page **Message Matrix**.
- Added the **Stat Bank / Proof-Point Ledger** with provenance, caveats, live-vs-published-vs-third-party typing, canonical data window, and hero-number sets; optional live pull through LFX MCP tools.
- Added **Audience Angles & ROI Framing** per persona, with executive questions.
- Added **Origin Story & Before → After Case Library** and **Objections, Threats & Our Stance** (with a mandatory "what we admit").
- Added the tiered **CTA Library**.
- Pillars now carry **content-tag names**, flagship proof projects, and a fixed **goals vocabulary**.
- Voice section now includes the **deck writing rules** LF executive decks follow.
- New **Brand Kit → Message Foundation field mapping** reference and an **Appendix C source trace**; the skill reads the Brand Kit section by section.
- Interview extended from 5 to up to 8 gap-filling questions (vision/mission, locked tagline, origin story, objections added).
- New reference `references/lf-message-framework.md`; `references/example-notes.md` gained a v0.2 addendum.

Not changed: the bundled OpenSearch example still follows the v0.1 structure and is kept for tone and grounding calibration only.

## Tested against

OpenSearch (see `skills/develop-lf-project-messaging-foundation/examples/opensearch-message-foundation-sample.md`, produced with v0.1).

## Roadmap

A future version will connect to the Velocity Engine service (`VE-CreateFoundation` / `VE-MessageFoundation` MCP tools) to populate persona/ICP-style fields automatically. Until that integration is built, the skill runs on the interview + Brand Kit + README + optional LFX pull flow.

## Installing

Install from the LF-Marketing-OS marketplace (`paulhinz/LF-Marketing-OS`), drag the `.plugin` file into Cowork, or install via Claude Code's plugin system. No external accounts or API keys are required; the LFX MCP connector is optional and only used to populate live Stat Bank rows.
