---
name: develop-lf-project-messaging-foundation
description: >
  Interviews a Linux Foundation project lead (or pre-fills the interview in batch mode) and
  produces a "[Project Name] Message Foundation" document on the LF communications framework:
  Vision, Mission, Positioning Platform and Tagline, a one-page Message Matrix, word-count-locked
  summaries, boilerplate, llms.txt and elevator pitch, voice, audiences with persona ROI angles,
  tagged messaging pillars, a verified Stat Bank, origin story and cases, objections and stance,
  talking points and a tiered CTA library, for web, content, social, campaigns, pitch decks and
  member briefings. This is the LFX Marketing OS Message Foundation Agent. Trigger on the exact
  command "Develop LF Project Messaging Foundation", on "pre-fill the Message Foundation for
  [project]", or on any request to build a messaging foundation, message house, message platform
  or positioning document for an LF project. Delivers the document Google Docs-ready on the
  LF Agent DOCS Template, with the project's name and logo on the cover and the project's
  brand colors applied.
metadata:
  version: "0.4.0"
  author: "Paul Hinz, Linux Foundation"
---

# Develop LF Project Messaging Foundation

Produce a `[Project Name] Message Foundation` document: the single source of truth a Project Leader, Foundation Marketing Lead, or contractor can hand to anyone — a writer, designer, agency, deck builder, or new team member — and get on-brand, on-message output back. The document has three jobs: lock the top-of-house statements (Vision, Mission, Positioning Platform, Tagline) and the exact word-count copy assets (25-word/50-word summaries, boilerplate, `llms.txt`, elevator pitch slide) any channel can drop in as-is; arrange the value propositions, key messages, supporting points and sound bites into the one-page Message Matrix the Linux Foundation's own communications framework uses; and supply the evidence and activation layers downstream agents need — a sourced Stat Bank, persona-specific angles, origin story and cases, objections and stance, and a tiered CTA library.

Benchmark quality against `references/lf-message-framework.md` (the LF's own communications framework and what LF executive decks consume from it), `references/cncf-messaging-framework-2026.md` (a real prior LF-family messaging framework), and the structural lessons in `references/example-notes.md`. Ground every generated section in what the user says, the project's GitHub README, the project's Brand Kit if one exists, and named sources in the Stat Bank — never fill a section from generic knowledge about "open source" or "developer tools." If an input is missing, mark the section **TBD — needs input** rather than inventing plausible-sounding claims.

## Step 0 — check for a Brand Kit first

Before asking anything, check whether a `[Project Name] Brand Kit` already exists (in the working folder, a connected Drive, or wherever the user points). If the companion "Develop LF Project Brand Kit" skill has produced one, it is the primary source for identity, voice, positioning, audiences, strengths, constraints and tagline options — this agent's job is to extend it, not duplicate it. Read it **section by section using `references/brand-kit-field-mapping.md`**, which says exactly which Brand Kit section feeds which Message Foundation section and which fields the Brand Kit never contains (Vision, Mission, origin story, objections, Stat Bank provenance). If the Brand Kit's own document-architecture notes define a narrower scope for "the Message Foundation" than this skill's default, surface that conflict and ask which scope the user wants for this run — don't silently pick one.

**Governance and trademark wording, and the research sweep, come from the Brand Kit's Appendix C.** A Brand Kit produced by `brand-guidelines-agent` 0.2.0 or later carries an "LFX Project Record & Research Sweep" appendix: the governance sentence and trademark sentence derived from the LFX project record, the "Found beyond the brief" table and the timeline. Copy the two sentences verbatim into §0, §2a, §7, §9 and §15; build §11's origin story and the Stat Bank's date rows from the timeline; take working groups, directories and member like-for-like products from the table. If the Brand Kit predates Appendix C, or its governance wording disagrees with LFX, derive the sentences yourself with `search_projects` / `get_project` and the charter (the method is in that plugin's `references/lfx-project-record.md`; the short form: the technical project is "[Project], a Series of LF Projects, LLC" under LF Projects, LLC; a "[Project] Foundation" record funded by memberships is the membership program at The Linux Foundation; never merge the two into "[Project] Foundation, a Series of LF Projects, LLC"; marks are held by LF Projects, LLC unless the charter says otherwise) and log the disagreement in Appendix C as a conflict for LF Legal. The README and the interview never supply governance wording.

