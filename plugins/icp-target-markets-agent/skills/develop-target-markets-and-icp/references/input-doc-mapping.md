# Existing-document intake, Review Sheet and length budget

Shared reference for the three LFX Marketing OS foundation agents (Brand Kit,
Message Foundation, ICP & Target Markets). The same file ships in all three
plugins; keep the copies identical.

It answers three questions every run faces: what to do when the foundation
already has its own brand, messaging or audience documents; what an Executive
Director or subject-matter expert is asked to read and approve; and how long
the document may be.

Why this exists: in September 2026 an ED reviewed a 43-page Message Foundation
and a 62-page report and said he would not read either, that "less is more with
AI-generated content", that a document downstream agents rely on "needs to be
reviewed and owned by a human, otherwise you end up with a cycle of AI slop",
and that his foundation already had its own messaging, persona and competitive
documents. He agreed with two things: storing foundation documents in a common
location, and standardizing them across LF foundations so they are referenceable.
The rules below turn that feedback into behavior.

---

## 1. Step 0a — ask for existing documents before anything else

The first thing every foundation agent says, before the LFX record pull, the
research sweep, or any interview question:

> Before I ask anything: do you already have a brand, messaging, positioning,
> audience/persona or competitive document for [project] that I should use as
> input? It can be a Google Doc, a Markdown file, a deck, a wiki page or a web
> page, and you can give me several. Paste the links or files, or say "no".

Rules:

- One question, plain language, no list of what the document "should" contain.
  The ED's document does not have to look like ours.
- Accept several files at once. A foundation's own material is often split
  across a messaging framework, a persona file and a competitive note.
- If the answer is "no", run the agent's normal interview (or pre-fill mode)
  unchanged.
- If the answer is a document, read every file in full **before** asking
  anything else, then follow §2.
- If a Google Drive or equivalent connector is available, read the file
  directly from the link rather than asking the user to paste its contents.
- Record the answer (links, file names, date read) in the **Project Inputs
  record** (§6) so the sibling agents do not ask for the same files again.
  When a sibling agent runs later and the inputs record already names the
  files, say "I have the documents you gave the [Brand Kit] agent on [date];
  should I use those, or is there anything new?" instead of asking from scratch.

## 2. Map first, then ask only the gaps

When the user supplied documents:

1. **Map every standard field** in §3 that this agent owns. For each field
   record one provenance label:
   - `From your doc` — copied from the supplied document; cite section or page.
   - `From README / LFX` — taken from the repository, the LFX project record
     or LFX standard metrics.
   - `Inferred` — the agent's reading of the supplied material; must be labeled.
   - `Needs input` — nothing in the documents or sources covers it.
   - `Partial` — the document covers part of the field (for example three
     personas where the standard asks for four to nine). Fill what is there;
     never invent the rest.
2. **Show the coverage table before asking anything.** One short message:

   > Your documents fill N of M standard fields for the [Brand Kit]. I can take
   > K more from the README and LFX. I need to ask you about the remaining G:
   > [field names]. Shall I go ahead?

   This is the moment the ED learns the agent read their work. Do not skip it.
3. **Ask only the gaps**, one question at a time, in the agent's normal priority
   order, capped at the agent's normal maximum (eight for Brand Kit and Message
   Foundation, five for ICP). If the gaps exceed the cap, ask the ones the
   Review Sheet needs and mark the rest **TBD — needs input** in the body.
4. **Preserve the source wording.** A field that comes from the ED's document
   is quoted verbatim, in their spelling and punctuation, and never restyled,
   tightened or "improved". If the wording breaks a standard rule (a 90-word
   positioning statement against the 40-word rule; a superlative without a
   proof point), keep their wording, add a one-line flag in the Review Sheet's
   Notes column, and leave the decision to them.
5. **Conflicts.** The LFX project record wins for the governance sentence, the
   trademark sentence and legal-entity names; log the difference. For every
   other field the supplied document wins over the README and over the agent's
   own inference; log the difference in the appendix.
