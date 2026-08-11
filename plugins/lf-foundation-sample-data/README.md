# LF Foundation Sample Data

Bulk-generates Brand Kit, Message Foundation, and ICP & Target Markets documents for any number of Linux Foundation projects/foundations — for testing and refining LFX Marketing OS agents, not for production/member-facing use.

## What it does

1. Asks you where to get the foundation list (a Google Sheet, or a pasted list) and how many rows to run.
2. Resolves each foundation's GitHub README via web search.
3. Fans out to up to 5 parallel sub-agents, dividing the list evenly.
4. Each sub-agent runs the Brand Kit Agent, then the Message Foundation Agent, then the ICP & Target Markets Agent for its foundations — non-interactively, self-answering every discovery question with researched generic defaults (no human interview happens during a bulk run).
5. Uploads all 3 resulting Word documents per foundation to a Drive folder named "Sample Data" (found automatically, or created if it doesn't exist).
6. Reconciles the output against the requested count and reports any gaps or corrupted duplicates.

## Requirements

This plugin orchestrates three other plugins — install all of them alongside this one:

- `brand-kit-agent` (command: `/develop-lf-project-brand-kit`)
- `message-foundation-agent` (command: `develop-lf-project-messaging-foundation`)
- `icp-target-markets-agent` (command: `develop-target-markets-and-icp`)

Also requires: a connected Google Drive-capable connector (read + write), and web search.

## Known limitation

The Drive connector this plugin relies on has no delete capability. If a sub-agent's run is interrupted and retried, or a large file upload gets corrupted mid-transfer, a stray duplicate file can be left in the destination folder. The final reconciliation step in this skill always calls these out by name and file ID so you can remove them manually in Drive — it will never silently leave a gap uninvestigated.

## Usage

Say something like "generate foundation sample data" or "run the foundation sample data plugin." You'll be asked for the source list and how many foundations to run; everything else happens automatically.
