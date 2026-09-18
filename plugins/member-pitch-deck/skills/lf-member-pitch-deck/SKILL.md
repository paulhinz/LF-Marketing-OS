---
name: lf-member-pitch-deck
description: >
  This skill should be used when a Linux Foundation membership development rep,
  Executive Director, or Project Leader says "lf-member-pitch-deck",
  "Create pitch deck for [project]", "build a member pitch deck for [project]",
  "make a first-meeting deck for [project]", "generate the member recruitment
  deck", or otherwise asks for a presentation to use in a first meeting with a
  prospective member or other persona they want to bring awareness to and build
  advocacy with. This is the LFX Marketing OS "Member Pitch Deck" agent (Member
  Growth, Agent No. 3, 9-Agent category 1: Foundation Setup). Produces one
  standard, on-brand, on-message deck of no more than 20 slides per project,
  always built on the bundled LF 2025 Google Slides template (.pptx, opens
  natively in Google Slides), plus a prospect-specific speaker-notes prep brief.
metadata:
  version: "1.0.0"
  department: "Member Growth"
  agent-no: "3"
  nine-agent-alignment: "1 - Foundation Setup"
  template: "LF 2025 Template (Google Slides id 1gOJakd6SdB7MLGflP-B0TVqsVU5lq-HGjI1TH4boCe8)"
---

# LF Member Pitch Deck

Generate the standard first-meeting membership pitch deck for a Linux Foundation project or foundation. One standard deck per project — do NOT build fully custom per-prospect decks. Prospect-specific context goes into speaker notes and the prep brief only.

