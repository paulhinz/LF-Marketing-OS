---
name: build-audience-lists
description: >
  Use when a Linux Foundation Executive Director, Project Leader, marketing
  lead, or MarComs and PR lead says "build the audience lists for [project]",
  "run the audience lists agent", "run the segmentation lists agent",
  "earned media list for [project]", "media target list for [project]",
  "who is already talking about [project]", "social media voices for
  [project]", "which existing lists overlap with [project]", or otherwise asks
  for the earned media targets, social media creators, or existing contact
  lists a project should work with. This is the LFX Marketing OS "Audience
  Lists Agent" (Foundation Setup; the "Earned and Social Media Audiences
  LISTS" deliverable). From the Brand Kit, Message Foundation, ICP and Target
  Markets, the LFX Marketing OS earned media tiers, Octolens and LFX Lens
  social listening, and the audiences in HubSpot, Twilio Segment and LFX, it
  produces one Word document with three sections: a tiered, prioritized
  earned media target list with strategy and messages per outlet; the top 5
  to 15 social media voices to build relationships with; and up to 20
  existing audiences other foundations own with overlapping ICPs. Read-only;
  it never sends, posts, exports, or changes anything.
metadata:
  version: "0.1.0"
  author: "Paul Hinz, Linux Foundation"
  department: "MarComs and PR / Demand Generation"
  nine-agent-alignment: "1 - Foundation Agents (Segmentation: Earned and Social Media Audiences)"
---

# Build Audience Lists

Turn a project's three foundation documents into the three working lists that campaigns draw from: who in the press to pitch and with what message, who on social media to build a relationship with, and which contact lists the Linux Foundation already holds whose people match the project's ICPs. Write them up as one document, the **Audience Lists**, on the LF Agent DOCS template re-skinned with the project's brand.

Where this sits in the LFX Marketing OS workflow:

```
Brand Kit + Message Foundation + ICP  ──▶  THIS AGENT  ──▶  Audience Lists (3 sections)
          (Foundation Agents)                                      │
                                   ┌───────────────────────────────┼───────────────────────────┐
                        MarComs / PR pitching           Creator relationship plan        Campaign Plan Agent
                        (earned media list)             (social voices list)             (existing audiences)
```

Operating principles, shared with the other Foundation Agents: **no invented names, numbers, or lists.** Every outlet comes from the tier reference or a persona's trusted sources; every social voice comes from a social listening read; every audience comes from a connector read. Every number carries its date and source. Anything a human must decide is marked "(manual)". The agent reads; it never writes to Octolens, HubSpot, Segment, LFX, Drive, or any social network.

Two modes. **Interactive** (default): confirm inputs in Phase 0, then present each section for accept, edit, or replace before building. **Draft mode**: if the user says "just draft it", "non-interactive", or "run it for [project] as a test", run every phase without pausing, make the best-grounded choices, label unconfirmed choices DRAFT, and list them in the open items.

Write all prose in the plain style when the `plain-writing` skill is installed.

## Phase 0: Gather inputs

Read `references/data-sources.md` for where each input lives and how to read it. Ask only for what the request and the working folder do not already make clear.

1. **Foundation documents** (required): the project's Brand Kit, Message Foundation, and ICP and Target Markets documents. Search the working folder, attachments, and Google Drive (the project's "(Mktg OS)" folder; prefer the latest "ED Confirmed" or "Agency Safe" version). Read them fully. Extract: legal and casing rules, palette and fonts and logo (for the re-skin), voice and tone rules, pillars with key messages, persona list with each persona's trusted sources and preferred channels, the Stat Bank with IDs and dates, objections and stances, competitor and peer names (for keyword lists and for what never to say), the CTA library, and the business outcomes in priority order. When one document is missing, say so, continue, label the affected section lower-confidence, and recommend the foundation agent that produces it.
2. **The earned media tiers**: `references/earned-media-tiers.md`, which carries the five tiers from the LFX Marketing OS strategy deck (slide 12, "Segmentation: Earned Media List"). If the Google Drive connector is available, also read the live slide for changes.
3. **Social listening**: Octolens (list workspaces, check keywords for the project, search mentions) and LFX Lens (the SOCIAL_LISTENING_MENTIONS table through `query_lfx_lens`). Read-only. If no keyword exists for the project, search the adjacent workspaces and body text, and record the gap as a recommendation.
4. **Audiences**: HubSpot lists and segments through the HubSpot connector; Twilio Segment audiences when a connector exists; LFX mailing lists, committees, and event registrations for the project and for the related foundations. Read-only.
5. **Optional context**: an existing media list from LF MarComs and PR, a prior Social Listening Report, a Member 360 output, the Quarterly Campaign Brief, and the project's own channel inventory. Use them when present; name them in the provenance appendix.

