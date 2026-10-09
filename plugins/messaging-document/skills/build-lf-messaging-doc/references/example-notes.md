# Structural lessons from prior LF/industry messaging docs

Source: "Copy of CNCF Messaging Framework 2026" (the benchmark bundled as `cncf-messaging-framework-2026.md`) — plus "Copy of CNCF AI / Inference Message Source," "Copy of OpenSearch Project Messaging - Final," and "Copy of MS ... Linux Foundation Education Messages Platform" (referenced from a shared LF messaging-examples folder, not bundled here).

## What the CNCF file does well (keep)
- States its own **Goals** up front (new narrative, drive event attendance, attract/upgrade members) — ties messaging to a business objective, not just words.
- **Target Audiences** segmented by role cluster (Community / Members / Users) with Titles, Problem, Concerns per segment — the model for Section 5.
- **Messaging Pillars** each carry a short supporting narrative and a named example (project, program, or proof) — the model for Section 6.
- Offers **multiple UVP lengths**, including short "event signage" versions — carried into Section 4.

## Where it falls short (fixed in the template)
- No **Voice & Tone** section at all — writers have no guidance on how to *sound*, only what to say. OpenSearch's toolkit does this well (explicit Do/Don't list, reading-level note, a sounds-like/doesn't-sound-like pair) — added as Section 2.
- No **elevator pitch with word counts** — OpenSearch's Short/Medium/Long format with word counts is more directly usable by a copywriter; added as Sections 1 and 1a.
- Proof points are sometimes asserted without a number or named source (e.g., generic "industry interest is growing"). The template forces an explicit TBD, or a generic-but-verifiable substitute, instead of unsupported claims.
- No **Talking Points / Soundbites** section separated from pillars — the companion "CNCF AI/Inference Message Source" doc *does* have this (Executive Soundbite, Suggested Social Message, Audience-Specific Angles) and it's genuinely more usable for a PR/exec-support ask-list. Merged into Section 8.
- No **Value Message → Support → Proof** chain — LF Education's platform doc has this structure and it's the most rigorous of the source docs for defensibility; added as Section 7.

## Net structural change
The template = CNCF's audience segmentation + pillar structure, plus OpenSearch's voice/tone and elevator-pitch discipline, plus LF Education's value/support/proof rigor, plus an explicit no-unsupported-claims rule none of the source docs enforce consistently, plus the word-count-locked derivatives (Section 1a) that the LFX Marketing OS Brand Kit architecture expects this agent to own.

---

# v0.2 addendum — lessons from the LF communications framework and the September 2026 executive decks

Source: two positioning decks from Jim Zemlin ("The Linux Foundation Communications Framework"; "Linux Foundation Marketing Template") and five decks built from LF messaging (Oracle and IBM/Red Hat executive briefings; the "Where the world builds together" LF narrative deck; the DPI/OpenWallet keynote; the CNCF Governing Board deck, July 2026). Full detail in `lf-message-framework.md`.

## What the v0.1 template was missing (fixed in v0.2)
- **No top-of-house hierarchy.** The LF framework locks Vision → Mission → Positioning Platform → Tagline, each with a shelf-life and primary audience, before any pillar is written. v0.1 started at the positioning statement. Added as §1, with the definitions as Appendix B.
- **Elements scattered instead of arranged.** The LF framework's core artifact is one table — value proposition, key message, supporting points, sound bites — per business line or pillar, under two spanning rows for Mission and Positioning. v0.1 had the same ingredients across §3–§8 but never as one page. Added as §8 Message Matrix.
- **Numbers without provenance.** Every figure in the executive decks carries a source, an as-of date or window, and a caveat, and is visibly live-LFX, published, or third-party. v0.1 asked for "a real stat" but had no place to record where it came from. Added as §10 Stat Bank with a Type column, canonical data window, and pre-packaged hero-number sets.
- **Audiences described, not armed.** The briefings frame the same facts per persona (CFO: % of R&D and 2× productivity; CTO: governance follows code; policy: IP framework and regulation) and plant executive questions. Added as §6a.
- **No origin story or case pattern.** The narrative deck's repeatable "donation → neutral governance → industry default" arc and BEFORE/AFTER market cases are the most persuasive content in the set and had no home. Added as §11.
- **No stance on hard questions.** The IBM briefing spends a third of its length on named challenges with a thesis, evidence, answer and ask, and the narrative deck states an honesty posture ("we publish our own bad news"). Added as §12 with a mandatory "what we admit" line.
- **CTAs implied, not catalogued.** Asks appear at every commitment level and per audience. Added as §14, tiered Learn / Engage / Contribute / Commit.
- **Pillars not usable as tags.** The CNCF marketing update buckets every content item under a named narrative and a "Supports:" goal. Pillar names are now required to be short tag-style labels, with a fixed goals vocabulary in §7.
- **Brand Kit read as a blob.** v0.1 said "read it fully." v0.2 maps each Brand Kit section to each Message Foundation section and recorded the trace in an appendix; in v1.0 the order is reversed and the Brand Guidelines read the Messaging Document sidecar instead.

## Voice rules the decks actually follow (now in §3)
Declarative full-sentence headlines; stat first, gloss second, em-dash kicker third; exact figures in body and rounded in headlines; no superlative without a qualifier and a source; caveats disclosed inline; named register shifts (celebratory / institutional / declarative).

## Net structural change
v0.2 = the LF framework's hierarchy and matrix on top, the v0.1 body (voice, positioning, UVP, audiences, pillars, value→support→proof, talking points, terminology) in the middle, and the evidence-and-activation layers the decks consume (Stat Bank, audience angles, origin story and cases, objections, CTA library) underneath — with a Brand Kit field mapping and a source trace so the three foundation documents stay consistent.

## What v0.3 of the template changed, and why (September 2026)

The section numbers above refer to the v0.2 template. In September 2026 an
Executive Director reviewing a 43-page Message Foundation for his foundation
said he would not read it, that "less is more with AI-generated content", and
that a document downstream agents depend on "needs to be reviewed and owned by
a human, otherwise you end up with a cycle of AI slop". His own team's
messaging framework, persona file and competitive note (about 9,500 words in
total) were built from repeated micro-templates, tables for anything
comparative, explicit "what we don't claim / what NOT to say" blocks, a
routing "How to use this document" header for downstream prompts, and a
one-row proof table that said plainly the evidence bench was thin.

v0.3 keeps every field the LF framework and the executive decks consume and
moves the rest out of storage:

- **Kept and locked:** hierarchy (§1), copy primitives (§3), pillars on a
  three-part scaffold (§5), the message matrix derived from them (§6), sourced
  proof points (§7 / Appendix B), objections with admissions and "what we don't
  claim" (§8), origin story and four CTA anchors (§9).
- **Retired from the stored document** (generated on demand by downstream
  agents): §6 target audiences and §6a audience angles (now the ICP document's
  personas), §5 UVP alternates, §13 talking points and sound bites, §14 tiered
  CTA library, hero-number sets.
- **Added:** the two-page Review Sheet, the existing-document intake (Step
  0a), the length budget (8–10 pages, 12 hard cap), verbatim quoting of the
  requester's own wording with a Source label, and the structured sidecar.
