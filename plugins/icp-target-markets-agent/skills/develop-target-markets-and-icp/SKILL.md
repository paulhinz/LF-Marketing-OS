---
name: develop-target-markets-and-icp
description: >
  This skill should be used when a Linux Foundation project leader or marketing
  advisor says "Develop Target Markets and ICP", "build an ICP for [project]",
  "create a target markets document for my LF project", or otherwise asks to
  define ideal customer profiles, personas, target markets, or fit/warmth
  scoring for an LF-hosted project as part of LFX Marketing OS. Produces the
  ICP Document — one of three LFX Marketing OS foundational documents
  (alongside the Brand Kit and Message Foundation Doc) — as a Word document.
metadata:
  version: "0.1.0"
  author: "Paul Hinz, Linux Foundation"
---

# Develop Target Markets and ICP

Guide the user through a short intake, then generate a "[Project Name] Target
Markets and ICP" Word document. This is the third of three LFX Marketing OS
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
employee-count bands — instead of inventing plausible-sounding segments. This
is optional: if the tools aren't available or the project isn't found, proceed
on interview answers and README/Brand Kit content alone, and don't block the
interview waiting on it.

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
   whitespace framing.
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
- Use the `docx` skill to build the document (US Letter, tables for anything
  tabular, a heading/color system consistent with the companion Brand Kit if
  one exists). Render to PDF and visually check every page before sharing.
- Save the file as `[Project Name] Target Markets and ICP.docx`.

## Step 3 — present and close the loop

After sharing the file:

1. Ask the user for feedback on the document.
2. If they give feedback, offer to regenerate incorporating it, and repeat
   this step after regeneration.
3. If they have no feedback, recommend they place it in the same shared
   location as the companion Brand Kit and Message Foundation Doc — this ICP
   Document is a dependency other Marketing OS agents (Segmentation Agent,
   campaign/content agents) load, not a one-off file.

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
- `examples/opensearch-target-markets-and-icp-sample.md` — a worked example,
  generated during this skill's first test run, for an OpenSearch ICP document
  grounded in a real Brand Kit, Message Foundation Doc, and live LFX
  membership data.
