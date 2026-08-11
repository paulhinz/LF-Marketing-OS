# Agent-scoping best practices (interview design notes)

Distilled from Anthropic's "Building Effective Agents" and "Effective harnesses for long-running agents," LangChain's "The Art of Loop Engineering," and independent agent-scoping guides (SEM Nexus, Gaper.io, Torq, Ability.ai, Mohammed Shehu's SCOPE framework). Use these as the judgment calls behind each interview question — not just the question text.

## Scope clarity gate

Before going deep on any field, apply the acid test: **can the requester describe the agent in one plain-English paragraph, including what it explicitly does NOT do?** If not, scope isn't clear enough — ask what's blocking that paragraph rather than pushing forward with vague answers. Scope around a workflow ("triages inbound tickets, drafts a reply, tags the three that need a human"), never a bare capability ("uses our data").

Good first-candidate signals to listen for: the task requires multi-step reasoning (not a fixed rule), it recurs often enough to justify the build, errors are recoverable, and there's a nameable human baseline doing it today.

## Inputs, outputs, triggers

Nail these three together — they're the hardest to retrofit later. For each: is the trigger a schedule, a user action, an external event, or another agent's output? What format do inputs arrive in, and which are optional vs. required? What exactly ships, and where does it land? If the answer to any of these is "it depends," resolve the dependency before moving on — vague inputs produce unreliable agents.

## Looping and iteration

Every agent needs two separate things, and interview questions should force both explicitly:

1. **A success metric per pass** — deterministic check, rubric, or human-as-grader, so the system can tell whether this run was better or worse than the last. Anthropic's guidance: the agent should get *ground truth from the environment* (tool results, test outcomes) at each step, not just self-report "I'm done."
2. **A boundary condition** — a stopping rule (max iterations, max time, a named blocker type) that forces a human check-in regardless of the agent's own confidence. Models are poor judges of their own completeness on long-running work; a structural stop is not optional.

Push for numbers where possible: an agent that confidently handles 70% of cases and cleanly escalates the other 30% is usually more valuable than one that attempts 100% and is silently wrong on 8%.

## Tool/system integration

For every system the agent touches, ask: what's the smallest scope of access it actually needs (read vs. write), and what's the blast radius if it acts wrongly with that access? Write actions to production tools (publishing, sending, spending) should default to draft/queued/logged-for-approval until trust accumulates — this is why "Human Gate" and "Reversibility" are separate required fields, not one.

## Human gates and external actors

Recurring patterns worth naming explicitly during the interview: **Approval Gate** (nothing ships until a named person signs off), **Escalation Ladder** (who it goes to next if the first approver is unavailable or rejects it), **Confidence-Based Routing** (only route to a human below a confidence threshold), **Audit Trail with Lazy Review** (ships automatically, but every action is logged and reviewable after the fact). The single most important design axis is reversible vs. irreversible actions — gates should be strictest around irreversible ones (spend, public posts, member-facing communication). Advice from the sourced material: start tight and loosen over time; don't start loose and try to tighten after an incident.

## Reference examples

A small set of real, diverse examples of a good output measurably improves an agent's grounding — but a reference set made of only clean, ideal cases produces a false confidence number; include the messy real cases too. If no examples exist yet for a proposed agent, that's a gap worth flagging back to the requester rather than skipping silently.
