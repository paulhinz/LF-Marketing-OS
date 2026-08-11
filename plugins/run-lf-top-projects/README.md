# run-lf-top-projects

Ranks Linux Foundation umbrella foundations and hosted projects by size, and exports
the ranking to a Google Sheet.

## What it does

On request (or the exact command `run-lf-top-projects`), Claude will:

1. Enumerate every top-level foundation/project under The Linux Foundation in LFX.
2. Screen each one for active membership count and total annual membership revenue.
3. Rank by revenue and take the top N (you choose N; default 25).
4. Pull corrected, verified sub-project counts for the finalists (the raw LFX metric
   under-counts for many multi-project foundations — this skill knows to check).
5. Call out The Linux Kernel Organization separately, since it doesn't participate in
   LFX's tiered membership model and would otherwise look misleadingly small.
6. Export the result as a Google Sheet in a Drive folder you specify.

## Requirements

- **LFX MCP connector** must be connected (uses `search_projects`, `query_lfx_lens`,
  `search_members`).
- **Google Drive connector** must be connected (uses `create_file` to produce the
  output Sheet).

## Usage

Just say `run-lf-top-projects`, or ask something like "rank LF foundations by size" or
"how big is CNCF compared to other LF foundations." Claude will ask you:

- How many foundations to rank (default 25, with an option for a fuller list of the
  next 15 smaller ones)
- Which Google Drive folder to save the output Sheet into

Every run pulls fresh data from LFX — membership counts and revenue change
continuously, so don't expect identical numbers run to run.

## Notes

This was built from a manual research pass done for a "largest LF foundations/projects
by value, project count, and membership" request. See `skills/run-lf-top-projects/`
for the full workflow and `references/` for known stable IDs and calibration notes on
where the underlying LFX tools are unreliable.
