# Committee Health data sources

Check availability of each source at the start of Step 2. Never fabricate data for an unavailable source — exclude, reweight per the health model, and disclose instead.

## LFX Platform connector (required)

The system of record. If not connected, stop and ask the user to connect it — the run cannot proceed without committee rosters.

| Signal | Tools |
|---|---|
| Project resolution | `search_projects`, `get_project` |
| Committee inventory | `search_committees`, `get_committee` |
| Committee rosters (name, email, company, role, voting status, appointed date) | `search_committee_members`, `get_committee_member` |
| Member companies, tier, seat entitlements | `search_members`, `get_member_membership` |
| Key contacts per member company | `get_membership_key_contacts`, `get_membership_key_contact` |
| Meetings held per committee | `search_past_meetings`, `get_past_meeting` |
| Attendance per person | `search_past_meeting_participants`, `get_past_meeting_participant` |
| Registered but did not attend | `search_meeting_registrants` |
| Upcoming-meeting registration (leading indicator) | `search_meetings`, `get_meeting_registrant` |
| Mailing-list membership and activity | `search_mailing_lists`, `search_mailing_list_members`, `get_mailing_list_member` |
| Aggregate per-person/per-org activity counts | `query_lfx_semantic_layer` (explore with `explore_lfx_semantic_layer` first), `query_lfx_lens` |
| Org disambiguation | `search_b2b_orgs` |
| Email templates and sending (Step 7, after approval only) | `list_email_templates`, `send_email` |
| Roster corrections the user approves | `update_committee_member`, `create_committee_member`, `delete_committee_member` — only on explicit user instruction |

Prefer the semantic layer for aggregate counts (meetings attended per person over the window) when total roster size exceeds ~50; fall back to per-meeting participant iteration for small committees or when per-meeting evidence rows are needed.

## Attendance computation rules

- Denominator = meetings the committee actually held in the window (not scheduled-then-cancelled).
- A rep on multiple committees is scored per committee and rolled up to a person-level "last activity anywhere" date.
- Registration without attendance counts as engagement intent, not attendance — it softens an Inactive call to Low Activity only if within the last 90 days.

## Currency checks for suspected departures (optional, light touch)

Only for reps with zero activity in the window. In order of reliability:

1. LFX org/email mismatch — committee record company differs from the current org record for that email/person.
2. Email deliverability signals in LFX (bounces, disabled accounts) where surfaced.
3. Web check — the member company's public team/leadership page, or a recent conference bio showing a different employer. Cite the URL. One search per rep, cap effort.

Positive evidence from 1–3 → status Outdated. No evidence either way → Unverifiable (never guess "departed").

## Uploaded rosters and trackers (optional)

At the start of Step 2, invite the user once to attach anything they maintain: committee rosters kept outside LFX, attendance sheets, contact lists, org charts. Parse xlsx/csv, map columns case-insensitively, and record the filename as the evidence source. Uploaded data supplements LFX; on conflict, note the discrepancy in the Evidence tab rather than silently preferring either.

## Google Drive connector (optional)

If connected, offer to search Drive for the rosters above instead of requiring upload (`search_files`, `read_file_content`).

## HubSpot connector (optional)

Secondary signal for "is this person still reachable/engaged": recent email opens/clicks or form submissions by the rep's contact record (`search_crm_objects`, `query_crm_data`, `get_marketing_email_analytics`). Recent marketing engagement can upgrade Unverifiable → Low Activity. Never use marketing engagement alone to mark someone Active on a committee.
