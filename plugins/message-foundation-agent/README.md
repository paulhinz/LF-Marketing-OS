# Message Foundation Agent

An LFX Marketing OS plugin for Cowork/Claude Code. Interviews a Linux Foundation project lead and produces a **`[Project Name] Message Foundation`** document — the messaging source of truth for web, content, social, and campaign work.

This is the "Message Foundation Agent" from the LFX Marketing OS 42-agent list (LF Media department, 9-Agent category 1: Foundation Setup) — previously an unspecced idea on the roadmap, now built out as a working skill.

## What it does

Run the command **"Develop LF Project Messaging Foundation"** and the agent will:

1. Ask a short set of questions, one at a time — project name, GitHub URL, and either a link to an existing `[Project Name] Brand Kit` or five brand-discovery questions if none exists.
2. Ask up to 5 more targeted questions to close any remaining gaps (proof points to confirm, audience scope, positioning contrast, CTA specifics, timeliness).
3. Generate `[Project Name] Message Foundation.md` (and optionally a matching `.docx`): word-count-locked summaries (25-word, 50-word, boilerplate, `llms.txt`, elevator pitch slide) nested inside a full positioning, voice, audience, messaging-pillar, and talking-points framework.

The document is benchmarked against a real CNCF messaging framework (bundled as a reference file) and improves on it with a voice/tone section, exact-word-count derivatives, and a value → support → proof chain — gaps identified in the benchmark file itself.

## Document family

This plugin assumes (but doesn't require) a companion **Brand Kit** — a separate LFX Marketing OS document/skill that owns identity, voice, positioning statement, and visual direction. When a Brand Kit exists, this agent extends it rather than re-deriving from scratch. A third document, the **ICP Document** (market segments, personas, fit/warmth scoring), is a separate skill not included here.

## Grounding rule

Every factual claim in the generated document — proof points, adopter names, positioning contrasts — must trace back to the interview answers, the project's GitHub README, or its Brand Kit. Anything unsupported is marked **TBD — needs input** rather than invented. Named organizations are never cited without explicit user confirmation.

## Tested against

OpenSearch (see `skills/develop-lf-project-messaging-foundation/examples/opensearch-message-foundation-sample.md` for the first worked example, including the interview decisions that shaped it).

## Roadmap

A future version will connect to a "Velocity Engine" MCP source to populate persona/ICP-style fields automatically. Until that connector is built, this skill runs entirely on the interview + Brand Kit + README flow.

## Installing

Drag the `.plugin` file into Cowork, or install via Claude Code's plugin system. No external accounts, API keys, or MCP connectors are required to use this version.
