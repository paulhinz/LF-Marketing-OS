# Member 360 scoring model

## Activity categories and default weights

| Category | Weight | Primary signals |
|---|---|---|
| Committees & governance | 20% | Seats held vs. entitled; meeting attendance rate; officer roles |
| Events | 20% | Sponsorships (weighted by level), attendance, booth presence |
| Speaking | 15% | Keynotes (3x), talks/panels (1x), accepted CFPs |
| Content & thought leadership | 15% | Case studies (3x), blogs/webinars (1x), whitepaper co-authorship |
| Community programs | 10% | Ambassadors, mentors, certification champions, end-user programs |
| Marketing engagement & social | 20% | Email/campaign engagement (10%), social amplification & mentions (10%) |

Weights must sum to 100%. If a category has no data source available for the run, remove it and redistribute its weight proportionally across the remaining categories; record this in the Method tab. If the user asks to change weights, honor it and record the custom weights in the Method tab.

## Normalization

Raw counts are not comparable across member sizes and tiers. For each category:

1. Compute the raw signal count for the analysis window.
2. Apply recency decay: activity in the most recent quarter counts 1.0x, the quarter before 0.75x, then 0.5x, then 0.25x.
3. Normalize against tier-peer expectations, not the whole roster: a Platinum member is scored against what active Platinum members typically do; a Silver member against Silver peers. Use the roster's own tier medians as the baseline (median = 50 points; 2x median or better = 100; zero = 0; interpolate linearly).
4. Cap each category score at 100.

With fewer than 4 members in a tier, merge adjacent tiers for baseline purposes.

## Engagement tiers

| Total score | Tier |
|---|---|
| 80–100 | Champion |
| 60–79 | Engaged |
| 40–59 | Passive |
| 20–39 | At Risk |
| 0–19 | Dormant |

Trend: compare against the prior run's total score. ▲ = +5 or more, ▼ = −5 or more, — otherwise.

## Gap detection

Report up to 3 gaps per member, in this priority order:

1. **Unused entitlements** — benefits the membership tier includes but the member hasn't used: unfilled board/committee seat, unused event sponsorship or ticket allocations, eligibility for a case study with none published, unclaimed speaking slots. These are the most actionable gaps.
2. **Zero-activity categories** — any category scoring 0 where tier peers score above 40.
3. **Declining categories** — any category down 15+ points vs. the prior run.
4. **Single-threaded relationships** — all activity traces to one individual at the member org (key-person risk).

## Next-best-action routing

Evaluate the rules top-down; the first match assigns the action and owner. Always concretize the action with a real upcoming opportunity (named event, open CFP, scheduled campaign, actual renewal date).

| # | Condition | Owner | Action template |
|---|---|---|---|
| 1 | Renewal ≤ 120 days AND tier At Risk/Dormant | Member Success | Urgent exec-to-exec check-in before renewal; prepare value recap of the window's activity |
| 2 | Renewal ≤ 120 days AND tier Champion/Engaged | Sales | Renewal + upgrade conversation; lead with their engagement highlights |
| 3 | Dormant (any renewal date) | Member Success | Re-onboarding: map new key contacts, book orientation call, connect to one near-term opportunity |
| 4 | Unfilled board/committee seat | Member Success | Seat-activation outreach: propose named candidates from their org |
| 5 | Champion/Engaged with no case study | Marketing | Case study invitation tied to their strongest activity area |
| 6 | Active in committees but zero speaking | Marketing | CFP nudge for the next project event; offer abstract support |
| 7 | Active in events but zero content | Marketing | Co-authored blog or webinar pitched off their event presence |
| 8 | High engagement AND lower membership tier | Sales | Tier-upgrade conversation; engagement already exceeds current tier norms |
| 9 | Single-threaded relationship | Member Success | Multi-thread: get 2+ additional contacts engaged (committee, newsletter, event invite) |
| 10 | Passive, no specific gap dominates | Marketing | Enroll in next quarter's flagship campaign or event push |

## Priority

- **High** — renewal ≤ 120 days, OR (At Risk/Dormant AND membership value in the roster's top quartile).
- **Medium** — At Risk/Dormant otherwise, OR any rule 4–8 match on a top-half-value member.
- **Low** — everything else.
