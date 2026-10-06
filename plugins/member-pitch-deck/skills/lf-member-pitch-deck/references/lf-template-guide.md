# Style guide and layout keys (v2 — membership overview style)

This file replaces the v1 "LF 2025 Template guide". Every Member Pitch Deck is built by `scripts/build_deck.py`, which draws each slide from scratch in the style below. The spec supplies content and Brand Kit tokens; it cannot set per-slide fonts, sizes or colors.

## Visual system (fixed by the builder)

- Slide size 10 × 5.625 in (16:9), white canvas; `stats` uses the light-gray canvas; `ask` uses the dark canvas
- **Display font** (titles, statements, big numbers, step numbers, timeline labels): Brand Kit display face, default *Instrument Serif*. Titles 22–26pt, title slide 40pt, statements 24pt, stat values 30pt
- **Body font** (everything else): Brand Kit body face, default *Inter*. Card headings 11–13pt bold, body 8.5–12pt, eyebrows 7.5pt uppercase
- **Color tokens**: `accent` (one Brand Kit color — card headings, step numbers, timeline labels, the highlighted step card, dashed callout border), `text` #1A1A1A, `muted` #5F6368, `card` #F3F3F3, `dark` #1E1E1E, `rule` #E3E3E3. Only `accent`, `display_font` and `body_font` normally change per project
- Cards: light-gray rounded rectangles, no borders, no shadows; white cards with a hairline rule where they sit on gray or beside a highlighted card
- Chrome: project wordmark bottom-left and slide number bottom-right on every content slide; "The Linux Foundation | project" lockup bottom-right on `title`, `statement` and `thanks`; `person` carries the lockup top-right of its gray panel
- Fonts resolve in Google Slides when the Brand Kit names Google Fonts. LibreOffice renders (used for QA) substitute wider faces, so a render that *just* fits is a cut-words signal

## Spec skeleton

```json
{
  "project": {"name": "x402 Foundation", "short": "x402",
              "logo": "assets/project/x402-wordmark.png",
              "logo_dark": "assets/project/x402-wordmark-white.png",
              "mark": "assets/project/x402-mark.png"},
  "theme":   {"accent": "#0F6E3D", "display_font": "Instrument Serif", "body_font": "Inter"},
  "slides":  [ {"layout": "title", "title": "...", "subtitle": "...", "date": "October 2026", "notes": "..."} ]
}
```

Inline `**bold**` works in every text field. Every slide may carry `notes`.

## Layout keys

| Key | Fields | Use it for (standard slide #) |
|---|---|---|
| `title` | `title`, `subtitle`, `date`, [`image`] | 1 — Title |
| `agenda` | `title`, `items[]` | 2 — Agenda (3 items) |
| `statement` | `text`, [`sub`] | 3 — LF goal |
| `image_full` | `title`, `image` | 4 — LF project mosaic |
| `cards` | `title`, `cards[{heading,text,[eyebrow]}]`, [`cols`], [`highlight`], [`callout{heading,text}`] | 5 core factors, 10 architecture, 15 member value, 16 roadmap |
| `two_col` | `title`, `left{heading,bullets[]}`, `right{heading,bullets[]}` | 6 — Foundation / Standard |
| `vision` | `vision`, `mission`, [`strategy_label`], `strategy[]` | 7 — Vision, Mission, Strategy |
| `rows` | `title`, `rows[{label,text}]`, [`footnote`] | 8 — Current state |
| `steps` | `title`, `steps[{heading,text}]`, [`highlight_last`] | 9 — How it works |
| `stats` | `title`, `stats[{value,label}]` | 11 — Production traction |
| `logo_wall` | [`title`], `groups[{heading,images[],[cols]}]` | 12–13 — Member logos by tier |
| `person` | `title`, `image`, `heading`, `text` | 14 — Leadership |
| `tiers` | `title`, `tiers[{name,price,bullets[],highlight}]`, [`strip{heading,steps[{heading,text}]}`] | 17 — Tiers |
| `table` | `title`, `columns[]`, `rows[[...]]`, [`widths[]`] | 18 ROI by role; appendix fees, matrix, rosters |
| `timeline` | `title`, `steps[{when,heading,text}]` | 19 — First 90 days |
| `ask` | `text`, [`link_text`, `link_url`], [`contact`] | 20 — The ask (dark) |
| `thanks` | [`text`] | 21 — Thank you |
| `bullets` | `title`, `bullets[]`, [`lead`] | Appendix / fallback |
| `section` | `title`, [`subtitle`] | Divider (counts toward 22) |

## Word budgets (text does not auto-shrink)

| Element | Budget |
|---|---|
| Slide title | ≤ 12 words (two lines at most) |
| Card heading / body | ≤ 5 words / ≤ 28 words (≤ 22 when the slide has a callout or 3 rows) |
| Row label / text | ≤ 6 words / ≤ 30 words |
| Step heading / text | ≤ 4 words / ≤ 22 words |
| Stat value / label | ≤ 7 characters / ≤ 6 words |
| Tier bullet | ≤ 5 words, ≤ 4 bullets |
| Strip step heading / text | ≤ 3 words / ≤ 9 words |
| Table cell | ≤ 18 words, ≤ 4 rows |
| Timeline text | ≤ 24 words |
| Statement / ask | ≤ 30 words |

## Images

- Wordmarks: PNG with transparency, dark-on-light for `logo`, light-on-dark for `logo_dark`; the builder scales to fit, never crops
- Member logos: one PNG per member, horizontal, transparent or white background; the builder draws each in a white tile with a hairline rule, so pre-padded logos are not needed
- Headshot: square PNG/JPG; the builder masks it to a circle
- Project mosaic: the current LF-approved image, 16:9 or wider

## Checks before delivering

- Fix every `!` line the builder prints (LONG text, missing image, logo-wall overflow)
- Render every slide and look at it: nothing leaves its card, cards on a slide are parallel, arrows sit between steps, the wordmark and lockup are where the style puts them
- Slide count ≤ 22 including dividers and logo-wall splits
