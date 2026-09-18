# Member Pitch Deck

LFX Marketing OS — Member Growth department · Agent No. 3 · 9-Agent Alignment: Category 1 (Foundation Setup)

**Version 1.0.0** — replaces the earlier `pitch-deck-agent` plugin (v0.1.0). If you installed `pitch-deck-agent`, uninstall it and install `member-pitch-deck`; the old plugin will not receive further updates.

Generates the standard first-meeting membership pitch deck for any Linux Foundation project or foundation, for use by the membership development team and Executive Directors / Project Leaders when meeting a prospective member or any persona they want to bring awareness to and build advocacy with.

Every deck follows a fixed, research-grounded outline (Kawasaki 10/20/30, Stanford GSB, Pitch Deck 101, YC) with four acts: grab attention → explain value → build trust → inspire action. Maximum 20 slides.

## What's new in 1.0.0

- **Always on the LF 2025 Template.** The official LF Google Slides template is bundled as `assets/LF-2025-Template.pptx`, and every deck is built from it by `scripts/build_deck.py` using only the template's own layouts. Fonts (Open Sans), colors (LF navy / blue / cyan), the LF logo footer and slide numbers are inherited, never re-created, and the .pptx opens in Google Slides with the template theme intact.
- **Renamed.** Plugin is now `member-pitch-deck`; the skill command is `lf-member-pitch-deck`.
- **Layout guide.** `references/lf-template-guide.md` maps every slide of the standard outline to a template layout and documents the JSON spec the build script takes.
- **Rubric updated.** Template compliance replaces the old "no font below 30pt" check; rendered slides are inspected for overflow and empty placeholders before delivery.

## Components

| Component | Count | Purpose |
|-----------|-------|---------|
| Skills | 1 | `lf-member-pitch-deck` — the full deck-generation workflow |
| Assets | 1 | `LF-2025-Template.pptx` — the LF 2025 Google Slides template, exported |
| Scripts | 1 | `build_deck.py` — builds the deck from a JSON spec on the template's layouts |
| Agents | 0 | Not needed |
| Hooks | 0 | Not needed |
| MCP servers | 0 | Uses connectors already configured in Cowork (see below) |

## Usage

Say: **"lf-member-pitch-deck [project]"** or **"Create pitch deck for [project]"** — optionally adding **"+ [prospect company]"** to get a prospect-specific speaker-notes prep brief alongside the standard deck.

Other triggers: "build a member pitch deck for [project]", "make a first-meeting deck", "generate the member recruitment deck".

## Inputs

Best results come from attaching or pointing to the project's three LFX Marketing OS foundational documents:

- Brand Kit (or a link to brand guidelines) — supplies the project logo, voice and terminology; the template supplies the visual system
- Message Foundation doc
- ICP & Target Markets doc

If any are missing, the skill asks 3–7 key questions instead. If none exist and the questions go unanswered, it stops rather than inventing positioning.

## Output

`<Project> Member Pitch Deck.pptx` in the working folder (uploaded to the project's Drive folder when a Google Drive connector with write access is available), plus the rubric scorecard. Speaker notes on every slide carry the prep brief.

## Optional connectors

Read-only enrichment when connected in Cowork: HubSpot (prospect record), LFX (project/ecosystem data), Google Drive (locating foundational docs; uploading the finished deck so it opens in Google Slides). The plugin never writes to HubSpot or LFX and never sends anything externally.

## Human gate

The output is always a draft. The presenter (ED/PL or membership rep) is the mandatory approver before any prospect-facing use. The skill self-reviews against a quality rubric (template, brand, message, evidence, audience fit, action) for at most 3 revision cycles before presenting its best draft with any failing criteria flagged.

## Updating the template

Export the LF 2025 Template from Google Slides as PowerPoint, replace `skills/lf-member-pitch-deck/assets/LF-2025-Template.pptx`, run a test build, and bump the version in `.claude-plugin/plugin.json`. Layout names must stay unchanged or `build_deck.py` and the template guide must be updated to match.

## Reference decks

Example membership pitch decks are curated in Google Drive:
https://drive.google.com/drive/u/0/folders/1SFEh8IxJuYi0QVxdaxqFbKUWQu6Ix5tp