## Pre-fill mode (no interviewee)

When the user says "pre-fill for [project]" or "run in batch for [project]", or an orchestrator passes `mode: prefill`, there is no project lead on the call. Skip the one-question-at-a-time interview. Answer each question in Step 1 yourself from sources in this order: the Brand Kit and its Appendix C, the LFX project record and standard metrics, the project site, the GitHub organization, the LF press archive, existing marketing materials the user points to (past plans, decks, a messaging framework in a shared Drive), then labeled inference. Record every answer in Appendix A with its source and one of `Sourced` / `Inferred` / `Needs input`, set the status to "DRAFT — pre-filled, awaiting ED review", and end the document with a **YOUR INPUT** section listing what the project leader must confirm or answer (vision and mission wording, the tagline lock, adopters who may be named, the objections' honest answers, the CTA anchors). Then continue with Steps 2–4. The approved version, after the ED's edits, gets the status "Approved v1 — [name], [date]".

## Step 1 — run the interview one question at a time, in this exact order

This is a conversational interview, not a form dump. Ask each question as a short, plain message and **wait for the user's answer before asking the next one.** Do not batch questions into a single multi-part message, and do not proceed to generation until the final question is answered. The user may answer "skip" or "TBD" to any question; record that and move on.

1a. **Project name.** "What's the name of the LF project?"

1b. **GitHub / README URL.** "What's the URL of the project's GitHub repo or README?" — once given, fetch and read it before continuing. Pull real signal: what it technically does, stated purpose, tech stack, governance/maturity signals, notable adopters or badges, license, any charter or mission text. This becomes evidence for later sections — do not ask the user to restate what the README already answers.

1c. **Brand Kit or brand discovery.** Ask: "Do you already have a `[Project Name] Brand Kit` I should use, and if so where is it?"
   - If yes: read it per the field mapping. Skip every sub-question below that it answers. Check its document-architecture notes per Step 0.
   - If no (or partial): ask these five, one at a time, in order:
     1. "In one line, what does it do — beyond the name?"
     2. "Who's the primary audience — who does this project's messaging need to speak to (e.g. AI/ML platform engineers, enterprise buyers, agent-framework contributors)?"
     3. "Give me three adjectives for the voice you want."
     4. "Any constraints — colors/marks to avoid, an existing LF-family look to stay consistent with, trademark concerns?"
     5. "One to three reference brands or projects you admire, or want to differentiate from?"

1d. **Up to 8 gap-filling questions.** After 1a–1c, identify what's still missing to populate `references/message-foundation-template.md` and ask only those gaps, one at a time, max 8 questions. Do not ask anything the README or Brand Kit already answered. Check, in priority order, and skip any already covered:
   1. **Vision and Mission** — "Does the project have a stated vision (long-term reason for being) and mission (purpose and scope)? If they're written down somewhere, point me to them; if not, give me your best one-liners or say TBD." Neither lives in the Brand Kit.
   2. **Locked tagline** — if the Brand Kit offers tagline options, "Which tagline is locked, or should I list them as alternates?"
   3. **Proof points to confirm** — any adopters, benchmarks, milestones or figures that need confirming before they're cited by name. Naming real organizations is a factual/legal claim: always confirm rather than assume. Ask for the source and date of any figure the user supplies so it can enter the Stat Bank with provenance.
   4. **Audience scope and outreach objectives** — whether the audience set extends beyond technical personas (business champions, economic buyers, policy) and which outreach objectives this document must support (awareness, membership sales, event attendance/sponsorship, education sales, contributor growth).
   5. **Positioned against** — direct alternatives, adjacent LF projects, or "the status quo of doing X manually," needed for the positioning statement's "unlike ___."
   6. **Origin story** — "How did the project come to be — who donated or founded it, what problem or closed market did it address, and what has changed since?" Also ask for one or two before→after adopter stories if the user has them. Build the dated timeline from the Brand Kit's Appendix C (or the LF press archive and the originator's announcements) rather than from LFX formation dates, which record when the LF record was created, not when the project began; the interview answer adds color, the timeline supplies the dates.
   7. **Objections and threats** — "What are the two or three hardest questions skeptics, press, prospects or regulators ask about the project — and what's the honest answer, including anything you'd concede?"
   8. **CTAs and timeliness** — whether there's a specific membership tier, sponsorship package, working group, or event to reference in calls to action, and whether talking points should anchor to an upcoming milestone or stay evergreen.

   State plainly when you're done: "That's everything I need — generating the Message Foundation now," so the user knows generation is starting.

