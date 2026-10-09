# [Project Name] Brand Guidelines — required structure (v1.1)

The Brand Guidelines are what a brand manager at an enterprise open source project publishes so that everyone extends the same identity. The sections follow the published LF project brand pages (`references/lf-brand-page-standard.md`: x402, Open Secure AI Alliance, ASWF): purpose, brand attributes, logo and its rules, symbol, palette, typography, iconography and imagery, voice and tone, member badges, brand use and legal, applications. Positioning, taglines, pillars and claims live in the Messaging Document, which runs first; this document copies its statements verbatim where needed and derives voice and tone from them.

**Document and extend what exists; propose only where nothing exists; never invent from a screenshot or from memory.** Every visual component carries its identity basis: `Documented` (existing guidelines or brand page), `Documented from site` (live CSS and logo files), `Proposed` (nothing existed; the agent proposes and says so), or `Needs input`. Pantone and CMYK values are recorded only when the project publishes them.

**Two outputs, one content.** The Markdown file is written first; the deck is rendered from it (`references/deck-outline.md`), built with the project's own `brand.json`, and is image-led: every logo rule is drawn on the project's own mark by `scripts/brand_graphics.py`. Length budget: deck 16–20 slides (cap 22), Markdown ≤ 8 pages.

---

## Front matter

```
# [Project Name] Brand Guidelines

| Field | Detail |
|---|---|
| Project | [Project Name] |
| Prepared by | LFX Marketing OS — Brand Guidelines Agent (build-lf-brand-guidelines) |
| Date | YYYY-MM-DD |
| Status | Draft — pre-filled / Draft — from your documents / ED-reviewed — [name], [date] |
| Source Messaging Document | [file], [status], [date] |
| Identity basis | per component, e.g. Logo: Documented · Palette: Documented from site · Iconography: Proposed |
| Governance | [md.governance_sentence, copied] |
```

## Review Sheet

`input-doc-mapping.md` §5. One line of status and counts, then `| # | Field | Current wording | Source | Approve / Edit | Notes |` with rows in this order: Identity basis · Brand attributes (one row each) · Logo (the mark and where the files live) · Logo rules (minimum height and clearspace unit) · Palette (hexes by role) · Typography (families) · Voice attributes (one row each) · Prefer / Avoid (top three pairs).

## 1. Purpose and brand foundation

- **Purpose** (`bg.purpose`): one paragraph on why the project exists and what the brand stands for, composed only from Messaging Document fields (category, positioning statement, origin story) and cited as such.
- **Foundation table**: Positioning statement · Tagline (with lock status) · Pillar tags · Primary audiences, verbatim from the Messaging Document sidecar. One line: "Words live in the Messaging Document; this document governs how they look and sound."

## 2. Brand attributes

`bg.brand_attributes`: 3–5 named attributes, each with one or two sentences saying what it rules in and out for design and copy (x402's "Unadorned: black and white, no gradient, no mascot"; ASWF's "Reliable: things just work"). Derived from the pillars, the positioning and the requester's answers; each attribute names the pillar or statement it comes from. They are the test every later design and copy decision is checked against.

## 3. Logo

