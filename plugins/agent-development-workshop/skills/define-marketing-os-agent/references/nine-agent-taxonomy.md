# LFX Marketing OS agent taxonomy (source of truth)

Grounded in: Jim Zemlin's "LFX Marketing OS — Product Plan" (v0.4), Paul Hinz's "2026 Jun 1 LFX Mktg OS Strategy Overview" deck, and the "2026 Marketing OS Agent List" spreadsheet (42-agent master list). Use this file to classify a new agent idea and check it against what already exists — never invent a 10th category.

## The 9 core agent categories

Every agent in the Marketing OS — existing or newly proposed — maps to exactly one of these 9 categories. This is the "9-Agent Alignment" field.

1. **Foundation Setup Agent** — Brand · Site · Messaging · Consent · Key OKRs. Run at launch of a foundation/project or quarterly refresh; minimal input, auto-generates core materials, human reviewed.
2. **Newsletter Composition Agent** — Aggregate · Draft · Schedule. Weekly or on-demand ("draft this week's newsletter").
3. **Social Content Agent** — Draft · Queue · Publish. Weekly, surfaces 5–10 post drafts, human-editable.
4. **Event Setup Agent** — Cvent page · capacity · sponsors. Triggered by "create new event" for a meetup/regional event.
5. **Event Execution Agent** — 12-week milestone plan (recurring). PL inputs event date/goal/budget; agent proposes plan; execution tracked on dashboard.
6. **Segmentation Agent** — Personas · segments · sync. Seeded by Foundation Setup, then an ongoing prompt/response loop to update segments (built in Segment.io, synced to HubSpot).
7. **Owned Media Production Agent** — Podcast · YouTube · newsletter pipeline. Triggered by a new recording upload; runs the post-production pipeline.
8. **Insights Agent** — Insights · anomaly flags · A/B winners. Runs automatically (daily/weekly); PL reads dashboard + recommendations.
9. **Campaign Design Agent** — SEM · LinkedIn · Reddit · UTMs. PL sets budget/OKRs; agent proposes campaign structure, tracks on dashboard.

Note: an earlier draft ("Hot List / Hot Campaign / Core Msg Viewer") used the same 1-of-9 numbering with different names. Treat the list above as canonical — it is confirmed by the deck's own "Documenting Workflows, Skills & Agents" template, which requires every agent spec to declare its "9 Agent Alignment" against these categories.

## Existing agent master list (by department)

Source note: the spreadsheet this is drawn from calls itself "the 42-agent list," but the actual named-agent count across departments is higher (49+ once every row is counted), and a handful of ID numbers are reused across departments (see "Known ID collisions" below). Treat **name + department** as the reliable identifier for matching, not the number alone.

When a user proposes a new agent, scan this list for name/function overlap and report a verdict:
- **Add** — genuinely new, no existing agent covers it.
- **Define** — an exact or near-exact name/function match already exists on the backlog but has never been fully specced (no populated Input/Output/Trigger). Use this for the common case where the user's idea *is* an already-planned agent that just needs this session's definition work. This is the most common outcome when a leader picks a name straight off a known roadmap.
- **Rename** — same job as an existing agent, but this proposal's name is clearer; recommend adopting the new name.
- **Absorbed** — already covered as a sub-function of a broader existing agent (not a standalone agent in its own right).
- **Skip** — out of scope or low value given current priorities.

Each entry below is tagged `[cat N]` for its 9-Agent Alignment (see the 9 categories above) so a new agent's category assignment can be checked against a documented precedent, not just inferred.

**Marketing Ops** — Consent + Analytics Agent (9b) [cat 1], OKR Setup Agent (6) [cat 1], Project Health Dashboard Narrative (35) [cat 8], Campaign Performance Agent (36) [cat 8], OKR Tracking Agent (37) [cat 8], Paid Marketing [cat 9], Email Marketing [cat 9].

**Creative Services** — Brand Setup Agent (0) [cat 1], Website Setup Agent incl. Home Page / Site Designer / Site-Page Deployer (9) [cat 1].

**LF Media** — Message Foundation Agent (1) [cat 1], ICP and Market Target Agent (2) [cat 1], Case Study Agent (23) [cat 7], AEO/GEO Audit Agent (5) [cat 1].

