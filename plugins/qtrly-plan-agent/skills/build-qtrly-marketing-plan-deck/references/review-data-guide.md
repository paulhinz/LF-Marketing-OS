# Review Data Guide — Phase 1 pulls, fallbacks, and presentation

## Ground rules

- Read-only. Never write to LFX, HubSpot, or any connected system.
- Every metric presented must carry a source: `LFX`, `document (name)`, or `(manual)` when user-supplied.
- If a query fails or returns nothing, do not retry more than twice; move the metric to the "missing" list and ask the user.
- Pull independent queries in parallel where the environment allows.

## LFX MCP queries by area

**Project identity (Phase 0)**
- `search_projects` with the user's project name → confirm slug/ID with user
- `get_project` → description, categories, URLs

**Project health**
- `query_lfx_semantic_layer` / `query_lfx_lens` → contributor counts and trend, commit activity, active organizations, velocity vs. prior quarter
- `search_committees` + `search_committee_members` → governance/committee activity
- `search_mailing_lists` + `search_mailing_list_members` → list counts and growth
- `search_past_meetings` + `search_past_meeting_participants` → meeting cadence and attendance trend

**Marketing impact**
- `query_lfx_semantic_layer` against marketing/social metrics where exposed (website traffic, social following/engagement, newsletter size)
- If HubSpot connector is available: email performance (`get_marketing_email_analytics`), campaign attribution (`get_campaign_attribution_reports`)

**Events** (the "fill the seats" and sponsorship outcomes)
- `search_meetings` / event data where available in LFX
- Registration vs. capacity and sponsorship sold vs. target are usually NOT in LFX — expect to ask the user (see fallback prompts)

**Education**
- Training & certification enrollments/completions if exposed via LFX; otherwise ask

**Membership**
- `search_members`, `get_member_membership`, `get_membership_key_contacts` → member orgs by tier, renewal dates in the coming two quarters (renewals at risk), recent joins

**Prior-quarter results (reviews only)**
- Primary source: the prior plan deck/doc from Phase 0. Extract each goal's KPI target, then ask the user (or compute from data above) the actual, and derive % to goal. Budget vs. actual spend almost always comes from the user.

## Fallback prompts (missing data)

Ask in one consolidated message, grouped, never one metric at a time. Template:

> I couldn't find these in LFX or your documents — please provide numbers or a link:
> - [Event name]: current registrations and venue capacity
> - [Event name]: sponsorship revenue sold vs. target
> - Education: current quarter enrollments / certifications
> - Last quarter: actual spend vs. the $X budget

Record answers as `(manual)` sources.

## Review Snapshot format

Present one compact summary before asking for confirmation, grouped by business outcome:

```
REVIEW SNAPSHOT — [Project], prepared [date]
Health:      contributors ▲/▼ x% QoQ · N active orgs · commits trend
Awareness:   web sessions · social followers/engagement · newsletter size
Adoption:    downloads/usage proxy (state which proxy)
Events:      [event] reg N/capacity (x%) · sponsorship $X/$Y
Education:   enrollments N vs target · certs N
Membership:  N members (tier breakdown) · M renewals due · pipeline
Prior goals: G1 x% to goal · G2 x% · budget $A spent / $B planned
Missing:     [list, with the ask]
```

Then ask exactly: "Does this match reality? Anything to correct or flag before we set direction?"
