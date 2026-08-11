---
name: develop-lf-project-brand-kit
description: >
  This skill should be used when a Linux Foundation project leader or marketing
  advisor says "Develop LF Project Brand Kit", "build a brand kit for [project]",
  "create a brand kit for my LF project", or otherwise asks to define the brand
  identity, voice, positioning, or visual direction for an LF-hosted project as
  part of LFX Marketing OS. Produces the Brand Kit — one of three LFX Marketing OS
  foundational documents (alongside the Message Foundation Doc and the ICP
  Document) — as a Word document.
metadata:
  version: "0.1.0"
  author: "Paul Hinz, Linux Foundation"
---

# Develop LF Project Brand Kit

Guide the user through a short intake, then generate a "[Project Name] Brand Kit"
Word document. This is a Level-1, single-prompt LFX Marketing OS agent: launch
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
  every text/background pairing rather than asserting them.
- Use the `docx` skill to build the document (US Letter, the section structure
  from the template, tables for the color palette / voice attributes / audience
  messaging / channel reference). Render to PDF and visually check every page
  before sharing, per the docx skill's verification step.
- Save the file as `[Project Name] Brand Kit.docx`.

## Step 3: Present and close the loop

After sharing the file:

1. Ask the user for feedback on the document.
2. If they give feedback, offer to regenerate the document incorporating it,
   and repeat this step after the regeneration.
3. If they have no feedback, recommend they download the document and place it
   in a shared repository (e.g. a Content Hub, shared Drive, or wherever the
   Message Foundation Agent and ICP Agent read their inputs from) — this Brand
   Kit is a dependency other Marketing OS agents load, not a one-off file.
