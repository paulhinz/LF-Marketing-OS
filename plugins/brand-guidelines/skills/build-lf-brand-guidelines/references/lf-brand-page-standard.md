# What an LF project brand page contains — the standard this skill writes to

Three published LF-family brand guidelines were read on 8 October 2026 and define the shape of the output: the x402 brand guidelines (x402.org/brand-guidelines, LF Creative Services' web template), the Open Secure AI Alliance brand guidelines (secureaialliance.org/brand, the same template) and the Academy Software Foundation Brand Book v1.0 (artwork.aswf.io/aswf-brand-book.pdf, a 20-page PDF). Together they show what a brand manager at an LF project actually publishes. The Brand Guidelines deck covers every section below; a section the project has no material for is marked `Needs input` or `Proposed`, never filled from imagination.

## The sections, in the order the published pages use them

| Section | What it holds | x402 | OSAIA | ASWF |
|---|---|---|---|---|
| **Purpose** | One paragraph: why the project exists and what the brand stands for. Copied from the Messaging Document (category, positioning, origin); the Brand Guidelines never write a new one. | yes | yes | "goals" + mission |
| **Brand attributes / values** | 3–5 named attributes, each with a one-line gloss that says what the attribute rules in and out for design and copy ("Unadorned — black and white, no gradient, no mascot; a protocol earns trust at the wire level"). ASWF calls them values (Productive, Reliable, Thoughtful, Efficient, Inclusive). | 5 | 4 | 5 |
| **Tone of voice** | "We are / We are not" word pairs (ASWF: friendly/exclusive, direct/ambiguous, thoughtful/reactive, humble/haughty, genuine/dubious). Our voice-attribute table carries the same information with a "what it means" column. | in attributes | in attributes | yes |
| **Audience** | Names of the primary audiences. Copied from the Messaging Document. | — | — | 5 named |
| **Logo** | The primary lockup; what the mark references (ASWF: the `/*` comment syntax nods to developers and to the Academy's brand); when the acronym-only or name-only variations may be used; separate marks for the project and the foundation when both exist (x402 vs x402 Foundation). | yes | yes | yes |
| **Logo scaling** | The minimum height for the full lockup (both web pages: 32 px) and the rule to drop to the symbol below it (x402: symbol legible to about 14 px). | yes | yes | — |
| **Clearspace** | A unit defined from the mark itself (x402: X = one quarter of the x-mark's height; OSAIA: one more layer of the symbol's grid; ASWF: the squares of the perimeter) applied on all four sides, to the lockup and to the symbol alone. | yes | yes | yes |
| **Partnership lockups** | How the mark sits beside a partner's: a vertical divider 1.5 × the logo (or symbol) height, the partner mark sized to equal visual weight rather than equal width, minimum clearspace between elements. | yes | yes | — |
| **Watchouts / unacceptable use** | The common misuses, shown struck through: stretching or distorting, recoloring, rotating, busy or low-contrast backgrounds, shadows or glows, separating or rearranging elements, implying affiliation or endorsement. | 6 | yes | 4 |
| **Symbol** | The standalone mark: what it is, where it is used (favicons, app icons, avatars, package registries, watermarks, swag), its colorways (x402: black and white only). | yes | yes | acronym variant |
| **Symbol in shape** | The symbol inside a circle or rounded square for avatar placements, centered with one clearspace unit of margin. | yes | — | — |
| **Logo color options** | Which palette colors the logo may appear in; which treatments are background-only (ASWF: the gradient is a background, never the logo). | black/white only | black/white + brand colors | aqua, gold, black, white |
| **Primary palette** | The colors that make the brand recognizable, each with HEX, RGB, CMYK and Pantone where the project has them. x402 deliberately has none ("Ink and Paper"). | Ink/Paper | Purple, Blue | Aqua, Blue |
| **Secondary palette** | Supporting tones for body copy, hairlines, surfaces, accents, with the same values and a one-line usage rule (ASWF: sand is an accent, never a replacement for the primaries). | 4 greys | Coral, Lilac, Midnight, Ink, White | Gold, Black |
| **Typography** | Two families, one job each, the weights that ship, the type scale (x402: display 32/56/96, body 14/16/20/28; OSAIA: 8-16-32-64-128), where to get them (Google Fonts, `@fontsource` packages), and the note that the logo is a drawn mark, never set in a font. | yes | yes | yes, with weight specimens |
| **Iconography** | The icon system (OSAIA: Google Material Symbols) and the rule to keep style, weight and scale consistent. | — | yes | — |
| **Imagery / graphic devices** | Background treatments and patterns the brand owns (ASWF: light, dark and gradient backgrounds; abstract wavy lines; connected-line graphics), photography or illustration rules. | — | — | yes |
| **Member badges** | Badges per membership tier (Premier, General, Associate), in color, white-text and single-color versions, for events, websites and collateral. | — | — | yes |
| **Downloads** | Logo packages as zip files (project and foundation separately where both exist). | yes | yes | artwork repo |
| **Legal / brand use** | The LF standard brand-use text: terms of use and trademark policy; in general (no confusion, endorsement or affiliation; don't edit the logo); advertising and sales materials (check first; "Member of …" in text is fine when true); education (no logos on book covers; the "not affiliated" statement); products, names, domains (no incorporation of the name or logo); linking ("[Company] is a member of [logo]"); merchandise (not without permission); attribution line ("[Project] and the [Project] logo design are registered trademarks of the Linux Foundation" or the LF Projects, LLC form); a contact and the two-week review note. | yes | yes | implied |

## What this means for the deck

- The published pages are **image-led**: every rule is shown on the mark itself (scaling strip, clearspace frame, lockup diagram, watchouts grid, symbol colorways, palette tiles, type specimen). `scripts/brand_graphics.py` draws those graphics from the project's own files so the deck shows the rule instead of describing it.
- The pages are **short**: a sentence or two per section and one image. Keep slides to one rule each.
- **Values come in two forms**: brand attributes (what the brand is, for designers and writers) and tone of voice (we are / we are not). Both are derived from the Messaging Document and the requester; neither is invented.
- **Nothing in the legal section is project-specific except the names, the owning entity and the contact.** It is template text; fill the placeholders, do not rewrite it.
- **The foundation and the project may have separate marks** (x402 / x402 Foundation). Document both when both exist; never construct the foundation mark from the project mark.
