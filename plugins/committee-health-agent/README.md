# Committee Health Agent

LFX Marketing OS agent for Linux Foundation Executive Directors, Project Leaders, and their marketing leadership teams. Specified by Jen Royal-Jones.

## What it does

Monitors committee participation across an LF project, flags inactive or outdated representatives, identifies member companies without an active contact, and drafts follow-up or replacement outreach — always for your review before anything is sent.

## How to use it

Say any of:

- "Run Committee Health for [project]"
- "Who's inactive on our committees?"
- "Which member companies have no active contact?"
- "Audit our committee rosters"

The agent scopes the run (project, committees, analysis window, inactivity threshold), pulls rosters and meeting attendance from LFX, scores every representative and committee, and delivers:

1. **`CommitteeHealth_[Project]_[YYYY-MM].xlsx`** — Summary, Committee Scorecard, Representative Roster, Companies Without Active Contact, Outreach Queue, Evidence, Method.
2. **Outreach drafts** — follow-up, replacement, and seat-fill emails, presented for approval. Nothing is sent until you approve.

## Defaults (overridable each run)

- All committees of the project
- Trailing 12 months of meeting history
- Inactive = no participation in 180 days
- Outreach mode: draft for review

## Requirements

- **LFX Platform connector** (required) — committees, rosters, meetings, memberships, key contacts, email.
- Optional: Google Drive (find rosters/trackers), HubSpot (reachability signals), uploaded roster spreadsheets.

## Cadence

Run monthly or before board meetings and QBRs. The agent detects prior runs in the working folder and reports trends, and can be set up as a recurring scheduled task.
