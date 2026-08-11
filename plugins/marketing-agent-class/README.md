# Marketing Agent Class

A Claude Cowork plugin that delivers The Linux Foundation's "Claude Agent Workshop" — a marketing-team training course on building agentic applications with Claude Cowork — as a set of personalized PowerPoint decks, one section at a time, with live Q&A support.

Built from the course syllabus (`Marketing Agents Class Syllabus.pdf`) and a sourced research brief (`Course Research Brief.md`) covering Anthropic's official documentation, anthropic.skilljar.com courses, the Linux Foundation's Agentic AI Foundation (aaif.io), and practitioner sources.

## What it does

1. A student (or you, testing it) says **"Launch Marketing Agent Class"** in Cowork.
2. The plugin asks for the student's name and personalizes everything that follows using their first name.
3. It generates and delivers `Marketing Agent Class Section Basics.pptx` — the first of three section decks.
4. After each deck, it tells the student they can ask questions while reviewing, and waits for them to say they're ready before continuing.
5. Any question the student asks gets a complete answer as 3-5 new slides, appended to a single running deck: `Marketing Agent Class Questions and Answers.pptx`. Previous questions are never overwritten — the deck grows over the course of the student's review.
6. When the student signals they're ready, the plugin delivers the next section: `Marketing Agent Class Section Advanced.pptx`, then finally `Marketing Agent Class Section Ancillary.pptx`.
7. After the third section, the plugin congratulates the student and confirms the course is complete.

## Course structure

| Section | Topics | Deck file |
|---|---|---|
| Basics | Claude vs. Cowork vs. Code; connectors, skills, agents, commands, interactions, plugins; a first end-to-end workflow | `Marketing Agent Class Section Basics.pptx` |
| Advanced | Planning, creating & executing, and monitoring marketing agents | `Marketing Agent Class Section Advanced.pptx` |
| Ancillary | Sophisticated prompts, research workflows, designing agents | `Marketing Agent Class Section Ancillary.pptx` |

Each section includes one guided, step-by-step example, matching the original syllabus's "3 learning sections + 1 guided example each" structure.

## Components

- **`skills/launch-marketing-agent-class/`** — the main course-delivery skill. Triggered by the phrase "Launch Marketing Agent Class" (and close variants). Tracks progress in `.marketing-agent-class/state.json` in the student's working folder and builds each section's deck from the content in `references/`.
- **`skills/marketing-agent-class-qa/`** — triggered when a student asks a substantive question while going through the course. Answers it fully in 3-5 slides and appends to the shared Q&A deck.

## Requirements

- Claude Cowork with the pptx-authoring capability available (used by `launch-marketing-agent-class` to build each deck).
- No external connectors or credentials are required — this plugin only reads its own reference files and writes `.pptx` files to the student's working folder.

## Installing

Install the `.plugin` file the same way you would any other Cowork plugin. Once installed, any student can type **"Launch Marketing Agent Class"** in a Cowork session (with a working folder set) to begin.

## Notes for whoever maintains this course

- Course content lives in `skills/launch-marketing-agent-class/references/*.md` as a slide-by-slide outline, not as pre-built decks — this is what lets each run personalize the name and lets you edit the curriculum without touching any code.
- Sources for every factual claim in the decks are noted inline in the reference files (in parentheses) so content can be re-verified or updated later.
