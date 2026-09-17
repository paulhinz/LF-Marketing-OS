# [Project Name] Message Foundation — required structure (v0.2)

Every Message Foundation document must contain the sections below, in this order. Notes under each define what "complete" looks like — use them to self-check before finalizing, not just to fill space.

The structure follows the Linux Foundation's own communications framework (see `references/lf-message-framework.md`): a **brand message hierarchy** at the top (Vision → Mission → Positioning Platform → Tagline), a **message matrix** in the middle (Value Proposition → Key Message → Supporting Points → Sound Bites, one column per pillar), and the **evidence and activation layers** downstream agents consume (stat bank, audience angles, objections, CTAs). Word-count-locked derivatives sit near the top so a copywriter can grab them without reading the whole document.

Sourcing rule for the whole document: every fact traces to the interview answers, the Brand Kit, the GitHub README, or a named source in the Stat Bank. Anything else is written as **TBD — needs input**.

---

## 0. Overview

One paragraph: what the project is, what this document is for, and who should use it (anyone writing web copy, social, campaigns, decks, or talking to press/members about the project). Note the source date and, if a Brand Kit exists, that this document is derived from it (see Appendix C for the section-level trace).

## 1. Brand Message Hierarchy

The four locked statements everything else derives from. Present them as a table with three columns — **Statement**, **Shelf-life**, **Primary audience** — using the LF framework's definitions:

| Element | What it is | Shelf-life | Primary audience |
|---|---|---|---|
| **Vision** | The long-term reason for being; aspirational, one sentence. | Longest | Internal, board, community |
| **Mission** | Purpose, scope of business and unique competencies; more concrete than the vision. | Long | Internal, members, partners |
| **Positioning Platform** | The role the project wants to occupy in its industry and its relevance to its most important audiences — the "conceptual space" it claims. Usually one or two sentences. | Medium | Industry, analysts, press |
| **Tagline** | A creative articulation of the unique value proposition; short enough for signage. | Shortest | Customers, users, event attendees |

Rules:
- Pull the Positioning Statement and Tagline options from the Brand Kit if one exists (Brand Kit §2 and §8); the Tagline here is the **locked choice** among those options, or TBD if the user has not chosen. Mark the others as "alternates held in Brand Kit §8."
- Vision and Mission are not in the Brand Kit's scope; they come from the interview, the project charter, or the README. If neither exists, write TBD — do not invent one.
- Include one line under the table on how the elements relate ("Positioning platforms bridge the gap between long-term strategy and day-to-day execution and between internal and external audiences.").

## 2. Project Definition

- **What it is** — 1–2 sentences, jargon-minimal, grounded in the README/Brand Kit, not marketing fluff.
- **Elevator pitch (long, ~60–90 words)** — usable standalone, a reader gets it with no other context.

## 2a. Word-Count Derivatives

Per the LFX Marketing OS document architecture (Brand Kit → Message Foundation → ICP Document), when a project has a Brand Kit these are derived *from* it; otherwise they are built directly from the interview and README. Same five deliverables either way:

- **25-word summary** — hard cap, standalone.
- **50-word summary** — hard cap, standalone, slightly more context than the 25-word version.
- **Boilerplate** (~100–150 words) — press-release-footer style: what it is, who governs it, license, where to learn more.
- **llms.txt** — following the llms.txt convention (H1 project name, one-line blockquote summary, then linked sections for docs/downloads/community/repo) so AI crawlers and agents get an accurate, structured summary.
- **Elevator pitch slide** — a single slide's worth of content: headline (≤10 words), 3–4 supporting bullets, one proof point from the Stat Bank (§10) with its source, one CTA from the CTA Library (§14).

## 3. Voice & Tone

