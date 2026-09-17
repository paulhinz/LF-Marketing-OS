# lfx-marketing-os-qa

The QA gate for LFX Marketing OS foundational documents and their derivatives. Built from the September 16, 2026 review of the x402 Brand Kit, Message Foundation and Target Markets/ICP documents, re-verified against the LFX MCP and public sources.

Run it before any foundation document is marked "for review", handed to a downstream agent, or sent to project leadership. Six steps: entity and trademark lint from the LFX project record; Stat Bank re-verification; beyond-the-brief research sweep; claims, dates and superlatives; brand review against the project's own Brand Kit; cross-document consistency. Output is a gate decision, a ranked fix list with drop-in replacement text, and a two-page digest.

- `skills/lfx-marketing-os-qa/SKILL.md` — the workflow and report format
- `skills/lfx-marketing-os-qa/references/` — entity lint, Stat Bank verification calls, research-sweep checklist, brand-review rubric, the x402 worked example (regression baseline)
- `skills/lfx-marketing-os-qa/evals/evals.json` — three test prompts with verifiable expectations

Requires the LFX MCP server and web fetch/search. Without the LFX MCP the entity and Stat Bank steps report UNVERIFIED rather than guessing.
