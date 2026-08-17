---
name: run-committee-health
description: This skill should be used when a Linux Foundation Executive Director, Project Leader, or LF marketing team member says "Run Committee Health", "run the committee health report for [project]", "who's inactive on our committees", "which reps have gone dark", "which member companies have no active contact", "check committee participation", "audit our committee rosters", "flag outdated representatives", or otherwise asks to monitor committee participation, find inactive or departed representatives, identify member companies without an active contact, or kick off follow-up or replacement outreach. This is the LFX Marketing OS "Committee Health Agent". It scores every committee and representative, flags gaps, produces a committee-health .xlsx workbook, and drafts outreach emails for user review before anything is sent.
---

# Committee Health Agent

Audit every committee of an LF project: score participation, flag inactive or outdated representatives, identify member companies with no active contact, and draft follow-up or replacement outreach. Every email is drafted for user review — never send without explicit approval.

Audience: Executive Directors, Project Leaders, and their marketing leadership team. Cadence: monthly or before board/committee meetings and QBRs.

## Reference files

Read these before executing the corresponding step:

- `references/data-sources.md` — which connector/tool retrieves each signal, and fallbacks when a source is unavailable. Read before Step 2.
- `references/health-model.md` — representative status definitions, participation scoring, outdated-rep detection heuristics, committee health score, no-active-contact rule, and outreach routing. Read before Step 4.
- `references/spreadsheet-spec.md` — exact tabs, columns, formats, and conditional formatting for the output workbook. Read before Step 6.
- `references/outreach-playbook.md` — email templates, personalization rules, and the approval flow. Read before Step 7.

## Workflow

### Step 1 — Scope the run

Ask the user (one question, unless already stated):

1. Which project or foundation?
2. Confirm defaults, offering overrides in one line: all committees, trailing 12 months of meeting history, inactivity threshold = no participation in 180 days.

If the user provided the project in their request, confirm and proceed without asking. Resolve the project via the LFX connector (`search_projects`, `get_project`). If prior output exists in the working folder (look for `CommitteeHealth_*.xlsx`), load it to compute trend deltas and to detect reps flagged last run who are still unresolved.

### Step 2 — Build the committee and representative inventory

Read `references/data-sources.md`, then:

1. Pull every committee for the project (`search_committees`, `get_committee`) — governing board, TAC/TOC, marketing/outreach, budget, any SIGs or working groups with formal rosters.
2. Pull every committee member (`search_committee_members`, `get_committee_member`) with name, email, company, role, appointed date, and voting status.
3. Pull the member-company roster (`search_members`, `get_member_membership`) with membership tier and committee-seat entitlements, plus key contacts (`get_membership_key_contacts`).
4. Match representatives to member companies by LFX org record first, then email domain (`search_b2b_orgs` to disambiguate). Record unmatched reps — they may be departed or community seats.

### Step 3 — Collect participation signals

For each representative, gather over the analysis window:

1. **Meeting attendance** — meetings held per committee (`search_past_meetings`), attendance per rep (`search_past_meeting_participants`), registrations without attendance (`search_meeting_registrants`). Compute attendance rate and date of last attendance.
2. **Mailing-list activity** — subscription and recent posts where available (`search_mailing_lists`, `search_mailing_list_members`).
3. **Aggregate activity** — prefer `query_lfx_semantic_layer` (explore with `explore_lfx_semantic_layer` first) for per-person meeting counts when rosters are large, instead of per-record iteration.
4. **Currency checks** for reps with zero recent activity — signs the person has left the company or changed roles: bounced email indicators in LFX, company mismatch between the committee record and the org record, public evidence (new employer on a conference bio or company team page). Web research is a light-touch check, not an investigation — cite any URL used.

Never fabricate a signal. If a source is unavailable, mark it "no data", exclude it from scoring per the health model, and disclose it in the Method tab and final summary. For rosters above ~50 reps, parallelize collection with sub-agents batched by committee, each returning the same structured signal set.

### Step 4 — Assess health

Read `references/health-model.md`, then compute:

- **Per representative**: participation score (0–100), status — Active / Low Activity / Inactive / Outdated / Unverifiable — date of last activity, and evidence.
- **Per committee**: health score (0–100) from active-rep coverage, attendance trend, seat-fill rate, and meeting regularity; plus quorum-risk flag.
- **Per member company**: active-contact status. A company has no active contact when none of its committee reps or LFX key contacts are Active or Low Activity. Also flag entitled-but-unfilled committee seats.
- **Trends** vs. prior run (▲ / ▼ / —) when prior output exists.

### Step 5 — Route each flag to an action

Apply the routing rules in the health model. Every flagged rep or company gets exactly one recommended action with an owner (Project Leader, ED, or Marketing) and priority:

- **Follow-up outreach** — Low Activity or recently Inactive rep: re-engage.
- **Replacement outreach** — Outdated rep (departed/changed roles) or long-Inactive rep: ask the member company's key contact to name a replacement.
- **Seat-fill outreach** — member company with an entitled seat unfilled or no active contact at all: recruit a contact/rep.
- **Escalation** — committee at quorum risk or company unreachable through every channel: flag for the ED with suggested next step.

### Step 6 — Build the workbook

Read `references/spreadsheet-spec.md` and the xlsx skill, then build `CommitteeHealth_[Project]_[YYYY-MM].xlsx` with tabs: Summary, Committee Scorecard, Representative Roster, Companies Without Active Contact, Outreach Queue, Evidence, Method. Save to the outputs folder and present the file.

### Step 7 — Draft outreach for review

Read `references/outreach-playbook.md`, then draft one email per Outreach Queue row that the user opts into. Present drafts in chat grouped by outreach type, each with recipient, subject, and body. Rules:

- Draft-for-review is the default and only mode: the user must approve each email (or explicitly say "approve all") before sending via `send_email`. Never send unapproved. If sending is unavailable, deliver the drafts in the workbook's Outreach Queue tab and stop there.
- Check `list_email_templates` first and adapt an existing LF template when one fits.
- Personalize every draft with the rep's committee, last-attended meeting, and the specific ask. No generic "checking in" emails.

### Step 8 — Verify and summarize

Before presenting:

- Every committee rep appears exactly once in Representative Roster; every flagged row has evidence.
- Spot-check 3 Inactive/Outdated calls against their evidence (last-attendance date, currency check).
- Confirm every Outreach Queue row traces to a flag and every company in Companies Without Active Contact truly has zero Active/Low Activity contacts.

Close with a short summary: committees covered, rep counts by status, companies without an active contact, the 3 most urgent actions, drafts awaiting approval, and any data sources unavailable this run. Offer once to schedule this as a recurring monthly run.

## Style

- Never fabricate participation or a departure. Every status traces to a connector record, an uploaded roster, or a cited URL.
- Be conservative with "Outdated": require positive evidence of departure, otherwise use "Unverifiable" and route to follow-up, not replacement.
- Keep chat output brief; the workbook and the outreach drafts are the deliverables.
- Committee data can be sensitive — keep names and assessments factual and neutral ("no attendance since 2026-01-14"), never judgmental.
