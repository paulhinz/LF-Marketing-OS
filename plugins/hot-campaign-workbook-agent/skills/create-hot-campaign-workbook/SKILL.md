---
name: "create-hot-campaign-workbook"
description: "Generates a pre-filled Hot Campaign Workbook (.pptx) for a Linux Foundation project: the IDENTIFY stage of the LFX Marketing OS Hot Campaigns workflow. Trigger on \"create a hot campaign workbook for [project]\", \"our [goal] is off track, what can we add\", \"[news/release/competitor move] just happened, should we respond\", or \"scan for hot campaign opportunities for [project]\". Flag mode (the ED names the trigger) or scan mode (the agent finds candidates). Output feeds hot-campaign-plan-agent."
---

# Create Hot Campaign Workbook

Generate a pre-filled, question-driven **Hot Campaign Workbook** (.pptx, Google Slides-ready) for one Linux Foundation project/foundation and one candidate hot campaign. This is the **IDENTIFY** stage of the LFX Marketing OS Hot Campaigns workflow (strategy deck, "HOT CAMPAIGNS Workflow" slide): IDENTIFY → PLAN → EXECUTE → MONITOR. The workbook goes to the Executive Director (ED) and the cross-functional marketing team (CFT); their corrections and answers become the approved brief that `hot-campaign-plan-agent` turns into a Segmentation List and a Hot Campaign Plan.

This is a **Plan-type** agent in the agent landscape (References | Plan | Create | Execute | Monitor). It is the opportunistic sibling of `create-marketing-plan-workbook`: same conventions (draft everything, unknowns become questions, provenance in slide notes), but built for a campaign that must be live within 48 to 72 hours of message approval, is funded from the discretionary reserve, runs alongside the quarterly plan without changing it, and closes at its end date or when its KPI is met.

## What a hot campaign is (and is not)

A hot campaign is an unplanned campaign raised by the ED or marketing leader for one of three reasons:

1. **Off track.** A quarterly goal or planned campaign is behind its KPI, adjusting the existing tactics is not enough, and the ED wants to keep the planned tactics running while adding something new.
2. **Industry news.** Something in the market (news, analyst report, regulation, security incident, a shift the newsfeed surfaces) gives the project a reason and a right to speak now.
3. **Opportunity.** A product release (the project's own or an ecosystem partner's), a viral post, a creator or press mention with real reach, an award, or a competitor's move.

Its two possible intents, one of which is primary: **create new contacts** (top of funnel, awareness to Viable) or **nurture existing contacts toward a business outcome** (Viable to Warm to Hot: registration, membership conversation, enrollment, contribution). Every hot campaign serves one of the standard business outcomes: Adoption, Fill the Seats (Events), Grow the Audience, Secure/Retain Commitment (Membership), Education.

Rules from the strategy deck that the workbook must carry: owner is the marketing leader or ED who raised it; budget is the discretionary reserve, within limits and reported in the QBR; one UTM per source; QA gate before publishing; daily pulse while live; close-out report with learnings fed into next quarter's plan; the IDENTIFY-stage metric is **ED satisfaction**.

Read `references/trigger-taxonomy.md` for the trigger types, archetypes, decay windows, and the opportunity scoring rubric before Step 2.

## Workflow

Target total run time: under 30 minutes. A hot campaign workbook that takes a day to produce has already missed its window. Time-box each data pull; when a source is slow or unavailable, note the gap and move on.

### Step 1 — Intake interview (the runner)

The person running the skill is the ED or the marketing leader. Ask these in one batch (use AskUserQuestion where the tool exists), then confirm before pulling data:

a. **Which project/foundation?** Confirm via LFX `search_projects`.
b. **Flag or scan?** "Do you have a specific trigger in mind (a news item, a release, a competitor move, a goal that is off track), or should I scan the newsfeed, social listening, and the results dashboard for candidates?" If they name a trigger, capture it in their words and continue in **flag mode**. If not, run **scan mode** (Step 2b) and come back to this interview once they have picked a candidate.
c. **Which business outcome should this move,** and is it a **rescue** of an existing quarterly goal or **net new**?
d. **Who is the audience:** new contacts we do not have yet, or existing contacts we want to move? Which persona, if they know.
e. **When does this go stale?** A hard date (event deadline, news cycle, release window) or "unknown".
f. **Discretionary budget** available for it, or "unknown".
g. **Owner and approver.** Who owns it (default: the person who raised it) and who approves the messages (the approval starts the 48 to 72 hour clock).
h. **Where is the newsfeed folder?** On first run for a runner, ask for the Google Drive folder (or doc) where Alex Salkever's newsletters are archived. Record the folder ID in slide notes so the next run can reuse it; if the runner has none, accept pasted text or an uploaded file, or skip and note the gap.

