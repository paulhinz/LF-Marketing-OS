# [Project] Q[N] [Year] Campaign Brief — required document structure

Build with the `docx` skill. US Letter, portrait; landscape section breaks are acceptable for the wide per-source tables. Match the Brand Kit palette and type when one exists; otherwise a clean LF-neutral heading system. Tables for anything tabular. Number sections as below so downstream agents and Asana tasks can cite "Brief §4.2.4, source: Email: Invite". Render to PDF and check every page before sharing.

Two readers use this document, and every campaign section must serve both without cross-referencing other files:
- **Content creators** (and content-creation agents) — need, per asset: audience, key messages, CTA, spec, brand pointer, due date.
- **Source execution leads** (and source-execution agents) — need, per source: list/segment, tool, schedule, tracking, approvals, thresholds.

## Cover

Title: "[Project] — Q[N] [Year] Campaign Brief". Subtitle: "Quarterly campaign set supporting the Q[N] marketing plan goals — for content creators and source execution leads." Details table: Project · Quarter · Source plan (file name / link, plan status) · Foundation documents used (Brand Kit, Message Foundation, ICP & Target Markets, Pitch Deck — with "not available" where missing) · CFT / campaign leaders · Prepared by ("LFX Marketing OS — Quarterly Campaign Plan Agent") · Date · Status ("Draft v1 — pending CFT review and ED/PL approval") · Next quarterly review date.

## How to use this document

One page. Explain the chain Goals → Campaigns → Mediums → Sources, and that the ED/PL set the goals (in the plan) while the CFT owns the campaigns (in this brief). Tell each reader where to look: creators go to §5 (Asset Production List) and the per-source tables in §4; execution leads go to §6 (Execution Setup List) and the Message Sequence tables; whoever runs agents goes to §7. State the naming convention used throughout: campaign IDs `C1…Cn`, source names from the channel map, UTM pattern, HubSpot campaign names.

## 1. Goals this quarter (from the plan)

Table: Rank · Goal · Business outcome · Direction (increase/hold/deemphasize) · KPI target and baseline · Goal budget · Timeline milestones · Top risks. One line under the table: total budget, discretionary reserve (held for HOT campaigns, not allocated here), plan status and approval date. Anything the plan lacked and the user supplied is marked "(manual)".

## 2. Campaign portfolio summary

Table, one row per campaign, in priority order: ID · Campaign name · Supported goal(s) · Business outcome · Campaign type/stage · Leader · Involved teams · Campaign KPI · Budget ($ and % of goal) · Start–stop dates · Mediums used.

Under the table, a three-sentence narrative of the quarter's campaign logic (which goals get the most coverage and why; where the 1:many campaigns are; what is deliberately not being done).

## 3. Coverage and budget roll-up

3.1 **Goal coverage matrix** — rows: goals; columns: campaigns; cell: the campaign KPI's contribution to the goal KPI (e.g., "1,200 of 3,500 registrations"). Every goal row has at least one entry; every campaign column has at least one. Add a "Sum vs. goal KPI" column and flag shortfalls.

3.2 **Budget roll-up** — per goal: goal budget · sum of campaign budgets · headroom. Totals row. Campaign sums never exceed the goal budget.

3.3 **Campaign × medium matrix** — rows: campaigns; columns: Social, Direct Message, Email, Web, Paid; cell: the sources used. This is the CFT's one-glance view of channel load, and the input to the shared-resource check in §8.

## 4. Campaign detail — one section per campaign

Use the same sub-structure for every campaign so readers can navigate by number.

### 4.n Campaign C[n]: [Name]

**4.n.1 Definition** — table with the header fields of the Campaign Definition field set (canonical list with "Lands in brief" column in `campaign-design-guide.md`): ID · Name · Primary business outcome · Supported goal(s) and relationship (1:1 / many:1 / 1:many) · Campaign type/stage · Leader (named person or role placeholder) · Involved teams/playbooks · RACI · Summary definition (who we reach, what we ask, why they will) · Campaign KPI with measurement source · Budget ($, % of goal) · Start/stop and milestone dates · Alerts/thresholds (pace and performance triggers, who is alerted) · Risks with mitigations · Dependencies. The audience, message, and channel fields of the set follow in 4.n.2–4.n.4.

