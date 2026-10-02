# Marketing Plan Workbook Agent

LFX Marketing OS **Planning** agent (Plan-type in the References | Plan | Create | Execute | Monitor landscape). Current version: **0.3.0**. Skill: `build-marketing-plan-workbook` (replaces `create-marketing-plan-workbook`).

Builds the pre-filled, question-driven **Marketing Plan Workbook** (.pptx, Google Slides-ready) for one Linux Foundation project or foundation. The Executive Director corrects the DRAFT slides and answers the YOUR INPUT boxes before the planning interview; the completed workbook feeds the final marketing plan agent.

## What changed in 0.3.0

- **First Plan mode.** When no prior plan or Quarterly Marketing Review exists, the deck opens with *Where we stand today*: six LFX-sourced baseline tiles (members and list-price revenue, new-membership trend, events/speakers/sponsorships, education, contributors/participants, audience and content). Zeros are explained as floors or onboarding gaps. Renewal mode (a completed review workbook exists) keeps *Last Quarter at a Glance*.
- **Goals tied to the four standard business outcomes** — Fill the Seats, Grow the Audience, Nurture to Adoption, Secure & Retain Commitment. One slide per goal with definition, KPI (one number, dated), budget share, timeline, risks, baseline and an ED confirm box.
- **Part IV is the Budget.** Step 1: the ED chooses a Strategy Profile (Conservative Growth 12%, Aggressive Scale 20%, Hyper-Growth 30% of membership revenue; paid pre-set at 30/40/50% of total). Step 2: the remainder is split into LF marketing services/headcount, third-party content and a discretionary reserve for hot and evergreen campaigns, with a flat-pricing fee cross-check. Step 3: the total is allocated across the goals.
- **Two summary slides** the final plan lifts verbatim: a Goals Summary table (goal, outcome, definition, KPI, budget % and $, timeline, risks) and a Budget Summary (total, LF services, paid, content, planned campaign spend vs discretionary reserve, allocation by outcome).
- **Repeatable build.** `scripts/budget_model.py` computes the profile table from the LF_Marketing_Services_Matrix percentages; `scripts/build_workbook.js` renders a `workbook.json` spec to the deck, re-skinned with the foundation's Brand Kit palette. `references/example-x402-workbook.json` is a complete worked example.

## What it does

1. **Asks one question** — does a prior plan or Quarterly Marketing Review exist? That sets First Plan or Renewal mode.
2. **Pulls the data** — the three foundation documents (Brand Kit, Message Foundation, ICP), the LF master foundation tracker, LFX standard metrics for every business-outcome baseline, HubSpot and social-listening connectors where authorized, published counters, and optional market context.
3. **Drafts the decisions** — project stage, 4–6 ranked goals, the budget model, the goal allocation.
4. **Builds and QAs the deck** — ~35 slides in the five-part skeleton (Story, Business Outcomes & Goals, Message & Audiences, Budget, Execution) plus the two summary slides and data notes.

## Usage

Say: `build the marketing plan workbook for [foundation]` or `first marketing plan for [project]`.

## Requirements

- Google Drive connector (foundation documents, master tracker, pricing sheet)
- LFX connector (all baselines)
- HubSpot connector (optional — audience baseline)
- Node with `pptxgenjs`, Python 3 (build scripts)

Missing connectors degrade gracefully: the gap becomes a labeled blank or a YOUR INPUT question.

## Workflow position

Quarterly Marketing Review workbook (`qtrly-marketing-review-agent`, optional) → **this workbook** → ED review → planning interview → final marketing plan agent → `qtrly-campaign-plan-agent` and the creating/executing agents.
