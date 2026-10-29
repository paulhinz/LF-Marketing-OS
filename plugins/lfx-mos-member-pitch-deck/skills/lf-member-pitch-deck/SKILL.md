---
name: lf-member-pitch-deck
description: >
  This skill should be used when a Linux Foundation membership development rep,
  Executive Director, or Project Leader says "lf-member-pitch-deck",
  "Create pitch deck for [project]", "build a member pitch deck for [project]",
  "make a first-meeting deck for [project]", "build the membership overview for
  [foundation]", "generate the member recruitment deck", or otherwise asks for a
  presentation to use in a first meeting with a prospective member or other
  persona they want to bring awareness to and build advocacy with. This is the
  LFX Marketing OS "Member Pitch Deck" agent (Member Growth, Agent No. 3,
  9-Agent category 1: Foundation Setup). Produces one standard, on-brand,
  on-message membership overview deck of no more than 22 slides per project in
  the LF membership-overview style (white canvas, project Brand Kit accent and
  fonts, Linux Foundation co-brand lockup), as a .pptx that opens natively in
  Google Slides, plus a prospect-specific speaker-notes prep brief.
metadata:
  version: "2.0.0"
  department: "Member Growth"
  agent-no: "3"
  nine-agent-alignment: "1 - Foundation Setup"
  reference-deck: "x402 Pitch Deck v1 (Member Growth rebuild, Oct 2026 — Google Slides id 1FN7mNFw1Ws3l7JsrLd3eo0x0vgOqDPp6Fb4GHzCkzCk)"
---

# LF Member Pitch Deck

Generate the standard first-meeting membership deck for a Linux Foundation project or foundation. One standard deck per project — do NOT build fully custom per-prospect decks. Prospect-specific context goes into speaker notes and the prep brief only.

The deck is a **membership overview** told in three parts, the way Member Growth presents it: *About the Linux Foundation* → *Introducing the Foundation* → *How to join as a member*. Within that arc it still has to grab attention (the prospect's problem in their words), explain value (what members get that users don't), build trust (production traction, member logos, leadership, roadmap), and inspire action (tiers, ROI by role, first 90 days, one ask).

**Formatting is not a choice.** Every deck is built by `scripts/build_deck.py`, which fixes the visual system described in `references/lf-template-guide.md` (white canvas, serif display titles, sans body, one Brand Kit accent, light-gray rounded cards, project wordmark bottom-left, "The Linux Foundation | project" co-brand lockup on the title and closing slides). The spec supplies content and Brand Kit tokens only. Do not build the deck with the generic pptx skill, do not start from another theme, and do not add per-slide fonts, sizes or colors. (v1.x built on the LF 2025 dark template; that is retired — see "What changed in v2" at the end.)

## Step 1 — Identify the project and gather foundational inputs

Determine the project name from the user's request. Then locate the three foundational documents, in priority order:

1. **Brand Kit** (or a link to brand guidelines) — accent color, display and body fonts, wordmark (dark-on-light and light-on-dark), symbol/mark, prohibited terms
2. **Message Foundation doc** — vision, mission, strategy pillars, locked summaries, boilerplate, proof points
3. **ICP & Target Markets doc** — personas, segments, pain points in the prospect's vocabulary

Look for them as conversation attachments, in the connected working folder, or in the project's Google Drive folder (via the Google Drive connector if connected). If a document can't be found, ask the user to attach it or provide a link.

