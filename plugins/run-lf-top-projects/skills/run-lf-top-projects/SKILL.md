---
name: run-lf-top-projects
description: >
  Ranks Linux Foundation umbrella foundations/projects by total sub-projects, total
  active members, and total annual membership revenue, then exports the ranked list to
  a Google Sheet. Trigger on the exact phrase "run-lf-top-projects", or on requests like
  "run the LF top projects report", "rank LF foundations by size", "update the LF top
  projects sheet", "how big is [some LF foundation] compared to others", or any request
  to size/rank/compare Linux Foundation projects or foundations by membership, project
  count, or revenue.
---

# Run LF Top Projects Report

Produce a ranked list of Linux Foundation umbrella foundations and hosted projects,
sized by three metrics — total sub-projects, total active members, total annual
membership revenue — and deliver it as a Google Sheet.

## Before starting

Confirm two things with the user if not already stated in their request. Ask both in
one short message; don't block on defaults if the user seems to want you to just go:

1. **How many entities to rank.** Default: top 25, plus (if they want a fuller
   reference list) the next 15 smaller foundations evaluated but not in the top tier.
2. **Destination Google Drive folder.** Required every run — a Drive folder URL or ID
   to save the output Sheet into. Never reuse a folder ID from a previous run without
   the user confirming it's still the right destination.

Do not ask about ranking methodology, which LFX tools to use, or how to handle The
Linux Kernel Organization — those are fixed by this skill (see below).

## Step 1: Load the LFX tools

Search for and load these deferred LFX MCP tools before proceeding:
`LFX:search_projects`, `LFX:query_lfx_lens`, `LFX:search_members`. Also load
Google Drive's `create_file` tool for the export step.

If the LFX or Google Drive connectors aren't available, tell the user which one is
missing and stop — don't attempt this with web search or guessed data.

## Step 2: Enumerate every top-level foundation/project

Call `LFX:search_projects` with `parent_uid` set to The Linux Foundation's root UID
(see `references/known-ids.md`) and `page_size: 100`. Follow `page_token` until it
stops appearing — there are roughly 100 top-level entities, so expect 2-3 pages.

This full list is the candidate pool for every run. Don't re-derive the parent UID by
searching for a foundation name each time; use the stored one.

## Step 3: Exclude and flag The Linux Kernel Organization

Slug `korg`. Always exclude it from the ranked list itself, but always include it as a
called-out, unranked entry with an explanatory note (see `references/known-ids.md` for
the exact wording). It has 0 members / $0 revenue in LFX because kernel.org is funded
through direct corporate/individual contributions to the Kernel Fund and
infrastructure, not LFX's tiered membership model — not because it's small. Ranking it
normally would be misleading.

## Step 4: First-pass screen (fast)

From the remaining candidates, prioritize entities that are `stage: "Active"`,
`public: true`, and have a `funding_model` including `"Membership"` — these are the
ones with a real LFX membership program. For each, run one `LFX:query_lfx_lens` call
using the prompt template in `references/lens-prompts.md` (project_slug = the
foundation's slug) to get active membership count and total annual membership revenue
in a single call. This is the expensive part of the workflow — budget one call per
candidate, and don't retry unless the call errors out.

Sort all screened candidates by annual revenue, descending. This determines the
ranking and which entities make the requested cutoff(s) (e.g., top 25, next 15).

## Step 5: Correct the sub-project counts for finalists only

**Do not trust the lens tool's sub-project count** — it frequently reports "1" for
foundations that actually host dozens of technical projects (confirmed by spot-checks
against PyTorch, FINOS, and LF AI & Data, where the true active count was 5, 55, and 60
respectively). Only do this correction for entities that made the final cutoff, not
the full candidate pool — it's not worth the calls otherwise.

For each finalist, call `LFX:search_projects` with `parent_uid` set to that
foundation's UID, `page_size: 100`, paging through all results. Count entries with
`stage: "Active"` as the sub-project count. If the result set is empty, the foundation
has no registered children — record the count as its own single project (1) if it
otherwise has a real membership program, or 0 if the lens screen showed no
membership/revenue either.

## Step 6: Compile and export

Build a CSV with columns: `Rank, Foundation / Project, Total Active Sub-Projects,
Total Active Members, Total Annual Membership Revenue (USD), Website Slug, Notes`.
Use the Notes column for anything a reader would otherwise misinterpret — e.g. a
foundation with very few members but very high revenue (large anchor sponsors), or a
foundation whose real sub-project list is much larger than what's active/public.

Upload via `Google Drive:create_file`:
- `textContent` or `base64Content`: the CSV
- `contentMimeType`: `text/csv`
- `parentId`: the folder ID/URL the user gave you (extract the ID from the URL — it's
  the path segment after `/folders/`)
- `title`: something like `LF Top {N} Foundations - Projects, Members, Value`
- Leave `disableConversionToGoogleType` unset so Drive converts it to a native Sheet.

Share the resulting `viewUrl` with the user. Don't add long postamble — the link is
the deliverable.

## Notes on repeat runs

Every run should re-pull live data — don't reuse revenue/member/project numbers from a
previous run's memory, since LFX membership data changes continuously. If the user
asks for a delta/comparison against a prior run, ask them for that prior Sheet's link
so you can diff against it rather than trusting your own recollection.
