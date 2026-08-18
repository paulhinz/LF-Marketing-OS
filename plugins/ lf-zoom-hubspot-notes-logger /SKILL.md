---
name: zoom-hubspot-notes-sync
description: Pulls a Linux Foundation Marketing or Sales team member's Zoom meeting notes for today and yesterday, resolves each meeting to a HubSpot company and meeting record, drafts a Performance Feedback / Meeting Summary / Challenger Sales Strategy notes block with a BANT-based Opportunity recommendation, and after one confirmation writes it into HubSpot, opens a follow-up task on opportunities, and flags anything ambiguous over Slack. Trigger on requests like "sync my zoom notes to hubspot," "log today's meetings in hubspot," "update hubspot from my zoom calls," or "run the notes sync." Works for any LF Marketing or Sales team and any project — not membership-sales specific.
---
# Zoom → HubSpot Notes Sync

Write a Zoom meeting's notes into its matching **HubSpot meeting record** without anyone copying and pasting between the two. Pull the raw Zoom summary and My Notes, draft a structured notes block — performance feedback, a BANT-based opportunity recommendation, and a suggested next-touch strategy — get one go-ahead from the user, then write the notes, open a follow-up task where warranted, and flag over Slack anything that can't be matched with confidence rather than guessing.

Resolve the running user's own HubSpot owner ID and Slack ID at the start of every run rather than relying on any one person's hardcoded IDs — that's what makes this skill usable by any Linux Foundation Marketing or Sales team member, not just whoever first built it. And keep the recommendation logic to a plain Budget/Authority/Need/Timeline read — don't reintroduce membership-tier or dues-specific assumptions, since this skill runs for any LF project's sales or marketing motion.

## Setup — confirm once per installation

- **HubSpot portal ID** — used only to build record links in Slack flag messages. Replace the placeholder below with the installing team's actual portal ID before first use.
  - `8112310`
- **Default timezone for date math** — `America/New_York`. Change this if the installing team isn't on Eastern time.

## Step 0 — resolve the running user's identity

Do this once at the start of every run, before touching Zoom or HubSpot data.

0a. Call HubSpot `get_user_details` with `include: ["USER_INFORMATION"]`. Store the returned owner ID as `owner_id` and the returned name/email as `owner_name` / `owner_email`. Every `hubspot_owner_id` field and every task/meeting assignment in this run uses `owner_id` — never a hardcoded ID.

0b. Call Slack `slack_read_user_profile` with no `user_id` argument — this returns the profile of whoever is running the workflow. Store the returned ID as `slack_user_id`. Every flag DM in Step 4 goes to `slack_user_id`.

0c. Confirm today's date and this user's timezone. If timezone is unknown, use the default from **Setup**, above.

## Step 1 — pull and prepare the batch

1a. **Pull today's and yesterday's Zoom meetings.** Compute the UTC start/end bounds covering both days in the resolved timezone. Call Zoom `search` with `datasource_filters: [{"datasource": "zoom_meeting"}]`, that time window, and no `query` (browse mode — every meeting the user hosted or attended). For each meeting returned, call `get_meeting_assets` with its UUID to retrieve `meeting_summary`, `my_notes`, and `participants`. Skip any meeting where both `meeting_summary` and `my_notes` come back null. For each remaining meeting, extract:
   - `entry_date` — meeting start date as MM/DD/YYYY
   - `participant_emails` — external (non-org-domain) addresses from `participants`
   - `raw_summary` — `meeting_summary.full_text`, falling back to `meeting_summary.quick_recap` if full text isn't available
   - `raw_next_steps` — `meeting_summary.next_steps` if present
   - `raw_notes` — `my_notes` content if present

   If nothing qualifies for today or yesterday, output "No entries for today or yesterday." and stop.

1b. **Resolve the company name.** Take the domain from the first external participant email. Search HubSpot `COMPANY` objects by that domain. If a record is found, use its `name` property as `company`. If nothing is found, fall back to the domain's root word, capitalized, and continue.

1c. **Synthesize the notes block.** Nothing arrives pre-written, so build these three sections directly from `raw_summary`, `raw_next_steps`, and `raw_notes` — same section names and order every time:
   - **Performance Feedback for [owner_name]** — two or three sentences of direct, specific coaching on how the call was run.
   - **Meeting Summary** — plain recap, then `Recommendation` (`Opportunity` or `Not an Opportunity`), then `Next Steps`, then `Actionable items discussed in the meeting`. Base the recommendation on a conservative BANT read (Budget, Authority, Need, Timeline) drawn only from what was actually confirmed in the meeting — do not assume budget or authority that wasn't discussed, and do not assume a specific deal structure (membership tier, subscription, one-time deal) unless the meeting confirmed one.
   - **Challenger Sales Strategy** — the recommended angle for the next touch.

   Do not draft a follow-up email here. That's a separate deliverable and must never land in the HubSpot notes block.

State plainly when the batch is ready: show the user a short preview (company, date, recommendation for each entry) and ask for one go-ahead before writing anything to HubSpot or Slack. After that single confirmation, run Steps 2 through 4 for every entry without pausing again.

