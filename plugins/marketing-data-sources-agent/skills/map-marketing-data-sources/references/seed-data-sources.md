# Seed Data Source Registry

Compiled July 2026 from Jim Zemlin's "Raw Data Sources Behind the 2026 Marketing + Comms Overview" request doc (answers from Manish, Kieran, Nirav, Jennifer Bly, Grace Lucier, and team) and the PyTorch data-sources tracking sheet.

**How to use:** These rows seed the Data Source Registry sheet. Most entries were mapped for PyTorch Foundation but the *systems* are LF-wide — the same platforms (LFX, Asana, HubSpot, Sprout Social, Muckrack, Sessionize, Feathr, GA4, WordPress, Bevy) serve all LF projects. When scoping LF-wide, treat each PyTorch-specific link as the confirmed *instance pattern* and discover per-project equivalents via connectors.

Source docs (re-read these at run time if accessible, in case answers were updated):

- Jim's request doc: https://docs.google.com/document/d/11uf_qz2OF4IkHPHpQ2LrqUlqNO423Dng1Z0UVnUJK2c/
- Tracking sheet: https://docs.google.com/spreadsheets/d/1KhPvBk1wQYr_P0qA-r6atFcoY3ukuS7BbTTFpB1D_AE/

## Category 1 — Systems of record & workflow

| ID | Data / Question | System | Location / Link | Owner | Frequency | Notes | Seed Status |
|----|----------------|--------|-----------------|-------|-----------|-------|-------------|
| 1.1 | Day-to-day marketing work & task tracking | Asana (LF workspace) | PyTorch instance: "PyTorch Marketing + Comms", gid 1203501762098074 — https://app.asana.com/1/9283783873717/project/1203501762098074/list/1205117102085357 (858 tasks). Related: PyTorch Conference 2024, PyTorch Day Japan, PyTorch PM Meeting Topics | Jennifer Bly | Continuous | Each LF project has equivalent Asana marketing project(s); discover via Asana connector | Confirmed |
| 1.2 | Slack coordination channels | Slack (LF internal + project community workspaces) | LF: #pytorch-marketing, #pytorch-events, #pytorch-core-staff. PyTorch community: #pytorch-marketing-committee, #hosted-project-comms, #pytorch-blog-reviewers, #pytorch-marketing-china | Jennifer Bly | Continuous | Per-project channel sets follow similar naming patterns | Confirmed (per doc) |
| 1.3 | Master content/editorial calendar (all channels) | Google Sheets | https://docs.google.com/spreadsheets/d/1pFlPW-ExzPJcQnwMKrIVrp58gdijWVzgY-pbh7GK26o/ | Jennifer Bly / Bazil Sterling / Ebba Simpson | Continuous | Asana Category field (Blog post, Website update, Event, Social post, Webinar, Video, Email, PyTorch Conference) mirrors it | Confirmed |
| 1.4 | AI / human-in-the-loop content engine & pipeline queue | Gemini Gems + Claude + Asana | Pipeline visible via Asana Status field: In Queue > In Triage > In Progress > In Review > Awaiting Dependency > Approved > Sent to Proofed > Published | Jennifer Bly | Continuous | | Confirmed |

## Category 2 — Committees & governance

| ID | Data / Question | System | Location / Link | Owner | Frequency | Notes | Seed Status |
|----|----------------|--------|-----------------|-------|-----------|-------|-------------|
| 2.1 | Committee agendas, minutes, recordings, transcripts | LFX Meetings (Zoom + AI Companion transcription) + Google Drive | Marketing Committee folder: https://drive.google.com/drive/folders/1DjftNRFp8evGOy-POewqJ3smk8WG66rQ — compiled notes: https://docs.google.com/document/d/1TqSG5p6NKKtI1YVr79uq8ZuTkr15SdVWiEsZAeM0VDg/ | Allison Stokes / Ana Jimenez | Per meeting (monthly) | LFX past-meeting records have recording_enabled and transcript_enabled | Confirmed |
| 2.2 | Committee rosters (member companies + named reps) | LFX Committees module | PyTorch Marketing Committee: https://projectadmin.lfx.linuxfoundation.org/project/a092M00001LkQdtQAF/collaboration/committees/03e93790-3752-4f7b-a7fb-a5a4ea3e0f89 (~70 active members) | Allison Stokes | Real-time | Query LFX search_committees / search_committee_members for any project | Confirmed |
| 2.3 | Chair nominations / election process | Google Docs + project charter | https://docs.google.com/document/d/1OTZbGpzMOafebVf_227U1pEw4r-b3wBV/ | Jennifer Bly | Per transition | LFX committee member roles may lag actual transitions | Confirmed |

