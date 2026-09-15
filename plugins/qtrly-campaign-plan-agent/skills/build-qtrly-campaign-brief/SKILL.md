---
name: build-qtrly-campaign-brief
description: >
  Use when a Linux Foundation marketing leader, ED, Project Leader, or CFT lead
  says "build the quarterly campaign brief", "run the campaign plan agent",
  "turn the Q[N] plan into campaigns", "define the campaigns for [project]'s
  goals", "which campaigns support our goals", or asks to translate a quarterly
  marketing plan (the qtrly-plan-agent deck) into the campaigns that deliver
  it — or asks what channels, mediums, sources, messages, assets, or CTAs a
  quarter's campaigns need, or which content creation and execution agents to
  run. This is the LFX Marketing OS "Quarterly Campaign Plan Agent": from the
  plan plus the Brand Kit, Message Foundation, ICP & Target Markets, and Pitch
  Deck it produces one Word document, the Quarterly Campaign Brief — every
  campaign with its leader, mediums and sources, and per source the target
  markets, ICP/personas, key messages, assets to create, CTAs, message
  sequences, and the agents to run. Strategy only; no content or execution.
metadata:
  version: "0.1.0"
  author: "Paul Hinz, Linux Foundation"
  department: "Cross-Functional Team / Campaign Planning"
  nine-agent-alignment: "9 - Campaign Design (Plan phase)"
---

# Build Quarterly Campaign Brief

Turn a project's quarterly marketing plan into the campaign set that will deliver it, and write that set up as a single **Quarterly Campaign Brief** that two groups can work from directly: the people (and agents) who create content assets, and the people (and agents) who set up and run the outbound mediums.

Where this sits in the LFX Marketing OS workflow:

```
ED/PL + marketing lead ── Qtrly Plan Agent ──▶ Quarterly Marketing Plan (goals: KPI, budget, timeline, risks)
                                                          │
CFT / marketing lead ── THIS AGENT ──────────▶ Quarterly Campaign Brief (campaigns → mediums → sources)
                                                          │
                              ┌───────────────────────────┴──────────────────────────┐
                    Content creation agents ──▶ Campaign ASSETS      Source execution agents ──▶ TACTICS SCHEDULED
```

The ED/PL decide goals; the CFT decides campaigns. This agent works at the CFT layer: it never changes a goal, and it never produces the content or runs a channel. Its output is the strategy each downstream agent needs — audience, message, asset spec, CTA, timing, tracking, owner — and the list of which agents to run.

Operating principles, inherited from the Quarterly Plan Agent: **suggest, then confirm** at every phase; **no invented figures or personas** — every number, list, pillar, and persona traces to the plan, a foundation document, a connected system, or the user (marked "(manual)"); **the human reviews, the agent assembles**.

Two modes. **Interactive** (default): walk the phases below, confirming each. **Draft mode**: if the user says "just draft it", "non-interactive", or is generating sample data, run all phases without pausing, make the best-grounded choices, label every unconfirmed choice DRAFT, and list them in Open Items. Draft mode does not relax the no-invented-figures rule: a missing baseline, budget, date, or name is written as "(manual — needed)" and listed in §9.1, never estimated.

## Phase 0 — Gather inputs

Read `references/plan-intake-guide.md` for exactly what to extract and where to find it. Ask only for what is not already clear from the request or the working folder.

1. **The quarterly marketing plan** (required) — the `.pptx` from `qtrly-plan-agent`, a Google Slides link, or an equivalent doc. Extract every goal's rank, name, outcome, KPI with baseline, budget, milestones, risks; the outcome direction (increase / hold / deemphasize); total budget and discretionary reserve; plan status; next review date; and the speaker-notes sources. If there is no plan, stop: offer to run the Quarterly Plan Agent first, or take goals from the user directly (marked manual). Do not set goals yourself.
2. **Foundation documents** — Brand Kit, Message Foundation, ICP & Target Markets, Pitch Deck. Search the working folder, attachments, and Google Drive. Read them fully; they supply the personas, pillars, proof points, buying criteria, and voice the brief maps onto sources. When one is missing, say so, continue, label affected sections lower-confidence, and recommend the foundation agent that produces it.
3. **Operational context** — CFT roster (who leads Events, Education, Membership Sales, MarComs & PR, LF Media, Creative & Web, LFX Marketing Ops, community); channel inventory with reach (newsletter subscribers, social followers, Slack members, HubSpot lists, paid accounts, site platform); calendar constraints (event, CFP, early-bird, release dates); prior campaign results; existing reusable assets; target lists (e.g., `member-360` output). Pull reach from the plan's snapshot slide, then LFX/HubSpot connectors when present, then ask. Accept "unknown" without blocking.

