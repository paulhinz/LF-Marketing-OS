# Member Benefits Briefing Agent

LFX Marketing OS plugin that builds the LF CEO-style member executive briefing deck — "[Company] and the Linux Foundation" — for any Linux Foundation member company.

## What it does

Given a member company (e.g., "Create the member executive briefing for Google"), the agent:

1. Pulls the member's live LFX footprint — every active membership and its dues, code-contribution and maintainer rankings, where their code lands, event registrations and speaker counts, and training enrollments — plus the same dues pull for peer companies (Microsoft, Amazon, Google, IBM, Red Hat).
2. Researches member-specific context: governance seats, marquee projects they originated or donated, R&D spend for the ROI slide, and their angle on each narrative section.
3. Builds a ~60-slide PowerPoint formatted to the canonical **LF 2025 Template** ([Google Slides](https://docs.google.com/presentation/d/1gOJakd6SdB7MLGflP-B0TVqsVU5lq-HGjI1TH4boCe8/)) — gradient top bar, the template's dark gradient backgrounds, official LF logo lockups, blue-header zebra tables, navy quote boxes with cyan accent stripes, asymmetric dark/light card pairs — combining the standing LF / open-source-AI narrative with a fully personalized "Overview of [Company] in the LF" section.
4. Validates and visually QAs the deck before delivering it.

## Requirements

- **LFX connector** (MCP) — memberships, semantic-layer metrics (contributions, maintainers, events, training).
- **Web search** — member-specific public context.
- Sandbox with Node (`pptxgenjs`), Python (`Pillow`), LibreOffice, and Poppler for build and QA (standard in Cowork).

## Skill

- `build-member-benefits-briefing` — trigger with "Create the member benefits briefing for [company]", "build the exec briefing deck for [member]", or similar.

## Notes

- The standing narrative content in the example generator is dated August 2026 — the skill instructs the agent to flag reused vs. refreshed stats.
- The deck uses the official LF stacked-logo assets from the brand guidelines (never redrawn or recolored).
- Pairs with `member-360` (engagement-scoring spreadsheet) for QBR prep; `pitch-deck-agent` covers prospective members.

## Changelog

- **0.3.0** — Output slides are now always formatted to the canonical LF 2025 Template (Google Slides). Exact template gradients extracted and encoded: top bar `0094FF → 12E2E2 → 003778`, dark-slide background `3D3E5B → 100F18` (replacing flat navy backgrounds); blue-header (`4285F4`) zebra (`EEEEEE`) tables; Open Sans typography; `make_gradient.py` now also emits `/tmp/darkbg.png`.
- **0.2.0** — Official LF logo assets; approved-brand palette restyle.
- **0.1.0** — Initial release.