## Category 3 — Content inventory & performance

| ID | Data / Question | System | Location / Link | Owner | Frequency | Notes | Seed Status |
|----|----------------|--------|-----------------|-------|-----------|-------|-------------|
| 3.1 | Member content tracker (piece, member, date, URL) | Asana + Content Calendar sheet; published via WordPress; performance in GA4 | Asana Member + Category custom fields; calendar sheet in 1.3 | Bazil Sterling / Ebba Simpson | Per piece | Performance not in Asana — join with GA4 | Confirmed |
| 3.2 | Technical blog view counts | Google Analytics 4 | GA4 property for *.pytorch.org (per-project GA4 properties for other projects) | LF Web team | Continuous | Raw exports also mirrored to the raw-data Drive folder | Confirmed |
| 3.3 | Co-published member blogs (e.g. 24 Meta blogs YTD) | Asana | Filter Asana project by Member custom field | Bazil Sterling / Ebba Simpson | Per piece | | Partially confirmed |
| 3.4 | Case study pipeline + unified user-story template | Asana + Google Docs | Template: https://docs.google.com/document/d/1u2MJny0Rn9Iz39redwvolWe-AS5e8LwR/ | TBD | Per case study | Published examples: IBM/vLLM, LinkedIn/DuaLip | Confirmed |
| 3.5 | Newsletter subscriber list + per-issue performance | HubSpot (account 8112310) | Subscriptions list: https://app.hubspot.com/contacts/8112310/objectLists/15389/filters (26K subscribers) | Kieran / Misha (email ops) | Per issue | Query via HubSpot connector: lists, campaigns, email analytics | Confirmed |
| 3.6 | Social analytics (947K followers, 7.6M impressions, 220K engagements, +15.68%) | Sprout Social | Raw per-channel exports (LinkedIn, X, Facebook, Bluesky, YouTube): https://drive.google.com/drive/folders/1pQ5-O3W2WuXt1Kx6EU868rK1-avQ0Cfd | TBD | Monthly | Dashboard access via Sprout Social account | Confirmed |
| 3.7 | Video analytics (Live Q&As, conference videos) + rollout plan | YouTube Analytics + Asana (Video category) | YouTube Studio for project channel | TBD | Per video | Rollout plan tracking location not yet confirmed | Gap — partially located |

## Category 4 — Website & search data

| ID | Data / Question | System | Location / Link | Owner | Frequency | Notes | Seed Status |
|----|----------------|--------|-----------------|-------|-----------|-------|-------------|
| 4.1 | Website analytics (18.1M views / 61% engagement) | Google Analytics 4 | GA4 properties for *.pytorch.org (viewer access grantable); raw data in the shared raw-data Drive folder | LF Web team | Continuous | Access granted on request (Jim received viewer access) | Confirmed |
| 4.2 | Search performance (182.2M impressions, 5.04M clicks) | Google Search Console | GSC for *.pytorch.org; raw exports in raw-data Drive folder | LF Web team | Continuous | | Confirmed |

## Category 5 — Events

