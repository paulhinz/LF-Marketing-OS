# Member 360 — LFX Marketing OS

Scores each LF project member's engagement across events, speaking, ambassadors, committees, content, and marketing activity. Identifies gaps and recommends the next best action for Marketing, Member Success, or Sales. Outputs a ranked spreadsheet built for quarterly business reviews.

## Who it's for

Executive Directors, Project Leaders, and LF marketing team members. Run it semi-regularly — typically before each QBR.

## How to run it

Say: **"Run Member 360 for [project]"** (e.g. "Run Member 360 for CNCF").

The agent will:

1. Pull the member roster from LFX (tier, value, renewal dates, key contacts).
2. Collect activity per member across six categories: committees and governance, events, speaking, content, community programs, and marketing/social engagement.
3. Score each member 0–100 (recency-weighted, normalized against membership-tier peers) and assign an engagement tier: Champion, Engaged, Passive, At Risk, or Dormant.
4. Flag gaps — unused entitlements first (unfilled board seats, no case study, unclaimed benefits).
5. Recommend one specific next action per member, owned by Marketing, Member Success, or Sales, with a priority driven by renewal proximity and membership value.
6. Deliver `Member360_[Project]_[Quarter].xlsx` with six tabs: Summary, Member Ranking, Category Detail, Actions by Team, Evidence, and Method.

Keep prior quarters' output files in your working folder — the agent uses them to show quarter-over-quarter trends.

## Data sources

Requires the **LFX connector**. Optional but improves coverage: HubSpot, social listening (LFX Lens/Octolens), Google Drive, and any spreadsheets you keep for event sponsors, speaking, or ambassadors (you'll be invited to attach them at the start of a run). Missing sources are excluded from scoring and disclosed in the report — nothing is guessed.

## Origin

Proposed by Jen Royal-Jones: "Pull together each LF Project member's activity across events, speaking, ambassadors, committees, blogs/case studies, and other marketing engagement. Score the member, identify gaps, and recommend the next best action for Marketing, Member Success, or Sales."
