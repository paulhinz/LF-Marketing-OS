---
name: develop-target-markets-and-icp
description: >
  This skill should be used when a Linux Foundation project leader or marketing
  advisor says "Develop Target Markets and ICP", "build an ICP for [project]",
  "create a target markets document for my LF project", "pre-fill the ICP for
  [project]", or otherwise asks to define ideal customer profiles, personas, target markets, or fit/warmth
  scoring for an LF-hosted project as part of LFX Marketing OS. Produces the
  ICP Document — one of three LFX Marketing OS foundational documents
  (alongside the Brand Kit and Message Foundation Doc) — as a Google Docs-ready
  document on the LF Agent DOCS Template, with the project's name and logo on
  the cover and the project's brand colors applied.
metadata:
  version: "0.4.0"
  author: "Paul Hinz, Linux Foundation"
---

# Develop Target Markets and ICP

Ask whether the foundation already has its own audience, persona or
competitive documents, map them if it does, interview only for the gaps, then
generate a "[Project Name] Target Markets and ICP" document on the LF Agent
DOCS Template (Google Docs-ready `.docx`). This is the third of three LFX
Marketing OS foundational documents, and a Level-1, single-prompt agent: launch
from the command, ask a fixed set of questions, then do the work — the human
reviews, the agent assembles.

The document is short by design: a two-page **Review Sheet** the ED or SME
approves, then a reference body of 8–10 pages (hard cap 12) in which every
persona uses the same eleven-field template. `references/input-doc-mapping.md`
defines the field registry, the persona template, the Review Sheet, the length
budget and the structured sidecar; read it before Step 0a. Version 0.4.0 exists
because an ED told us our foundation documents were too long to be read or
owned by a human, and that his foundation already had a persona file — nine
personas on one repeated template — that this agent now accepts as input.

## Scope boundary — read this first

LFX Marketing OS defines three separate foundational documents per project.
This skill produces only the third:

1. **Brand Kit** (a different agent) — identity, positioning statement, brand
   principle, voice and prefer/avoid language, what we don't claim, competitive
   guardrails, five-component visual identity.
2. **Message Foundation Doc** (a different agent) — vision, mission,
   word-count-locked summaries, boilerplate, `llms.txt`, elevator pitch,
   messaging pillars, sourced proof points and objections, derived from the
   Brand Kit.
