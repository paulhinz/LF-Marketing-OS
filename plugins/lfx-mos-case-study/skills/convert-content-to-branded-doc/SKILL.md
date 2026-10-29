---
name: convert-content-to-branded-doc
description: >
  This skill should be used when a Linux Foundation marketer, Executive Director,
  or Project Leader says "turn this video into a case study", "convert this
  transcript into a case study for [project]", "make a branded doc from this
  interview", "run the Case Study Agent", shares a YouTube URL / interview
  transcript / meeting notes / recording and asks for a written deliverable, or
  otherwise asks to convert source content into an on-brand Word document for an
  LF project or foundation. This is the LFX Marketing OS "Case Study Agent". It
  ingests any input (video, transcript, notes, article, raw text), loads the
  project's brand (Brand Kit + Message Foundation), and produces a first-draft
  .docx — a case study by default, or a blog post, article, or summary on request.
metadata:
  version: "0.1.0"
  author: "Paul Hinz, Linux Foundation"
---

# Convert Content to Branded Doc (Case Study Agent)

Ingest any source content, load the target project's brand, and produce a
first-draft Word document in that project's brand voice and visual identity.
This is a Level-1 LFX Marketing OS agent: short intake, then do the work — the
human reviews, the agent assembles.

The default deliverable is a **case study**. If the user asks for a different
format (blog post, article, executive summary, Q&A), produce that instead using
the same brand-loading and drafting rules; the case-study template in
`references/case-study-template.md` includes adaptation notes for each format.

## Step 1: Intake

Determine three things before doing any work. Ask only for what the user has
not already provided — do not re-ask questions their initial message answers:

1. **Source content** — a YouTube URL, uploaded transcript/notes file, pasted
   text, a link to an article or recording, or a meeting in a connected
   meeting-notes tool.
2. **Project or foundation** — which LF project's brand the document should
   carry (e.g., CNCF, PyTorch Foundation, OpenSSF).
3. **Deliverable type** — assume case study unless the user says otherwise.
   If the source content is clearly not case-study material (e.g., a keynote
   with no customer story), say so and suggest a better-fitting format before
   drafting.

Also confirm, when drafting a case study, whether the featured end-user
organization has approved being named. If unknown, proceed but flag every
company name in the draft as "pending approval" in a note at the top of the
document.

## Step 2: Acquire the content

Handle each input type as follows:

- **YouTube or other video URL**: Fetch the page with web fetch and attempt to
  extract the transcript/captions. If the raw fetch does not yield a usable
  transcript, search the web for a published transcript or detailed coverage of
  the same talk. If neither works, ask the user to paste or upload the
  transcript — do not draft from a video title and description alone.
- **Uploaded file** (txt, docx, pdf, vtt, srt): Read it directly. Use the pdf
  or docx skill if needed to extract text.
- **Pasted text or notes**: Use as-is.
- **Meeting recording in a connected tool** (e.g., LFX meetings, a meeting
  notes connector): Retrieve the transcript or summary via the connector.

Clean the acquired text before drafting: strip timestamps, speaker-label noise,
filler words, and caption artifacts. Identify the speakers and their roles —
attribution matters for quotes. Never invent quotes; only quote sentences that
appear in the source, lightly cleaned for readability (remove "um", false
starts) without changing meaning.

## Step 3: Load the brand

Work down this list and stop at the first source that succeeds:

1. **Brand Kit + Message Foundation documents.** Ask the user for the
   project's Brand Kit and Message Foundation docs, or locate them yourself:
   check files the user uploaded or connected this session, then search
   connected storage (e.g., Google Drive) for "[Project Name] Brand Kit" and
   "[Project Name] Message Foundation". Extract: voice attributes and the
   4-adjectives summary, positioning statement, boilerplate, audience
   messaging, color palette (with hex values), and typography direction.
2. **Web research fallback.** If no foundation docs exist, research the
   project's official site, brand/style guidelines page (many LF projects
   publish one, e.g. cncf.io brand guidelines), and README. Derive a working
   voice (professional, community-oriented, vendor-neutral — typical LF
   defaults) and pull the official colors from the site. State in your summary
   to the user that the brand was derived from public sources, and recommend
   running the Brand Kit Agent and Message Foundation Agent to create the real
   foundation docs.

Never disparage vendors or competitors by name in the draft, per the LF
"confident but fair" rule. Keep the document vendor-neutral in tone.

## Step 4: Draft the document

Read `references/case-study-template.md` before drafting — it specifies the
full case-study structure, the rules for metrics and quotes, and the
adaptations for blog post / article / summary formats.

Key rules:

- Ground every claim in the source content. Do not invent metrics, outcomes,
  or organizational details. If the source lacks results/metrics, include a
  clearly marked `[NEEDED FROM INTERVIEWEE: ...]` placeholder rather than
  fabricating one.
- Write in the project's voice attributes from Step 3, not generic marketing
  voice. Use the project's boilerplate verbatim in the "About" section when a
  Message Foundation doc supplied one.
- This is a **first draft** for human review — favor completeness and clear
  placeholders over polish that hides gaps.

## Step 5: Build the Word document

Use the `docx` skill to build the file:

- US Letter, clean single-column layout.
- Apply the project's brand: primary brand color for headings and accent
  elements, brand-appropriate fonts (or close system equivalents — note any
  substitutions), project name and document type in a header or cover block.
- Include pull quotes styled distinctly (indented, accent color bar or italics).
- Add a final "About [Project]" boilerplate section and, for case studies, an
  "About [Organization]" section.
- Render to PDF and visually check every page before sharing, per the docx
  skill's verification step.
- Save as `[Project Name] - [Deliverable Title] - DRAFT.docx`.

## Step 6: Present and close the loop

After sharing the file:

1. Summarize in 2-3 sentences: what source was used, which brand source was
   loaded (foundation docs vs. web-derived), and what placeholders need human
   input.
2. Ask for feedback; if given, regenerate incorporating it and repeat this step.
3. If the brand came from web research, remind the user to run the Brand Kit
   Agent and Message Foundation Agent so future runs use the real foundation
   docs.
4. Recommend placing the approved final in the project's shared content
   repository alongside the other Marketing OS documents.
