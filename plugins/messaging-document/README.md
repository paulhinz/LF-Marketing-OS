# Messaging Document Agent

**Command:** `build-lf-messaging-doc` · **Version 1.0.0** · replaces `message-foundation-agent` 0.5.0 (`develop-lf-project-messaging-foundation`)

The first of the three LFX Marketing OS foundation agents. It builds the `[Project Name] Messaging Document`, the messaging source of truth a senior product marketing manager keeps for an enterprise open source project, and delivers it as a concise slide deck on the LF 2025 Slides template.

## Order of the foundation agents

1. **Messaging Document** (this plugin) — needs no Brand Kit; reads the project's own documents, site, README, press release and LFX record.
2. **Brand Guidelines** (`build-lf-brand-guidelines`) — reads this document's sidecar and `brand.json` seed; adds logo, palette, typography, iconography, voice and tone.
3. **ICP & Target Markets** (`develop-target-markets-and-icp`) — defines the audiences this document names.

## What it asks

First, whether the foundation already has messaging, positioning, brand, audience or competitive documents (it maps them and quotes them verbatim). Then the project name and URLs (website, README, press release, brand page). Then, one at a time and only for the gaps, up to ten questions: vision and mission · category and what it is not · primary audiences · alternatives (including member products, as peers) · the one differentiator · top three use cases · proof points to confirm · pillars · hardest objections and honest answers · tagline, CTA anchors and must/must-not-say. Pre-fill mode answers them from the sources for ED review.

## What it produces

| Slide | Content |
|---|---|
| 1 | Cover with the project logo |
| 2–4 | **Review Sheet** — every field the ED approves, with source and a blank Approve / Edit column |
| 5 | What this document gives you |
| 6 | Communications framework: Vision · Mission · Positioning platform · Tagline |
| 7 | Positioning statement, category, audiences, "unlike" |
| 8 | What it is and who governs it (LFX-derived governance and trademark sentences) |
| 9–10 | Copy primitives: 25-word, 50-word, elevator pitch; boilerplate (llms.txt in notes) |
| 11 | Alternatives and where the project differs (members as peers) |
| 12 | Messaging pillars on the fixed scaffold |
| 13 | The message house: value proposition, key message, supporting points, sound bite per pillar |
| 14 | Proof points with sources |
| 15 | Objections and what we admit |
| 16 | What we don't claim; terminology |
| 17 | Four CTA anchors; origin story |
| 18 | Decisions owed, with owners |
| 19 | Closing |

Plus `[Project] Messaging Document.md` (the source, ≤8 pages), `[project-slug].messaging-document.fields.yaml` and `[project-slug].inputs.yaml` (the sidecars downstream agents read), and a `brand.json` seed with the project logo.

## Grounding

Every claim traces to a supplied document, the interview, the site, the README, LFX, the press archive or a Stat Bank row with a source and date; anything else is `Needs input` or `[PROOF POINT TBD]`. Named organizations are never cited without confirmation; member products are peers, never competitors; no superlative without its proof point in the sentence; governance wording comes from LFX only.

## Setup

`python-pptx`, `Pillow` (and `cairosvg` for SVG logos); LibreOffice for the render check. The example in `skills/build-lf-messaging-doc/examples/` builds as shipped.
