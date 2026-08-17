# Committee Health workbook spec

Filename: `CommitteeHealth_[Project]_[YYYY-MM].xlsx`. Build with the xlsx skill. All tabs get a frozen header row, autofilter, and sensible column widths. Dates as YYYY-MM-DD. Percentages as whole numbers with % format.

## Tab 1 — Summary

Top block (label/value pairs): project, run date, analysis window, inactivity threshold, committees covered, total reps, rep counts by status, companies without active contact, unfilled entitled seats, drafts awaiting approval.

Below: a 5-row "Most urgent actions" mini-table (Priority, Action, Who/Company, Committee, Owner) mirroring the top of the Outreach Queue. If a prior run was loaded, add a one-line trend note (e.g., "Inactive reps 14 → 11 since 2026-05").

## Tab 2 — Committee Scorecard

One row per committee, sorted by health score ascending (worst first).

| Column | Notes |
|---|---|
| Committee | name |
| Type | Board / TAC / Marketing / SIG / Other |
| Health Score | 0–100 |
| Band | Healthy / Watch / At Risk / Critical |
| Quorum Risk | YES / blank |
| Seats Filled | n |
| Seats Entitled Unfilled | n |
| Active | n |
| Low Activity | n |
| Inactive | n |
| Outdated | n |
| Unverifiable | n |
| Avg Attendance % | window average |
| Meetings Held (window) | n |
| Last Meeting | date |
| Trend | ▲ / ▼ / — vs. prior run |

Conditional formatting on Band: Healthy green, Watch yellow, At Risk orange, Critical red. Quorum Risk YES = red text.

## Tab 3 — Representative Roster

One row per rep per committee, sorted by committee, then participation score ascending.

| Column | Notes |
|---|---|
| Committee | |
| Name | |
| Email | |
| Company | matched member org, or "(unmatched)" |
| Role | chair / voting / observer etc. |
| Status | Active / Low Activity / Inactive / Outdated / Unverifiable |
| Participation Score | 0–100 |
| Attendance | attended / held, plus % |
| Last Activity | date + type (meeting, mailing list, registration) |
| Days Since Activity | n |
| Appointed | date if known |
| Flag Reason | one line, factual |
| Recommended Action | from routing rules, or blank if none |
| Evidence Ref | row ID(s) in Evidence tab |

Conditional formatting on Status: Active green, Low Activity yellow, Inactive orange, Outdated red, Unverifiable gray.

## Tab 4 — Companies Without Active Contact

One row per member company failing the active-contact rule, sorted by priority.

| Column | Notes |
|---|---|
| Company | |
| Membership Tier | |
| Renewal Date | if available |
| Known Contacts | names of inactive/outdated contacts, semicolon-separated |
| Last Known Activity | date, any contact |
| Entitled Seats Unfilled | n |
| Recommended Action | |
| Owner | Marketing / ED |
| Priority | High / Medium / Low |

## Tab 5 — Outreach Queue

One row per planned outreach, sorted by priority then committee health ascending. This tab doubles as the deliverable when email sending is unavailable.

| Column | Notes |
|---|---|
| Priority | High / Medium / Low |
| Outreach Type | Follow-up / Replacement / Seat-fill / Escalation |
| Recipient | name + email |
| Company | |
| Committee | |
| Owner | |
| Subject | drafted subject line |
| Draft Body | full drafted email text |
| Status | Draft / Approved / Sent / Skipped |

## Tab 6 — Evidence

One row per signal supporting any non-Active status, flag, or currency check.

| Column | Notes |
|---|---|
| Ref | E1, E2, … |
| Person / Company | |
| Committee | |
| Signal | e.g., "no attendance in 14 meetings since 2025-09-10" |
| Source | LFX tool name, uploaded filename, or URL |
| Date Collected | run date |

## Tab 7 — Method

Plain-language notes: window and threshold used, scoring weights (and any reweighting from missing sources), sources available/unavailable this run, committees or reps excluded and why, and the prior-run file used for trends (if any).
