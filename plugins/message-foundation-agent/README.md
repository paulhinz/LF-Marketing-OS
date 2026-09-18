# Message Foundation Agent

An LFX Marketing OS plugin for Cowork/Claude Code. Interviews a Linux Foundation project lead and produces a **`[Project Name] Message Foundation`** document — the messaging source of truth for web, content, social, campaign, pitch-deck and member-briefing work.

This is the "Message Foundation Agent" from the LFX Marketing OS 42-agent list (LF Media department, 9-Agent category 1: Foundation Setup).

**Current version: 0.4.0** — the document is now delivered Google Docs-ready on the Linux Foundation's LF Agent DOCS Template, with the project's name and logo on the cover and its Brand Kit colors applied. See "What changed in 0.4.0" below; 0.2.0 restructured the content around the Linux Foundation's own communications framework.

## What it does

Run the command **"Develop LF Project Messaging Foundation"** and the agent will:

1. Check for an existing `[Project Name] Brand Kit` and, if found, read it section by section using an explicit Brand Kit → Message Foundation field mapping.
2. Ask a short set of questions, one at a time — project name, GitHub URL, and either the Brand Kit location or five brand-discovery questions if none exists.
3. Ask up to 8 more targeted questions to close remaining gaps: vision and mission, the locked tagline, proof points to confirm (with source and date), audience scope and outreach objectives, positioning contrast, origin story, objections and honest concessions, CTAs and timeliness.
4. Build the Stat Bank first — every number with its source, as-of date, caveat and type (live LFX / published / third-party / interview) — optionally pulling live figures through the LFX MCP tools when connected.
5. Generate `[Project Name] Message Foundation.md` following the v0.2 template, then render it with the bundled `scripts/build_lf_doc.py` onto the LF Agent DOCS Template as `[Project Name] Message Foundation.docx` (plus a lighter Drive-upload build), and place it in the project's Drive folder as a Google Doc.

## Document structure (v0.2)

| # | Section | What it holds |
|---|---|---|
| 0 | Overview | Purpose, audience, source date, Brand Kit derivation note |
| 1 | **Brand Message Hierarchy** | Vision → Mission → Positioning Platform → Tagline, each with shelf-life and primary audience (LF framework) |
| 2 / 2a | Project Definition & Word-Count Derivatives | What it is, long elevator pitch; 25-word, 50-word, boilerplate, `llms.txt`, elevator pitch slide |
| 3 | Voice & Tone | Adjectives, Do/Don't, reading level, plus deck writing rules (stat-first headlines, kickers, sourced superlatives) |
| 4 / 5 | Positioning Statement & UVP | For/who/unlike formula; UVP with signage-length alternates |
| 6 / 6a | Target Audiences & **Audience Angles / ROI Framing** | Per persona: the line that lands, proof points by Stat Bank ID, the executive question to plant, preferred CTA |
| 7 | Messaging Pillars | 3–5 pillars with **content-tag names**, flagship proof projects, and a fixed **goals vocabulary** ("Supports: …") |
| 8 | **Message Matrix** | One-page message house: Value Proposition → Key Message → Supporting Points → Sound Bites per pillar, under Mission and Positioning header rows |
| 9 | Value → Support → Proof | The rigor chain under the matrix |
| 10 | **Stat Bank / Proof-Point Ledger** | Every number: claim, figure, unit, period, source, caveat, type; canonical data window; "big four" hero-number sets |
| 11 | **Origin Story & Before → After Cases** | Donation → neutral governance → default pattern; 2–4 cases; "what winning looks like" |
| 12 | **Objections, Threats & Our Stance** | Challenge, thesis, evidence, rebuttal, and "what we admit" |
| 13 | Talking Points & Soundbites | Executive soundbite, social message, audience angles, sound bite bank tagged by pillar |
| 14 | **CTA Library** | Tiered Learn / Engage / Contribute / Commit, mapped to audience and pillar |
| 15 / 16 | Terminology & Constraints; Next Steps | Naming, guardrails, reference brands; what the document unlocks and which agents consume it |
| A / B / C | Appendices | Interview record; **definitions glossary** (LF framework); **Brand Kit source trace** |

Bold rows are new in 0.2.0.

## Document family

This plugin assumes (but doesn't require) a companion **Brand Kit** — the LFX Marketing OS document that owns identity, voice, positioning statement, audiences, strengths, guardrails, tagline options and visual direction. `references/brand-kit-field-mapping.md` states which Brand Kit section populates which Message Foundation section and which fields the Brand Kit never contains (vision, mission, origin story, objections, stat provenance). A third document, the **ICP & Target Markets Document**, is a separate skill.

Downstream consumers of the Message Foundation in LFX Marketing OS: ICP & Target Markets, Pitch Deck, Website Designer, Quarterly Campaign Plan, Case Study, and Member Benefits Briefing agents.

## Grounding rule

Every factual claim in the generated document — proof points, adopter names, positioning contrasts, figures — must trace to the interview answers, the project's GitHub README, its Brand Kit, or a Stat Bank row with a named source and date. Anything unsupported is marked **TBD — needs input** rather than invented. Named organizations are never cited without explicit user confirmation. No superlative appears without its qualifier and source.

## Output format (v0.4.0)

Every Message Foundation is built on the Linux Foundation's **LF Agent DOCS Template** (Google Docs master: `docs.google.com/document/d/1RinjSuKojc9bqLLeviJfGE6yzSIfj8kSrTwIiWlH-HM`): Open Sans body, Roboto Slab headings, the LF logo header with `Project · Document · Status · copy label`, a centered footer with the agent name, date and page number. The cover carries the project's logo and name; the Brand Kit's Component 2 primary and secondary colors color the headings, the cover accent and the table headers ("colors only" brand styling — fonts and layout stay on the template so every LF project's documents look like one family). The spec, the logo/color sourcing order, the Markdown conventions and the Google Docs delivery are in `skills/develop-lf-project-messaging-foundation/references/lf-docs-template.md`. The three files that implement it — `scripts/build_lf_doc.py`, `assets/lf-agent-docs-template.docx`, `references/lf-docs-template.md` — are identical across the three foundation plugins; change them together.

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
