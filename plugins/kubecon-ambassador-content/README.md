# KubeCon Ambassador Content Agent

An LFX Marketing OS agent for foundation and project marketing teams. It matches ambassadors against an event schedule (KubeCon or any LF/CNCF event), creates personalized content assignments with video prompts, social copy, hashtags, tags, and posting recommendations, and tracks who actually posts.

## Components

Two skills, no agents, hooks, or bundled MCP servers.

### Build ambassador content plan

Trigger with phrases like "build the ambassador content plan for KubeCon NA 2026" or "match ambassadors to the KubeCon schedule". It pulls the ambassador roster from an LFX committee, fetches the event schedule from Sched.com (with a browser fallback and an upload fallback), scores every ambassador-session pair, and produces three deliverables: an assignment tracker spreadsheet, a personalized content brief document per ambassador, and ready-to-send outreach drafts.

### Track ambassador posts

Trigger with phrases like "who has posted so far" or "update the ambassador tracker". It queries LFX Lens social listening for event mentions, matches authors to ambassadors, updates the tracker with posted status and post URLs, summarizes posting rates, and drafts nudges for ambassadors who have not posted yet. Run it daily during event week; it will offer to schedule itself.

## Setup

Requires the LFX connector (committees, projects, and LFX Lens social listening). Optional but recommended: an email or Slack connector for delivering outreach and nudge drafts; Claude in Chrome for fetching client-rendered Sched.com schedules.

## Notes

LFX committee rosters do not include social handles or expertise tags. The planning skill asks for a supplemental spreadsheet with that data, or infers it from public sources and flags every inferred field for verification. Nothing is ever sent to ambassadors without explicit confirmation.
