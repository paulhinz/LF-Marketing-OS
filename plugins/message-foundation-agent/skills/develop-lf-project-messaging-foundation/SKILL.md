---
name: develop-lf-project-messaging-foundation
description: Interviews a Linux Foundation project lead through a structured, sequential discovery process (project identity, GitHub context, brand kit or brand-discovery questions, then up to 5 gap-filling questions) and produces a "[Project Name] Message Foundation" document covering word-count-locked summaries, boilerplate, llms.txt, and elevator pitch, plus full positioning, voice, audiences, messaging pillars, proof points, and talking points for use across web, content, social, and campaigns. This is the LFX Marketing OS "Message Foundation Agent" (LF Media dept, 9-Agent category 1: Foundation Setup). Trigger on the exact command "Develop LF Project Messaging Foundation", or requests to build/create a messaging foundation, message house, or positioning document for an LF project.
---

# Develop LF Project Messaging Foundation

Produce a `[Project Name] Message Foundation` document: the single source of truth a Project Leader, Foundation Marketing Lead, or contractor can hand to anyone — a writer, designer, agency, or new team member — and get on-brand, on-message output back. The document has two jobs: supply exact word-count-locked copy assets (25-word/50-word summaries, boilerplate, `llms.txt`, elevator pitch slide) that any channel can drop in as-is, and expand those into the fuller positioning/audience/pillar framework needed to brief web, content, social, and campaign work.

Benchmark quality against `references/cncf-messaging-framework-2026.md` (a real prior LF-family messaging framework) and structural upgrades noted in `references/example-notes.md` (voice/tone discipline and value→support→proof rigor that the CNCF file itself lacks). Ground every generated section in what the user says, the project's GitHub README, and the project's Brand Kit if one exists — never fill a section from generic knowledge about "open source" or "developer tools." If an input is genuinely missing, mark the section **TBD — needs input** rather than inventing plausible-sounding claims.

## Step 0 — check for a Brand Kit first

Before asking anything, check whether a `[Project Name] Brand Kit` already exists (in the working folder, a connected Drive, or wherever the user points). If a companion "Develop LF Project Brand Kit" skill/plugin is installed and has already produced one for this project, treat it as the primary source for identity, voice, positioning, and visual direction — this agent's job is to extend it, not duplicate it. If a Brand Kit's own internal document-architecture notes define a narrower or different scope for "the Message Foundation Doc" than this skill's default (full framework + derivatives), surface that conflict to the user explicitly and ask which scope they want for this run — don't silently pick one.

## Step 1 — run the interview one question at a time, in this exact order

This is a conversational interview, not a form dump. Ask each question as a short, plain message and **wait for the user's answer before asking the next one.** Do not batch these into a single multi-part message, and do not proceed to generation until the final question (whichever one ends up being last, per 1d) is answered.

1a. **Project name.** "What's the name of the LF project?"

1b. **GitHub / README URL.** "What's the URL of the project's GitHub repo or README?" — once given, fetch and read it before continuing. Pull real signal: what it technically does, stated purpose, tech stack, governance/maturity signals, notable adopters or badges, license. This becomes evidence for later sections — do not ask the user to restate what the README already answers.

1c. **Brand kit or brand discovery.** Ask: "Do you already have a `[Project Name] Brand Kit` I should use, and if so where is it?"
   - If yes: read it fully. Extract voice, positioning, audience definitions, and constraints from it directly; skip the sub-questions below for anything it already answers. Check its document-architecture notes per Step 0.
   - If no (or partial): ask these five, one at a time, in order:
     1. "In one line, what does it do — beyond the name?"
     2. "Who's the primary audience — who does this project's messaging need to speak to (e.g. AI/ML platform engineers, enterprise buyers, agent-framework contributors)?"
     3. "Give me three adjectives for the voice you want."
     4. "Any constraints — colors/marks to avoid, an existing LF-family look to stay consistent with, trademark concerns?"
     5. "One to three reference brands or projects you admire, or want to differentiate from?"

1d. **Up to 5 gap-filling questions.** After 1a–1c, identify what's still missing to fully populate `references/message-foundation-template.md` and ask only those gaps, one at a time, max 5 questions. Do not ask a question the README or brand kit already answered. Check, in priority order (skip any already covered):
   - Any specific proof points (adopters, benchmarks, milestones) that need confirming before they're cited by name — naming real organizations is a factual/legal claim, always confirm rather than assume.
   - Whether the audience set needs to extend beyond technical personas — e.g. business champions or economic buyers — and what outreach objectives (awareness, membership sales, event attendance/sponsorship, education sales, etc.) this document needs to support.
   - Who/what this is positioned *against* — direct alternatives, adjacent LF projects, or "the status quo of doing X manually" — needed for the positioning statement's "unlike ___."
   - Whether there's a specific membership tier, sponsorship package, or CTA to reference, or whether CTAs should stay generic for this draft.
   - Whether there's a specific upcoming milestone, release, or event to anchor talking points to, or whether they should stay evergreen.

   State plainly when you're done: "That's everything I need — generating the Message Foundation now," so the user knows generation is starting.

## Step 2 — draft, don't guess

Before writing the document, do a short internal pass: for each section of `references/message-foundation-template.md`, confirm you have a real source (interview answer, README, or brand kit) — not an inference dressed as a fact. Mark anything unsupported as **TBD — needs input** rather than writing generic filler. This is the single biggest quality gate.

## Step 3 — generate the document

Produce `[Project Name] Message Foundation.md` following `references/message-foundation-template.md` section-for-section. Every claim in Positioning, Proof Points, and Messaging Pillars must trace back to something the user said, the README stated, or the Brand Kit defined — if unsure, write TBD rather than smoothing it over. Offer a `.docx` version (read the `docx` skill first if it's available) formatted consistently with any companion Brand Kit document, since the two are meant to sit side by side as part of the same document family.

## Step 4 — deliver and offer next steps

Save the final file to the user's workspace folder and present it. Close by naming what it unlocks next (web copy, social bios, press boilerplate, campaign briefs) without generating those yet — this document is the input for those, not a replacement for asking again when the user wants them.

## Reference files

- `references/message-foundation-template.md` — the exact section structure and what "complete" looks like per section.
- `references/cncf-messaging-framework-2026.md` — a real prior LF-family messaging framework, used as a quality benchmark. Read it before generating output for a project so the bar is calibrated correctly.
- `references/example-notes.md` — structural lessons pulled from the CNCF file and other LF-family messaging docs (OpenSearch, LF Education), used to improve on the benchmark.
- `examples/opensearch-message-foundation-sample.md` — a full worked example, generated during this skill's first test run.

## Roadmap (not yet implemented)

A future version of this skill will accept a direct MCP connection to a "Velocity Engine" service and pull persona/ICP fields from it automatically instead of relying solely on human interview answers and a Brand Kit document. Until that connector exists, this skill runs entirely on the interview + Brand Kit + README flow above.
