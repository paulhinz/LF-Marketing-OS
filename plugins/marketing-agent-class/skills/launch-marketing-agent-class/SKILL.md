---
name: launch-marketing-agent-class
description: Launches The Linux Foundation's "Claude Agent Workshop" marketing training course and delivers it as personalized PowerPoint decks, one section at a time. Trigger when the user says "Launch Marketing Agent Class", "launch the marketing agent class", "start the marketing agent class", "run the marketing agent class course", or asks to begin/continue/resume this specific course. Also trigger (without re-asking for the student's name) when a `.marketing-agent-class/state.json` file already exists in the working folder and the student signals readiness to continue (e.g. "I'm ready", "next section", "continue", "let's keep going").
---

# Launch Marketing Agent Class

Deliver the Claude Agent Workshop course: three sections (Basics, Advanced, Ancillary), each shipped as its own personalized PowerPoint deck, delivered one at a time, with student questions answered in a companion Q&A deck (handled by the sibling skill `marketing-agent-class-qa`).

## Session state

Track progress in a small JSON file at `.marketing-agent-class/state.json` inside the current working folder:

```json
{
  "student_name": "Full Name",
  "first_name": "First",
  "sections_delivered": ["Basics"],
  "started_at": "ISO-8601 timestamp"
}
```

Section order is always: `Basics`, `Advanced`, `Ancillary`. Create the `.marketing-agent-class/` folder if it does not exist. Never delete or reset this file mid-course — only append to `sections_delivered`.

## Step-by-step process

1. **Check for existing state.** Read `.marketing-agent-class/state.json` in the working folder if present.
2. **If no state file exists (first run):**
   a. Ask the student conversationally for their name — e.g., "Welcome to the Claude Agent Workshop! What's your name?" Do not use a form; a plain chat question is friendlier here.
   b. Take the first word of their reply as `first_name` (handle titles/prefixes sensibly — e.g. "Dr. Maria Lopez" → "Maria").
   c. Create `.marketing-agent-class/state.json` with `student_name`, `first_name`, `sections_delivered: []`, and `started_at`.
   d. Proceed to step 3 with section = `Basics`.
3. **If a state file exists** and the student has just signaled readiness to continue:
   a. Determine the next section: the first entry in `["Basics", "Advanced", "Ancillary"]` not yet in `sections_delivered`.
   b. If all three are already in `sections_delivered`, tell the student the course is complete — congratulate them by first name, remind them their saved questions (if any) are in "Marketing Agent Class Questions and Answers.pptx", and stop. Do not regenerate any section deck.
   c. Otherwise proceed to step 4 with that section.
4. **Build the section deck:**
   a. Read the matching reference file for the section: `references/basics-section.md`, `references/advanced-section.md`, or `references/ancillary-section.md`. Each file gives a full slide-by-slide outline including guided-example steps and sourced supporting detail.
   b. Replace every `{{first_name}}` token with the student's actual first name.
   c. Use the pptx skill/tool available in this environment to author the deck — one slide per numbered outline item (guided-example "steps" sub-items may be split across more than one slide if a single slide would be too text-heavy). Keep on-slide bullets short; put longer "Detail" text in speaker notes if the tool supports notes, otherwise trim it to one short line on the slide.
   d. Save the file as exactly: `Marketing Agent Class Section {Section Name}.pptx` (e.g. `Marketing Agent Class Section Basics.pptx`) in the student's working/project folder — not the scratch/temp folder.
5. **Deliver the deck** to the student (present the file).
6. **Invite questions and pause.** After delivering, tell the student, in your own words: they can ask any question about this section while reviewing it and it will be answered in a companion "Marketing Agent Class Questions and Answers" deck; when they're ready, they should just say so and you'll move on to the next section. Then **stop and wait** — do not automatically generate the next section. Only proceed to the next section when the student explicitly signals readiness (see the skill's trigger description above).
7. **Update state:** append the delivered section name to `sections_delivered` in the state file.
8. **Repeat** steps 3-7 for `Advanced`, then `Ancillary`, each time triggered by the student's next "ready to continue" signal — never all at once.

## Notes

- If the student asks a substantive question about course content at any point (instead of signaling readiness), let the sibling skill `marketing-agent-class-qa` handle it — do not answer it inline as part of this skill and do not advance to the next section.
- If the student wants to restart with a different name in the same folder, only do so if they explicitly ask to restart; otherwise keep using the existing state file's name.
- Never overwrite a previously delivered section's pptx file when regenerating for a later section — each section has its own distinct filename.
