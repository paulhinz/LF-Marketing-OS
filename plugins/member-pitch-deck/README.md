# Member Pitch Deck

LFX Marketing OS — Member Growth department · Agent No. 3 · 9-Agent Alignment: Category 1 (Foundation Setup)

**Version 2.0.0** — rebuilt to match the membership overview deck Member Growth produced from the v1 x402 output. Replaces the earlier `pitch-deck-agent` plugin; if you installed it, uninstall it and install `member-pitch-deck`.

Generates the standard first-meeting membership overview deck for any Linux Foundation project or foundation, for use by the membership development team and Executive Directors / Project Leaders when meeting a prospective member or any persona they want to bring awareness to and build advocacy with.

Every deck follows the three-part arc Member Growth presents: **About the Linux Foundation → Introducing the Foundation → How to join as a member**. 21 standard slides, hard cap 22.

## What's new in 2.0.0

- **Membership-overview style replaces the LF 2025 template lock.** White canvas, serif display titles and sans body from the project's Brand Kit (defaults: Instrument Serif / Inter), one Brand Kit accent, light-gray rounded cards, the project wordmark on every content slide and a "The Linux Foundation | project" co-brand lockup on the title and closing slides. `scripts/build_deck.py` draws every slide from a JSON spec; the spec can only supply content and Brand Kit tokens.
- **New outline.** A standard LF opener (goal statement, critical-projects mosaic, four core factors), then Foundation/Standard, Vision-Mission-Strategy, the prospect's current state, a four-step "how it works", architecture, production stats, member logo walls by tier, leadership welcome, "what members get that users don't", roadmap with a "your priority here" callout, tier cards, ROI by role, first 90 days, a dark ask slide and a thank-you.
- **New layouts.** `cards`, `rows`, `steps`, `stats`, `logo_wall`, `person`, `tiers`, `table`, `timeline`, `vision`, `statement`, `ask`, `thanks` — the slide patterns from the x402, AAIF and CNCF membership decks.
- **Clean slides, sourced notes.** No source lines, legal-entity footers or agent attribution on slides; every figure's exact value, source and read date go in speaker notes, and live counters are stated as defensible rounded figures.
- **Appendix module library** (per-tier benefits, fee bands, governance, working groups, events, antitrust) for an optional longer leave-behind, modeled on the AAIF and CNCF overview decks.
- **Rubric updated** for style compliance, card parallelism, figure defensibility and member-logo provenance.

## Components

| Component | Count | Purpose |
|-----------|-------|---------|
| Skills | 1 | `lf-member-pitch-deck` — the full deck-generation workflow |
| Assets | 2 (+1 legacy) | `lf-logo-color.png`, `lf-logo-white.png` for the co-brand lockup; `legacy/LF-2025-Template.pptx` kept for reference only |
| Scripts | 1 | `build_deck.py` — builds the deck from a JSON spec in the membership-overview style |
| References | 5 | standard outline, style guide and layout keys, quality rubric, key questions, worked x402 example spec |
| Agents | 0 | Not needed |
| Hooks | 0 | Not needed |
| MCP servers | 0 | Uses connectors already configured in Cowork (see below) |

## Usage

Say: **"lf-member-pitch-deck [project]"** or **"Create pitch deck for [project]"** — optionally adding **"+ [prospect company]"** to get a prospect-specific speaker-notes prep brief alongside the standard deck.

Other triggers: "build a member pitch deck for [project]", "build the membership overview for [foundation]", "make a first-meeting deck", "generate the member recruitment deck".

## Inputs

Best results come from attaching or pointing to the project's three LFX Marketing OS foundational documents:

- Brand Kit (or a link to brand guidelines) — accent color, fonts, wordmarks and mark
- Message Foundation doc — vision, mission, strategy, locked summaries
- ICP & Target Markets doc — personas and pain points in the prospect's vocabulary

Plus the membership facts: tiers and fees, benefits, enrollment URL, contact address, member logos by tier, ED/lead headshot and bio, active working groups. The LF "critical projects" mosaic must be the current LF-approved image placed at `assets/lf-project-mosaic.png`.

If foundational docs are missing, the skill asks 3–7 key questions instead. If none exist and the questions go unanswered, it stops rather than inventing positioning.

## Output

`<Project> Member Pitch Deck.pptx` in the working folder (uploaded to the project's Drive folder when a Google Drive connector with write access is available; fonts resolve in Google Slides), plus the rubric scorecard. Speaker notes on every slide carry the prep brief and figure sources.

## Optional connectors

Read-only enrichment when connected in Cowork: HubSpot (prospect record), LFX (project/ecosystem data, member lists), Google Drive (locating foundational docs; uploading the finished deck so it opens in Google Slides). The plugin never writes to HubSpot or LFX and never sends anything externally.

## Human gate

The output is always a draft. The presenter (ED/PL or membership rep) is the mandatory approver before any prospect-facing use. The skill self-reviews against a quality rubric (structure, style, brand, message, evidence, audience fit, action) for at most 3 revision cycles before presenting its best draft with any failing criteria flagged.

## Reference decks

- x402 Pitch Deck v1 (Member Growth rebuild — the style and outline reference): https://docs.google.com/presentation/d/1FN7mNFw1Ws3l7JsrLd3eo0x0vgOqDPp6Fb4GHzCkzCk
- Agentic AI Foundation Overview Deck and CNCF Overview 2026 (appendix module patterns)
- Curated examples folder: https://drive.google.com/drive/u/0/folders/1SFEh8IxJuYi0QVxdaxqFbKUWQu6Ix5tp
