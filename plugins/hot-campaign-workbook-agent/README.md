# Hot Campaign Workbook Agent

LFX Marketing OS **Planning** agent (Plan-type in the References | Plan | Create | Execute | Monitor landscape). It is the **IDENTIFY** stage of the Hot Campaigns workflow in the 2026 LFX Marketing OS strategy: IDENTIFY → PLAN → EXECUTE → MONITOR.

A hot campaign is an unplanned campaign the ED or marketing leader raises because a quarterly goal is off track and adjusting the existing tactics is not enough, because industry news gives the project a reason to speak now, or because of an opportunity: a release, a viral post, a creator mention, a competitor's move. It runs alongside the quarterly plan without changing it, is funded from the discretionary reserve, must be live within 48 to 72 hours of message approval, and closes at its end date or when its KPI is met.

This agent produces the **Hot Campaign Workbook** (.pptx, Google Slides-ready): a draft hot campaign plan with the set questions the ED and the cross-functional team (CFT) must answer before anything is built. The completed workbook is the input to `hot-campaign-plan-agent`, which produces the Segmentation List and the Hot Campaign Plan.

## What it does

1. **Interviews the runner** (the ED or marketing leader) with eight questions: project, trigger or scan, business outcome and rescue vs. net new, audience, decay date, discretionary budget, owner and approver, and the newsfeed folder.
2. **Pulls the inputs**, time-boxed to about 15 minutes: the Brand Kit, Message Foundation, and ICP & Target Markets; the current quarterly plan deck and campaign brief; the latest Marketing Impact Report (or LFX metrics) to compute goal pace; the last 30 days of Alex Salkever's newsletters from a Google Drive folder; the Content Plan in Asana or a spreadsheet; the Social Listening Report or a direct LFX Lens / Octolens read; HubSpot segment estimates and intent signals when authorized; and web verification of the trigger.
3. **Scan mode.** When the runner has no trigger in mind, it builds an Opportunity Radar: candidates from the newsfeed, listening spikes, goals behind pace, and content about to land, each scored on outcome pull, ICP relevance, right to speak, time window, 72-hour feasibility, and risk, with an archetype and a decay date. The runner picks one; the rest are parked in the workbook.
4. **Builds the workbook**, 14 to 18 slides: a one-page Hot Campaign Card first, then the Trigger, Fit with the Quarterly Plan, Target and Intent, Message and Stance (with FAQ), Assets and the Content Plan, Lead Sources and Tactics (one UTM per source), KPI/Budget/Clock, Risks and Guardrails, Decision and Owner (with the ED satisfaction check), Next Steps, and an appendix with parked opportunities, provenance, and a structured handoff block for the plan agent.
5. **Marks every draft.** `DRAFT — CONFIRM OR CORRECT` badges, slide notes with provenance for every figure, and questions split into `ED INPUT` (decision level) and `CFT INPUT` (execution level). Unknowns become questions, never invented facts.

## Usage

Say one of:

- `create a hot campaign workbook for [project]`
- `[competitor / news / release] just happened, should [project] respond?`
- `our [goal or campaign] is off track, what can we add?`
- `scan for hot campaign opportunities for [project]`

## Requirements

- Google Drive connector (core documents, plan deck, campaign brief, Marketing Impact Report, newsfeed folder, Content Plan sheet)
- LFX connector (project record, metrics, LFX Lens social listening)
- Optional: Asana connector (Content Plan), Octolens connector (social listening), HubSpot connector (segment estimates, intent signals), web search (trigger verification)
- Sibling skills used when installed: `run-marketing-impact-report`, `social-listening-report`, `lfx-data-querying`, `lf-output-formatter`, `plain-writing`

Missing connectors and documents degrade gracefully: each gap becomes a question in the workbook and is listed on the Hot Campaign Card.

## Workflow position

Newsfeed + Social Listening Report + Marketing Impact Report + Content Plan + core documents + ED interview → **Hot Campaign Workbook (this agent)** → ED Go / No-Go / Park within 24 hours → `hot-campaign-plan-agent` (Segmentation List + Hot Campaign Plan) → content creation and source execution agents (assets live within 72 hours, QA gate) → Hot Campaigns dashboard, daily pulse → close-out report → learnings into next quarter's plan workbook.

## Files

- `skills/create-hot-campaign-workbook/SKILL.md` — the agent workflow and guardrails
- `references/trigger-taxonomy.md` — trigger types, archetypes, decay windows, the opportunity scoring rubric
- `references/data-pull-guide.md` — where each input lives, which connector reads it, what to extract, the fallback
- `references/workbook-template.md` — the slide-by-slide outline with the set ED INPUT and CFT INPUT questions
- `references/handoff-contract.md` — the structured block the completed workbook hands to `hot-campaign-plan-agent`
