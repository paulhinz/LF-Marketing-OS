# [Project Name] Messaging Document — required structure (v1.0)

The Messaging Document is the messaging source of truth for an LF project: what the project is, who it is for, what it stands against, what it claims and can prove, and the exact words every channel reuses. It follows the Linux Foundation's own communications framework (`references/lf-message-framework.md`: Vision → Mission → Positioning Platform → Tagline, then the message house) and adds the fields a senior product marketing manager keeps in a messaging source document for enterprise open source software: category, audiences, alternatives and differentiation, use cases, copy primitives, pillars, proof points, objections, what we don't claim, CTA anchors, terminology.

Voice, tone and language rules live in the Brand Guidelines (which runs after this document and derives them from it). Personas, firmographics and fit scoring live in the ICP document. Do not author them here.

**Two outputs, one content.** The Markdown file is the source of truth and is written first, section for section in the order below; the deck is rendered from it (`references/deck-outline.md`) and carries no sentence the Markdown lacks. Length budget: deck 14–18 slides (cap 20), Markdown ≤ 8 pages (`input-doc-mapping.md` §6).

Sourcing rule: every statement traces to a supplied document, the interview, the website, the README, the LFX project record, the press archive, or a Stat Bank row with a source and date. Anything else is `Needs input` or `[PROOF POINT TBD]`. A field from a supplied document is quoted verbatim and labeled `From your doc`.

---

## Front matter

```
# [Project Name] Messaging Document

| Field | Detail |
|---|---|
| Project | [Project Name] |
| Prepared by | LFX Marketing OS — Messaging Document Agent (build-lf-messaging-doc) |
| Date | YYYY-MM-DD |
| Status | Draft — pre-filled / Draft — from your documents / ED-reviewed — [name], [date] |
| Sources read | website · README · press release · brand page · LFX records (slugs) · supplied documents |
| Governance | [md.governance_sentence] |
| Copy | Internal / Agency-safe |
```

## Review Sheet

`input-doc-mapping.md` §5. One line of status and counts, then the table `| # | Field | Current wording | Source | Approve / Edit | Notes |` with rows in this order: Vision · Mission · Category · Positioning statement · Tagline · Audiences (one row) · Alternatives (one row) · 25-word summary · Boilerplate · Pillars (one row per pillar: tag + "How [Project] helps" line) · Proof points (one row: count and top three ids) · Objections (one row each: the challenge) · What we don't claim (one row) · CTA anchors (one row).

## 1. Communications framework

| Element | [Project Name] | Shelf-life | Primary audience | Source |
|---|---|---|---|---|
| Vision | one sentence | Longest | Internal, board, community | |
| Mission | one or two sentences | Long | Internal, members, partners | |
| Positioning platform | ≤40 words — identical to §2 positioning statement | Medium | Industry, analysts, press | |
| Tagline | locked line, or "Recommended: … (awaiting lock)" + alternates | Shortest | Users, event attendees | |

Rules: Vision and Mission come from the charter, a supplied document, the site or the interview; if none states one, propose one labeled `Inferred` and put it on the Review Sheet, never silently. The positioning platform and the positioning statement are one sentence under two labels. Tagline: record the line in use (site hero, press release) as locked; otherwise recommend one with up to three alternates, marked "awaiting lock by [requester]"; the Brand Guidelines do not re-open it.

## 2. Positioning

- **Category** (`md.category`): one line — the category the project claims, in the words a buyer or adopter uses, and one line on what it is not (the adjacent category people confuse it with).
- **Positioning statement** (`md.positioning`): one sentence, ≤40 words. The "For [audience] who [need], [Project] is the [category] that [benefit]; unlike [alternative], [differentiator]" formula is welcome but not required. "An", not "the", when a like-for-like alternative exists; no superlative without its proof point. A requester's own longer statement is kept verbatim and flagged.
- **Primary audiences** (`md.audiences`): names only, one "cares about" cue each, 3–6 lines. The ICP document defines them.
- **Top use cases** (`md.use_cases`): three lines — the jobs the project is adopted to do, each with a proof-point id where one exists.

## 3. Project definition and governance

- **What it is**: one or two sentences, jargon-minimal, with the governance sentence (`md.governance_sentence`) verbatim.
- **Two offers**, if the project has a membership program: one line on what the project offers adopters, one on what membership offers member organizations.
- **Entities**: the technical project and the foundation, named as the LFX record names them (never merged); the trademark sentence (`md.trademark_sentence`).

## 4. Copy primitives

Exact copy any channel drops in as-is: **25-word summary** (hard cap) · **50-word summary** (hard cap) · **Boilerplate** (100–150 words: what it is, who governs it with the governance sentence verbatim, license, where to learn more) · **Elevator pitch** (≤90 words) · **llms.txt** (fenced block: H1 project name, one-line blockquote summary, linked sections for docs / downloads / community / repo). When the requester's document carries graded boilerplates, quote them in the slots they fit and build only the missing lengths, labeled `Inferred`.

## 5. Alternatives and differentiation

Table `| Alternative | What it is | Where [Project] differs |` with 3–6 rows: the status quo ("doing X by hand" or "a per-vendor integration"), the proprietary option(s), other open source, and any member organization's like-for-like product, which is a **peer**, named only with the category-level difference and never as a rival. Then three to five lines on **how to differentiate without naming names** (by property: neutral governance, open standard, no lock-in, licensing, interoperability). "Who we actually lose to" belongs to the ICP document; reference it in one line.

## 6. Messaging pillars

