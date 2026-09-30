# [Project Name] Message Foundation — required structure (v0.3)

Every Message Foundation document contains the sections below, in this order. Notes under each define what "complete" looks like — use them to self-check before finalizing, not to fill space.

The structure follows the Linux Foundation's own communications framework (see `references/lf-message-framework.md`): a **brand message hierarchy** at the top (Vision → Mission → Positioning Platform → Tagline), the **word-count-locked copy** a writer grabs without reading further, the **messaging pillars** on a fixed scaffold with the **message matrix** derived from them, and the **evidence layer** (sourced proof points, objections with honest admissions, what we don't claim). Talking points, sound-bite banks, the tiered CTA library and per-persona ROI tables were removed in v0.3: downstream agents generate them on demand from the fields locked here. Audiences and personas live in the ICP document; the Brand Kit owns voice.

**Length budget: 8–10 pages target, 12 hard cap, no section over 300 words (Appendix B Stat Bank exempt)** — `references/input-doc-mapping.md` §6. One-sentence bullets. Tables for anything comparative. Fields a supplied foundation document provided are quoted verbatim with their source.

Format: the document is written as Markdown and rendered by `scripts/build_lf_doc.py` onto the LF Agent DOCS Template (see `references/lf-docs-template.md`). The builder generates the cover (project logo, project name, "Message Foundation", accent rule in the Brand Kit primary color, subtitle, details table with the status `Draft — pre-filled` / `Draft — from your documents` / `ED-reviewed — [name], [date]`) and the LF header and footer; do not write those into the Markdown. Start the Markdown at the Review Sheet with a `#` heading, use `##` for subsections, pipe tables wherever a table is called for, a fenced code block for `llms.txt`, and `<<<PAGEBREAK>>>` before each appendix.

Sourcing rule for the whole document: every fact traces to a supplied document, the interview answers, the Brand Kit, the GitHub README, or a named source in the Stat Bank. Anything else is written as **TBD — needs input** or `[PROOF POINT TBD]`.

---

## Review Sheet (two pages, first after the cover)

The only part the ED or SME is asked to read (`references/input-doc-mapping.md` §5). Three lines above the table: status; what the agent did with any supplied documents ("12 of 17 fields from your documents; 3 from the Brand Kit and README; 2 asked"); the one decision the requester still owes (usually the tagline lock or a Mission wording).

Then one pipe table, `| # | Field | Current wording | Source | Approve / Edit | Notes |`, with these rows in this order (field ids from `input-doc-mapping.md` §3):

1. Vision (`mf.vision`)
2. Mission (`mf.mission`)
3. Positioning platform (`mf.positioning_platform`)
4. Locked tagline (`mf.tagline_locked`)
5. 25-word summary (`mf.summary_25`)
6. 50-word summary (`mf.summary_50`)
7. Boilerplate (`mf.boilerplate`)
8. Elevator pitch (`mf.elevator_pitch`)
9. Messaging pillars — one row per pillar: tag and the "How [Project] helps" line (`mf.pillars`)
10. Proof points — one row: how many are sourced, the top three by id (`mf.proof_points`)
11. Objections — one row per objection: the challenge in the skeptic's words (`mf.objections`)
12. What we don't claim — one row per line (`mf.what_we_dont_claim`)
13. CTA anchors — one row: the four anchors (`mf.cta_anchors`)

Source is the provenance label (`From your doc §…` / `From Brand Kit` / `From README / LFX` / `Inferred` / `Partial` / `Needs input`). Approve / Edit is left blank for the reviewer. Notes carries the agent's flags: a positioning statement over 40 words in the requester's own wording, a superlative without proof, a figure awaiting an LFX pull, a pillar with no evidence.

## How to Use This Document

A routing block written for downstream agents and writers, one line per section: what to pull and for what ("For a press footer, copy §3 boilerplate verbatim"; "For a hero headline, use §1 tagline; alternates are in Brand Kit §8"; "For any claim, use only Appendix B rows with a source; otherwise write `[PROOF POINT TBD]`"; "Read Brand Kit §3 Prefer / Avoid before generating customer-facing copy"). Then the standing rules in three lines: quote fields verbatim, never invent evidence, and the three-document architecture (Brand Kit / Message Foundation / ICP Document). Name the structured sidecar `[project-slug].message-foundation.fields.yaml` as the machine-readable copy. Note the source date and, if a Brand Kit or supplied documents exist, that this document is derived from them (Appendix C has the trace).

