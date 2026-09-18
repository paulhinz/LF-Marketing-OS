# Block library and spec format

The infographic is a JSON spec: a header, an optional headline and ask, an ordered list
of blocks, and a footer. `scripts/build_infographic.py` turns it into one page.

## Top level

```json
{
  "header": {
    "organization": "Agentic AI Foundation",
    "title": "Governing Board pre-read",
    "subtitle": "2027 strategy at a glance",
    "byline": "Mazin Gilbert, Executive Director",
    "date": "September 2026"
  },
  "headline": "One sentence in the ED's words.",
  "ask_label": "The ask",
  "ask": "One sentence naming the money, the votes, or the direction being sought.",
  "brand": {"primary": "#12233F", "accent": "#0B7285"},
  "blocks": [ ... ],
  "footer": "Sources and dates. Where the exhibits live."
}
```

`brand` is optional. Keys you can override: `primary` (headers, big numbers), `accent`
(highlights, arrows), `ink`, `muted`, `rule`, `panel`, `warn`, `danger`, `good`. Take
primary and accent from the project's Brand Kit when one exists.

Every block takes `type`, `title`, optional `subtitle`, and optional `width`
(`full`, `half`, `third`, `twothirds`). Blocks flow left to right and wrap; two `half`
blocks sit side by side. Defaults: `scorecard`, `stats`, `timeline`, `bullets` are half;
`risks`, `goals`, `numbered`, `decisions` are full.

Titles render in small caps, so keep them to a few words: "Nine months in", "Risks that
need board action", "Five questions for the board". Use the subtitle for the qualifier:
"At inception → today", "Items 4 and 5 carry votes".

## Block types

### `scorecard` — before-and-after numbers

The "how far have we come" block. Best as the first block for strategy meetings.

```json
{"type": "scorecard", "title": "Nine months in", "subtitle": "At inception → today",
 "items": [
   {"from": "49", "to": "270", "label": "Member organizations"},
   {"value": "6", "label": "Hosted projects", "note": "4 more in intake"}
 ]}
```

Use `from`/`to` for a change and `value` for a single figure. Four or six items in a half
block, six in a full block. Keep the numbers short ("4–10x", "$2.5M", "12.8K"); the label
carries the meaning. Optional `note` in small grey type.

### `stats` — a few big percentages plus a split and a callout

The survey block, or any place three numbers and a small table tell a story.

```json
{"type": "stats", "title": "What members told us", "subtitle": "2026 Member Pulse Survey, ~200 respondents",
 "items": [{"value": "81%", "label": "run agentic AI in production today"}],
 "table": {"title": "Net recommendation by tier", "rows": [["Platinum", "+56"], ["Gold", "0"]]},
 "callout": {"tag": "#1 request", "text": "Shipped code: interoperability and conformance testing."}}
```

`items` (two to four), `table` (two to five two-column rows), and `callout` are each
optional. The callout is for the single quote or request the ED wants the board to
remember.

### `goals` — goals versus outcomes table

The quarterly review block. Feed it straight from the marketing plan's goal slides.

```json
{"type": "goals", "title": "Q3 goals vs outcomes", "subtitle": "From the Q3 marketing plan, approved 2 July",
 "columns": ["Goal", "KPI", "Target", "Now", "Status"],
 "items": [
   {"goal": "Add 12 new members", "kpi": "Signed members", "target": "12", "actual": "5",
    "status": "off-track", "note": "Seven prospects stalled on price."}
 ]}
```

`status` is one of `done`, `on-track`, `at-risk`, `off-track`, `not-started`; pass
`status_label` to override the pill text. `note` adds a grey explanatory line under the
row; use it on every goal that is not on track, because a red pill without a reason
invites the wrong conversation. Three to six goals.

### `risks` — things the board can act on

```json
{"type": "risks", "title": "Risks that need board action",
 "items": [{"value": "69%", "label": "US-based members.", "text": "The board does not look like the community it governs. 12 companies want to upgrade to Platinum."}]}
```

Two to four items in a full block (they render side by side with an amber bar). `value`
is optional but strong: a percentage, a count, or a month ("Dec") when the risk has a
date. `label` is a short bold phrase ending in a period; `text` is one or two sentences
naming the consequence and what the board can do.

### `numbered` — a short ordered list of areas or priorities

Investment areas, strategic pillars, the six things the surplus buys.

```json
{"type": "numbered", "title": "Six places to invest the $2.5M surplus",
 "subtitle": "Allocations come with the 2027 budget in October",
 "items": ["Marketing and brand", {"label": "Projects", "detail": "Security scanning, trademarks, conformance"}]}
```

Three to six items; strings or `{label, detail}` objects. Renders as a row of 01…06.

### `timeline` — dated milestones

Next quarter's calendar, a governance process, renewal dates.

```json
{"type": "timeline", "title": "Q4 milestones",
 "items": [{"when": "Dec 1", "label": "Renewal notices go out.", "text": "18 memberships renew in Q1."}]}
```

Three to six items, in date order.

### `bullets` — short prose points

For proposal summaries and plan highlights when nothing more structured fits. Use
sparingly; a page of bullets is a memo, not an infographic.

```json
{"type": "bullets", "title": "Q4 plan highlights",
 "items": [{"label": "Budget $410K.", "text": "52% adoption, 28% membership, 20% training."}, "A plain string also works."]}
```

Three to five items.

### `decisions` — what the board is asked to do (always present, always last)

```json
{"type": "decisions", "title": "Five questions for the board", "subtitle": "Items 4 and 5 carry votes",
 "items": [
   {"question": "Approve the 2027 Tier 2 event portfolio, ~$2.2M?",
    "detail": "Approving now gets us into 2027 sponsor budget cycles.",
    "reference": "Exhibit D", "action": "VOTE"}
 ]}
```

`action` is one of `VOTE`, `APPROVE`, `DECIDE` (red), `REVIEW` (amber), `DISCUSS` (navy),
`INFORM` (grey). Three to six items in agenda order. `question` is phrased so a board
member can answer it; `detail` gives the one reason it matters now; `reference` points
to the exhibit, slide, or document.

## Writing rules for a board page

- Lead with the change, not the level. "49 → 270 members" beats "270 members".
- One idea per item. If a risk needs two sentences of context, it belongs in the pre-read
  with a one-line pointer here.
- Say who is asked and by when. "Approve by Friday so we enter sponsor budget cycles" is a
  decision; "events strategy" is a topic.
- Use the ED's phrasing for the headline and the decision questions. The page is theirs.
- Keep every date, dollar figure, and count traceable to a source named in the footer.
- Plain language: everyday words, complete sentences, no em dashes, expand acronyms the
  board may not share (TOC, CFT, SDK are fine for a technical board; check).

## Fitting one page

The build script scales the whole page between 72% and 118% to land on exactly one page.
Content sized for a comfortable page: about 7 blocks, 25 to 30 numeric items in total,
decision block of 5. If the script reports a scale under 0.90, cut rather than squint:
drop the weakest block, shorten `text` fields, or move items into the exhibit reference.
