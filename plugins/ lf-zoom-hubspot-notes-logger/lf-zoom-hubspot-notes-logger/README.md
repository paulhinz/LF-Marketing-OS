# Zoom → HubSpot Notes Logger

A Linux Foundation Marketing and Sales plugin for Cowork/Claude Code. Pulls a team member's Zoom meeting notes for today and yesterday and writes them into the matching **HubSpot meeting record** — the meeting-notes log that follow-up tasks and pipeline hygiene depend on.

This started as a single-user membership-sales workflow and was generalized so any Linux Foundation Marketing or Sales team can run it against their own Zoom and HubSpot accounts, on any project — not just membership sales.

## What it does

Say **"sync my zoom notes to hubspot"** (or "log today's meetings in hubspot," "run the notes sync") and the agent will:

1. Resolve who's running it — HubSpot owner ID and Slack user ID, automatically, at the start of every run — so nobody's personal IDs are hardcoded.
2. Pull today's and yesterday's qualifying Zoom meetings and resolve each one to a company via HubSpot.
3. Draft the notes block — performance feedback, a BANT-based Meeting Summary recommendation, and a Challenger Sales Strategy angle — then show a short preview and ask for one go-ahead before writing anything.
4. Write the notes into the matching HubSpot meeting record, open a follow-up task on anything marked an opportunity, and flag anything ambiguous over Slack instead of guessing.

The recommendation logic runs a plain Budget/Authority/Need/Timeline read rather than a membership-tier read, so it holds up for any LF project's sales or marketing motion.

## Where this fits

This plugin doesn't create pipeline or deals — it assumes a HubSpot meeting record already exists (or falls back to Google Calendar to build one) and writes into it. It pairs with whatever process already schedules and holds the call; its job starts once the call is over and a Zoom summary exists.

## Guardrails

Every note this skill writes is additive and traceable back to a real Zoom meeting. It never overwrites existing HubSpot notes, never touches the customer-facing `hs_meeting_body` field, and never invents a recommendation the meeting itself didn't support — a genuinely ambiguous match gets flagged over Slack rather than guessed at.

## Tested against

The AAIF membership pipeline at the Linux Foundation, across several days of live meetings, before being generalized for broader Marketing/Sales use.

## Roadmap

Today this only reads Zoom as its meeting-notes source. A future version could accept other notetakers (Fireflies, Gong) behind the same extraction step, without changing anything downstream.

## Installing

Drag the `.plugin` file into Cowork, or install via Claude Code's plugin system. No API keys are required, but each person running the skill needs their own Zoom, HubSpot, Slack, and Google Calendar connections already authenticated. Before first use, open `skills/zoom-hubspot-notes-sync/SKILL.md` and update the placeholder HubSpot portal ID and default timezone in the Setup section — everyone's owner ID and Slack ID resolve automatically after that.