The deck must accomplish four goals, in order: grab attention (show deep understanding of the prospect segment's business challenges), explain value (a clear membership value proposition), build trust (social proof, data, case studies), and inspire action (one clear next step).

**Formatting is not a choice.** Every deck is built on the LF 2025 Template bundled at `assets/LF-2025-Template.pptx` by running `scripts/build_deck.py`. The script uses only the template's own slide layouts, so fonts, sizes, colors, the LF logo, the gradient footer bar and slide numbers all come from the template. Do not build the deck with the generic pptx skill, do not start from a blank presentation, and do not override the template's fonts, sizes or colors.

## Step 1 — Identify the project and gather foundational inputs

Determine the project name from the user's request. Then locate the three foundational documents, in priority order:

1. **Brand Kit** (or a link to brand guidelines) — voice, terminology, logo file, prohibited terms
2. **Message Foundation doc** — locked summaries, boilerplate, elevator pitch, messaging pillars, proof points
3. **ICP & Target Markets doc** — personas, segments, pain points, fit scoring

Look for them as conversation attachments, in the connected working folder, or in the project's Google Drive folder (via the Google Drive connector if connected). If a document can't be found, ask the user to attach it or provide a link.

**Fallback:** if some or all foundational docs are missing, do not invent positioning. Ask the presenter the key questions in `references/key-questions.md` — a minimum of 3 and a maximum of 7, selecting only the questions whose answers are not already covered by whichever docs exist. If no foundational docs exist AND the user declines to answer the questions, stop and explain that the deck cannot be responsibly generated without positioning inputs.

**Brand Kit and the template:** the LF 2025 Template sets the visual system (Open Sans, LF navy/blue/cyan, LF logo footer). The project's Brand Kit supplies the project logo (placed in picture placeholders), voice, terminology and approved imagery. It never overrides the template's layouts, fonts or colors.

## Step 2 — Optional prospect research (speaker notes only)

If the user named a prospect company, gather read-only context to personalize the presenter's prep — never the slides themselves:

- **HubSpot** (if connected): the prospect's company record, deal stage, prior touchpoints
- **LFX** (if connected): whether the prospect's org already contributes to or uses the project
- **Web research**: the prospect's business, recent news, strategic priorities, likely pain points

Map findings to the ICP persona pain points. Every stat gathered must carry a source so the presenter can verify it.

## Step 3 — Draft the deck against the standard outline

Read `references/standard-outline.md` and follow it exactly: four acts, 18 content slides, slides 19–20 reserved for appendix/backup. Never exceed 20 slides. Keep to about 20 minutes of material.

Content rules:

- Use the Message Foundation's locked summary/boilerplate language verbatim where the outline calls for it
- One messaging pillar per slide; answer the prospect's "so what?" on every slide
- Stay at 1,000 feet — no deep technical dives
- At most 5 bullets per body placeholder and about 12 words per bullet; the template's body text is 14–17pt and does not shrink to fit, so overflow means cutting words, not shrinking type
- Every quantitative claim must have a stat or citation (LFX data, case studies, or sourced web research)
- Case-study slides may use existing approved case studies and member quotes only — never fabricate quotes or use member names without prior approval
- Write a speaker-notes prep brief into every slide's `notes`: talking points, prospect-specific pain-point mapping (from Step 2), and the recommended ask

### Building the file

1. Read `references/lf-template-guide.md` to choose a layout key for each slide. The standard outline lists the default layout for every slide; deviate only with a reason.
2. Write a JSON spec (`spec.json`) with one entry per slide — `layout`, `title`, `subtitle`/`bullets`/`left`+`right`/`table`/`image`/`images`, and `notes`. The format is documented at the top of `scripts/build_deck.py`.
3. Run `python3 scripts/build_deck.py spec.json "<Project> Member Pitch Deck.pptx"` (requires `python-pptx`; `pip install python-pptx --break-system-packages` if missing). Fix any error the script reports (unknown layout key, more than 20 slides, missing image) and rerun.
4. Render the result to images (`soffice --headless --convert-to pdf` then `pdftoppm -png`) and look at every slide: no text overflowing a placeholder, no empty "click to add" boxes, images filling their placeholders, the LF footer present on content slides.

Charts: build them as PNGs (matplotlib, template palette: navy `#003778`, blue `#0094FF`, cyan `#12E2E2`, dark `#100F18`, gray `#EEEEEE`, Open Sans or Arial) and place them with the `chart` layout. Logo walls use the `logos` layout with up to 4 square images per slide.

## Step 4 — Self-review loop (max 3 cycles)

Score the draft against `references/quality-rubric.md`. If any criterion fails, revise the spec, rebuild and re-score. Hard stop: after 3 revision cycles, stop and present the best draft to the user with a plain list of which rubric criteria are still failing — do not keep looping.

## Step 5 — Deliver behind the human gate

Save the finished .pptx to the user's working folder and present it together with the rubric scorecard (which criteria passed, and any flagged items). State clearly that the deck is a draft pending the presenter's review and approval — the presenter (ED/PL or membership rep) is the mandatory approver before any prospect-facing use.

For Google Slides delivery: if a Google Drive connector with write access is available, upload the .pptx to the project's Drive folder (it opens natively in Google Slides and keeps the LF 2025 Template theme); otherwise tell the user to upload the .pptx to Google Drive and open with Google Slides.

Never send the deck to a prospect, never share it externally, and never write to HubSpot or LFX.

## Boundaries (what this skill does NOT do)

- No per-prospect custom decks — one standard deck per project, refreshed on request
- No decks off-template: no blank-canvas builds, no other themes, no font/color overrides
- No membership pricing/terms negotiation content beyond the published tier matrix
- No new member quotes or logos without existing approval
- No external sending or publishing of any kind

## Updating the template

If the LF 2025 Template changes in Google Slides, export it (File → Download → Microsoft PowerPoint, or the Drive connector's `download_file_content` with the pptx export MIME type), replace `assets/LF-2025-Template.pptx`, rerun a test build, and bump this plugin's version. Layout names inside the template must stay the same or `scripts/build_deck.py` and `references/lf-template-guide.md` must be updated to match.
