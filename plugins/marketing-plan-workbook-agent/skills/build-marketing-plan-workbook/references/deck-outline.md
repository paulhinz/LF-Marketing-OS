# Deck outline and workbook.json spec

Identical skeleton for every foundation. ~30–34 slides. Sections marked **FIRST** appear only in First Plan mode; **RENEWAL** only when a review workbook or prior plan exists.

## Outline

| # | Slide | Type | Mode | Content |
|---|---|---|---|---|
| 1 | Cover | `cover` | both | foundation, "[Period] Marketing Plan Workbook", DRAFT, date, prepared for/by |
| 2 | How to complete this workbook | `howto` | both | 3 steps; at-a-glance box names the mode and the two summary slides at the end |
| 3 | Where we stand today | `stats` | FIRST | 6 tiles: member orgs & list revenue · new memberships trend · events & speakers · education · contributors/participants · audience & content (contacts, subscribers, stars, mentions). Each tile dated and sourced; zeros explained |
| 3 | Last quarter at a glance | `table` | RENEWAL | goals-vs-actuals scorecard lifted from the review workbook |
| 4 | Part I divider | `divider` | both | The Story |
| 5 | The era and the stakes | `stats`+era text | both | 3 market/scale figures, drafted era statement |
| 6 | What makes us distinct | `table` | both | peer/complement comparison, Brand Kit discipline rule |
| 7 | Positioning | `cards` | both | "only place to…" sentence with proof, locked positioning, tagline candidates |
| 8 | Part I YOUR INPUT | `input` | both | 3–4 questions |
| 9 | Part II divider | `divider` | both | Business Outcomes and Goals |
| 10 | The four business outcomes and where we stand | `table` | both | outcome · what it means for this foundation · baseline (dated) · proposed emphasis % |
| 11 | Project stage and emphasis | `cards` | both | stage classification, what it implies, retire/re-scope list |
| 12–16 | Goal 1…N | `goal` | both | one slide per goal: outcome, rank, definition, KPI, budget share, timeline, risks, baseline, confirm box |
| 17 | Part II YOUR INPUT | `input` | both | confirm ranking; one number per goal; what to retire; (FIRST) which outcome matters most this year |
| 18 | Part III divider | `divider` | both | Message and Audiences |
| 19 | Messaging house mapped to goals | `table` | both | goal · pillar · key message · proof · sound bite |
| 20 | Audience segments mapped to goals | `table` | both | segment · persona · primary goal · channel · CTA |
| 21 | Part III YOUR INPUT | `input` | both | |
| 22 | Part IV divider | `divider` | both | Budget |
| 23 | Choose a Strategy Profile | `profile` | both | 3 columns from budget_model; revenue base labeled; flat-fee cross-check line |
| 24 | How the budget is split | `cards` | both | Paid (defined by medium) · LF services/headcount · Third-party content · Discretionary (hot + evergreen); planned vs discretionary explained |
| 25 | Budget across the goals | `allocation` | both | goal · outcome · share % · $ at each profile; totals row = 100% |
| 26 | Part IV YOUR INPUT | `input` | both | profile choice; revenue base; split; paid media priorities; discretionary rules |
| 27 | Part V divider | `divider` | both | Execution |
| 28 | Anchor moments calendar | `calendar` | both | 4 quarter columns |
| 29 | Team, systems and measurement | `table` | both | roster and gaps from master sheet + connectors |
| 30 | Decisions needed, with dates | `table` | both | |
| 31 | Part V YOUR INPUT | `input` | both | |
| 32 | **Goals Summary** | `summary` | both | one table: # · goal · outcome · definition · KPI · budget % and $ · timeline · risks |
| 33 | **Budget Summary** | `budgetsummary` | both | total at chosen/each profile · LF marketing services · paid · third-party content · planned campaign spend vs discretionary reserve · allocation by outcome |
| 34 | Next steps | `next` | both | return, interview, final plan |
| 35 | Data notes | `table` | both | source · used for · date · caveat |

## workbook.json spec

```json
{
  "meta": { "foundation": "x402 Foundation", "period": "Q4 2026 + 2027", "date": "October 1, 2026",
            "mode": "FIRST", "preparedFor": "…", "preparedBy": "…", "footer": "…" },
  "brand": { "ink": "222222", "slate": "676767", "accent": "0A7739", "neutral": "F1F1F1", "white": "FFFFFF",
             "headFont": "Cambria", "bodyFont": "Arial" },
  "slides": [ { "type": "cover", ... }, ... ]
}
```

Slide objects (all accept `eyebrow`, `title`, `badge` ("draft" | "input" | null), `source`, `notes`):

- `cover`: `title`, `subtitle`, `blurb`
- `howto`: `steps: [[n, head, text]]`, `glance` (string)
- `divider`: `part`, `name`, `blurb`
- `stats`: `tiles: [{num, label, sub}]` (3 or 6), optional `era: {head, text}`
- `table`: `header: []`, `rows: [[]]`, `colW: []`, `size`, `caption`
- `cards`: `cards: [{head, text, hcolor?}]` (2–3), optional `dark: {head, text, proof}` left panel
- `chart`: `chart: {kind: "bar"|"line", title, labels, values, max}`, `cards: [{head,text}]` (2), `footnote`
- `goal`: `rank`, `outcome`, `goal`, `definition`, `kpi`, `budgetShare` ("25%"), `timeline`, `risks: []`, `baseline`, `baselineSource`
- `profile`: `model` (output of budget_model.py --json), `revenueLabel`
- `allocation`: `model`, `rows: [{goal, outcome, share}]` (share as decimal)
- `calendar`: `columns: [{head, items: [], highlight?}]`
- `input`: `questions: []`
- `summary`: `goals: [{rank, goal, outcome, definition, kpi, budgetShare, timeline, risks}]`, `model`, `chosenProfile` (index or null)
- `budgetsummary`: `model`, `chosenProfile`, `allocation: [{goal, share}]`
- `next`: `steps: [[n, head, text]]`, `footer`

Hex colors without `#`. Keep text to the sizes the generator sets; split a long table across two slides rather than shrinking below 8 pt.
