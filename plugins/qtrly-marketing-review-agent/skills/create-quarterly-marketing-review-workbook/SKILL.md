---
name: "create-quarterly-marketing-review-workbook"
description: "Generates a pre-filled Quarterly Marketing Review workbook (.pptx) for a Linux Foundation project/foundation, summarizing the prior quarter's marketing outcomes and prompting the marketing team for insights. Trigger on \"create a quarterly marketing review workbook for [foundation]\", \"build the [foundation] quarterly review\", \"run the quarterly review workbook agent\", \"prepare the marketing outcomes review for [foundation]\", or similar. This is the LFX Marketing OS \"Quarterly Marketing Review Workbook Agent\" (Plan-type agent); its completed workbook is an input to the Marketing Plan Workbook Agent (create-marketing-plan-workbook)."
---

# Create Quarterly Marketing Review Workbook

Generate a pre-filled, question-driven quarterly marketing review workbook (.pptx, Google Slides-ready) for one Linux Foundation project/foundation. The workbook goes to the foundation's **marketing team** (MarCom staff, not the ED) at quarter end. They correct the pre-filled metrics and answer the insight questions. The completed workbook then becomes an input to the Marketing Plan Workbook Agent (`create-marketing-plan-workbook`), whose output presents this review's key data up front so the marketing team can share it with the Executive Director during the quarterly plan review.

This is a **Plan-type** agent in the LFX Marketing OS agent landscape (References | Plan | Create | Execute | Monitor).

## Why this workbook exists

For projects the marketing team already knows well, a discovery-style workbook restates known information. What earns trust with EDs and members is showing: what our goals were, how we tracked against them, what worked and didn't — and only then sitting down to plan. This workbook is that retrospective. It is grounded in the Central LF Marketing Engine Model (Awareness → Value Activation → Outcomes): the two stage-to-stage conversions are the engine's top health metrics, every vehicle run produces a target-vs-actual scorecard, and outcomes belong to the business units.

Metric discipline: distinguish **activity** metrics (posts published, campaigns run), **output** metrics (traffic, followers, contacts captured, signups), and **outcome** metrics (memberships, event attendance/revenue, training enrollments, contributor growth). A quarterly review leads with outcomes; activity and output are diagnostics.

## Workflow

### Step 1 — Identify the foundation and quarter