6. **Fields that belong to a sibling document.** A supplied messaging document
   may contain audiences; a persona document may contain narratives. Each agent
   maps only the fields it owns (§3) and leaves the rest in the Project Inputs
   record for the sibling agent to pick up.

## 3. Standard field registry

The fields an LF foundation document set is expected to carry, grouped by the
document that owns each one. "Owns" means: this is the only document where the
field is authored; the other two reference it. The registry is also the schema
of the structured sidecar (§5) and of the coverage table (§2).

### Brand Kit (owner: brand-guidelines-agent)

| Field id | Field | Review Sheet? |
|---|---|---|
| `bk.positioning_statement` | Positioning statement, one sentence, ≤40 words | Yes |
| `bk.brand_principle` | Brand principle or brand idea, ≤12 words, with a one-line gloss | Yes |
| `bk.voice_attributes` | 4–6 voice attributes as Attribute / What it means / What it is not | Yes |
| `bk.language_prefer_avoid` | Prefer / Avoid language table (terms, casing, phrases) | Yes |
| `bk.what_we_dont_claim` | Claims the brand never makes, 3–6 lines | Yes |
| `bk.visual.logo` | Logo brief or existing mark, variants, usage rules | Yes (summary line) |
| `bk.visual.palette` | Primary, secondary, accent, neutral hexes with WCAG results | Yes (hexes only) |
| `bk.visual.typography` | Heading and body families with sizes and weights | Yes (families only) |
| `bk.visual.imagery` | Imagery and iconography style, Do / Don't | No |
| `bk.key_strengths` | 3 brand strengths, one sentence each with a proof point or `[PROOF POINT TBD]` | No |
| `bk.tagline_options` | Starter taglines with a recommendation per surface | Yes (recommendation) |
| `bk.competitive_guardrails` | Differentiation set, hard constraints, how to differentiate without naming names | No |
| `bk.trademark_hygiene` | Trademark sentence (LFX-derived), casing rule, no-derivative-marks rule | No |
| `bk.governance_sentence` | Governance sentence derived from the LFX project record | No |
| `bk.primary_audiences` | Names of the primary audiences with one "lead with" cue each (the ICP document defines them) | No |

### Message Foundation (owner: message-foundation-agent)

| Field id | Field | Review Sheet? |
|---|---|---|
| `mf.vision` | Vision, one sentence | Yes |
| `mf.mission` | Mission, one or two sentences | Yes |
| `mf.positioning_platform` | Positioning platform, ≤40 words (must agree with `bk.positioning_statement`) | Yes |
| `mf.tagline_locked` | The locked tagline, or "TBD — none locked" | Yes |
| `mf.summary_25` | 25-word summary (hard cap) | Yes |
| `mf.summary_50` | 50-word summary (hard cap) | Yes |
| `mf.boilerplate` | Press boilerplate, 100–150 words | Yes |
| `mf.elevator_pitch` | Elevator pitch, ≤90 words | Yes |
| `mf.llms_txt` | `llms.txt` block | No |
| `mf.pillars` | 3–6 messaging pillars, each on the three-part scaffold (§4), ≤120 words each | Yes |
| `mf.message_matrix` | Value proposition / key message / supporting points per pillar, derived from `mf.pillars` | No |
| `mf.proof_points` | Sourced proof points only (Stat Bank rows with source and date) | Yes (count and top 3) |
| `mf.origin_story` | Origin story, ≤150 words | No |
| `mf.objections` | 3–6 objections with thesis, evidence, honest admission | Yes (the objections, one line each) |
| `mf.what_we_dont_claim` | Inherited from `bk.what_we_dont_claim`, extended with messaging-specific limits | Yes |
| `mf.cta_anchors` | One CTA per tier (Learn / Engage / Contribute / Commit), exact wording, ≤4 lines | Yes |
| `mf.terminology` | Naming conventions and constraints (inherits `bk.language_prefer_avoid`) | No |

