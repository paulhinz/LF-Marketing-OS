# Community Monitor Agent

LFX Marketing OS agent for any LF project leader or project marketing leader. Specified by Jen Royal-Jones: "Answering daily community questions that can be sourced from GitHub repositories, and exclusive Slack channels."

## What it does

Watches the Slack channels and GitHub repositories you choose, on a schedule you set (e.g. weekdays at 8am and 2pm). Each run it collects new community questions, ranks them by sentiment and by the asker's value to the project (their community activity and their member-company standing), and delivers a live report. For high-value askers it drafts replies — you review, optionally edit, and send each Slack reply with one click from the report. Nothing is ever sent without that click.

## How to use it

Say **"Run Community Monitor"** or "set up community monitoring for [project]". First-run setup asks for:

- the project, Slack channels, and GitHub repos to watch
- report mode: `full` digest, `priority` only, or `respond` (priority + drafted replies)
- schedule: times per day, or on-demand only

After setup, scheduled runs happen automatically and refresh the same live report. Say "change my community monitor schedule" or "switch to respond mode" any time.

## What you get

- A persistent live report (`Community Monitor — [Project]`) with a prioritized queue: question, link, asker with value evidence, sentiment, and — in respond mode — an editable drafted reply with a **Send to Slack** button. GitHub replies get a copy button and a link, since GitHub has no connector yet.
- A short chat summary each run.
- A `.community-monitor/config.json` in your working folder holding your channels, repos, mode, schedule, and what's already been handled, so runs never re-report the same items.

## Requirements

- Slack connector (slack-by-salesforce) connected, for Slack monitoring and one-click replies.
- Public GitHub repos are read without credentials (issues and comments; Discussions need a token).
- LFX connector recommended — it powers asker-value scoring (committees, meetings, membership tiers). Without it, scoring falls back to profile and GitHub evidence and is labeled accordingly.
