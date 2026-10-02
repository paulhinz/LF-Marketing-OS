# Budget model: Strategy Profile first, then the split

Source: "MARKETING PROGRAMS: LF_Marketing_Services_Matrix" (Google Sheet `1e8n7fmg97RePZto4OH0AXnO8E24heCFeWG39LRXuOug`), tabs *Pricing based on Strategy Profile*, *Flat Pricing*, *MODELED*; and the Strategy deck slide "Budgets to Support Planned & Opportunistic Execution". The sheet is the system of record — re-read it each run in case the percentages move.

## Step 1 — The ED chooses a Strategy Profile

The total marketing budget is a percentage of the foundation's annual membership revenue:

| Strategy Profile | Total marketing budget (% of revenue) | Paid spend (% of the total) |
|---|---|---|
| Conservative Growth | 12% | 30% |
| Aggressive Scale | 20% | 40% |
| Hyper-Growth / High-CAC | 30% | 50% |

Revenue base: use LFX `memberships by=tier` list-price revenue as the draft base and label it "list price"; ask the ED (YOUR INPUT) to confirm the revenue figure finance will use. Foundations under $500K revenue are on the Marketing OS tier (self-serve, $0 fee) and the Strategy Profile math still applies to whatever they fund themselves.

## Step 2 — Paid spend is pre-set by the profile

Paid = Total × paid share. Paid spend is defined in the plan by medium (search, social, retargeting, third-party newsletters, event promotion) and carries the ad-management pass-through (20% of spend; 15% above $250K/yr) at cost.

## Step 3 — The remainder is split (LF defines the proportions)

Remainder = Total − Paid. Draft split until LF confirms:

| Bucket | Draft share of remainder | What it covers |
|---|---|---|
| LF marketing services / headcount | 60% | fractional or dedicated marketing lead, marcomms/PR, social, creative, web, ops |
| Third-party content development | 20% | research reports, case studies, video, localization, agency copy |
| Discretionary reserve | 20% | HOT campaigns (72-hour response to news, releases, viral posts) and EVERGREEN activities (social, newsletter, inbound, SEO/AEO) |

Planned campaign spend = Paid + Third-party content. Discretionary = the reserve. Everything discretionary is reported in the QBR.

## Step 4 — Allocate the total across the business-outcome goals

Each goal takes a percentage of the total (not of paid alone). Start from the stage defaults in `business-outcomes.md §Stage`, adjust for the foundation, and show the $ at the chosen profile. The percentages must sum to 100.

## Cross-check — Flat pricing (what LF would charge for the marketing service)

| Tier | Revenue band | Marketing fee |
|---|---|---|
| Marketing OS | < $500K | $0 (funded from G&A) |
| LF Marketing Program | $500K – $1M | $75K + 4% of revenue |
| LF Marketing Program | $1M – $3M | $150K + 4% of revenue |
| LF Marketing Department | > $3M | $300K + 4% of revenue, capped at $600K |

Print the flat fee next to the "LF marketing services / headcount" bucket. When the fee exceeds the bucket at the chosen profile, flag it on the slide: the ED either moves up a profile, LF reduces the service scope, or the split changes. That reconciliation is a decision for the interview, not something the agent resolves.

## Worked example (x402 Foundation, list-price revenue $4,075,000 as of 2026-09-30)

| | Conservative 12% | Aggressive 20% | Hyper-Growth 30% |
|---|---|---|---|
| Total | $489,000 | $815,000 | $1,222,500 |
| Paid (30 / 40 / 50%) | $146,700 | $326,000 | $611,250 |
| Remainder | $342,300 | $489,000 | $611,250 |
| LF services / headcount (60%) | $205,380 | $293,400 | $366,750 |
| Third-party content (20%) | $68,460 | $97,800 | $122,250 |
| Discretionary (20%) | $68,460 | $97,800 | $122,250 |
| Flat-pricing fee cross-check | $463,000 (Department tier: $300K + 4%) — exceeds the services bucket at every profile; reconcile | | |

`scripts/budget_model.py --revenue 4075000` reproduces this table.