- Three (or the user's) voice adjectives, each with one line on what it means in practice. If a Brand Kit exists, reproduce its **Voice & Tone Summary (Component 5)** table verbatim and reference its fuller Voice Attribute tables rather than rewriting them.
- A short "Do / Don't" list (5–8 items) translating those adjectives into writing behavior, with a "sounds like / doesn't sound like" example pair per adjective.
- Reading-level guidance (default 8th-grade for external audiences; deeper technical density only for engineer personas).
- **Writing rules for decks and stat-led content** — the register LF executive decks actually use. Include these unless the Brand Kit overrides them:
  - Headlines are full declarative sentences that make a claim ("The neutral room is the product"), not topic labels ("Membership overview").
  - Stat-first: lead with the number, follow with the one-line gloss, then a short em-dash "kicker" line that says what the number means.
  - Exact figures in body text (126,864); rounded in headlines (126,000). Never round in a way that changes the claim.
  - No superlative ("largest," "fastest-growing," "most-used") without a Stat Bank entry behind it and its qualifier stated ("largest end user network of any open source software foundation").
  - Every stat carries a source line; every undercount carries its caveat ("every figure here is a floor").
  - Register shifts are allowed and should be named: celebratory for community milestones, institutional for analyst/press, plainly declarative for vision and asks.

## 4. Positioning Statement

Single-sentence formula: **For [primary audience] who [need/problem], [Project] is the [category] that [key benefit] — unlike [alternative/status quo], [key differentiator].**
Fill "unlike" honestly; if the user didn't name a real alternative, mark that clause TBD rather than inventing a strawman. This statement must be consistent with the Positioning Platform in §1 and the Brand Kit's Positioning Statement (§2) — if they diverge, say so and pick one with the user.

## 5. Unique Value Proposition

- One paragraph UVP.
- 2–3 short/tagline-style alternates suitable for event signage or a hero headline, clearly labeled as options, not a final decision (the locked tagline lives in §1).

## 6. Target Audiences

One entry per audience segment named by the user (or clearly inferable from the README/Brand Kit; the Brand Kit §4 table is the starting point). For each: **Titles/roles**, **Problem** (in their words, not ours), **Concerns/objections**, **Core message**, **Sample CTA** (reference the CTA Library, §14). If the interview surfaced multiple outreach objectives (awareness, membership sales, event attendance/sponsorship, education sales), add an **Outreach Objective → Primary Audience → Angle** mapping table.

## 6a. Audience Angles & ROI Framing

Extends §6 from *description* to *what lands*. One row per persona:

| Persona | The framing line that lands | 2–3 proof points (Stat Bank IDs) | The executive question to plant | Preferred CTA (§14) |
|---|---|---|---|---|

Guidance:
- Typical LF personas: economic buyer / CFO ("<X% of your annual R&D budget"; "2× productivity for firms that contribute vs. only consume"), CTO / engineering leader (maintainer counts, governance seats, "governance follows code"), legal / policy (license terms, IP framework, regulatory alignment), developer / maintainer (contributor ladder, mentorship, "nobody answers to us"), end-user organization (reference architectures, peer adopters), regional (local governance entity, local-currency funding).
- "Executive question to plant" is the question you want a decision-maker to ask their own team or vendors ("Is your platform [Project]-conformant?"; "Are we building on the standard API or something custom?"). Leave TBD if none is defensible yet.
- Every proof point must be a Stat Bank ID; do not restate numbers here.

## 7. Messaging Pillars

3–5 pillars max. For each: a **short name usable as a content tag** (e.g. `AI Narrative`, `Project + Community Momentum`, `Brand & Community`), 2–4 sentences of supporting narrative, 1–3 **flagship proof projects or programs** that are "living proof" of the pillar, and at least one **proof point** referenced by Stat Bank ID. If a pillar has no real proof point yet, say so explicitly.

Close the section with the **Goals vocabulary**: a fixed list of 4–6 marketing goals every downstream piece of content will be tagged against with a "Supports:" label. Default LF set (edit to fit the project): `Brand Visibility · Member + Event Growth · Community Content · Project Adoption · Education Growth`. Downstream agents (campaign briefs, content, board updates) use pillar tags and goal tags to bucket and count output, so the names must be short and stable.

## 8. Message Matrix

The one-page "message house" — the LF Communications Framework's core artifact. One column per pillar (or per business line if the project has distinct offerings, e.g. Projects / Events / Training / Community). Rows, top to bottom:

| | Pillar 1 | Pillar 2 | Pillar 3 | Pillar 4 |
|---|---|---|---|---|
| **Value Proposition** | the ultimate benefit "promised" to the audience — rational and emotional | | | |
| **Key Message** | one concise sentence expressing leadership or differentiation | | | |
| **Supporting Points** | 2–3 reasons the key message is true | | | |
| **Sound Bites** | 1–2 quotable lines a spokesperson or audience would "play back" | | | |

Above the matrix, repeat the Mission and Positioning Platform from §1 as the two spanning header rows, exactly as the LF framework does. Every cell must be consistent with §7 and §9 — this is a *view* of the same content, not new content. Supporting points that are numbers must appear in the Stat Bank.

## 9. Value Messages, Support Points & Proof Points

A structured list: **Value message** (a single claim, e.g. "We reduce operational risk") → **Support points** (2–3 reasons that back the claim) → **Proof points** (Stat Bank IDs, named adopters the user confirmed, benchmarks, third-party validation, or the generic-but-verifiable substitute — community/repo metrics, license terms, governance facts). This is the rigor layer under §8.

## 10. Stat Bank / Proof-Point Ledger

Every number used anywhere in this document, and every number a downstream deck may need, in one table:

| ID | Claim (as displayed) | Figure | Unit / grain | Period or as-of date | Source | Caveat | Type | Verified at / with | Audience |
|---|---|---|---|---|---|---|---|---|---|
| S1 | "1,500+ open source efforts" | 1,500+ | projects, umbrella-wide | as of Sept 2026 | LF 2025 Annual Report | non-additive with sub-project counts | Published | 2026-09-16, fetched report p.4 | External |

Rules:
- **Type** is one of `Live-LFX` (regenerable from LFX Insights/Meetings/membership via the LFX MCP tools; record the exact query or metric name), `Published` (annual report, press release, transparency report), `Third-party` (analyst, academic, press, a standard or RFC — record author, title, year, and fetch the primary document: a date taken from a summary or another marketing document is not verified), or `Interview` (user-stated, not yet independently verified — flag it).
- **Verified at / with** records the date and the tool call or fetch that confirmed the figure (`query_lfx_standard_metrics memberships by=tier`, `search_members`, a URL). A row without it is unverified and says so.
- **Audience** is `External` or `Internal`. Membership list-price and revenue figures, and anything derived from an LFX export rather than a public page, are `Internal`: they stay in an internal appendix and are stripped from any copy an outside agency consumes. External roster references cite the project's public members page or the press release, never the LFX export.
- **Caveat** is mandatory when the figure is an undercount, a floor, non-additive across sub-brands, or uses a different unit from a published count. Reproduce the standard LF caveat phrasing: "every figure here is a floor," "matched on corporate email domains only," "a company joining three foundations counts three times."
- Record the **canonical data window** for Live-LFX figures once at the top of the section (e.g. "trailing 12 months, Sept 1 2025 – Aug 31 2026; snapshots as of Sept 1 2026") so every downstream deck reuses the same window and stays mutually consistent.
- **Hero-number sets**: below the table, list 2–4 pre-packaged "big four" groups (four Stat Bank IDs + a one-sentence thesis + a kicker line) by theme — e.g. Scale, Momentum, Community, Return. These are the standard four-tile slide grammar in LF executive decks.
- If the LFX MCP tools are connected, the skill offers to pull Live-LFX figures during generation; otherwise the row is `TBD — pull from LFX` with the metric named. The standard-metric families worth offering for a foundation: `member_organizations` (today and at the launch date), `memberships by=tier`, `new_members period=month`, `contributors` and `contributing_organizations` (a zero usually means the GitHub org is not onboarded to LFX Insights — say that, not "no contributors"), `event_registrations`, `speakers`, `training_enrollments`, `certifications`, `maintainers`, plus committee and past-meeting counts. Read `read_lfx_standard_metrics_guidance` once before the first call.
- Named adopters and customers appear here only after the user confirmed them (interview record must show it).
- Counts of governance bodies name the bodies: "4 committees onboarded" that includes an LF staff group is "three governance committees (Governing Board, TSC, Marketing)".

## 11. Origin Story & Before → After Case Library

- **Origin story** (one paragraph, then a three-step template): *What arrived* (the donation, the contested or closed market, the founding members) → *What neutral governance changed* (competitors adopt what none of them owns; IP held neutrally; business separated from technical decisions) → *What emerged* (the industry default, in N years, with the number that proves it). If the project is too new for step three, say so and state the intended outcome as a goal, not a fact.
- **Before → After cases** (2–4): for each — industry or user segment, the "before" problem in one line, 2–3 before facts, 2–4 after facts with numbers (Stat Bank IDs), a one-line moral, and sources. Named organizations only with user confirmation.
- **What winning looks like**: four short victory conditions (2–5 words each, one line of explanation) and one closing sentence defining success — the standard closer in LF strategy decks.

## 12. Objections, Threats & Our Stance

3–6 entries covering the hardest questions press, prospects, members, or regulators actually ask. For each:

- **The challenge** — one plain sentence, in the skeptic's words.
- **Our thesis** — one sentence stating the position.
- **Evidence** — Stat Bank IDs or named facts.
- **Rebuttal / reframe** — 2–3 sentences, confident and fair, never disparaging a named competitor (per the Brand Kit's competitive-tone rule).
- **What we admit** — the part of the criticism that is true and what the project is doing about it. LF's own decks publish declining metrics and at-risk lists plainly ("we publish our own bad news — and act on it"); this document should permit and model that. Two limits: an admission states facts about the project, not about a named member (no "Coinbase remains the largest contributor" without a Stat Bank row, and no role assigned to a member — "operates the public facilitator" — without a verified source); and a rebuttal never assigns motives to named organizations ("regulated participants join because…") — quote their published words instead, which the press releases supply.

## 13. Talking Points & Soundbites

- **Executive soundbite** — one quotable sentence for a keynote or exec quote.
- **Short/social message** — one paragraph sized for a social post or newsletter blurb.
- **Audience-specific angles** — one line each for the audiences in §6, consistent with §6a.
- **Sound bite bank** — 6–10 additional quotable lines, each tagged with the pillar it serves and where it is appropriate (keynote, press, member meeting, social). Sound bites are the most quoted and least checked text in the package: every date or number inside one is checked against its primary source before the line is written (a past run shipped a keynote-tagged sound bite whose year was wrong by two years), and a roster that includes nonprofits and foundations is "organizations", never "companies".

## 14. CTA Library

Calls to action tiered by commitment and mapped to audience:

| Tier | CTA (exact wording) | Audience (§6) | Rationale / what they get | Destination or contact | Pillar tag |
|---|---|---|---|---|---|
| Learn | | | | | |
| Engage (join a WG, user group, mailing list; attend an event) | | | | | |
| Contribute (submit code, a project, a case study, a talk) | | | | | |
| Commit (join or upgrade membership; sponsor; fund a program) | | | | | |

Include at least one CTA per tier or mark the tier TBD. Where a specific membership tier, sponsorship package, or event is confirmed, use it; otherwise keep the CTA generic and note that. Every Sample CTA in §6 and every CTA on the elevator pitch slide (§2a) must be drawn from this table.

## 15. Terminology, Constraints & Differentiation

- Naming conventions (correct project name usage, capitalization, "the [X] project" vs. bare name, sub-brand hierarchy and which counts are non-additive).
- Anything to avoid (colors/marks, trademark concerns, LF-family consistency notes, named-competitor restrictions) — pull directly from the Brand Kit §6 Hard Constraints or the user's constraint answer.
- Reference brands/projects named as admired or to differentiate from, and one line on what's being borrowed vs. avoided from each (Brand Kit §6 "How to Differentiate Without Naming Names" is the source when it exists).

## 16. Next Steps

One short paragraph naming what this document is the input for (web copy, social bios, press boilerplate, campaign briefs, pitch decks, member briefings, board marketing updates, sales one-pagers) and a reminder that those are separate, follow-on requests — this document is the foundation, not the finished asset. Name the LFX Marketing OS agents that consume it (ICP & Target Markets, Pitch Deck, Website Designer, Quarterly Campaign Plan, Case Study, Member Benefits Briefing).

## Appendix A: Interview Record

Raw decisions/answers collected during the session, for traceability — mirrors the Brand Kit's Appendix B source-intake table so the document family stays consistent. Record which named adopters and figures the user explicitly confirmed.

## Appendix B: Definitions Glossary

Reproduce the LF Communications Framework definitions so contributors use the terms the same way (source: `references/lf-message-framework.md`):

- **Vision** — the organization's long-term reason for being.
- **Mission** — declares the organization's purpose, or why it exists; scope of business and unique competencies. More concrete than the vision and often informs it.
- **Positioning** — the conceptual "space" a company occupies in the mind of the customer. Rooted in competitive advantage and how that advantage is expressed. Must resonate with broad audiences yet motivate individuals on their own terms.
- **Positioning Platform** — the desired role in an industry and relevance to the most important customers; bridges long-term strategy and day-to-day execution, and internal and external audiences.
- **Tagline** — a creative articulation of the unique value proposition.
- **Value Proposition** — derived from the positioning; defines the ultimate benefits "promised" to the customer, based on both rational and emotional variables.
- **Key Message** — the concise expression of a company's desired and/or real positioning to a target audience. Typically three or four; should express leadership and points of differentiation.
- **Supporting Point** — a reason the key message is true.
- **Proof Point** — the tangible, essential elements that reinforce and validate messages and position; concrete examples of how the position has been, or will be, established.
- **Sound Bite** — how key audiences might "play back" the position and key messages; creative expressions that increase a spokesperson's quotability.
- **Messaging Pillar** — a named theme grouping a value proposition, key message, supporting points and sound bites; also the content tag downstream work is bucketed under.

## Appendix C: Source Trace (Brand Kit → Message Foundation)

When a Brand Kit exists, a short table listing each Message Foundation section and the Brand Kit section it was derived from, per `references/brand-kit-field-mapping.md`, plus any conflicts found and how they were resolved. When no Brand Kit exists, state that and list the interview questions used instead.

---

### Section-completeness self-check (apply before finalizing)

1. Every fact in §1, §2, §2a, §4, §7, §8, §9, §10, §11 and §12 traces to the interview answers, the Brand Kit, the GitHub README, or a Stat Bank row with a named source. Anything else is **TBD — needs input**.
2. Every number that appears anywhere in the document has a Stat Bank row; every Stat Bank row has a Type, a date, and a Source.
3. §1 Positioning Platform, §4 Positioning Statement, and the Brand Kit's Positioning Statement do not contradict each other.
4. §8 Message Matrix cells are consistent with §7 and §9 — same claims, same numbers.
5. Every CTA used in §2a, §6 and §6a exists in §14.
6. No named organization appears as an adopter or customer without an explicit confirmation in Appendix A.
7. No superlative appears without its Stat Bank ID and qualifier — including "only", "first", "the major" (implies all) and "no other", and including inside §5, §12 admissions and §13 sound bites.
8. The governance and trademark sentences in §0, §2a, §7, §9, §12 and §15 are the ones in the Brand Kit's Appendix C (LFX-derived), verbatim. The foundation and the Series LLC are never merged into one entity.
9. Every date in the document traces to a primary source fetched during this run (an RFC, a release, a filing), not to another marketing document.
10. No cost or performance comparison ("for less than…", "clears in seconds…") appears without a cited basis; no motive or role is attributed to a named organization without its published words or a verified record.
11. No sentence in §1 or §4 exceeds about 40 words; a 90-word positioning sentence fails the voice's own "Direct" rule even when every clause is true.
12. Every Stat Bank row marked `Internal` is absent from the agency-safe copy, and the document says which copy it is.
13. The delivery message carries the one-page digest and, if the `lfx-marketing-os-qa` skill is installed, its fix list.
