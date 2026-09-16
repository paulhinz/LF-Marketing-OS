---
name: develop-lf-project-messaging-foundation
description: Interviews a Linux Foundation project lead through a structured, sequential discovery process (project identity, GitHub context, Brand Kit or brand-discovery questions, then up to 8 gap-filling questions) and produces a "[Project Name] Message Foundation" document built on the Linux Foundation communications framework — Vision → Mission → Positioning Platform → Tagline hierarchy, a one-page Message Matrix (value proposition → key message → supporting points → sound bites per pillar), word-count-locked summaries, boilerplate, llms.txt and elevator pitch, plus voice, audiences with persona-specific ROI angles, messaging pillars with content tags, a sourced Stat Bank, origin story and before→after cases, objections and stance, talking points, and a tiered CTA library — for use across web, content, social, campaigns, pitch decks and member briefings. This is the LFX Marketing OS "Message Foundation Agent" (LF Media dept, 9-Agent category 1: Foundation Setup). Trigger on the exact command "Develop LF Project Messaging Foundation", or requests to build/create a messaging foundation, message house, message platform, or positioning document for an LF project.
---

# Develop LF Project Messaging Foundation

Produce a `[Project Name] Message Foundation` document: the single source of truth a Project Leader, Foundation Marketing Lead, or contractor can hand to anyone — a writer, designer, agency, deck builder, or new team member — and get on-brand, on-message output back. The document has three jobs: lock the top-of-house statements (Vision, Mission, Positioning Platform, Tagline) and the exact word-count copy assets (25-word/50-word summaries, boilerplate, `llms.txt`, elevator pitch slide) any channel can drop in as-is; arrange the value propositions, key messages, supporting points and sound bites into the one-page Message Matrix the Linux Foundation's own communications framework uses; and supply the evidence and activation layers downstream agents need — a sourced Stat Bank, persona-specific angles, origin story and cases, objections and stance, and a tiered CTA library.

