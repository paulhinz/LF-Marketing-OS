# Course content: Ancillary section

Deck file name: `Marketing Agent Class Section Ancillary.pptx`
Deck title: "Claude Agent Workshop — Ancillary"

Use `{{first_name}}` as the personalization token — replace every occurrence with the student's first name before generating the deck. Build one slide per numbered item below unless noted otherwise.

## Deck outline

1. **Title slide** — "Claude Agent Workshop: Ancillary" / subtitle "Prepared for {{first_name}} · Prompts, research workflows, and agent design"
2. **Welcome back** — Bullets: "The final 3 topics: sophisticated prompts, research workflows, designing agents"; "These sharpen everything from the Basics and Advanced sections"
3. **What you'll be able to do after this section** — Bullets: write a structured, example-backed prompt instead of a one-liner; design a multi-part research workflow with citations; choose correctly between a prompt, a skill, a subagent, and a plugin for a given task.

### Topic 1: Developing sophisticated prompts

4. **Topic 1 title slide** — "Topic 1: Writing prompts that hold up"
5. **Find the right altitude** — Bullets: not so rigid it's brittle, not so vague it assumes context the model doesn't have; be clear and direct; assign a role when it helps; let Claude think step by step before answering.
   Detail (source: platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices).
6. **Structure beats cleverness** — Bullets: organize prompts into labeled sections — background, instructions, output description; use a small number of diverse, canonical examples rather than an exhaustive edge-case list; start minimal, observe failures, then add specifics.
   Detail (source: anthropic.com/engineering/effective-context-engineering-for-ai-agents): "examples are the pictures worth a thousand words."
7. **Chain it when it's complex** — Bullets: break a complex task into sequential steps with a check in between (e.g., "write copy, then translate it"); this trades a bit of latency for a lot of accuracy.
   Detail (source: anthropic.com/engineering/building-effective-agents).
8. **Guided Example 1 — intro slide** — "Guided Example: Three passes on one prompt"
   Steps:
   a. Write a one-line prompt for a "campaign brief agent."
   b. Rewrite it with a role and labeled sections (background, instructions, output format).
   c. Add 2-3 example briefs to the prompt.
   d. Compare Claude's output quality across all three passes.
9. **Guided Example 1 — steps slide(s)**
10. **Guided Example 1 — what success looks like** — Bullets: you can point to a specific quality improvement from pass 1 to pass 3; you have a reusable, structured prompt template.

### Topic 2: Researching workflows

11. **Topic 2 title slide** — "Topic 2: Designing a research workflow"
12. **The pattern: plan, split, synthesize** — Bullets: a lead agent plans and decomposes the question; it spawns parallel sub-tasks, each with an explicit objective, output format, and boundary; it synthesizes the results into one answer with citations.
    Detail (source: anthropic.com/engineering/multi-agent-research-system): this multi-agent setup beat a single-agent baseline by 90.2% on an internal breadth-first research evaluation.
13. **Search broad, then narrow** — Bullets: agents that write long, over-specific queries first tend to get poor results; start broad, then narrow as leads emerge; a separate verification pass checks that every claim maps back to a real, citable source.
    Detail (same source) — critical for avoiding fabricated "facts" in marketing research.
14. **Know the cost** — Bullets: multi-agent research burns roughly 15x more tokens than a single chat; reserve it for tasks where real breadth pays off — a single well-prompted agent is fine for a narrow lookup.
    Detail (source: anthropic.com/engineering/multi-agent-research-system; anthropic.com/engineering/building-effective-agents).
15. **Guided Example 2 — intro slide** — "Guided Example: Competitor research workflow"
    Steps:
    a. Pick 3 competitors and one question to answer about each (e.g., "Q3 messaging").
    b. Split the research into 3 bounded sub-tasks, one per competitor, each with a defined output format.
    c. Gather sourced findings for each competitor.
    d. Synthesize one comparison brief with a citation for every claim.
16. **Guided Example 2 — steps slide(s)**
17. **Guided Example 2 — what success looks like** — Bullets: your comparison brief has a source for every factual claim; you can explain why you split the research into 3 parts instead of asking one broad question.

### Topic 3: Designing agents

18. **Topic 3 title slide** — "Topic 3: Choosing the right shape for an agent"
19. **Workflows vs. agents** — Bullets: a workflow follows a predefined code path — predictable, good for well-defined tasks; an agent lets the LLM dynamically direct its own steps — better for open-ended, unpredictable tasks; start with the simplest structure that works, add complexity only when it demonstrably helps.
    Detail (source: anthropic.com/engineering/building-effective-agents): "Start by using LLM APIs directly... add complexity only when it demonstrably improves outcomes."
20. **Skill vs. subagent — the practical line** — Bullets: a Skill loads a reusable procedure into your main conversation; a Subagent delegates an isolated task to a separate context window and returns only a short summary; use a Skill when you want the process visible in your own session, a Subagent when you want it kept out of the way.
    Detail (source: anthropic.skilljar.com/introduction-to-agent-skills; anthropic.skilljar.com/introduction-to-subagents).
21. **Fewer, clearer tools win** — Bullets: give tools distinct, non-overlapping purposes and test with real inputs — "if a human engineer can't say which tool to use, an agent can't either"; Prime Video cut a shared tool server from 100+ tools down to a single discovery tool that loads only what's relevant to the current task, because bloated toolsets cause ambiguous decisions and more mistakes.
    Detail (source: anthropic.com/engineering/building-effective-agents, Appendix 2; aaif.io/blog/prime-videos-approach-to-progressive-tool-discovery — Linux Foundation's own Agentic AI Foundation, verified May 2026).
22. **Iterate by watching it work** — Bullets: run the agent on real examples and watch it step by step before scaling up delegation or tool count; that's how you catch failure modes early.
    Detail (source: anthropic.com/engineering/multi-agent-research-system).
23. **Guided Example 3 — intro slide** — "Guided Example: Classify four marketing tasks"
    Steps:
    a. Take four real tasks: check brand voice on a draft; scan competitor sites weekly; generate a campaign brief; answer FAQs from a knowledge base.
    b. For each, decide: single prompt, Skill, Subagent, or Plugin — using the criteria from this topic.
    c. Justify each choice in one sentence.
    d. Build the simplest one as a real Cowork skill.
24. **Guided Example 3 — steps slide(s)**
25. **Guided Example 3 — what success looks like** — Bullets: you can justify each of your four classifications; you have one new working Skill.
26. **Course recap** — Bullets: Basics — Claude, Cowork, Code, and the building blocks; Advanced — planning, creating, and monitoring marketing agents; Ancillary — sharper prompts, research workflows, and agent design; "You've completed the Claude Agent Workshop, {{first_name}}."
27. **Questions? / Course complete** — "{{first_name}}, ask me anything about this section right now — I'll answer it in full and add it to your Marketing Agent Class Questions and Answers deck. Once you're all set, you've finished the course — nice work."
