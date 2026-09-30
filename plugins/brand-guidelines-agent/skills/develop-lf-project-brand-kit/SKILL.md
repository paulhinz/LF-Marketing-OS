---
name: develop-lf-project-brand-kit
description: >
  This skill should be used when a Linux Foundation project leader or marketing
  advisor says "Develop LF Project Brand Kit", "build a brand kit for [project]",
  "create a brand kit for my LF project", "pre-fill the Brand Kit for
  [project]", or otherwise asks to define the brand identity, voice,
  positioning, or visual direction for an LF-hosted project as part of LFX
  Marketing OS. Produces the Brand Kit — one of three LFX Marketing OS
  foundational documents (alongside the Message Foundation Doc and the ICP
  Document) — as a Google Docs-ready document on the LF Agent DOCS Template,
  with the project's name and logo on the cover and the project's brand colors
  applied.
metadata:
  version: "0.4.0"
  author: "Paul Hinz, Linux Foundation"
---

# Develop LF Project Brand Kit

Ask whether the foundation already has its own brand documents, map them if it
does, interview only for the gaps, then generate a "[Project Name] Brand Kit"
document on the LF Agent DOCS Template (Google Docs-ready `.docx`). This is a
Level-1, single-prompt LFX Marketing OS agent: launch from the command, ask a
fixed set of questions, then do the work — the human reviews, the agent
assembles.

The document is short by design: a two-page **Review Sheet** the ED or SME
approves, then a reference body of 6–8 pages built from fixed micro-templates
and tables. `references/input-doc-mapping.md` defines the Review Sheet, the
standard field registry, the length budget and the structured sidecar; read it
before Step 0a. Version 0.4.0 exists because an ED told us a 43-page foundation
document would not be read or owned by a human, and that his foundation already
had its own material.

## Scope boundary — read this first

LFX Marketing OS defines three separate foundational documents per project.
This skill produces only the first:

1. **Brand Kit** (this skill) — identity, voice, positioning statement, brand
   principle, prefer/avoid language, what we don't claim, competitive
   guardrails, and the five-component visual identity direction.
2. **Message Foundation Doc** (a different agent) — vision, mission, the
   25-word summary, 50-word summary, boilerplate, `llms.txt`, elevator pitch,
   messaging pillars, proof points and objections, derived *from* this Brand Kit.
3. **ICP Document** (a different agent) — market segments, ICP definitions,
   personas (including per-audience messaging), fit/warmth scoring inputs.

Do not generate 25-word/50-word summaries, boilerplate, `llms.txt`, personas,
audience messaging tables, or ICP content inside the Brand Kit. Include only the
single positioning statement and the *names* of the primary audiences, and note
in the document that the other derivatives live in the Message Foundation Doc /
ICP Document. This boundary was a deliberate correction from an earlier draft
that duplicated Message Foundation content — do not reintroduce that
duplication. The field-level ownership list is `references/input-doc-mapping.md`
§3; every field has exactly one owning document.

## Step 0a: Ask for existing documents

Before the LFX record pull, the research sweep, or any interview question, ask
the one question in `references/input-doc-mapping.md` §1: does the foundation
already have a brand, messaging, positioning, audience or competitive document
to use as input? Accept several files; read them in full.

