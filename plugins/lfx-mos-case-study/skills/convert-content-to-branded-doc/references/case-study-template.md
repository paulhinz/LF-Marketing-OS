# Case Study Template and Format Adaptations

## Default deliverable: End-User Case Study

Target length: 800-1,200 words. Structure, in order:

### 1. Cover block
- Project logo placeholder note (Creative Services inserts final art)
- Title: outcome-led, not tool-led. Pattern: "How [Organization] [achieved
  outcome] with [Project]". Avoid puns and internal jargon.
- Subtitle: one sentence naming the industry and the core result.
- If organization approval is unconfirmed: a bold note "DRAFT — company name
  pending approval" at the top.

### 2. At-a-glance sidebar (table)
| Field | Content |
|---|---|
| Organization | Name, industry, size (only if stated in source) |
| Challenge | One sentence |
| Solution | Project name + how deployed |
| Results | 2-4 bullets, each a metric or concrete outcome from the source |

### 3. Challenge (~200 words)
The organization's situation before adoption. Business context first, technical
detail second. Use the interviewee's own framing where possible.

### 4. Solution (~300 words)
Why they chose the project, how they adopted it, what the architecture or
workflow looks like now. Name other CNCF/LF projects used alongside it — LF
case studies deliberately show ecosystem composition. Vendor-neutral: describe
proprietary alternatives by category, never disparagingly by name.

### 5. Results (~200 words)
Concrete outcomes. Rules:
- Every metric must appear in the source content. No extrapolation.
- Missing metrics → insert `[NEEDED FROM INTERVIEWEE: e.g., deployment
  frequency before/after]`.
- Prefer before/after comparisons over absolute numbers.

### 6. Pull quotes (2-3, distributed through sections 3-5)
- Only sentences the speaker actually said, cleaned of filler.
- Attribute: full name, title, organization.
- Best quotes are opinionated or specific — skip generic praise.

### 7. What's next (~100 words)
Future plans mentioned in the source. Omit the section if none were.

### 8. About sections
- "About [Organization]" — 2-3 sentences from their public site.
- "About [Project]" — use Message Foundation boilerplate verbatim if
  available; otherwise 2-3 sentences from official site, ending with the
  project's LF/foundation affiliation and website URL.

## Format adaptations

When the user asks for a different deliverable, keep Steps 1-3 and 5-6 of the
skill unchanged and swap the structure:

**Blog post** (600-900 words): conversational open hooked on the most
interesting moment of the source; first person or community "we" per the
project's voice; subheads every 150-200 words; end with a call to action
(try the project, attend the event, read the docs). No sidebar table.

**Article / long-form** (1,200-2,000 words): journalistic structure — lede,
nut graf, body with subheads, quotes woven throughout; neutral third person;
keep the About boilerplate as a closing note.

**Executive summary** (300-500 words): title, three-sentence overview, then
"Key points" as 4-6 substantive bullets (1-2 sentences each), then
"Implications" paragraph. Strip quotes to at most one.

**Q&A / interview format**: brief intro paragraph, then cleaned-up
question-and-answer pairs from the transcript, lightly condensed; preserve the
interviewee's voice over the project's brand voice, but keep headings and
styling on-brand.

## Styling notes for the docx build

- Headings in the project's primary brand color; body text near-black
  (#1a1a1a) for print friendliness.
- Verify heading-color-on-white passes WCAG AA (contrast ratio ≥ 4.5:1 for
  body-size, ≥ 3:1 for large headings); if the brand color fails, darken it
  and note the substitution.
- Pull quotes: indented block, accent-color left bar (a 1-cell shaded table or
  border works), italic, attribution on its own line.
- Sidebar table: header row shaded with the primary brand color, white text.
- Footer: "[Project Name] | DRAFT for review | [date]".
