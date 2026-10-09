# Existing-document intake, field registry, Review Sheet and length budget (v2)

Shared reference for the three LFX Marketing OS foundation agents, which run in
this order: **Messaging Document** (`build-lf-messaging-doc`) → **Brand
Guidelines** (`build-lf-brand-guidelines`) → **ICP & Target Markets**
(`develop-target-markets-and-icp`). The same file ships in all three plugins;
keep the copies identical.

It answers four questions every run faces: what to do when the foundation
already has its own messaging, brand or audience documents; which document
owns which field; what an Executive Director or subject-matter expert is asked
to read and approve; and how long the output may be.

Why this exists: in September 2026 an ED reviewed a 43-page Message Foundation
and said he would not read it, that "less is more with AI-generated content",
that a document downstream agents rely on "needs to be reviewed and owned by a
human, otherwise you end up with a cycle of AI slop", and that his foundation
already had its own messaging and persona documents. In October 2026 the
output moved from a Word document to a short slide deck on the LF 2025
template, because that is the form the ED and the marketing lead actually
read and present. The rules below turn that feedback into behavior.

---

## 1. Step 0a — ask for existing documents before anything else

The first thing every foundation agent says, before the LFX record pull, the
research sweep, or any interview question:

> Before I ask anything: do you already have a messaging, positioning, brand,
> audience/persona or competitive document for [project] that I should use as
> input? It can be a Google Doc, a Markdown file, a deck, a wiki page or a web
> page, and you can give me several. Paste the links or files, or say "no".

Rules:

- One question, plain language, no list of what the document "should" contain.
  The ED's document does not have to look like ours.
- Accept several files at once. A foundation's own material is often split
  across a messaging framework, a persona file, a brand page and a
  competitive note.
- If the answer is "no", run the agent's normal interview (or pre-fill mode)
  unchanged.
- If the answer is a document, read every file in full **before** asking
  anything else, then follow §2.
- If a Google Drive or equivalent connector is available, read the file
  directly from the link rather than asking the user to paste its contents.
- Record the answer (links, file names, date read) in the **Project Inputs
  record** (§7) so the sibling agents do not ask for the same files again.
  When a sibling agent runs later and the inputs record already names the
  files, say "I have the documents you gave the Messaging Document agent on
  [date]; should I use those, or is there anything new?" instead of asking
  from scratch.

## 2. Map first, then ask only the gaps

When the user supplied documents:

1. **Map every standard field** in §3 that this agent owns. For each field
   record one provenance label:
   - `From your doc` — copied from the supplied document; cite section or page.
   - `From README / LFX` — taken from the repository, the LFX project record
     or LFX standard metrics.
   - `From site` — read from the project website (CSS, brand page, hero).
   - `From Messaging Document` — (Brand Guidelines and ICP only) copied from
     the upstream document's sidecar.
   - `Inferred` — the agent's reading of the supplied material; must be labeled.
   - `Needs input` — nothing in the documents or sources covers it.
   - `Partial` — the document covers part of the field. Fill what is there;
     never invent the rest.
2. **Show the coverage table before asking anything.** One short message:

   > Your documents fill N of M standard fields for the [Messaging Document].
   > I can take K more from the README, the site and LFX. I need to ask you
   > about the remaining G: [field names]. Shall I go ahead?

   This is the moment the ED learns the agent read their work. Do not skip it.
3. **Ask only the gaps**, one question at a time, in the agent's normal priority
   order, capped at the agent's normal maximum (ten for the Messaging
   Document, eight for Brand Guidelines, five for ICP). If the gaps exceed the
   cap, ask the ones the Review Sheet needs and mark the rest `Needs input`.
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
   may contain colors; a brand page may contain a positioning line. Each agent
   maps only the fields it owns (§3) and leaves the rest in the Project Inputs
   record for the sibling agent to pick up.

## 3. Standard field registry