| ID | Data / Question | System | Location / Link | Owner | Frequency | Notes | Seed Status |
|----|----------------|--------|-----------------|-------|-----------|-------|-------------|
| 5.1 | CFP submission lists (China 744, NA 610, posters 93) | Sessionize | Events team account (Jillian grants access) | Events team (Deb Giles / Jillian) | Per CFP cycle | | Confirmed |
| 5.2 | Partner Marketing Kits + member activation tracker | Google Drive + Asana | Kit files in shared drive; activation tracker not yet located | Deb Giles | Per event | Gap: no activation tracker found | Gap |
| 5.3a | Event email sends | HubSpot campaigns | Campaign links via Kieran + Misha | Kieran / Misha | Per campaign | | Partially confirmed |
| 5.3b | Retargeting ads ($10K, live since 2026-07-21) | Feathr | Report: https://l.feathr.co/v1/reports/c/6a556dea5725d8e1e3c8b7f9?s=2026-07-22&e=now&m=l (full parameterized URL in source doc) | Events/marketing team | Continuous | Abandoned-reg campaign started 2026-07-30; university/meetup outreach 2026-08-03 | Confirmed |
| 5.4 | Paid search/syndication ($40K: Google Display + Search, Reddit, LinkedIn) | Ad platforms via Jessica | Dashboard link available from Jessica | Jessica | Continuous | Part of $50K activation with Feathr $10K | Partially confirmed |
| 5.5 | Master events calendar feeding project sites | Asana / website CMS / Bevy | Canonical source not confirmed; Bevy hosts community events | Deb Giles | Continuous | Gap: canonical source unconfirmed | Gap |

## Category 6 — PR & earned media

| ID | Data / Question | System | Location / Link | Owner | Frequency | Notes | Seed Status |
|----|----------------|--------|-----------------|-------|-----------|-------|-------------|
| 6.1 | Media coverage logs (outlet, date, link, message match) | Muck Rack | Data pull: https://docs.google.com/spreadsheets/d/1kNK75PtYiSJc1e21jopCO_0f-sHV_BXK/ (broad mentions also in shared folder) | Grace Lucier / Natasha Woods | Per event/ongoing | | Confirmed |
| 6.2 | Media interview & briefing tracker (all LF PR-supported projects, sortable by project) | Google Sheets | https://docs.google.com/spreadsheets/d/1X4xLKsKOTK2cchpZHqaK8ttbpNhdnSrvrEC1r5iv-I8/ | Grace Lucier / Natasha Woods | Per briefing | Single cross-project tracker — key LF-wide asset | Confirmed |
| 6.3 | Inbound media request queue | Email + HubSpot, logged in tracker 6.2 | Same tracker as 6.2 | Grace Lucier | Per request | | Confirmed |
| 6.4 | Messaging framework working doc (Open Source AI Flywheel, Hardware Enablement, Intelligence Agents Run On) | Google Docs | https://docs.google.com/document/d/1cuCqFLXtN_xCEThCSD-7JWBOKOh6fMfR2YgdIKiCofA/ | Jennifer Bly | In progress | | Confirmed |

## Category 7 — Members, ambassadors & community