- **The mark** (`bg.logo`): the primary lockup; what it references, when documented (ASWF's `/*`); the canonical files and the download package; who owns them. When the project and the foundation have separate marks, document both and never construct one from the other.
- **Variations** table `| Variant | Exists | Use | Background |`: primary lockup · horizontal · acronym-only / name-only (if the project uses them) · icon-only (the symbol) · monochrome · reversed. "Needed" where a variant does not exist.
- **Logo color options**: which palette colors the logo may appear in; treatments that are background-only.
- **Scaling** (`bg.logo_rules`): the minimum height for the full lockup (LF pages use 32 px) and the rule to drop to the symbol below it, with the symbol's own floor.
- **Clearspace**: the unit X defined from the mark itself (a fraction of its height, or one layer of its grid), applied on all four sides, to the lockup and to the symbol.
- **Partnership lockups**: divider 1.5 × the logo height; partner mark sized to equal visual weight, not equal width; minimum clearspace between elements.
- **Watchouts**: the misuses, as a list the graphic shows struck through: stretch or distort · recolor outside the palette · rotate · busy or low-contrast background · shadows or glows · separate or rearrange elements · imply affiliation or endorsement.
- **When no mark exists**: a constrained creative brief instead of a render — concept direction in two or three sentences tied to the positioning; boundary conditions (single mark, ≤2 colors in the icon, legible at 16 px and in monochrome, no gradients, photorealism or 3D, nothing a person cannot redraw as clean vector); look-alikes to avoid; the deliverable spec handed to LF Creative Services. Never generate the logo.

## 4. Symbol

`bg.symbol`: what the standalone mark is; where it is used (favicons, browser tabs, app icons, social and community avatars, package-registry profiles, watermarks on diagrams, swag); its colorways; symbol-in-shape (circle or rounded square, centered, one clearspace unit of margin) for avatar placements. `Needs input` when the project has no standalone symbol, with "icon-only variant needed" in Open decisions.

## 5. Color

- **Primary palette**: the colors that make the brand recognizable (a project may deliberately have none beyond black and white — say so). Table `| Name | Role | HEX | RGB | CMYK | Pantone |` with CMYK and Pantone only when the project publishes them.
- **Secondary palette**: supporting tones for body copy, hairlines, surfaces, accents, with the same columns and a one-line usage rule (an accent is never a replacement for a primary).
- **Contrast**: `| Role | Hex | On white | On black | Use |` with every ratio computed by `scripts/palette_check.py`; pairings never to use; usage proportions; intake constraints honored.
- `brand.json` carries the five roles the templates consume; the full palette stays in this section.

## 6. Typography

Two families, one job each (a third, monospace, for code-centric projects or where "ground truth" text needs its own face). Table `| Role | Family | Weights that ship | Size | Fallback |` for display/H1, H2, H3, body, caption, (code); the type scale as the project states it (x402: 32/56/96 display, 14/16/20/28 body; OSAIA: 8-16-32-64-128); where to get the fonts (Google Fonts link, `@fontsource` package); the casing rule and how the project's name is set; the note that the logo is a drawn mark and is never reproduced in a font.

## 7. Iconography and imagery

- **Icon system**: the named library (Google Material Symbols, Phosphor, a project set) and the rule to keep style, weight and scale consistent; or the drawn-icon rules (stroke, fill, radius, sizes) when the project draws its own.
- **Imagery and graphic devices**: background treatments (light, dark, gradient), owned patterns or motifs, photography or illustration rules — documented from what the project ships; `Proposed` from the positioning otherwise.
- `| Do | Don't |` table with concrete examples.

## 8. Voice and tone

- **We are / We are not** (`bg.voice_attributes`): 3–5 rows `| Attribute | What it means | What it is not |`, derived in this run from the Messaging Document's pillars, key messages and sound bites and the requester's adjectives; one **Sounds like** line (a Messaging Document sound bite, verbatim) and one **Doesn't sound like** line.
- **Tone rules** as one short table: reading level · formality · authority vs. humility · competitive tone · superlatives · contractions · Oxford comma · register shifts.
- **Prefer / Avoid language** `| Prefer | Avoid | Why |`, 5–10 rows, including the Messaging Document's must-say and must-not-say lines.

## 9. Member badges

`bg.member_badges`, only when the project has a membership program: one row per tier (Premier, General, Associate, or the project's names): exists / needed; variants (color, white text, single color); where used (events, websites, collateral); the rule that a badge is used only by a current member. Omit the section otherwise.

## 10. Brand use and legal

`bg.brand_use_policy`: the LF standard text with placeholders filled — the owning entity and policy links (LF Projects, LLC terms of use and trademark policy, or The Linux Foundation's); in general (no confusion, endorsement or affiliation; the user's own mark more prominent; do not edit the logo); advertising, promotional and sales materials (check first; "Member of [Project]" in text is fine when true); education and instruction (no logos on book covers; the "[Title] is not affiliated with or otherwise sponsored by [Project]" statement); products, websites, names and logos (no incorporation; no domains containing the name); linking ("[Company] is a member of [linked logo]"); merchandise (not by third parties without permission); attribution ("[Project] and the [Project] logo design are registered trademarks of …", in the form the LFX record supports); downloads (the logo packages); contact and the two-week review note. Plus the Messaging Document's trademark sentence verbatim, the LF co-branding rules (project logo replaces the LF logo in template slots; LF lockup on the closing slide or in the boilerplate; member logos only with permission and never beside a comparison) and LF Creative Services as final sign-off.

## 11. Applications

`bg.applications`: one table `| Surface | Logo variant | Palette roles | Type | Note |` for slide decks (LF 2025 template re-skinned with `brand.json`), documents (LF Agent DOCS template), website, docs site, social avatars and banners, event signage and swag, email. No sample copy.

## 12. Open decisions

Each with one owner: variants or the symbol to produce, files to supply, palette approval where `Proposed`, Pantone/CMYK to confirm, font licensing, badge production, constraints to confirm, and any item carried from the Messaging Document that touches brand (tagline lock).

<<<PAGEBREAK>>>

## Appendix A: Inputs and intake record

Supplied documents (title, link, date read, fields covered); the Messaging Document version and sidecar used; URLs read (brand page, CSS files, logo files, download packages) with dates; the intake questions actually asked and the answers verbatim with provenance labels; conflicts with the Messaging Document (both versions) and how they were resolved.

## Appendix B: brand.json

The finished file in a fenced block with one line per field on where the value came from. Schema in `brand-override.md`. Required non-null: `project_name`, `logo.light`, `palette` (five roles), `fonts.heading`, `fonts.body`, `iconography`; any null is an Open decision with an owner.

---

## Section-completeness self-check (apply before building the deck)

1. The Review Sheet is present, fits two slides, and every row carries a Source label.
2. §1 purpose and foundation are composed only from Messaging Document fields; no new verbal content anywhere.
3. §2 has 3–5 attributes, each naming the pillar or statement it derives from.
4. §3 documents real files, the download package and a scaling, clearspace, lockup and watchouts rule, or is explicitly a creative brief; no generated logo; variants marked "Needed" rather than constructed; project and foundation marks never conflated.
5. §5 lists the full palette with HEX and RGB, CMYK/Pantone only where published, every contrast ratio computed by the script, proportions and constraints; an existing palette is unchanged.
6. §6 names ≤2 families (3 with monospace) with shipping weights, a scale and a source link, each with an identity basis.
7. §8's "Sounds like" line is a Messaging Document sound bite; Prefer / Avoid includes its must-say / must-not-say lines.
8. §10 is the LF standard text with placeholders filled, the LFX-derived trademark sentence verbatim, and the attribution line in the form the owning entity supports.
9. Every component states its identity basis; nothing is `Documented` without a URL or file behind it; nothing `Proposed` is presented as existing.
10. The graphics on the deck were generated from the project's own logo files with `brand_graphics.py`, not drawn by hand or taken from another project.
11. Appendix B's `brand.json` has no null required field, or each null is an Open decision; the deck was built with it.
12. The deck is ≤22 slides, the Markdown ≤8 pages; sidecars written; `brand.json`, `logos/` and the graphics sit next to the deck.
13. Any conflict with the Messaging Document is logged in Appendix A and named in the delivery message.
14. The delivery message carries the ten-line digest and, if `lfx-marketing-os-qa` is installed, its fix list.
