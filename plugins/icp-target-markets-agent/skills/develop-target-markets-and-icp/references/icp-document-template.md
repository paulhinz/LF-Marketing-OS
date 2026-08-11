# [Project Name] Target Markets and ICP — required structure

Full section-by-section spec. Build with the `docx` skill: US Letter page, a
navy/teal heading system is fine as a default (or match the companion Brand
Kit's own palette if one exists), tables for anything tabular below.

## Cover

Project name as title, one-line subtitle ("Market segment overview, ideal
customer profiles, personas, and fit/warmth scoring — one of three core LFX
Marketing OS foundational documents"), and a details table: Project,
Repository, Source Brand Kit, Source Message Foundation, Prepared for,
Prepared by ("LFX Marketing OS — ICP & Market Target Agent"), Date, Status
("Draft v1 — for review").

## How to Use This Document

Explain the three-document architecture (Brand Kit / Message Foundation Doc /
ICP Document — see Scope boundary in SKILL.md). List what this document
consumed (Brand Kit, Message Foundation Doc, GitHub README, live LFX data if
pulled, interview answers) and state the business outcome this ICP is
optimized toward, since it drives the fit/warmth weighting in Section 4.

## 1. Market Segment Overview

### 1.1 Category & Why Now

One paragraph: what category the project competes in, and 2-3 sentences on
why this category is timely (market shifts, licensing dynamics, cost
pressure, a technology inflection like AI). Ground this in the Brand Kit's
positioning and the user's own answers — don't invent market dynamics that
weren't discussed or aren't reasonably inferable from the README.

### 1.2 Competitive & Peer Landscape

Table: Alternative | Category Position | Where [Project] Differentiates — one
row per real competitor/peer the user named. Never invent a competitor's
positioning from nothing; if the user only named the product, describe its
category position from general knowledge but flag anything uncertain.
Close with a one-line "Whitespace" note: the specific combination this
project's ICP wants that competitors force customers to piece together
themselves.

### 1.3 Addressable Landscape (TAM / SAM / SOM)

Table: Tier | Definition | [Project] Framing. Keep TAM/SAM qualitative and
grounded (channel reach, community size) rather than inventing false-precision
numbers. For SOM, if the user didn't give a specific numeric target, write
**TBD — needs input** for the number itself, but still anchor the framing to
real current counts if available (e.g., actual active member count from live
LFX data).

### 1.4 Current Member/Adopter Segments

If live LFX membership data (or equivalent real adopter data) was pulled: a
table of Tier | Organizations | What This Tier Represents, built from the real
records — never a hypothetical roster. If no live data was available, replace
this subsection with **TBD — needs input: no member/adopter data source was
connected for this run** rather than inventing example companies.

## 2. ICP Definitions (Organization-Level)

One short paragraph explaining the ICP pattern used (default: two linked
ICPs — Community & Technical Adopter Organization, and Enterprise Member
Organization — reflecting that open-source adoption is bottoms-up while
membership/sponsorship decisions are top-down; collapse to a single ICP if the
project has no membership program or the interview doesn't support a split).

For each ICP, a labeled table with exactly these 5 fields (per the Velocity
Engine field reference):

- **ICP** — one paragraph describing the organization type, who's inside it,
  and how it enters the picture (bottoms-up vs. top-down).
- **Trigger Events / Compelling Moments** — the interview's trigger-event
  answer, specific to this ICP.
- **Who is not an ideal customer** — real disqualifiers if the user gave them;
  otherwise an explicitly labeled **inferred draft — confirm with PL**, never
  stated as settled fact.
- **Customer Use Cases** — pulled from the Brand Kit/README's stated use cases,
  split by which ICP each applies to.
- **Customer Pain Points** — pulled from the Brand Kit/Message Foundation's
  existing audience pain points, not re-invented from scratch.

## 3. Persona Definitions

One short paragraph noting how many personas sit under each ICP (2-3 per ICP)
and that they extend, not duplicate, any audience/persona work already done in
the Brand Kit or Message Foundation Doc.

For each persona, a labeled table with exactly these fields: Title, Nickname,
Role, Goals, Challenges, Works for, Other Roles Performed, Trusted Sources,
Key Responsibilities, Statements to share with the boss, Features and Persona
Benefits, Example Use Cases. Reuse the audience definitions (pain points, core
messages) already present in the Brand Kit/Message Foundation Doc as the
source for Goals/Challenges/Features fields — do not contradict them.

## 4. Fit & Warmth Scoring Inputs

One short paragraph referencing the Fit Score concept (how closely a contact
matches the ICP) and noting these attributes are weighted toward the business
outcome named in the interview (Step 1d, question 1).

Table: Attribute | High/Hot signal | Low signal. 4-6 attributes, covering at
minimum: a community/engagement signal, an organization-size or existing
relationship signal, a competitive-displacement signal (using the real
competitor names from Section 1.2), and a trigger-event-presence signal (using
the real trigger events from Section 2). Add a buying-committee-completeness
attribute if the project has a dual-audience ICP split.

## 5. Messaging & Content Handoff

Table: Persona | Lead Messaging Pillar | Proof Point to Use | Preferred
Channel — one row per persona from Section 3, mapped to a real messaging
pillar and proof point from the Message Foundation Doc (never invent a pillar
that doesn't exist there). This is the section that makes the document
directly usable for briefing web, content, social, and campaign work.

## 6. Validation & Review

Table: Sources used | Confirmed vs. inferred | Owner | Revisit cadence.
Explicitly call out which sections contain inferred/unconfirmed content (most
often Section 2's disqualifiers) so a reviewer knows exactly what to check
first. Recommend a quarterly revisit cadence, or immediately after a
significant market shift, matching the Marketing OS Agent List's documented
trigger phases for this agent.

## Appendix A: Document Architecture

Table: Brand Kit | Message Foundation Doc | ICP Document (this document) —
what each contains and which agent owns it. Mirror the companion Brand Kit's
own Appendix A wording for consistency across the document family.

## Appendix B: Source Intake

Table recording the raw answers to all intake questions verbatim, plus a note
on any live data pull performed (source system, query parameters, record
count, and date) — for traceability, mirroring the sibling documents' own
Appendix B/Interview Record.

---

### Section-completeness self-check (apply before finalizing)

Every fact in Sections 1, 2, 3, and 5 must trace to: the Brand Kit, the
Message Foundation Doc, the GitHub README, a live data pull, or an interview
answer. Anything else gets written as **TBD — needs input** or an explicitly
labeled **inferred draft**, never smoothed over with generic language.
