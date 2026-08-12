# Member 360 data sources

Check availability of each source at the start of Step 2. Never fabricate data for an unavailable source — reweight and disclose instead.

## LFX Platform connector (required)

The system of record. If not connected, stop and ask the user to connect it — the run cannot proceed without the member roster.

| Signal | Tools |
|---|---|
| Project resolution | `search_projects`, `get_project` |
| Member roster, tier, value, renewal date | `search_members`, `get_member_membership` |
| Key contacts | `get_membership_key_contacts`, `get_membership_key_contact` |
| Committee seats and rosters | `search_committees`, `search_committee_members` |
| Meeting attendance | `search_past_meetings`, `search_past_meeting_participants` |
| Aggregated engagement metrics | `query_lfx_semantic_layer` (explore with `explore_lfx_semantic_layer` first), `query_lfx_lens` |
| Org disambiguation | `search_b2b_orgs` |

Prefer the semantic layer for aggregate counts (meetings attended per org, mailing-list activity) over per-record iteration when rosters are large.

## HubSpot connector (optional)

Marketing engagement: email opens/clicks by contact, campaign membership, form submissions. Aggregate contact-level engagement to the member org by email domain. Tools: `search_crm_objects`, `query_crm_data`, `get_marketing_email_analytics`, `get_campaign_attribution_reports`.

## Social listening connector — LFX Lens / Octolens (optional)

Mentions of and amplification by member orgs and their named contacts: `search_mentions`, `list_mentions_by_author`, `list_mentions`. Count posts authored or amplified by member-org employees about the project; note sentiment only when clearly negative (surface it in Top Gaps).

## Web research (optional but recommended)

For signals with no internal system of record:

- **Speaking** — published speaker lineups and session catalogs (Sched pages) for the project's flagship events in the window; match speaker affiliations to member orgs.
- **Content** — the project blog's author/tag pages and case-study library; match bylines and featured orgs to members.
- **Ambassadors** — the project's public ambassador/champion program pages.

Cite the URL for every web-sourced signal in the Evidence tab. Cap web research effort: flagship events and the project's own properties only — do not attempt an exhaustive sweep of the internet.

## Uploaded trackers (optional)

Marketing teams often keep the best event/speaking/ambassador data in spreadsheets. At the start of Step 2, invite the user once to attach: event sponsor lists, attendee exports, CFP/speaking trackers, ambassador rosters, webinar co-marketing lists. Parse whatever arrives (xlsx/csv/Google Sheets export), map columns case-insensitively, and record the filename as the evidence source.

## Google Drive connector (optional)

If connected, offer to search Drive for the trackers above instead of requiring upload (`search_files`, `read_file_content`).
