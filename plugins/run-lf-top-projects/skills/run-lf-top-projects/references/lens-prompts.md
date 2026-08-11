# query_lfx_lens prompt templates

## Screening pass (Step 4) — member count + revenue only

Use this exact prompt for every candidate during the first-pass screen. Keep it short;
this is the call you're making dozens of times, so don't pad it with the sub-project
ask (that's handled separately and more reliably in Step 5).

```
Give me: active technical subproject count, active membership count, and total annual
membership revenue (sum of price for active memberships). Three numbers.
```

Call with `project_slug` set to the candidate's slug. Expect a small markdown table
back with columns roughly matching `ACTIVE_SUBPROJECT_COUNT`, `ACTIVE_MEMBERSHIP_COUNT`,
`TOTAL_ANNUAL_REVENUE` (exact column names vary run to run — read them, don't assume
fixed keys). Use only the membership count and revenue from this call; ignore the
subproject count here per Step 5.

## If a lens call times out or errors

`query_lfx_lens` can occasionally fail with a context-deadline-exceeded error,
especially on large foundations. Retry once with a shorter prompt. If it fails a
second time, fall back to paginating `LFX:search_members` directly for that one
foundation (summing the `price` field across all `status: "Active"` records) rather
than leaving it out of the ranking.

## Do not use this prompt for cross-foundation totals

`query_lfx_lens` and `query_lfx_semantic_layer` are both scoped to a single
foundation's own data via the required `project_slug` parameter — there is no way to
ask either tool for a cross-foundation aggregate in one call. Confirmed by testing:
passing `project_slug: "tlf"` (The Linux Foundation itself) does not return
cross-foundation data; it returns an explicit "I can only access data within [this]
foundation" message, or requires the where-clause project filter to match the passed
slug. Enumeration always has to happen via Step 2's `search_projects` parent/child
walk, not via a lens/semantic-layer query.
