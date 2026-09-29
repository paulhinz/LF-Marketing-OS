# Trigger Taxonomy, Archetypes, Decay Windows, and the Opportunity Scoring Rubric

Source: "HOT CAMPAIGNS Workflow", "Budgets to Support Planned & Opportunistic Execution", "Who We Target (Market Segmentation and ICP)", "Buying Criteria Definition", and "Hand Raiser Definition" slides of the 2026 LFX Marketing OS strategy deck, plus the Hot Campaign Workbook Agent requirements.

## 1. Trigger types

Every hot campaign names exactly one primary trigger type. The type decides which data the workbook leads with and which archetype fits.

| Trigger type | What it looks like | Primary evidence in the workbook | Typical window before it goes stale |
|---|---|---|---|
| **Off track** | A quarterly goal or planned campaign is behind pace; adjusting tactics inside the existing campaign brief is not enough; the ED wants planned tactics to keep running and something new added | Goal pace table from the Marketing Impact Report or LFX metrics; the campaign brief's current sources | Until the quarter's KPI date; usually 3 to 6 weeks of useful runway |
| **Industry news** | A news story, analyst report, regulation, standards decision, funding round, security incident, or a shift the newsfeed surfaces that touches the project's domain | Newsletter issue and date; primary news source; social listening volume on the topic | News cycle: 3 to 10 days for a story, 2 to 6 weeks for a regulation or report |
| **Own release or asset** | The project ships a release, a research paper, a report, a survey result, a course, or a member/case study lands early | Release notes, Content Plan item, GitHub release, the asset itself | 2 to 6 weeks, longer for research |
| **Ecosystem release** | A partner, member, or adjacent project ships something that uses or depends on the project | Partner announcement; member relationship in LFX; social listening | 1 to 3 weeks |
| **Viral or creator moment** | A post, thread, video, or podcast about the project (or its topic) from an account with real reach is spreading; a creator asks a question or praises or criticizes | Social listening: mention, author followers, velocity, sentiment | 48 to 72 hours for a viral post; 1 to 2 weeks for a creator relationship |
| **Competitor or adjacent-project move** | A competing foundation, vendor, or project announces a product, a pricing change, a membership, a benchmark, a claim, or a partnership that touches the project's positioning | Competitor's primary source; Message Foundation stance and objection sections; social listening comparisons | 1 to 4 weeks |
| **Demand signal** | Hand-raiser spike (membership inquiries, prospectus downloads, checkout starts), unusual traffic to a page, intent signals in HubSpot, inbound press or speaking requests | HubSpot intent signals and CRM counts; web analytics if reachable | 1 to 3 weeks while the signal is warm |

If a trigger fits two types, pick the one whose window is shortest; it sets the clock.

## 2. Hot campaign archetypes

The archetype shapes the target, the message angle, the sources, and the KPI. Name one on the Hot Campaign Card.

| Archetype | Usual trigger | Primary intent | Typical target | Typical sources (must be owned) | Typical KPI |
|---|---|---|---|---|---|
| **Rescue / Boost** | Off track | Either, per the goal | The goal's existing ICP segment, often the Viable and Warm contacts not yet converted | Email: Invite and Reminder to the existing list, Social DM to named accounts, Retargeting, Slack/Discord community channels, a new landing page angle | The goal's own KPI: incremental registrations, contacts, members, enrollments over the pace line |
| **Newsjack / Thought leadership** | Industry news | Create new contacts | Personas who care about the topic; SOM defined by the ICP for that topic | Blog, ED or maintainer LinkedIn post, X/Bluesky thread, newsletter feature, earned PR pitch, Paid Social to the topic audience | New contacts captured with UTM, blog reads, follower growth, share of voice on the topic |
| **Launch amplification** | Own release or asset, ecosystem release | Both; primary is usually new contacts | Current users and adopters plus the persona the asset serves | Release blog, social series, newsletter, Slack/Discord announcements, YouTube, Paid Social, partner cross-post | Downloads or reads, stars or installs if adoption, contacts captured, registrations if tied to an event |
| **Competitive response** | Competitor or adjacent-project move | Nurture existing (protect) with some awareness | Members, maintainers, and Warm contacts who will hear the competitor's claim; analysts and press | ED voice post, FAQ or comparison page, Direct Message to member key contacts, member newsletter, briefing for sales and ambassadors | Sentiment stability, member key-contact engagement, FAQ page reads, zero surprised members |
| **Nurture surge** | Demand signal, off track on a conversion goal, a closing window (early-bird deadline, cohort start) | Nurture existing toward an outcome | Warm and Hot contacts for one outcome; hand-raisers | Email: Reminder sequence, Social DM, Slack/Discord DM, Retargeting, sales handoff | Conversions: registrations, meetings booked, enrollments, renewals; hand-raisers created |
| **Community moment** | Viral or creator moment, award, milestone | Create new contacts and grow the audience | The creator's audience; ambassadors and contributors who will amplify | Reply and amplify from project accounts, ambassador kit, creator outreach, a quick blog or clip, newsletter mention | Reach and engagement, follower growth, new Slack/Discord joins, contacts captured |