### ICP & Target Markets (owner: icp-target-markets-agent)

| Field id | Field | Review Sheet? |
|---|---|---|
| `icp.business_outcome` | The outcome the ICP is optimized toward and its weighting | Yes |
| `icp.org_icp` | 1–2 organization-level ICPs, five dimensions each (description, trigger events, not a fit, use cases, pain points) | Yes (description row of each) |
| `icp.firmographics` | One table: industry, size band, geography, technographics, existing relationship | Yes |
| `icp.disqualifiers` | Who is not a fit, per ICP | Yes |
| `icp.personas` | 4–9 personas on the fixed eleven-field template (§4) | Yes (persona name + "lead with" line each) |
| `icp.persona_selection_cues` | Keyword → persona lookup table | No |
| `icp.persona_map` | Persona / primary offer / primary pillar / geography table | No |
| `icp.fit_warmth_rules` | Fit × Warmth 3×3 grid: thresholds for Viable / Warm / Hot and hand-raiser signals | Yes |
| `icp.competitive_landscape` | Alternative / category position / where the project differentiates, plus who we actually lose to | No |
| `icp.som_proposal` | SOM target proposal from LFX run-rate | Yes |
| `icp.regional_emphasis` | Regional differences in emphasis, events and entry points | No |

Fields no document owns any more (retired in this version, generated on demand
by downstream agents from the fields above): talking points, sound-bite banks,
tiered CTA libraries beyond the four anchors, per-persona ROI framing tables,
channel quick-reference tables, audience messaging tables inside the Brand Kit.

## 4. Fixed micro-templates

Repeated structures make fields comparable across foundations and let a
downstream prompt slot into any of them without re-reading the document. Use
these exactly; do not add or reorder fields.

**Messaging pillar (Message Foundation `mf.pillars`)** — three labeled
paragraphs, each 20–50 words, total ≤120 words, plus a tag:

- **Tag:** `short-stable-name`
- **What's happening:** the industry or user condition, with a cited figure if
  one exists.
- **Why it matters:** the consequence for the audience, in their words.
- **How [Project] helps:** the mechanism, not the slogan. One proof-point id or
  `[PROOF POINT TBD]`.

**Persona (ICP `icp.personas`)** — eleven bold-label fields in this order,
~350 words total, one-sentence bullets:

1. **Role**
2. **Organization**
3. **What they are responsible for**
4. **How they encounter [Project]**
5. **What they need to believe** (2–5 bullets)
6. **What NOT to say** (2–5 bullets)
7. **Which offer matters first** (project adoption / membership / event /
   training / influence only)
8. **Content that moves them**
9. **The ask** (one line)
10. **Key pillars** (tags from `mf.pillars`)
11. **Geographic note**

**Voice attribute (Brand Kit `bk.voice_attributes`)** — one row per
attribute in a single three-column table: Attribute | What it means | What it
is not. The older four-row "We are / We are not / Sounds like / Doesn't sound
like" block per attribute is retired; put one "sounds like / doesn't sound
like" pair for the whole voice under the table.

