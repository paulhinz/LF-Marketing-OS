# Brand Kit document template

Full section-by-section spec for the "[Project Name] Brand Kit" document.
Build with the `docx` skill: US Letter page, a navy/teal-style heading system
is fine as a default look (or pick colors that suit the project's own voice —
see Component 2), tables for anything tabular below.

## Cover

Project name as title, one-line subtitle ("Foundational identity, voice,
positioning, and visual direction — one of three core LFX Marketing OS
documents"), and a details table: Project, Repository, Prepared for, Prepared
by ("LFX Marketing OS — Brand Setup Agent"), Date, Status ("Draft v1 — for
review").

## How to Use This Document

Explain the three-document architecture (Brand Kit / Message Foundation Doc /
ICP Document — see Scope boundary in SKILL.md) so readers know what lives here
versus in the sibling documents.

## 1. Project Definition

- **About [Project]**: one paragraph combining the user's one-line description
  with governance/license context if known (e.g. Linux Foundation governance,
  Apache 2.0 — ask or infer from the GitHub README if not given).
- **At a Glance** table: One-line description, Repository, Governance, License,
  Primary audiences.

## 2. Positioning

- **Positioning Statement**: a single sentence, usually close to the user's
  one-line description, tightened into a proper positioning statement.
- A note directing readers to the Message Foundation Doc for word-count-specific
  derivatives (25-word/50-word summaries, boilerplate, llms.txt, elevator pitch
  slide). Do not produce those derivatives here.

## 3. Brand Personality & Voice

- **If [Project] Were a Person**: a short paragraph personifying the brand,
  synthesizing the user's three voice inputs into a coherent character.
- **Voice Attributes**: translate each of the user's inputs (even if they gave
  brand-strength statements instead of adjectives) into a full attribute using
  this exact format, one table per attribute:

  | | |
  |---|---|
  | We are | what this means in practice |
  | We are not | the common misinterpretation to avoid |
  | Sounds like | an example sentence demonstrating it |
  | Doesn't sound like | an example sentence violating it |

- **Tone & Style Rules** table: reading level, formality, authority vs.
  humility, competitive tone, Oxford comma, contractions, superlatives, jargon
  policy. Default to an 8th-grade reading level for broad audiences, deeper
  technical density only for engineer personas, confident-but-fair competitive
  tone, superlatives only with a proof point attached.
- **Voice & Tone Summary (Component 5)**: a compact table with exactly 4
  adjectives (add one of your own if the user only gave 3, and say so) and 2
  example sentences in that voice — this is the compact reference downstream
  content agents load, distinct from the fuller attribute breakdown above.

## 4. Primary Audiences & Messaging

Table: Audience | Top Pain Points | Core Message | Sample CTA — one row per
audience the user named. Write pain points and messaging specific to that
audience's day-to-day work, not generic marketing copy.

## 5. Key Brand Strengths

3 bullet points, one per voice attribute, each with a concrete proof point
(a number, a named user/customer, a governance fact) — strengths should mirror
the voice attributes so the two sections reinforce each other rather than
introducing a disconnected list.

## 6. Competitive Differentiation & Guardrails

- State the reference brand(s) the user named as the differentiation set.
- **Hard Constraints**: list every color/mark/reference constraint the user
  gave, as explicit rules (e.g. "do not use [Brand]'s palette or reference its
  [capability] by name").
- **How to Differentiate Without Naming Names**: 3-5 bullets reframing the
  differentiation by category (open source vs. proprietary, no lock-in, neutral
  governance, pricing model, etc.) rather than disparaging the named brand —
  per the brand-voice skill's "confident but fair, fact-based not disparaging"
  rule for competitive content.

## 7. Visual Identity — Five Components

One sentence noting Component 5 (Voice & Tone) is defined in Section 3; this
section covers Components 1-4.

### Component 1 — Logo Concept

Do not attempt an actual AI-rendered logo — write a creative brief:

- A short note that this is a constrained brief, not a final render, because
  complex AI drafts are often unusable by Creative Services.
- **Concept Direction**: 2-3 sentences on what the mark should evoke, grounded
  in the project's domain and voice.
- **Boundary Conditions** (adapt, don't skip any):
  - Single mark, maximum 2 colors within the icon itself.
  - Must remain legible at 16px (favicon size) and in monochrome.
  - No gradients, photorealism, 3D rendering, or fine detail a person can't
    redraw by hand in vector form.
  - Avoid any visual cliché tied to a named competitor/reference brand from
    Section 6 (e.g. a specific icon shape or color strongly associated with
    them).
  - Must not use any competitor's palette (cross-reference Component 2).
- **Deliverable Spec** table: Primary (full lockup), Horizontal (mark +
  wordmark side-by-side), Icon-only (mark alone, for favicons/avatars).
- One line on delivery: AI-generated previews to align on direction, then
  handed to Creative Services (via ticket, per standard workflow) to redraw as
  final vector SVGs per variant.

### Component 2 — Color Palette

Primary (1), secondary (1), accent (1-2), neutral (1-2) — five colors maximum.
Choose colors that fit the project's voice and respect any constraint from
Section 6; do not reuse a palette from a previous run by default.

For every color, compute the real WCAG contrast ratio against white and/or
black (and against each other where relevant) using relative luminance:

```
for each channel c in [0,1] (sRGB):
  c' = c/12.92                        if c <= 0.03928
     = ((c+0.055)/1.055) ** 2.4       otherwise
L = 0.2126*R' + 0.7152*G' + 0.0722*B'
contrast(L1, L2) = (max(L1,L2)+0.05) / (min(L1,L2)+0.05)
```

AA thresholds: 4.5:1 for normal text, 3:1 for large text (18pt+/bold 14pt+).
Run this calculation (e.g. a short Python snippet) rather than estimating —
report the actual ratio and whether it passes, and flag any pairing that only
passes at large-text size so writers know not to use it for body copy.

Table columns: Role | Hex / RGB | Swatch (a shaded cell) | Use & WCAG AA
Contrast.

### Component 3 — Typography Pairing

Primary (headings) + secondary (body), maximum 2 families, prefer Google Fonts
for accessibility and portability. Table: Primary, Secondary, Usage guidance
(heading/body sizes and weights, e.g. H1 28-32px/700, Body 15-16px/400).

### Component 4 — Imagery & Iconography Style

2-3 sentences describing the visual style for photography/illustration —
subject matter and treatment appropriate to the project's domain and voice —
plus a Do / Don't table with concrete examples (not generic platitudes).

## 8. Tagline Options (Starter Set)

2-3 tagline options with a one-line rationale each.

## 9. Channel Quick Reference

Table covering Blog, Social (LinkedIn), Social (X/Twitter), Email, Landing
page — each row gives channel-specific guidance derived from this project's
voice and audiences (not generic advice). Note that boilerplate and
word-count summaries come from the Message Foundation Doc, not this table.

## Appendix A: Document Architecture

Table: Brand Kit (this document) | Message Foundation Doc | ICP Document —
what each contains and which agent owns it. See Scope boundary in SKILL.md for
the exact wording.

## Appendix B: Source Intake

Table recording the raw answers to all seven intake questions verbatim, with
the date, for traceability.
