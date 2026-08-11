---
name: generate-foundation-sample-data
description: Bulk-generates Brand Kit, Message Foundation, and ICP & Target Markets sample documents for a list of Linux Foundation projects/foundations by running the Brand Kit Agent, Message Foundation Agent, and ICP & Target Markets Agent non-interactively across parallel sub-agents. Use when the user asks to "generate foundation sample data", "run the foundation sample data plugin", "create sample marketing docs for LF foundations", "batch-run brand kit and messaging for a list of projects", or references generating LFX Marketing OS test/sample data for multiple foundations at once.
---

# Generate Foundation Sample Data

Orchestrate a bulk, non-interactive run of three existing LFX Marketing OS agents — Brand Kit, Message Foundation, and ICP & Target Markets — across a user-supplied list of Linux Foundation projects, and file every output document in a shared Drive folder. This is a testing/sample-data utility, not a production content generator: outputs are internal review-only drafts, never published or member-facing.

**Requires these plugins to also be installed** (this skill invokes them by name via the Skill tool): `brand-kit-agent`, `message-foundation-agent`, `icp-target-markets-agent`. Also requires a connected Google Drive-capable connector and web search. If any of these are missing, tell the user which one and stop rather than guessing at a substitute.

## Step 0 — Ask the two required questions

Use `AskUserQuestion` (this top-level run is interactive — only the sub-agents in Step 4 skip questions). Ask both in one call:

1. **List source** — "Where should I get the list of foundations/projects to run?" Options: "Same Top LF Foundations sheet as before" (reuse the known ranked spreadsheet if you have its URL from earlier context or memory; otherwise drop this option), "A different Google Sheet" (then ask for the link), "A pasted list of names" (user types/pastes names directly in chat, one per line or comma-separated).
2. **How many** — "How many foundations from that list should I run, starting from the top?" Options: "5", "10", "20", "All rows in the source" — plus the automatic free-text option for a custom number.

If the user already answered either question earlier in the conversation (e.g., they said "run the top 5" in their triggering message), don't re-ask that one.

## Step 1 — Load the source list

- **Google Sheet source**: read it with the Drive connector's file-content tool. Extract the foundation/project name column (and any existing GitHub URL column if present — reuse it instead of searching).
- **Pasted list source**: parse the user's text directly, one foundation per line/entry.
- Take the top N entries per the requested count. If the source has fewer rows than N, proceed with what's available and tell the user you did.

## Step 2 — Resolve each foundation's GitHub README

For any foundation without an already-known GitHub URL, use web search to find its primary GitHub org or README (e.g., "`<foundation name>` GitHub organization"). Do this yourself, up front, for the whole list — don't push this research onto the sub-agents; give each sub-agent the resolved URL directly.

## Step 3 — Confirm the destination folder

Search Drive for a folder titled exactly "Sample Data" (folder mimeType). If exactly one match, use its ID. If none exist, create one at Drive root with that name and use the new ID. If more than one match is found, ask the user which one via `AskUserQuestion` before proceeding — don't guess.

## Step 4 — Fan out to sub-agents and run the pipeline

Divide the N foundations across up to 5 parallel sub-agents, split as evenly as possible (5 foundations → 5 sub-agents of 1 each; 12 foundations → sub-agents of roughly 3/3/2/2/2; 2 foundations → 2 sub-agents of 1 each). Launch all sub-agents in a single message with multiple Agent tool calls so they run concurrently, using `subagent_type: general-purpose`.

Each sub-agent gets one or more foundations and must, for each one:
1. Run `brand-kit-agent:develop-lf-project-brand-kit`, then `message-foundation-agent:develop-lf-project-messaging-foundation`, then `icp-target-markets-agent:develop-target-markets-and-icp`, in that order, feeding the Brand Kit output forward as context to the other two.
2. Never call `AskUserQuestion` — self-answer every interview/discovery question with sensible, researched, generic defaults (see `references/sub-agent-prompt-template.md` for the exact defaults and wording to give each sub-agent).
3. Upload all 3 resulting `.docx` files to the destination folder ID from Step 3, named `"<Foundation Name> - Brand Kit.docx"`, `"<Foundation Name> - Message Foundation.docx"`, `"<Foundation Name> - ICP and Target Markets.docx"`.
4. Verify each upload by comparing byte size (or hash) between the local source file and the uploaded Drive file before reporting success — large base64 payloads sent in chunks have previously been corrupted by a dropped character at a chunk boundary. If a mismatch is found, re-upload rather than reporting success.
5. Report back per-foundation pass/fail and any assumptions made.

Copy the full sub-agent prompt template from `references/sub-agent-prompt-template.md`, filling in the foundation name, GitHub URL, and destination folder ID for each one — do not paraphrase it loosely, the specific instructions in there (especially "never call AskUserQuestion" and the byte-verification step) are load-bearing.

If a sub-agent's connection drops or it terminates early (this happens occasionally with long-running skill chains), do not attempt to resume it — relaunch a fresh sub-agent for that same foundation with an added instruction to first check the destination folder for any files that foundation may have already produced, and skip regenerating any that are already present and valid-sized, to avoid redundant work.

## Step 5 — Reconcile and report

List the destination folder's contents. For each of the N foundations, confirm all 3 expected documents exist. Report to the user:
- A completion count (e.g., "12 of 12 foundations complete, 36 of 36 documents").
- Any foundation missing a document, and why (if known).
- Any stray/corrupted duplicate files left behind (this connector has no delete tool available to Claude) — list their exact names and file IDs so the user can remove them manually in Drive.

Never declare the run "done" without this reconciliation step — completeness must be checked against the actual folder contents, not just the sub-agents' self-reports.
