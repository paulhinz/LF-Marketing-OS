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
  version: "0.3.0"
  author: "Paul Hinz, Linux Foundation"
---

# Develop Target Markets and ICP

Guide the user through a short intake, then generate a "[Project Name] Target
Markets and ICP" document on the LF Agent DOCS Template (Google Docs-ready
`.docx`). This is the third of three LFX Marketing OS
foundational documents, and a Level-1, single-prompt agent: launch from the
command, ask a fixed set of questions, then do the work — the human reviews,
the agent assembles.

## Scope boundary — read this first

LFX Marketing OS defines three separate foundational documents per project.
This skill produces only the third:

1. **Brand Kit** (a different agent) — identity, voice, positioning statement,
   audience messaging, competitive guardrails, five-component visual identity.
2. **Message Foundation Doc** (a different agent) — word-count-locked
   summaries, boilerplate, `llms.txt`, elevator pitch, full audience and
   messaging-pillar framework, derived from the Brand Kit.
3. **ICP Document** (this skill) — market segment overview, organization-level
   ICP definitions (5 dimensions each), persona definitions (2-3 per ICP), and
   fit/warmth scoring inputs.

Do not re-derive positioning, voice, or messaging pillars here — pull them
from the Brand Kit and Message Foundation Doc as direct inputs. If either
document doesn't exist yet, say so plainly and offer to proceed on interview
answers and the GitHub README alone, flagging every resulting section as
lower-confidence.

## Step 0 — gather existing inputs first

Before asking anything, check whether a `[Project Name] Brand Kit` and a
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
Appendix B with its source and one of `Sourced` / `Inferred` / `Needs input`,
set the status to "DRAFT — pre-filled, awaiting ED review", and end the
document with a **YOUR INPUT** section listing what the project leader must
confirm (the business outcome and its weighting, disqualifiers, trigger events,
the SOM target). Then continue with Steps 2 and 3.

## Step 1 — run the interview one question at a time, in this exact order

This is a conversational interview, not a form dump. Ask each question as a
short, plain message and **wait for the user's answer before asking the next
one.** Do not batch these into a single multi-part message, and do not
generate anything until the final question is answered.

1a. **Project name.** "What's the name of the LF project?"

1b. **GitHub / README URL.** "What's the URL of the project's GitHub repo or
README?" — once given, fetch and read it before continuing. Pull real signal:
license, governance, stated purpose, tech stack, community channels, adopter
signals.

1c. **Brand Kit and Message Foundation Doc.** "Do you already have a
`[Project Name] Brand Kit` and/or Message Foundation document, and if so,
where are they?" If given, read both fully per Step 0.

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
   whitespace framing. Merge the answer with the Step 0 competitor scan; if
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
   (Step 0) wasn't available: "Any known member organizations or contributor
   companies already in the ecosystem, to seed firmographics?"

State plainly when you're done: "That's everything I need — generating the
ICP document now."

## Step 2 — generate the document

Build following the full structure in `references/icp-document-template.md`.
Read that file before drafting — it specifies every section, the dual-audience
ICP pattern, the persona field set, and the fit/warmth scoring format.
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
- **2-3 personas per ICP**, using the full persona field set (Title, Name/
  Nickname, Role, Goals, Challenges, Works for, Other Roles Performed, Trusted
  Sources, Key Responsibilities, Statements to share with the boss, Features
  and Persona Benefits, Example Use Cases) — reuse any personas/audiences
  already defined in the Brand Kit or Message Foundation Doc rather than
  inventing new ones, and extend them to the fuller field set.
- **Fit/Warmth scoring inputs**: 4-6 attributes an actual contact or org can be
  scored against (Viable/Warm/Hot), weighted toward the business outcome named
  in the interview.
- **Messaging & Content Handoff**: map each persona to a messaging pillar and
  proof point from the Message Foundation Doc, plus a preferred channel — this
  is what makes the document directly usable for web, content, social, and
  campaign briefs.
- **Claims lint on persona statements.** "Statements to share with the boss"
  are the lines most likely to be repeated verbatim in a member's own
  building. No cost or performance comparison without a cited basis, no
  transactional framing of governance ("buys a vote"), no superlative without
  its Stat Bank ID, and governance wording only as the Brand Kit Appendix C
  states it.
- **Label the schema for readers.** The five dimensions and the persona field
  set follow the Velocity Engine schema so field names stay consistent across
  systems; in the document call them "ICP dimensions" and "persona fields",
  and define "Velocity Engine" once in Appendix B or not at all — an ED or a
  member reading the document does not know the name.
- **Fill case slots from public sources when adopters are unconfirmed.** A
  public directory, marketplace or integration listing found by the sweep can
  fill a "Case — TBD" slot as "public source, not requester-confirmed"; a
  named organization still needs confirmation before it is presented as an
  adopter story.
- **Build on the LF Agent DOCS Template, never by hand.** Write the whole
  document as `[Project Name] Target Markets and ICP.md` following
  `references/icp-document-template.md` (pipe tables for the competitive
  table, the ICP dimensions, the persona fields, the fit/warmth scoring and
  the handoff map; `<<<PAGEBREAK>>>` before each appendix), then render it
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
list to the delivery message. Open the delivery message with a one-page digest
for the marketing lead: the verdict, the SOM proposal and the persona hooks
you recommend leading with, what the sweep found beyond the brief, and the
decisions the requester still owes.

## Step 3 — present and close the loop

After sharing the file:

1. Ask the user for feedback on the document.
2. If they give feedback, offer to regenerate incorporating it, and repeat
   this step after regeneration.
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
