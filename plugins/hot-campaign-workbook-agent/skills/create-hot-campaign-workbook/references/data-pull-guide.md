# Data Pull Guide — where each workbook input lives, how to read it, what to extract, and the fallback

Time-box the whole pull to about 15 minutes. Run independent pulls in parallel (sub-agents or parallel tool calls). If a connector is not authorized or a file is not found, record the gap in slide notes and on the affected slide, convert the missing data into an ED INPUT or CFT INPUT question, and keep going. Never fabricate.

Provenance rule: every pre-filled figure, quote, or claim in the workbook names its source in the slide notes: tool and query, file name and date, newsletter issue date, URL and access date.

## A. Project record (always)

- **Tool:** LFX connector `search_projects`, then `get_project`.
- **Extract:** canonical project name, slug, parent foundation, description, and the legal-entity name used in copy.
- **Fallback:** ask the runner to confirm the exact name.

## B. Core documents: Brand Kit, Message Foundation, ICP & Target Markets

Produced by `brand-guidelines-agent`, `message-foundation-agent`, and `icp-target-markets-agent`. Usually Google Docs or .docx on the LF Agent DOCS template.

- **Tool:** Google Drive `search_files` for `[Project] Brand Kit`, `[Project] Message Foundation`, `[Project] ICP`, `[Project] Target Markets`; then `read_file_content`. Also check the working folder and any file the runner uploaded. Take the most recent version marked final or for review.
- **Extract from the Brand Kit:** voice and tone, visual identity pointers (for the formatter), what the brand never does.
- **Extract from the Message Foundation:** positioning platform and tagline, messaging pillars with tags, one-page message matrix, Stat Bank proof points with their verification status, stance on contested topics and objection handling, tiered CTA library, boilerplate, audience ROI angles, talking points.
- **Extract from the ICP & Target Markets:** target markets, ICP definitions, 2 or 3 personas with pains, motivations, blockers, preferred channels, and buying criteria; fit and warmth scoring definitions; hand-raiser actions.
- **Fallback:** if a document is missing, put a red note on the Hot Campaign Card ("Message Foundation not found; stance and proof points are proposals"), recommend running the missing foundation agent, and turn the pillars/personas/stance into ED INPUT questions. Do not invent personas.

## C. Current quarterly plan and campaign brief

- **Files:** the quarterly marketing plan deck from `qtrly-plan-agent` (`[Project] Q[N] [Year] Marketing Plan`), the completed Marketing Plan Workbook if the plan deck does not exist yet, and the Quarterly Campaign Brief (.docx) from `qtrly-campaign-plan-agent`.
- **Tool:** Google Drive `search_files` and `read_file_content`; pptx and docx skills for uploaded files. The master foundation spreadsheet (Google Sheet ID `110bv8q58jjcmRTpZe0meIcR8UuUisJd0FN3lnR_OQMg`) holds the plan name or link, the MarCom roster, and budget lines when the plan cannot be found directly.
- **Extract:** each goal with its business outcome, KPI, target, budget, timeline, and risks; each campaign with leader, mediums and sources, target markets and personas, key messages, CTAs, and asset list; the named campaign budget and the **discretionary reserve** (amount and how much is already committed to other hot or evergreen work); shared LF resources already booked this quarter (newsletter slots, banners, LF social).
- **Fallback:** if there is no plan, the Fit slide says so, the rescue trigger type is unavailable, and the ED INPUT asks which outcome and goal this campaign should count toward.

## D. Results: Marketing Impact Report and LFX metrics

