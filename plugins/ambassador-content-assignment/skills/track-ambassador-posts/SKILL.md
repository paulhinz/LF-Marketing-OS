---
name: track-ambassador-posts
description: >
  This skill should be used when a Linux Foundation project or foundation marketing team
  member says "track ambassador posts", "who has posted so far", "update the ambassador
  tracker", "did the ambassadors post about [event]", "which ambassadors haven't posted",
  "run the ambassador posting check", or otherwise asks to verify whether a community's
  ambassadors published their assigned event content. This is the LFX Marketing OS
  "Ambassador Content Agent" tracking phase. Uses LFX Lens social listening to detect
  posts, matches them to ambassadors, updates the assignment tracker spreadsheet, and
  drafts nudges for non-posters.
metadata:
  version: "0.2.0"
  author: "The Linux Foundation"
---

# Track ambassador posts

Detect which ambassadors have actually posted their assigned event content, update the tracker, and draft gentle nudges for those who have not.

## Step 1 — Load the tracker

Locate the assignment tracker spreadsheet produced by the build-ambassador-content-plan skill (ask the user for it if it is not in the working folder). Read the "Assignments" sheet: ambassador names, social handles, assigned sessions, post windows, and current Status.

## Step 2 — Pull event mentions from LFX Lens

Use the LFX connector's `query_lfx_lens` tool with the project slug (e.g., `cncf`):

- Ask for social media mentions containing the event keywords (event name, official hashtags — e.g., "KubeCon", "#KubeCon", "CloudNativeCon") within the relevant date window, returning author name, author handle/username, platform, post URL, post date, and post text snippet. Results cap at 200 rows per request — paginate ("next 200 rows") until exhausted for the window.
- Run one additional query per session-specific keyword only for high-priority assignments (keynote titles, project names) to catch posts that omit the event hashtag.

`query_lfx_lens` runs synchronously and takes 15–30 seconds per query; wait for each result without retrying.

## Step 3 — Match mentions to ambassadors

Match in confidence order:

1. Author handle equals a known ambassador handle for that platform → confirmed.
2. Author display name equals ambassador full name (case-insensitive, ignoring emoji and suffixes) → probable; confirm by checking the post text references an assigned session or the event.
3. Fuzzy name match (first + last initial, or LFX username as substring of handle) → possible; list for human review, do not auto-confirm.

For confirmed and probable matches, also check whether the post falls inside the assignment's recommended window and whether it corresponds to a specific assigned session (session title or speaker mentioned) versus general event coverage.

## Step 4 — Update the tracker

Follow the xlsx skill. Update the existing workbook in place:

- Status per assignment: "Posted" (confirmed, with Posted URL and date filled in), "Posted — needs review" (probable/possible match, with candidate URL), "Posted general coverage" (event post but not the assigned session), or unchanged "Assigned".
- Add a "Tracking summary" sheet (create on first run, overwrite on later runs): totals posted vs. outstanding, per-platform counts, posting rate by day, top 5 posts by ambassador reach if Lens returns follower/reach data, and the review queue of uncertain matches.

## Step 5 — Draft nudges

For every ambassador with zero posts whose first post window has passed, draft a short friendly nudge (≤80 words): reference their specific next assignment and its window, link their brief, offer to adjust assignments if their schedule changed. Deliver as email drafts or Slack drafts if a channel is connected; otherwise collect into `Nudge Drafts.docx`. Never send without user confirmation.

## Step 6 — Report

Present the updated tracker and summarize in a few sentences: posting rate, standouts, who needs a nudge, and any uncertain matches needing human review. Offer to schedule this skill as a daily task for the rest of the event week.