Do not ask more than these. Everything else is drafted from data and turned into ED INPUT or CFT INPUT questions in the workbook.

### Step 2 — Pull the data (research before building)

Follow `references/data-pull-guide.md` for each source: where it lives, which connector or skill reads it, what to extract, and what to do when it is missing. Never fabricate. Every pre-filled figure or claim traces to a named source in slide notes.

**a. Core documents** (Brand Kit, Message Foundation, ICP & Target Markets): search Google Drive by `[Project] Brand Kit`, `[Project] Message Foundation`, `[Project] ICP` / `Target Markets`; also check the working folder. Extract: messaging pillars, positioning, stance and objection handling, Stat Bank, CTA library, boilerplate, voice; personas with pains and buying criteria, fit/warmth definitions, hand-raiser actions, target markets. If a document is missing, say so on the Hot Campaign Card, recommend the foundation agent that produces it, and proceed with questions.

**b. Current plan and campaigns:** the quarterly marketing plan deck (`qtrly-plan-agent` output, `[Project] Q[N] Marketing Plan`) and the Quarterly Campaign Brief (`qtrly-campaign-plan-agent` output). Extract: goals with KPIs and targets, campaigns and their sources in use, budget lines including the discretionary reserve, named campaign leaders, and any shared LF resources already booked.

**c. Results:** the most recent Marketing Impact Report for the project (`run-marketing-impact-report` output) or, if none is recent, offer to run that skill; otherwise pull the goal KPIs from LFX standard metrics. Compute pace for each goal (actual vs. target × fraction of quarter elapsed) and mark ahead / on pace / behind. This is the evidence for a rescue trigger and the "what we do not touch" list for every other trigger.

**d. NewsFeed:** read the last 30 days of newsletter issues from the Drive folder the runner named (Step 1h). Extract items relevant to the project's domain, keywords, competitors, and personas; date each item; note the newsletter's own take. In flag mode, look for the runner's trigger and adjacent items; in scan mode, this is the primary candidate source.

