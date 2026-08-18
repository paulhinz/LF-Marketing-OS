Run Steps 0 through 3 without pausing. Once entries are gathered and synthesized, show the user a short preview (company, date, recommendation for each entry) and ask for one go-ahead before writing anything to HubSpot or Slack. After that single confirmation, run Steps 4 through 8 for every entry without pausing again. Treat all writes as pre-authorized once that confirmation is given.

CONSTANTS (org-wide, shared by everyone who runs this — no personal IDs required)

* HubSpot portal ID: `8112310`
* Default timezone for date math: `America/New_York` (change this one line if your org runs on a different timezone)

STEP 0 — RESOLVE THE RUNNING USER'S IDENTITY

Do this once at the start of every run. Nobody's owner ID or Slack ID is hardcoded — each run resolves them for whoever kicked it off.

1. Call HubSpot `get_user_details` with `include: ["USER_INFORMATION"]`. Store the returned owner ID as `owner_id` and the returned name/email as `owner_name` / `owner_email`. Every `hubspot_owner_id` field and every task/meeting assignment in this run uses `owner_id`.
2. Call Slack `slack_read_user_profile` with no `user_id` argument — this returns the profile of whoever is running the workflow. Store the returned ID as `slack_user_id`. Every flag DM in Step 7 goes to `slack_user_id`.
3. Confirm today's date and this user's timezone. If timezone is unknown, use the default constant above.

STEP 1 — PULL TODAY'S AND YESTERDAY'S ZOOM MEETINGS

This replaces reading a handoff doc. Notes come straight from Zoom.

1. Compute the UTC start/end bounds covering today and yesterday in the resolved timezone.
2. Call Zoom `search` with `datasource_filters: [{"datasource": "zoom_meeting"}]`, the time window from Sub-step 1, and no `query` (browse mode — every meeting the user hosted or attended in that window).
3. For each meeting returned, call `get_meeting_assets` with the meeting's UUID to retrieve `meeting_summary`, `my_notes`, and `participants`.
4. Skip any meeting where both `meeting_summary` and `my_notes` come back null. Nothing to log.
5. For each remaining meeting, extract:
   * `entry_date` — meeting start date as MM/DD/YYYY
   * `participant_emails` — external (non-org-domain) addresses from `participants`
   * `raw_summary` — `meeting_summary.full_text`, falling back to `meeting_summary.quick_recap` if full text isn't available
   * `raw_next_steps` — `meeting_summary.next_steps` if present
   * `raw_notes` — `my_notes` content if present

If there are no qualifying meetings for today or yesterday, output "No entries for today or yesterday." and stop.

STEP 2 — RESOLVE THE COMPANY NAME

1. Take the domain from the first external participant email.
2. Search HubSpot `COMPANY` objects by that domain. If a record is found, use its `name` property as `company`. If nothing is found, fall back to the domain's root word, capitalized, and continue.

STEP 3 — SYNTHESIZE THE NOTES BLOCK

Nothing arrives pre-written anymore, so build these three sections directly from `raw_summary`, `raw_next_steps`, and `raw_notes`. Keep the same section names and order the workflow has always used.

