---
name: build-lf-messaging-doc
description: >
  Builds the "[Project Name] Messaging Document" for a Linux Foundation project: the LF
  communications framework (Vision, Mission, Positioning Platform, Tagline), category and
  positioning statement, audiences, alternatives, use cases, copy primitives, 3–5 messaging
  pillars with the message house, sourced proof points, objections, what we don't claim, CTA
  anchors and terminology. First of the three LFX Marketing OS foundation agents; needs no Brand
  Kit. Maps the foundation's own documents, reads the site, README, press release and LFX record,
  interviews only for the gaps, and delivers a 14–18 slide deck on the LF 2025 template plus
  Markdown and a .fields.yaml sidecar. Trigger on "build-lf-messaging-doc", "build the
  messaging doc for [project]", or any request for a messaging document, message foundation,
  message house or positioning document for an LF project.
metadata:
  version: "1.0.0"
  author: "Paul Hinz, Linux Foundation"
  replaces: "message-foundation-agent / develop-lf-project-messaging-foundation 0.5.0"
---

# Build LF Messaging Document

Produce the `[Project Name] Messaging Document`: the single source of truth a Project Leader, Executive Director or marketing lead hands to anyone — a writer, an agency, a deck builder, a new team member — and gets on-message output back. It locks the top-of-house statements (Vision, Mission, Positioning Platform, Tagline), the positioning (category, statement, audiences, alternatives, use cases), the exact copy any channel drops in (summaries, boilerplate, elevator pitch, llms.txt), the messaging pillars and the message house derived from them, and the evidence layer (sourced proof points, objections with honest admissions, what we don't claim, CTA anchors, terminology).

It is the **first** of the three LFX Marketing OS foundation agents and needs no Brand Kit. The Brand Guidelines agent (`build-lf-brand-guidelines`) runs after it and derives voice, tone and language rules from the statements locked here; the ICP agent defines the audiences this document only names. Voice attributes, tone rules, visual identity, personas, talking-point banks and CTA libraries are **not** authored here.

The output is short by design: a 14–18 slide deck on the LF 2025 Slides template (Craig Ross's template, bundled) that opens with a two-slide **Review Sheet** the ED approves, plus the Markdown source and a structured sidecar. `references/input-doc-mapping.md` defines the existing-document intake, the field registry and ownership, the micro-templates, the Review Sheet, the length budget and the sidecar; read it before Step 0a. `references/lf-message-framework.md` is the standard the statements are written to; read its §1–§2 before generating.

## Step 0a — ask for existing documents

Before the LFX pull, the research sweep or any interview question, ask the one question in `input-doc-mapping.md` §1: does the foundation already have a messaging, positioning, brand, audience or competitive document to use as input? Accept several; read them in full.

- **No:** continue with Step 0b and the normal interview or pre-fill mode.
- **Yes:** map every `md.*` field in the registry from the supplied documents with its provenance label, show the coverage table ("Your documents fill N of 23 Messaging Document fields; I can take K from the site, README and LFX; I need to ask about G") **before** asking anything, then run Step 1 only for the gaps. Quote the ED's wording verbatim, even when it breaks a standard rule; flag the conflict in the Review Sheet Notes column instead of rewriting. Fields that belong to the Brand Guidelines or the ICP (colors, fonts, personas) go into the Project Inputs record for those agents.
- Create `[project-slug].inputs.yaml` and record the documents, links and date read.

## Step 0b — collect and read the sources

Ask for the project name, then, one at a time, for the URLs the sources need ("none" is a valid answer): the project or foundation website; the GitHub repo or README; the launch press release (linuxfoundation.org/press or the project site); an existing brand page or guidelines, if any. Then, before any further question:

1. Fetch and read the site (hero, About, Governance, Members, Get Involved, Docs directories, Blog dates), the README (purpose, license, GOVERNANCE, adopters, badges), the press release (Legal-approved description, members by tier, quotes, origin, date) and the brand page.
2. Pull the LFX project record per `references/lfx-project-record.md` (`search_projects`, `get_project`, the charter) and derive the governance sentence and the trademark sentence. The interview and the README never supply governance wording; a requester's different wording is logged as a conflict for LF Legal, not adopted. If the LFX MCP is not connected, write `TBD — derive from LFX` and say so at delivery.
3. Run `references/research-sweep.md` items 1–5 and 7: the LF press archive, the originator's announcements, the competitor and adjacent scan (`"[project]" vs`, `[project] alternative`, each Premier member's product in the category), and the primary document for any date you will use. Record every URL with the date read.

Do not ask the requester to restate what the sources say.

## Pre-fill mode (no interviewee)

When the user says "pre-fill for [project]" or "run in batch for [project]", or an orchestrator passes `mode: prefill`, skip the interview and answer each Step 1 question yourself from the sources in this order: supplied documents, LFX record and charter, press release, website, README, LF press archive, then labeled inference. Record each answer in Appendix A with its provenance label; status `Draft — pre-filled`; the Review Sheet's `Inferred` and `Needs input` rows tell the ED what to confirm. Then continue with Steps 2–4.

## Step 1 — ask only the gaps, one question at a time (max 10)

A conversational interview, not a form. Ask each question as a short plain message and wait for the answer; "skip" or "TBD" is recorded and the interview moves on. Skip every question a source or supplied document already answered, and say why you are asking each one. Priority order — these are the questions a senior PMM needs answered to write a messaging document and nothing more:

1. **Vision and mission** — "Does the project have a written vision (long-term reason for being) and mission (purpose and scope)? Point me to them, give me your one-liners, or say TBD." The charter's mission clause, when it exists, is the strongest source.
2. **Category** — "What category does [Project] compete in, in the words a buyer or adopter would use, and what is it *not* (the adjacent thing people confuse it with)?"
3. **Audiences** — "Who are the three to five primary audiences this messaging must speak to, and what does each one care about most?" Names and one cue each; the ICP agent builds personas later.
4. **Alternatives** — "What does an adopter use instead today — the status quo, a proprietary product, another open source project — and are any alternatives built by member organizations?" Merge with the sweep; a member's product the requester did not name is still included, as a peer.
5. **Differentiation** — "What is the one thing that is true of [Project] and not of those alternatives?" Fill the positioning statement's "unlike" honestly or mark it TBD.
6. **Use cases** — "What are the top three jobs organizations adopt [Project] to do?"
7. **Proof points to confirm** — adopters, figures, milestones that may be cited by name, each with source and date. Naming a real organization is a factual and legal claim: confirm, never assume.
8. **Pillars** — "Which three to five pillars should the message house be built on?" Offer the ones the sources suggest; for an umbrella foundation, business lines are an acceptable framing.
9. **Objections** — "What are the two or three hardest questions skeptics, press, prospects or regulators ask, and what is the honest answer, including anything you would concede?"
10. **Tagline, CTAs and constraints** — whether a tagline is locked (site hero, press release) or should be recommended; the membership tier, working group or event the four CTA anchors should name; any Legal-approved phrase that must be used and any phrase that must not.

Close with: "That's everything I need — generating the Messaging Document now."

## Step 2 — draft, don't guess

Before writing, confirm for each section of `references/messaging-document-template.md` that you have a real source — a supplied document, an interview answer, the site, the README, LFX, the press archive, or a Stat Bank row — not an inference dressed as a fact. Mark anything unsupported `Needs input` or `[PROOF POINT TBD]`. Then:

- **Build the Stat Bank first.** Every figure you intend to use goes into Appendix B with claim, figure, unit, as-of date, source, caveat and type (`Live-LFX` / `Published` / `Third-party` / `Interview` / `Your doc`). Only rows with a source and a date are written. If the LFX MCP is connected, offer to pull live figures (`query_lfx_standard_metrics`: member organizations, memberships by tier, contributors, contributing organizations, meetings; read `read_lfx_standard_metrics_guidance` first; follow the `lfx-mcp-playbooks` skills if installed) and record the metric name and window. Otherwise `TBD — pull from LFX` with the metric named.
- **Positioning chain.** The §1 positioning platform and the §2 positioning statement are identical text, ≤40 words, and agree with any supplied positioning statement; if they diverge, stop and ask. "An", not "the", when a like-for-like alternative exists.
- **Pillars on the scaffold, then derive the message house.** Each pillar is a tag plus What's happening / Why it matters / How [Project] helps, ≤120 words, one proof-point id. The §7 message house is a view of the pillars (value proposition from Why it matters, key message from How [Project] helps, supporting points from the ids, one sound bite consistent with the key message); never author new claims there.
- **Alternatives are honest.** Member products are peers with the category-level difference, never rivals; "the only", "no other" and "first" are off the table wherever a like-for-like alternative exists.
- **Dates from primary documents.** An RFC, a standard, a release, a filing: fetch it and record the month and year.
- **Hold the budget.** Deck 14–18 slides, Markdown ≤8 pages; one idea per slide; tables for anything comparative; no starter sets or banks of copy; speaker notes carry the detail.

## Step 2b — lint the claims

Search the draft for "only", "first", "largest", "most", "fastest", "the major", "every", "no other", cost and performance comparisons, and every year or date. Each carries its Stat Bank id or a primary source in the same sentence, or is rewritten. Then search the message house, the sound bites and the objections for a fact about, or a motive attributed to, a named organization; each needs that organization's published words or a verified record. Where the claim is the requester's own wording, keep it and flag it in the Review Sheet Notes. Finally mark every Stat Bank row that carries list price, revenue or an LFX-export roster `Internal` and produce the agency-safe copy without them.

## Step 3 — generate the Markdown, the sidecar and the deck

1. Write `[Project Name] Messaging Document.md` following `references/messaging-document-template.md` section for section: front matter, Review Sheet, §1–§11, Appendix A, Appendix B. Run the template's self-check.
2. Write `[project-slug].messaging-document.fields.yaml` with every `md.*` field (value, source, status) and append to `[project-slug].inputs.yaml` (`input-doc-mapping.md` §7).
3. Write the `brand.json` seed (logo only, plus palette and fonts only when an existing brand page states them) per `references/deck-outline.md`.
4. Write `deck.json` from the Markdown — copy text, do not retype it — following the slide table in `references/deck-outline.md` (cover, two Review Sheet slides, what-this-gives-you, framework, positioning statement, definition and governance, copy primitives, alternatives, pillars, message house, proof points, objections, what we don't claim and terminology, CTAs and origin, decisions, closing). Build and check:
   ```bash
   pip install --break-system-packages python-pptx Pillow   # cairosvg for SVG logos
   python3 scripts/build_deck.py deck.json "[Project Name] Messaging Document.pptx" --brand brand.json --max-slides 20
   python3 scripts/render_check.py "[Project Name] Messaging Document.pptx"
   ```
   Look at every slide on the contact sheet: text inside its placeholder (cut words; a table's `font_size` is the only sanctioned size change, never below 10), project logo on light and dark slides, no "Click to add". Fix the JSON and rebuild, up to three passes. If the `lf-output-formatter` plugin is installed, its `build_deck.py` is the same renderer.

## Step 4 — gate, deliver, hand off

Run the `lfx-marketing-os-qa` skill on the Markdown if installed; apply its High fixes; attach its fix list. An open High finding means "blocked on <finding>", not "for review".

Open the delivery message with a digest of no more than ten lines: the status, how many fields came from the requester's own documents versus the sources versus the agent, the recommendations you made (tagline, inferred vision or mission, pillar names), what the sweep found beyond the brief, and the decisions the requester owes. Point them at the Review Sheet slides; they do not need to read the rest. Present `[Project Name] Messaging Document.pptx`, the `.md`, the two `.yaml` sidecars and `brand.json` with `logos/`; offer to upload the deck to the project's shared Drive folder (it opens as Google Slides). When the requester edits the Review Sheet, regenerate with their wording, set the status to `ED-reviewed — [name], [date]` and mark the sidecar fields `approved`.

Close by naming the next step: `build-lf-brand-guidelines` reads this sidecar and `brand.json` to write voice, tone and the visual identity; then the ICP & Target Markets agent; then every content, deck and web agent. Do not produce those here.

## Reference files

- `references/input-doc-mapping.md` — existing-document intake, field registry and ownership across the three agents, micro-templates, Review Sheet, length budget, sidecar. Identical copy in the Brand Guidelines plugin.
- `references/messaging-document-template.md` — the Markdown structure, per-section rules, self-check.
- `references/deck-outline.md` — slide-by-slide mapping onto the LF 2025 template, the `brand.json` seed, build and checks.
- `references/lf-message-framework.md` — the LF communications framework (Jim Zemlin's decks): element definitions, the message matrix, what downstream decks consume.
- `references/lfx-project-record.md` — deriving governance and trademark wording from LFX.
- `references/research-sweep.md` — the beyond-the-brief checklist.
- `references/cncf-messaging-framework-2026.md`, `references/example-notes.md` — a real LF-family messaging framework and structural lessons, for calibration.
- `references/slides-template-guide.md`, `references/brand-override.md` — the LF 2025 template's layouts and the `brand.json` schema.
- `scripts/build_deck.py`, `scripts/lfbrand.py`, `scripts/render_check.py` — renderer, brand loader, contact sheet.
- `examples/x402-deck.json`, `examples/x402-brand.json`, `examples/logos/` — the x402 Foundation example at the intended density, built from the September–October 2026 sources; `examples/README.md` says how to build it.
