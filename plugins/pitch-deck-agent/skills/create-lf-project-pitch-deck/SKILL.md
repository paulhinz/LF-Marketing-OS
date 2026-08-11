---
name: create-lf-project-pitch-deck
description: >
  This skill should be used when a Linux Foundation membership development rep,
  Executive Director, or Project Leader says "Create pitch deck for [project]",
  "build a membership pitch deck", "make a first-meeting deck for [project]",
  "generate the member recruitment deck", or otherwise asks for a presentation
  to use in a first meeting with a prospective member or other persona they want
  to bring awareness to and build advocacy with. This is the LFX Marketing OS
  "Pitch Deck Agent" (Member Growth, Agent No. 3, 9-Agent category 1: Foundation
  Setup). Produces one standard, on-brand, on-message deck of no more than 20
  slides per project, Google Slides-ready, plus a prospect-specific speaker-notes
  prep brief.
metadata:
  version: "0.1.0"
  department: "Member Growth"
  agent-no: "3"
  nine-agent-alignment: "1 - Foundation Setup"
---

# Create LF Project Pitch Deck

Generate the standard first-meeting membership pitch deck for a Linux Foundation project or foundation. One standard deck per project — do NOT build fully custom per-prospect decks. Prospect-specific context goes into speaker notes and the prep brief only.

The deck must accomplish four goals, in order: grab attention (show deep understanding of the prospect segment's business challenges), explain value (a clear membership value proposition), build trust (social proof, data, case studies), and inspire action (one clear next step).

## Step 1 — Identify the project and gather foundational inputs

Determine the project name from the user's request. Then locate the three foundational documents, in priority order:

1. **Brand Kit** (or a link to brand guidelines) — colors, logo use, voice
2. **Message Foundation doc** — locked summaries, boilerplate, elevator pitch, messaging pillars, proof points
3. **ICP & Target Markets doc** — personas, segments, pain points, fit scoring

Look for them as conversation attachments, in the connected working folder, or in the project's Google Drive folder (via the Google Drive connector if connected). If a document can't be found, ask the user to attach it or provide a link.

**Fallback:** if some or all foundational docs are missing, do not invent positioning. Ask the presenter the key questions in `references/key-questions.md` — a minimum of 3 and a maximum of 7, selecting only the questions whose answers are not already covered by whichever docs exist. If no foundational docs exist AND the user declines to answer the questions, stop and explain that the deck cannot be responsibly generated without positioning inputs.

## Step 2 — Optional prospect research (speaker notes only)

If the user named a prospect company, gather read-only context to personalize the presenter's prep — never the slides themselves:

- **HubSpot** (if connected): the prospect's company record, deal stage, prior touchpoints
- **LFX** (if connected): whether the prospect's org already contributes to or uses the project
- **Web research**: the prospect's business, recent news, strategic priorities, likely pain points

Map findings to the ICP persona pain points. Every stat gathered must carry a source so the presenter can verify it.

## Step 3 — Draft the deck against the standard outline

Read `references/standard-outline.md` and follow it exactly: four acts, 18 content slides, slides 19–20 reserved for appendix/backup. Never exceed 20 slides. Apply Kawasaki's 10/20/30 discipline: ~20 minutes of material, no font below 30pt, dark title slide.

Content rules:

- Use the Message Foundation's locked summary/boilerplate language verbatim where the outline calls for it
- One messaging pillar per slide; answer the prospect's "so what?" on every slide
- Stay at 1,000 feet — no deep technical dives
- Every quantitative claim must have a stat or citation (LFX data, case studies, or sourced web research)
- Case-study slides may use existing approved case studies and member quotes only — never fabricate quotes or use member names without prior approval
- Write a speaker-notes prep brief into the slide notes: talking points per slide, prospect-specific pain-point mapping (from Step 2), and the recommended ask

Build the deck using the pptx skill (widescreen 16:9), applying the Brand Kit's colors, fonts, and logo treatment.

## Step 4 — Self-review loop (max 3 cycles)

Score the draft against `references/quality-rubric.md`. If any criterion fails, revise and re-score. Hard stop: after 3 revision cycles, stop and present the best draft to the user with a plain list of which rubric criteria are still failing — do not keep looping.

## Step 5 — Deliver behind the human gate

Save the finished .pptx to the user's working folder and present it together with the rubric scorecard (which criteria passed, and any flagged items). State clearly that the deck is a draft pending the presenter's review and approval — the presenter (ED/PL or membership rep) is the mandatory approver before any prospect-facing use.

For Google Slides delivery: if a Google Drive connector with write access is available, upload the .pptx to the project's Drive folder (it opens natively in Google Slides); otherwise tell the user to upload the .pptx to Google Drive and open with Google Slides — the format imports cleanly.

Never send the deck to a prospect, never share it externally, and never write to HubSpot or LFX.

## Boundaries (what this skill does NOT do)

- No per-prospect custom decks — one standard deck per project, refreshed on request
- No membership pricing/terms negotiation content beyond the published tier matrix
- No new member quotes or logos without existing approval
- No external sending or publishing of any kind
