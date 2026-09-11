# Quarterly Marketing Review Workbook Agent

LFX Marketing OS **Planning** agent (Plan-type in the References | Plan | Create | Execute | Monitor landscape).

Generates a pre-filled, question-driven **quarterly marketing review workbook** (.pptx, Google Slides-ready) for one Linux Foundation project/foundation. Where the Marketing Plan Workbook looks forward, this workbook looks back: it goes to the foundation's **marketing team** (not the ED) at quarter end, summarizes the prior quarter's outcomes, and prompts the team for the insights the numbers can't carry — what worked, what didn't, which assumptions broke, and what to recommend next.

## Why it exists

For projects the marketing team already knows well, a discovery-style workbook restates known information. What earns trust with EDs and members is showing: what our goals were, how we tracked against them, what worked and didn't — and only then sitting down to plan. This workbook is that retrospective, grounded in the Central LF Marketing Engine Model (Awareness → Value Activation → Outcomes).

## What it does

1. **Pulls the data** — prior-quarter goals from the last plan/quarterly deck, the LF master foundation tracker, LFX metrics (memberships, new members, churn, contributors, contributing orgs, event registrations, training enrollments, social listening), and marketing platform data (HubSpot contacts, email, channel analytics) where connectors are authorized.
2. **Builds the workbook** — an ~18–24 slide deck: **Executive Summary** (goals-vs-actuals scorecard — the "movie trailer" slides lifted into the ED quarterly review), **Business Outcomes**, **Engine Health** (the two stage-to-stage conversions), **Channel Indicators**, **Vehicle Scorecards** (target vs. actual per vehicle run), **Market & Community Signals**, and **Insights & Learnings** (a nine-question retrospective).
3. **Marks every draft** — pre-filled slides carry a `DRAFT — CONFIRM OR CORRECT` badge, slide notes carry data provenance, unreachable systems become labeled blanks ("team to supply from ___"), and each section ends with `YOUR INPUT` questions. No metric is ever fabricated.

## Usage

Say: `create a quarterly marketing review workbook for [foundation]` (e.g., OpenSSF, LF Energy).

## Requirements

- LFX connector (memberships, community, events, training, social listening)
- Google Drive connector (prior plan/goals, master tracker)
- HubSpot connector (new contacts, email metrics) — optional
- Missing connectors degrade gracefully: the gap becomes a labeled blank or a question in the workbook.

## Workflow position

Quarterly Marketing Review workbook (this agent) → marketing team completes it → **input to `marketing-plan-workbook-agent`**, which surfaces the review's Executive Summary at the top of the next plan workbook → the marketing team presents that summary to the Executive Director and marketing leader at the quarterly plan review, so baseline definitions and goals are re-compared against market changes every quarter.

