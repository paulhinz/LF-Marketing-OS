---
name: build-ambassador-content-plan
description: >
  This skill should be used when a Linux Foundation project or foundation marketing leader,
  Executive Director, community manager, or anyone on their team says "build the ambassador
  content plan", "match ambassadors to the [event] schedule", "create ambassador content
  assignments for [event]", "run the ambassador content agent", "generate ambassador social
  kits", or otherwise asks to assign event sessions, keynotes, or activities to a community's
  ambassadors (or similar advocates) and produce personalized content (video prompts, social
  copy, hashtags, tags, posting times) for any LF, foundation, or project event. This is the
  LFX Marketing OS "Ambassador Content Agent" planning phase. Produces an assignment tracker
  spreadsheet, per-ambassador content brief documents, and ready-to-send outreach drafts.
metadata:
  version: "0.2.0"
  author: "The Linux Foundation"
---

# Build ambassador content plan

Match a project's ambassadors against an event schedule, then generate a complete, personalized content program for each ambassador. Three deliverables: an assignment tracker spreadsheet (.xlsx), one content brief document (.docx) per ambassador, and ready-to-send outreach drafts.

## Step 0 — Gather run parameters

Ask (in one round, skipping anything already known from the conversation). The community question always comes first — this agent works across all LF projects and foundations and must never assume one:

1. Which community is this for? The project or foundation and its ambassador (or equivalent advocacy) group — e.g., "CNCF — CNCF Ambassadors", "OpenSearch — OpenSearch Project Ambassadors".
2. Which event? (e.g., "KubeCon + CloudNativeCon NA 2026"). Get the schedule URL if the user has it — Sched.com (e.g., `https://kccncna2026.sched.com`) or any other event site.
3. How many session assignments per ambassador? Default: 3 (one keynote or marquee session, one expertise-matched session, one community/booth/social activity).
4. Any campaign priorities? (announcements to amplify, tracks to emphasize, official event hashtags to use.)

## Step 1 — Pull the ambassador roster from LFX

1. Use the LFX connector: `search_committees` with name "ambassador" (optionally filtered by `project_uid` from `search_projects`). Committees with category "Ambassador" are the target. If multiple match, confirm the right one with the user.
2. Page through `search_committee_members` with the committee UID (`page_size` 100, follow `page_token`) until all Active members are collected.
3. Each member record provides: first/last name, email, job title, organization, and LFX username. It does NOT provide social handles or expertise tags.

## Step 2 — Enrich the roster

Committee data lacks social handles and expertise, which the matching and copy depend on. Fill the gap in this priority order:

1. Ask the user for a supplemental spreadsheet (handles, expertise areas, languages, preferred platforms). If provided, join it to the LFX roster on name or email.
2. If no sheet: ask the user whether to proceed with inferred data. If yes, infer expertise from job title + organization, and search the web (ambassador directory pages, conference speaker bios) for public social handles of each ambassador. Mark every inferred field as "unverified" in the tracker so the team can correct it.
3. Never fabricate a handle. If a handle cannot be found, leave it blank and flag it in the tracker — outreach drafts then ask the ambassador to reply with their handles.

## Step 3 — Fetch the event schedule

Try in order; stop at the first that yields sessions:

1. `web_fetch` on `<sched-url>/list/simple` — Sched's plain listing view. These pages are often client-rendered and may return empty.
2. If empty or unhelpful, use Claude in Chrome: `navigate` to the same URL, then `get_page_text`. Repeat per day tab if the schedule paginates by day.
3. If browser tools are unavailable, ask the user to upload a schedule export (CSV/xlsx from Sched, or a PDF agenda) and parse that.

For each session capture: title, speakers (and their companies), day, time, room, track, and description snippet. Also capture keynotes and sponsored sessions separately — they anchor the "marquee" assignments. Write the parsed schedule to a working CSV so matching is reproducible.

## Step 4 — Match ambassadors to sessions

Score every ambassador × session pair and assign top matches. Read `references/matching-and-scoring.md` for the scoring rubric, tie-breaking, and coverage rules. Core principles:

- Expertise/track fit is the primary signal; speaker overlap (the ambassador IS a speaker, or a colleague from their employer is) is a strong boost.
- Every ambassador gets the configured number of assignments; no session gets more than 2 ambassadors unless it is a keynote.
- Spread assignments across event days so coverage is continuous, and respect each ambassador's own speaking slots (never assign a session that conflicts with one).
- Ambassadors who are speakers automatically get a "promote your own session" assignment first.

## Step 5 — Generate the personalized content kits

For each ambassador, for each assignment, generate the full kit using the formats in `references/content-kit-templates.md`:

- Video prompt: a 30–60 second selfie-video script outline (hook, one insight to listen for, CTA), written to the ambassador's expertise and voice.
- Social copy: one LinkedIn post (longer, professional) and one X/Bluesky post (short, punchy) per assignment, pre-filled — the ambassador should only need to personalize one sentence.
- Hashtags: official event hashtags plus 2–3 track/topic hashtags. Keep to ≤5 per post.
- Tags: the @-handles to tag (event account, project account, speakers if their handles are known, speaker companies).
- Posting recommendation: when to post (before / live-during / recap-after the session, with day and local time) and which platform first.

Also generate one event-wide "always on" item per ambassador: a pre-event "I'm going, here's what I'm watching" post.

## Step 6 — Produce the deliverables

1. Tracker spreadsheet — follow the xlsx skill. One workbook, two sheets:
   - "Assignments": one row per ambassador × assignment. Columns: Ambassador, Email, Employer, Social handles (per platform, with unverified flags), Session, Day/Time, Track, Assignment type (own-session / keynote / expertise / community), Content types due, Recommended post window, Status (default "Assigned"), Posted URL (blank), Notes.
   - "Roster": the enriched roster with data-quality flags.
2. Per-ambassador briefs — follow the docx skill. One .docx per ambassador named `<Event> Content Brief - <Ambassador Name>.docx` containing their assignments, full content kits, and a one-paragraph "how to use this" intro. Keep each brief ≤4 pages.
3. Outreach drafts — one personalized message per ambassador (≤150 words) that thanks them, links their brief, states their assignments and first deadline, and asks them to confirm plus send any missing handles. Deliver via whichever channel is connected: create email drafts (do not send), or Slack message drafts. If neither is connected, write all drafts into a single `Outreach Drafts.docx`.

Save everything to the outputs folder and present the files. Summarize: ambassadors matched, sessions covered, coverage gaps (days/tracks with no ambassador), and roster fields needing verification.

## Step 7 — Close the loop

Tell the user the companion skill "track ambassador posts" can be run during and after the event to detect posts via LFX Lens and update the tracker's Status column. Offer to schedule it as a recurring daily task for the event week.
