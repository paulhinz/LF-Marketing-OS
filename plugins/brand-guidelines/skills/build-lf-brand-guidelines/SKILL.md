---
name: build-lf-brand-guidelines
description: >
  Builds the "[Project Name] Brand Guidelines" for a Linux Foundation project in the form of the
  published LF brand pages: purpose and brand attributes, logo rules (scaling, clearspace,
  partnership lockups, watchouts) drawn on the project's own mark, the symbol, primary and
  secondary palette with computed WCAG contrast, typography, iconography, voice and tone derived
  from the Messaging Document, member badges, brand-use and legal text, applications, and the
  finished brand.json downstream agents use. Second of the
  three LFX Marketing OS foundation agents; runs after build-lf-messaging-doc. Documents the
  existing identity from the brand page, site CSS and logo files rather than inventing one,
  interviews only for the gaps, and delivers a 14–18 slide deck on the LF 2025 template in the
  project's own brand plus Markdown and a .fields.yaml sidecar. Trigger on
  "build-lf-brand-guidelines", "build the brand guidelines for [project]", "brand kit for
  [project]", or any request to define an LF project's visual identity, voice or tone.
metadata:
  version: "1.1.0"
  author: "Paul Hinz, Linux Foundation"
  replaces: "brand-guidelines-agent / develop-lf-project-brand-kit 0.4.0 (the Brand Kit)"
---

# Build LF Brand Guidelines

Produce the `[Project Name] Brand Guidelines`: how the project looks and how it sounds, written down the way a brand manager at an enterprise open source project publishes it. The sections follow the LF project brand pages already in print (`references/lf-brand-page-standard.md`: x402, Open Secure AI Alliance, ASWF): purpose and brand attributes, the logo and its rules (scaling, clearspace, partnership lockups, watchouts), the symbol, primary and secondary palette, typography, iconography and imagery, voice and tone, member badges, brand use and legal, applications — and nothing else. The words (positioning, tagline, pillars, claims, boilerplate) are locked in the `[Project Name] Messaging Document` produced by `build-lf-messaging-doc`; this agent copies them where needed and derives voice and tone from them. It also writes the finished `brand.json` that the LF output formatter and every later agent (ICP, pitch deck, website, briefings, quarterly plan) load to render in the project's brand.

Two rules govern the run. **Document and extend what exists**: most projects already have a wordmark, a site and a de facto palette; read them from the files and the CSS, never from a screenshot or memory, and extend only where they are silent. **Never generate a logo**: with no mark, write the constrained creative brief and hand it to LF Creative Services. Every component states its identity basis (`Documented` / `Documented from site` / `Proposed` / `Needs input`).

The output is short and image-led by design: a 16–20 slide deck on the LF 2025 Slides template (bundled), built with the project's own `brand.json`, opening with a Review Sheet the ED approves, in which every logo rule is a graphic drawn on the project's own mark by `scripts/brand_graphics.py`; plus the Markdown source and a structured sidecar. `references/input-doc-mapping.md` defines the existing-document intake, the field registry, the Review Sheet, the length budget and the sidecar; read it before Step 0a.

## Step 0a — read the Messaging Document, then ask for existing documents

