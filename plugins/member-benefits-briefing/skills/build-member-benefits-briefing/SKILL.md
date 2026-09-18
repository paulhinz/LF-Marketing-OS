---
name: build-member-benefits-briefing
description: This skill should be used when a Linux Foundation executive, membership development rep, or LF marketing team member says "Create the member executive briefing for [company]", "build the exec briefing deck for [member]", "prepare Jim's briefing for the [company] meeting", "make the [company] version of the executive briefing", "member briefing deck", or otherwise asks for the CEO-style executive briefing presentation given to a specific LF member company (e.g., the IBM or Google "…and the Linux Foundation" decks). This is the LFX Marketing OS "Member Benefits Briefing Agent". Also trigger on "member benefits briefing" or "build the member benefits deck for [company]". It pulls the member's live LFX footprint (memberships, dues, contributions, maintainers, events, training), merges it with the standing LF / open-source-AI narrative, and produces a ~60-slide PowerPoint styled to the LF executive briefing template.
---

# Member Benefits Briefing Agent

Produce the member-specific version of the LF CEO executive briefing deck — "[Company] and the Linux Foundation" — for a first-party executive meeting with an LF member. The deck combines the standing LF narrative (who the LF is, the open source AI story, the five challenges) with a fully personalized "Overview of [Company] in the LF" section built from live LFX data.

Audience: LF CEO/executives presenting to member-company leadership; membership development and member success teams preparing the meeting.

## Reference files

Read these before the corresponding step:

- `references/lfx-data-pull.md` — the exact LFX connector and semantic-layer queries for the member's footprint, with known gotchas (literal name variants, single-metric queries, missing metrics). Read before Step 2.
- `references/deck-outline.md` — the canonical slide-by-slide outline: which slides are standing narrative (reuse, but verify freshness) and which are member-specific (rebuild every run). Read before Step 4.
- `references/template-style-guide.md` — the LF executive briefing template design system, extracted from the canonical **LF 2025 Template** Google Slides deck (https://docs.google.com/presentation/d/1gOJakd6SdB7MLGflP-B0TVqsVU5lq-HGjI1TH4boCe8/) and aligned to the approved Linux Foundation brand (https://www.linuxfoundation.org/brand-guidelines): exact gradient stops for the top bar and dark-slide background, table style, official palette, logo usage, quote box, card patterns, typography, plus pptxgenjs build/QA gotchas. **Every output slide must be formatted to this template — no other slide styling.** Read before Step 4.

Asset files in `assets/`:

- `assets/example-build-deck.js` — a complete, working pptxgenjs generator (the Google briefing, August 2026), styled with the approved LF brand palette and official logo. Copy it and modify content; do not write a generator from scratch.
- `assets/make_gradient.py` — generates the template's two gradient PNGs, required by the generator: the top bar (`/tmp/gradbar.png`, Azure → Cyan → Royal Navy) and the dark-slide background (`/tmp/darkbg.png`, the LF 2025 Template's diagonal `3D3E5B` → `100F18` gradient).
- `assets/lf-stacked-color.svg` / `assets/lf-stacked-white.svg` — the OFFICIAL Linux Foundation primary (stacked) logo assets from the brand guidelines. Never edit, recolor, or redraw them.
- `assets/make_logos.py` — renders the official logo SVGs to `/tmp/lf-stacked-color.png` and `/tmp/lf-stacked-white.png` for pptxgenjs, required by the generator.

## Workflow

### Step 1 — Scope the run

Confirm with the user (skip anything already stated):

1. Which member company?
2. Meeting date and presenter (defaults: near-term date, "Jim Zemlin · CEO, The Linux Foundation").
3. Any member-specific asks to feature (a proposal, a foundation update, a challenge section to emphasize)?

### Step 2 — Pull the member's LFX footprint

Read `references/lfx-data-pull.md`, then collect via the LFX connector:

1. **Memberships & dues** — every active membership, tier, and annual price (`search_members` with the member's `b2b_org_uid`); compute total dues and "core" dues (excluding special directed funds like Alpha-Omega, Overture Maps, Chromium Supporters, Caliptra).
2. **Contributions** — last-12-month code contributions and rank vs. other companies; active contributor count and rank.
3. **Maintainers** — active maintainer count and rank; the member's top projects by maintainers.
4. **Where the code lands** — the member's top LF projects by contribution volume.
5. **Events** — registrations and speaker registrations by the member's corporate email domain, with top events.
6. **Training** — course enrollments and certification exams by domain, with most-taken courses.
7. **Peer comparison** — the same membership/dues pull for Microsoft, Amazon (AWS), Google, IBM, and Red Hat (or the member's relevant peer set).

### Step 3 — Research member-specific context

Fill what LFX cannot provide, via web search and the conversation:

- Governance seats (boards, TOCs/TACs, chairs) and marquee project affiliations (projects the company originated or donated).
- The member's R&D spend (latest annual report) for the ROI slide.
- The member's angle on each standing narrative section (e.g., their open-weight models for Challenge Three, their security tooling for Challenge Four).
- Any recent membership changes worth spotlighting (new Premier/Platinum joins).

Never fabricate numbers. Every member-specific figure must come from LFX, the member's public filings, or the user. Where a data source is unavailable (e.g., meeting attendance, sponsorship records), omit the stat or state the coverage limit on the slide.

### Step 4 — Build the deck

Read `references/deck-outline.md` and `references/template-style-guide.md`. Then:

1. Run `assets/make_gradient.py` (→ `/tmp/gradbar.png`, `/tmp/darkbg.png`) and `assets/make_logos.py` (→ `/tmp/lf-stacked-color.png`, `/tmp/lf-stacked-white.png`).
2. Copy `assets/example-build-deck.js` and rewrite the member-specific slides (title, the entire "Overview of [Company] in the LF" section, the member spotlights inside AAIF/challenge sections) with the data from Steps 2–3.
3. Update standing-narrative stats only if fresher figures are known; otherwise keep them and keep their source lines.
4. Run with `NODE_PATH` pointing at an environment with `pptxgenjs` installed; output `"[Company] and the Linux Foundation - Executive Briefing.pptx"`.

### Step 5 — QA and deliver

1. Validate the .pptx with the pptx skill's `validate.py`; fix generator errors and rebuild.
2. Render slides to images (LibreOffice → pdftoppm) and visually inspect a sample of every layout type for overflow, collisions, and template fidelity: gradient top bar on every slide, dark slides on the template's gradient background (never flat navy), correct logo variant, blue-header zebra tables, Open Sans type.
3. Deliver the file and summarize: the member's headline numbers (memberships, dues, contribution/maintainer ranks, event footprint) and any data gaps.

## Notes

- The standing narrative in the example generator is dated (August 2026). Flag clearly to the user which narrative stats were reused versus refreshed.
- All output decks are formatted to the canonical LF 2025 Template (https://docs.google.com/presentation/d/1gOJakd6SdB7MLGflP-B0TVqsVU5lq-HGjI1TH4boCe8/); if a needed pattern is missing from `references/template-style-guide.md`, match it to that deck rather than inventing styling.
- The template uses the official LF logo assets and only approved LF brand colors (https://www.linuxfoundation.org/brand-guidelines). Never redraw or recolor the logo, keep its clear space, and keep the trademark attribution line ("The Linux Foundation and The Linux Foundation logo design are registered trademarks of The Linux Foundation. Linux is a registered trademark of Linus Torvalds.") with the deck's fine print.
- Companion agents: run `member-360` for the engagement-scoring spreadsheet that pairs with this deck at QBRs; `pitch-deck-agent` covers prospective (non-member) first meetings instead.