- **Preferred:** the most recent Marketing Impact Report (.docx) for the project, produced by `run-marketing-impact-report`. Search Drive and the working folder for `[Project] Marketing Impact Report`. If the newest is older than 14 days, offer to run `run-marketing-impact-report` now (it needs the LFX connector, HubSpot optional); if the runner declines, use what exists and label its date.
- **Direct read when no report exists:** LFX connector. Call `read_lfx_standard_metrics_guidance` first, then `query_lfx_standard_metrics` for the goal KPIs (memberships by tier, new and churned members, event registrations and attendance, training enrollments and certifications, contributors and contributing organizations, social mentions, sentiment, and reach), quarter to date.
- **Compute:** pace per goal = actual ÷ (target × fraction of quarter elapsed). Mark ahead (≥ 1.1), on pace (0.9 to 1.1), behind (< 0.9). Show the numbers, not only the label.
- **Extract also:** which mediums and sources are delivering and which are not (the report's mediums and sources pages), so a rescue campaign does not add more of a source that is already failing.
- **Fallback:** if neither is available, the Fit slide's pace table becomes a CFT INPUT table with the goal names pre-filled from the plan.

## E. NewsFeed: Alex Salkever's newsletters

- **Location:** a Google Drive folder (or a running doc) where the newsletters written for Jim Zemlin and other EDs are archived. Ask the runner for it on first run (Step 1h) and record the folder ID in the workbook's slide notes so later runs can reuse it. If the runner gives a name instead of a link, `search_files` for it.
- **Tool:** Google Drive `search_files` scoped to the folder (or `list_recent_files`), then `read_file_content` for each issue in the last 30 days. Read the issues in a sub-agent if they are long; ask it for items relevant to the project's domain keywords, its competitors, its personas' industries, and the runner's trigger.
- **Extract per item:** headline, date, one-line summary, the newsletter's own take, primary source link if given, why it touches the project (pillar, persona, competitor, outcome), and a first-pass trigger type.
- **Use:** in flag mode, find the runner's trigger and adjacent items that strengthen or complicate it; in scan mode, this is the primary candidate source. Quote at most one short phrase per item; summarize the rest.
- **Fallback:** accept pasted text or an uploaded file from the runner; if there is no newsfeed at all, say so on the Trigger slide and rely on web verification and social listening.

## F. Content Plan

Alex Salkever is expected to create and maintain the list. It may be an Asana project or a spreadsheet.

- **Asana:** `search_objects` (or `get_projects`) for projects named "Content Plan", "Editorial Calendar", "[Project] Content", or a portfolio the runner names; then `get_tasks` for open tasks. Read custom fields for content type, topic, persona, channel, status, due date, owner.
- **Spreadsheet:** Google Drive `search_files` for "Content Plan" or "Editorial Calendar"; `read_file_content`. Expect columns such as title, type (blog, research paper, eBook, webinar, video, case study, survey), topic, persona, target date, owner, status, campaign.
- **Extract:** everything due in the next 6 to 8 weeks, everything published in the last 4 weeks, and any asset that matches the trigger's topic. For each candidate, mark **pull forward** (publish early), **repurpose** (new cut of an existing asset), or **re-angle** (change the hook to the trigger), and name the owner to ask.
- **Fallback:** if neither exists, the Assets slide lists the gap and the CFT INPUT asks what content is in flight and what can be ready in 72 hours. Recommend that the Content Plan be created so future hot campaigns can move faster.

## G. Social listening

- **Preferred:** the most recent Social Listening Report for the project from `social-listening-report`, if it is under 7 days old.
- **Direct read:** LFX connector `query_lfx_lens`, or the Octolens tools when connected: `get_workspace` and `list_keywords` to see what is monitored, `volume_over_time` for the last 30 days, `workspace_signals` and `mentions_summary` for spikes and themes, `search_mentions` for the trigger's keywords and the project's name (filter by minimum author followers, for example 5,000, to find voices with reach), `sentiment_by_keyword`, `top_sources`. Note which workspace was used (LF, PyTorch, OpenSearch, OpenInfra, LF Energy, CNCF, AAIF, ASF).
- **Extract:** volume change and the cause of any spike; sentiment split; up to 10 voices with reach who spoke about the trigger or the project (author, platform, followers, one-line summary, link); competitor or adjacent-project comparisons; questions people are asking (these seed the FAQ); creators who could amplify.
- **Keyword governance:** if the hot campaign needs new listening keywords, list them on the KPI slide as a request; keyword slots are plan-limited and governed in the quarterly cycle.
- **Fallback:** if no listening is available, the Trigger slide says so and the FAQ is drafted from the Message Foundation objections only.

## H. HubSpot (optional)

- **Tools:** `query_crm_data` or `search_crm_objects` for an estimated count of contacts matching the target persona and stage (use existing segments where possible, `manage_segment` read); `search_intent_signals` for recent intent on the project or topic; `get_campaign_attribution_reports` for related past campaigns; `get_marketing_email_analytics` for the baseline open and click rates of the list you propose to email.
- **Extract:** estimated reachable count for the SOM (label as estimate, with the segment definition used), recent intent signals, baseline email performance for the KPI slide.
- **Fallback:** the Target slide's reachable count becomes a CFT INPUT question.

## I. Web verification

- **Tool:** web search, then fetch the primary source.
- **Do:** confirm the trigger happened, when, and who said it; find the primary source (release notes, filing, announcement, post); see what competitors or adjacent projects have already said; note one or two market data points if the archetype is Newsjack.
- **Rules:** date every finding; mark figures as drafts to verify; quote at most one short phrase per source; never present an unverified claim as fact. If the trigger cannot be verified, the Trigger slide says "unverified" and the first CFT action is to verify it.

## J. Skills to lean on when installed

- `lfx-data-querying` and `lfx-figure-checking` for any LFX count you put on a slide.
- `run-marketing-impact-report` when there is no recent results report.
- `social-listening-report` when there is no recent listening report and the trigger is a news, viral, or competitor type.
- `lf-output-formatter` to place the deck on the LF template with the project's Brand Kit.
- `plain-writing` for all prose in the workbook.
