---
name: run-marketing-impact-report
description: >
  This skill should be used when a Linux Foundation marketer, Executive Director,
  Project Leader or Marketing Ops reviewer says "run the marketing impact report",
  "run-marketing-impact-report", "build the marketing impact report for [project]",
  "marketing impact dashboard as a document", "give me the CNCF marketing impact
  report", "weekly marketing performance report", "monthly business outcomes report",
  or asks for the Marketing Impact dashboard (business outcomes → mediums → sources)
  with live data. This is the LFX Marketing OS "Marketing Impact Report" agent: it asks
  which project to run against, checks the LFX connector (required) and HubSpot
  connector (optional), pulls live figures, and writes one Word document with one page
  per view of the Marketing Impact dashboard prototype — every metric tagged
  DECISION / SIGNAL / WATCH, every figure sourced and dated, and every section whose
  data has no connector kept in place with a "Data not available, requires [x]
  connector" notice.
metadata:
  version: "0.2.0"
  author: "Paul Hinz, Linux Foundation"
  department: "LFX Marketing OS · Monitoring"
  prototype: "https://paulhinz.github.io/LF-Marketing-OS-Dashboards-Prototypes/"
---

# Run Marketing Impact Report

Produce the Marketing Dashboard ("Business Outcomes and Marketing Mediums and Source Metrics") as a document, with live data, for one Linux Foundation project or foundation. The document mirrors the v3.1 clickable prototype one page per view: All › Summary, then the tabs under All (Paid, Social, Web, Direct, Defined Campaigns, Budget), then each business outcome (Memberships, Events, Education, Audience, Adoption), then a campaign detail page and four source-detail pages. Every page opens with the heading statement the prototype uses.

Three rules govern the whole run.

1. **Never invent a figure.** A number appears only if a connector returned it. Anything else stays in the report as its section with the notice `Data not available, requires [x] connector.` The builder script writes that notice automatically for every catalog item without data.
2. **Every figure carries its source and as-of date**, in the reader's words (for example "LFX · memberships by tier · as of 2026-09-23"), never tool or column names.
3. **The structure never changes.** `references/report_catalog.json` fixes 17 pages and 185 items. Do not add, drop or rename items; fill what the connectors allow.

## Phase 0 — Connectors

Check which tools are available in this session before asking anything:

- **LFX (required).** Tools named like `query_lfx_standard_metrics`, `search_projects`, `explore_lfx_semantic_layer`, `query_lfx_semantic_layer`, `search_committees`. If none are present or they fail to connect, stop and tell the user: the LFX connector must be authorized in their claude.ai connector settings (Customize → Connectors) before this report can run. Do not produce a report with no live data.
- **HubSpot (optional).** Tools named like `get_marketing_email_analytics`, `get_campaign_attribution_reports`, `get_content_analytics_report`, `read_campaign_data`, `query_crm_data`, `search_crm_objects`. If absent, say so once — "HubSpot is not connected, so the Direct, Web (HubSpot-hosted), campaign-results, pipeline and contact sections will carry a notice" — and continue.

Record the result as `connectors: {lfx: true/false, hubspot: true/false}` for the data file.

## Phase 1 — Ask the user

Ask, in one message (use AskUserQuestion where the host offers it), only what the request has not already answered:

