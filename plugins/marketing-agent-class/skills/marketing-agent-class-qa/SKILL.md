---
name: marketing-agent-class-qa
description: Answers a student's question while they are reviewing The Linux Foundation's "Claude Agent Workshop" course (indicated by a `.marketing-agent-class/state.json` file in the current working folder, or an active conversation about a just-delivered course section). Trigger when the student asks a substantive question about course content — e.g. "why does...", "what if...", "can you explain...", "how would I..." — rather than a "ready to continue" signal. Appends the answer, as 3-5 new slides, to a single running "Marketing Agent Class Questions and Answers.pptx" deck.
---

# Marketing Agent Class — Questions & Answers

Answer one student question at a time, in full, and record it permanently in a single accumulating slide deck so the student keeps a growing reference of everything they asked.

## Step-by-step process

1. **Load context.** Read `.marketing-agent-class/state.json` if present to get the student's `first_name` and which sections (`sections_delivered`) they've seen so far. Read the reference file(s) for those sections (`references/basics-section.md`, `advanced-section.md`, `ancillary-section.md`) for sourced facts relevant to the question — ground the answer in this course's material where it applies, and use general knowledge to fill gaps.
2. **Compose a complete answer**, planned as 3-5 new slides (never fewer than 3, never more than 5, per the course design):
   - Slide 1: a short divider/title slide — "Q: {the student's question, verbatim or lightly cleaned up}"
   - Slide 2: the direct answer in 2-4 bullets.
   - Slides 3-4 (as needed): supporting detail, an example, or a best practice — cite the same sourced material style used in the section decks (source name in parentheses) when drawing on it.
   - Slide 5 (optional, only if genuinely useful): a short "try this next" mini-step the student could do immediately.
   - If the question is simple enough that 3 slides fully answer it, stop at 3 — do not pad to 5.
3. **Find or create the Q&A deck.** Look for `Marketing Agent Class Questions and Answers.pptx` in the student's working/project folder.
   - **If it does not exist**, create it: slide 1 is a title slide, "Marketing Agent Class — Questions & Answers", subtitled with the student's first name if known, then add this question's slides after it.
   - **If it already exists**, open it and append this question's slides at the end. Never remove, reorder, or overwrite any previously answered question — every question the student has ever asked stays in the deck, in the order asked.
4. **Save** the updated deck under the exact same filename, `Marketing Agent Class Questions and Answers.pptx`.
5. **Deliver/re-present** the updated file to the student.
6. **Close the loop.** After answering, remind the student in one line that they can keep reviewing the current section or ask another question, and that saying they're ready will move them on to the next section (handled by the `launch-marketing-agent-class` skill).

## Notes

- Do not advance the course to the next section as part of answering a question — that only happens via an explicit readiness signal, handled by the sibling `launch-marketing-agent-class` skill.
- If no state file exists at all (a question comes in with no course context), still answer helpfully and still create/append to the same Q&A deck — just skip the personalization details you don't have.
- Keep each question's slides visually separated by the divider slide in step 2, so the deck reads as a clear running log rather than one long merged answer.
