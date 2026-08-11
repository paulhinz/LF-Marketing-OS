# Course content: Advanced section

Deck file name: `Marketing Agent Class Section Advanced.pptx`
Deck title: "Claude Agent Workshop — Advanced"

Use `{{first_name}}` as the personalization token — replace every occurrence with the student's first name before generating the deck. Build one slide per numbered item below unless noted otherwise.

## Deck outline

1. **Title slide** — "Claude Agent Workshop: Advanced" / subtitle "Prepared for {{first_name}} · Creating & optimizing marketing agents"
2. **Welcome back** — Bullets: "Building on the Basics — connectors, skills, commands, interactions, plugins"; "3 topics: planning, creating & executing, monitoring marketing activities"; "Each topic ends with a guided example"
3. **What you'll be able to do after this section** — Bullets: build a planning agent that researches and drafts a campaign brief; build a production pipeline that turns one brief into multiple content assets; build a monitoring agent that reports performance and recommends next steps.

### Topic 1: Planning marketing activities

4. **Topic 1 title slide** — "Topic 1: Agents that plan marketing work"
5. **The pattern: orchestrator-workers** — Bullets: a lead agent plans the approach; it delegates research to sub-tasks (audience, channel, budget angles); it synthesizes the results into one brief; best fit for open-ended work where the number of steps isn't fixed in advance.
   Detail (source: anthropic.com/engineering/building-effective-agents; anthropic.com/engineering/multi-agent-research-system): Anthropic distinguishes workflows (predefined code paths) from agents (the LLM dynamically directs its own steps) — start simple, escalate to an autonomous agent only when the problem is genuinely unpredictable and multi-step.
6. **Start from what's already built** — Bullets: Cowork's Marketing plugin ships ready-made "Campaign Plan" and "Competitive Brief" skills that already produce full briefs (objectives, channels, calendar, KPIs) and positioning comparisons; you often don't need to build a planning agent from scratch — you extend one.
   Detail (source: blog.coupler.io/claude-cowork-for-marketing; techsy.io/en/blog/claude-cowork-for-marketing-ops).
7. **Ground it in real materials** — Bullets: feed Cowork real source files — past briefs, brand guidelines, budget sheets — into the working folder rather than describing them verbally; planning output quality depends on grounding, not just clever prompting.
   Detail (source: adspirer.com/blog/claude-cowork-for-marketers).
8. **Guided Example 1 — intro slide** — "Guided Example: Build a Campaign Planning Skill"
   Steps:
   a. Create a working folder and drop in a product brief and your brand guidelines.
   b. Run (or install) the Campaign Plan skill and point it at that folder.
   c. Let Claude ask 2-3 clarifying questions about audience, channels, or budget.
   d. Review the campaign brief Claude produces — check the calendar and KPIs section.
   e. Note one thing you'd change, and ask Claude to revise it.
9. **Guided Example 1 — steps slide(s)**
10. **Guided Example 1 — what success looks like** — Bullets: you have a real campaign brief with objectives, channels, calendar, and KPIs; you can point to the source file(s) that grounded it.

### Topic 2: Creating & executing marketing activities

11. **Topic 2 title slide** — "Topic 2: Agents that create and execute marketing work"
12. **The pattern: production pipelines** — Bullets: chain discrete, deterministic skills — research → draft → repurpose per channel → schedule; each skill consumes the previous step's output; this fights "context rot" by loading only the instructions relevant to the current step instead of one giant brand document.
    Detail (source: mindstudio.ai/blog/5-skill-agent-workflow-content-marketing-claude-code): a documented 5-skill pipeline (trend research → copywriting → per-channel repurposing → video scripts → scheduling) produces a full content batch in minutes.
13. **Keep brand knowledge modular** — Bullets: split brand knowledge into small files — glossary, voice samples, metrics definitions — instead of one giant brand PDF; the agent then pulls in only what a given step needs.
    Detail (source: stormy.ai/blog/how-to-build-marketing-ai-agent-army-claude-skills): "if you do a task more than three times, it should be a skill" — a practical threshold for turning a repeated content task into a reusable Cowork skill.
14. **Built-in skills to reuse** — Bullets: Cowork's Draft Content skill produces blog posts, social copy, and landing pages; the Email Sequence skill turns a draft into a multi-email nurture flow; both read from the same brand-voice reference file for consistency.
    Detail (source: anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills).
15. **Guided Example 2 — intro slide** — "Guided Example: Content-to-Email Production Agent"
    Steps:
    a. Give Claude a one-paragraph brief for a blog post.
    b. Run the Draft Content skill to produce the post.
    c. Feed that draft into the Email Sequence skill to generate a 3-email nurture sequence.
    d. Apply one shared brand-voice reference file to both steps and confirm the tone matches across the post and the emails.
16. **Guided Example 2 — steps slide(s)**
17. **Guided Example 2 — what success looks like** — Bullets: you have a blog post and a 3-email sequence derived from the same brief; both read in the same voice because they shared one reference file.

### Topic 3: Monitoring marketing activities

18. **Topic 3 title slide** — "Topic 3: Agents that monitor marketing work"
19. **The pattern: ingest → summarize → compare → recommend → hand off** — Bullets: ingest the data; lead with an executive summary, not raw numbers; always compare to a prior period and state data freshness; end with prioritized recommendations, each with an owner, deadline, and expected impact; close by proposing the next recurring check instead of stopping at a static report.
    Detail (source: github.com/aaron-he-zhu/seo-geo-claude-skills, performance-reporter SKILL.md): this is an 11-step documented reporting pattern ending in a handoff to a follow-up "alert manager" skill.
20. **Keep a human in the loop** — Bullets: close human oversight matters most "in the early days and weeks" of a new monitoring agent, especially once it starts influencing live decisions like bids, copy, or targeting.
    Detail (source: blog.hubspot.com/marketing/multi-agent-system-ai).
21. **Built-in skill to reuse** — Bullets: Cowork's Performance Report skill is designed to run on a cadence (daily, weekly, monthly), not just once — connect a data source and schedule it.
    Detail (source: blog.coupler.io/claude-cowork-for-marketing).
22. **Guided Example 3 — intro slide** — "Guided Example: Build a Performance Reporting Agent"
    Steps:
    a. Export or connect a campaign/analytics data source (a CSV works fine to start).
    b. Run the Performance Report / performance-analytics skill against it.
    c. Check that the output leads with an executive summary and compares to a prior period.
    d. Confirm each recommendation has an owner, a deadline, and an expected impact.
    e. Schedule the report to re-run weekly.
23. **Guided Example 3 — steps slide(s)**
24. **Guided Example 3 — what success looks like** — Bullets: you have a performance report with prioritized, owned recommendations; it's scheduled to refresh on its own.
25. **Section recap** — Bullets: recap of planning, creating & executing, and monitoring agents; "Next: the Ancillary section — sharper prompts, research workflows, and how to design an agent from scratch."
26. **Questions?** — "{{first_name}}, ask me anything about this section right now — I'll answer it in full and add it to your Marketing Agent Class Questions and Answers deck. When you're ready, just tell me and we'll move to the Ancillary section."