Confirm with the user in one message: the project, which foundation documents were found and their versions, which connectors answered, and which related foundations to inventory. In draft mode, state these in the delivery note instead.

## Phase 1: Earned Media Target List

1. **Tier the outlets.** Start from the five tiers in `references/earned-media-tiers.md`. For each tier, keep the outlets that match the project's personas and markets, add the outlets the personas' "trusted sources" name, and add the outlets that already covered the project in the social listening window (news items with a source domain). For Tier 5 (vertical industry press) build the project-specific list from the ICP's target markets; the tier reference carries the per-foundation examples.
2. **Prioritize for the project.** Order the tiers by the project's business outcomes in priority order (from the ICP document), not by the generic tier number. State in one paragraph why each tier sits where it does. Within a tier, list outlets from highest to lowest fit.
3. **Write the strategy and message per outlet.** Each row carries: the outlet, why it fits (which persona reads it), the strategy (what to pitch, when, and through whom), and the lead message with its proof, each message traceable to a Message Foundation pillar, value message, sound bite, or objection stance, and each proof to a Stat Bank ID. Apply the Brand Kit's rules verbatim: casing, "organizations" not "companies", dated numbers, no competitor criticism, no member logo beside a comparative claim, superlatives only with proof in the same sentence.
4. **List the news hooks** available in the next two quarters (executive appointments, events, member joins, counter refreshes, working group outputs, releases, first named adopter), each with the tiers it serves and the Stat Bank IDs it draws on. Tier 1 outlets are pitched only with a hook; say so.
5. **Record open items**: named reporters are held by LF MarComs and PR (manual); hooks that do not exist yet; taglines that need legal approval; and whether an analyst relations list is wanted (manual).

Do not name individual reporters unless a source in hand names them. Do not quote competitor pricing or criticize a peer protocol, product, or standard.

## Phase 2: Social Media Voices

1. **Read the conversation.** Octolens: list workspaces; find keywords for the project; `list_mentions` with free-text search for the project name, its hashtags, and 5 to 10 adjacent terms from the keyword list the foundation documents imply, over 180 days, with and without a minimum follower filter (the follower filter restricts results to X). LFX Lens: count mentions and authors matching the project in title, body, URL, and keyword over the same window, by platform, sentiment, and month; rank authors by mentions and reach. Do not use quota-billed crawl calls unless the user asks. Record every workspace, keyword, filter, and date range.
2. **Rank the voices.** Score each author on relevance to the project's topics, reach (followers where available), frequency over the window, and independence. Independent creators, developers, analysts, newsletter writers, and podcasters rank above official company accounts. Exclude accounts that post repeated single-project promotion and list them in an appendix. Separate official project accounts, member and ecosystem company accounts, media accounts, and AI bot accounts into a reference list; they are amplifiers, not relationship targets.
3. **Pick 5 to 15** and assign each to a relationship tier: A (relationship voices: direct ED or maintainer relationship, early news, event invitation), B (developer education partners: co-produced tutorials and explainers), C (amplifiers and community voices: steady release feed, developer FAQ, public thanks). Each row carries the handle and platform, reach and activity, why they matter (tied to a persona or pillar), and the next action with the CTA ID.
4. **Name the support and incentives** that fit the Brand Kit: early briefings and embargoed releases, Stat Bank access, speaking or media slots at LF events, co-authored posts with a byline, swag, and creator credits. State the boundaries: no paid coverage, no tagging a creator in a post that compares protocols, and the channel rules from the Brand Kit.
5. **Record open items**: keywords to add in the next planning cycle (keyword slots are plan-limited), official handle decisions, platform coverage gaps, and the next natural spike to seed.

