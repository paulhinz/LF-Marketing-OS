# Foundation brand override — `brand.json`

When a deliverable belongs to a specific LF project or foundation, the LF templates are re-skinned with that project's Brand Kit. The Brand Kit is the `brand-guidelines-agent` output; Section 7 "Visual Identity" carries the four components this skill consumes (Component 5, voice, is text and belongs to the writing agents).

## Schema

```json
{
  "project_name": "PyTorch Foundation",
  "logo": {
    "light": "pytorch-logo-color.png",      // for white backgrounds (doc header, light slides)
    "dark":  "pytorch-logo-white.png"       // for dark slides; if missing, light is reused
  },
  "palette": {
    "primary":       "#EE4C2C",             // Component 2 role "Primary"
    "secondary":     "#2B2B2B",             // "Secondary"
    "accent":        "#F6A21E",             // "Accent"
    "neutral_dark":  "#1B1B1B",             // dark neutral (text / table header fallback)
    "neutral_light": "#F4F4F4"              // light neutral (surfaces)
  },
  "fonts": { "heading": "Space Grotesk", "body": "Inter" },   // Component 3 primary / secondary
  "dark_gradient": ["#2B2B2B", "#0B0B0B"],  // optional; replaces the LF dark-slide gradient stops
  "iconography": "Flat, single-weight line icons in the primary color …",  // Component 4, note only
  "footer_address": null,                   // letterhead footer, two lines separated by \n; null keeps LF's
  "cobrand": true                           // keep "a Linux Foundation project" wording where the Message Foundation places it
}
```

Paths are relative to the JSON file. PNG, JPG or SVG (SVG needs `cairosvg`). Missing keys fall back to LF defaults, so a partial file is fine.

## What each field changes

| Field | LF 2025 slides | DOCS template | Letterhead |
|---|---|---|---|
| `logo.light` | color LF logo on light layouts and closing slide | cover logo + running-header logo (fit to 1000×329, left-aligned) | header logo |
| `logo.dark` | white LF logo on dark layouts | — | — |
| `palette.primary` | Azure `#0094FF` everywhere (subtitles, bar start, links) | cover title and rule, H1/H2, table header fill (white text if AA, else dark text) | footer address color |
| `palette.secondary` | Royal Navy `#003778` (bar end) | cover document-type line, H3 | — |
| `palette.accent` | Cyan `#12E2E2` (bar middle) | — | — |
| `palette.neutral_dark` | table header fill on slides when primary fails AA on white | — | — |
| `dark_gradient` | `#3D3E5B → #100F18` background | — | — |
| `fonts.heading` | Open Sans Medium + Montserrat | Roboto Slab (Title, Headings) | same |
| `fonts.body` | Open Sans | Open Sans Medium (body, header/footer) | same |

Everything else (sizes, spacing, placement, gradient direction, footer furniture, zebra rows) stays as the template has it. That is deliberate: the foundation gets its identity, the LF system keeps its structure.

## Sourcing the values

1. Run `scripts/extract_brand_kit.py "<Project> Brand Kit.docx" brand.json --logo-dir ./logos`. It reads the Component 2 table by the Role column, Component 3 for font families, Component 4 for the iconography note, and names logos by `*color*/*light*` vs `*white*/*dark*`.
2. Read its `_review` list. Anything null or "guessed" is asked of the user in one message. Never fill a gap from memory or from the project's website without saying where it came from.
3. If there is no Brand Kit: offer `brand-guidelines-agent`; if the user just wants the doc now, build LF-default and say so in the delivery note. A logo alone (no palette) is a valid override — the LF palette stays.
4. Contrast: `python3 scripts/lfbrand.py brand.json` prints WCAG ratios for every color against white and black. Flag any primary under 4.5:1 on white — it still works for bars and subtitles on dark, but the script will not use it as a table header fill.

## Iconography

`iconography` has no programmatic effect. Use it when you make charts, diagrams or icons for the document: follow the described style (line weight, fill, color roles) and the Do / Don't table in Component 4. Charts use `primary` for the featured series, `secondary`/`neutral_dark` for the rest, `accent` for one highlight only.

## Co-branding rules

- The project logo *replaces* the LF logo in the template slots; do not stack the two. Where the LF relationship must be visible (external decks, press-facing docs), add the LF lockup (`assets/lf-stacked-color.svg`) on the closing slide or in the boilerplate paragraph, and keep the Message Foundation's "a Linux Foundation project" / legal-entity sentence.
- Letterhead: the footer address is the legal entity's address. Most projects are LF series LLCs or directed funds and keep the LF address; only set `footer_address` when the LFX project record (or `lfx-marketing-os-qa`) confirms a separate legal entity with its own address.
- Trademark line stays in external documents: "The Linux Foundation and The Linux Foundation logo design are registered trademarks of The Linux Foundation. Linux is a registered trademark of Linus Torvalds." Add the project's own mark notice from its Brand Kit Section on trademarks when it has one.
- Final visual sign-off for anything external: LF Creative Services, `brand@linuxfoundation.org`.