## 3. Decay windows and the clock

Two dates go on the Hot Campaign Card:

- **Decay date:** when the trigger stops being worth a campaign. Take it from the runner if they know it (an event deadline, a release window); otherwise use the table in section 1 and say it is an estimate.
- **Live-by date:** message approval date plus 72 hours at most. If the live-by date is after the decay date, the campaign is not feasible as a hot campaign; say so and recommend either a smaller scope (one post, one email) or folding the idea into the next quarterly plan.

The clock in the deck: **brief approved** ends PLAN; **messages approved** starts the 48 to 72 hour EXECUTE clock; assets live within 72 hours; MONITOR runs daily; close at the end date or when the KPI is met, whichever comes first.

## 4. Opportunity scoring rubric

Score each candidate 1 to 5 on six factors. Used in scan mode to rank candidates, and in flag mode to show the runner's trigger against the alternatives found in the data (which is itself useful ED input).

| Factor | 1 | 3 | 5 | Evidence to cite |
|---|---|---|---|---|
| **Outcome pull** | No clear business outcome | Moves an outcome but no quarterly goal owns it | Directly moves a quarterly goal that is behind pace, or a named outcome with a measurable KPI | Plan deck goals; Marketing Impact Report pace |
| **ICP relevance** | Peripheral to our personas | Interests one persona | Hits a persona's stated pain or a buying criterion | ICP & Target Markets personas and buying criteria |
| **Right to speak** | We have no proof or position; would look opportunistic | We have a pillar but thin proof | A messaging pillar, a Stat Bank proof point, and a stance already cover it | Message Foundation pillars, Stat Bank, stance |
| **Time window** | Already stale or window under 48 hours with no assets ready | 1 to 2 weeks | 2 to 6 weeks, or a hard date we can hit | Trigger date; decay table |
| **72-hour feasibility** | Needs new assets, a list we do not have, or a source we do not own | Repurposable assets exist; list needs building | Assets in the Content Plan can be pulled forward; list exists; owned sources ready | Content Plan items; HubSpot list estimates; mediums-and-sources ownership check |
| **Risk (inverted)** | Brand, legal, trademark, or community backlash likely; cannibalizes a planned campaign | Manageable with a stance and a QA gate | Low risk; additive to the plan | Brand Kit; Message Foundation stance; resource-conflict note |

Composite = sum of the six (6 to 30). Present the ranked table with the composite, the archetype, the decay date, and one line of evidence per candidate. Do not present a candidate with Right to speak = 1 or Risk = 1 as a top pick; list it with its reason so the ED sees it was considered.

## 5. Who we target: SOM for a hot campaign

The strategy deck defines TAM (everyone who could benefit), SAM (about 1M contacts LF can reach through owned channels), and SOM (the slice targeted in a campaign, defined by the ICP for that initiative). A hot campaign's target is a **SOM**, and it may differ from the quarterly plan's segments. On the Target slide, define it in one sentence with the persona, the journey stage (ICP unknown, Aware, Engaged), the fit and warmth tier (Viable, Warm, Hot), and the estimated reachable count with its source. For new-contact intents, also say where the contacts will come from (the topic audience on Paid Social, the creator's audience, the newsfeed's readers, earned PR).

Hand-raiser actions to watch during the campaign (from the deck): membership application or "Talk to Sales" click, second download of the benefits guide, case-study nomination, checkout started, bulk enrollment request, paid-tier event registration, group discount request, sponsorship inquiry or prospectus download. Name the two or three that would count as immediate wins for this campaign's outcome.

## 6. Buying criteria over features

Per the deck, campaigns convert when they address the 2 or 3 unlocking conditions, not the full feature list: peer validation for membership ("our competitors are members"), networking density for event attendance, pipeline access for sponsorship, employability signal for training. The Message slide names which buying criterion the hot campaign's message speaks to; if none, the campaign is awareness only and its KPI must say so.