The fields an LF foundation document set carries, grouped by the document that
owns each one. "Owns" means: this is the only document where the field is
authored; the other two reference it by id. The registry is also the schema of
the structured sidecar (§7) and of the coverage table (§2).

### Messaging Document (owner: `build-lf-messaging-doc`, runs first)

| Field id | Field | Review Sheet? |
|---|---|---|
| `md.vision` | Vision, one sentence | Yes |
| `md.mission` | Mission, one or two sentences | Yes |
| `md.category` | Category the project claims, in the buyer's words, plus what it is not | Yes |
| `md.positioning` | Positioning statement = positioning platform, one sentence, ≤40 words | Yes |
| `md.tagline` | The locked tagline, or the recommended line with ≤3 alternates marked "awaiting lock" | Yes |
| `md.audiences` | Primary audiences, names only, one "cares about" cue each (the ICP document defines them) | Yes |
| `md.alternatives` | What the project is positioned against: status quo, proprietary, other open source, member products as peers; how we differentiate without naming names | Yes |
| `md.use_cases` | Top three use cases / jobs to be done, one line each | No |
| `md.summary_25` | 25-word summary (hard cap) | Yes |
| `md.summary_50` | 50-word summary (hard cap) | No |
| `md.boilerplate` | Press boilerplate, 100–150 words, governance clause verbatim | Yes |
| `md.elevator_pitch` | Elevator pitch, ≤90 words | No |
| `md.llms_txt` | `llms.txt` block | No |
| `md.pillars` | 3–5 messaging pillars on the three-part scaffold (§4), ≤120 words each | Yes |
| `md.message_matrix` | Value proposition / key message / supporting points / sound bite per pillar, derived from `md.pillars` | No |
| `md.proof_points` | Sourced proof points only (Stat Bank rows with source and date) | Yes (count and top 3) |
| `md.objections` | 3–5 objections on the four-line template | Yes (one line each) |
| `md.what_we_dont_claim` | Claims the project never makes, 3–6 lines | Yes |
| `md.cta_anchors` | One CTA per tier (Learn / Engage / Contribute / Commit), exact wording and destination | Yes |
| `md.terminology` | Naming conventions and constraints: project name usage and casing, sub-brands, terms to use and avoid, must-say / must-not-say | No |
| `md.origin_story` | Origin story, ≤120 words, dated from primary sources | No |
| `md.governance_sentence` | Governance sentence derived from the LFX project record | No |
| `md.trademark_sentence` | Trademark sentence derived from the LFX project record and charter | No |

### Brand Guidelines (owner: `build-lf-brand-guidelines`, runs second)

The sections follow the published LF project brand pages (`lf-brand-page-standard.md` in the Brand Guidelines plugin).

