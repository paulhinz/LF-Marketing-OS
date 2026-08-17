# Matching and scoring rubric

Score every ambassador × session pair 0–100, then assign greedily from the highest score down, subject to the coverage rules.

## Scoring

| Signal | Points | Notes |
|---|---|---|
| Ambassador is a speaker on the session | +100 | Always assign; becomes their "own session" slot |
| Expertise area matches session track or title keywords | +40 | Use the enriched expertise field; fall back to job-title inference |
| Expertise matches session description keywords | +20 | Weaker than track match |
| Speaker works at the ambassador's employer | +25 | Natural amplification and tagging story |
| Session is a keynote or marquee (sponsored, AMA, project maintainer track for their project) | +15 | Anchors reach |
| Campaign priority match (user-specified tracks/announcements) | +20 | From Step 0 priorities |
| Ambassador's preferred platform aligns with content type (e.g., video-friendly ambassadors → keynote reaction videos) | +10 | Only if preference data exists |

Penalties:

| Condition | Points |
|---|---|
| Time conflict with the ambassador's own speaking slot | disqualify |
| Session already has 2 assigned ambassadors (non-keynote) | disqualify |
| Same ambassador already assigned another session in the same hour | −50 |
| All of the ambassador's assignments landing on one day | −15 on additional same-day candidates |

## Coverage rules

1. Every ambassador receives exactly the configured number of assignments (default 3). If scores are thin, fill with community assignments: booth visits, project pavilion, hallway-track video, attendee interview.
2. Prefer breadth: after each assignment round, re-sort so ambassadors with fewer assignments pick first.
3. Keynotes may take up to 5 ambassadors (assign different angles: live-tweet, reaction video, LinkedIn analysis, quote graphic suggestion, recap thread).
4. Flag uncovered high-priority sessions in the run summary as "coverage gaps" rather than force-assigning poor matches.

## Tie-breaking

Equal scores: prefer the ambassador with fewer total assignments, then the one whose employer is an event sponsor (checkable via LFX event sponsorship data through `query_lfx_lens`), then alphabetical for determinism.