**MarComms** — Launch Plan Agent (7) [cat 1], Newsletter Composition Agent (8) [cat 2], Social Content Agent (4) [cat 3], Blog Post Draft Agent (10) [cat 7], Minor Release Checklist Agent (11) [cat 1], Webinar Promo + Recap Agent (18) [cat 4/5], Podcast Setup Agent (19) [cat 7], YouTube Channel Setup Agent (20) [cat 7], Owned Media Production Agent (21) [cat 7], White Paper Agent (22) [cat 7], Owned Media Flywheel Agent (24) [cat 7], New Member Announcement Agent (26) [cat 7], Marketing Recap Agent (38) [cat 8], Editorial Calendar Agent (39) [cat 7], Press Release Draft Agent (42) [cat 7], Comparative Content Agent [cat 7].

**Events Marketing** — Event Setup Agent (12) [cat 4], Event Execution Agent (13) [cat 5], CFP & Speaker Mgmt Agent (14-events) [cat 5], Speaker Promotion Kit Agent (15-events) [cat 5], Post-Event Content Agent (16) [cat 5], Meetup Kit Agent (17) [cat 5], Event Series Planner (40) [cat 5].

**Demand Generation** — Audience Segmentation Agent (25) [cat 6], ABM Campaign Agent (29) [cat 9], Structured Campaign Brief Agent (31) [cat 9], Paid Media Agent (32) [cat 9], A/B Test Evaluator (33) [cat 8], Co-marketing Portal Agent (41) [cat 9].

**Education / Training & Cert** — Lifecycle Nurture Agent (28) [cat 9], Certification Awareness Agent (34) [cat 9].

**Program Operations** — Contributor Recognition Agent (15-progops) [cat 1], Member Onboarding Agent (27) [cat 1], Ambassador Nomination Agent (30) [cat 6].

**Developer Relations** — GitHub Activity Monitor (14-devrel) [cat 8].

**Member Growth** — Member Recruitment Pitch Deck (3) [cat 1].

Unspecced idea backlog (name only, not yet defined — a match here is almost always **Define**, not **Add**): Meetup Guidelines, Project FAQ Generator, Ecosystem Monitor, Subject Line Optimizer, Image Brief Generator, Use Case Generator, Case Study Generator.

### Known ID collisions (source-data limitation)

The source spreadsheet reuses two ID numbers across different agents in different departments: **14** is both "CFP & Speaker Mgmt Agent" (Events Marketing) and "GitHub Activity Monitor" (Developer Relations); **15** is both "Speaker Promotion Kit Agent" (Events Marketing) and "Contributor Recognition Agent" (Program Operations). To disambiguate in this file, a department suffix has been appended (`14-events` / `14-devrel`, `15-events` / `15-progops`) — this suffix is a convenience added here, not part of the original numbering. When checking a new agent idea against this list, always confirm by name + department, never by number alone.

## Departments a new agent can be assigned to

Marketing Ops · Creative Services · LF Media · MarComms/PR · Events Marketing · Demand Generation · Education/Training & Cert · Program Operations · Developer Relations · Member Growth. (Also referenced at the org level: Sales, SDR/BDR, LFX Mktg Ops, Legal, LF IT — use these only if the agent's primary owner sits there.)

## Systems and tools (the "Tools" field)

**Anchor SaaS (the four the whole platform is built on top of — never propose replacing these):** Cvent (events), HubSpot (CRM/email/automation), Segment.io (customer data platform), Sprout Social (social publishing/listening).

**Supporting SaaS (integrate as needed):** Beehiiv, Transistor/Buzzsprout, Riverside/Zencastr, YouTube, GA4/Plausible, LinkedIn/Google/Reddit Ads, Apple Podcasts Connect/Chartable, Typeform/Tally, OneTrust, Cloudflare Registrar, Snowflake, GitHub/GitLab/Discord/Slack/Discourse, Hugo/Webflow/WordPress.

**LF-built services (only propose a new one of these if no commercial tool fits):** Consent Hub, Brand Vault, Channel Registry, Audience Studio, LFID + Identity Resolution, Marketing Insights, Content Hub, PCC, LFX Lens.

## Vocabulary to reuse consistently

- **Human Gate** — a mandatory pause in an agent workflow where a named person must review and approve before execution continues. Every agent needs at least one.
- **Reversibility** — every agent action should be undoable with one click; this is what makes self-serve safe. Target KPI: <5% of actions undone.
- **The six-step agent loop** — User intent → Plan → Approve → Execute → Report → Learn.
- **PL** — Project Leader (the primary non-marketer persona, "Riya" in the product concept doc). **Marcus** — Foundation Marketing Lead (power-user persona). **Demi** — Creator-Host (LF Media contractor persona).
- **Tier 1–4 / Feature Ladder** — Easy Wins → Compounding Plays → Operational Maturity → Best-in-Class.
