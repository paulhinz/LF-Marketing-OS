---
name: map-marketing-data-sources
description: >
  This skill should be used when a Linux Foundation marketer, agent builder, or exec
  says "Run the Marketing Data Sources Agent", "build the marketing data sources map",
  "where does our marketing data live", "create/update the data source location
  spreadsheet", "map LF marketing data sources", or asks where to find marketing
  content, analytics, trackers, rosters, or tooling across LF systems. Produces the
  LF Marketing Data Sources Map — an .xlsx that tells other LFX Marketing OS agents
  exactly where every piece of marketing content and data lives — live-verified via
  the LFX, Asana, HubSpot, Google Drive, and Slack connectors.
metadata:
  version: "0.1.0"
  author: "Paul Hinz, The Linux Foundation"
---

# Map Marketing Data Sources

Build the **LF Marketing Data Sources Map**: the one-stop spreadsheet other marketing agents (and humans) consult to find where content and data live across Linux Foundation systems. Each run merges the curated seed registry with live verification against connected systems, then writes a formatted .xlsx.

## Workflow

### 1. Determine scope

Default scope is **All LF marketing**. If the user names a specific project/foundation (e.g. "for PyTorch", "for CNCF"), scope the run to that project: filter seed rows to All-LF + that project, and run per-project discovery for it. Do not ask a clarifying question if no project is named — proceed LF-wide.

### 2. Load the seed registry

Read `references/seed-data-sources.md`. This is the curated baseline compiled from Jim Zemlin's raw-data-sources request doc and the PyTorch tracking sheet — 8 categories, ~30 data sources, the LF-wide systems list, and the people directory. Treat it as the starting rowset, not the final answer.

### 3. Verify live via connectors

Read `references/verification-playbook.md` and execute it. In summary:

- **LFX**: enumerate projects in scope; confirm committees, rosters, meetings/transcripts, memberships, mailing lists.
- **Asana**: enumerate marketing/comms/content/events projects across the LF workspace; confirm seeded project gids; capture permalinks.
- **HubSpot**: confirm account, newsletter lists, campaign/email analytics availability.
- **Google Drive**: fetch metadata for every seeded Drive/Docs/Sheets link to validate it; search for new trackers; re-read the two source docs for updated answers.
- **Slack**: confirm coordination channels if authorized.

Rules: run independent checks in parallel; never fail the run because a connector is missing — record the appropriate Gap status instead; add new registry rows for any marketing data source discovered that the seed lacks; set Last Verified (today) and Verified Via on every row touched.

### 4. Build the spreadsheet

Complete ALL verification before touching spreadsheet mechanics. Then read `references/spreadsheet-spec.md` and the platform xlsx skill, and build `LF Marketing Data Sources Map - YYYY-MM-DD.xlsx` with the five sheets (README, Data Source Registry, Systems & Tools, Connector Status, Gaps & Actions), formatting, and status color coding as specified. Save to the user's working folder.

### 5. Verify and deliver

Programmatically re-open the workbook: check all five sheets exist, registry row count ≥ seed row count, hyperlinks intact. Present the file to the user with a brief summary: rows confirmed vs gaps, connectors that need authorization, and the top follow-up actions from the Gaps & Actions sheet. Offer to schedule a recurring run (e.g. monthly refresh) if the user wants the map kept current.

## Principles

- The Location/Link column is the product — an agent reading the map must be able to go straight to the source. Prefer canonical live links over descriptions.
- Never delete a seed row; downgrade its status if it fails verification and note why.
- Owners are as valuable as links — carry named owners through from the seed and from anything discovered.
- Keep chatter minimal during the run; the task list and final summary carry the narrative.
