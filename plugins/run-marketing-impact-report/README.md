# run-marketing-impact-report

LFX Marketing OS · Monitoring agent. Produces the **Marketing Impact dashboard as a Word document with live data** for one Linux Foundation project or foundation.

The document mirrors the v3 clickable prototype (https://paulhinz.github.io/LF-Marketing-OS-Dashboards-Prototypes/) one page per view, in the same hierarchy:

1. **Business outcomes** — All › Outcomes, Memberships, Events, Education, Audience, Adoption. Each page opens with the decision question it answers, the goals from the quarterly plan, the outcome's key metrics, inbound marketing by medium and source, and outcome-specific detail (member health, event ROI and Community Days, courses, share of voice, contributors/maintainers/ambassadors/community groups).
2. **Mediums under All** — Paid, Paid › Budget, Social, Web, Direct, Attribution. One standard set of metrics for every source in the medium, plus the drill-ins from the CNCF requirements.
3. **Goals › Campaigns**, a campaign detail page, and four source-detail pages (Paid social, LinkedIn organic, Blogs, Newsletter).

Every metric is tagged DECISION / SIGNAL / WATCH. Every figure carries its source and as-of date. **Nothing is estimated**: a section whose data has no connector stays in the report and reads `Data not available, requires [x] connector.` An appendix lists every item and whether it was filled.

## What you need

| Connector | Required? | What it fills |
|---|---|---|
| **LFX** | Yes — the run stops without it | Memberships (by tier, new, churn, lost, member organizations), events (registrations, check-ins, sponsorships, speakers, Community Days), education (enrollments, courses, certifications), adoption (contributors, contributions, maintainers, participants, project health), social listening (mentions, sentiment, reach, by network, share of voice, message pull-through), ambassador roster |
| **HubSpot** | No — the run continues without it | Direct (email sends, opens, CTR, unsubscribes, list health, by type), attribution (by medium under four models), membership pipeline and velocity, net new and engaged contacts, HubSpot-hosted web content analytics, campaigns and campaign detail |
| Google Ads / LinkedIn Ads, Sprout Social, GA4 / Search Console, Bevy, Cvent, Sales Navigator, ambassador tracker | Not available in Claude today | Their sections stay in the report with a notice |

Authorize LFX (and HubSpot if you have it) in claude.ai → Customize → Connectors before the first run.

## How to run

In Cowork (or Claude Code) with this plugin installed, say:

- `run the marketing impact report` — the agent asks which project and which period
- `run-marketing-impact-report for CNCF, this quarter`
- `build the CNCF marketing impact report for last month and use this quarterly plan deck for the goals`

Optional inputs raise coverage: the Quarterly Marketing Plan deck (goals, budgets), the Quarterly Campaign Brief (campaign definitions), and the 3–5 message tags to track for narrative pull-through.

Output: `<Project> Marketing Impact Report <date>.docx` in your working folder, plus `report_data.json` (the raw figures, for audit). If `lf-output-formatter` is installed, the agent offers to re-skin the document on the LF Agent DOCS template.

## Components

- `skills/run-marketing-impact-report/SKILL.md` — the run: connector check, project/period intake, LFX then HubSpot gathering, data-file assembly, build, delivery
- `references/report_catalog.json` — the fixed structure: 18 pages, 190 items, each with its connector and the call that fills it
- `references/data-sources.md` — item-by-item call shapes for LFX standard metrics, the LFX semantic layer, LFX committee tools and HubSpot, with the caveats to carry into the report
- `references/data-file.md` — schema of `report_data.json`
- `scripts/build_report.py` — renders the .docx from catalog + data (python-docx); writes the connector notice for every unfilled item and the coverage appendix

## Design source

Requirements: Jen Royle-Jones' CNCF Marketing Dashboard brief (Dashboard 1 weekly performance by medium; Dashboard 2 monthly business outcomes) and the LFX Marketing OS planning method (business outcomes → goals → campaigns → mediums → sources). The column-G mapping in the CNCF requirements sheet names the page and card for each requested metric; this report keeps the same names.

## Version

0.1.0 — first release. Change the catalog only by regenerating it; a new connector is added by extending `data-sources.md` and the SKILL, not the catalog.
