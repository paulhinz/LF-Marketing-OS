---
name: run-member-360
description: This skill should be used when a Linux Foundation Executive Director, Project Leader, or LF marketing team member says "Run Member 360", "run the Member 360 report for [project]", "score our members", "which members are most/least engaged", "build the member engagement spreadsheet", "member activity report before the QBR", or otherwise asks to pull together each member's activity across events, speaking, ambassadors, committees, blogs/case studies, and marketing engagement. This is the LFX Marketing OS "Member 360 Agent". It scores every member, identifies engagement gaps, recommends the next best action for Marketing, Member Success, or Sales, and produces a ranked .xlsx spreadsheet — typically run before each quarterly business review.
---

# Member 360 Agent

Produce a ranked member-engagement spreadsheet for an LF project (or all of LF). Every member gets a 0–100 engagement score, a tier, identified gaps, and one recommended next action routed to Marketing, Member Success, or Sales.

Audience: Executive Directors, Project Leaders, and LF marketing team members. Cadence: semi-regular, typically before each quarterly business review.

## Reference files

Read these before executing the corresponding step:

- `references/scoring-model.md` — activity categories, weights, recency decay, tier bands, gap detection, next-best-action routing rules, and priority formula. Read before Step 3.
- `references/spreadsheet-spec.md` — exact tabs, columns, formats, and conditional formatting for the output workbook. Read before Step 5.
- `references/data-sources.md` — where each activity signal lives, which connector/tool retrieves it, and fallbacks when a source is unavailable. Read before Step 2.

## Workflow

### Step 1 — Scope the run

Ask the user (one question, unless already stated):

1. Which project or foundation? (Or "all LF" — warn that all-LF runs take substantially longer and suggest starting with one project.)
2. Analysis window — default to the trailing 12 months, with emphasis on the most recent quarter.

If the user provided the project in their request, confirm and proceed without asking. Resolve the project via the LFX connector (`search_projects`) and pull the member roster (`search_members`, `get_member_membership`) including membership tier, annual value, start date, and renewal date. If prior Member 360 output exists in the working folder (look for `Member360_*.xlsx`), load it to compute trend deltas.

### Step 2 — Collect activity per member

Read `references/data-sources.md`, then gather signals for each member organization across the six activity categories:

1. **Committees & governance** — seats held (board, TAC, marketing/outreach committees), seats entitled but unfilled, meeting attendance rate. LFX connector.
2. **Events** — sponsorships, attendance, booth presence at project/LF events in the window. Uploaded trackers, LFX, web research.
3. **Speaking** — accepted talks, keynotes, panels by member employees at project or industry events. Web research on published speaker lineups; uploaded speaking trackers.
4. **Content & thought leadership** — co-authored blogs, case studies, whitepapers, webinars on project properties. Web research on the project site; uploaded content trackers.
5. **Community programs** — ambassadors, mentorships, certification champions, end-user programs. Uploaded rosters; web research on public ambassador pages.
6. **Marketing engagement & social** — email/campaign engagement (HubSpot, if connected), newsletter participation, social amplification and mentions (social listening connector, if available).

Rules:

- Attribute activity at the member-organization level. Match employees to member orgs by email domain and by LFX key contacts (`get_membership_key_contacts`).
- Record evidence for every non-zero signal (event name + date, talk title, blog URL, committee name). Evidence goes in the workbook's Evidence tab.
- If a source is unavailable (connector not authorized, no tracker uploaded), do not guess. Mark the category "no data" for all members, exclude it from scoring by reweighting the remaining categories, and note the exclusion in the Method tab and final summary.
- Offer once, at the start of Step 2, for the user to attach any trackers they maintain (event sponsor lists, ambassador rosters, speaking trackers, CFP results).
- For rosters above ~40 members, parallelize collection with sub-agents batched by member, each returning the same structured signal set.

### Step 3 — Score, tier, and find gaps

Read `references/scoring-model.md`, then for each member compute:

- Category scores (0–100 each) using the normalization rules, recency decay, and membership-tier expectations.
- Weighted total engagement score (0–100) and engagement tier: Champion / Engaged / Passive / At Risk / Dormant.
- Trend vs. prior run (▲ / ▼ / —) when prior output exists; otherwise leave blank.
- Gaps: unused entitlements first (unfilled board seat, unused event benefits, no case study despite eligibility), then the lowest-scoring categories relative to tier peers. Keep the top 3 per member.

### Step 4 — Recommend the next best action

Apply the routing rules in `references/scoring-model.md`. Each member gets exactly one recommended action, one owner (Marketing, Member Success, or Sales), and a priority (High/Medium/Low) driven by renewal proximity × engagement risk × membership value. Actions must be specific and executable within the coming quarter ("Invite Acme's CTO to keynote KubeCon NA — CFP closes Sept 12"), never generic ("increase engagement").

### Step 5 — Build the spreadsheet

Read `references/spreadsheet-spec.md` and the xlsx skill, then build `Member360_[Project]_[YYYY-QN].xlsx` with the specified tabs: Summary, Member Ranking (primary, sorted by score descending), Category Detail, Actions by Team, Evidence, and Method. Save to the outputs folder and present the file.

### Step 6 — Verify and summarize

Before presenting:

- Re-check that every member in the roster appears exactly once in Member Ranking.
- Spot-check the top 3 and bottom 3 scores against their evidence rows.
- Confirm scores sort descending and weights sum to 100%.

Close with a short summary: member count, score range, tier distribution, the 3 most urgent actions, and any data sources that were unavailable this run (so the user can connect them for next quarter).

## Style

- Never fabricate activity. Every claim in the workbook traces to a connector record, an uploaded tracker row, or a cited URL.
- Keep chat output brief; the workbook is the deliverable.
- When data is thin, say so plainly and ship the report with what exists — a partial Member 360 before a QBR beats a complete one after it.
