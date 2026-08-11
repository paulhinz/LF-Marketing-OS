# Live Verification Playbook

Run these checks per connector. Connector tool names vary by session — match by connector purpose, not exact tool IDs. If a connector is not connected or not authorized, do NOT fail: mark affected rows "Gap — connector not authorized" and list the connector on the Connector Status sheet with instructions to authorize it in claude.ai/Cowork connector settings.

Run independent connector checks in parallel where possible. Time-box verification: one focused query round per connector, not exhaustive crawling.

## Status rubric

- **Confirmed** — location verified live this run (object retrieved via connector, or file metadata fetched)
- **Confirmed (per doc)** — attested in source docs but not independently verifiable this run
- **Partially confirmed** — system verified, but specific tracker/view/link not
- **Gap — connector not authorized** — verifiable only through an unconnected/unauthorized connector
- **Gap — not located** — no known location; needs human follow-up

## LFX Tools connector

1. `search_projects` — enumerate LF projects/foundations in scope (for LF-wide runs, pull the umbrella foundation list; for single-project runs, `get_project`).
2. `search_committees` with name filter "Marketing" — confirm marketing committee existence + UID per project.
3. `search_committee_members` — confirm roster counts and chair role.
4. `search_past_meetings` / `search_past_meeting_summaries` — confirm recordings/transcripts exist (recording_enabled, transcript_enabled).
5. `search_members` / `get_member_membership` — confirm membership rosters and tiers.
6. `search_mailing_lists` — confirm ambassador/marketing lists.
7. `query_lfx_semantic_layer` or `query_lfx_lens` — aggregates if needed.

Populates: categories 2, 7 rows; adds newly discovered projects/committees as new registry rows.

## Asana connector

1. `get_me` / `get_projects` or `search_objects` with "marketing" — enumerate marketing-related projects across the LF workspace (name contains: marketing, comms, content, events, PR).
2. For each seeded project gid (e.g. 1203501762098074), `get_project` — confirm it exists; record task counts and custom fields (Category, Member, Status) if cheaply available.
3. Record project permalink URLs for the Location column.

Populates: categories 1, 3, 5 rows; discovers per-project marketing projects beyond PyTorch.

## HubSpot connector

1. `get_organization_details` / `read_campaign_data` — confirm account (8112310) and recent email campaigns.
2. Confirm newsletter list exists (object list 15389 for PyTorch; search lists named "*newsletter*" for other projects).
3. `get_content_analytics_report` — confirm email/landing-page analytics availability.

Populates: rows 3.5, 5.3a, 6.3.

## Google Drive connector

1. For every seeded Drive/Docs/Sheets link, call `get_file_metadata` with the file ID — confirms existence, current name, and access. Update row name/owner if changed.
2. `search_files` for: "content calendar", "media tracker", "partner marketing kit", "budget", "raw data" — discover trackers not in the seed.
3. Re-read Jim's request doc (ID `11uf_qz2OF4IkHPHpQ2LrqUlqNO423Dng1Z0UVnUJK2c`) and the tracking sheet (ID `1KhPvBk1wQYr_P0qA-r6atFcoY3ukuS7BbTTFpB1D_AE`) for updated answers.

Populates: link validity across all categories.

## Slack connector (frequently unauthorized)

1. `slack_search_channels` for seeded channel names (#pytorch-marketing, #hosted-project-comms, etc.) — confirm existence and member counts.
2. If unauthorized: mark rows 1.2 and 7.3 "Gap — connector not authorized".

## Not connector-accessible (record as-is)

GA4, Search Console, Sprout Social, Muck Rack, Sessionize, Feathr, WordPress, Bevy, YouTube, Discord: no MCP connectors. Keep seed status, note the access route (raw exports in Drive, access via named owner), and verify any Google-Drive-hosted exports via the Drive connector instead.

## Discovery beyond the seed

While verifying, add NEW registry rows for any marketing-relevant data source encountered (new Asana project, new tracker sheet, new committee). Assign the next ID within the matching category and status "Confirmed" with today's date.
