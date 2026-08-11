# Qtrly Plan Agent

LFX Marketing OS **Quarterly Plan Agent** — helps a Linux Foundation ED/Project Leader and their marketing leader run the quarterly review cycle and build a Google Slides-ready quarterly marketing plan deck.

## What it does

Walks through five phases, suggesting values from data and confirming each with you:

1. **Context** — project, quarter, initial plan vs. quarterly review, prior plan, foundation docs (Brand Kit, Message Foundation, ICP)
2. **Review** — pulls project health, marketing impact, events, education, and membership data from LFX; presents a Review Snapshot for confirmation; asks you for any numbers it can't find
3. **Direction** — increase / hold / deemphasize across the six business outcomes (event attendance, event sponsorship, education, membership, awareness, adoption), plus budget and constraints
4. **Goals** — proposes ranked goals (count is your choice), each with a business-outcome alignment, quarterly KPI + baseline, budget, timeline, and risks; you accept, edit, or replace each
5. **Deck** — builds a ~10–14 slide .pptx (PyTorch-plan style), self-reviews against a quality rubric, and delivers it

Scope is the ED/PL decision layer only: outcomes and goals. Campaign definition is handed off to the cross-functional team.

## How to run

Say: **"Build my quarterly marketing plan for [project]"** or **"Run the quarterly plan agent"**.

## Requirements

- **LFX connector** (recommended) — project health, membership, and marketing data. Without it, the agent asks you for all figures.
- **Google Drive connector** (optional) — finds foundation docs and uploads the deck for Google Slides.
- **HubSpot connector** (optional) — email/campaign performance in the Review phase.

## Output

`[Project] Q[N] [Year] Marketing Plan.pptx` in your working folder — imports cleanly into Google Slides. The approved deck is the input to the CFT's campaign definition and to next quarter's review.
