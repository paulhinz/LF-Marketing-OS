# Agent Routing — which creation and execution agents each source needs

The campaign brief is the strategy layer between the quarterly plan and the agents that do the work:

```
Qtrly Plan agent  →  [this agent: Campaign Brief]  →  Content creation agents  →  Campaign ASSETS
                                                   →  Source execution agents  →  Campaign TACTICS SCHEDULED
```

Every source entry in the brief names the **creation agent(s)** that will produce its assets and the **execution agent** (or tool + owner, if no agent exists yet) that will set up and run the source. The consolidated Agent Run Plan section of the brief then lists every agent run, in order, with the exact inputs it needs. Downstream agents load the four foundation documents (Brand Kit, Message Foundation, ICP & Target Markets, Pitch Deck) themselves; the brief supplies the campaign-specific strategy they cannot derive: audience, key messages, CTA, asset spec, tracking, and timing.

## Routing table

Status reflects the LFX Marketing OS marketplace (`paulhinz/LF-Marketing-OS`) as of September 2026, when this skill was written. When a listed agent is installed in the session, name it exactly; when it is not, write "Agent TBD — manual: <owner/tool>" so the gap is visible in the run plan. Check the session's available skills before finalizing the run plan, since new agents are added regularly.

### Creation agents (produce assets)

| Asset type | Creation agent | Status | What the brief must hand it |
|---|---|---|---|
| Social post copy (LinkedIn series, X/Bluesky threads, ambassador/leader posts) | `linkedin-post-agent` (Social Post agent); `ambassador-content-assignment` for speaker/ambassador kits | Installed | Source entry: persona, key messages, CTA + link (UTM), posting cadence, hashtags/tags, brand voice pointer |
| Social plan / weekly queue | Social Content agent ("Draft · Queue · Publish") | TBD — manual via Sprout Social | Campaign calendar, message sequence, post count per source |
| Blog post, case study, article, executive summary, Q&A, contributor spotlight | `case-study-agent` (Convert Content to Branded Doc) | Installed | Source content to convert (talk, interview, notes) or the angle; persona; pillar; CTA block to embed |
| eBook / "State of X" report / topic guide | Blog/Case Study/eBook agent | TBD — `case-study-agent` for long-form drafts, Creative & Web for layout | Outline, personas, proof points, gated vs. ungated decision (LF default: ungated, enrich on visit) |
| Newsletter issue or feature slot | Newsletter Composition agent ("Aggregate · Draft · Schedule"); VIP Newsletter | TBD — manual via HubSpot / Beehiiv | Blurb brief: headline, 2–3 sentences, link with UTM, image spec, issue dates |
| Email: Invite / Email: Reminder copy | Email content agent | TBD — draft with `marketing:email-sequence` or `marketing:draft-content` if installed; execute in HubSpot | Segment, persona, subject-line direction, key message, CTA, send dates, reminder logic |
| Landing page copy and structure | Landing Page agent; `website-designer-agent` for full sites | TBD for standalone LP — `website-designer-agent` when the page lives on the project's Hugo site; HubSpot LP otherwise | Offer, persona, proof points, primary CTA, form fields (minimal), UTM and HubSpot campaign |
| Event page setup | Event Setup agent ("Cvent Page · Capacity · Sponsors") | TBD — Events team / Cvent | Event details, capacity, tiers, sponsor prospectus link |
| Web page copy updates (homepage hero, members page) | Web Page (CCR) agent — TBD; `website-designer-agent` — Installed (whole-site scope) | Mixed | Page, section, new copy, CTA, live dates |
| Banner and ad creative | Banner Design agent | TBD — Creative & Web | Sizes, copy, CTA, brand assets, placements and dates |
| Pitch deck / prospect-specific prep brief | `pitch-deck-agent` | Installed | Persona/prospect list from the membership or sponsorship campaign |
| Member executive briefing deck | `member-benefits-briefing` | Installed | Named member/prospect company |
| Survey (post-event, member, student) | Survey agent | TBD — manual (LFX Surveys / HubSpot forms) | Audience, questions tied to the Accepted-stage campaign, send date |
| Award submission, post-event coverage, newsjack calendar | Newsjack / Award / Post Coverage agents | TBD | Trigger events, dates, key messages |
| Video clips / podcast episode / owned-media flywheel | Owned Media Production agent | TBD — LF Media | Source recording, clip spec, distribution sources |

