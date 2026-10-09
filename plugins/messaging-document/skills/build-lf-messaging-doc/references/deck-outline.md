# Deck outline — the Messaging Document on the LF 2025 Slides template

The deck is the deliverable the ED and the marketing lead read. It is rendered from the finished Markdown with `scripts/build_deck.py` (JSON spec → `.pptx` on `assets/LF-2025-Template.pptx`; layout keys in `slides-template-guide.md`), carries the project's logo through `brand.json` (the seed this agent writes; see below), and matches the slide-level density of the x402 deck Kieran Walsh reformatted in October 2026 (`examples/x402-deck.json` is that deck's structure, rebuilt): one idea per slide, a declarative title, a table or ≤6 short bullets, a one-line source or rule at the bottom, the detail in speaker notes.

Target 14–18 slides; hard cap 20. Text does not auto-shrink: cut words. Tables accept `font_size` (keep ≥10), `col_widths` and spanning rows (`{"label","text","span":true}`). The cover and `statement_image` slides are dark: use the white logo variant there.

| # | Layout | Title (declarative) | Content |
|---|---|---|---|
| 1 | `title_image` | `[Project] Messaging Document` | subtitle `Messaging source of truth · <status> · <Mon YYYY>`; `image`: white square logo. Notes: sources read, copy label (Internal / Agency-safe). |
| 2 | `table` | `Review sheet: what needs your approval` | header `["#", "Field", "Current wording", "Source", "Approve / Edit", "Notes"]`, `col_widths [0.04, 0.16, 0.42, 0.12, 0.1, 0.16]`, `font_size` 10; rows 1–9 (Vision … Boilerplate). `source`: the status line and counts. |
| 3 | `table` | `Review sheet (continued)` | rows for pillars, proof points, objections, what we don't claim, CTA anchors. |
| 4 | `statement` | `What this document gives you` | body: **Say it** — the framework, the positioning, the pillars and their proof · **Prove it** — sourced proof points and honest objections · **Reuse it** — summaries, boilerplate, CTAs, terminology · **Next** — Brand Guidelines derive voice and tone from this; the ICP document defines the audiences named here. |
| 5 | `table` | `The [Project] communications framework` | header `["Element", "[Project]", "Shelf-life", "Audience"]`, rows Vision / Mission / Positioning platform / Tagline (§1). `source`: status of each ("Vision and mission await ED confirmation; tagline recommended, awaiting lock"). |
| 6 | `statement` | the positioning statement itself (≤40 words) | body: **Category —** … · **Not —** … · the three or four audience names with their "cares about" cue · the "an, not the" and "no superlative" rules that shaped the sentence. |
| 7 | `two_col` | `What [Project] is, and who governs it` | left: what it is (one or two bullets), the two offers; right: **Two entities** — technical project / foundation as LFX names them, the governance sentence (bold), the trademark sentence. `source`: "Copy the governance sentence; do not paraphrase it." |
| 8 | `content_dense` | `Copy primitives: use these verbatim` | `**25 words —** …` · `**50 words —** …` · `**Boilerplate —** …` · `**Elevator pitch —** …`. Notes: the llms.txt block. Split boilerplate + pitch to a second slide if the four exceed the body area. |
| 9 | `table` | `Alternatives and how [Project] differs` | header `["Alternative", "What it is", "Where [Project] differs"]`, 3–6 rows, member products marked "(member, peer)". `source`: "Members are never competitors in copy. Differentiate by property, not by name." |
| 10 | `table` | `[N] messaging pillars` | header `["", pillar tags…]`, rows What's happening / Why it matters / How [Project] helps; `font_size` 10–11. Split 3 + 2 across two slides when five pillars or long cells. `source`: proof-point ids per pillar. |
| 11 | `table` | `The message house on one page` | header `["", pillar tags…]`; spanning rows Mission statement, Positioning statement; rows Value proposition / Key message / Supporting points / Sound bite; `font_size` 10. Split rows 2 + 2 across two slides when cells run long. |
| 12 | `table` | `Proof points, each with a source` | header `["ID", "Claim", "Pillar", "Source", "As of"]`, ≤8 rows, `font_size` 10–11. `source`: the bench sentence ("Four sourced proof points; thin on end-user outcomes. Refresh every figure before use."). |
| 13 | `table` | `Objections, and what we admit` | header `["The challenge", "Our thesis", "Evidence", "What we admit"]`, 3–5 rows, `font_size` 10. Notes: full objection text. |
| 14 | `two_col` | `What we don't claim, and how we say the name` | left `**We don't claim**` + lines; right `**Terminology**` + casing, counting members, must-say / must-not-say. |
| 15 | `two_col` | `Four calls to action, one origin` | left `**CTA anchors**` Learn / Engage / Contribute / Commit with destinations; right `**Origin**` three bullets (arrived → governance changed → emerged, dated). |
| 16 | `two_col` | `Before this is approved: your decisions` | left: decisions; right: owners; last right bullet `**Next:** build-lf-brand-guidelines reads this deck's sidecar and brand.json`. |
| 17 | `closing` | — | project logo; LF lockup in notes when co-branding is wanted. |

Appendix slides (optional, after 16, before closing): the full Stat Bank on `table` slides, `font_size` 9–10, split every eight rows.

## brand.json seed

This agent runs before the Brand Guidelines, so there is no finished brand file. Write a minimal `brand.json` next to the deck (schema in `brand-override.md`):

```json
{
  "project_name": "[Project Name]",
  "logo": {"light": "logos/[project]-logo-color.png", "dark": "logos/[project]-logo-white.png"},
  "palette": null, "fonts": null,
  "_source": {"logo": "URL and date", "palette": "none — LF default", "fonts": "none — LF default"}
}
```

Logo: the project's current mark — requester file → brand page → site header → LFX record → GitHub organization avatar; never generated. Convert SVG with `cairosvg`; pad to a square for `title_image` with `lfbrand.fit_logo`. Palette and fonts only when an existing brand page states them (record the URL in `_source`); otherwise the LF palette stays and the Brand Guidelines agent decides.

## Build and check

```bash
pip install --break-system-packages python-pptx Pillow        # cairosvg for SVG logos
python3 scripts/build_deck.py deck.json "[Project] Messaging Document.pptx" --brand brand.json --max-slides 20
python3 scripts/render_check.py "[Project] Messaging Document.pptx"
```

Open the contact sheet and look at every slide: text inside its placeholder, project logo on light and dark slides, no "Click to add", footer bar on content slides, tables inside the body area. Fix the JSON and rebuild, up to three passes. The `.pptx` opens natively in Google Slides.