## Phase 1 — Goal digest (confirm the starting point)

Present the extracted goals as one table — rank, goal, outcome, direction, KPI and baseline, budget, milestones, top risks — plus total budget, reserve, and plan status. Run the sanity checks in the intake guide (budgets sum; no goal is a disguised campaign; baselines present). Ask: "Is this the plan we are building campaigns against? Anything changed since it was approved?" Missing KPI baselines, budgets, or dates are asked for here, because they bound everything that follows.

## Phase 2 — Design the campaign set

Read `references/campaign-design-guide.md`. For each goal, propose the campaigns that will deliver it, using the campaign-type matrix (business outcome × journey stage: General Awareness, Targeted Awareness, Nurture, Accepted) to decide which stages the quarter needs, and looking for 1:many campaigns (a flagship event serving attendance and sponsorship; a release serving adoption and awareness). Aim for a set the CFT can fund and staff — typically 3–8 campaigns for 3–5 goals.

For every proposed campaign fill the Campaign Definition field set (canonical table in the design guide): ID, name, primary outcome, supported goal(s) and relationship (1:1 / many:1 / 1:many), type/stage, **leader** (a named CFT person; propose from the roster by the campaign's primary team, otherwise a role placeholder flagged in Open Items), involved teams and RACI, summary definition, campaign KPI that rolls up to the goal KPI, budget as $ and % of goal, start/stop and milestones, alerts/thresholds, risks, dependencies, market segments, ICPs and personas, contact lists, and buying criteria. Messages, sources, and content are filled in Phase 3.

Present the campaigns one goal at a time for **accept / edit / replace**, then show the full portfolio with the goal-coverage matrix and the budget roll-up and confirm the set. Checks before moving on: every increase/hold goal has a campaign; campaign KPIs cover the goal KPI or the shortfall is flagged; campaign budgets under a goal do not exceed it; the reserve stays unallocated; each campaign has one leader. If the set cannot plausibly reach a goal, say so and record it for the ED/PL rather than inflating KPIs.

## Phase 3 — Medium and source plan per campaign

Read `references/mediums-and-sources.md` (the channel map) and `references/agent-routing.md`. For each confirmed campaign:

1. **Choose mediums, then sources.** From the five mediums — Social, Direct Message, Email, Web, Paid — pick the sources the project actually has (or can set up early enough), using the catalog's source names verbatim, matched to the campaign's stage: contacts we do not have → Paid Social, Adwords / Google Ads, 3rd-party ads and newsletters, Social, Pages, Blogs; contacts we have → Email: Invite, Newsletter, Social DM, Slack / Discord, Retargeting; converted contacts → Email: Reminder, Newsletter, Slack / Discord. Use the ICP document's persona "preferred channel" and "trusted sources" to assign personas to sources. Flag any source that needs setup and any shared LF property.
2. **Define each source completely.** One table per source with the 13 rows specified in `brief-template.md` §4.n.4: target market; ICP/persona and why this source; journey stage; key messages adapted to the source's form (each traceable to a Message Foundation pillar and proof point, and at least one per persona hitting a buying criterion); assets to be created with spec, reuse-vs-new, and due date; CTAs with label, destination and UTM, conversion event, hand-raiser flag, and stage advanced; tactics and cadence; execution owner, tool, approver; tracking (UTM values, HubSpot campaign, list IDs, dashboard); creation agent; execution agent; paid budget and pause floor where relevant; notes and shared-resource flag. A row a creator or execution lead would have to ask about is not finished.
3. **Group multi-message campaigns.** Whenever a campaign sends more than one message in any source, or coordinates messages across sources (invite → reminder → last chance → post-event; a newsletter run; an ambassador cadence), write one Message Sequence table for the whole campaign — sequence number, date or trigger, medium:source, segment, theme, asset, CTA, owner — in chronological order, and have the per-source tables reference sequence numbers. Creation agents should be pointed at the sequence as one job so the thread stays consistent.
4. **Route to agents.** Name the exact creation agent(s) and execution agent for each source from the routing table, checking the session's installed skills; where none exists write "Agent TBD — manual: owner/tool". Add measurement and alert thresholds per campaign with the action each threshold triggers.

Present each campaign's medium/source plan for confirmation (interactive mode), then confirm the consolidated views: Asset Production List, Execution Setup List, dependency-ordered Agent Run Plan, campaign calendar, and shared-resource check.

## Phase 4 — Build the document

Read `references/brief-template.md` and follow its structure and numbering exactly: cover; how to use; §1 goals; §2 portfolio; §3 coverage and budget roll-up; §4 one section per campaign (definition, audience, core messages, medium and source tables, message sequence, measurement); §5 asset production list; §6 execution setup list; §7 agent run plan; §8 calendar and shared resources; §9 open items, approvals, sources. Build the `.docx` with the `docx` skill, styled from the Brand Kit when available (LF-neutral otherwise), landscape sections for the wide source tables, Message Foundation language for narrative text. Save as `[Project] Q[N] [Year] Campaign Brief.docx` in the user's working folder. Render to PDF and check every page.

## Phase 5 — Self-review and deliver

Score against `references/quality-rubric.md`; revise on failures (max 3 cycles, then deliver the best draft with failing criteria listed at the top of Open Items). Present the file with the scorecard and a short summary: campaigns per goal, budget coverage, the agents to run first, and the open decisions. State that the brief is a draft pending CFT review and ED/PL approval, that §5/§6 rows are ready to become Asana tasks (Biz outcome → Goal → Campaign → Channels & Execution), and that the Agent Run Plan in §7 is the hand-off to the content creation and source execution agents. If a Google Drive connector is available, offer to upload the brief next to the plan deck. Ask for feedback and offer to regenerate with it.

## Boundaries (what this skill does NOT do)

- No goal setting or goal changes — goals belong to the ED/PL via the Quarterly Plan Agent; unreachable goals are reported back, not rewritten
- No content creation — no post copy, emails, blogs, ads, or pages; it writes the brief those agents work from
- No channel execution — no scheduling, sending, publishing, list building, or ad buying; no writes to HubSpot, Sprout, Google Ads, LFX, Asana, or any external system
- No invented personas, pillars, competitors, reach numbers, or results — missing inputs are named, labeled, and routed to the right foundation agent or owner
- No allocation of the discretionary reserve — it stays held for HOT campaigns, which the ED/PL trigger during the quarter (a separate Hot Campaign Agent is planned for those)

## Reference files

- `references/plan-intake-guide.md` — how to read the quarterly plan deck (slide by slide), the four foundation documents (which sections feed which brief sections), and optional live/operational inputs
- `references/campaign-design-guide.md` — campaign definition field set, the business-outcome × journey-stage campaign-type matrix, customer journey and Fit/Warmth scoring, hand-raiser CTAs, buying criteria, motivation-by-group pattern, campaign-set heuristics
- `references/mediums-and-sources.md` — the LFX Marketing OS channel map: five mediums, their sources, typical tactics/assets/CTAs, tools, metrics, and rules for using them
- `references/agent-routing.md` — creation and execution agents by asset type and source, installed vs. TBD, what the brief must hand each one, and run-plan ordering rules
- `references/brief-template.md` — the exact section structure of the Campaign Brief document
- `references/quality-rubric.md` — pass/fail criteria scored before delivery
