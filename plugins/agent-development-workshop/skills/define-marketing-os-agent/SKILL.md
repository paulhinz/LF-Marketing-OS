---
name: define-marketing-os-agent
description: Interviews a marketing subject matter expert, Linux Foundation business leader, or LF technical leader through a structured discovery process to scope a new LFX Marketing OS AI agent. Checks the proposed agent against the existing 9-core-agent taxonomy and the 42-agent master list, then produces an Agent Definition File plus a "workflow without agent" and a "workflow with agent" process diagram. Use when the user wants to define, scope, spec out, or document a new marketing agent for LFX Marketing OS -- e.g. "define a new marketing OS agent", "help me scope an agent for X", "create an agent definition for the newsletter/event/social/etc. agent", "spec out a new Marketing OS agent", or references the 9 core agents / the Marketing OS agent list.
---

# Define a Marketing OS agent

Run a short, guided discovery interview that turns a rough agent idea into three deliverables: an Agent Definition File, a workflow diagram showing the process today (no agent), and a workflow diagram showing the process with the agent in place.

Ground every question and every judgment call in the bundled reference files -- do not rely on generic AI-agent knowledge:
- `references/nine-agent-taxonomy.md` -- the 9 core agent categories, the 42 existing agents, departments, systems/tools, vocabulary.
- `references/agent-definition-template.md` -- the exact fields the final document must contain and what a complete answer looks like for each.
- `references/best-practices.md` -- the judgment behind each question (scope clarity, looping/boundary conditions, human gates, tool blast radius).
- `references/diagram-guide.md` -- Mermaid conventions and the mapping from Agent Definition File fields to diagram nodes.

## Step 0 -- confirm the requester's role

If not already clear from context, ask (one AskUserQuestion call, 2-4 options, recommended first if you can infer one from what they've said):

"Which best describes you for this session?" -- Marketing SME · LF business leader · LF technical leader · Other.

This shapes vocabulary, not the process: technical leaders may already have a system/tool in mind, business leaders may lead with the department/goal, SMEs may lead with a workflow pain point. Meet them where they start, but still collect every field.

## Step 1 -- run the interview in rounds, not one long form

Use the `AskUserQuestion` tool (or equivalent structured-choice prompting) in short rounds of 1-3 related questions each. Never dump all fields into one message. Batch questions that are genuinely parallel; sequence unrelated topic areas across separate rounds. For any question with a bounded, nameable answer space, offer 2-4 options with your best recommendation listed first and labeled "(Recommended)" -- reserve open text for genuinely unbounded answers (agent name, description, campaign specifics).

Cover every field in `references/agent-definition-template.md`, in roughly this order (skip a round if the user already answered it earlier in the conversation):

1. **Identity** -- Agent Name; one-paragraph plain-English description (push back if it's vague -- see the scope-clarity gate in `best-practices.md`); which of the 9 core categories it aligns to (show the 9 from the taxonomy reference as options, plus "not sure / help me pick"); Marketing Department Supported (options from the taxonomy reference).
2. **Human context** -- who performs this today (a named role/title, not "someone on the team"); who will run/own the agent (Project Leader, Foundation Marketing Lead, Creator-Host, or a custom role).
3. **Inputs and outputs** -- what the agent needs to run (required vs. optional, and where each comes from); exactly what it produces and where it lands.
4. **Triggers** -- what starts a run: a user action, a schedule, an external event, or another agent's output.
5. **Looping conditions** -- ask these as two distinct questions, don't merge them: (a) what tells you a given pass came out better or worse (a metric, rubric, or human grader); (b) what's the hard stop that forces a human check-in regardless of confidence (max iterations, max time, a named blocker).
6. **Reference resources** -- any existing examples of a good output to ground quality; if none exist, note it as a gap rather than skipping silently.
7. **Systems/tools** -- which Anchor SaaS, Supporting SaaS, or LF-built systems it touches, and for each, read-only or write access, and whether write actions default to draft/queued until human approval.
8. **Human gates and external actors** -- at least one named approval checkpoint (who, sees what, can do what); anyone else affected or looped in (Legal, Creative Services, a Governing Board, a member org); how an action gets reversed if it's wrong.

## Step 2 -- alignment and duplication check

Before finalizing, compare the proposed agent against `references/nine-agent-taxonomy.md`'s agent list, matching by **name + department** (never by number alone -- see that file's "Known ID collisions" note). State plainly which disposition applies and why: **Add** (genuinely new), **Define** (an exact/near-exact match already sits on the backlog but has never been fully specced -- this is the most common outcome when someone names an agent already visible on the roadmap), **Rename** (same job, clearer name), **Absorbed** (a sub-function of a broader existing agent, not standalone), or **Skip** (out of scope / low value). Surface this to the user as part of the summary in Step 3, not as a silent decision. If the verdict is **Skip**, say so plainly and ask the user whether they still want the full deliverables produced anyway (e.g. for planning-discussion purposes) before proceeding -- don't silently generate a full spec for something you've just flagged as out of scope.

## Step 3 -- summarize and gate on approval

Present the full captured definition back to the user in plain language (a short recap, not the raw template) together with the alignment verdict. Ask explicitly before generating anything: "Ready to generate the Agent Definition File and both workflow diagrams, or would you like to change something first?" Do not produce final files until the user confirms.

## Step 4 -- generate the three deliverables

1. **Two Mermaid diagrams** -- follow `references/diagram-guide.md` exactly: Diagram 1 (workflow without the agent, fully human/manual) and Diagram 2 (workflow with the agent, following the six-step loop and showing the human gate(s) as distinct nodes). Save both as `.mermaid` files. Then run `scripts/render_mermaid.sh <input.mmd> <output.png>` on each to produce PNGs for embedding; if that fails for any reason, embed the raw Mermaid source as a labeled code block instead and tell the user it can be pasted into mermaid.live to view.
2. **Agent Definition File** -- produce both a Markdown version (`<agent-name>-definition.md`, with the two Mermaid diagrams embedded as fenced ```mermaid code blocks) and a Word version. For the Word version, `Read` the project's `docx` skill before generating it, and embed the two rendered PNG diagrams as images (fall back to a monospace code block of the Mermaid source if PNGs weren't produced). Structure the document exactly per the section order in `references/agent-definition-template.md` (Profile & Context, Human Context, Inputs & Outputs, Triggers, Looping Conditions, Reference Resources, Systems, Human Gates & External Actors, then the Alignment & Duplication Check).
3. Name files using the agent name in kebab-case, e.g. `speaker-promotion-kit-agent-definition.docx`, `speaker-promotion-kit-agent-definition.md`, `speaker-promotion-kit-agent-workflow-without-agent.mermaid`/`.png`, `speaker-promotion-kit-agent-workflow-with-agent.mermaid`/`.png`.

## Step 5 -- deliver

Save all final files to the user's workspace folder (not just the scratch/temp directory) and present them to the user. Close with a short summary of the agent's scope and its alignment verdict -- do not re-paste the full document contents into the chat, the user can open the files.
