# Plan Intake Guide — reading the quarterly plan and the foundation documents

## 1. The quarterly marketing plan (required input)

The primary input is the output of the LFX Marketing OS Quarterly Plan Agent (`qtrly-plan-agent`, skill `build-qtrly-marketing-plan-deck`): a 10–14 slide .pptx named `[Project] Q[N] [Year] Marketing Plan.pptx`, often also uploaded to Google Slides. Accept it as:

- a .pptx in the working folder or uploaded — extract text with the `pptx` skill (e.g., `python -m markitdown file.pptx` or python-pptx), including **speaker notes**, which carry data sources and "(manual)" markers;
- a Google Slides link — read through the Google Drive connector (`read_file_content` with the file ID from the URL);
- a Google Doc / .docx / markdown version of the same plan;
- as a last resort, goals typed or pasted by the user, one line each.

If no plan exists, stop and say so: this agent does not set goals. Offer two paths — run the Quarterly Plan Agent first (recommended), or have the user state the goals directly with KPI, budget, and timeline so the brief can proceed (mark all such goals "(manual)").

### What to extract, slide by slide

The plan deck follows a fixed outline. Pull these fields:

| Plan slide | Fields to extract |
|---|---|
| Title | Project name, quarter, year, theme line |
| Direction: business-outcome emphasis | For each of the six outcomes: increase / hold / deemphasize and the rationale. Deemphasized outcomes with a maintenance floor still need a maintenance-level campaign or an explicit "no campaign" note. |
| The Q[N] goals, ranked (summary slide) | Rank, goal name, one-line description, outcome tag, headline KPI, budget, badges (TOP PRIORITY / NEW / CARRIED FORWARD) |
| One slide per goal | KPI target **with baseline** ("from X today") and data source; budget $ and % of total; 3–5 milestones with dates; 2–3 risks with mitigations; "what success unlocks" footer |
| Budget summary | Total budget; allocation per goal; discretionary reserve % (reserved for HOT campaigns — do not allocate it to planned campaigns) |
| Decisions & next steps | Pending leadership decisions and dates; next quarterly review date (the brief's own review date) |
| Review / Baseline slide | Last quarter's goals vs. outcomes and "what we learned" lines — these tell you which channels worked and which did not |
| Project health & marketing snapshot | Audience sizes (social followers, newsletter subscribers, web sessions), event registrations vs. capacity, enrollments, member counts — the reach numbers you size sources against |
| Speaker notes | Sources for every metric; user corrections; goal rationale and alternatives considered |

Present the extracted goals as a table (Goal Digest) and ask the user to confirm before designing campaigns. If a goal is missing a KPI baseline, budget, or timeline, ask for it rather than inferring — those numbers bound the campaigns.

### Plan sanity checks

- Goal budgets + discretionary reserve should equal the total. If they do not, flag it; do not fix it silently.
- A goal that already names channels or tactics ("run LinkedIn ads") is a disguised campaign. Treat the channel as a strong hint for the campaign design, but keep the goal at outcome level in the brief.
- Note the plan's status (draft vs. approved). The brief inherits it: a brief built on an unapproved plan is itself a draft pending ED/PL approval.

## 2. Foundation documents (strongly recommended inputs)

The deck names four core documents used by downstream agents: **Brand Kit**, **Message Foundation**, **ICP & Target Markets**, and **Pitch Deck**. Look for them in the working folder, attachments, or Google Drive (`search_files` on "[Project] Brand Kit", "[Project] Message Foundation", "[Project] Target Markets and ICP", "[Project] Pitch Deck"). Read them in full; pull the sections below into the brief rather than re-deriving them.

| Document | Sections to use | Where they land in the brief |
|---|---|---|
| **Message Foundation** | Elevator pitch; boilerplate (word-count-locked); positioning; voice; audiences; messaging pillars; proof points; talking points | Campaign narrative; per-source key messages (each mapped to a pillar and a proof point); boilerplate for landing pages and press-style assets; voice pointer for creation agents |
| **ICP & Target Markets** | §1 Market segment overview (segments, competitive landscape, TAM/SAM/SOM, current member/adopter segments); §2 organization-level ICPs (5 fields incl. trigger events and disqualifiers); §3 personas (goals, challenges, trusted sources, statements to share with the boss); §4 fit/warmth scoring inputs; **§5 Messaging & Content Handoff** (persona → lead pillar → proof point → preferred channel) | Target markets and ICP per campaign and per source; persona-to-source assignment (use "preferred channel" and "trusted sources" to pick sources); buying criteria; list/segment criteria; hand-raiser definitions |
| **Brand Kit** | Voice and tone; visual identity (logo, palette, type, imagery); competitive guardrails; audience messaging | Asset specs (brand pointer, not restated); document styling; guardrails carried into key messages |
| **Pitch Deck** | Standard membership narrative and proof points | Membership and sponsorship campaign messages; the deck itself is a reusable asset for Direct Message and Nurture sources |

If a document is missing, say so plainly, proceed on the plan plus interview answers, and label every section that would have drawn from it as **lower confidence — confirm with PL**. Do not invent personas, pillars, or competitors. Recommend running the corresponding foundation agent (`brand-guidelines-agent`, `message-foundation-agent`, `icp-target-markets-agent`, `pitch-deck-agent`) before the assets are created.

## 3. Optional live and operational inputs

Ask for these only if they are not already clear, and accept "unknown" without blocking:

- **CFT roster** — who leads Events, Education/Training, Membership Sales, MarComs & PR, LF Media, Creative & Web, LFX Marketing Ops, and the project community team this quarter. Campaign leaders come from this list.
- **Channel inventory** — which sources the project actually has: newsletter (subscriber count), LinkedIn/X/Bluesky/Mastodon/YouTube accounts (followers), Slack/Discord (members), HubSpot lists and segments, paid accounts and budgets, website platform (WordPress/Hugo/HubSpot). Pull reach numbers from the plan's snapshot slide first; from LFX (`query_lfx_semantic_layer`, `query_lfx_lens`) or HubSpot (`get_marketing_email_analytics`, `query_crm_data`) when connectors are present; otherwise ask.
- **Calendar constraints** — event dates, CFP and early-bird deadlines, release dates, holidays, other projects' major sends that compete for shared LF lists and banners.
- **Prior campaign results** — from the Quarterly Marketing Review workbook (`qtrly-marketing-review-agent`) or the plan's Review slide; use them to prefer channels that converted last quarter.
- **Existing assets** — prospectus, benefits guide, event social-card templates, recorded talks, last quarter's emails. Reuse where possible.
- **Member/target lists** — `member-360` output (ranked member engagement) is a ready-made list for membership renewal and event-sponsorship targeting; `search_members` / `get_membership_key_contacts` from LFX give member key contacts.

Record the source of every number and name in the brief's final "Sources and assumptions" section, using the same convention as the plan: `LFX`, `document (name)`, `HubSpot`, or `(manual — who)`.
