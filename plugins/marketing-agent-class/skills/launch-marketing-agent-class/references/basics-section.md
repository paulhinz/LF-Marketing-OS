# Course content: Basics section

Deck file name: `Marketing Agent Class Section Basics.pptx`
Deck title: "Claude Agent Workshop — Basics"

Use `{{first_name}}` as the personalization token — replace every occurrence with the student's first name before generating the deck. Build one slide per numbered item below unless noted otherwise. Keep slide text to short bullets (the pptx tool will handle layout); speaker-note detail is provided separately from the on-slide bullets so slides don't get overcrowded — put the "Detail" text in speaker notes if the pptx tool supports notes, otherwise fold 1-2 lines of it onto the slide.

## Deck outline

1. **Title slide** — "Claude Agent Workshop: Basics" / subtitle "Prepared for {{first_name}} · The Linux Foundation Marketing Operating System"
2. **Welcome & how this section works** — Bullets: "3 learning topics, each with a guided example"; "Reading: ~1.5 hours"; "Guided examples: ~2 hours total"; "Ask questions any time — I'll answer them in a companion deck"
3. **What you'll be able to do after this section** — Bullets: explain the difference between Claude, Claude Cowork, and Claude Code; know what connectors, skills, agents, commands, and plugins are and when to use each; complete one full Cowork workflow start to finish.

### Topic 1: Claude, Claude Cowork, and Claude Code

4. **Topic 1 title slide** — "Topic 1: Claude, Cowork, and Code — one engine, three surfaces"
5. **Claude (Chat)** — Bullets: conversational, request/response; best for drafting, quick analysis, single-turn questions; you do the multi-step coordination yourself.
   Detail: All three products share the same underlying agentic model, but they differ in surface and posture.
6. **Claude Cowork** — Bullets: a "working session," not a chat turn; describe an outcome, Claude plans and executes multi-step work across real files and connected apps; you steer and approve along the way instead of prompting turn by turn; runs on desktop, web, and mobile, including scheduled and remote sessions.
   Detail (source: claude.com/docs/cowork/overview; claude.com/blog/cowork-web-mobile): "Cowork uses the same agentic architecture that powers Claude Code, accessible within Claude Desktop." More than 90% of Cowork usage is non-software work — about half is business operations or content creation, which is exactly this course's focus.
7. **Claude Code** — Bullets: the same agentic engine applied to software development in a terminal/IDE; built around "explore → plan → code → commit"; not the surface marketers use day to day, but it's where concepts like the agentic loop, context window, tools, and permissions come from — and Cowork borrows this vocabulary.
   Detail (source: anthropic.skilljar.com/claude-code-101): Claude Code 101 defines "the agentic loop, context window, tools, and permissions" as core concepts — worth knowing since Cowork's advanced features (skills, subagents) use the same words.
8. **Comparison table slide** — Table: Claude (Chat) = single-turn conversation; Claude Cowork = multi-step working session on real files/apps; Claude Code = developer terminal agent. Use for: Chat = quick Q&A; Cowork = marketing operations, research, content, reporting; Code = software engineering.
9. **Guided Example 1 — intro slide** — "Guided Example: Chat vs. Cowork, side by side"
   Steps to include on following slides:
   a. Open Claude Chat and Cowork side by side (or in two tabs).
   b. Give both the same request: "Pull together everything on our Q3 campaign."
   c. In Chat: note you get one direct answer back immediately.
   d. In Cowork: watch Claude propose a plan, ask a clarifying question, and produce a saved file you can open.
   e. Wrap-up: write one sentence on when you'd reach for Chat vs. Cowork for your own work.
10. **Guided Example 1 — steps slide(s)** (split steps b–d above across 1-2 slides so text stays short)
11. **Guided Example 1 — what success looks like** — Bullets: You can describe, in your own words, when to use Chat vs. Cowork; You have a saved file from the Cowork run to reference later.

### Topic 2: The building blocks — connectors, skills, agents, commands, interactions, plugins

12. **Topic 2 title slide** — "Topic 2: The building blocks of a Cowork agent"
13. **Connectors (MCP)** — Bullets: MCP (Model Context Protocol) is Anthropic's open standard for connecting Claude to outside tools and data — "like USB-C for AI"; a Connector is the pre-built bridge giving Cowork access to one specific app (Slack, Drive, a CRM); MCP is now governed as an open, cross-vendor standard by the Linux Foundation's Agentic AI Foundation (AAIF) — the same foundation behind this course.
    Detail (source: anthropic.com/news/model-context-protocol; aaif.io): AAIF's founding members include Anthropic, OpenAI, AWS, Google, Microsoft, Block, Bloomberg, and Cloudflare.
