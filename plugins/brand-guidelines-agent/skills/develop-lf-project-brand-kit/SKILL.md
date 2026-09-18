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
  version: "0.3.0"
  author: "Paul Hinz, Linux Foundation"
---

# Develop LF Project Brand Kit

Guide the user through a short intake, then generate a "[Project Name] Brand Kit"
document on the LF Agent DOCS Template (Google Docs-ready `.docx`). This is a Level-1, single-prompt LFX Marketing OS agent: launch
from the command, ask a fixed set of questions, then do the work — the human
reviews, the agent assembles.

## Scope boundary — read this first

LFX Marketing OS defines three separate foundational documents per project.
This skill produces only the first:

1. **Brand Kit** (this skill) — identity, voice, positioning statement, audience
   messaging, competitive guardrails, and the five-component visual identity
   direction.
2. **Message Foundation Doc** (a different agent) — the 25-word summary, 50-word
   summary, boilerplate, `llms.txt`, and elevator pitch slide, derived *from*
   this Brand Kit.
3. **ICP Document** (a different agent) — market segment overview, ICP
   definition, persona definitions, fit/warmth scoring inputs.

Do not generate 25-word/50-word summaries, boilerplate, `llms.txt`, personas, or
ICP content inside the Brand Kit. Include only the single positioning statement,
and note in the document that the other derivatives live in the Message
Foundation Doc / ICP Document. This boundary was a deliberate correction from an
earlier draft that duplicated Message Foundation content — do not reintroduce
that duplication.

## Step 0: Pull the LFX project record and run the research sweep

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
the seven intake questions yourself from sources in this order: the LFX
project record, the project site, the GitHub organization, the LF press
archive, existing marketing materials the user points to (past plans, decks,
messaging frameworks in a shared Drive), then labeled inference. Record every
answer in Appendix B with its source and one of three labels — `Sourced`,
`Inferred`, `Needs input` — and set the document status to "DRAFT — pre-filled,
awaiting ED review". End the document with a **YOUR INPUT** section listing
every question the project leader must confirm or answer (voice adjectives,
constraints, reference brands, the tagline lock), in the same shape the
marketing-plan-workbook-agent uses. Then continue with Step 2 and Step 3. This
mode exists so the Marketing OS team can produce a first draft for every
foundation and have the ED review, edit and approve, instead of waiting for
each ED to run the interview.

## Step 1: Intake

Ask the following seven questions **one at a time**, in order, waiting for the
user's answer before asking the next one. Do not batch them, and do not use a
multiple-choice form for these — they're open-ended and the user should answer
in their own words:

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

- **Positioning**: one statement only, no elevator-pitch length variants.
- **Voice**: don't just restate the user's three inputs — turn each into a full
  voice attribute (we are / we are not / sounds like / doesn't sound like), and
  also produce a compact "4 adjectives + 2 example sentences" summary for
  downstream content agents. If the user only gave 3 inputs, add one adjective
  of your own that complements them, and say so.
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
- **Governance, license and trademark**: copy the sentences derived in Step 0
  into §1 At a Glance, §5 and §6. Never write "[Project] Foundation, a Series
  of LF Projects, LLC" — the foundation and the Series LLC are different
  entities (see `references/lfx-project-record.md`). Close the license open
  item yourself by reading the repository's LICENSE file and the charter; do
  not leave "confirm license" for a downstream reader when it is one fetch away.
- **Taglines (§8)**: list the starter set with rationale, then recommend one
  per surface (hero, developer channels, events) and mark the recommendation
  as awaiting the requester's lock. The Message Foundation inherits "TBD — none
  locked" only when this document declines to decide.
- **Metrics in examples (§9)**: any live metric quoted inside a channel example
  carries its window and date ("75M transactions in the 30 days to <date>"). The
  dating rule applies to examples of copy, not only to copy.
- **Claims**: no "only", "first", "largest", "most" or "the major" without the
  proof in the same sentence; no date without its primary source (an RFC, a
  release, a filing). Sound bites and tagline rationale get this check twice.
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
finding is "blocked on <finding>", not "for review". Then write a one-page
digest at the top of the delivery message: the verdict, the recommendations you
made (tagline per surface), what the sweep found beyond the brief, and the
decisions the requester still owes.

## Step 3: Present and close the loop

After sharing the file:

1. Ask the user for feedback on the document.
2. If they give feedback, offer to regenerate the document incorporating it,
   and repeat this step after the regeneration.
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
