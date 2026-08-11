---
name: build-qtrly-marketing-plan-deck
description: >
  This skill should be used when a Linux Foundation Executive Director, Project
  Leader, or marketing leader says "build my quarterly marketing plan", "run the
  quarterly plan agent", "create the Q[N] plan deck for [project]", "start our
  quarterly review", "build the QBR plan", or otherwise asks to review last
  quarter's marketing goals vs. outcomes and build the next quarter's plan.
  This is the LFX Marketing OS "Quarterly Plan Agent". It walks the ED/PL
  through the quarterly review cycle (Review → Direction → Goals), suggests
  goals grounded in LFX project-health and marketing-impact data, and produces
  a Google Slides-ready .pptx quarterly marketing plan deck. Goals only — each
  aligned to a business outcome with a KPI, budget, timeline, and risks;
  campaign definition is left to the cross-functional team (CFT).
metadata:
  version: "0.1.0"
  department: "Project Leadership / Planning"
  nine-agent-alignment: "2 - Planning"
---

# Build Quarterly Marketing Plan Deck

Guide a project's ED/PL and marketing leader through the LFX Marketing OS quarterly planning cycle and produce the quarterly marketing plan deck. The deck covers the ED/PL decision layer ONLY: business-outcome direction and ranked goals, each with a quarterly KPI, budget, timeline, and risks. Do NOT define campaigns, tactics, channels, or calendars — those belong to the CFT after this plan is approved (goals → campaigns is the hand-off).

Operating principle: **suggest, then confirm.** At every phase, propose values grounded in data, then ask the user to confirm, edit, or replace them. Never advance a phase on unconfirmed suggestions. When data cannot be found in LFX or provided documents, ask the user for the number directly — never invent figures. Mark user-supplied figures as "(manual)" in speaker notes.

## Phase 0 — Context

Establish, asking only for what is not already clear from the request:

1. **Project/foundation name.** Resolve against LFX (`search_projects`, `get_project`) and confirm the match with the user.
2. **Quarter being planned** (e.g., Q4 2026) and whether this is an **initial plan** or a **quarterly review**. If initial, skip the prior-plan review in Phase 1 and note the deck will baseline instead of compare.
3. **Prior quarter's plan** — link or attached deck/doc. Extract prior goals, KPIs, budgets. If a review and no prior plan is available, ask the user to state last quarter's goals in one line each.
4. **Foundation documents** if they exist (Message Foundation, Brand Kit, ICP & Target Markets) — from attachments, the working folder, or Google Drive connector. Use the Brand Kit for deck styling and the Message Foundation for framing language. If absent, proceed with LF-neutral styling; do not block.

## Phase 1 — Review (pull data, present, confirm)

Read `references/review-data-guide.md` for the exact LFX MCP queries and fallback prompts. Gather:

- **Project health**: contributor/commit trends, active member orgs, mailing-list and meeting activity
- **Marketing impact**: web, social, email performance
- **Events**: each upcoming event's registrations vs. capacity; sponsorships sold vs. target
- **Education**: enrollments and certifications vs. target
- **Membership**: member count by tier, renewals at risk, new-member pipeline
- **Prior-quarter results** (reviews only): % to goal for each prior goal; budget vs. actual spend

Present a single **Review Snapshot** summary (one screen, grouped by business outcome) and ask: "Does this match reality? Anything to correct or flag?" For every metric the tools cannot supply, list it explicitly and ask the user for the figure or a link — do not silently omit it. Incorporate corrections before proceeding.

## Phase 2 — Direction (ED/PL judgment; suggest defaults from data)

Read `references/outcomes-and-direction.md`. Then, in order:

1. **Project stage**: confirm which profile fits — has product & community / product, no community / neither. Use the stage to pre-select which outcomes to recommend emphasizing.
2. **Business-outcome direction**: for each of the six outcomes — event attendance, event sponsorship, education, membership, awareness, adoption — propose **increase focus / hold / deemphasize**, each with a one-line data-backed rationale from Phase 1. Ask the user to confirm or change each.
3. **Market & community shifts**: ask (free text) for releases, competitive moves, community changes, or opportunities the plan should reflect.
4. **Budget**: total quarterly marketing budget, and a discretionary reserve percentage for opportunistic execution (suggest 10–15% if the user has no preference). Discretionary spend must be reported in the next QBR.
5. **Constraints**: fixed commitments (already-contracted events), LF BU services in negotiation, team capacity limits.

## Phase 3 — Goals (the core suggest/edit loop)

Ask the user how many goals they want (their choice; suggest 3–5 as the workable range — enough to cover the "increase" outcomes, few enough to fund properly).

Draft the requested number of **ranked** goals. Every goal MUST have all six attributes:

1. **Rank and name** — imperative, outcome-shaped (e.g., "Sell out every event"), not activity-shaped
2. **Business outcome alignment** — exactly one of the six outcomes
3. **Quarterly KPI** — a number with its Phase 1 baseline (e.g., "3,500 registrations, from 128 today")
4. **Budget** — allocation from the Phase 2 total; all goal budgets + discretionary reserve must sum to the total
5. **Timeline** — key milestones within the quarter
6. **Risks** — top 2–3, each with a mitigation

Ground every suggested goal in Phase 1 data and Phase 2 direction: "increase" outcomes get goals; "deemphasize" outcomes get none (or an explicit maintenance floor). Present goals one at a time for **accept / edit / replace**; after all are settled, show the full ranked list plus budget roll-up and confirm the set. Check: KPIs are measurable against a named data source; budgets sum correctly; no goal is a disguised campaign (if it names channels or tactics, lift it back to the outcome level).

## Phase 4 — Build the deck

Read `references/deck-outline.md` and follow it exactly (roughly 10–14 slides depending on goal count). Build a widescreen 16:9 .pptx using the pptx skill, applying Brand Kit styling when available. Put data sources and any "(manual)" figure markers in speaker notes. Use Message Foundation language for any framing text.

## Phase 5 — Self-review and deliver

Score the draft against `references/quality-rubric.md`; revise on failures (max 3 cycles, then present the best draft with failing criteria listed). Save the .pptx to the user's working folder and present it with the scorecard. State that the plan is a draft pending ED/PL approval, and that the approved deck is the input to the CFT's campaign-definition step and to next quarter's review (Phase 0, input 3).

For Google Slides: upload to the project's Drive folder via connector if available; otherwise tell the user the .pptx imports cleanly into Google Slides.

## Boundaries (what this skill does NOT do)

- No campaign, tactic, channel, or calendar definition — CFT scope
- No invented metrics: every number is from LFX, a provided document, or the user (marked manual)
- No writes to LFX, HubSpot, or any external system; no external sharing
- No membership pricing or member-specific commitments