## 1. Brand Message Hierarchy

The four locked statements everything else derives from, as one table:

| Element | Statement | Shelf-life | Primary audience | Source |
|---|---|---|---|---|
| **Vision** | one sentence | Longest | Internal, board, community | |
| **Mission** | one or two sentences | Long | Internal, members, partners | |
| **Positioning Platform** | ≤40 words | Medium | Industry, analysts, press | |
| **Tagline** | the locked choice, or "TBD — none locked (alternates in Brand Kit §8)" | Shortest | Users, event attendees | |

Rules:
- The Positioning Platform must agree with the Brand Kit's Positioning Statement (Brand Kit §2) and, where the requester supplied their own positioning statement, with that wording; if they diverge, say so and pick one with the user. A positioning statement written on the "For [audience] who [need], [Project] is the [category] that [benefit] — unlike [alternative], [differentiator]" formula is welcome but not required; fill "unlike" honestly or mark it TBD.
- Vision and Mission are not in the Brand Kit's scope; they come from a supplied document, the interview, the project charter, or the README. If none has them, write TBD — do not invent one. Many foundation messaging documents state a narrative arc or a brand principle instead of a labeled Mission; record that in Notes rather than relabeling it.
- One line under the table on how the elements relate ("Positioning platforms bridge the gap between long-term strategy and day-to-day execution and between internal and external audiences.").
- Under 300 words including the table.

## 2. Project Definition

- **What it is** — 1–2 sentences, jargon-minimal, grounded in the README / Brand Kit / supplied document, with the governance sentence from the Brand Kit's Appendix C verbatim.
- **Two offers, if the project has them** — one line each on what the project portfolio offers adopters and what membership offers member organizations, since messaging for LF foundations usually splits this way. Skip if the project has no membership program.

## 3. Copy Primitives (word-count-locked)

The exact copy any channel drops in as-is. Same five deliverables whether derived from a Brand Kit, a supplied document, or the interview:

- **25-word summary** — hard cap, standalone.
- **50-word summary** — hard cap, standalone, slightly more context.
- **Boilerplate** (100–150 words) — press-release-footer style: what it is, who governs it (the LFX-derived governance sentence), license, where to learn more.
- **Elevator pitch** (≤90 words) — usable standalone, a reader gets it with no other context.
- **llms.txt** — in a fenced code block, following the llms.txt convention (H1 project name, one-line blockquote summary, then linked sections for docs / downloads / community / repo).

When the requester's document already carries graded boilerplates (a one-sentence version, a ~50-word version, a 150-word version, a press boilerplate), quote them verbatim in the slots they fit and label them `From your doc`; build only the missing lengths and label those `Inferred`.

## 4. Voice

Do not rewrite the voice. Three lines: the Brand Kit §3 voice attributes by name, one sentence pointing to the Brand Kit's Prefer / Avoid table and What we don't claim, and the reading-level default (8th grade for external audiences; technical density for engineer personas). Then the **writing rules for decks and stat-led content**, as one short table with six rows — headlines are full declarative claims, stat-first with a one-line gloss and kicker, exact figures in body and rounded in headlines, no superlative without a Stat Bank row and its qualifier, every stat carries a source line and its caveat, register shifts are named. Under 200 words.

## 5. Messaging Pillars

3–6 pillars, each on the fixed scaffold from `references/input-doc-mapping.md` §4, ≤120 words per pillar:

- **Tag:** `short-stable-name` (the content tag downstream work is bucketed under)
- **What's happening:** the industry or user condition, with a cited figure (Stat Bank id) if one exists.
- **Why it matters:** the consequence for the audience, in their words.
- **How [Project] helps:** the mechanism, not the slogan; one proof-point id or `[PROOF POINT TBD]`.

Rules: a supplied document's narratives are quoted verbatim under their own headings, with the three parts identified in the sidecar; a pillar with no proof point says so in one line rather than borrowing a figure from another pillar; flagship projects or programs that are "living proof" of a pillar are named in "How [Project] helps" only after the requester confirmed them.

Close with the **Goals vocabulary**: a fixed list of 4–6 marketing goals every downstream piece of content is tagged against (default LF set, edit to fit: `Brand Visibility · Member + Event Growth · Community Content · Project Adoption · Education Growth`). One line, no explanation.

