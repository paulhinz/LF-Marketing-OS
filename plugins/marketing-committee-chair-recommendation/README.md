# Marketing Committee Chair Recommendation

LFX Marketing OS agent for Linux Foundation Executive Directors, Program Managers, and their marketing leadership teams.

## What it does

When an open call for a committee chair gets no volunteers, this agent finds the right person to invite personally. It pulls the committee roster and member tiers from LFX, checks each representative's current title and seniority on LinkedIn through your own Chrome browser, scans social listening for members already talking about the project, and delivers a ranked shortlist with the reasoning behind each placement.

It looks for the sweet spot: someone senior enough to bring real marketing experience and organizational weight, but not so senior that they are too busy, and at the career stage where chairing a foundation committee is a visible step toward VP.

## How to use it

Say any of:

- "Recommend a marketing chair for [project]"
- "Nobody applied for chair of the [project] marketing committee, who should we ask?"
- "Rank the [committee] members for chair"
- "Run the committee chair recommendation for [project]"

The agent confirms the project and committee, then delivers:

- **[Project] [Committee] Chair Shortlist** (Google Doc, or an Artifact page): a first ask, a second ask, and a vice-chair recommendation with reasons; a full ranking table of every external member with title, tier, seat and assessment; social listening findings; member companies with no seat on the committee; a suggested approach; and method notes.
- A one-paragraph summary in chat.

Nothing is sent to any candidate. The ED makes the invitation.

## How it ranks

| Factor | What counts |
|---|---|
| Company weight | Membership tier and dues, voting seat, brand, share of real adoption of the project |
| Career stage | Director / Head / Lead is the target band; VPs and C-level are usually too busy, Managers too junior |
| Function | Marketing, product marketing, communications first; partnerships and ecosystem second |
| Visibility | Posts about the project or its space; follower count as a rough reach proxy |
| Relationship | Mutual connections with the requester or LF colleagues, for a warm introduction |

## Requirements

- **LFX Platform connector** (required): projects, committees, rosters, memberships, LFX Lens.
- **Claude in Chrome** (required): LinkedIn title checks in your signed-in browser. Only search-result headlines are read; no profiles are opened.
- **Octolens connector** (optional): 30-day social search on X and LinkedIn.
- **Google Drive connector** (optional): Google Doc output.

Works well alongside `committee-health-agent` (who is inactive) and `member-360` (who is engaged).

## Cadence

Run whenever a chair, vice-chair, or working-group lead seat is open and the call for volunteers has not produced a candidate.