| ID | Data / Question | System | Location / Link | Owner | Frequency | Notes | Seed Status |
|----|----------------|--------|-----------------|-------|-----------|-------|-------------|
| 7.1 | Member companies per marketing program | LFX Memberships module + Asana Member field | LFX rosters (tiers, companies, dates); Asana cross-references content participation | Allison Stokes / Bazil Sterling | Continuous | | Confirmed |
| 7.2 | Ambassador program roster & activity | LFX Committees ("Ambassadors" committee; mailing list 37 subscribers) | Via LFX connector | TBD | Continuous | Activity tracking beyond roster not located | Partially confirmed |
| 7.3 | Community Slack stats (e.g. 10,685 #pytorch participants) | Slack community workspace | https://pytorch.slack.com/ | TBD | Continuous | Channel analytics require workspace admin | Partially confirmed |
| 7.4 | Docathon registrants/participants/PRs | Bevy + Discord + GitHub | Bevy: https://community.linuxfoundation.org/events/details/lfhq-pytorch-foundation-presents-pytorch-docathon-may-5-19th-2026/ — Discord: https://discord.com/invite/TrWvJjh8Q3 — Leaderboard: https://docs.pytorch.org/docs/docathons/docathon-leaderboard-2026.html — GitHub: https://github.com/pytorch/pytorch/issues/182058 | TBD | Per docathon | | Confirmed |
| 7.5 | Persona research (H2 workstream) raw inputs | Google Drive | https://drive.google.com/drive/folders/13-hxHMDaNXOjpY_ZbwETSPmTVRCzCrgp | TBD | N/A | | Confirmed |

## Category 8 — Budget & tooling

| ID | Data / Question | System | Location / Link | Owner | Frequency | Notes | Seed Status |
|----|----------------|--------|-----------------|-------|-----------|-------|-------------|
| 8.1 | Line-item budget vs actual (Marketing $240K, PR $60K, Enablement $50K, Web $75K) | Finance spreadsheet / LF Finance | Marketing and PR are retainers; Finance Committee exists in LFX; line-item tracker not located | Finance Committee / LF Finance | Quarterly | Gap: budget tracker location | Gap |
| 8.2 | Full marketing tool stack with owners/admins | Compiled list (this map) | See Systems & Tools sheet | Jennifer Bly | As tools change | | Partially confirmed |

## LF-wide marketing systems (Systems & Tools sheet seed)

| System | What it holds | Access route | Connector available in Cowork |
|--------|---------------|--------------|-------------------------------|
| LFX (Committees, Meetings, Memberships, Mailing Lists, Insights) | Rosters, meeting recordings/transcripts, membership tiers, mailing lists, project directory | projectadmin.lfx.linuxfoundation.org | Yes — LFX Tools MCP |
| Asana (LF workspace) | Content calendars, task pipelines, event projects, member content tracking | app.asana.com | Yes — Asana MCP |
| HubSpot (account 8112310) | Newsletter lists, email campaigns, contacts/CRM, inbound requests, landing pages | app.hubspot.com | Yes — HubSpot MCP |
| Google Drive / Docs / Sheets | Committee folders, trackers, templates, raw analytics exports, persona research | drive.google.com | Yes — Google Drive MCP |
| Slack (LF + project community workspaces) | Coordination channels, community stats | slack.com | Yes — Slack MCP (needs auth) |
| Google Analytics 4 | Web analytics per project property | analytics.google.com | No — request viewer access; raw exports in Drive |
| Google Search Console | Search impressions/clicks/position | search.google.com/search-console | No — raw exports in Drive |
| Sprout Social | Social publishing + analytics across LinkedIn, X, Facebook, Bluesky, YouTube | sproutsocial.com | No — raw exports in Drive |
| Muck Rack | Media monitoring, coverage logs, journalist database | muckrack.com | No — data pulls in Google Sheets |
| Sessionize | Event CFP submissions | sessionize.com | No — access via Events team (Jillian) |
| Feathr | Retargeting/paid ad campaigns + reports | l.feathr.co report links | No — shareable report URLs |
| WordPress | Blog/website publishing | Per-project sites | No — content also tracked in Asana |
| Bevy | Community event registration (community.linuxfoundation.org) | community.linuxfoundation.org | No |
| YouTube Analytics | Video performance | studio.youtube.com | No |
| Gemini Gems / Claude | AI content drafting (human-in-the-loop) | N/A | N/A |
| GitHub | Docathon PRs, community activity | github.com | Via web fetch |
| Discord | Community engagement (docathons) | discord.com | No |

## Key people directory (seed)

| Name | Role / owns |
|------|-------------|
| Jennifer Bly | Marketing & Comms Director — Asana projects, content engine, messaging framework, tool stack |
| Bazil Sterling / Ebba Simpson | Content trackers, editorial calendar, member content |
| Deb Giles | Event Director — events calendar, partner kits, event marketing |
| Grace Lucier / Natasha Woods | PR Managers — Muck Rack, media tracker, inbound queue (Grace) |
| Allison Stokes / Ana Jimenez | LF staff — LFX committees, meetings, memberships |
| Kieran / Misha | HubSpot email campaigns |
| Jessica | Paid ads (Google, Reddit, LinkedIn) |
| Jillian | Sessionize account access |
| LF Web team | GA4 + Search Console admin |