## 6. Message Matrix

The one-page "message house" the LF Communications Framework uses, **derived from §5, never authored separately**. One column per pillar. Rows: **Value Proposition** (from "Why it matters"), **Key Message** (one sentence, from "How [Project] helps"), **Supporting Points** (2–3, each a Stat Bank id or a fact from §2). Above the matrix, repeat the Mission and Positioning Platform from §1 as the two spanning header rows, exactly as the LF framework does. Every cell must match §5 word for word or by id; the matrix carries no claim that is not already in a pillar. The Sound Bites row of the older matrix is retired; spokesperson lines are generated on demand.

## 7. Proof Points

One paragraph stating the size of the evidence bench honestly ("three sourced proof points; the strongest is S2; the bench is thin on end-user outcomes") and the acceptance criteria for a new proof point: a quantified outcome, a named organization the requester confirmed, a verifiable reference with a date, and the pillar tag it serves. Then the **top proof points table**, up to eight rows: `| ID | Claim (as displayed) | Pillar tag | Source | As of |`. The full ledger with types, caveats, verification and audience marking is Appendix B; this section is the reader's view of it. Named adopters appear only after confirmation in Appendix A.

## 8. Objections & What We Don't Claim

**Objections** — 3–6 entries covering the hardest questions press, prospects, members or regulators actually ask, each on the four-line micro-template: **The challenge** (in the skeptic's words) · **Our thesis** (one sentence) · **Evidence** (Stat Bank ids or named facts) · **What we admit** (the part that is true and what the project is doing about it). Confident and fair; never disparaging a named competitor; an admission states facts about the project, not about a named member; no motive is attributed to a named organization without its published words.

**What we don't claim** — the Brand Kit's list, inherited verbatim, extended with messaging-specific limits (3–6 lines in all): not *the* standard; not the only solution; never that open source is universally cheaper, faster or safer; never a "first" or "largest" without its Stat Bank row; membership is never required for access. A supplied document's "what we don't do" or "what we don't claim" lines are quoted here verbatim.

## 9. Origin, CTAs, Terminology & Next Steps

- **Origin story** — ≤150 words on the three-step template: what arrived (the donation, the contested market, the founding members) → what neutral governance changed → what emerged, with the number that proves it, or the intended outcome stated as a goal if the project is too new. Dates come from the Brand Kit's Appendix C timeline. One before → after case, ≤60 words, only with a confirmed organization; otherwise none.
- **CTA anchors** — exactly four lines, one per tier, exact wording and destination: Learn · Engage · Contribute · Commit. Where a membership tier, working group or event is confirmed, name it; otherwise keep the anchor generic and say so. Downstream agents build campaign-specific CTAs from these four; no library here.
- **Terminology & constraints** — naming conventions (correct project name usage, casing, "the [X] project" vs. bare name, sub-brand hierarchy and non-additive counts), the governance and trademark sentences from the Brand Kit's Appendix C verbatim, and one line pointing to Brand Kit §3 Prefer / Avoid and §6 hard constraints rather than repeating them.
- **Next steps** — two sentences naming what this document is the input for (web copy, social bios, press boilerplate, campaign briefs, pitch decks, member briefings, board updates) and the LFX Marketing OS agents that consume it (ICP & Target Markets, Pitch Deck, Website Designer, Quarterly Campaign Plan, Case Study, Member Benefits Briefing). Those are separate, follow-on requests.

<<<PAGEBREAK>>>

## Appendix A: Inputs & Interview Record

Table of the supplied documents (title, link, date read, which `mf.*` fields they covered), then the raw answers to the interview questions actually asked, verbatim, with dates and the provenance label per `input-doc-mapping.md` §2. Record which named adopters and figures the requester explicitly confirmed, and every conflict between a supplied document and the LFX record, the Brand Kit or the README with how it was resolved. Mirrors the Brand Kit's Appendix B so the document family stays consistent.

## Appendix B: Stat Bank / Proof-Point Ledger

Every number used anywhere in this document, and every number a downstream deck may need, in one table:

| ID | Claim (as displayed) | Figure | Unit / grain | Period or as-of date | Source | Caveat | Type | Verified at / with | Audience |
|---|---|---|---|---|---|---|---|---|---|

Rules:
- **Only sourced rows.** A row without a Source and a date is not written; the claim that needed it reads `[PROOF POINT TBD]` in the body. Never pad the table to look complete.
- **Type** is one of `Live-LFX` (regenerable from LFX Insights / Meetings / membership via the LFX MCP tools; record the exact metric name and data window), `Published` (annual report, press release, transparency report), `Third-party` (analyst, academic, press, a standard or RFC — fetch the primary document; a date taken from a summary or another marketing document is not verified), `Interview` (requester-stated, not independently verified — flag it), or `Your doc` (a figure carried in the requester's own document, with its cited source copied across).
- **Verified at / with** records the date and the tool call or fetch that confirmed the figure. A row without it says so.
- **Audience** is `External` or `Internal`. Membership list-price and revenue figures, and anything derived from an LFX export rather than a public page, are `Internal` and are stripped from the agency-safe copy.
- **Caveat** is mandatory when the figure is an undercount, a floor, non-additive across sub-brands, or uses a different unit from a published count ("every figure here is a floor").
- Record the **canonical data window** for Live-LFX figures once at the top ("trailing 12 months, Sept 1 2025 – Aug 31 2026; snapshots as of Sept 1 2026").
- If the LFX MCP tools are connected, offer to pull `member_organizations`, `memberships by=tier`, `new_members period=month`, `contributors`, `contributing_organizations`, `event_registrations`, `speakers`, `training_enrollments`, `certifications`, `maintainers` and committee counts; read `read_lfx_standard_metrics_guidance` once first. Otherwise the row is `TBD — pull from LFX` with the metric named. A zero for contributors usually means the GitHub org is not onboarded to LFX Insights — say that.
- Hero-number sets (four ids, a thesis, a kicker) are no longer stored here; the deck-building agents compose them from this table.

## Appendix C: Source Trace

A short table listing each Message Foundation section and where it came from — the requester's supplied document (title and section), the Brand Kit section per `references/brand-kit-field-mapping.md`, the README, LFX, or the interview — plus conflicts found and how they were resolved. When no Brand Kit and no supplied document existed, state that and list the interview questions used instead. Definitions of Vision, Mission, Positioning Platform, Tagline, Value Proposition, Key Message, Supporting Point and Proof Point are in `references/lf-message-framework.md`; cite it in one line instead of reproducing the glossary.

---

### Section-completeness self-check (apply before finalizing)

1. The Review Sheet is present, fits in two pages, and every row carries a Source label; every `Needs input` row is also TBD in the body.
2. Every fact in §1–§8 traces to a supplied document, the interview answers, the Brand Kit, the GitHub README, or a Stat Bank row with a named source. Anything else is **TBD — needs input** or `[PROOF POINT TBD]`.
3. Every number in the document has a Stat Bank row; every Stat Bank row has a Type, a date and a Source; no row was added without them.
4. §1 Positioning Platform, the Brand Kit's Positioning Statement and any positioning statement in a supplied document do not contradict each other.
5. §6 Message Matrix cells match §5 word for word or by id; no claim appears in the matrix that is not in a pillar.
6. Every pillar is ≤120 words on the three-part scaffold with a tag; every objection is on the four-line template.
7. No named organization appears as an adopter or customer without an explicit confirmation in Appendix A.
8. No superlative appears without its Stat Bank id and qualifier — including "only", "first", "the major" and "no other" — unless it is the requester's own wording, in which case it is flagged in the Review Sheet Notes.
9. The governance and trademark sentences in §2, §3 and §9 are the ones in the Brand Kit's Appendix C (LFX-derived), verbatim. The foundation and the Series LLC are never merged into one entity.
10. Every date traces to a primary source fetched during this run, not to another marketing document.
11. No sentence in §1 exceeds about 40 words unless it is the requester's own wording (flagged).
12. Every field taken from a supplied document is verbatim, in the requester's spelling and punctuation, and labeled `From your doc`.
13. The document is within 12 pages and no section other than Appendix B exceeds 300 words.
14. Every Stat Bank row marked `Internal` is absent from the agency-safe copy, and the document says which copy it is.
15. `[project-slug].message-foundation.fields.yaml` exists with every `mf.*` field, and `[project-slug].inputs.yaml` was created or appended.
16. The delivery message carries the ten-line digest and, if the `lfx-marketing-os-qa` skill is installed, its fix list.