If not given, ask which foundation/project and which quarter is being reviewed (default: the most recently completed quarter; if run mid-quarter at the user's request, label everything "Q-to-date").

### Step 2 — Pull the data (research before building)

Gather from these sources. If a source is unavailable (connector not authorized, file not found), note the gap, proceed, and convert missing data into questions in the workbook. **Never fabricate a metric.**

**a. Prior quarter's plan and goals** — Search Google Drive for the foundation's current marketing plan, quarterly plan deck, or H2 update (name/link often in the master foundation spreadsheet, Google Sheet ID `110bv8q58jjcmRTpZe0meIcR8UuUisJd0FN3lnR_OQMg`). Extract the quarter's stated goals, KPIs, and targets. These anchor the goals-vs-actuals scorecard. If no prior goals are found, the scorecard becomes a YOUR INPUT table the team fills in.

**b. Master foundation spreadsheet** — Same sheet: MarCom roster, budget lines, renewal date, member count, revenue rank, events calendar entries.

**c. LFX metrics** — Via the LFX connector: call `read_lfx_standard_metrics_guidance` / `read_lfx_semantic_layer_guidance` first, find the project via `search_projects`, then pull quarter-over-quarter where possible: memberships by tier (new, churned, total, list value), contributors and contributing organizations (trend), committee/meeting activity, and any marketing-impact or project-health metrics.

**d. Marketing platform data (where connectors are authorized)** —
- HubSpot: new contacts created in the quarter, email performance (sends, open/click rates), campaign attribution, landing-page conversions.
- Social listening (LFX Lens / Octolens): mention volume vs. prior quarter, sentiment split, top sources, notable voices/amplifiers.
- Web/social analytics if reachable: site traffic, LinkedIn follower count and growth, YouTube subscribers/views, newsletter subscribers.
Whatever cannot be pulled becomes a pre-labeled blank in the metrics tables with a note: "team to supply from [platform]".

**e. Events and training** — From the LF events calendar / master sheet / web: which events ran this quarter; registration and attendance numbers if available; training/course enrollments if the foundation has courses.

### Step 3 — Generate the workbook (.pptx)

Read the pptx skill (SKILL.md) before building. Build one deck named:

`[Foundation] [Quarter] Marketing Review Workbook — DRAFT v1.pptx`

**Workbook conventions (apply throughout):**
- **Draft everything.** Pre-fill every metric the data supports so the team edits rather than writes. Tag each drafted slide with a visible badge: `DRAFT — CONFIRM OR CORRECT`.
- **YOUR INPUT slides.** Every section ends with clearly marked `YOUR INPUT` slides: lettered questions with empty answer boxes. Keep questions specific and answerable in a sentence or two.
- **Unknowns become questions or labeled blanks**, never invented facts. Cite sources on data slides (LFX, HubSpot, LFX Lens, past plan name, master spreadsheet, web source).
- **Slide notes carry provenance** for every pre-filled figure.
- Keep the deck tight (~18–24 slides). This is a working review document, not a report; repetition is the enemy.

**Deck outline:**

1. **Cover**: foundation name, "[Quarter] Marketing Review Workbook", status DRAFT, date.
2. **How to complete this workbook**: the marketing team confirms/corrects pre-filled metrics and answers YOUR INPUT boxes; estimated time 30–45 minutes; the completed workbook feeds the next quarterly marketing plan and its Executive Summary is presented to the ED during the quarterly plan review; who to contact.
3. **Section 1 — Executive Summary (the "movie trailer", 2 slides)**: goals vs. actuals scorecard (goal | KPI | target | actual | status), top 3 wins, top 3 gaps, decisions needed. Drafted from data; explicitly marked as the slides that will be lifted into the ED quarterly review. YOUR INPUT: confirm the scorecard; state the one-sentence headline of the quarter.
4. **Section 2 — Business Outcomes** (what the engine delivered for the BUs): membership (new, churned, renewals due, total and list value, QoQ), event registrations/attendance vs. capacity/target, training enrollments, contributor and contributing-org trend. YOUR INPUT: which outcomes did marketing most influence this quarter, and what's the evidence? Any outcome the numbers miss?
5. **Section 3 — Engine Health** (the two conversions + funnel): Awareness→Value Activation conversion (channel traffic → vehicle signups) and Value Activation→Outcomes conversion (contacts → BU outcomes), with whatever UTM/attribution data exists; new contacts captured in the quarter. Where conversion data doesn't exist yet, say so — instrumenting it is itself a finding. YOUR INPUT: where does the funnel leak? What attribution do you trust / not trust?
6. **Section 4 — Channel Indicators** (ops metrics, one table): per channel (LinkedIn, X, YouTube, web, newsletter, podcast, PR) — audience size, growth QoQ, engagement rate, traffic delivered, and conversion into vehicle signups where known. YOUR INPUT: best- and worst-performing channel and why; anything to stop doing.
7. **Section 5 — Vehicle Scorecards**: one row per vehicle run this quarter (webinar, white paper, meetup, course, etc.): declared target vs. actual signups/attendance, contact capture, downstream outcome if known. YOUR INPUT: which vehicle would you run again tomorrow; which was not worth the effort?
8. **Section 6 — Market & Community Signals**: social listening summary (mention volume QoQ, sentiment, notable voices), notable market/competitor shifts observed during the quarter (web-researched, marked draft). YOUR INPUT: what changed in the market this quarter that should change the plan?
9. **Section 7 — Insights & Learnings (the heart of the workbook, mostly YOUR INPUT)**:
   a. What worked — and would you double down?
   b. What didn't work — and what did it teach us?
   c. What surprised you? Which planning assumptions broke?
   d. Execution: what % of planned initiatives shipped? What was cut or delayed, and why?
   e. What did you learn about the audience/message (what resonated, what fell flat)?
   f. Capacity and constraints: where were you blocked (budget, bandwidth, approvals, data)?
   g. Risks you see forming for next quarter.
   h. Your top 3 recommendations to bring into next quarter's plan.
   i. Asks: what do you need from central marketing, the BU, or the ED?
10. **Closing slide — next steps**: return the workbook; it feeds the Marketing Plan Workbook for next quarter; the Executive Summary is presented to the ED and marketing leader so baseline definitions and goals are re-compared against market changes every quarter.

### Step 4 — Deliver

Save the .pptx to the outputs folder and present it. Summarize in a few sentences: what was pre-filled from which sources, what became labeled blanks or questions, and the next steps: (1) send to the foundation's marketing team, (2) they complete it, (3) feed the completed workbook to `create-marketing-plan-workbook` as a prior-quarter input.

## Guardrails

- Never fabricate metrics. Every pre-filled figure traces to a source named in the slide notes; missing platform data becomes a labeled blank, not an estimate.
- LFX membership figures are list-price values, not dues billed — label them as such.
- Do not email or share the workbook with anyone unless explicitly asked; deliver the file to the user.
- Keep the section skeleton identical across foundations and quarters for comparability; vary content, not structure.
- If run for multiple foundations, one deck per foundation, processed one at a time or via parallel sub-agents.
