# Brand Guidelines Agent

**Command:** `build-lf-brand-guidelines` · **Version 1.1.0** · replaces `brand-guidelines-agent` 0.4.0 (`develop-lf-project-brand-kit`, the "Brand Kit")

The second of the three LFX Marketing OS foundation agents. It reads the `[Project Name] Messaging Document` produced by `build-lf-messaging-doc` and writes down how the project looks and sounds, the way a brand manager at an enterprise open source company would, as a concise slide deck on the LF 2025 Slides template built with the project's own brand.

## Order of the foundation agents

1. **Messaging Document** (`build-lf-messaging-doc`) — the words: positioning, pillars, claims, copy.
2. **Brand Guidelines** (this plugin) — the look and the voice; writes `brand.json`.
3. **ICP & Target Markets** (`develop-target-markets-and-icp`).

## What it asks

First, the Messaging Document's sidecar and `brand.json` seed are read, and the agent asks whether a brand page, logo folder or style guide exists (it maps and quotes them). Then, one at a time and only for the gaps, up to eight questions: logo files and variants · colors in use and constraints · fonts · imagery and icon style · voice adjectives (offered against the pillars) · language rules · reference brands to stay clear of · where the brand is applied first. Voice and tone are derived in this run, not pre-generated. Pre-fill mode answers from the site and the Messaging Document for ED review.

## What it produces

An image-led deck in the form of the published LF project brand pages (x402, Open Secure AI Alliance, ASWF — see `references/lf-brand-page-standard.md`), 16–20 slides:

| Slides | Content |
|---|---|
| 1 | Cover in the project's brand |
| 2–3 | **Review Sheet** — identity basis, brand attributes, logo, logo rules, palette, typography, voice, prefer/avoid |
| 4–5 | Purpose and foundation (from the Messaging Document); brand attributes with their glosses |
| 6–13 | Logo: the mark and files · one mark on four surfaces · minimum size and the symbol · clear space in X · partnership lockups · watchouts · the symbol on its own · variations — every rule drawn on the project's own mark by `scripts/brand_graphics.py` |
| 14–15 | Primary and secondary palette; values (HEX, RGB, CMYK/Pantone where published) and computed contrast |
| 16 | Typography: families, weights, scale, sources |
| 17 | Iconography and imagery: Do / Don't |
| 18–19 | We are / we are not; Prefer / Avoid and tone rules |
| 20 | Member badges (when a membership program exists) |
| 21 | Using the brand: third-party use and attribution (LF standard text) |
| 22 | Where the brand shows up |
| 23 | Decisions owed, with owners; closing |

Plus `[Project] Brand Guidelines.md`, `[project-slug].brand-guidelines.fields.yaml`, the appended `[project-slug].inputs.yaml`, the generated graphics, and the finished `brand.json` with `logos/` — the file every later agent passes to `build_deck.py --brand`.

## Grounding

Document and extend what exists (brand page, site CSS, logo files); propose only where nothing exists and label it `Proposed`; never generate a logo; every component states its identity basis; no new verbal content (the Messaging Document owns the words); contrast ratios are computed, never asserted.

## Setup

`python-pptx`, `Pillow` (and `cairosvg` for SVG logos); LibreOffice for the render check. The example in `skills/build-lf-brand-guidelines/examples/` builds as shipped.