**e. Content Plan:** Asana (search projects named "Content Plan", "Editorial Calendar", or the project's content project; read open tasks with due dates, owners, content type, topic) or a Google Sheet by the same names. Extract everything scheduled in the next 6 to 8 weeks plus recently published assets. Flag items that can be **pulled forward**, **repurposed**, or **re-angled** for the trigger, and note the owner. If neither exists, list the gap and ask the CFT what is in flight.

**f. Social listening:** the most recent Social Listening Report for the project, or a direct read through the LFX Lens / Octolens tools (`volume_over_time`, `workspace_signals`, `mentions_summary`, `search_mentions` for the trigger keywords and the project's keywords). Extract: spikes and their cause, sentiment split, voices with real reach who have spoken about the trigger or the project, competitor or adjacent-project comparisons, and questions people are asking. Note whether new listening keywords would be needed (keyword slots are plan-limited; the request goes in the workbook).

**g. HubSpot (optional, when authorized):** estimated size of the target segment (`query_crm_data` / `manage_segment` read), recent intent signals (`search_intent_signals`), and attribution of related past campaigns. Label list sizes as estimates.

**h. Web verification:** two or three searches to verify the trigger (what happened, when, who said it, the primary source) and to see what competitors or adjacent projects have already said. Date everything. Mark web-sourced figures as drafts to verify.

### Step 2b — Scan mode (agent-identified opportunities)

When the runner has no trigger in mind, build an **Opportunity Radar** before the interview continues:

1. Collect candidates from the newsfeed (d), social listening spikes and reach voices (f), goals behind pace (c), content that is about to publish or just landed (e), and, when available, HubSpot intent signals (g).
2. Score each candidate with the rubric in `references/trigger-taxonomy.md` (outcome pull, ICP relevance, right to speak, time window, 72-hour feasibility, risk). Assign an archetype and a decay date.
3. Present the top 5 to 7 in the conversation as a ranked table with one line of evidence each and ask the runner to pick one (or say none). Candidates not picked are listed on the workbook's Parked Opportunities slide so they are not lost.
4. Continue the Step 1 interview for the chosen candidate, then build the workbook. One workbook per hot campaign; if the runner picks two, build two.

### Step 3 — Generate the workbook (.pptx)

Read the pptx skill (SKILL.md) before building, and run `lf-output-formatter` when installed so the deck lands on the LF 2025 Slides template re-skinned with the project's Brand Kit. Build one deck named:

`[Project] Hot Campaign Workbook — [Trigger short name] — DRAFT v1.pptx`

Follow `references/workbook-template.md` slide by slide. Conventions:

- **Draft everything.** Write a best-guess draft for every section from the pulled data so the ED and CFT edit rather than write. Badge every drafted slide `DRAFT — CONFIRM OR CORRECT`.
- **Two question audiences.** Questions are marked `ED INPUT` (decision-level: is this the moment, which goal owns it, budget cap, what we must not say, go/no-go) or `CFT INPUT` (execution-level: list exists, what can be ready in 72 hours, which sources we own, who builds). Lettered questions, empty answer boxes, answerable in a sentence or two.
- **The Hot Campaign Card comes first.** Slide 3 is the whole campaign on one page; an ED who reads nothing else can still decide. Every later section is evidence and detail behind one row of the card.
- **Unknowns become questions,** never invented facts. Cite sources on data slides (LFX, Marketing Impact Report date, plan deck name, newsletter issue date, Content Plan item, social listening query, web source).
- **Slide notes carry provenance** for every pre-filled figure and claim, plus the newsfeed folder ID and the query terms used, so the next run and the plan agent can reproduce them.
- **The plan is not touched.** State on the Fit slide which planned campaigns continue unchanged. A hot campaign adds; it does not silently replace.
- **Keep it short.** 14 to 18 slides plus appendix. The ED should finish in 15 to 20 minutes and return it within 24 hours.
- **End with the handoff block.** The last appendix slide (and its notes) carry the structured summary defined in `references/handoff-contract.md`, so `hot-campaign-plan-agent` can read the approved workbook without re-deriving it.

### Step 4 — Deliver

Save the .pptx to the outputs folder and present it. In a few sentences: the trigger and archetype, the decision the workbook asks for and by when, what was pre-filled from which sources, what became questions, and any core document or connector that was missing. Then the next steps: (1) send the workbook to the ED (and the CFT leads named on the Owner slide) with the 24-hour return date, (2) messages approved starts the 48 to 72 hour clock, (3) feed the completed workbook to `hot-campaign-plan-agent`, which produces the Segmentation List and the Hot Campaign Plan and hands off to content creation and source execution, (4) the campaign is pushed to the Hot Campaigns dashboard, pulsed daily, and closed with a close-out report whose learnings go into next quarter's plan workbook.

Offer, once, to schedule a recurring scan (weekly, for the project) if the runner found scan mode useful.

## Guardrails

- Never fabricate metrics, quotes, or news. Verify the trigger against a primary source and date it; if it cannot be verified, say so on the Trigger slide and make verification the first CFT action.
- Draft ≠ invented: every draft traces to a source or is phrased as a proposal ("proposed KPI: …", "proposed segment: …").
- Propose only sources the project or LF actually owns or has budget for. A source with no property behind it is a setup task, not a channel, and will not be live in 72 hours.
- The discretionary budget ask must sit within the reserve shown in the plan; if the reserve is unknown, the ask is a question, not a number.
- Flag every use of a shared LF resource (LF newsletter, linuxfoundation.org banners, LF social accounts, LF paid budget, email lists) as a conflict to coordinate.
- Competitor and news triggers get a stance section: what we say, what we do not say, and who approves. Never draft claims about a competitor that the Message Foundation's stance and objection sections do not support.
- Do not email, post, or share the workbook or any draft message with anyone; deliver the file to the runner.
- One workbook per hot campaign. Scan mode presents at most 7 candidates.
- Keep the slide skeleton identical across projects and triggers so hot campaigns are comparable in the QBR; vary content, not structure.
- Write all prose in plain style: short sentences, everyday words, no filler.