## Step 2 — match each entry to HubSpot

2a. Use `get_crm_objects` on any candidate meeting record to fetch `hs_internal_meeting_notes` first. If it already contains a `BD Notes Log — [entry_date]` header for this same `entry_date`, stop on this entry and log it in the run summary as "Already processed — skipped."

2b. Use `search_crm_objects` on object type `MEETING_EVENT` with filter `hs_meeting_title` CONTAINS_TOKEN `[company]`. Find the record whose `hs_meeting_start_time` falls on the same calendar date as `entry_date` (ignore time). If exactly one matches → check it for the header above, then proceed to Step 3 if clear. If multiple match → pick the one whose title most closely matches `company`, checking each for the header; if still ambiguous → flag via Slack (Step 4) and skip this entry. If none match → go to 2c.

2c. **Calendar fallback.** Use Google Calendar `list_events` for the entry's date to find an event whose attendee list includes any of `participant_emails`. If found, search HubSpot `CONTACT` for each participant email and `COMPANY` for `company`, noting any IDs found. If at least one contact or company is found, create a new `MEETING_EVENT` via `manage_crm_objects` (`hs_meeting_title` = the calendar event title, `hs_meeting_start_time` / `hs_meeting_end_time` = calendar event start/end in epoch milliseconds, `hubspot_owner_id` = `owner_id`, associated to all contact and company IDs found), then proceed to Step 3. If nothing can be confidently matched, or no calendar event is found at all, flag via Slack (Step 4) and skip.

## Step 3 — write notes and open a follow-up

3a. **Mandatory append procedure.** Call `get_crm_objects` on the matched meeting to fetch the current `hs_internal_meeting_notes`. Store as `existing_notes` — mandatory even if you expect it's empty. Format the Step 1c output as HTML:

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

Call this `new_block`. The `BD Notes Log — [entry_date]` header is how future runs detect an already-processed record for that date, so it must always be present at the top of the block. Build `final_value` as `existing_notes + new_block` when `existing_notes` has content, or just `new_block` when it's empty. Update the meeting via `manage_crm_objects` (`hs_internal_meeting_notes` = `final_value`, `hs_meeting_outcome` = `COMPLETED`). Never write to `hs_meeting_body`, and never write only `new_block` alone when existing content was present. Then verify by re-fetching via `get_crm_objects` — confirm `hs_internal_meeting_notes` contains both the prior content and `new_block`, and `hs_meeting_body` is unchanged. Retry once on failure, then flag via Slack (Step 4) and skip.

3b. **Follow-up task, opportunities only.** Only run this if `Recommendation` = "Opportunity." Calculate the due date: start from today's actual date (confirm it's the current calendar year), add 3 business days skipping Saturdays and Sundays, set the time to 9:00am in the resolved timezone, convert to epoch milliseconds, and verify the result is strictly greater than the current time — recalculate if not. Create the task via `manage_crm_objects`: `hs_task_subject` = `Follow up: [company]`, `hs_task_body` = Next Steps + newline + newline + Actionable items verbatim from Step 1c, `hs_task_status` = `NOT_STARTED`, `hs_timestamp` = the verified due date, `hubspot_owner_id` = `owner_id`, associated to the same contact(s) and company as the meeting.

## Step 4 — flag issues and report

4a. **Slack flag.** When an entry can't be fully resolved, DM `slack_user_id`:

```
Zoom → HubSpot Notes Sync — needs review

Company: [company]
Date: [entry_date]
Reason: [one sentence describing what failed]

HubSpot contact: https://app.hubspot.com/contacts/[portal_id]/record/0-1/[id]  (omit if not found)
HubSpot company: https://app.hubspot.com/contacts/[portal_id]/record/0-2/[id]  (omit if not found)
```

4b. **Run summary.** After all entries are processed, output:

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

## Guardrails

Every write in this skill is reversible except a duplicated notes block, so treat the append procedure and the dedup check as the two things that must never be skipped or shortcut.

- Never write to `hs_meeting_body` — only `hs_internal_meeting_notes`.
- Never write only the new notes block when existing notes are present — always combine existing + new.
- Never include a drafted follow-up email anywhere in the HubSpot notes block.
- Never guess on ambiguous matches — flag and skip.
- Never create a task with a due date timestamp in the past.
- Never process a meeting whose `hs_internal_meeting_notes` already contains a `BD Notes Log — [entry_date]` header for that same date — skip it. There's no separate marker tag; the header itself is the dedup check.
- Always assign tasks and meetings to `owner_id` resolved in Step 0, never a hardcoded ID.
- Always DM flags to `slack_user_id` resolved in Step 0, never a hardcoded ID.
- Retry a failed write exactly once, then flag.
- Ask for one go-ahead after Step 1, then don't pause again for the rest of the run.

## Roadmap (not yet implemented)

Today this skill only reads Zoom as its meeting-notes source. A future version could accept other notetaker sources (Fireflies, Gong) behind the same Step 1a extraction contract, so Steps 2 through 4 wouldn't need to change at all.
