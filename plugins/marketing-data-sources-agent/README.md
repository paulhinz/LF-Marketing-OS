# Marketing Data Sources Agent

An LFX Marketing OS plugin that builds the **LF Marketing Data Sources Map** — a one-stop spreadsheet telling marketing agents (and humans) exactly where every piece of marketing content and data lives across Linux Foundation systems.

## What it does

When run, the agent:

1. Loads a curated seed registry of ~30 data sources across 8 categories (systems of record, governance, content, web/search, events, PR, community, budget/tooling), compiled from Jim Zemlin's raw-data-sources request and the team's answers.
2. Live-verifies locations via your connected LFX, Asana, HubSpot, Google Drive, and Slack connectors — and discovers new sources along the way.
3. Produces `LF Marketing Data Sources Map - YYYY-MM-DD.xlsx` with five sheets: README, Data Source Registry, Systems & Tools, Connector Status, and Gaps & Actions — color-coded by verification status.

## Usage

Say: **"Run the Marketing Data Sources Agent"** — or "build the marketing data sources map", "where does our marketing data live", "update the data source location spreadsheet".

Scope defaults to all LF marketing; name a project ("...for PyTorch") to scope the run.

## Setup

No environment variables. Best results with these connectors enabled and authorized: LFX Tools, Asana, HubSpot, Google Drive, Slack. Missing connectors don't break the run — affected rows are marked as gaps.

## Components

- Skill: `map-marketing-data-sources` (with seed registry, verification playbook, and spreadsheet spec references)
