---
name: build-marketing-plan-workbook
description: "Builds the pre-filled Marketing Plan Workbook (.pptx) an LF Executive Director completes before the planning interview. Goals tied to the four standard business outcomes with KPI, budget share, timeline, risks; budget set by Strategy Profile; ends with a goals summary table and budget summary. Trigger on 'build the marketing plan workbook for [foundation]', 'first marketing plan for [project]', or 'run the workbook agent'."
---

# Build Marketing Plan Workbook

Produce one `.pptx` named `[Foundation] [Period] Marketing Plan Workbook — DRAFT v1.pptx`. The ED edits the DRAFT slides and answers the YOUR INPUT boxes; the completed workbook is the input to the final Marketing Plan agent. This is a **Plan-type** agent in the LFX Marketing OS (References | Plan | Create | Execute | Monitor).

The deck follows the PyTorch Foundation 2026 plan's five-part shape (Story, Goals, Message & Audiences, One Plan One Engine, Execution) with two additions that make the ED's decisions explicit: **Part IV is now the Budget**, and the deck closes with a **Goals Summary table** and a **Budget Summary slide**. Read `references/deck-outline.md` for the slide-by-slide spec, `references/business-outcomes.md` for the goal framework and the LFX source of every baseline, and `references/budget-model.md` for the Strategy Profile math.

## Workflow

### Step 1 — Identify foundation, period, mode

Ask for the foundation if not given. Confirm the plan period (default: next calendar year; a bridge quarter plus next year is allowed).

Then ask ONE question: *"Has a Quarterly Marketing Review Workbook or a prior marketing plan been completed for [Foundation]? Share it, let me search Drive, or say none exists."*

- Anything found → **RENEWAL PLAN mode**. Read it; its Executive Summary becomes *Last Quarter at a Glance*; its goals-vs-actuals become the baselines.
- Nothing exists → **FIRST PLAN mode**. Do not ask the ED to reconstruct last quarter. Instead open with *Where we stand today*: a one-page baseline of the business outcomes pulled from LFX and the connectors (Step 2), so the ED's first decisions are about targets, not archaeology. Record the mode in the slide notes and the delivery summary.

### Step 2 — Pull the data (research before building; never fabricate)

Record every figure with its source and date in `workbook.json → provenance` so slide notes carry it.

**a. Foundation documents** — Brand Kit, Message Foundation, ICP & Target Markets (Drive). Extract: positioning, pillars, Stat Bank rows, audiences/personas, competitors (peer/complement framing), palette and fonts for re-skinning, CTA library, open items.

**b. Master foundation spreadsheet** — Google Sheet `110bv8q58jjcmRTpZe0meIcR8UuUisJd0FN3lnR_OQMg`: ED/PL, MarCom, Events, PM/Community, SOW, renewal date, plan links, Mktg Budget, Event Mktg Budget, Members, Rev Rank, LF Events, Notes. Blank cells become YOUR INPUT questions.

**c. LFX baselines (one call per row of the outcome table)** — read `read_lfx_standard_metrics_guidance` first, resolve the slug with `search_projects`, then pull, for the trailing 365 days unless noted:
- *Secure & Retain Commitment*: `memberships by=tier` (count + list-price revenue), `member_organizations`, `paying_member_organizations`, `new_members period=month`, `membership_churn`, `lost_member_organizations`.
- *Fill the Seats*: `event_registrations by=event`, `speakers`, `event_sponsorships`, `training_enrollments by=course`, `certifications`.
- *Nurture to Adoption*: `contributors` (+ `period=month`), `contributing_organizations`, `participants`, `maintainers`, `contributions by=org` (to judge employer attribution), `project_health`.
- *Grow the Audience*: `social_mentions`, `social_reach`; `count_lfx_resources` for `groupsio_mailing_list`, `v1_past_meeting`, `v1_past_meeting_participant`; committees via `search_committees`.
A zero from LFX is a **floor or an onboarding gap**, never "none": say which in the note (for example "0 maintainers = roster not onboarded").

**d. Audience platform data (if connectors are authorized)** — HubSpot: contacts carrying the project's property or list, net new in the last 12 months, newsletter subscribers, email performance. Social listening (LFX Lens / Octolens): mention volume, sentiment, keyword coverage. Web analytics if reachable. Anything missing becomes a labeled blank: "team to supply from [platform]".

**e. Published counters and site facts** — the project's own site, docs, GitHub stars/forks, facilitator or integration directories. Quote as displayed, dated.

**f. Market context (optional)** — one or two web searches for the domain's stakes figure. Mark as draft to verify.

### Step 3 — Draft the plan decisions

1. **Classify the project stage** (`references/business-outcomes.md §Stage`): Has product & community / Has product, no community / No product, no community. The stage sets the default emphasis across the four outcomes.
2. **Draft 4–6 goals**, at least one per business outcome the stage emphasizes, each with: outcome, concise definition, KPI (one number, dated), proposed budget share, timeline, risks, LFX/baseline source. Rank them; the lower-numbered goal wins conflicts.
3. **Compute the budget** with `scripts/budget_model.py --revenue <list-price revenue> [--fee-tier auto]`: it prints the three Strategy Profile columns (total, paid, remainder; remainder split into LF services/headcount, third-party content, discretionary) and the flat-pricing cross-check. Put the three columns on the Strategy Profile slide; the ED picks one. Allocate the chosen total across the goals by the drafted shares.
4. **Draft the Goals Summary table and Budget Summary** from steps 2–3. They are the two slides the final plan agent will lift verbatim, so every cell must trace to a slide earlier in the deck.

### Step 4 — Build the deck

Write `workbook.json` (schema in `references/deck-outline.md §Spec`) and run:

```bash
node scripts/build_workbook.js workbook.json "<output path>.pptx"
```

The generator applies the LF deck conventions and re-skins with the foundation's Brand Kit palette (`brand.ink`, `brand.accent`, `brand.neutral`, heading/body fonts mapped to QA-safe stand-ins). Then QA per the pptx skill: `validate.py`, render to images, inspect every slide for overflow, re-run only what changed.

**Conventions**
- Every pre-filled slide carries the badge `DRAFT — CONFIRM OR CORRECT`; every Part ends with a `YOUR INPUT` slide of lettered questions with answer boxes.
- Figures appear with source and date on the slide; slide notes carry fuller provenance and any discrepancy between sources.
- Draft ≠ invented: a target is "proposed", a market figure is "verify", a blank is a question.
- Peer/complement framing for member-authored alternatives; never name a competitor to criticize.

### Step 5 — Deliver

Present the file. Summarize: mode (First Plan or Renewal), what was pre-filled from which sources, which cells are blanks or questions, the Strategy Profile columns computed, and next steps: send to the ED named in the master spreadsheet, schedule the interview, feed the completed workbook to the final-plan agent.

## Guardrails

- Always ask the Step 1 question before building; never block on the answer.
- Membership revenue from LFX is **list price**, not dues billed — label it so everywhere, and ask the ED to confirm the revenue base the budget should use.
- Never present a budget figure as approved; the Strategy Profile is the ED's choice and the LF-defined split of the remainder is a proposal until LF confirms.
- One deck per foundation; identical skeleton across foundations; vary content, not structure.
- Do not send the workbook to anyone unless asked.