| Field id | Field | Review Sheet? |
|---|---|---|
| `bg.purpose` | One paragraph on why the project exists and what the brand stands for — copied from the Messaging Document (category, positioning, origin), never new | No |
| `bg.brand_attributes` | 3–5 named brand attributes, each with a one-line gloss of what it rules in and out for design and copy; derived from the pillars and the requester | Yes |
| `bg.logo` | The mark(s): files and download package, what the mark references, project vs. foundation marks, variants (lockup, horizontal, acronym/name-only, icon-only, monochrome, reversed), logo color options — or a creative brief when none exists | Yes (summary line) |
| `bg.logo_rules` | Scaling (minimum height; drop to the symbol below it), clearspace unit defined from the mark, backgrounds, partnership lockup rule, watchouts | Yes (minimum height + clearspace unit) |
| `bg.symbol` | The standalone symbol: where it is used, colorways, symbol-in-shape for avatars | No |
| `bg.palette` | Primary and secondary palette, up to five roles in `brand.json` (primary, secondary, accent, neutral dark, neutral light), with HEX, RGB, CMYK and Pantone where the project has them, computed WCAG results and usage rules | Yes (hexes only) |
| `bg.typography` | Heading and body families (+ monospace if needed), the weights that ship, the type scale, fallbacks, where to get them; the logo is never set in a font | Yes (families only) |
| `bg.iconography` | Icon system, imagery and graphic devices (backgrounds, patterns) with a Do / Don't table | No |
| `bg.voice_attributes` | 3–5 voice attributes as We are / We are not (Attribute / What it means / What it is not), plus one sounds-like / doesn't-sound-like pair | Yes |
| `bg.tone_rules` | Reading level, formality, competitive tone, superlatives, contractions, register shifts | No |
| `bg.language_prefer_avoid` | Prefer / Avoid language table (terms, casing, phrases), 5–10 rows | Yes (top 3 pairs) |
| `bg.member_badges` | Membership-tier badges (exist / needed; variants) — only for projects with a membership program | No |
| `bg.brand_use_policy` | The LF standard third-party brand-use text with the project's names, owning entity, attribution line and contact filled in; downloads | No |
| `bg.trademark_cobranding` | Trademark hygiene (from `md.trademark_sentence`), LF lockup rules, member-logo rule, Creative Services sign-off | No |
| `bg.applications` | Where the brand shows up (slides, documents, web, social avatars, events, email) and which logo / palette / type each uses | No |
| `bg.identity_basis` | Documented / Documented from site / Proposed / Needs input — per component | Yes |
| `bg.brand_json` | The finished `brand.json` every downstream agent loads | No |

### ICP & Target Markets (owner: `develop-target-markets-and-icp`, runs third)

| Field id | Field | Review Sheet? |
|---|---|---|
| `icp.business_outcome` | The outcome the ICP is optimized toward and its weighting | Yes |
| `icp.org_icp` | 1–2 organization-level ICPs, five dimensions each | Yes (description row of each) |
| `icp.firmographics` | Industry, size band, geography, technographics, existing relationship | Yes |
| `icp.disqualifiers` | Who is not a fit, per ICP | Yes |
| `icp.personas` | 4–9 personas on the fixed eleven-field template | Yes (name + "lead with" line each) |
| `icp.persona_selection_cues` | Keyword → persona lookup | No |
| `icp.persona_map` | Persona / primary offer / primary pillar / geography | No |
| `icp.fit_warmth_rules` | Fit × Warmth thresholds and hand-raiser signals | Yes |
| `icp.competitive_landscape` | Who we actually lose to, by segment (extends `md.alternatives`) | No |
| `icp.som_proposal` | SOM target from LFX run-rate | Yes |
| `icp.regional_emphasis` | Regional differences | No |

Fields no document owns (generated on demand by downstream agents from the
fields above): talking-point banks, tiered CTA libraries beyond the four
anchors, per-persona ROI tables, channel quick-reference tables, hero-number
sets, brand strengths lists, key-message variants per channel.

## 4. Fixed micro-templates

Repeated structures make fields comparable across foundations and let a
downstream prompt slot into any of them without re-reading the document. Use
these exactly; do not add or reorder fields.

**Messaging pillar (`md.pillars`)** — a tag plus three labeled parts, each
20–40 words, total ≤120 words:

- **Tag:** `short-stable-name`
- **What's happening:** the industry or user condition, with a cited figure if
  one exists.
- **Why it matters:** the consequence for the audience, in their words.
- **How [Project] helps:** the mechanism, not the slogan. One proof-point id or
  `[PROOF POINT TBD]`.

**Message matrix (`md.message_matrix`)** — one column per pillar, derived from
the pillar: **Value proposition** (from Why it matters) · **Key message** (one
declarative sentence from How [Project] helps) · **Supporting points** (two or
three, each a proof-point id or a governance fact) · **Sound bite** (one
quotable line a spokesperson could say, consistent with the key message, no
superlative without its proof point in the same sentence).

