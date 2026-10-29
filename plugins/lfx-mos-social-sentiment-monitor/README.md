# Social Sentiment Monitor

An LFX Marketing OS monitoring agent that watches social mentions of one Linux Foundation
project or foundation and raises two kinds of alerts: posts with negative sentiment, and
posts getting unusually high engagement or reach. For each item that warrants a response it
drafts a reply and recommends who should post it. Runs once on demand, or on a schedule.

## What it does

1. **Interview** — asks which project or foundation to monitor (umbrellas such as CNCF can be
   monitored whole, foundation-only, or top projects by volume), how often to run, how many
   days back to review, and where to deliver (chat, LF-template Word document, Slack DMs to
   named people, a Slack channel, email).
2. **Detect** — compares the lookback window with a baseline four times its length: negative
   sentiment items ranked by reach, negative spike (count or share versus baseline), volume
   spike, high-engagement outliers (likes, reposts, upvotes, comments, views when available),
   reach outliers (author followers), and single-item escalations from 100k+ follower accounts.
   Automated reply bots tagged `ai_generated` are excluded from escalation.
3. **Brief** — Green / Amber / Red status, numbers versus baseline, escalations, top negative
   posts with tags and links, high-engagement posts (positive ones flagged for amplification),
   themes, and data notes with the compiled SQL.
4. **Reply drafts** — three to five sentence drafts for each item that merits a response, each
   with a recommended voice: foundation account, Executive Director, technical lead (maintainer
   or SIG lead), ambassador, or project social account. All drafts are for human review.
5. **Deliver** — the brief in chat; a `.docx` on the LF Agent DOCS Template (re-skinned with
   the foundation's Brand Kit when one exists); a Google Drive link or Slack Canvas; and Slack
   DMs to each named recipient with the condensed brief and the document link.
6. **Schedule** — after the first interactive run, creates a scheduled task that repeats the
   run with the same scope, thresholds and recipients.

## Data sources

| Path | Tool | Coverage | Strengths | Limits |
|---|---|---|---|---|
| A. LFX Lens (Snowflake) | `query_lfx_lens` on `SILVER_FACT.SOCIAL_LISTENING_MENTIONS` | Every LF project Octolens tracks (~100) | Sentiment, relevance, project mapping, author followers, umbrella roll-ups | No per-post likes/comments/views; lags about one day |
| B. Octolens MCP | `list_mentions`, `list_negative_mentions`, `mentions_summary` | Only projects whose keywords are in the connected Octolens workspace | Live engagement counters for X and Reddit | Workspace-scoped; no counters for other platforms |

The skill routes automatically: Path A for every project; Path B added when the project's
keywords exist in the connected Octolens workspace. When Path B is unavailable the engagement
section is labelled as a follower-based reach proxy.

## Requirements

- **LFX connector** (required) — `query_lfx_lens`, `search_projects`, `send_email`.
- **Octolens MCP** (optional) — live engagement counters for workspace projects.
- **Slack connector** (optional) — DMs and channel posts. The connector cannot upload files,
  so the document is shared by link (Google Drive) or as a Slack Canvas.
- **Google Drive connector** (optional) — hosts the `.docx` for the Slack link.
- **lf-output-formatter** plugin — builds the Word document on the LF Agent DOCS Template.
- **Scheduled tasks** — recurring runs happen while the Claude desktop app is open.

## Usage

Say things like:

- "Run the social sentiment monitor"
- "Set up sentiment alerts for CNCF"
- "Watch for negative posts about PyTorch and DM Jane Doe each morning"
- "Alert me when a post about MCP blows up"

## Changelog

- **0.1.0** — Initial release: hybrid LFX Lens + Octolens MCP detection, reply drafts with
  recommended voices, LF-template document, Slack DM delivery, scheduling.

## Author

Paul Hinz, The Linux Foundation — v0.1.0