## Step 2 — draft, don't guess

Before writing, do a short internal pass: for each section of `references/message-foundation-template.md`, confirm you have a real source (interview answer, README, Brand Kit, or a named Stat Bank source) — not an inference dressed as a fact. Mark anything unsupported as **TBD — needs input**. Then:

- **Build the Stat Bank first.** Collect every number you intend to use anywhere in the document into the §10 table with claim, figure, unit, period/as-of date, source, caveat and type (`Live-LFX` / `Published` / `Third-party` / `Interview`). If LFX MCP tools are connected (`query_lfx_standard_metrics`, `query_lfx_semantic_layer`, `search_projects`, membership and meetings tools), offer to pull live figures — contributors, contributing organizations, memberships, meetings — and record the metric name and the data window on each row so downstream decks can regenerate them. If the `lfx-mcp-playbooks` skills are installed, follow `lfx-data-querying` for the pull and `lfx-figure-checking` before quoting. If the tools aren't connected, write `TBD — pull from LFX` with the metric named rather than guessing.
- **Check the positioning chain.** The §1 Positioning Platform, the §4 Positioning Statement and the Brand Kit's Positioning Statement must agree. If they don't, stop and ask. Keep each of those sentences under about 40 words; a positioning sentence that runs to 80–90 words fails the voice's own "Direct" rule even when every clause is true.
- **Fill the Message Matrix last.** §8 is a view of §7 and §9, not new content; fill it after those sections exist and verify every cell matches.
- **Third-party dates come from the primary document.** An RFC, a standard, a filing, a release — fetch it and record the month and year in the Stat Bank row. A year copied from a summary or another marketing document is not verified, and a wrong year inside a sound bite gets quoted on stage (see the worked example in the `lfx-marketing-os-qa` plugin for how this happened).
- **Competitive claims survive the sweep.** If the Brand Kit's Appendix C (or your own scan) shows a like-for-like alternative — especially one from a member organization — then "the only", "no other" and "first" are off the table in §5, §12 and §13; differentiate by the combination of properties instead, and keep member products as peers.

This is the single biggest quality gate. Read `references/lf-message-framework.md` §3 once more before generating so the voice rules and the shape downstream decks expect are fresh.

## Step 2b — lint the claims before you finalize

After the draft exists and before the self-check, search it for "only", "first", "largest", "most", "fastest", "the major", "every", "no other", cost and performance comparisons ("for less than", "in seconds", "for fractions of a cent"), and every year or date. Each must carry its Stat Bank ID or a primary source in the same sentence, or be rewritten. Then search §12 admissions and every sound bite for a fact about, or a motive attributed to, a named organization; each needs a verified record or that organization's published words (the LF press releases supply member quotes). Run this pass twice over §13 — sound bites are quoted on stage and checked by nobody. Finally, mark every Stat Bank row that carries list price, revenue or an LFX-export roster as `Internal` and produce the agency-safe copy without them.

## Step 3 — generate the document

Produce `[Project Name] Message Foundation.md` following `references/message-foundation-template.md` section-for-section, including Appendix B (definitions glossary) and Appendix C (Brand Kit source trace, or the statement that no Brand Kit existed). Every claim in §1, §2, §2a, §4, §7, §8, §9, §10, §11 and §12 must trace to something the user said, the README stated, the Brand Kit defined, or a Stat Bank row — if unsure, write TBD rather than smoothing it over. Run the template's section-completeness self-check before finalizing.

Then render the document on the **LF Agent DOCS Template** with `scripts/build_lf_doc.py`, as `references/lf-docs-template.md` describes — this is the deliverable, not an optional extra, and it is not built with the generic `docx` skill. The Markdown you just wrote is the input; render §1, §6a, §8, §10 and §14 as pipe tables so they become real tables (downstream agents and human readers both scan them), put `llms.txt` and the elevator-pitch slide in fenced code blocks, and a `<<<PAGEBREAK>>>` line before each appendix. Pass `--project`, `--doc-type "Message Foundation"`, `--status`, `--agent "Message Foundation Agent"`, `--subtitle "Brand message hierarchy, message matrix, word-count-locked copy, stat bank and activation layers — one of three LFX Marketing OS foundational documents"`, `--other` with the copy label (`Internal` or `Agency-safe`), `--detail` rows for Repository, Source Brand Kit (file and date, or "none — built from interview and README") and Prepared for, and the brand:

