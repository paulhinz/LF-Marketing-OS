# Agent Development Workshop

A Cowork/Claude Code plugin for the Linux Foundation's LFX Marketing OS initiative. It walks a marketing subject matter expert, an LF business leader, or an LF technical leader through a short guided interview to define a new Marketing OS agent, then produces:

1. An **Agent Definition File** (Word + Markdown) covering: agent name, marketing department supported, alignment with the 9 core Marketing OS agents, the human role it replaces/augments, who runs it, required inputs, produced outputs, triggers, looping conditions (success metric + boundary condition), reference/sample resources, system integrations, and human gates/external actors -- plus an alignment check against the existing 42-agent master list.
2. A **workflow diagram without the agent** -- the process today, fully human-driven.
3. A **workflow diagram with the agent** -- the same process with the agent inserted, following the six-step User intent -> Plan -> Approve -> Execute -> Report -> Learn loop, with human-gate checkpoints called out.

## Grounding

The interview questions and output template are grounded in three source documents from the Marketing OS initiative (Jim Zemlin's product concept, Paul Hinz's strategy overview deck defining the 9 core agents, and the 2026 Marketing OS Agent List spreadsheet of 42 existing agents), plus published best practices for scoping AI agents (Anthropic's "Building Effective Agents" and "Effective harnesses for long-running agents," LangChain's "The Art of Loop Engineering," and independent agent-scoping guides). See `skills/define-marketing-os-agent/references/` for the full distilled reference material.

## Usage

Say something like "help me define a new agent for X" or "spec out a Marketing OS agent for [workflow]" and Claude will run the interview. You can also invoke it explicitly via `/agent-development-workshop:define-marketing-os-agent`.

## What's inside

```
agent-development-workshop/
├── .claude-plugin/plugin.json
├── skills/
│   └── define-marketing-os-agent/
│       ├── SKILL.md
│       ├── references/
│       │   ├── nine-agent-taxonomy.md
│       │   ├── agent-definition-template.md
│       │   ├── best-practices.md
│       │   └── diagram-guide.md
│       └── scripts/
│           └── render_mermaid.sh
└── README.md
```
