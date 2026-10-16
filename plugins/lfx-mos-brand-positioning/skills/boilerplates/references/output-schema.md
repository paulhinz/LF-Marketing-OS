# Output schema (bp, report)

```json
{
  "bp": [
    { "l": "One-liner", "max": 15, "t": "…" },
    { "l": "25 words", "max": 25, "t": "…" },
    { "l": "50 words", "max": 50, "t": "…" },
    { "l": "100 words", "max": 100, "t": "… Learn more at example.org." }
  ],
  "report": { "sources_read": [], "sources_failed": [], "gaps": [], "notes": "" }
}
```

Rules
- Exactly four entries, in this order, with these `l` and `max` values. The presentation-template and one-pager skills read `bp[2]` (50 words) and `bp[3]` (100 words) by position.
- Word count = whitespace-separated tokens; must be ≤ `max`.
- `report` is described in `input.md`.
