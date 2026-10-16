# Output schema (mf, icp, mh, nums, report)

Return one JSON object with these five keys. `mh` and `nums` keep their v0.1 shapes exactly: the presentation-template and one-pager skills read them. `report` is described in `input.md`.

```json
{
  "mf": {
    "vision": "One sentence.",
    "mission": "One sentence.",
    "positioning": "One or two sentences: the layer we own, the claim no one else can make, why it's credible.",
    "tagline": "Short brand line",
    "goals": [
      {
        "id": "events", "n": 1, "t": "Events",
        "vp": "Value proposition, one sentence.",
        "key": "Key message, one sentence.",
        "proof": [["Fact", "Website"], ["Fact", "Plan"]],
        "bite": "Sound bite, 3–10 words.",
        "icps": ["practitioners", "sponsors"]
      },
      { "id": "adoption", "n": 2, "t": "Adoption", "vp": "…", "key": "…", "proof": [["…", "…"]], "bite": "…", "icps": ["…"] },
      { "id": "community", "n": 3, "t": "Community", "vp": "…", "key": "…", "proof": [["…", "…"]], "bite": "…", "icps": ["…"] },
      { "id": "membership", "n": 4, "t": "Membership", "vp": "…", "key": "…", "proof": [["…", "…"]], "bite": "…", "icps": ["…"] }
    ],
    "crosscut": "Goal 5 (grow our audience) has no column of its own: every column grows the audience when members amplify it.",
    "say": ["term", "phrase"],
    "avoid": [["Avoid this", "Use this instead"]],
    "anchor": ["Which goal does this serve?", "Which segment is it for?", "Which key message does it carry?"],
    "notes": "Choices for the reviewer to check."
  },
  "icp": [
    {
      "id": "platform-teams", "name": "Platform engineering teams", "kind": "Organization",
      "who": "One sentence defining the segment.",
      "goals": ["adoption", "membership"],
      "need": "Problem or trigger.",
      "value": "What they get, in their terms.",
      "lead": "Key message to lead with.",
      "proof": [["Fact", "Website"]],
      "cta": "One next action.",
      "channels": ["Channel", "Channel"],
      "objection": ["Likely objection?", "Response, or null"],
      "personas": [["Role", "What they care about"]],
      "basis": "Website"
    }
  ],
  "mh": {
    "umbrella": "One sentence.",
    "line": "Short brand line (= mf.tagline)",
    "pillars": [
      { "t": "Pillar title", "m": "One supporting sentence.", "p": [["Proof point", "Website"], ["Proof point", "Press release"], ["Proof point", "Docs"]] },
      { "t": "…", "m": "…", "p": [["…", "…"], ["…", "…"], ["…", "…"]] },
      { "t": "…", "m": "…", "p": [["…", "…"], ["…", "…"], ["…", "…"]] }
    ],
    "found": "One or two sentences on why now.",
    "aud": [["Audience (ICP name)", "What to lead with (ICP lead)."], ["…", "…"], ["…", "…"], ["…", "…"]]
  },
  "nums": [["10,000+", "short label"], ["40", "member organizations"], ["[00]", "[metric, from LFX]"]],
  "report": { "sources_read": [], "sources_failed": [], "gaps": [], "notes": "" }
}
```

## Field rules
- `mf.goals`: 2–5 columns in rank order; `n` is the goal's rank in the integrated plan (keep gaps, e.g. 1, 2, 4, if a goal was dropped). `id` is one of `events`, `adoption`, `community`, `membership`, or a slug of the plan's own goal name.
- `mf.anchor`: always the three questions shown, in that order.
- `icp`: 4–6 entries. `objection[1]` may be `null`. `basis` is a source label or `"Inferred"`.
- `mh.aud`: exactly four rows.

Source labels: `Website`, `Press release`, `Deck`, `Docs`, `Plan` (the integrated marketing plan), `LFX field`.
