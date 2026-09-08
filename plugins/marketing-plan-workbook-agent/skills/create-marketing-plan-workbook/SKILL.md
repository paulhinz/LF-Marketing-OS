---
name: create-marketing-plan-workbook
description: Generates a pre-filled marketing plan workbook (.pptx) for a Linux Foundation project/foundation, modeled on the PyTorch 2026 integrated plan, for the foundation leader to review before a planning interview. Trigger on "create a marketing plan workbook for [foundation]", "build the [foundation] workbook", "run the workbook agent", "prepare the planning workbook for my call with [leader]", or similar requests to prepare a common-marketing-plan discovery document for an LF foundation leader. This is the LFX Marketing OS "Marketing Plan Workbook Agent" (Plan-type agent); its completed workbook is the input to the final marketing plan generation step.
---

# Create Marketing Plan Workbook

Generate a pre-filled, question-driven marketing plan workbook (.pptx, Google Slides-ready) for one Linux Foundation project/foundation. The workbook is sent to the foundation's ED/Project Leader before a planning interview; their answers, captured in the workbook, later feed a second agent that generates the final marketing plan. This is a **Plan-type** agent in the LFX Marketing OS agent landscape (References | Plan | Create | Execute | Monitor); downstream Create/Execute agents consume the plan it enables.

## Model

The workbook mirrors the structure of the reference plan: **"PyTorch Foundation 2026 Marketing Plan — Revised & Integrated"** (Google Slides ID: `1mbXvoZgVxgh-J1LATOz8GaP6Lw4Mpkgxpdgka57cek4`). If reachable, skim it at the start of a run to stay faithful to the current version. Its five parts:

