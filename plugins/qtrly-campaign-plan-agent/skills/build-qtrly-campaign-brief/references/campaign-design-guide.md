# Campaign Design Guide — turning goals into a campaign set

Source: "Project Leads Define Goals, CFT Defines Campaigns", "Basic Campaign Types", "CFT Leads Define Campaigns", "Campaign Definition", "Hand Raiser Definition", "Buying Criteria Definition", "Campaign Alignment with Asana", and customer-journey definition slides of the LFX Marketing OS deck.

## What a campaign is

> A campaign is a coordinated set of activities organised around a single goal, budget, timeline, and ICP. It is the standard unit of execution.

ED/PL goals are longer-term outcomes with a KPI, budget, timeline, and risks. Campaigns are the CFT's shorter, measurable actions that deliver them. The relationship can be **1:1** (one campaign per goal), **many:1** (several campaigns share one goal, e.g., an awareness campaign plus a nurture campaign for the same event), or **1:many** (one campaign serves two goals, e.g., a flagship-event campaign that drives both attendance and sponsorship). Say which relationship applies for each campaign and show the coverage matrix so nothing is orphaned: every goal has at least one campaign, and every campaign names its goal(s).

## Required fields for every campaign (the Campaign Definition standard)

This table is the canonical field set. It matches the fields the Campaign Performance dashboard and the Asana campaign template expect. The "Lands in brief" column says where each field appears in the document (`brief-template.md`), so the definition table in §4.n.1 carries the header fields and the audience, message, and channel fields appear in their own subsections rather than being repeated.

| Field | Notes | Lands in brief |
|---|---|---|
| Campaign ID | `C1`, `C2`… in priority order; reused in UTMs and HubSpot campaign names | §4.n.1 |
| Main campaign name | Outcome-shaped, plain language ("Fill the Q4 Summit", not "Q4 social push") | §4.n.1 |
| Org / project | The project or foundation | cover |
| Business outcome | The **primary** outcome, one of: Event Attendance, Event Sponsorship, Education, Membership, Awareness (Audience), Adoption. A 1:many campaign names its secondary outcome(s) through its supported goals | §4.n.1 |
| Supported goal(s) and relationship | Goal rank/name from the quarterly plan; 1:1, many:1, or 1:many | §4.n.1 |
| Campaign type / stage | From the campaign-type matrix below (General Awareness, Targeted Awareness, Nurture, Accepted) | §4.n.1 |
| Leader | One named person (the CFT lead accountable for the campaign) — role placeholder if the name is not yet known | §4.n.1 |
| Involved teams / playbooks | Events, Education/Training, Membership Sales, MarComs & PR, LF Media, Creative & Web, LFX Marketing Ops, project community team | §4.n.1 |
| RACI | Responsible / Accountable / Consulted / Informed, by team or person | §4.n.1 |
| Summary definition | Two or three sentences: who we reach, what we ask them to do, why they will | §4.n.1 |
| Campaign KPI | A number that rolls up to the goal KPI, with the data source that measures it | §4.n.1 |
| Budget | $ and % of the goal's budget; campaign budgets under a goal must not exceed the goal's allocation | §4.n.1 |
| Start / stop dates | Within the quarter; milestone dates for message sequences | §4.n.1 |
| Alerts / thresholds | Pace and performance thresholds that trigger a review (e.g., "< 40% of registration target at week 6") and the action taken | §4.n.1, §4.n.6 |
| Risks | 2–3 with mitigations, inherited or refined from the goal | §4.n.1 |
| Dependencies | Other campaigns, events, releases, or setup tasks this depends on | §4.n.1 |
| Market segment(s) | From the ICP document's market segment overview | §4.n.2 |
| ICP(s) and personas | From the ICP document — reuse, do not invent | §4.n.2 |
| Contact list(s) | Named segments/lists (HubSpot, Segment) or "to be built" with the list-building owner | §4.n.2 |
| Buying criteria | The 2–3 unlocking conditions per persona (see below) | §4.n.2 |
| Message(s) | The key messages, mapped to Message Foundation pillars and proof points | §4.n.3 |
| Lead source(s) | The mediums and sources (see `mediums-and-sources.md`) | §4.n.4 |
| Content | The assets to be created, per source | §4.n.4, §5 |

## The campaign-type matrix (Basic Campaign Types)

Choose the campaign's stage by asking which contacts it reaches. Reading down a business-outcome column gives the standard campaign pattern for that outcome; most goals need two adjacent stages (for example, Targeted Awareness plus Nurture for an event). The matrix has five columns because the two community outcomes, Awareness and Adoption, share the "Audience" column — an Adoption campaign uses the Audience pattern with adoption-shaped CTAs (try it, contribute, deploy).

Campaign stages map onto the customer journey like this: General and Targeted Awareness move contacts to **Aware**; Nurture moves them to **Engaged** and then **Sales Ready**; Accepted is the closed-won contact (registrant, member, sponsor, student) being moved to **Advocate**.

| Stage → who it reaches | Audience (Awareness / Adoption) | Membership | Event Attendance | Event Sponsorship | Education |
|---|---|---|---|---|---|
| **General Awareness** — not an existing contact | News; ads on the industry value of the project/foundation | N/A (membership is not sold cold) | Persona ads on the event's industry value | Corporate ads on the event's industry value | Persona-based, org vs. individual value of education |
| **Targeted Awareness** — existing contacts | News; cross-promotion (value of X to those who know Y) | Targeted list, persona-based, showing member value per membership level | Ecosystem buyers and sellers; enterprise buyers; members vs. targets; awareness of the upcoming event | Targeted sponsor list; members vs. prospects | Persona-based, org vs. individual value |
| **Nurture** — engaged contacts | News, surveys, newsletter(s) | Contact outreach on decision points (the "jolt" effect); tech influencers and economic buyers | Targeted-list nurturing | Persona outreach on decision points; influencer vs. buyer | Persona-based, org vs. individual value |
| **Accepted** — closed-won (registrant, member, sponsor, student) | News; adoption | Member success; surveys; renewals | Reminders: ambassador, speaker, sponsor promotions; post-event surveys | Sponsor success; surveys; renewals | Student success; surveys; renewals |