- **Logo and colors come from the Brand Kit.** `--primary` and `--secondary` are the Brand Kit §7 Component 2 primary and secondary hexes, verbatim; `--logo` is the mark the Brand Kit's Component 1 names or the project's current logo (LFX record, project site, GitHub org avatar — in that order). With no Brand Kit, read the project site's computed styles for the dominant brand color and say in the delivery message that the colors came from the site. Never generate a logo.
- Save `[Project Name] Message Foundation.docx` (fonts embedded), a `--strip-fonts` build named `[Project Name] Message Foundation (Drive upload).docx`, and the `.md`. Convert to PDF and look at every page before delivering: logo on the cover, header reading `[Project] Message Foundation · <status> · <copy label>`, tables inside the margins, no `{Placeholder}` text. Fix the Markdown and rebuild rather than editing the `.docx`.

## Step 4 — deliver and offer next steps

Before presenting, run the `lfx-marketing-os-qa` skill on the finished document if it is installed (it is in this marketplace): apply its High fixes and attach its fix list and Stat Bank stamp table to the delivery message. A document with an open High finding is "blocked on <finding>", not "for review". Open the delivery message with a one-page digest for the marketing lead and project leadership, who will not read the long form: the verdict, the recommendations you made (a tagline per surface, the case to pursue), what the sweep found beyond the brief, and the decisions the requester still owes.

Save the final files to the user's workspace folder and present them; then get the document into the project's shared Drive folder as a Google Doc per the "Deliver as a Google Doc" section of `references/lf-docs-template.md` (browser upload of the Drive-upload build with the requester's go-ahead, or hand them the file to drag in). Close by naming what it unlocks next — web copy, social bios, press boilerplate, campaign briefs, the membership pitch deck, member executive briefings, board marketing updates — and which LFX Marketing OS agents consume it (ICP & Target Markets, Pitch Deck, Website Designer, Quarterly Campaign Plan, Case Study, Member Benefits Briefing). Do not generate those yet; this document is the input for them.

## Reference files

- `references/message-foundation-template.md` — the exact section structure and what "complete" looks like per section, including the self-check.
- `references/lf-message-framework.md` — the Linux Foundation's own communications framework (Vision → Mission → Positioning Platform → Tagline; the Message Matrix; element definitions) and what LF executive decks consume from a message platform. Read it before generating so the bar and the shape are calibrated.
- `references/brand-kit-field-mapping.md` — which Brand Kit section populates which Message Foundation section, what the Brand Kit never contains, and how to resolve conflicts between the two.
- `references/cncf-messaging-framework-2026.md` — a real prior LF-family messaging framework, used as a quality benchmark.
- `references/lf-docs-template.md` — the LF Agent DOCS Template: what it fixes, how the project's logo and Brand Kit colors are applied, the cover spec, the Markdown the builder understands, the build command, the visual check and the Google Docs delivery.
- `scripts/build_lf_doc.py` — renders the Markdown document onto `assets/lf-agent-docs-template.docx` (the template with fonts and the LF logo embedded). `python3 scripts/build_lf_doc.py --help` lists every option.
- `references/example-notes.md` — structural lessons pulled from the CNCF file, other LF-family messaging docs, and the September 2026 LF executive decks.
- `examples/opensearch-message-foundation-sample.md` — a full worked example generated during this skill's first test run (v0.1 structure; it predates §1, §6a, §8, §10, §11, §12 and §14 and is kept for calibration of tone and grounding, not section order).

## Roadmap (not yet implemented)

A future version of this skill will accept a direct connection to the "Velocity Engine" service (its `VE-CreateFoundation` / `VE-MessageFoundation` MCP tools) and pull persona/ICP fields from it automatically instead of relying solely on interview answers and a Brand Kit. Until that integration is built into this skill, it runs on the interview + Brand Kit + README + optional LFX pull flow above.