**Objection (`md.objections`)** — four labeled lines: **The challenge** (in
the skeptic's words) · **Our thesis** · **Evidence** (proof-point ids) · **What
we admit**.

**Voice attribute (`bg.voice_attributes`)** — one row per attribute in a
single three-column table: Attribute | What it means | What it is not; one
"Sounds like" / "Doesn't sound like" pair for the whole voice under the table.
The "sounds like" line is a sound bite or key message from the Messaging
Document, not a new sentence.

**Persona (`icp.personas`)** — eleven bold-label fields in the ICP plugin's
template; unchanged.

## 5. The Review Sheet

Every foundation deck opens, after the cover, with the **Review Sheet**: the
only slides an ED or SME is asked to read. One table, split across at most two
slides:

| # | Field | Current wording (one line) | Source | Approve / Edit | Notes |
|---|---|---|---|---|---|

- Rows are the fields marked "Review Sheet? Yes" in §3, in that order. Long
  fields (pillars, objections) appear as one row per item with a one-line
  summary; the full text is on the body slides.
- **Source** is the provenance label from §2. A reviewer's effort should go to
  `Inferred` and `Needs input` rows; their own wording needs no re-review.
- **Approve / Edit** is left blank for the reviewer (they type in the cell in
  Google Slides; the agent reads the edits back on the next run).
- **Notes** carries the agent's flags: a standard-rule conflict with the
  supplied wording, a superlative without proof, a figure awaiting an LFX pull.
- Above the table, one line: status (`Draft — pre-filled` / `Draft — from your
  documents` / `ED-reviewed — [name], [date]`), what the agent did with the
  supplied documents ("14 of 20 fields from your documents; 6 asked"), and the
  one decision the requester still owes.
- The same table is the first section of the Markdown file.

## 6. Length budget

| Document | Deck | Markdown | Per-slide rule |
|---|---|---|---|
| Messaging Document | 14–18 slides, hard cap 20 | ≤ 8 pages | one idea; ≤ 6 bullets of ≤ 12 words, or one table |
| Brand Guidelines | 14–18 slides, hard cap 20 | ≤ 8 pages | same |
| ICP & Target Markets | (document) 8–10 pages, hard cap 12 | — | 350 words per persona, 300 otherwise |

Rules of thumb:

- One-sentence bullets. A bullet that needs a second sentence is two bullets.
- Tables for anything comparative or repeated (framework, matrix, proof
  points, alternatives, objections, prefer/avoid, palette, type).
- No slide restates another. If a sibling document owns the field, write one
  line and the reference (`see Brand Guidelines §6`).
- No "starter sets", "banks" or "libraries" of copy the ED did not write.
- Evidence is honest by default: a proof-point table holds only sourced rows;
  a pillar with no evidence says `[PROOF POINT TBD]` in one line.
- Negative space is a field: "What we don't claim", "What we admit", "Don't"
  columns each get their own place.
- Speaker notes carry the detail that would otherwise bloat a slide (the
  llms.txt block, the full objection text, the source URLs).

## 7. Structured sidecar and the Project Inputs record

Alongside the `.pptx` and `.md`, write two small files to the same folder:

**`[project-slug].[doc].fields.yaml`** — every field id from §3 that this
document owns, with `value`, `source` (the §2 label plus citation) and
`status` (`approved` / `draft` / `tbd`). Multi-item fields (pillars,
objections, proof points, palette roles) are lists of objects keyed by the
micro-template fields. Downstream agents read this file, not the deck.

**`[project-slug].inputs.yaml`** — the Project Inputs record shared by the
three agents: the supplied documents (title, link, date read, which fields
they covered), the URLs read (site, README, press release, brand page), the
LFX records pulled (with date), and the interview answers with dates. The
first agent to run creates it; the others append.

The Brand Guidelines agent additionally writes **`brand.json`** (schema in
`brand-override.md`), which the LF output formatter and every later agent pass
to `build_deck.py --brand` / `build_doc.py --brand`.

All files go in the project's common Drive (or Content Hub) folder next to the
decks. Until the Content Hub exists, that folder is the common location the ED
asked for.