Notes:
- Awareness "drives potential across all": even when the plan deemphasizes awareness, an Audience campaign at maintenance level keeps the top of the funnel for the revenue outcomes fed.
- The Accepted stage is where the flywheel lives: registrants promoting their attendance, speakers and sponsors amplifying, members renewing. Do not skip it — it is the cheapest reach a campaign has.

## Customer journey and scoring — how CTAs advance contacts

Contacts move **Aware → Engaged → Sales Ready → Advocate**. Each contact carries a **Fit score** (how closely they match the ICP) and a **Warmth score** (recent engagement). The [Warmth, Fit] matrix yields **Hot** (immediate conversion or Sales), **Warm** (active nurture), **Viable** (in program). Every CTA in the brief should state which stage it moves a contact to and whether it counts as a hand-raiser.

**Hand-raiser CTAs** override scoring and mark a contact Sales Ready immediately. Use them deliberately at the Nurture stage:

| Outcome | Hand-raiser actions |
|---|---|
| Membership | Submits membership application; selects "Talk to Sales"; downloads the benefits guide a second time; nominates their org for a case study |
| Education | Begins checkout without completing; requests bulk enrollment; completes a free course and views the paid path |
| Event Attendance | Registers for a paid tier; adds the event to calendar after 3+ page visits; requests a group discount code |
| Event Sponsorship | Submits a sponsorship inquiry; downloads the sponsor prospectus; clicks "Contact Sales" on the sponsor-tier page |

Stage-appropriate CTA ladder (use as a default, adapt to the offer):
- Aware → Engaged: Read, Watch, Follow, Subscribe, Join Slack, Star the repo
- Engaged → Sales Ready: Register, Enroll, Download the prospectus/benefits guide, Request a discount code, Talk to Sales, Apply
- Accepted (closed-won) → Advocate: Share your session/badge, Refer a colleague, Take the survey, Renew, Nominate a case study

## Buying criteria — what the messages must unlock

Features and benefits are what buyers appreciate; **buying criteria** are the 2–3 unlocking conditions that cause the final decision. Campaign messages must address the buying criteria for the outcome, not just list benefits. Examples from the LF definitions:

| Outcome | Example buying criterion |
|---|---|
| Membership | Peer validation — "our direct competitors are members" |
| Event Attendance | Networking density — "this is the one conference for this community" |
| Event Sponsorship | Pipeline access — "our SDRs meet 50 prospects in 3 days, not 6 months" |
| Education | Employability signal — the certification is a recognized credential |

For each campaign, write the buying criteria for its personas (pull from the ICP document's persona "Statements to share with the boss" and pain points; if absent, draft and label as an inferred draft to confirm with the PL). Then check that at least one key message per persona speaks directly to a buying criterion. This is the "jolt effect" check: nurture messages land on decision points, not on generic value.

## Motivation-by-group pattern (from the Hot Campaign: Event Attendance example)

For campaigns that rely on existing participants to amplify, list each group, its motivation, and the content that serves it:

| Group / persona | Motivation to act or share | Content to give them |
|---|---|---|
| Speakers | Career value and social presence from being selected | Social cards with photo and session time |
| Ambassadors | Standing as an industry thought leader | Schedule listings that are easy to share; special-insight posts |
| Registrants | Networking; making it easy to say what they will focus on | Session schedule to share |
| Sponsors (exec, sales, marketing attendees) | Telling customers and prospects they will be there | Social cards with level, booth location, editable special events |
| Ecosystem vendors | Fear of missing out when competitors sponsor; education and networking beyond sponsoring | Sponsor prospectus, competitor-presence proof |
| Enterprise decision makers | Finding solutions via sessions, network, and vendors | Key tracks, case studies, industry-issue content |
| Internal teams (marketing committee, staff) | Coordinated amplification | Staff kit |

Reuse this pattern for education (instructors, alumni, certified engineers), membership (current member champions, board members), and adoption (maintainers, contributors, adopter companies).

## Proposing the campaign set — heuristics

1. Start from the plan's ranked goals and "increase focus" outcomes. Top-ranked goals get the most campaign coverage and budget.
2. For each goal, read down its outcome column in the matrix and propose the stage(s) the quarter needs. Ask: do we have the contacts already (Targeted/Nurture) or not (General Awareness)? Is there an installed base to activate (Accepted)?
3. Look for 1:many opportunities — a flagship event usually serves attendance and sponsorship; a major release serves adoption and awareness. Merge rather than duplicate.
4. Keep the set small enough to fund and staff: 3–8 campaigns is typical for 3–5 goals. Each campaign needs a real leader with time this quarter.
5. Preserve the plan's numbers: campaign KPIs roll up to the goal KPI; campaign budgets under a goal sum to at most the goal budget (leave headroom for the discretionary reserve, which the plan already set aside for HOT campaigns).
6. Never redefine a goal. If the campaign set cannot plausibly hit a goal KPI within budget, say so in the brief's Open Items and route the question back to the ED/PL — the goal is theirs to change.