## Phase 3: Existing Audiences

1. **Choose the related foundations.** From the ICP's adjacent ecosystems and the project's category, name the LF foundations and projects whose members and contributors match the ICPs (typically 4 to 8). Include LF Events and LF Training pools when the personas attend them.
2. **Read the inventories.** HubSpot: list lists and segments, search by the project's keywords, capture name, ID, type, size, owner, last modified, and criteria. Segment: audiences and traits when a connector exists. LFX: the project's own record, memberships, committees, and mailing lists (as the baseline), then each related foundation's mailing lists (subscriber counts), committees (member counts), and event registrant pools (`event_registrations` by event). Follow the LFX guidance: registrants are distinct per event, check-in nulls mean no data, and warehouse figures carry their read date. Record every tool, query, warning, and refusal verbatim.
3. **Score and select.** Score each audience High, Medium, or Low for ICP overlap and name the persona. Keep fewer than 20 lists. Each row carries: the audience and its owning foundation, size and system, overlap and persona, and the overlapping message and CTA (a pillar one-liner, value message, or objection stance with its CTA ID) plus the route to use it (co-announcement, joint working-group session, event post-email, membership development conversation). State that Groups.io lists are governed by their foundation and are not exported.
4. **List what was considered and held back**, and the data gaps: portals not connected, lists not visible, pages not read, and stale Stat Bank figures to refresh.

## Phase 4: Build the document

Read `references/document-template.md` and follow its structure: cover; how to use; executive summary; Section 1 earned media (how built, news hooks, one subsection per priority group labelled with its slide-12 tier, open items); Section 2 social voices (how built, relationship tiers, top 5 to 15, official and ecosystem accounts, open items); Section 3 existing audiences (how built, recommended lists, considered and held back, how to use, data gaps); Appendix A methodology and provenance; Appendix B excluded accounts; Appendix C trademark and governance lines.

Build with the `lf-output-formatter` skill: Markdown with front matter → `build_doc.py` on the LF Agent DOCS template with `--brand brand.json` drawn from the Brand Kit (palette, fonts, logo). If the Brand Kit's logo is only a URL, fetch it and convert SVG to PNG before building. Produce two files: `[Project] Audience Lists [Mon YYYY].docx` and the `--strip-fonts` copy named `... (Drive upload).docx`. Run `render_check.py`, open the contact sheet, and fix any leftover tokens, broken tables, or orphaned headings (up to three passes).

## Phase 5: Self-review and deliver

Score against `references/quality-rubric.md` and revise on failures. Present the file with a short summary: how many outlets per priority group, the top voices, the number of audiences and their total reach, the three or four actions that must happen before any list is used, and the data gaps. State the template and brand source. If Google Drive is connected, offer to upload the document to the project's Mktg OS folder (upload through the browser; the Drive connector cannot take a large base64 body). Say that final visual sign-off for anything external belongs to LF Creative Services and that pitching and outreach belong to LF MarComs and PR and the project's marketing committee. Recommend running `lfx-marketing-os-qa` before the document goes to project leadership.

## Boundaries (what this skill does NOT do)

- No outreach: it does not pitch reporters, message creators, send email, post, or DM
- No list operations: it does not export, create, modify, or sync lists in HubSpot, Segment, LFX, or Groups.io, and it does not add or change Octolens keywords or feeds
- No invented reporters, creators, lists, or sizes; a missing input is named and routed to its owner
- No competitor criticism, pricing quotes, or comparative claims beside a member's name
- No paid-coverage recommendations

## Reference files

- `references/earned-media-tiers.md` — the five earned media tiers from the LFX Marketing OS strategy deck (slide 12), with their purpose, outlets, and per-foundation vertical examples, and the rules for re-ordering them per project
- `references/data-sources.md` — where each input lives and how to read it: foundation documents in Drive, Octolens and LFX Lens queries, HubSpot and Segment list reads, LFX mailing lists, committees, and event registrations, with the caveats to record
- `references/document-template.md` — the exact section structure, front matter, and table columns of the Audience Lists document
- `references/quality-rubric.md` — pass or fail criteria scored before delivery
