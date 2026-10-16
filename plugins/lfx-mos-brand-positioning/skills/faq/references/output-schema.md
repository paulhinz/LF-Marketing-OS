# Output schema (faq, report)

```json
{
  "faq": [
    ["About <project>", [
      ["What is <project>?", "Answer in one to three sentences.", "Website"],
      ["A question the sources don't answer?", null, null]
    ]],
    ["Membership and governance", [
      ["Who are the members?", "…", "Press release"]
    ]]
  ],
  "report": { "sources_read": [], "sources_failed": [], "gaps": ["A question the sources don't answer?"], "notes": "" }
}
```

Rules
- `faq` is an array of `[groupName, questions]`; each question is `[question, answer | null, source | null]`. A `null` answer means "needs an answer from the team" and always has a `null` source.
- 3–4 groups, 8–10 questions in total.
- Source labels: `Website`, `Press release`, `Deck`, `Docs`, `Plan`, `LFX field`.
- `report` is described in `input.md`.