Locate `[project-slug].messaging-document.fields.yaml`, the `[Project Name] Messaging Document.md`, the `brand.json` seed and `logos/` (working folder, the project's shared Drive, or wherever the user points). Copy the positioning statement, tagline and status, pillar tags, audiences, sound bites, terminology and must/must-not-say lines, and the governance and trademark sentences; note the sources already read in `[project-slug].inputs.yaml` and the open decisions. If no Messaging Document exists, say so and offer to run `build-lf-messaging-doc` first; only if the user insists, proceed with §1 and §6 marked `Needs input — Messaging Document pending` and say so at delivery.

Then ask the one Step 0a question (`input-doc-mapping.md` §1), naming the documents already on record: "I have the documents you gave the Messaging Document agent on [date]. Is there a brand guidelines page or file, a logo folder or a style guide I should use as well?" Read everything supplied in full; map every `bg.*` field with its provenance label; show the coverage table before asking anything else; append to the inputs record.

## Step 0b — research the identity

Follow `references/visual-identity-method.md`: the brand page or guidelines (look for the LF Creative Services brand page at `/brand` or `/brand-guidelines` and its logo zip downloads); the seed `brand.json`; the site's CSS (custom properties, body, headings, links, buttons, neutrals, `@font-face` and Google Fonts links, recorded by selector with the date); logo originals (site header, GitHub organization avatar, LFX record, media kit), including a separate foundation mark when one exists and the standalone symbol, with a 16 px legibility test; existing diagrams, icons, background devices and member badges. Run `references/research-sweep.md` items 5–6 (competitor and adjacent scan; what members built) so look-alike constraints are grounded. Decide the identity basis per component. Pull the LFX record (`references/lfx-project-record.md`) only if the Messaging Document left governance or trademark wording as TBD.

## Pre-fill mode (no interviewee)

When the user says "pre-fill for [project]" or "run in batch for [project]", or an orchestrator passes `mode: prefill`, skip the interview: answer the Step 1 questions from the Messaging Document, the supplied documents, the site's CSS and logo files, the GitHub organization and labeled inference; record each answer in Appendix A with its label; status `Draft — pre-filled`; the Review Sheet's `Inferred` and `Needs input` rows tell the ED what to confirm. Then continue with Steps 2–4.

## Step 1 — ask only the gaps, one question at a time (max 8)

A conversational interview, not a form. Ask each question as a short plain message, wait for the answer, and say why you are asking ("The site defines colors and fonts in its CSS; I need the logo files and your voice adjectives"). Skip every question the sources already answered.

1. **Logo files and marks** — "Where are the canonical logo files (SVG or PNG) and the download package? Is there a reversed (white) version, a standalone symbol, and a separate foundation mark? Does the mark reference anything (a syntax, a shape) worth recording?"
2. **Logo rules in use** — "Do you already have a minimum size, a clearspace unit, or a partnership-lockup rule? If not, I will propose the LF conventions (32 px, X = a quarter of the mark's height, divider 1.5 × the logo height) and label them Proposed."
3. **Colors and constraints** — "Are the colors on the site the brand palette, or is there a defined primary and secondary palette with Pantone or CMYK values? Any colors or marks to avoid — a member network's or a competitor's look, an LF-family look to stay consistent with?"
4. **Fonts** — "Which typefaces and weights are in use or licensed, is there a type scale, or should I keep the site's families?"
5. **Imagery and icons** — "Is there an icon system (Material Symbols, a project set), a background or pattern device, or photography rules to document, or should I propose one from the positioning?"
6. **Brand attributes and voice** — "The pillars suggest [three to five attributes drawn from the Messaging Document]. Keep, change or add? And the voice: the same words, or different ones?" One question; the answer fills both §2 and §8.
7. **Language rules and reference brands** — "Any terms, casing or phrases the foundation has decided for or against beyond the Messaging Document's terminology, and one to three brands to stay visually clear of?"
8. **Badges, applications and contact** — "Does the project have member badges per tier? Where does the brand need to show up first — slide template, document template, site, social, event signage, email? And which address answers brand-use questions?"

Translate brand-strength statements ("enterprise-grade") into voice attributes when drafting; do not push back mid-interview. Close with: "That's everything I need — building the Brand Guidelines now."

## Step 2 — draft, don't guess

Write `[Project Name] Brand Guidelines.md` following `references/brand-guidelines-template.md` section for section: front matter, Review Sheet, §1 Purpose and brand foundation (composed only from the Messaging Document), §2 Brand attributes, §3 Logo (mark, variations, color options, scaling, clearspace, partnership lockups, watchouts — or the creative brief), §4 Symbol, §5 Color (primary, secondary, contrast), §6 Typography, §7 Iconography and imagery, §8 Voice and tone, §9 Member badges, §10 Brand use and legal, §11 Applications, §12 Open decisions, Appendix A, Appendix B (`brand.json`).

Rules that decide quality:

- **No new verbal content.** §1 is composed only from Messaging Document fields; brand attributes name the pillar or statement they derive from; the "Sounds like" line is one of its sound bites; the Prefer / Avoid table carries its must-say and must-not-say lines; §10 is the LF standard brand-use text with the names, owning entity, attribution line and contact filled in, not rewritten. A conflict found during research (a different hero tagline, a different casing on the brand page) keeps the Messaging Document's wording here, is logged in Appendix A, and is named at delivery for upstream correction.
- **Palette**: primary and secondary as the project defines them, five roles in `brand.json`; HEX and RGB always, CMYK and Pantone only when the project publishes them; every ratio from `scripts/palette_check.py`, never asserted; proportions; pairings never to use; intake constraints honored; an existing palette unchanged.
- **Typography**: ≤2 families (3 with monospace); the site's own families first; a type scale and the casing rule.
- **Logo**: real files, the download package and locations, or an explicit creative brief; never a generated mark; variants and the symbol marked "Needed" rather than constructed; project and foundation marks never conflated; scaling, clearspace and lockup rules taken from the project's guidelines or labeled `Proposed` with the LF conventions.
- **Voice and tone**: 3–5 attributes derived in this run from the pillars and the requester's adjectives; tone rules and Prefer / Avoid specific to this project; nothing generic.
- **Identity basis** on every component; nothing labeled `Documented` without a URL or file behind it.
- **Budget**: deck 16–20 slides (cap 22), Markdown ≤8 pages; one rule per slide; graphics for every logo rule; tables for anything comparative; detail in speaker notes.

Write the finished `brand.json` (schema in `references/brand-override.md`; no null required field, or the field is an Open decision) and run the template's self-check.

## Step 3 — build the deck in the project's brand

Follow `references/deck-outline.md`:

```bash
pip install --break-system-packages python-pptx Pillow          # cairosvg for SVG logos
python3 scripts/brand_graphics.py backgrounds brand.json gfx-backgrounds.png
python3 scripts/brand_graphics.py scaling    brand.json gfx-scaling.png --min-px 32
python3 scripts/brand_graphics.py clearspace brand.json gfx-clearspace.png --unit 0.25
python3 scripts/brand_graphics.py lockup     brand.json gfx-lockup.png --divider 1.5
python3 scripts/brand_graphics.py watchouts  brand.json gfx-watchouts.png
python3 scripts/brand_graphics.py symbol     brand.json gfx-symbol.png --symbol logos/<symbol>.png   # when a symbol exists
python3 scripts/make_palette_png.py brand.json palette.png --names "…"   # swatch strip
python3 scripts/palette_check.py brand.json --markdown           # rows for the contrast slide
python3 scripts/build_deck.py deck.json "[Project Name] Brand Guidelines.pptx" --brand brand.json --max-slides 22
python3 scripts/render_check.py "[Project Name] Brand Guidelines.pptx"
```

The graphics are drawn from the project's own logo files with the project's own rules (pass `--min-px`, `--unit`, `--divider` from its guidelines; the defaults are the LF pages' conventions and the slide says `Proposed` when they are used). Write `deck.json` from the Markdown — copy, do not retype. Read the contact sheet as a test of the guidelines: every graphic inside the body area with its caption line visible, project logo on light and dark slides, bar, subtitles and table headers in the palette (a fallback to the dark neutral means the primary fails AA on white; record it in §3), text inside placeholders, no "Click to add". Fix and rebuild, up to three passes. If the `lf-output-formatter` plugin is installed, its `build_deck.py` is the same renderer.

Write `[project-slug].brand-guidelines.fields.yaml` with every `bg.*` field and append to `[project-slug].inputs.yaml`.

## Step 4 — gate, deliver, hand off

Run the `lfx-marketing-os-qa` skill on the Markdown if installed; apply its High fixes; attach its fix list. An open High finding means "blocked on <finding>", not "for review".

Open the delivery message with a digest of no more than ten lines: the status, the identity basis per component, how many fields came from the requester's documents versus the site versus the agent, the voice attributes, any conflict with the Messaging Document, and the decisions the requester owes. Point them at the Review Sheet slides. Present `[Project Name] Brand Guidelines.pptx`, the `.md`, the sidecars, `brand.json` and `logos/`; offer to upload the deck to the project's shared Drive folder and to keep `brand.json` next to the Messaging Document so every later agent reuses it. Final visual sign-off for anything external belongs to LF Creative Services (`brand@linuxfoundation.org`). When the requester edits the Review Sheet, regenerate with their wording, set the status to `ED-reviewed — [name], [date]` and mark the sidecar fields `approved`.

Close by naming the next step: the ICP & Target Markets agent, and that every downstream agent now builds with `--brand brand.json`.

## Reference files

- `references/input-doc-mapping.md` — existing-document intake, field registry and ownership, micro-templates, Review Sheet, length budget, sidecar. Identical copy in the Messaging Document plugin.
- `references/lf-brand-page-standard.md` — the sections the published LF project brand pages carry (x402, OSAIA, ASWF) and what each holds; the standard this skill writes to.
- `references/brand-guidelines-template.md` — the Markdown structure, per-section rules, self-check.
- `references/visual-identity-method.md` — finding and documenting the existing identity; identity basis; deriving voice and tone in this run; `brand.json`.
- `references/deck-outline.md` — slide-by-slide mapping onto the LF 2025 template, scripts, checks.
- `references/lfx-project-record.md`, `references/research-sweep.md` — LFX wording and the sweep (items 5–6 here).
- `references/slides-template-guide.md`, `references/brand-override.md` — the template's layouts and the `brand.json` schema.
- `scripts/brand_graphics.py` — backgrounds, scaling, clearspace, partnership lockup, watchouts and symbol graphics drawn from the project's logo files.
- `scripts/build_deck.py`, `scripts/lfbrand.py`, `scripts/render_check.py`, `scripts/palette_check.py`, `scripts/make_palette_png.py`.
- `examples/x402-deck.json`, `examples/x402-brand.json`, `examples/logos/` — the x402 Foundation example, documented from x402.org (September 2026 read); `examples/README.md` says how to build it.