Benchmark quality against `references/lf-message-framework.md` (the LF's own communications framework and what LF executive decks consume from it), `references/cncf-messaging-framework-2026.md` (a real prior LF-family messaging framework), and the structural lessons in `references/example-notes.md`. Ground every generated section in what the user says, the project's GitHub README, the project's Brand Kit if one exists, and named sources in the Stat Bank — never fill a section from generic knowledge about "open source" or "developer tools." If an input is missing, mark the section **TBD — needs input** rather than inventing plausible-sounding claims.

## Step 0 — check for a Brand Kit first

Before asking anything, check whether a `[Project Name] Brand Kit` already exists (in the working folder, a connected Drive, or wherever the user points). If the companion "Develop LF Project Brand Kit" skill has produced one, it is the primary source for identity, voice, positioning, audiences, strengths, constraints and tagline options — this agent's job is to extend it, not duplicate it. Read it **section by section using `references/brand-kit-field-mapping.md`**, which says exactly which Brand Kit section feeds which Message Foundation section and which fields the Brand Kit never contains (Vision, Mission, origin story, objections, Stat Bank provenance). If the Brand Kit's own document-architecture notes define a narrower scope for "the Message Foundation" than this skill's default, surface that conflict and ask which scope the user wants for this run — don't silently pick one.

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
   6. **Origin story** — "How did the project come to be — who donated or founded it, what problem or closed market did it address, and what has changed since?" Also ask for one or two before→after adopter stories if the user has them.
   7. **Objections and threats** — "What are the two or three hardest questions skeptics, press, prospects or regulators ask about the project — and what's the honest answer, including anything you'd concede?"
   8. **CTAs and timeliness** — whether there's a specific membership tier, sponsorship package, working group, or event to reference in calls to action, and whether talking points should anchor to an upcoming milestone or stay evergreen.

   State plainly when you're done: "That's everything I need — generating the Message Foundation now," so the user knows generation is starting.

## Step 2 — draft, don't guess

Before writing, do a short internal pass: for each section of `references/message-foundation-template.md`, confirm you have a real source (interview answer, README, Brand Kit, or a named Stat Bank source) — not an inference dressed as a fact. Mark anything unsupported as **TBD — needs input**. Then:

- **Build the Stat Bank first.** Collect every number you intend to use anywhere in the document into the §10 table with claim, figure, unit, period/as-of date, source, caveat and type (`Live-LFX` / `Published` / `Third-party` / `Interview`). If LFX MCP tools are connected (`query_lfx_standard_metrics`, `query_lfx_semantic_layer`, `search_projects`, membership and meetings tools), offer to pull live figures — contributors, contributing organizations, memberships, meetings — and record the metric name and the data window on each row so downstream decks can regenerate them. If the `lfx-mcp-playbooks` skills are installed, follow `lfx-data-querying` for the pull and `lfx-figure-checking` before quoting. If the tools aren't connected, write `TBD — pull from LFX` with the metric named rather than guessing.
- **Check the positioning chain.** The §1 Positioning Platform, the §4 Positioning Statement and the Brand Kit's Positioning Statement must agree. If they don't, stop and ask.
- **Fill the Message Matrix last.** §8 is a view of §7 and §9, not new content; fill it after those sections exist and verify every cell matches.

This is the single biggest quality gate. Read `references/lf-message-framework.md` §3 once more before generating so the voice rules and the shape downstream decks expect are fresh.

## Step 3 — generate the document

Produce `[Project Name] Message Foundation.md` following `references/message-foundation-template.md` section-for-section, including Appendix B (definitions glossary) and Appendix C (Brand Kit source trace, or the statement that no Brand Kit existed). Every claim in §1, §2, §2a, §4, §7, §8, §9, §10, §11 and §12 must trace to something the user said, the README stated, the Brand Kit defined, or a Stat Bank row — if unsure, write TBD rather than smoothing it over. Run the template's section-completeness self-check before finalizing.

Offer a `.docx` version (read the `docx` skill first if it's available) formatted consistently with any companion Brand Kit document, since the two sit side by side in the same document family. Render §1, §6a, §8, §10 and §14 as tables — downstream agents and human readers both scan them.

## Step 4 — deliver and offer next steps

Save the final file to the user's workspace folder and present it. Close by naming what it unlocks next — web copy, social bios, press boilerplate, campaign briefs, the membership pitch deck, member executive briefings, board marketing updates — and which LFX Marketing OS agents consume it (ICP & Target Markets, Pitch Deck, Website Designer, Quarterly Campaign Plan, Case Study, Member Benefits Briefing). Do not generate those yet; this document is the input for them.

## Reference files

- `references/message-foundation-template.md` — the exact section structure and what "complete" looks like per section, including the self-check.
- `references/lf-message-framework.md` — the Linux Foundation's own communications framework (Vision → Mission → Positioning Platform → Tagline; the Message Matrix; element definitions) and what LF executive decks consume from a message platform. Read it before generating so the bar and the shape are calibrated.
- `references/brand-kit-field-mapping.md` — which Brand Kit section populates which Message Foundation section, what the Brand Kit never contains, and how to resolve conflicts between the two.
- `references/cncf-messaging-framework-2026.md` — a real prior LF-family messaging framework, used as a quality benchmark.
- `references/example-notes.md` — structural lessons pulled from the CNCF file, other LF-family messaging docs, and the September 2026 LF executive decks.
- `examples/opensearch-message-foundation-sample.md` — a full worked example generated during this skill's first test run (v0.1 structure; it predates §1, §6a, §8, §10, §11, §12 and §14 and is kept for calibration of tone and grounding, not section order).

## Roadmap (not yet implemented)

A future version of this skill will accept a direct connection to the "Velocity Engine" service (its `VE-CreateFoundation` / `VE-MessageFoundation` MCP tools) and pull persona/ICP fields from it automatically instead of relying solely on interview answers and a Brand Kit. Until that integration is built into this skill, it runs on the interview + Brand Kit + README + optional LFX pull flow above.