1. **Project or foundation** to run against (for example CNCF, PyTorch Foundation, OpenSSF, LF Energy). Resolve it with `search_projects` and confirm the stored slug back to the user ("Running against Cloud Native Computing Foundation, slug `cncf`"). Never pass a slug that `search_projects` did not return.
2. **Period**: this week, this month, this quarter (default), year to date, or explicit dates. Compute `start`/`end` as UTC calendar days and echo them.
3. **Optional inputs**: the Quarterly Marketing Plan deck and/or Quarterly Campaign Brief, and the 3–5 message tags to track for narrative pull-through (fall back to the project's Message Foundation if in the working folder). The plan supplies the **Defined Campaigns** page (goals with KPI, budget, timeline → campaigns with KPI → tactics per Medium : Source with KPI) and the **Budget** page (goal budgets and the other, non-ads marketing spend). If the user has neither, those items carry the notice `requires Quarterly Marketing Plan document`; never reconstruct goals or budgets from memory.
4. **Output location**: the working folder (default) or a named folder.

If the user gave all of this in the request, proceed without asking.

## Phase 2 — Gather LFX data

Read `references/data-sources.md` for the exact call per item. Before the first LFX call, read the two LFX guidance tools (`read_lfx_standard_metrics_guidance`, `read_lfx_semantic_layer_guidance`) once. Then, scoped to the resolved slug and the period, gather in this order (standard metrics first; ad hoc semantic-layer queries only where the reference says so):

- Memberships: `memberships` (total, tier), `member_organizations`, `new_members` (total; `period=quarter` series), `membership_churn`, `lost_member_organizations`, `new_member_organizations`.
- Events: `event_registrations` (total, event), `event_sponsorships` (total, event), `speakers` (total, event).
- Education: `training_enrollments` (total, course, org; `period=month`), `certifications`.
- Adoption: `contributors` (total; `period=month`), `contributions` (total, org), `contributing_organizations`, `participants`, `maintainers` (total, role, source), `project_health` (total, category).
- Social listening: `social_mentions` (total, network, sentiment; `period=week`), `social_reach`; share of voice and keyword pull-through via `query_lfx_semantic_layer` per the reference; event social lift from the weekly mentions series around each event start date.
- Ambassadors: `search_committees` for a committee whose name contains "Ambassador", then `search_committee_members` for the enrolled count (the roster is the enrolled figure; activity is not in LFX).

Read every result's `applied` block for the scope and window actually used and carry its definition caveats into the item's `detail` (for example "list price, not dues billed", "distinct people — do not sum rows", "check-in data exists only for some registration sources"). Report the unattributed NULL row as unattributed, never dropped.

## Phase 3 — Gather HubSpot data (when connected)

Follow `references/data-sources.md`. Before the first call to `get_campaign_attribution_reports`, `read_campaign_data` or `query_crm_data`, call `tool_guidance` for that tool and follow it. Confirm property, pipeline and list names with `search_properties` / `search_crm_objects` before filtering — never guess internal names. Scope to the foundation where HubSpot carries a foundation property or list; when it does not, say the figure is portal-wide in `detail`.

Gather: email OVERVIEW totals and weekly series; per-email stats classified by type (newsletter, invite/reminder, nurture, survey); list sizes and 90-day active share; marketing-sourced vs. influenced share for the Summary and Memberships pages (attribution reports, FIRST_INTERACTION vs. LINEAR); closed-won and open membership deals; contacts created in the period and engaged in the last 90 days; content analytics TOTALS for HubSpot-hosted pages (views, visits, submissions, CTA views/clicks, entrances, exits, bounce rate, time per pageview); active campaigns and their analytics (sessions, new contacts, influenced contacts) for the Defined Campaigns page, joined to the plan's campaign names.

## Phase 4 — Assemble the data file

Write `report_data.json` in the working folder with this shape (see `references/data-file.md` for the full schema and an example):

```json
{
  "project": {"name": "Cloud Native Computing Foundation", "slug": "cncf"},
  "period": {"label": "Q3 2026", "start": "2026-07-01", "end": "2026-09-23"},
  "generated": "2026-09-23",
  "connectors": {"lfx": true, "hubspot": false},
  "summary": "3–5 sentences written from the figures below.",
  "metrics": {"<item id>": {"value": "402", "detail": "12 new in period", "source": "LFX · memberships by tier", "as_of": "2026-09-23"}},
  "tables":  {"<item id>": {"columns": [...], "rows": [[...]], "source": "...", "as_of": "...", "note": "..."}},
  "notes":   {"needs_attention": "...", "budget_recommendation": "...", "cd_definition": "..."},
  "page_notes": {"memberships": "one short paragraph reading the page"}
}
```

Item ids are the `id` fields in `report_catalog.json`. Fill only items with real data. For a table whose rows come from several connectors (the inbound-by-medium tables, member health, audience mix), include only the rows a connector returned; the builder adds a per-row notice for the rest. Write the `summary`, `needs_attention` and each `page_notes` entry from the filled figures only, naming the page each figure comes from; if fewer than three live figures exist for a page, leave its note out.

## Phase 5 — Build, check, deliver

1. Run `python3 ${CLAUDE_SKILL_DIR}/scripts/build_report.py --catalog ${CLAUDE_SKILL_DIR}/references/report_catalog.json --data report_data.json --out "<Project> Marketing Impact Report <YYYY-MM-DD>.docx"`. Install `python-docx` first if the import fails (`pip install python-docx --break-system-packages`).
2. Read the builder's coverage line (`N/185 items filled`) and open the appendix table; confirm every LFX-sourced item that the connector could serve is filled, and that no notice appears for an item you have data for.
3. If the `lf-output-formatter` skill is installed, offer to re-skin the document on the LF Agent DOCS template; otherwise deliver the plain build.
4. Present the file. In the reply give: project and period, connectors used, the coverage figure, the three "Needs attention" items, and one line listing the connectors that would raise coverage (Google Ads / LinkedIn Ads, Sprout Social, GA4, Bevy, Cvent, Sales Navigator, ambassador tracker).
5. Offer to schedule the run weekly (mediums) and monthly (outcomes) with the host's scheduled-tasks feature.

## What not to do

- Do not carry any figure from the sample-data prototype into the report; the prototype is the design reference only.
- Do not reconcile an LFX figure against another dashboard or explain a gap with arithmetic of your own; state the definition the `applied` block gave.
- Do not query the LFX lens (text-to-SQL) when a standard metric or a named semantic-layer metric answers the item.
- Do not skip a page or section because its connector is missing.
- On the Defined Campaigns table, mark every row's first column `GOAL`, `CAMPAIGN` or `TACTIC` so the builder shades the hierarchy; keep tactics under their campaign and campaigns under their goal, in plan order.
