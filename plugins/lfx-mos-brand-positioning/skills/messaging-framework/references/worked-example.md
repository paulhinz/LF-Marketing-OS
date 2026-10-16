# Worked example: PyTorch Foundation 2026

Source: PyTorch Foundation 2026 Integrated Marketing Plan, as shown in the LF marketing deck ("The messaging framework, filled in"). One house, shared by comms, events and training. Use it to calibrate tone and density, never as content for another project.

## Where the framework sits
Every project gets two documents, produced before its first anchor moment of the year (deliverable #1 of every SOW):

- **A. Integrated marketing plan**: I. the story (the era, the stakes, the stack, the position no one else can claim) · II. five ranked goals, each with a deep dive, a number and the proof it borrows · III. message and audiences (the message house, say / avoid / anchor rules, segments mapped to goals) · IV. one plan, one engine (shared calendar of anchor moments, content arc per moment, media mix) · V. execution (team, budget, continuity, decisions needed with dates).
- **B. Messaging framework**: vision → mission → positioning platform → tagline; value propositions and key messages per goal; proof points under every message; sound bites; say / avoid / anchor; shelf-life from short (campaign) to medium (annual plan) to long (mission).

This skill produces B, plus the message house and segments that section III of A needs. It does not produce the plan's goals, calendar or budget; it reads them when they're in the sources.

## Positioning
> The intelligence layer of AI is open: the PyTorch Foundation is the only place to build, train and serve AI on any chip, any cloud — under governance no vendor controls.

## Goal columns

| | Events · Goal 1 | Adoption · Goal 2 | Community · Goal 3 | Membership · Goal 4 |
|---|---|---|---|---|
| Key message | PyTorch Conferences are the open AI community's town square, where what's next gets decided. | The market has standardized on PyTorch Foundation projects: central, neutral and safe. | Skills and contributions come from the source, from first PR to maintainer. | Members sustain and invest in growing the ecosystem. |
| Proof | EU (631) and India (500) sold out · CFP +31% · 47+ articles from PTC EU | 80% of Hugging Face training · every accelerator's backend · 36.7K contributing orgs | Docathon: 260 registered → 150 merged PRs · 10.7K on Slack · 22 university associates | 46 members · 13 Platinum · 8 new in 2026 · committee seats and kits |
| Sound bite | "Where open AI decides what's next." | "Nobody gets fired for standardizing on PyTorch." | "From first PR to maintainer." | "Your AI stack is built here. Have a seat at the table." |

Goal 5 (grow our audience) has no column of its own: every column grows the audience when members amplify it.

## As JSON (excerpt)

```json
{
  "positioning": "The intelligence layer of AI is open: the PyTorch Foundation is the only place to build, train and serve AI on any chip, any cloud — under governance no vendor controls.",
  "goals": [
    { "id": "events", "n": 1, "t": "Events",
      "key": "PyTorch Conferences are the open AI community's town square, where what's next gets decided.",
      "proof": [["PyTorch Conference EU (631) and India (500) sold out", "Plan"], ["CFP submissions up 31%", "Plan"], ["47+ articles from PyTorch Conference EU", "Plan"]],
      "bite": "Where open AI decides what's next.",
      "icps": ["[ICP ids]"] },
    { "id": "membership", "n": 4, "t": "Membership",
      "key": "Members sustain and invest in growing the ecosystem.",
      "proof": [["46 members, 13 at Platinum", "Plan"], ["8 new members in 2026", "Plan"]],
      "bite": "Your AI stack is built here. Have a seat at the table.",
      "icps": ["[ICP ids]"] }
  ],
  "crosscut": "Goal 5 (grow our audience) has no column of its own: every column grows the audience when members amplify it.",
  "anchor": ["Which goal does this serve?", "Which segment is it for?", "Which key message does it carry?"]
}
```

## What to notice
- Each key message is a belief, stated plainly. The sound bite is the same idea, compressed until it's repeatable.
- Proof is numbers, with the source's own units. No adjectives standing in for evidence.
- The positioning names a layer (the intelligence layer of AI), a unique claim (the only place, any chip, any cloud) and the reason to believe it (neutral governance).
- The value proposition per column (not shown on the slide) is the benefit to the audience; the key message is what we want them to believe. Keep both.
- ICPs are not on the slide. Each project's ICPs map to these columns: an ICP named in a column's `icps` is who that column's message is for.