14. **Skills** — Bullets: a Skill is a plain-text instruction file (SKILL.md) that captures a repeatable process; it loads only when relevant, not every conversation; build one by doing the task once, then asking Claude to "package what we just did into a skill."
    Detail (source: claude.com/resources/tutorials/customize-claude-cowork): "Instructions apply to every task... A Skill is for one specific kind of task, loads only when relevant, and can be shared with teammates."
15. **Agents (subagents)** — Bullets: a subagent is a focused task-delegate with its own separate context window; it does one job and reports back a short summary, keeping your main conversation clean; useful when a task is well-defined and self-contained (e.g., "research this one competitor").
    Detail (source: anthropic.skilljar.com/introduction-to-subagents): subagents are designed for structured output, flagging obstacles, and limited tool access.
16. **Commands** — Bullets: a command (like `/schedule`) is a shorthand trigger for a specific action; this course itself is launched by one command: "Launch Marketing Agent Class."
17. **Interactions (the approval loop)** — Bullets: manual approval — Claude pauses before each risky action and asks you first; auto-approval — Claude proceeds but still self-checks before anything that sends or changes data; rule of thumb: read-only actions can run freely, anything that emails, posts, or edits should wait for your OK.
    Detail (source: claude.com/resources/tutorials/using-claude-cowork-for-marketing-ops-review): "Keep read-only tools always allowed; anything that sends or changes data waits for you."
18. **Plugins** — Bullets: a plugin bundles connectors + skills (and sometimes agents) into one shareable, installable package; Anthropic publishes ready-made role plugins (Sales, Product, Legal, Operations); this entire course is delivered as a plugin, so your team can install and reuse it.
    Detail (source: claude.com/resources/tutorials/customize-claude-cowork; github.com/anthropics/knowledge-work-plugins): "Connectors + Skills = Plugins... installed in one click."
19. **Guided Example 2 — intro slide** — "Guided Example: Build your first Skill"
    Steps:
    a. Pick a task you do repeatedly (e.g., "summarize competitor pricing pages weekly").
    b. Walk Claude through doing it once, narrating what you want checked each time.
    c. Ask Claude: "package what we just did into a skill."
    d. Review the Skill file Claude creates and confirm the trigger phrase and steps look right.
    e. Note: this Skill, plus a Connector, is everything you need to turn it into a shareable team Plugin later.
20. **Guided Example 2 — steps slide(s)**
21. **Guided Example 2 — what success looks like** — Bullets: you have one working Skill saved; you can explain, in one sentence, what "connectors + skills = plugins" means.

### Topic 3: Putting it together — a first end-to-end example

22. **Topic 3 title slide** — "Topic 3: One workflow, every building block"
23. **The pattern** — Bullets: describe the report you want → Claude writes it as a Skill → schedule it with `/schedule` → Claude runs prep and flags anything ambiguous → you review, correct, and the correction gets saved back into the Skill so it improves next time.
    Detail (source: claude.com/resources/tutorials/using-claude-cowork-for-marketing-ops-review): this exact four-step pattern is Anthropic's own published example for a recurring marketing ops review.
24. **Why this matters** — Bullets: because a Skill is a plain-text file in a folder, anyone on the team can run the same review; this is the same shape you'll use again in the Advanced section for planning, creating, and monitoring marketing work.
25. **Guided Example 3 — intro slide** — "Guided Example: Your first end-to-end Cowork workflow"
    Steps:
    a. Connect one tool (e.g., Google Drive or Slack).
    b. Describe a recurring marketing report you'd want and ask Claude to write it as a Skill.
    c. Schedule it (or run it once manually).
    d. Review what Claude produced, practice approving or correcting one step.
    e. Ask Claude to fold your correction back into the Skill.
26. **Guided Example 3 — steps slide(s)**
27. **Guided Example 3 — what success looks like** — Bullets: you've used a connector, a skill, a command, and the approval/interaction loop in a single sitting; you have a Skill file that's now slightly better than when you started.
28. **Section recap** — Bullets: recap of the 3 topics; "Next: the Advanced section — using these same building blocks to plan, create, execute, and monitor marketing activities."
29. **Questions?** — "{{first_name}}, ask me anything about this section right now — I'll answer it in full and add it to your Marketing Agent Class Questions and Answers deck. When you're ready, just tell me and we'll move to the Advanced section."