* `Performance Feedback for [owner_name]` — two or three sentences of direct, specific coaching on how the call was run.
* `Meeting Summary` — plain recap, then `Recommendation` (`Opportunity` or `Not an Opportunity`, a conservative BANT read that uses the prospect entity's full global employee count when tier or dues are relevant), then `Next Steps`, then `Actionable items discussed in the meeting`.
* `Challenger Sales Strategy` — the recommended angle for the next touch.

Do not draft a follow-up email here. That's a separate Gmail deliverable and must never land in the HubSpot notes block.

STEP 4 — FIND THE HUBSPOT MEETING

For each entry:

1. Use `get_crm_objects` on any candidate meeting record to fetch `hs_internal_meeting_notes` first. If it already contains a `BD Notes Log — [entry_date]` header for this same `entry_date`, stop on this entry. Log it in the run summary as "Already processed — skipped."
2. Use `search_crm_objects` on object type `MEETING_EVENT` with filter `hs_meeting_title` CONTAINS_TOKEN `[company]`.
3. From the results, find the record whose `hs_meeting_start_time` falls on the same calendar date as `entry_date`. Ignore time.
4. If exactly one record matches → fetch its `hs_internal_meeting_notes`, check for a `BD Notes Log — [entry_date]` header matching this date. If found → skip. If not found → go to Step 6.
5. If multiple records match on that date → pick the one whose title most closely matches `company`. Check each for that same header. If still ambiguous → flag via Slack (Step 7) and skip this entry.
6. If no record matches → go to Step 5.

STEP 5 — CALENDAR FALLBACK

1. Use Google Calendar `list_events` for the entry's date to find an event whose attendee list includes any of `participant_emails`.
2. If found:
   a. Search HubSpot `CONTACT` for each participant email. Note any contact IDs found.
   b. Search HubSpot `COMPANY` by `company`. Note any company IDs found.
   c. If at least one contact or company is found → create a new `MEETING_EVENT` via `manage_crm_objects`:
      * `hs_meeting_title` = the calendar event title
      * `hs_meeting_start_time` / `hs_meeting_end_time` = calendar event start/end in epoch milliseconds
      * `hubspot_owner_id` = `owner_id`
      * Associate to all contact and company IDs found
   d. Proceed to Step 6 with the new meeting.
   e. If nothing can be confidently matched → flag via Slack (Step 7) and skip.
3. If no matching calendar event is found → flag via Slack (Step 7) and skip.

STEP 6 — WRITE NOTES AND UPDATE THE MEETING

6A — MANDATORY APPEND PROCEDURE

Sub-step 1: Call `get_crm_objects` on the matched meeting to fetch the current `hs_internal_meeting_notes`. Store as `existing_notes`. Mandatory even if you expect it's empty.

Sub-step 2: Format the Step 3 output as HTML:

```html
<hr>
<p><strong>BD Notes Log — [entry_date]</strong></p>

<p><strong>Performance Feedback for [owner_name]</strong></p>
<p>[Performance Feedback text]</p>

<p><strong>Meeting Summary</strong></p>
<p>[Meeting Summary text, each field on its own line via &lt;br&gt; tags]</p>

<p><strong>Challenger Sales Strategy</strong></p>
<p>[Challenger Sales Strategy text]</p>
```

Call this `new_block`. The `BD Notes Log — [entry_date]` header is how future runs detect an already-processed record for that date, so it must always be present at the top of the block.

Sub-step 3: Build `final_value`.
* If `existing_notes` has any content → `final_value = existing_notes + new_block`
* If empty or null → `final_value = new_block`

Sub-step 4: Update the meeting via `manage_crm_objects`:
* `hs_internal_meeting_notes` = `final_value`
* `hs_meeting_outcome` = `COMPLETED`

Never write to `hs_meeting_body`. Never write only `new_block` alone when existing content was present.

Sub-step 5 — Verify: re-fetch via `get_crm_objects` and confirm `hs_internal_meeting_notes` contains both the prior content and `new_block`, and `hs_meeting_body` is unchanged. If verification fails, retry the write once. If it fails again, flag via Slack (Step 7) and skip.

6B — CREATE FOLLOW-UP TASK (Opportunity entries only)

Only run this if `Recommendation` = "Opportunity".

Due date calculation:
1. Start with today's actual date. Confirm the year is the current calendar year.
2. Add 3 business days, skipping Saturdays and Sundays.
3. Set the time to 9:00am in the resolved timezone.
4. Convert to epoch milliseconds.
5. Verify the resulting timestamp is strictly greater than the current time in milliseconds. If not, recalculate before proceeding.

Create the task via `manage_crm_objects`:
* `hs_task_subject` = `Follow up: [company]`
* `hs_task_body` = Next Steps + newline + newline + Actionable items, verbatim from Step 3
* `hs_task_status` = `NOT_STARTED`
* `hs_timestamp` = verified due date in milliseconds
* `hubspot_owner_id` = `owner_id`
* Associate to the same contact(s) and company as the meeting

STEP 7 — SLACK FLAG

When an entry can't be fully resolved, DM `slack_user_id`:

```
AAIF Notes Sync — needs review

Company: [company]
Date: [entry_date]
Reason: [one sentence describing what failed]

HubSpot contact: https://app.hubspot.com/contacts/8112310/record/0-1/[id]  (omit if not found)
HubSpot company: https://app.hubspot.com/contacts/8112310/record/0-2/[id]  (omit if not found)
```

STEP 8 — RUN SUMMARY

After all entries are processed, output:

```
Zoom → HubSpot Sync — [today's date]

Meetings written and verified: [n]
  - [Company]: [meeting title] (ID: [id])

Already processed — skipped: [n]
  - [Company]: [meeting title] (BD Notes Log entry already present for this date)

Follow-up tasks created: [n]
  - [Company]: due [MM/DD/YYYY]

Meetings created from calendar fallback: [n]
  - [Company]: [calendar event title] (ID: [id])

Flagged for manual review: [n]
  - [Company]: [reason]
```

GUARDRAILS

* Never write to `hs_meeting_body`
* Never write only the new notes block when existing notes are present — always combine existing + new
* Never include a drafted follow-up email anywhere in the HubSpot notes block
* Never guess on ambiguous matches — flag and skip
* Never create a task with a due date timestamp in the past
* Never process a meeting whose `hs_internal_meeting_notes` already contains a `BD Notes Log — [entry_date]` header for that same date — skip it
* Always lead every `new_block` written with its `BD Notes Log — [entry_date]` header
* Always assign tasks and meetings to `owner_id` resolved in Step 0, never a hardcoded ID
* Always DM flags to `slack_user_id` resolved in Step 0, never a hardcoded ID
* Retry failed writes exactly once, then flag
* Do not pause for confirmation at any point