### Execution agents (set up and run sources)

| Medium / source | Execution agent | Status | What the brief must hand it |
|---|---|---|---|
| Social (all organic sources) | Social publishing via Sprout Social; Social Content agent queue | TBD — manual scheduling in Sprout Social | Approved posts, schedule, accounts, UTMs |
| Social listening for the campaign's keywords and echo | `social-listening-report` (Voices That Matter, Campaign Echo) | Installed | Campaign keywords/hashtags, launch dates, follower thresholds; keyword-slot request (plan-limited) |
| Direct Message | ABM outreach — Membership Sales / Events sponsorship team | Manual | Target list, DM templates, sequence, owner |
| Newsletter / Email: Invite / Email: Reminder | HubSpot marketing email + workflows (`manage_marketing_email`, `manage_segment` via HubSpot connector) | Connector available; Email execution agent TBD | Segment definition, approved copy, send/reminder schedule, HubSpot campaign name |
| Contact lists / segments | Segmentation agent ("Personas · Segments · Sync") — TBD; List Builder (member, event, edu) — TBD; `member-360` — Installed (its ranked member-engagement output doubles as a target list) | Mixed | ICP/persona criteria, source systems (HubSpot, Segment, LFX), exclusions |
| Web: Landing Page, CTAs, Blogs | HubSpot CMS (`manage_landing_page`, `manage_blog_post`, `manage_website_page`) — connector available; project-site deploy via `website-designer-agent` — Installed; Web Page Deployer agent — TBD | Mixed | Approved copy and creative, URL slug, UTM, go-live date |
| Web: Banners on LF or project properties | Web team (shared-resource booking) | Manual | Creative, placement, dates, conflict check |
| Paid: Paid Social, Adwords / Google Ads, Retargeting | Campaign Design agent ("SEM · LinkedIn · Reddit · UTMs") | TBD — manual in LinkedIn Campaign Manager / Google Ads / Reddit Ads; audiences from Segment | Budget, dates, audience definition, creative variants, LP, conversion events, ROAS floor |
| Paid: 3rd-party ads / newsletters / affiliate | Partner media buying — MarComs / LF Media | Manual | Placement, dates, creative, tracked links |
| Event execution milestones | Event Execution agent (12-week milestone plan) | TBD — Events team | Event date, attendance goal, budget |
| Monitoring / optimization | Insights agent — TBD; Campaign Performance dashboard — LFX; `aeo-geo-analyzer` for web content answerability — Installed | Mixed | Campaign IDs, KPIs, alert thresholds from the brief |

## Routing rules

1. **One row per asset, one row per source setup.** The brief's Asset Production List and Execution Setup List are what get turned into Asana tasks (Biz outcome → Goal → Campaign → Channels & Execution). Each row: what, for which campaign/source, which agent or owner, inputs, due date.
2. **Order the run plan by dependency.** Lists and segments first (you cannot send to a list that does not exist), then landing pages and CTAs (everything links to them), then long-form content (blogs, case studies, eBooks that posts and emails point to), then social and email copy, then paid creative, then scheduling/execution, then listening and monitoring setup. Put dates on each step so the first send is not blocked by a missing page.
3. **Group multi-message campaigns.** When a campaign sends a sequence (invite → reminder → last chance → post-event; or a 4-issue newsletter run), the Message Sequence table in the campaign section is the single place that defines it, and the email/social creation agents are pointed at that table rather than at scattered rows.
4. **Reuse before creating.** Check the Content Hub / working folder / Drive for existing assets (last year's event cards, the current prospectus, an existing benefits guide) and mark rows "reuse — update dates/links" instead of "create".
5. **Flag shared LF resources.** Any run that touches LF-wide properties (LF newsletter, linuxfoundation.org banners, LF social accounts, LF paid budget) gets a "shared resource — coordinate" flag so the CFT can sequence it against other projects.
6. **Human gates.** Every execution row has an approval step: the campaign leader approves assets before scheduling; paid spend needs the budget owner's sign-off. Write the approver's name or role into the row.
