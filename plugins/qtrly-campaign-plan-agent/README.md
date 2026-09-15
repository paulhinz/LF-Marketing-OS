# Qtrly Campaign Plan Agent

LFX Marketing OS **Quarterly Campaign Plan Agent** — turns a project's quarterly marketing plan into the set of campaigns that will deliver its goals, written up as one Quarterly Campaign Brief for the people and agents who create the content and run the channels.

## Where it fits

```
Qtrly Plan Agent  →  Quarterly Marketing Plan (goals)
                          ↓
Qtrly Campaign Plan Agent (this)  →  Quarterly Campaign Brief (campaigns → mediums → sources)
                          ↓                                   ↓
        Content creation agents → campaign assets     Source execution agents → tactics scheduled
```

The ED/Project Leader sets goals in the plan. The cross-functional team (CFT) defines campaigns in this brief. Downstream agents (social posts, blogs/case studies, newsletters, landing pages, email, paid setup, social listening) work from the brief's per-source strategy.

## What it does

Six phases (0–5), suggesting from the inputs and confirming each with you (or running straight through in draft mode):

0. **Inputs** — the quarterly plan deck (.pptx or Google Slides), the four foundation documents (Brand Kit, Message Foundation, ICP & Target Markets, Pitch Deck), CFT roster, channel inventory, calendar constraints
1. **Goal digest** — extracts and confirms every goal's KPI, budget, timeline, risks, and direction
2. **Campaign set** — proposes campaigns per goal (1:1, many:1, or 1:many) using the business-outcome × journey-stage matrix; each with a leader, teams, RACI, KPI, budget, dates, thresholds, risks, audience, and buying criteria
3. **Medium and source plan** — for each campaign, the mediums (Social, Direct Message, Email, Web, Paid) and specific sources; for each source the target market, ICP/personas, key messages, assets to create, CTAs, tactics and cadence, owner and tool, tracking, and the creation and execution agents to run; multi-message campaigns get one grouped message sequence
4. **Document** — builds the Word brief following the brief template
5. **Self-review and deliver** — scores against the quality rubric, revises, and delivers with a scorecard

## How to run

Say: **"Build the quarterly campaign brief for [project]"** or **"Run the campaign plan agent on the Q[N] plan"**. Add "just draft it" to skip the confirmations.

## Requirements

- **Quarterly marketing plan** (required) — output of `qtrly-plan-agent`; without it the agent offers to run that agent first or take goals from you directly.
- **Foundation documents** (strongly recommended) — Brand Kit, Message Foundation, ICP & Target Markets, Pitch Deck. Missing ones are flagged and the relevant foundation agent is recommended.
- **Google Drive connector** (optional) — reads the plan and foundation docs from Drive; uploads the brief.
- **LFX / HubSpot connectors** (optional) — channel reach numbers and list sizes.

## Output

`[Project] Q[N] [Year] Campaign Brief.docx` in your working folder: goals; campaign portfolio; goal coverage and budget roll-up; one section per campaign (definition, audience, core messages, one table per source, message sequence, measurement); consolidated asset production list; execution setup list; dependency-ordered agent run plan; calendar and shared-resource check; open items and sources. Rows in the asset and execution lists map directly to Asana tasks (Biz outcome → Goal → Campaign → Channels & Execution).

## Boundaries

Strategy only. It does not set or change goals, write content, schedule or send anything, or write to HubSpot, Sprout, Google Ads, LFX, or Asana.
