# Data sources and how to read them

All reads are read-only. Record every tool, query, filter, date range, warning, and refusal verbatim for the provenance appendix. Large connector results are often spooled to a file by the harness; read them with a subagent or with python and keep only the extracted rows in context.

## 1. Foundation documents (Google Drive)

- Find the project's Mktg OS folder: `search_files` with `title contains '[project]'`; then list the folder with `parentId = '<folder id>'`. Prefer the latest "ED Confirmed" or "Agency Safe" version; "Previous Versions" folders are history.
- Read with `read_file_content`. If the result exceeds the token cap, the harness saves it as JSON ({fileContent, title, viewUrl}); extract with python, or read the Google Doc through the browser (`mobilebasic` rendering paginates well).
- Extract into a working file: legal names and casing rules; palette (hex by role), fonts, logo URL or file; voice attributes and tone rules; pillars with one-liners, key messages, and proof IDs; audiences and personas with trusted sources and preferred channels; the Stat Bank (ID, claim, figure, as-of date, source, caveat); objections and stances; competitors and peers with the "never say" rules; the CTA library; business outcomes in priority order; 20 to 40 social listening keywords the documents imply.
- Logo: if only a URL is given, fetch the SVG through the browser (`fetch(url).then(r=>r.text())` in the page context, in slices if the tool truncates) and convert to PNG with cairosvg for the cover and header.

## 2. Earned media tiers (Google Slides)

Slide 12 of the strategy deck. Read with `read_file_content` on the deck ID; slides are separated by `-----` in the export. Compare against `earned-media-tiers.md` and note changes.

## 3. Social listening

### Octolens (MCP tools prefixed by the Octolens server id)

- `list_workspaces` → note every workspace (LF, PyTorch, OpenSearch, Linux Kernel Archives, AAIF, OpenInfra, CNCF, ASWF, LF Energy as of October 2026). `select_workspace` only if a tool answers `workspace_selection_required`; restore the original selection when done.
- `list_keywords` and `find_keyword` for the project name and its adjacent terms. No keyword for the project is a finding, not an error: record it as an open item ("add an x keyword in the next planning cycle; keyword slots are plan-limited").
- `list_mentions` with free-text `search`, `includeAll: true`, `startDate` 180 days back, `limit` 60 to 100, with and without `minXFollowers` (3k to 50k). The follower filter restricts results to X. Page with the cursor only when the first page is saturated. Run one search per adjacent term (for example "agentic payments", "HTTP 402").
- Do not call `search_mentions` (quota-billed live crawl) unless the user asks. `top_sources`, `mentions_summary`, `sentiment_by_keyword` are useful when a keyword exists.
- Octolens relevance tags are scored against the workspace's keywords, not the project; ignore `not_relevant` when searching through an adjacent workspace.

### LFX Lens (`query_lfx_lens`)

- Table: `ANALYTICS.SILVER_FACT.SOCIAL_LISTENING_MENTIONS` (columns include title, body, url, keyword, platform, author, author_followers, sentiment, published date, project keyword). Read `read_lfx_standard_metrics_guidance` first if unsure.
- Match on `LOWER(title) LIKE '%x%' OR LOWER(body) LIKE ... OR LOWER(url) ... OR LOWER(keyword) ...`; the body column matters (a title-only match can under-count by 10x).
- Queries: totals and distinct authors over 180 and 90 days; by platform; by sentiment; by month; top authors by mention count and max followers; adjacent-term authors with `author_followers >= 20000`.
- Follower counts exist only for X authors. Rank dev.to, Reddit, LinkedIn, and podcast voices on frequency and relevance.

## 4. Audiences

### HubSpot (connector)

- `tool_guidance` first. `discover_hubspot_schema` SEARCH_OBJECT_TYPES "lists segments" → `OBJECT_LIST` with properties hs_list_name, hs_list_id, hs_list_size, hs_is_active_list, hs_description, hubspot_owner_id, hs_lastmodifieddate.
- `search_crm_objects` on OBJECT_LIST with the project's keywords (project name, agent, agentic, AI, blockchain, payments, wallet, fintech, security, the related foundations' names, event names, newsletter, member, sponsor), then unfiltered sorted by size to confirm the total.
- Check `get_organization_details` ACCOUNT_INFORMATION: confirm the portal is the LF production marketing portal. A small, recently created portal with only default engagement lists is not; say so and route the HubSpot half to Marketing Ops.
- CAMPAIGN reads may be refused for permissions; quote the error.

### Twilio Segment

No connector as of October 2026. When one exists, read audiences and computed traits, capture name, size, source, and criteria. Until then, note the Segment audiences and LFX Audience Studio segments as a gap for the Segmentation Agent.

### LFX (MCP tools prefixed by the LFX server id)

- Project record: `search_projects` name = project → uid, slug, legal entity, parent, formation date, logo_url, charter_url. Two records are common (foundation and technical project).
- Memberships: `search_members` with `project_uid`, `include_inactive`, page_size 100 → tiers and organizations. `query_lfx_standard_metrics member_organizations by=foundation` for the cross-foundation size table.
- Committees: `search_committees` with `project_uid`; `count_lfx_resources committee_member parent=committee:<uid>` for roster sizes.
- Mailing lists: `search_mailing_lists` with `project_uid`, page_size 100 → group name, title, subscriber_count, access. Large foundations spill to a file; extract name and subscriber_count with ripgrep or python. Fetch page 2 when a page_token is returned or record that it was not fetched.
- Events: `query_lfx_standard_metrics event_registrations by=event` LF-wide and per project for the last two years, ordered by unique registrants. Registrants are distinct per event; never sum across events; a null check-in is "no data".
- Warnings like "No ... visible to you; not proof of absence" are quoted verbatim and the audience is marked unknown.

### Related foundations to inventory (choose per project from the ICP's adjacent ecosystems)

Agentic AI Foundation (agent builders, agentic commerce, identity), LF Decentralized Trust (blockchain, digital assets, identity, capital markets), FINOS (financial services), OpenWallet Foundation (wallets, credentials), LF AI and Data, PyTorch Foundation, OpenSSF, CNCF, OpenJS, LF Energy, LF Networking, Decentralized Identity Foundation, Trust over IP, FinOps Foundation, LF Events pools (Open Source Summit, AI_dev, KubeCon, AGNTCon and MCPCon, OSFF, MCP Dev Summit), LF Training and Certification.

## 5. Caveats to carry into the document

- Groups.io lists are community lists governed by each foundation; x-project messaging reaches them through that foundation's staff or committee, never by export.
- Event registrant pools live in Cvent and Bevy and the LF marketing HubSpot; LFX exposes counts only. Ask LF Events and Marketing Ops for suppression-safe, opt-in segments.
- Member lists are a membership development conversation, not an email send.
- Stat Bank figures older than the connector read should be refreshed and the difference reconciled (use the `lfx-figure-checking` skill when installed).
