# Stat Bank re-verification

A Message Foundation's Stat Bank (the S-ID ledger) is the one part of the package that is already machine-checkable: each row names a figure, a grain, a window, a source and a type. Re-running it is the highest-value ten minutes in the QA pass, and it is how a wrong number is stopped before a board deck inherits it.

## Rules

- Re-verify every row, not a sample. The rows most likely to be wrong are the ones nobody looks at (S19+, the "TBD" rows, the third-party dates).
- Exact match for counts and money (memberships, tiers, list price, committees, meetings). Any difference is a finding — the Stat Bank must equal what LFX returns on the verification date, or say why not.
- Published counters (a project homepage's "last 30 days" tiles) are expected to move. Refetch, restamp with the new figure and date, and confirm the document's refresh rule is stated ("refresh at each use; always quote the window and the date read").
- Third-party facts (RFCs, dates, press releases) are checked against the primary source, never against another marketing document or a summary of the source.
- Read `read_lfx_standard_metrics_guidance` once per session before the first metrics call; resolve slugs with `search_projects` and never guess one.

## Which tool answers which row

| Claim type in the Stat Bank | Tool and parameters | Notes |
|---|---|---|
| Distinct member organizations ("N member organizations") | `query_lfx_standard_metrics` metric `member_organizations`, `project=<foundation slug>` | Status-based on today; organizations, not memberships |
| Memberships by tier, and list-price value by tier | `query_lfx_standard_metrics` metric `memberships`, `by=tier`, `project=<foundation slug>` | Revenue column is list price, never dues billed; do not divide by organizations |
| Full roster by name and tier | `search_members` `project_uid=<foundation uid>`, `page_size=100` | Active by default; count the rows per `tier_name`; compare every name |
| New memberships by month | `query_lfx_standard_metrics` metric `new_members`, `project=<foundation slug>`, `period=month` | Install date; last row is month-to-date (`partial_last_period`) |
| Members at a past date (for example "40 at launch") | `query_lfx_standard_metrics` metric `member_organizations`, `end_date=<date>` | Date-based reading; say "as of <date>" |
| Contributors, contributing organizations | `query_lfx_standard_metrics` metric `contributors` / `contributing_organizations`, `project=<technical slug>` and `<foundation slug>` | A zero usually means the GitHub org is not onboarded to LFX Insights, not that nobody contributes; say which |
| Committees onboarded | `count_lfx_resources` type `committee`, `parent=project:<foundation uid>`; then `search_committees` to name them | Count includes staff or non-governance groups; name them before using the count as a governance proof point |
| Past meetings | `count_lfx_resources` type `v1_past_meeting`, `tags=["project_slug:<foundation>", "project_slug:<technical>"]` | Only meetings onboarded to LFX Meetings; a floor |
| Social listening | `query_lfx_standard_metrics` metric `social_mentions`, `project=<foundation slug>` | Zero usually means no keywords configured; say so |
| Formation dates, legal entity, charter | `search_projects` / `get_project` | See entity-lint.md |
| Homepage counters | Fetch the homepage on the verification date | Quote window and date |
| README facts (SDK languages, packages, schemes, warnings) | Fetch the raw README from the repository's default branch | Count the packages yourself |
| License | Fetch `LICENSE` in the repository and the technical charter | Close any "confirm license" open item once both agree |
| Press-release facts (member count at launch, names, quotes, dates) | Fetch the LF press release, not a news summary of it | Count the named members per tier |
| Standards dates (RFCs) | Fetch the RFC from rfc-editor.org | HTTP/1.1 is RFC 2068 (January 1997) first, RFC 2616 (June 1999) second, RFC 9110 (June 2022) current |

## Verification stamp table

Produce one row per Stat Bank ID:

```
| ID | Claim (as stated) | Verified value | Source used | Verified at (UTC) | Status |
```

Status vocabulary: MATCH, MOVED (published counter refreshed), MISMATCH (state both values), UNVERIFIED (say what would verify it), NOT ONBOARDED (LFX has no data yet; give the onboarding step).

## Reading the results

- `applied` block first: it says which scope and window actually ran. Quote the figure with that scope in the report.
- Distinct counts never sum across rows; a tier breakdown that happens to sum to the organization count (each org holds one membership) is a coincidence to note, not a rule to rely on.
- A monthly series that "adds up" to the total is expected on new_members (additive) and is a good cross-check against the roster's start dates.
- When a figure changes the meaning of a sentence elsewhere ("53 companies" when 12 are nonprofits), carry the finding into the brand review as a wording issue, not just a data issue.

## Worked example — x402, verified 2026-09-16

| ID | Claim | Verified | Source | Status |
|---|---|---|---|---|
| S1 | 53 member organizations | 53 (17 + 3 + 21 + 12, every name matched) | `search_members`, x402 Foundation | MATCH |
| S2–S4 | 17 Premier / 24 General / 12 Associate | 17 / 24 (3 at 250–2,500, 21 at 1–249) / 12 | `search_members` tier names | MATCH |
| S5 | $4.075M list price | 17×$200K + 3×$50K + 21×$25K = $4.075M | tier `annual_full_price` | MATCH (list price; keep out of agency-facing copies) |
| S6 | 11/13/8/9/9/3 new memberships Apr–Sep | 11/13/8/9/9/3 | `new_members` period=month | MATCH (September month-to-date) |
| S7 | 40 members at launch | 40 per LF release; LFX cumulative 32 end-June, 41 end-July | LF press release 2026-07-14 | MATCH |
| S8 | 27 past meetings | 27 | `count_lfx_resources` v1_past_meeting | MATCH (floor) |
| S9 | 4 committees | 4: Governing Board, TSC, Marketing, Staff | `search_committees` | MATCH — but one is the LF staff group; say "three governance committees" if used as a proof point |
| S10–S13 | 75.41M / $24.24M / 94.06K / 22K, last 30 days | same, as displayed 2026-09-16 | x402.org | MATCH (refresh at each use) |
| S14–S16 | 3 SDK languages, 9 chain packages, 3 schemes | 3 / 9 (evm, svm, avm, aptos, casper, stellar, tvm, hedera, keeta) / 3 | README | MATCH |
| S19, S20 | contributors, contributing orgs "TBD" | 0 on both slugs | `contributors` | NOT ONBOARDED (onboard github.com/x402-foundation to LFX Insights) |
| S21 | Mar 31 / Apr 2 / Apr / Jul 14, 2026 | Mar 31, Apr 2 (LFX); Apr 2 intent release; Jul 14 launch release | LFX + LF press releases | MATCH (intent-to-launch release is dated April 2, 2026) |
| S22 | Contributed by Coinbase | "the completed contribution of the x402 protocol by Coinbase" | LF press release 2026-07-14 | MATCH |
| S23 | 17 Premier named at launch | same 17 names | LF press release | MATCH |
| S24 | 402 reserved since HTTP/1.1, 1999, RFC 2616 | HTTP/1.1 first published as RFC 2068, January 1997, with 402 Payment Required listed; RFC 2616 (1999) is the revision | rfc-editor.org | MISMATCH — fix the year; the "27 years" sound bite inherits the error |
| S25 | social mentions "TBD" | 0 | `social_mentions` | NOT ONBOARDED (configure keywords in LFX Lens) |
| — | License Apache 2.0 (open item) | Apache-2.0 in LICENSE and in the charter | GitHub, charter | MATCH — close the open item |