**Objection (Message Foundation `mf.objections`)** — four labeled lines:
**The challenge** (in the skeptic's words) · **Our thesis** · **Evidence**
(proof-point ids) · **What we admit**.

## 5. The Review Sheet and the Reference body

Every foundation document has two parts.

**Part 1 — Review Sheet (first two pages after the cover).** The only part an
ED or SME is asked to read. One table:

| # | Field | Current wording | Source | Approve / Edit | Notes |
|---|---|---|---|---|---|

- Rows are the fields marked "Review Sheet? Yes" in §3, in that order. Long
  fields (pillars, personas) appear as one row per item with a one-line
  summary; the full text lives in the body.
- **Source** is the provenance label from §2 (`From your doc §3`, `From
  README`, `Inferred`, `Needs input`). A reviewer's effort should go to
  `Inferred` and `Needs input` rows; their own wording needs no re-review.
- **Approve / Edit** is left blank for the reviewer. In a Google Doc they type
  in the cell; the agent reads the edits back on the next run.
- **Notes** carries the agent's flags: standard-rule conflicts with the
  supplied wording, a superlative without proof, a figure awaiting an LFX pull.
- Above the table, three lines: status (`Draft — pre-filled` /
  `Draft — from your documents` / `ED-reviewed`), what the agent did with the
  supplied documents ("31 of 38 fields from your documents; 7 asked"), and the
  one decision the requester still owes, if any.
- Cap: two pages. If it does not fit, the document has too many fields, not
  too small a font.

**Part 2 — Reference body.** Opens with a **How to use this document** routing
block written for a downstream agent or writer: one line per section saying
what to pull from it and for what ("For a press footer, copy §2 boilerplate
verbatim"; "For persona copy, read the persona block and its What NOT to say
before writing"), plus the standing rules: quote fields verbatim, output
`[PROOF POINT TBD]` rather than inventing evidence, and read the Prefer / Avoid
table before generating customer-facing copy. Then the sections the agent's
own template specifies.

**Status on the cover.** `Draft — pre-filled`, `Draft — from your documents`,
or `ED-reviewed — [name], [date]`. Downstream agents print the status of the
document they consumed in their own delivery message, so a pitch deck built
from an unreviewed draft says so. There is no gate; the status is information.

## 6. Length budget

| Document | Target | Hard cap | Per-section cap |
|---|---|---|---|
| Brand Kit | 6–8 pages | 10 pages | 300 words |
| Message Foundation | 8–10 pages | 12 pages | 300 words (Stat Bank appendix exempt) |
| ICP & Target Markets | 8–10 pages | 12 pages | 350 words per persona, 300 otherwise |

Covers, the Review Sheet and appendices count toward the cap. Rules of thumb
that keep documents inside it:

- One-sentence bullets. A bullet that needs a second sentence is two bullets or
  a paragraph.
- Tables for anything comparative or repeated (voice attributes, prefer/avoid,
  persona map, selection cues, competitive landscape, proof points).
- No section restates another. If a sibling document owns the field, write one
  line and the reference (`see Brand Kit §3`).
- No "starter sets", "banks" or "libraries" of copy the ED did not write.
  Downstream agents generate copy on demand from the fields; the foundation
  document holds the fields.
- Evidence is honest by default. The Stat Bank holds only rows with a source
  and a date; a section with no evidence says `[PROOF POINT TBD]` in one line
  rather than padding. State plainly when the bench is thin.
- Negative space is a field, not a footnote: "What we don't claim", "What NOT
  to say", "Who is not a fit" each get their own short block.

## 7. Structured sidecar and the Project Inputs record

Alongside the `.docx` and `.md`, write two small files to the same folder:

**`[project-slug].[doc].fields.yaml`** — every field id from §3 that this
document owns, with `value`, `source` (the §2 label plus citation), and
`status` (`approved` / `draft` / `tbd`). Multi-item fields (pillars, personas,
proof points) are lists of objects with the micro-template fields as keys.
Downstream agents read this file, not the document, and the same schema holds
for a foundation's own documents once they have been mapped, so every LF
foundation is referenceable the same way.

**`[project-slug].inputs.yaml`** — the Project Inputs record shared by the
three agents: the supplied documents (title, link, date read, which fields
they covered), the LFX records pulled (with date), the README URL, and the
interview answers with dates. The first agent to run creates it; the others
append. It is what lets a sibling agent say "I already have your documents"
instead of asking again.

Both files go in the project's common Drive (or Content Hub) folder next to
the documents. Until the Content Hub exists, the folder is the common location
the ED asked for.