- **If no:** continue with Step 0b and the normal interview or pre-fill mode.
- **If yes:** map every Brand Kit field in the registry (`input-doc-mapping.md`
  §3, the `bk.*` rows) from the supplied documents, labeling each `From your
  doc §…`, `From README / LFX`, `Inferred`, `Partial` or `Needs input`. Show
  the coverage table ("Your documents fill N of 15 Brand Kit fields; I need to
  ask about G") **before** asking anything, then run Step 1 only for the gaps.
  Quote the ED's wording verbatim; flag standard-rule conflicts in the Review
  Sheet Notes column instead of rewriting. Fields the supplied documents cover
  that belong to a sibling (audiences, pillars, personas) go into the Project
  Inputs record for that agent, not into this document.
- Create or append `[project-slug].inputs.yaml` (the Project Inputs record,
  `input-doc-mapping.md` §7) with the documents, links and date read, so the
  Message Foundation and ICP agents do not ask for them again.

Common gaps when a foundation supplies its own messaging document: visual
identity (colors, type, logo rules), trademark hygiene, and a brand principle
stated as such. Ask for those; do not invent them.

## Step 0b: Pull the LFX project record and run the research sweep

Do this before the first intake question, because two of the seven answers
(governance context, reference brands) are better taken from the system of
record than from memory, and because the sibling agents inherit what this
document records.

1. Read `references/lfx-project-record.md` and pull the project's LFX records
   (`search_projects`, `get_project`, the charter). Derive the governance
   sentence and the trademark sentence from them. These go into §1 At a
   Glance, §6 Trademark hygiene and Appendix C verbatim; the interview cannot
   override them (a requester's different wording is logged as a conflict for
   Legal, not adopted).
2. Read `references/research-sweep.md` and run the sweep: the project site's
   full navigation, the GitHub organization, the LF press archive, the
   originator's announcements, a competitor scan with web search, and the
   primary source for any date you intend to use. Record the "Found beyond the
   brief" table and the timeline in Appendix C.

If the LFX MCP or web tools are not connected, write `TBD — derive from LFX`
and `TBD — sweep not run` in the affected fields and say so when you deliver.

## Pre-fill mode (no interviewee)

When the user says "pre-fill for [project]" or "run in batch for [project]",
or an orchestrator passes `mode: prefill`, there is no project leader on the
call. Do not run the one-question-at-a-time interview. Instead, answer each of
the seven intake questions yourself from sources in this order: documents the
orchestrator or user supplied (Step 0a), the LFX project record, the project
site, the GitHub organization, the LF press archive, other existing marketing
materials the user points to (past plans, decks, messaging frameworks in a
shared Drive), then labeled inference. Record every answer in Appendix B with
its source and one of the labels from `input-doc-mapping.md` §2 — `From your
doc`, `From README / LFX`, `Inferred`, `Partial`, `Needs input` — and set the
document status to "Draft — pre-filled". The Review Sheet's Source column and
its `Needs input` rows replace the older **YOUR INPUT** section: the reviewer
sees in one table what the agent took from where and what it still needs. Then
continue with Step 2 and Step 3. This mode exists so the Marketing OS team can
produce a first draft for every foundation and have the ED review, edit and
approve, instead of waiting for each ED to run the interview.

## Step 1: Intake

Ask the following seven questions **one at a time**, in order, waiting for the
user's answer before asking the next one. Do not batch them, and do not use a
multiple-choice form for these — they're open-ended and the user should answer
in their own words. **If Step 0a produced documents, ask only the questions the
coverage table listed as gaps**, and say why you are asking each one ("Your
messaging doc has no colors or type; what constraints should the palette
respect?"):

1. What's the name of the LF project?
2. What's the URL of the project's GitHub repo or README?
3. One-line description — what does it do, beyond the name?
4. Primary audience — who does this brand need to speak to? (e.g., AI/ML
   platform engineers, enterprise buyers, agent-framework contributors)
5. Three adjectives for the voice you want?
6. Any constraints — colors/marks to avoid, an existing LF-family look to stay
   consistent with, trademark concerns?
7. One to three reference brands or projects — ones they admire, or want to
   differentiate from?

Note: users sometimes answer question 5 with brand-strength statements (e.g.
"enterprise-grade") rather than true adjectives. Accept whatever they give you —
don't push back mid-intake — but when drafting Section 3 (Voice), translate each
input into a proper voice attribute (see the template) rather than using it
verbatim as an adjective label.

## Step 2: Generate the Brand Kit

Once all seven answers are collected, build the document following the full
structure in `references/brand-kit-template.md`. Read that file before drafting
— it specifies every section, the voice-attribute format, the five visual
identity components (including logo boundary conditions and the WCAG contrast
check method), and the guardrail-writing approach for the reference brands the
user named.

Key rules carried from prior review of this skill:

- **Review Sheet first.** The first section after the cover is the two-page
  Review Sheet defined in `references/input-doc-mapping.md` §5: one row per
  `bk.*` field marked "Review Sheet? Yes", with Current wording, Source,
  Approve / Edit (blank) and Notes. Everything else is the reference body and
  opens with a "How to use this document" routing block for downstream agents.
- **Length budget: 6–8 pages, hard cap 10, no section over 300 words**
  (`input-doc-mapping.md` §6). One-sentence bullets; tables for anything
  comparative; no starter sets or banks of copy beyond the tagline options.
  If a draft runs long, cut restatement and examples, not fields.
- **Positioning**: one statement only, ≤40 words, no elevator-pitch length
  variants. Add a **brand principle** (≤12 words plus a one-line gloss) when the
  user's inputs or documents support one; otherwise `Needs input`.
- **Voice**: don't just restate the user's three inputs — translate each into a
  voice attribute and present all of them in one three-column table
  (Attribute | What it means | What it is not), 4–6 rows, followed by one
  "sounds like / doesn't sound like" sentence pair for the voice as a whole.
  Then the **Prefer / Avoid language** table (terms, casing, phrases) and a
  **What we don't claim** block of 3–6 lines. If the user only gave 3 inputs,
  add one attribute of your own that complements them, and say so. These
  three tables are the compact reference downstream content agents load.
- **Audiences**: name the primary audiences in the §1 At a Glance row and, in
  §4, one line per audience with its single "lead with" cue — and stop. Pain
  points, core messages and CTAs per audience belong to the ICP document's
  personas; do not build an audience messaging table here.
- **Competitive guardrails**: treat the user's reference brands as a
  differentiation target list, not a style inspiration list, unless the user
  says otherwise. Never disparage them by name — differentiate by category
  (open source vs. proprietary, no lock-in, neutral governance, etc.), per the
  brand-voice skill's "confident but fair" rule. If the user gave color/mark
  constraints, treat them as hard constraints in the visual identity section.
- **Logo (Component 1)**: never attempt a full AI-rendered logo. Write a
  constrained creative brief instead — concept direction, boundary conditions
  (simple mark, ≤2 colors, legible at 16px/monochrome, no gradients or
  photorealism, nothing a human can't redraw as clean vector art), and the
  3-variant deliverable spec (primary / horizontal / icon-only), then hand off
  to Creative Services for final SVG production.
- **Color palette (Component 2)**: choose an original palette suited to the
  project's voice and constraints — do not default to any specific colors from
  a past run. Compute real WCAG AA contrast ratios (formula in the template) for
  every text/background pairing rather than asserting them. When the user asks
  you to extend an existing site's theme, read the computed styles (body, H1,
  H2, links, buttons, the most-used neutrals) rather than eyeballing screenshots,
  and if the site's dominant neutral differs from the one you pick, say so and
  pick deliberately.
- **Governance, license and trademark**: copy the sentences derived in Step 0b
  into §1 At a Glance, §6 and Appendix C. Never write "[Project] Foundation, a Series
  of LF Projects, LLC" — the foundation and the Series LLC are different
  entities (see `references/lfx-project-record.md`). Close the license open
  item yourself by reading the repository's LICENSE file and the charter; do
  not leave "confirm license" for a downstream reader when it is one fetch away.
- **Taglines (§8)**: list the starter set with rationale, then recommend one
  per surface (hero, developer channels, events) and mark the recommendation
  as awaiting the requester's lock. The Message Foundation inherits "TBD — none
  locked" only when this document declines to decide.
- **Metrics in examples**: any live metric quoted anywhere carries its window
  and date ("75M transactions in the 30 days to <date>"). The dating rule
  applies to examples of copy, not only to copy.
- **Claims**: no "only", "first", "largest", "most" or "the major" without the
  proof in the same sentence; no date without its primary source (an RFC, a
  release, a filing). Tagline rationale gets this check twice. Where the ED's
  own wording carries such a claim, keep the wording and flag it in the Review
  Sheet Notes column rather than rewriting it.
- **Structured sidecar.** Alongside the `.docx` and `.md`, write
  `[project-slug].brand-kit.fields.yaml` with every `bk.*` field (value, source,
  status) per `input-doc-mapping.md` §7, and create or append
  `[project-slug].inputs.yaml`. Downstream agents read the sidecar, not the
  document.
- **Build on the LF Agent DOCS Template, never by hand.** Write the whole
  document as `[Project Name] Brand Kit.md` following the section structure
  in `references/brand-kit-template.md`, then render it with
  `scripts/build_lf_doc.py` as `references/lf-docs-template.md` describes.
  The script puts the LF header and footer on every page, generates the cover
  (project logo, project name, "Brand Kit", accent rule, subtitle, details
  table) and applies the project's colors to headings and table headers;
  fonts and layout stay on the template. Pass:
  `--project`, `--doc-type "Brand Kit"`, `--status`, `--agent "Brand Kit Agent"`,
  `--subtitle "Foundational identity, voice, positioning and visual direction — one of three LFX Marketing OS foundational documents"`,
  `--logo <the project's current mark>` (LFX record → project site → GitHub
  org avatar; see the reference for the order, and never a generated logo),
  `--primary` / `--secondary` from the palette you chose in Component 2 (so
  build the palette before you build the file — the document is the first
  thing rendered in the project's colors, and a requester's color constraints
  are already honored there), and `--detail` rows for Repository, Prepared
  for and Governance (the derived sentence).
- Render to PDF and look at every page before sharing (logo on the cover,
  header text right, tables inside the margins, headings readable, no
  `{Placeholder}` left). Fix the Markdown and rebuild; do not edit the `.docx`.
- Save `[Project Name] Brand Kit.docx` (fonts embedded) and a
  `--strip-fonts` build named `[Project Name] Brand Kit (Drive upload).docx`
  for Google Drive, plus the `.md`. Do not leave generation notes in the
  document ("This Word document uses Georgia and Calibri as stand-ins");
  production font names belong in Component 3, nothing else.

## Step 2b: Gate and digest

Before presenting, run the `lfx-marketing-os-qa` skill on the draft if it is
installed (it is in this marketplace). Apply its High fixes; attach its fix list
and Stat Bank stamp table to your delivery message. A draft with an open High
finding is "blocked on <finding>", not "for review". Then open the delivery
message with a short digest — no more than ten lines: the status, how many
fields came from the requester's own documents versus the agent, the
recommendations you made (tagline per surface), what the sweep found beyond
the brief, and the decisions the requester still owes. The Review Sheet inside
the document already carries the detail; do not repeat it.

## Step 3: Present and close the loop

After sharing the file:

1. Point the user at the Review Sheet (two pages) and ask them to approve or
   edit there; they do not need to read the reference body.
2. If they give feedback or edit the sheet, regenerate incorporating it, set
   the status to "ED-reviewed — [name], [date]", and repeat this step.
3. If they have no feedback, get the document into the project's shared Drive
   folder as a Google Doc (the "Deliver as a Google Doc" section of
   `references/lf-docs-template.md`: upload the Drive-upload build through the
   browser with the requester's go-ahead, or hand them the file to drag in) —
   this Brand Kit is a dependency the Message Foundation Agent and ICP Agent
   load, not a one-off file. Its Component 2 palette and Component 1 logo are
   also what those agents use to render their own documents in the project's
   brand, so name the palette hexes and the logo file plainly.
4. Keep Appendix A (document architecture) accurate: if a sibling document is
   later produced at a different scope than this appendix describes, update the
   Brand Kit rather than leaving the sibling to flag the conflict.

## Reference files

- `references/input-doc-mapping.md` — Step 0a (existing-document intake and
  gap-only interviewing), the standard field registry and ownership, the fixed
  micro-templates, the Review Sheet, the length budget and the structured
  sidecar. Shared verbatim with the Message Foundation and ICP plugins.
- `references/brand-kit-template.md` — the section structure, voice-attribute
  format, the five visual identity components and the WCAG method.
- `references/lfx-project-record.md` — how to derive governance and trademark
  wording from the LFX project record and the technical charter.
- `references/research-sweep.md` — the beyond-the-brief checklist and the
  "Found beyond the brief" table the sibling agents inherit.
- `references/lf-docs-template.md` — the LF Agent DOCS Template: what it
  fixes, how the project's logo and colors are applied, the cover spec, the
  Markdown the builder understands, the build command, the visual check and
  the Google Docs delivery.
- `scripts/build_lf_doc.py` — renders the Markdown draft onto
  `assets/lf-agent-docs-template.docx` (the template with fonts and the LF
  logo embedded). `python3 scripts/build_lf_doc.py --help` lists every option.