1. **Part I — The Story**: the era/stakes (market data), the stack and the project's place in it, what makes it distinct (competitor table), the "only place to…" positioning.
2. 2. **Part II — The Goals**: five ranked goals, each with a deep-dive; explicit rule that the lower-numbered goal wins conflicts; retired goals named.
   3. 3. **Part III — Message & Audiences**: one messaging house mapped to goals (positioning, key message, proof, sound bite per goal); say/avoid/anchor discipline rules; segment table mapping audiences to goals.
      4. 4. **Part IV — One Plan, One Engine**: today's fragmentation (teams/calendars/reports), the integration fix (shared message/calendar/reporting), H2 anchor-campaign calendar, content engine arcs, amplification mechanics, media mix.
         5. 5. **Part V — Execution**: continuity with current half, team & budget, decisions needed with dates.
           
            6. Every foundation gets this exact skeleton, regardless of size, for comparability.
           
            7. ## Workflow
           
            8. ### Step 1 — Identify the foundation
           
            9. If not given, ask which foundation/project. Confirm the plan year/period (default: next calendar year).
           
            10. ### Step 2 — Pull the data (research before building)
           
            11. Gather from three sources. If a source is unavailable (connector not authorized, file not found), note the gap, proceed, and convert missing data into questions in the workbook.
           
            12. **a. Master foundation spreadsheet** — Google Sheet ID `110bv8q58jjcmRTpZe0meIcR8UuUisJd0FN3lnR_OQMg` ("120 Membership model projects"). Read via the Google Drive connector and extract the foundation's row: ED/PL name, MarCom staff, Events staff, PM/Community, renewal date, SOW status, existing Marketing Plan name/link, H2 Plan Updates, Marketing Budget, Event Marketing Budget, sub-project count, member count, revenue rank, LF Events calendar entries, and notes.
           
            13. **b. Past marketing plan(s)** — Using the plan name/link found in the master spreadsheet, search Google Drive (`search_files`) for the foundation's current marketing plan and any H2 update, and read them. Extract: last period's goals and outcomes, messaging/positioning used, audience segments, campaign calendar, budget actuals, team, and anything flagged as retired or unresolved.
           
            14. **c. LFX metrics** — Via the LFX connector: call `read_lfx_standard_metrics_guidance` / `read_lfx_semantic_layer_guidance` first, then query for the foundation (find its project via `search_projects`): contributing organizations (total and trend by year), active members and membership trend, sub-project counts, meeting/committee activity, and any marketing-impact or project-health metrics available. Use these as draft baselines for goals and as proof points for the story.
           
            15. **d. Market context (optional but recommended)** — One or two web searches for the foundation's technology domain to draft Part I stakes data (market size, growth, a supporting analyst/exec quote). Mark all such figures as drafts to verify.
           
            16. ### Step 3 — Generate the workbook (.pptx)
           
            17. Read the pptx skill (SKILL.md) before building. Build one deck named:
           
            18. `[Foundation] [Year] Marketing Plan Workbook — DRAFT v1.pptx`
           
            19. **Workbook conventions (apply throughout):**
            20. - **Draft everything.** For every section, write a best-guess draft from the pulled data so the leader edits rather than writes. Tag each drafted slide with a visible badge: `DRAFT — CONFIRM OR CORRECT`.
                - - **YOUR INPUT slides.** Every part ends with 1–2 clearly marked `YOUR INPUT` slides: lettered questions with empty answer boxes the leader types into. Keep questions specific and answerable in a sentence or two.
                  - - **Unknowns become questions.** Anything the data couldn't establish appears as a question, never as an invented fact. Cite sources on data slides (LFX, past plan name, master spreadsheet, web source).
                    - - **Slide notes carry provenance**: where each pre-filled figure came from, so the interview can challenge it.
                     
                      - **Deck outline (~25–32 slides):**
                      - 1. Cover: foundation name, "[Year] Marketing Plan Workbook", status DRAFT, date.
                        2. 2. "How to complete this workbook": explains the leader reviews drafts, corrects them, and answers the YOUR INPUT boxes before the interview call; estimated time 45–60 minutes; who to contact (the user).
                           3. 3. **Part I — The Story** (drafted stakes data, stack/position, distinction table vs. adjacent orgs, "only place to…" positioning). YOUR INPUT: What is the era-level story only your project can tell? Who are your true alternatives, and what can they not claim? What would you put on the positioning slide in one sentence?
                              4. 4. **Part II — The Goals** (five drafted, ranked goals with baselines from LFX + past plan; one deep-dive slide per drafted goal where data supports it; note any goal from the old plan proposed for retirement). YOUR INPUT: Confirm or re-rank the five goals; give the one number per goal that defines success; name anything to retire.
                                 5. 5. **Part III — Message & Audiences** (drafted messaging house table mapped to goals; say/avoid/anchor; segment×goal matrix). YOUR INPUT: sound bite per goal in the leader's own words; the one primary audience per goal; anything on the avoid list.
                                    6. 6. **Part IV — One Plan, One Engine** (inventory of current teams/calendars/reports from spreadsheet roster; drafted anchor moments from the LF Events calendar; amplification/member-committee opportunities; media mix). YOUR INPUT: which teams market this project today and where do the seams show; the 3–4 anchor moments of the year; which member companies would amplify.
                                       7. 7. **Part V — Execution** (team roster and budget lines from the master spreadsheet; drafted decisions-needed list with dates). YOUR INPUT: confirm team and budget; name the decisions you need and by when; note constraints.
                                          8. 8. Closing slide: next steps — return the workbook, interview call, final plan generation.
                                            
                                             9. ### Step 4 — Deliver
                                            
                                             10. Save the .pptx to the outputs folder and present it. Summarize in a few sentences: what was pre-filled from which sources, what data gaps became questions, and remind the user of the next steps: (1) send the workbook to the ED/PL named in the master spreadsheet, (2) schedule the interview, (3) after the interview, feed the completed workbook to the final-plan generation agent.
                                            
                                             11. ## Guardrails
                                            
                                             12. - Never fabricate metrics. Draft ≠ invented: drafts must trace to a source or be phrased as a proposal ("proposed target: …").
                                                 - - Do not email or share the workbook with anyone unless explicitly asked; deliver the file to the user.
                                                   - - If asked to run for multiple foundations, process them one at a time (or offer parallel sub-agents), one deck per foundation.
                                                     - - Keep the five-part skeleton identical across foundations; vary content, not structure.
