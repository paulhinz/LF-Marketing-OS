# Social Listening Report

An LFX Marketing OS agent that turns LFX Lens social-listening data into actionable
reports for Linux Foundation project and business-unit marketers.

## What it does

One skill, three report types — the agent asks which you need (and infers it when
obvious):

- **Voices That Matter** — ranked high-follower creators and accounts talking about your
  project, topic, or event, with suggested actions (amplify, reply, recruit).
- **Campaign Echo** — did your launch or announcement land? Pickup volume, amplifiers,
  sentiment, and comparison to baseline.
- **Ask-Anything Briefing** — a sourced narrative answer to any question about the social
  conversation ("what were people saying about RISC-V last month?").

Reports are saved as Google Docs in a `Social Listening Reports` Drive folder by default,
so each run can compare against prior reports ("Since last report" section). Falls back
to Word documents if Google Drive isn't connected.

## Requirements

- **LFX connector** (required) — social-listening data via `query_lfx_lens`;
  project lookup via `search_projects`. The Octolens MCP connector is no longer used —
  Octolens data is now integrated into LFX Lens.
- **Google Drive connector** (recommended) — for the Google Doc historical archive.

## Usage

Say things like:

- "Run a Social Listening Report"
- "What are highly followed creators saying about Zephyr this month?"
- "Did the Valkey 9.0 announcement land?"
- "Who amplified our OpenSSF funding news?"

## Notes for pilot users

LFX Lens social listening is project-scoped. If a topic doesn't map to an LFX project,
the agent will say so rather than guess. Sentiment and relevance tags are AI-assigned;
the report spot-checks quoted posts and flags mismatches in its Caveats section.

## Changelog

- **0.2.0** — Switched data source from the Octolens MCP connector to LFX Lens
  (`query_lfx_lens`). Report output reformatted to the LFX Lens reference structure
  (Scope / Verdict / Timeline / Amplification / Sentiment and objections / Comparison /
  Recommendations / Caveats / Sources + metadata footer). Removed Octolens keyword
  management.
- **0.1.0** — Initial Octolens-based version.

## Author

Paul Hinz, The Linux Foundation — v0.2.0
