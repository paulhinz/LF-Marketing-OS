---
name: "create-content-pitch-deck"
description: "Create a pitch deck or sales deck for a Linux Foundation project on its presentation template, from its message house and brand kit: one message per slide, notes kept out of the shared file."
---

# Create content: pitch or sales deck

Read the shared rules first: the content-core skill. Follow its step 1 (brief, guided or your own prompt, and cancel), step 2 (sources of truth, including references and, when it exists, curated content), 2a (companions), 3 (plan), 4 (voice and the clean asset), 5 (build and accessibility), 6 (self-review), 7 (the asset and its separate metadata record), 7a (revise, edit and delete) and 9 (hygiene). This skill adds only what is specific to a pitch deck or sales deck.

## What is specific to a deck

- one message per slide, headlines under ten words in sentence case, a clear arc (problem, what the project is, proof, what members or users get, how to join, one ask). Speaker notes belong in a separate internal notes file, not in the shared deck.
- Build on the project's own presentation template (lfx-mos-brand-positioning:presentation-template) when it exists; otherwise use the host's slide type, or a .pptx only if one is asked for by name. Never recreate a template from scratch if one exists.
- Text at 10 pt or larger, a real title on every slide, alt text on images, a header row on tables, https links, and no looping motion (core step 5).
- Hidden or blank slides, and speaker notes, never travel in the shared file. Put notes in a separate internal file and list it under internal_files in the record.
- Plan first (core step 3): the slide titles and which message-house element and proof point goes on each.

## Copy-ready brief

```
Create a pitch deck with the Marketing OS create-content-pitch-deck skill.

Project: [project name]
Audience: [e.g. prospective Premier members, developers, press]
Goal: [what the audience should decide or do afterwards]
Call to action and link: [e.g. join as a member]
Slide count: [e.g. 10 to 12]
Facts to include: [with a source and date for each; or leave blank to use the key numbers]
Anything to avoid: [topics, partner names, claims]
Sources and references (optional): [links, uploaded files, pasted text]

Use the project's presentation template, message house and brand kit.
Give me a one-screen plan (slide titles and the message-house element on each) first, then the deck.
Return status, sources, anything to confirm, and speaker notes as a separate internal file, not in the deck.
```