3. **ICP Document** (this skill) — market segment overview, organization-level
   ICP definitions (5 dimensions each), personas (4–9 on the fixed
   eleven-field template, including per-persona messaging and "what NOT to
   say"), persona selection cues and map, and fit/warmth scoring rules.

Do not re-derive positioning, voice, or messaging pillars here — pull them
from the Brand Kit and Message Foundation Doc as direct inputs. If either
document doesn't exist yet, say so plainly and offer to proceed on interview
answers and the GitHub README alone, flagging every resulting section as
lower-confidence. The field-level ownership list is
`references/input-doc-mapping.md` §3 (the `icp.*` rows); this document is the
only place audiences and personas are authored.

## Step 0a — ask for existing documents

Before the sibling-document check, the LFX pull, or any interview question,
ask the one question in `references/input-doc-mapping.md` §1: does the
foundation already have an audience, persona, segment, ICP or competitive
document to use as input? Accept several files; read them in full. If the
Project Inputs record (`[project-slug].inputs.yaml`) already lists documents
the Brand Kit or Message Foundation agent received, name them and ask whether
to use those or whether there is anything new.

- **If no:** continue with Step 0b and the normal interview or pre-fill mode.
- **If yes:** map every ICP field in the registry (`input-doc-mapping.md` §3,
  the `icp.*` rows) from the supplied documents, labeling each `From your doc
  §…`, `From README / LFX`, `Inferred`, `Partial` or `Needs input`. A supplied
  persona file is mapped persona by persona onto the eleven-field template;
  fields the source does not have are `Needs input` for that persona, and the
  source wording is quoted verbatim everywhere it exists. Show the coverage
  table ("Your documents fill N of 11 ICP fields and 7 of 9 personas
  completely; I need to ask about G") **before** asking anything, then run
  Step 1 only for the gaps.
- Common gaps when a foundation supplies its own persona document:
  organization-level firmographics as one table, the business outcome and its
  weighting, Fit × Warmth thresholds and hand-raiser signals, and a SOM
  proposal. Ask for the first two; derive the last two from LFX data and mark
  them `Inferred` for the ED to confirm.
- Append the documents, links and date read to `[project-slug].inputs.yaml`.

## Step 0b — gather the sibling documents and live data

Before asking anything else, check whether a `[Project Name] Brand Kit` and a
`[Project Name] Message Foundation` document already exist (in the working
folder, a connected Drive, or wherever the user points). If companion "Develop
LF Project Brand Kit" / "Develop LF Project Messaging Foundation" skills or
plugins are installed and have already produced them for this project, treat
both as primary sources — read them in full for positioning, voice, existing
audience/persona definitions, and messaging pillars. This agent's job is to
extend them into market segments, org-level ICPs, and fit/warmth scoring, not
duplicate their content.

If a Google Drive (or equivalent) connector is available and the user gives a
Drive URL, read the file directly rather than asking the user to paste its
contents.

**Optional live data enrichment.** If LFX platform tools are available (e.g.
`search_projects`, `search_members`), look up the project by name and pull its
real, active membership records. Use this to ground firmographics in the
project's actual member roster — company names, industry, and membership-tier
employee-count bands — instead of inventing plausible-sounding segments. Also
pull `new_members period=month` for the SOM run-rate proposal. This is
optional: if the tools aren't available or the project isn't found, proceed
on interview answers and README/Brand Kit content alone, and don't block the
interview waiting on it.

**Read the Brand Kit's Appendix C, then run the competitor scan.** A Brand Kit
from `brand-guidelines-agent` 0.2.0 or later carries an "LFX Project Record &
Research Sweep" appendix: the derived governance sentence (copy it verbatim
wherever a persona statement mentions governance; never derive governance from
the README or the interview, and never write "[Project] Foundation, a Series
of LF Projects, LLC" — the foundation and the Series LLC are different
entities), the "Found beyond the brief" table (working groups become persona
hooks and Engage CTAs; directories and marketplaces become ICP-C use cases and
case-study inputs; public integrations are stated as facts in §1.2) and the
timeline. Then run your own competitor scan with web search before the
interview reaches question 2 — `"[project]" vs`, `[project] alternative`,
`[category] comparison`, and `[each Premier member] [category]` — because the
user's list is a starting point, not the landscape, and a member's
like-for-like product is the row the interview forgets. Members' products are
peers in the document, never targets.

## Pre-fill mode (no interviewee)

When the user says "pre-fill for [project]" or "run in batch for [project]",
or an orchestrator passes `mode: prefill`, there is no project leader on the
call. Skip the one-question-at-a-time interview. Answer each Step 1 question
yourself from sources in this order: the Brand Kit and Message Foundation
(including Appendix C), live LFX membership data and standard metrics, the
project site, the GitHub organization, the competitor scan, existing marketing
materials the user points to, then labeled inference. Record every answer in
Appendix B with its source and one of the labels from
`input-doc-mapping.md` §2 (`From your doc` / `From README / LFX` / `Inferred`
/ `Partial` / `Needs input`), and set the status to "Draft — pre-filled". The
Review Sheet's Source column and its `Needs input` rows replace the older
**YOUR INPUT** section: the reviewer sees in one table what the agent took from
where and what it still needs (the business outcome and its weighting,
disqualifiers, trigger events, the SOM target). Then continue with Steps 2
and 3.

## Step 1 — run the interview one question at a time, in this exact order

This is a conversational interview, not a form dump. Ask each question as a
short, plain message and **wait for the user's answer before asking the next
one.** Do not batch these into a single multi-part message, and do not
generate anything until the final question is answered. **If Step 0a produced
documents, ask only the questions the coverage table listed as gaps**, and say
why you are asking each one ("Your persona file has no organization-level
disqualifiers; who is clearly not a fit?").

1a. **Project name.** "What's the name of the LF project?"

1b. **GitHub / README URL.** "What's the URL of the project's GitHub repo or
README?" — once given, fetch and read it before continuing. Pull real signal:
license, governance, stated purpose, tech stack, community channels, adopter
signals.

1c. **Brand Kit and Message Foundation Doc.** "Do you already have a
`[Project Name] Brand Kit` and/or Message Foundation document, and if so,
where are they?" If given, read both fully per Step 0b.

1d. **Up to 5 gap-filling questions**, one at a time, in this priority order —
skip any the user already answered or that's clearly inferable from the README
/ Brand Kit / Message Foundation Doc:

1. **Business outcome.** "What business outcome should this ICP be optimized
   toward right now — membership growth, event attendance,
   training/certification enrollment, demand-gen pipeline, or some mix?" This
   sets the weighting for the fit/warmth scoring section later — don't skip it.
2. **Competitive/peer landscape.** "Who do ICP-fit organizations typically
   evaluate against or migrate from?" Real product names, not generic
   categories — this feeds the market-segment competitive table and
   whitespace framing. Merge the answer with the Step 0b competitor scan; if
   the scan found an alternative the user did not name, say so and include it.
3. **Disqualifiers.** "Who is clearly NOT a good fit — any org profile, use
   case, or situation you'd want this ICP to explicitly screen out?" If the
   user says they don't know, draft disqualifiers as an inferred pattern from
   the competitive/firmographic evidence gathered so far, and mark them
   clearly as an unconfirmed draft needing review — never state them as fact.
4. **Trigger events.** "What typically triggers an org or team to start
   evaluating/adopting this project right now?" (a licensing change elsewhere,
   a compliance need, a failed migration, scaling/cost pain, a security
   incident, a new product build, etc.)
5. **Known member/adopter organizations** — only ask this if live LFX data
   (Step 0b) wasn't available: "Any known member organizations or contributor
   companies already in the ecosystem, to seed firmographics?"

State plainly when you're done: "That's everything I need — generating the
ICP document now."

## Step 2 — generate the document

Build following the full structure in `references/icp-document-template.md`.
Read that file before drafting — it specifies the Review Sheet, every section,
the dual-audience ICP pattern, the eleven-field persona template, the
selection-cues and persona-map tables, and the Fit × Warmth grid. Hold the
length budget: 8–10 pages target, 12 hard cap, ≤350 words per persona and ≤300
words for any other section (`input-doc-mapping.md` §6).
`references/velocity-engine-field-reference.md` documents the companion
"Velocity Engine" data schema this template is aligned to, for when a future
version of this skill connects to it directly (see Roadmap below) — use it to
keep field names consistent even in this interview-driven version.

Key rules:

- **Ground every claim.** Every fact must trace to: the Brand Kit, the Message
  Foundation Doc, the GitHub README, live LFX data if pulled, or an interview
  answer. Anything else is **TBD — needs input** or an explicitly labeled
  **inferred draft**, never smoothed over as fact.
- **Dual-audience ICP pattern.** Default to two organization-level ICPs: a
  Community & Technical Adopter organization (bottoms-up, engineering-driven)
  and an Enterprise Member organization (top-down, budget/governance-driven).
  This is the standard pattern for open-source/LF projects — adapt or collapse
  to one ICP if the project has no formal membership program or the user's
  answers don't support a two-sided split.
- **5 dimensions per ICP**: ICP description, Trigger Events / Compelling
  Moments, Who is not an ideal customer, Customer Use Cases, Customer Pain
  Points — per `references/velocity-engine-field-reference.md`.
- **4–9 personas in total**, every one on the fixed eleven-field template
  from `input-doc-mapping.md` §4 (Role · Organization · What they are
  responsible for · How they encounter [Project] · What they need to believe ·
  What NOT to say · Which offer matters first · Content that moves them · The
  ask · Key pillars · Geographic note), ~350 words each, one-sentence
  bullets. Start from the Brand Kit's audience names and any personas the
  requester's own documents define; never invent personas beyond what the
  interview, the member roster or the supplied documents support. Two tables
  frame the personas: **selection cues** (keyword or organization type →
  persona) and the **persona map** (persona · primary offer · primary pillar ·
  geography). The older twelve-field Velocity Engine persona set is retired
  from the document; `references/velocity-engine-field-reference.md` carries
  the mapping so the connector can still be fed.
- **Fit × Warmth rules**: one 3×3 grid with the thresholds for Viable / Warm /
  Hot ([3,3] Hot; [2,3] and [3,2] Warm; [1,3], [2,2], [3,1] Viable), the 4–6
  attributes that feed each axis, weighted toward the business outcome named
  in the interview, and the hand-raiser signals that override the grid
  (membership application, "Talk to Sales", second prospectus download,
  sponsorship inquiry, bulk-enrollment request, paid-tier registration).
- **Messaging lives in the persona**, not in a separate handoff table: fields
  5, 6, 8, 9 and 10 (what they need to believe, what NOT to say, content that
  moves them, the ask, key pillars) reference Message Foundation pillar tags
  and proof-point ids by name. Never invent a pillar that does not exist there.
- **Claims lint on persona statements.** "What they need to believe" lines
  are the ones most likely to be repeated verbatim in a member's own
  building. No cost or performance comparison without a cited basis, no
  transactional framing of governance ("buys a vote"), no superlative without
  its Stat Bank ID, and governance wording only as the Brand Kit Appendix C
  states it. Where the wording is the requester's own, keep it and flag the
  issue in the Review Sheet Notes column.
- **Label the schema for readers.** The five ICP dimensions follow the
  Velocity Engine schema so field names stay consistent across systems; in the
  document call them "ICP dimensions", and define "Velocity Engine" once in
  Appendix A or not at all — an ED or a member reading the document does not
  know the name.
- **Review Sheet first, then the routing block.** The first section after the
  cover is the two-page Review Sheet defined in `input-doc-mapping.md` §5 (one
  row per `icp.*` field marked "Review Sheet? Yes", personas one row each with
  their "lead with" line); the body opens with a "How to use this document"
  routing block for downstream agents (which persona to pick for which
  audience, read "What NOT to say" before writing).
- **Structured sidecar.** Alongside the `.docx` and `.md`, write
  `[project-slug].icp.fields.yaml` with every `icp.*` field (personas as a
  list of eleven-key objects) per `input-doc-mapping.md` §7, and create or
  append `[project-slug].inputs.yaml`. The Segmentation and campaign agents
  read the sidecar, not the document.
- **Fill case slots from public sources when adopters are unconfirmed.** A
  public directory, marketplace or integration listing found by the sweep can
  fill a "Case — TBD" slot as "public source, not requester-confirmed"; a
  named organization still needs confirmation before it is presented as an
  adopter story.
- **Build on the LF Agent DOCS Template, never by hand.** Write the whole
  document as `[Project Name] Target Markets and ICP.md` following
  `references/icp-document-template.md` (pipe tables for the Review Sheet, the
  competitive table, the firmographics, the ICP dimensions, the selection
  cues, the persona map and the Fit × Warmth grid; `<<<PAGEBREAK>>>` before
  each appendix), then render it
  with `scripts/build_lf_doc.py` as `references/lf-docs-template.md`
  describes. Pass `--project`, `--doc-type "Target Markets and ICP"`,
  `--status`, `--agent "ICP & Target Markets Agent"`,
  `--subtitle "Market segments, ideal customer profiles, personas and fit/warmth scoring — one of three LFX Marketing OS foundational documents"`,
  `--other` with the copy label (`Internal` or `Agency-safe`), and `--detail`
  rows for Repository, Source Brand Kit, Source Message Foundation, Optimized
  for (the business outcome from question 1) and Prepared for.
- **Logo and colors come from the Brand Kit.** `--primary` and `--secondary`
  are the Brand Kit §7 Component 2 primary and secondary hexes, verbatim;
  `--logo` is the mark the Brand Kit's Component 1 names or the project's
  current logo (LFX record, project site, GitHub org avatar — in that order).
  With no Brand Kit, read the project site's computed styles for the dominant
  brand color and say in the delivery message that the colors came from the
  site. Never generate a logo.
- Render to PDF and look at every page before sharing (logo on the cover,
  header reading `[Project] Target Markets and ICP · <status> · <copy label>`,
  tables inside the margins, headings readable, no `{Placeholder}` left). Fix
  the Markdown and rebuild; do not edit the `.docx`.
- Save `[Project Name] Target Markets and ICP.docx` (fonts embedded), a
  `--strip-fonts` build named `[Project Name] Target Markets and ICP (Drive
  upload).docx`, and the `.md`. Build the internal and agency-safe copies as
  two Markdown files rendered with the matching `--other` label.

## Step 2b — gate and digest

Before presenting, run the `lfx-marketing-os-qa` skill on the draft if it is
installed (it is in this marketplace): apply its High fixes and attach its fix
list to the delivery message. Open the delivery message with a short digest —
no more than ten lines: the status, how many fields and personas came from
the requester's own documents versus the agent, the SOM proposal and the
persona hooks you recommend leading with, what the sweep found beyond the
brief, and the decisions the requester still owes. The Review Sheet inside the
document carries the detail; say the requester does not need to read the body.

## Step 3 — present and close the loop

After sharing the file:

1. Point the user at the Review Sheet (two pages) and ask them to approve or
   edit there.
2. If they give feedback or edit the sheet, regenerate incorporating it, set
   the status to "ED-reviewed — [name], [date]", update the sidecar statuses
   to `approved`, and repeat this step.
3. If they have no feedback, get the document into the same shared Drive
   folder as the companion Brand Kit and Message Foundation Doc, as a Google
   Doc (the "Deliver as a Google Doc" section of
   `references/lf-docs-template.md`: browser upload of the Drive-upload build
   with the requester's go-ahead, or hand them the file to drag in) — this
   ICP Document is a dependency other Marketing OS agents (Segmentation Agent,
   campaign/content agents) load, not a one-off file.
4. Say which copy you delivered — internal (with the LFX roster and any list
   prices) or agency-safe — and where the other one is.

## Roadmap (not yet implemented)

A future version of this skill will accept a direct MCP connection to a
"Velocity Engine" service and pull ICP/persona fields from it automatically
instead of relying solely on human interview answers, the Brand Kit, and the
Message Foundation Doc. Until that connector exists, this skill runs entirely
on the interview + Brand Kit + Message Foundation Doc + README + optional live
LFX membership data flow above.

## Reference files

- `references/input-doc-mapping.md` — Step 0a (existing-document intake and
  gap-only interviewing), the standard field registry and ownership, the fixed
  eleven-field persona template, the Review Sheet, the length budget and the
  structured sidecar. Shared verbatim with the Brand Kit and Message
  Foundation plugins.
- `references/icp-document-template.md` — the exact section structure and
  what "complete" looks like per section.
- `references/velocity-engine-field-reference.md` — the companion Velocity
  Engine data schema (ICP fields, persona fields) this template aligns to.
- `references/lf-docs-template.md` — the LF Agent DOCS Template: what it
  fixes, how the project's logo and Brand Kit colors are applied, the cover
  spec, the Markdown the builder understands, the build command, the visual
  check and the Google Docs delivery.
- `scripts/build_lf_doc.py` — renders the Markdown document onto
  `assets/lf-agent-docs-template.docx` (the template with fonts and the LF
  logo embedded). `python3 scripts/build_lf_doc.py --help` lists every option.
- `examples/opensearch-target-markets-and-icp-sample.md` — a worked example,
  generated during this skill's first test run, for an OpenSearch ICP document
  grounded in a real Brand Kit, Message Foundation Doc, and live LFX
  membership data.
