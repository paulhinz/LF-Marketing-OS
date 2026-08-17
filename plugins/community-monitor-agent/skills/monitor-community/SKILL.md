---
name: monitor-community
description: This skill should be used when a Linux Foundation Executive Director, Project Leader, or project marketing leader says "Run Community Monitor", "set up community monitoring for [project]", "monitor our Slack channels", "monitor our GitHub repos", "any community questions today?", "what's the community asking?", "who needs a response?", or otherwise asks to watch specific Slack channels or GitHub repositories for community questions and help respond. Also trigger, without re-asking setup questions, when a `.community-monitor/config.json` exists in the working folder and the request is a scheduled run (e.g. "Run Community Monitor for [project] (scheduled run)"). This is the LFX Marketing OS "Community Monitor Agent". It collects new messages, questions, and issues from the configured channels and repos, ranks them by sentiment and by the asker's value to the community, drafts replies for high-value askers, and delivers a live report where each drafted Slack reply can be sent with one click. It never sends anything without that explicit click or an explicit approval in chat.
---

# Community Monitor Agent

Monitor a project's Slack channels and GitHub repositories on a schedule the user controls. Surface the community questions that need answers, rank them by sentiment and by who is asking, draft replies for high-value askers, and deliver everything in a live report where a drafted Slack reply is one click away from being posted. Requested by Jen Royal-Jones: "Answering daily community questions that can be sourced from GitHub repositories, and exclusive Slack channels."

Audience: any LF project leader or project marketing leader. Cadence: user-defined — typically 1–3 scheduled runs per weekday, plus on-demand runs.

## Reference files

Read these before executing the corresponding step:

- `references/priority-model.md` — question detection, sentiment scoring, asker-value scoring, and priority tiers. Read before Step 4.
- `references/report-spec.md` — the live HTML report artifact: layout, one-click Slack reply mechanics, GitHub reply handling, and safety rules. Read before Step 6.

## Workflow

### Step 1 — Load or create the configuration

Look for `.community-monitor/config.json` in the working folder. If it exists and this is a scheduled or repeat run, load it and skip to Step 3.

Otherwise run setup. Ask the user (one round of questions, skipping anything already stated):

1. **Project** — which LF project or foundation? Resolve via the LFX connector (`search_projects`, `get_project`) when available.
2. **Slack channels** — which channels to watch? Verify each with `slack_search_channels` and record channel IDs. If the Slack connector is not connected, tell the user to connect it and continue with GitHub only.
3. **GitHub repositories** — which repos (owner/name) to watch? Public repos are read via the GitHub REST API without credentials. Note: GitHub Discussions require an authenticated token; without one, monitor issues, issue comments, and PR comments only, and say so.
4. **Report mode** — one of:
   - `full` — digest of all new communications.
   - `priority` — only items deemed high priority by the priority model.
   - `respond` — high-priority items plus auto-drafted replies for high-value askers, with one-click send.
5. **Schedule** — how many times per day and at what times (e.g. weekdays at 8am and 2pm)? Or on-demand only.

Save all of it to `.community-monitor/config.json`, including a `last_run` ISO timestamp (initialize to 24 hours ago) and a `handled_ids` list of item IDs already reported or replied to.

### Step 2 — Set up the schedule

If the user chose a schedule, create one scheduled task per daily run time using the scheduled-tasks tools (e.g. `cronExpression` `0 8 * * 1-5` for weekdays at 8am), with the prompt: `Run Community Monitor for [project] (scheduled run)`. Confirm what was scheduled and remind the user they can say "change my community monitor schedule" any time (update via `update_scheduled_task`).

### Step 3 — Collect new communications since last run

Collect everything newer than `last_run`, excluding IDs in `handled_ids`:

1. **Slack** — for each configured channel, `slack_read_channel` for new messages; `slack_read_thread` for threads with new activity; `slack_read_user_profile` for each distinct asker (name, title, company). Skip messages authored by the user or by bots.
2. **GitHub** — for each repo, fetch via the REST API (`https://api.github.com`): new/updated issues (`/repos/{owner}/{repo}/issues?since={last_run}&state=all`), new issue comments (`/repos/{owner}/{repo}/issues/comments?since={last_run}`), and PR review comments if the user opted in. Capture author login, body, URL, and timestamps.
3. Normalize every item to: source, channel/repo, permalink, author, author profile hints (company, title), text, timestamp, thread context (fetch enough of the thread to understand the question), and whether it already has an answer from a maintainer or teammate (if so, mark answered and exclude from the response queue).

Never fabricate content. If a source is unavailable (connector disconnected, API rate-limited), report the gap explicitly rather than guessing.

### Step 4 — Score and rank

Read `references/priority-model.md`, then for each unanswered item compute:

- **Question/urgency signal** — is it a question, help request, bug report, or blocked user?
- **Sentiment** — negative/frustrated ranks above neutral; positive items are amplification opportunities, not response priorities.
- **Asker value (0–100)** — community activity (committee seats, meeting attendance, contribution history via the LFX connector where available) plus member-company association (match the asker's company or email domain to project members via `search_members` / `search_b2b_orgs`; weight by membership tier).
- **Priority tier** — P1 (respond today), P2 (respond this week), P3/FYI.

In `priority` and `respond` modes, only P1 and P2 items go in the main report; everything else is a one-line count. In `full` mode, include all items grouped by source, still sorted by priority.

### Step 5 — Draft replies (respond mode only)

For each P1/P2 item from a high-value asker, draft a reply that:

- Answers from real project knowledge only: the thread itself, the project's docs/README, the project's Message Foundation doc if present in the working folder, and prior answers to the same question found in the channel or repo. If the correct answer is unknown, draft an acknowledgement that routes to the right person or asks a clarifying question — never invent technical answers.
- Matches channel norms: short and conversational for Slack (mrkdwn), fuller with links for GitHub (markdown).
- Is written to be sent as the user, so keep their voice plain and direct.

Drafts are never sent automatically. Sending happens only via the user's click in the report (Slack) or explicit approval in chat.

### Step 6 — Deliver the report

Read `references/report-spec.md`, then:

1. Create or update one persistent live artifact named `Community Monitor — [Project]` containing the run report. Before first building it, probe the exact Slack send tool in chat once to confirm its name and parameters, and list that tool in the artifact's `mcp_tools`.
2. Each high-priority item is a card: question summary, permalink, asker with value badge and evidence, sentiment, and (respond mode) the drafted reply in an editable text area with a **Send to Slack** button (one click posts the reply into the original thread) or, for GitHub, a **Copy reply** button plus an **Open on GitHub** link.
3. Post a short summary in chat: counts by tier, top 3 items, and anything that needs the user rather than the agent.
4. Update `.community-monitor/config.json`: set `last_run` to now and append reported item IDs to `handled_ids`.

### Step 7 — Verify

Before finishing: confirm every permalink in the report resolves to the right message or issue, confirm no reply was sent without a user click or explicit approval, confirm drafted replies contain no invented facts (each claim traceable to a thread, doc, or prior answer), and confirm the config file was updated so the next scheduled run doesn't re-report the same items.