Also gather the **membership facts** the deck cannot be built without: tier names, fees (and employee-count bands if fees scale), headline benefits per tier, the LFX enrollment URL (`https://enrollment.lfx.linuxfoundation.org/?project=<slug>`), the membership contact address, current member logos by tier (from the project site's members page or LFX), the Executive Director or project lead (name, title, headshot, two-sentence bio), and the active working groups / roadmap items.

**Fallback:** if some or all foundational docs are missing, do not invent positioning. Ask the presenter the key questions in `references/key-questions.md` — a minimum of 3 and a maximum of 7, selecting only the questions whose answers are not already covered by whichever docs exist. If no foundational docs exist AND the user declines to answer the questions, stop and explain that the deck cannot be responsibly generated without positioning inputs.

**Standard LF assets:** slides 3–5 are the Linux Foundation's own story and use fixed, approved copy (in `references/standard-outline.md`). The "critical projects" logo mosaic must be the current LF-approved image: export it from the latest LF corporate overview deck or request it from LF Creative, and place it at `assets/lf-project-mosaic.png`. If it is unavailable, build that slide as `cards` listing the LF verticals rather than fabricating a mosaic.

## Step 2 — Optional prospect research (speaker notes only)

If the user named a prospect company, gather read-only context to personalize the presenter's prep — never the slides themselves:

- **HubSpot** (if connected): the prospect's company record, deal stage, prior touchpoints
- **LFX** (if connected): whether the prospect's org already contributes to or uses the project
- **Web research**: the prospect's business, recent news, strategic priorities, likely pain points

Map findings to the ICP persona pain points. Every stat gathered must carry a source so the presenter can verify it.

## Step 3 — Draft the deck against the standard outline

Read `references/standard-outline.md` and follow it: three parts, 21 standard slides, a hard cap of 22. Keep to about 20 minutes of material; the tier/ROI/onboarding slides carry the close.

Content rules:

- **Clean slides, sourced notes.** No "Source:" lines, legal-entity footers, or agent attribution on slides. Every figure's source and read date go in that slide's `notes`, and the title slide carries only the foundation name, tagline and month/year.
- Use the Message Foundation's vision, mission and strategy language verbatim on the Vision slide; use its locked summary language for the Foundation / Standard two-column slide.
- One idea per card; cards on the same slide must be parallel in structure and length (the ED flagged "incongruent font between boxes" and "misaligned arrows and boxes" — the builder fixes geometry, you fix parallelism).
- Stay at 1,000 feet — the "How it works" slide is the whole flow in 4 steps, with the technical detail in notes.
- Card body ≈ 25 words; row/step text ≈ 25 words; tier bullets ≤ 5 words; table cells ≤ 18 words. Text does not auto-shrink — overflow means cutting words, not shrinking type.
- **Live counters are stated as defensible rounded figures** ("75M+ transactions / 30 days", not "75.41M") unless the project confirms the exact number is refreshed on a schedule; put the exact figure, source URL and read date in notes. (ED feedback on the x402 deck.)
- Member logos: use the project's published members page or LFX as the source of truth; group by tier; never add a logo that isn't publicly listed.
- Case studies and member quotes, if used in the roadmap or value slides, must be existing approved ones only — never fabricate quotes.
- Write a speaker-notes prep brief into every slide's `notes`: talking points, prospect-specific pain-point mapping (from Step 2), the source line for any figure, and the recommended ask.

### Building the file

1. Read `references/lf-template-guide.md` for the layout keys and `references/example-spec-x402.json` for a complete worked spec.
2. Write `spec.json` with `project` (name, short, logo, logo_dark, mark), `theme` (Brand Kit tokens: accent, display_font, body_font — omit anything the Brand Kit doesn't define), and one `slides` entry per slide. Put project images under `assets/project/` next to the spec.
3. Run `python3 scripts/build_deck.py spec.json "<Project> Member Pitch Deck.pptx"` (requires `python-pptx` and `Pillow`; `pip install python-pptx pillow --break-system-packages` if missing). Fix every `!` warning the script prints (`LONG text block` → cut words; `image not found` → fix the path; `logo wall overflows` → split the group across two slides) and rerun.
4. Render to images (`soffice --headless --convert-to pdf` then `pdftoppm -png`) and look at every slide: no text leaving its card or colliding with the title, cards on a slide visually parallel, arrows centered between steps, no empty boxes, the project wordmark bottom-left on content slides, the LF | project lockup on slides 1 and 21.

## Step 4 — Self-review loop (max 3 cycles)

Score the draft against `references/quality-rubric.md`. If any criterion fails, revise the spec, rebuild and re-score. Hard stop: after 3 revision cycles, stop and present the best draft to the user with a plain list of which rubric criteria are still failing — do not keep looping.

## Step 5 — Deliver behind the human gate

Save the finished .pptx to the user's working folder and present it together with the rubric scorecard (which criteria passed, and any flagged items). State clearly that the deck is a draft pending the presenter's review and approval — the presenter (ED/PL or membership rep) is the mandatory approver before any prospect-facing use.

For Google Slides delivery: if a Google Drive connector with write access is available, upload the .pptx to the project's Drive folder (it opens natively in Google Slides; the fonts resolve there when the Brand Kit names Google Fonts such as Instrument Serif and Inter); otherwise tell the user to upload the .pptx to Google Drive and open with Google Slides.

Never send the deck to a prospect, never share it externally, and never write to HubSpot or LFX.

## Boundaries (what this skill does NOT do)

- No per-prospect custom decks — one standard deck per project, refreshed on request
- No decks off-style: no other themes, no per-slide font/color overrides, no slides without the project wordmark or lockup
- No membership pricing/terms negotiation content beyond the published tier matrix
- No new member quotes or logos without existing approval or public listing
- No external sending or publishing of any kind

## Appendix modules (optional, beyond the 22-slide core)

If the presenter asks for a longer "membership overview" to leave behind (the AAIF and CNCF overview decks are the pattern), build a second file `<Project> Membership Overview — Appendix.pptx` from the modules in `references/standard-outline.md` → Appendix module library (per-tier benefit detail, fee bands with LF-member / non-LF-member columns, governance structure and rosters, working-group charters, events and sponsorship, get-involved, antitrust notice). The core deck stays at ≤ 22 slides.

## What changed in v2 (October 2026)

Rebuilt to match the deck Member Growth produced from the v1 x402 output: the LF 2025 dark template lock is retired in favor of the white, project-branded membership-overview style with the LF co-brand lockup; the outline moved from a four-act pitch to the three-part *About the LF → Introducing the Foundation → How to join* arc with the standard LF opener; card/stat/flow/tier/timeline/logo-wall layouts replaced bullet slides; sources moved from slide footers to speaker notes; the cap rose from 20 to 22. The old template is kept at `assets/legacy/LF-2025-Template.pptx` for reference only.