**4.n.2 Audience** — table: Target market segment(s) (from ICP §1) · ICP(s) (from ICP §2) · Personas in scope (from ICP §3) · Contact lists/segments (named list or "to build — owner, criteria, source system") · Estimated reach per list · Buying criteria per persona (the 2–3 unlocking conditions) · Motivation-by-group table when the campaign relies on participants amplifying (speakers, ambassadors, sponsors, members, students, maintainers) · Hand-raiser actions for this campaign (from the outcome's hand-raiser list) · Disqualifiers/exclusions.

**4.n.3 Core messages** — the campaign narrative in two or three sentences in the project's voice, then a table: Persona · Key message (one sentence a creator can build from) · Message Foundation pillar · Proof point · Buying criterion it addresses · Journey stage it targets. Add the boilerplate reference (which word-count version to use where) and voice/tone notes from the Brand Kit. Do not restate positioning — cite the document and section.

**4.n.4 Medium and source plan** — first a one-line list of the mediums used. Then **one table per source**, headed "Medium: [medium] — Source: [source]", with exactly these rows:

| Row | Content |
|---|---|
| Target market | segment(s) this source reaches |
| ICP / persona | which personas, and why this source (cite ICP "preferred channel"/"trusted sources") |
| Journey stage | Aware / Engaged / Sales Ready / Advocate the source moves contacts toward |
| Key messages | 1–3 messages from §4.n.3 adapted to the source's form (e.g., hook line for social, subject-line direction for email) |
| Assets to be created | each asset with spec: type, count/variants, length or size, format, brand pointer, reuse vs. new, due date |
| CTAs | label text · destination (LP/URL with UTM) · conversion event recorded · hand-raiser? (yes/no) · stage advanced |
| Tactics and cadence | what happens when: post counts per week, send dates, run dates, sequence membership |
| Execution owner and tool | named owner/team · tool (Sprout, HubSpot, Google Ads, LinkedIn Campaign Manager, Cvent, site CMS) · approver |
| Tracking | UTM values · HubSpot campaign · list/segment IDs · dashboard where results appear |
| Creation agent(s) | exact skill/agent name, or "Agent TBD — manual: owner" |
| Execution agent | exact skill/agent name or connector action, or "Agent TBD — manual: owner/tool" |
| Budget (if paid) | $ · dates · audience · ROAS/cost-per-result floor that pauses spend |
| Notes / shared-resource flag | conflicts with LF-wide properties or other projects; dependencies |

**4.n.5 Message sequence** (include whenever the campaign sends more than one message in any source, or coordinates messages across sources) — table: Seq # · Date or trigger (e.g., "T-42 days", "on registration", "48h before early-bird ends") · Medium: Source · Audience/segment · Message theme (one line) · Asset used · CTA · Owner · Status. Group the whole campaign's messages here, across all sources, in chronological order; the per-source tables refer to sequence numbers rather than repeating dates. Note where creation agents should draft the sequence as one job (e.g., "invite + 2 reminders drafted together for consistent thread").

**4.n.6 Measurement and alerts** — table: Campaign KPI · Leading indicators per source (weekly) · Threshold and action (e.g., "registrations < 40% of target at week 6 → alert leader and ED; shift budget between this goal's campaigns, or ask ED/PL to trigger a HOT campaign from the discretionary reserve") · Dashboard/report (Campaign Performance dashboard filter: Campaign Type × Channel Type; `social-listening-report` echo report for launch dates) · Review dates.

## 5. Asset production list (consolidated)

Table across all campaigns, grouped by creation agent: Asset · Campaign / source (§ reference) · Spec summary · Creation agent or manual owner · Inputs to hand over (persona, key message, CTA/UTM, brand pointer, source material) · Reuse vs. new · Reviewer/approver · Due date. This table is what becomes the content team's Asana tasks.

## 6. Execution setup list (consolidated)

Table across all campaigns, in dependency order: Setup item (list/segment build, landing page, CTA, HubSpot campaign, Sprout queue, paid campaign, banner booking, keyword tracking) · Campaign / source · Execution agent, connector action, or manual owner/tool · Inputs required · Depends on · Approver · Date live. This table is what becomes the execution team's Asana tasks.

## 7. Agent run plan

Ordered table of every agent run the brief calls for: Step · Agent/skill (exact name, or "TBD — manual") · Purpose · Campaign / source · Inputs (point to § numbers and documents) · Output expected · Owner who runs it · When. Order by dependency: segments and lists → landing pages and CTAs → long-form content → social and email copy → paid creative → scheduling and execution → listening and monitoring. Close with the list of agents this quarter's campaigns need that do not yet exist, so the Marketing OS team can prioritize them.

## 8. Shared resources, calendar, and conflicts

8.1 **Campaign calendar** — a week-by-week (or dated) view of the quarter: campaign run windows, message-sequence sends, event/CFP/early-bird/release dates, holidays. Show overlaps.

8.2 **Shared-resource check** — table: Resource (LF newsletter slot, linuxfoundation.org banner, LF social accounts, shared HubSpot lists, paid budget, Creative & Web capacity, event calendar) · Campaign(s) using it · Dates · Conflict risk · Coordination owner. Full-conflict resources need an explicit booking.

## 9. Open items, approvals, and sources

9.1 **Open items and decisions needed** — including any goal the campaign set cannot plausibly reach (routed back to ED/PL), missing foundation documents, unnamed leaders, sources that need to be set up before they can be used.

9.2 **Approvals** — CFT review date · campaign leaders' sign-off · ED/PL approval · budget owner sign-off for paid.

9.3 **Sources and assumptions** — every number and name: `LFX`, `document (name, section)`, `HubSpot`, `(manual — who)`, or `inferred draft — confirm`. Include the plan file name/version and the foundation documents' versions.

## Appendix (optional)

Channel map (mediums and sources) as used; UTM and naming conventions; glossary (ICP, persona, segment, Fit/Warmth, hand-raiser, buying criteria, SRC) for readers new to the LFX Marketing OS definitions.
