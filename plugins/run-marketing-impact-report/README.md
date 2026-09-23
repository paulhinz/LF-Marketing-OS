# run-marketing-impact-report

LFX Marketing OS · Monitoring agent. Produces the **Marketing Impact dashboard as a Word document with live data** for one Linux Foundation project or foundation.

The document mirrors the v3.1 clickable prototype (https://paulhinz.github.io/LF-Marketing-OS-Dashboards-Prototypes/), titled "Marketing Dashboard · Business Outcomes and Marketing Mediums and Source Metrics", one page per view:

1. **All › Summary** — the five business outcomes with their key metrics, goal progress from the quarterly plan, marketing contribution and inbound by medium.
2. **Tabs under All** — Paid, Social, Web, Direct (one standard metric set per source, plus the CNCF drill-ins); **Defined Campaigns** (every goal from the Marketing Plan with KPI, budget and timeline → the campaigns under it with their KPIs → each tactic per Medium : Source with its KPI, plus HubSpot campaign results); **Budget** (paid ads by medium type with results, plus the other marketing spend tracked by the Executive Director and Marketing Lead).
3. **Business outcomes** — Memberships, Events, Education, Audience, Adoption: goals, key metrics, inbound by medium and source, and outcome-specific detail (member health, event ROI and Community Days, courses, share of voice, contributors/maintainers/ambassadors/community groups).
4. A campaign detail page and four source-detail pages (Paid social, LinkedIn organic, Blogs, Newsletter).

Every metric is tagged DECISION / SIGNAL / WATCH. Every figure carries its source and as-of date. **Nothing is estimated**: a section whose data has no connector stays in the report and reads `Data not available, requires [x] connector.` An appendix lists every item and whether it was filled.

## What you need

| Connector | Required? | What it fills |
|---|---|---|
| **LFX** | Yes — the run stops without it | Memberships (by tier, new, churn, lost, member organizations), events (registrations, check-ins, sponsorships, speakers, Community Days), education (enrollments, courses, certifications), adoption (contributors, contributions, maintainers, participants, project health), social listening (mentions, sentiment, reach, by network, share of voice, message pull-through), ambassador roster |
| **HubSpot** | No — the run continues without it | Direct (email sends, opens, CTR, unsubscribes, list health, by type), marketing-sourced vs influenced contribution, campaign results for Defined Campaigns, membership pipeline and velocity, net new and engaged contacts, HubSpot-hosted web content analytics, campaigns and campaign detail |
| Google Ads / LinkedIn Ads, Sprout Social, GA4 / Search Console, Bevy, Cvent, Sales Navigator, ambassador tracker | Not available in Claude today | Their sections stay in the report with a notice |

Authorize LFX (and HubSpot if you have it) in claude.ai → Customize → Connectors before the first run.

## How to run

In Cowork (or Claude Code) with this plugin installed, say:

- `run the marketing impact report` — the agent asks which project and which period
- `run-marketing-impact-report for CNCF, this quarter`
- `build the CNCF marketing impact report for last month and use this quarterly plan deck for the goals`

Optional inputs raise coverage: the Quarterly Marketing Plan deck (goals, budgets), the Quarterly Campaign Brief (campaign definitions), and the 3–5 message tags to track for narrative pull-through.

Output: `<Project> Marketing Impact Report <date>.docx` in your working folder — **built on the LF Agent DOCS Template** (Roboto Slab headings, Open Sans body, LF running header and footer, template tables) with the bundled `lf-output-formatter` engine — plus `report.md` (the Markdown it was rendered from) and `report_data.json` (the raw figures, for audit). With the project's Brand Kit present, the agent drafts `brand.json` and re-skins the document in the foundation's brand.

## Components

- `skills/run-marketing-impact-report/SKILL.md` — the run: connector check, project/period intake, LFX then HubSpot gathering, data-file assembly, build, delivery
- `references/report_catalog.json` — the fixed structure: 17 pages, 185 items, each with its connector and the call that fills it
- `references/data-sources.md` — item-by-item call shapes for LFX standard metrics, the LFX semantic layer, LFX committee tools and HubSpot, with the caveats to carry into the report
- `references/data-file.md` — schema of `report_data.json`
- `scripts/build_report.py` — catalog + data → Markdown with LF front matter → .docx on the LF Agent DOCS Template; writes the connector notice for every unfilled item and the coverage appendix
- `scripts/lf/` — the `lf-output-formatter` document engine (`build_doc.py`, `build_lf_doc.py`, `lfbrand.py`, `render_check.py`), copied from the shared skill so the plugin is self-contained; `scripts/assets/` holds the LF Agent DOCS Template and the LF logo

## Design source

Requirements: Jen Royle-Jones' CNCF Marketing Dashboard brief (Dashboard 1 weekly performance by medium; Dashboard 2 monthly business outcomes) and the LFX Marketing OS planning method (business outcomes → goals → campaigns → mediums → sources). The column-G mapping in the CNCF requirements sheet names the page and card for each requested metric; this report keeps the same names.

## Version

0.3.0 — output moves onto the LF Agent DOCS Template via the bundled lf-output-formatter engine (LF default, or foundation brand with brand.json); page order follows the prototype. 0.2.0 — matches prototype v3.1: "Marketing Dashboard" title, statement headings, Summary tab, Attribution replaced by Defined Campaigns (goals → campaigns → tactics with KPIs), Budget tab with paid-ads-by-medium results and other marketing spend. 0.1.x — first release. Change the catalog only by regenerating it; a new connector is added by extending `data-sources.md` and the SKILL, not the catalog.
