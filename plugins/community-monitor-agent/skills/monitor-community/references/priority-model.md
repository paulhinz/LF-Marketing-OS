# Priority model

How to decide which community items matter and in what order. Compute three signals per item, then combine into a tier.

## 1. Question / urgency signal

Classify each item:

| Class | Signals | Base urgency |
|---|---|---|
| Blocked user | "can't", "broken", "stuck", "blocking us", production issue, failed install/deploy | High |
| Bug report | Reproduction steps, error output, GitHub issue with bug label | High |
| Direct question | Question mark, "how do I", "is there a way", "does [project] support" | Medium |
| Decision-seeking | Asking about roadmap, licensing, governance, membership | Medium |
| Feedback / opinion | Suggestion, complaint without a question | Low |
| Praise / announcement | Positive share, release congratulation | None (amplification candidate) |

Items with no class and no question are FYI only.

## 2. Sentiment

Score from the text and thread tone:

- **Negative / frustrated** (−2): anger, sarcasm, repeated follow-ups with no answer, threat to leave or switch tools. Raises urgency one step.
- **Concerned** (−1): worried, confused, disappointed. Slight raise.
- **Neutral** (0): plain question.
- **Positive** (+1): enthusiastic, grateful. Not a response priority; note as amplification opportunity in the report footer.

An unanswered question older than 24 hours gets an automatic −1 sentiment step (silence reads as neglect).

## 3. Asker value (0–100)

Two components, evidence recorded for both. Use only real data; if neither component can be verified, score 20 (unknown) and label it "unverified".

**Community activity (0–50)**

- Committee or board seat on the project (LFX `search_committee_members`): +30
- Maintainer/ambassador/speaker or repeat contributor (GitHub history, LFX records): +20
- Attended project meetings in the last 90 days (`search_past_meeting_participants`): +10
- First-time poster with no history: +5 (new-contributor experience still matters)

Cap at 50.

**Member-company association (0–50)**

Match the asker to a company: Slack profile company field, email domain, GitHub profile org — then match the company to project membership (`search_members`, `search_b2b_orgs`, `get_member_membership`).

- Platinum/strategic member: +50
- Gold: +40
- Silver: +25
- General/associate member: +15
- Known prospect (in pipeline, if the user has said so): +20
- No member association: +0

Take the higher of tier and prospect, cap at 50.

## 4. Priority tier

| Tier | Rule |
|---|---|
| **P1 — respond today** | High urgency AND (negative sentiment OR asker value ≥ 50); or any item where a Platinum member contact is blocked |
| **P2 — respond this week** | Medium/High urgency with asker value ≥ 30, or negative sentiment from anyone |
| **P3 / FYI** | Everything else that's a question or feedback |
| **Amplify** | Positive items worth resharing (route to the LinkedIn Post Agent) |

"High value asker" for auto-draft purposes (respond mode) = asker value ≥ 50, or ≥ 30 with negative sentiment.

## 5. Tie-breaking and honesty rules

- Within a tier, sort by sentiment (most negative first), then asker value, then age (oldest first).
- Show the evidence behind every value score in the report (e.g. "Gold member — Acme Corp; TAC member since 2024"). Never present an inferred company match as certain — mark domain-only matches "likely".
- Answered items (a maintainer already replied substantively) are excluded from response queues but counted in the digest.
