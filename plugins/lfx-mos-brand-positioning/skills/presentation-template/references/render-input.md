# Input contract (renderers: presentation-template, one-pager, brand-kit book)

One JSON object, assembled by the caller from content the drafting skills already returned. Renderers never draft or change copy.

```json
{
  "project": { "name": "Akrites", "domain": "akrites.org" },
  "content": {
    "mh":  { "…": "message house, from the messaging-framework skill" },
    "mf":  { "…": "messaging framework (optional; adds an appendix slide)" },
    "icp": [ "…ICPs (optional; adds an appendix slide)…" ],
    "nums": [["4", "steps from intake to disclosure"]],
    "bp":  [ "…four boilerplates, from the boilerplates skill…" ],
    "faq": [ "…from the faq skill…" ],
    "kit": { "…": "brand kit tokens, from the brand-kit skill" }
  },
  "logos": {
    "light": "<svg …>…</svg>",
    "dark": "<svg …>…</svg>",
    "symbol": "0 0 300 176.5",
    "file": "akrites.zip"
  }
}
```

| Field | Required by | Notes |
|---|---|---|
| `project.name`, `project.domain` | all | Domain without `https://`. |
| `content.mh` | all | |
| `content.bp` | all | Read by position: `bp[2]` is the 50-word, `bp[3]` the 100-word version. |
| `content.kit` | all | `{colors, font, fontNote, attrs, dark, accent, spark, word}`. |
| `content.faq` | presentation-template | Answered questions only appear in the appendix. |
| `content.mf`, `content.icp` | presentation-template, optional | Each adds one appendix slide when present. |
| `content.nums` | presentation-template, optional | Fills the Key numbers layout; padded with `[00]` placeholders. |
| `logos.light` | optional | SVG **text** of the horizontal logo for light grounds. Without it, placeholder marks are drawn from `kit.word`. |
| `logos.dark` | optional | SVG text of the white/reversed logo. Falls back to `light`. |
| `logos.symbol` | optional | An SVG viewBox that crops the symbol out of `light`, or null. |

Logos are always the project's real files. Never draw, describe or reconstruct a logo.
