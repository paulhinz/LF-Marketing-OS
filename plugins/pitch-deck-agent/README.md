# Pitch Deck Agent

LFX Marketing OS — Member Growth department · Agent No. 3 · 9-Agent Alignment: Category 1 (Foundation Setup)

Generates the standard first-meeting membership pitch deck for any Linux Foundation project or foundation, for use by the membership development team and Executive Directors / Project Leaders when meeting a prospective member or any persona they want to bring awareness to and build advocacy with.

Every deck follows a fixed, research-grounded outline (Kawasaki 10/20/30, Stanford GSB, Pitch Deck 101, YC) with four acts: grab attention → explain value → build trust → inspire action. Maximum 20 slides, Google Slides-ready.

## Components

| Component | Count | Purpose |
|-----------|-------|---------|
| Skills | 1 | `create-lf-project-pitch-deck` — the full deck-generation workflow |
| Agents | 0 | Not needed |
| Hooks | 0 | Not needed |
| MCP servers | 0 | Uses connectors already configured in Cowork (see below) |

## Usage

Say: **"Create pitch deck for [project]"** — optionally adding **"+ [prospect company]"** to get a prospect-specific speaker-notes prep brief alongside the standard deck.

Other triggers: "build a membership pitch deck for [project]", "make a first-meeting deck", "generate the member recruitment deck".

## Inputs

Best results come from attaching or pointing to the project's three LFX Marketing OS foundational documents:

- Brand Kit (or a link to brand guidelines)
- Message Foundation doc
- ICP & Target Markets doc

If any are missing, the skill asks 3–7 key questions instead. If none exist and the questions go unanswered, it stops rather than inventing positioning.

## Optional connectors

Read-only enrichment when connected in Cowork: HubSpot (prospect record), LFX (project/ecosystem data), Google Drive (locating foundational docs; uploading the finished deck so it opens in Google Slides). The plugin never writes to HubSpot or LFX and never sends anything externally.

## Human gate

The output is always a draft. The presenter (ED/PL or membership rep) is the mandatory approver before any prospect-facing use. The skill self-reviews against a quality rubric (brand, message, evidence, audience fit, action) for at most 3 revision cycles before presenting its best draft with any failing criteria flagged.

## Reference decks

Example membership pitch decks are curated in Google Drive:
https://drive.google.com/drive/u/0/folders/1SFEh8IxJuYi0QVxdaxqFbKUWQu6Ix5tp
