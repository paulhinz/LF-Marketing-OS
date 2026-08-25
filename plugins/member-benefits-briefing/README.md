# Member Benefits Briefing Agent

LFX Marketing OS plugin that builds the LF CEO-style member executive briefing deck — "[Company] and the Linux Foundation" — for any Linux Foundation member company.

## What it does

Given a member company (e.g., "Create the member executive briefing for Google"), the agent:

1. Pulls the member's live LFX footprint — every active membership and its dues, code-contribution and maintainer rankings, where their code lands, event registrations and speaker counts, and training enrollments — plus the same dues pull for peer companies (Microsoft, Amazon, Google, IBM, Red Hat).
2. Researches member-specific context: governance seats, marquee projects they originated or donated, R&D spend for the ROI slide, and their angle on each narrative section.
3. Builds a ~60-slide PowerPoint styled to the LF executive briefing template (gradient top bar, LF logo lockup, navy quote boxes with cyan accent stripes, asymmetric dark/light card pairs), combining the standing LF / open-source-AI narrative with a fully personalized "Overview of [Company] in the LF" section.
4. Validates and visually QAs the deck before delivering it.

## Requirements

- **LFX connector** (MCP) — memberships, semantic-layer metrics (contributions, maintainers, events, training).
- **Web search** — member-specific public context.
- Sandbox with Node (`pptxgenjs`), Python (`Pillow`), LibreOffice, and Poppler for build and QA (standard in Cowork).

## Skill

- `build-member-benefits-briefing` — trigger with "Create the member benefits briefing for [company]", "build the exec briefing deck for [member]", or similar.

## Notes

- The standing narrative content in the example generator is dated August 2026 — the skill instructs the agent to flag reused vs. refreshed stats.
- The LF logo is a vector recreation; swap in the official asset for external-facing decks.
- Pairs with `member-360` (engagement-scoring spreadsheet) for QBR prep; `pitch-deck-agent` covers prospective members.