3–5 pillars on the fixed scaffold (`input-doc-mapping.md` §4): Tag · What's happening · Why it matters · How [Project] helps, ≤120 words each, one proof-point id or `[PROOF POINT TBD]` per pillar. A supplied document's narratives are quoted verbatim under their own headings and mapped to the three parts in the sidecar. Close with the **goals vocabulary** line (default LF set: Brand Visibility · Member + Event Growth · Community Content · Project Adoption · Education Growth).

## 7. Message house

The one-page matrix the LF framework uses, **derived from §6, never authored separately**. Two spanning rows (Mission statement, Positioning statement), then one column per pillar and four rows: **Value proposition** · **Key message** · **Supporting points** (ids) · **Sound bite** (one quotable line, consistent with the key message). Every cell matches §6 by wording or id; the matrix carries no claim that is not in a pillar.

## 8. Proof points

One honest sentence on the size of the bench ("four sourced proof points; the strongest is P2; thin on end-user outcomes") and the acceptance test for a new one (a quantified outcome, a named organization the requester confirmed, a verifiable reference with a date, the pillar it serves). Then the top table, up to eight rows: `| ID | Claim (as displayed) | Pillar | Source | As of |`. The full ledger is Appendix B.

## 9. Objections and what we don't claim

**Objections** (`md.objections`): 3–5 entries on the four-line template — The challenge (in the skeptic's words) · Our thesis · Evidence (ids) · What we admit. Confident and fair; never disparaging a named competitor; no motive attributed to a named organization without its published words.

**What we don't claim** (`md.what_we_dont_claim`): 3–6 lines — not *the* standard when a peer exists; not the only solution; never that open source is universally cheaper, faster or safer; no "first" or "largest" without its proof point; membership is never required for access. A supplied document's "what we don't claim" lines are quoted verbatim.

## 10. CTA anchors, terminology and origin

- **CTA anchors** (`md.cta_anchors`): exactly four lines, one per tier with exact wording and destination URL: Learn · Engage · Contribute · Commit. Name a tier, working group or event only when confirmed.
- **Terminology** (`md.terminology`): project name usage and casing; sub-brand hierarchy and non-additive counts; terms to use and avoid that are messaging decisions (the Brand Guidelines carry the fuller Prefer / Avoid table); must-say phrases (Legal-approved) and must-not-say phrases; how members are counted and named.
- **Origin story** (`md.origin_story`): ≤120 words on the three-step template — what arrived (the donation, the contested market, the founding members) → what neutral governance changed → what emerged, with the number that proves it or the intended outcome stated as a goal. Dates from primary sources only.

## 11. Open decisions and next steps

Each decision with one owner: vision / mission wording, tagline lock, pillar names, adopters who may be named, governance sentence confirmation (LF Legal), any `Needs input` field. Then two lines: this document is the input to `build-lf-brand-guidelines` (voice and tone are derived from it) and the ICP agent, and to every content, deck and web agent after them.

<<<PAGEBREAK>>>

## Appendix A: Inputs and interview record

Supplied documents (title, link, date read, fields covered); URLs read with dates; LFX records used (name, slug, uid, legal entity, legal parent, charter URL) and the derived governance and trademark sentences; the interview questions actually asked and the answers verbatim with provenance labels; named adopters and figures the requester confirmed; conflicts between a supplied document and LFX / README and how they were resolved.

## Appendix B: Stat Bank

Every figure used anywhere, one row each: `| ID | Claim (as displayed) | Figure | Unit / grain | As of | Source | Caveat | Type | Verified at / with | Audience |`. Type ∈ Live-LFX / Published / Third-party / Interview / Your doc. Only rows with a source and a date are written. `Internal` rows (list prices, revenue, LFX-export rosters) are absent from the agency-safe copy. Record the canonical Live-LFX window once at the top.

---

## Section-completeness self-check (apply before building the deck)

1. The Review Sheet is present, fits two slides, and every row carries a Source label; every `Needs input` row is also TBD in the body.
2. Every fact in §1–§10 traces to a supplied document, the interview, the site, the README, LFX, the press archive or a Stat Bank row. Anything else is `Needs input` or `[PROOF POINT TBD]`.
3. Every figure has a Stat Bank row with Type, date and Source; no row was added without them.
4. §1 positioning platform and §2 positioning statement are identical text; a supplied positioning statement agrees with them or the conflict is flagged.
5. §7 cells match §6 by wording or id; the message house carries no claim that is not in a pillar.
6. Every pillar is ≤120 words on the scaffold with a tag; every objection is on the four-line template.
7. No named organization appears as an adopter, member or partner without a public page, a press release or an Appendix A confirmation; member products are peers.
8. No "only", "first", "largest", "most", "fastest", "no other" and no cost or speed comparison without its proof point in the same sentence, unless it is the requester's wording and flagged.
9. The governance and trademark sentences are the LFX-derived ones, verbatim, wherever they appear; foundation and Series LLC are never merged.
10. Every date traces to a primary document fetched during this run.
11. §2 positioning statement ≤40 words unless it is the requester's wording and flagged.
12. Every field from a supplied document is verbatim and labeled `From your doc`.
13. The deck is ≤20 slides, the Markdown ≤8 pages; speaker notes hold the llms.txt block, the full objection text and the source URLs.
14. `[project-slug].messaging-document.fields.yaml` exists with every `md.*` field; `[project-slug].inputs.yaml` was created or appended.
15. The delivery message carries the ten-line digest and, if `lfx-marketing-os-qa` is installed, its fix list.
