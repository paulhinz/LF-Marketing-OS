# Visual identity method — how logo, palette, type and iconography are sourced

The rule in one line: **document and extend what exists; propose only where nothing exists; never invent from a screenshot or from memory.** Most LF projects arrive with a site, a wordmark and a de facto palette. The Brand Guidelines write that identity down precisely enough that every downstream agent and designer extends the same thing. Every component carries its identity basis.

## 1. Find the existing identity, in this order

1. **Existing brand guidelines** (from Step 0a or the Messaging Document's inputs record): a brand page, PDF, Google Doc, Figma file, or a `brand/`, `assets/`, `logo/` folder in the repository. Authoritative for everything it states.
2. **The `brand.json` seed** written by `build-lf-messaging-doc`: the logo file(s) it found and any palette or fonts it sourced from a brand page (`_source` says where). Start from it.
3. **The website's CSS.** Fetch the stylesheet(s) and read, not eyeball: CSS custom properties (`--color-*`, `--font-*`, often the project's own palette definition), `body` background and text color, `h1`–`h3` color and `font-family`, link and button colors, the most-used neutrals, `@font-face` and Google Fonts `<link>` elements. Record each value with the selector it came from and the date.
4. **Logo files**: the site header's `<img>` or inline SVG, the GitHub organization avatar, the LFX project record's logo URL, the press release's media kit. Download the originals; note formats (SVG preferred) and whether a reversed (white) variant exists. Test icon-only legibility at 16 px by downscaling the file.
5. **Existing diagrams and icons** on the site and in the docs: they define the iconography more reliably than any adjective.

## 2. Decide the identity basis per component

- **Documented** — a brand page or guidelines exist: reproduce their values; extend only where they are silent (a missing reversed logo rule, a missing neutral) and label additions `Added`.
- **Documented from site** — no guidelines, but a live site with consistent CSS: the site's colors and fonts become the palette and type, named by role.
- **Proposed** — a new project with no site or an inconsistent one: propose a palette and type suited to the positioning, the domain and the intake constraints; label every value `Proposed`; the deck built from it is the first look the ED gets.
- **Needs input** — nothing found and the requester declined to decide.

## 3. Palette

Five roles maximum. Compute every ratio with `scripts/palette_check.py` (relative luminance; AA 4.5:1 normal text, 3:1 large text). Report pass / fail per pairing and the pairings never to use. State usage proportions. Hard constraints from intake — colors to avoid, a member network's or a competitor's color — are listed and honored. The LF template's own test: the table-header fill uses the primary only when it passes AA with white text; if the renderer falls back to the dark neutral, write that down as a property of the palette.

## 4. Typography

Two families (three with monospace). Prefer the site's own families and Google Fonts for portability; record the weights actually loaded. Give a type scale in px and weight with fallbacks, and the name-casing rule (brand, not law).

## 5. Iconography and imagery

Cite what the project already ships and match it. Where nothing exists, translate the positioning statement into subject matter (draw the mechanism the positioning describes, not the category's clichés) and state stroke weight, fill or line, corner radius, color roles and drawing sizes. Label it `Proposed`.

## 6. Voice and tone, derived in this run

Voice is not pre-generated. Start from the Messaging Document's pillars, key messages and sound bites and the requester's adjectives (offered against the pillars: "the pillars suggest open, definitive, secure — keep, change or add?"). Each attribute row answers "what it means" and "what it is not" for this project; the "Sounds like" line is a Messaging Document sound bite, verbatim. Tone rules and the Prefer / Avoid table come from the requester's language decisions, the Messaging Document's terminology and must/must-not-say lines, and the LF-family consistency rules; nothing generic.

## 7. brand.json

Write the finished file from §3–§5 (schema in `brand-override.md`): `project_name`, `logo.light` and `logo.dark` (paths relative to the file), `palette` (five roles), `fonts` (heading, body), `dark_gradient` (optional), `iconography` (one sentence), `cobrand: true`, plus `_source` per field with the URL or file and the date. Build the Brand Guidelines deck with it; keep it and `logos/` next to the deliverables. It replaces the older `extract_brand_kit.py` parsing of a Brand Kit `.docx`.
