# Member 360 workbook specification

Filename: `Member360_[Project]_[YYYY-QN].xlsx` (e.g. `Member360_CNCF_2026-Q3.xlsx`). Build with the xlsx skill. Freeze header rows, add autofilter to every data tab, and use table formatting.

## Tab 1 — Summary

One-page QBR view, no scrolling:

- Project name, analysis window, run date, member count, total membership value.
- Tier distribution (count of Champions / Engaged / Passive / At Risk / Dormant) as a small table plus bar chart.
- Movers: top 3 score gainers and top 3 decliners vs. prior run (omit section if no prior run).
- Watchlist: members with renewal ≤ 120 days, sorted by engagement score ascending.
- Action load per team: count of recommended actions for Marketing / Member Success / Sales, High-priority count per team.
- Data coverage note: which sources fed the run, which were unavailable.

## Tab 2 — Member Ranking (primary tab)

One row per member organization, sorted by Engagement Score descending. Columns:

| # | Column | Notes |
|---|---|---|
| 1 | Rank | 1 = most active |
| 2 | Member Organization | |
| 3 | Membership Tier | Platinum / Gold / Silver / etc. |
| 4 | Annual Value | currency format |
| 5 | Renewal Date | date format |
| 6 | Days to Renewal | conditional format: red ≤ 120, amber ≤ 240 |
| 7 | Engagement Score | 0–100, one decimal; 3-color scale (red→yellow→green) |
| 8 | Engagement Tier | Champion / Engaged / Passive / At Risk / Dormant; color-coded fill |
| 9 | Trend | ▲ / ▼ / — vs. prior run |
| 10 | Committees Score | 0–100 |
| 11 | Events Score | 0–100 |
| 12 | Speaking Score | 0–100 |
| 13 | Content Score | 0–100 |
| 14 | Community Programs Score | 0–100 |
| 15 | Marketing & Social Score | 0–100 |
| 16 | Last Meaningful Engagement | date + short description ("2026-06-14 — sponsored Open Source Summit") |
| 17 | Engaged Contacts | count of distinct active individuals; flag "1 (single-threaded)" in red |
| 18 | Key Contact | name, title, email of primary contact |
| 19 | Top Gaps | up to 3, semicolon-separated, unused entitlements first |
| 20 | Recommended Next Action | one specific, dated, executable action |
| 21 | Action Owner | Marketing / Member Success / Sales |
| 22 | Priority | High / Medium / Low; High = red fill |

Columns 10–15 get a shared 3-color scale so the row reads as a heat-strip — gaps become visible at a glance.

## Tab 3 — Category Detail

One row per member; for each of the six categories: raw activity count, recency-weighted count, tier-peer median, and normalized score. Include "no data" (distinct from 0) where a source was unavailable.

## Tab 4 — Actions by Team

The action list regrouped for handoff — sorted by Owner, then Priority, then Days to Renewal: Owner, Priority, Member, Engagement Tier, Days to Renewal, Recommended Action, Supporting Rationale (one line citing the triggering rule and evidence), Suggested Deadline. This tab is designed to be split and pasted directly into each team's queue.

## Tab 5 — Evidence

One row per recorded activity: Member, Category, Date, Description, Source (connector name, tracker filename, or URL). Every non-zero signal in Category Detail must have at least one evidence row.

## Tab 6 — Method

Analysis window, run date, category weights used (including any reweighting for missing sources), tier baselines, routing-rule table version, data sources used and unavailable, and any user-specified overrides. This makes quarter-over-quarter runs comparable and auditable.
