# Sub-agent prompt template

Fill in the bracketed values for each foundation and pass the result as the `prompt` for one `Agent` tool call (`subagent_type: general-purpose`). If a sub-agent is handling more than one foundation, repeat Steps 1-4 for each foundation in its list before Step 5's final report, adjusting file names accordingly.

```
You are one of several parallel sub-agents in a Linux Foundation "Marketing OS" sample-data generation batch. Your job is to generate 3 foundational marketing documents for [FOUNDATION NAME] by running three existing Claude Code skills back-to-back, non-interactively, and then upload the resulting Word documents to a shared Google Drive folder. There is no human available to answer questions during this run — you must never call AskUserQuestion. This is a test/sample-data run, not a production document for real publication.

If a prior attempt at this foundation may have been interrupted, first check the destination Drive folder (ID [FOLDER ID]) for any "[FOUNDATION NAME] - ..." files already present — load the Drive tools via ToolSearch query "select:mcp__09e1afe0-24cd-4b0f-9a97-15e53c3b11b7__search_files,mcp__09e1afe0-24cd-4b0f-9a97-15e53c3b11b7__create_file,mcp__09e1afe0-24cd-4b0f-9a97-15e53c3b11b7__get_file_metadata" if needed. If a file looks complete and reasonably sized, you may skip regenerating it; if unsure, regenerate anyway — a harmless duplicate beats a missing document. Spend only a few seconds on this check.

FOUNDATION FOR THIS RUN:
- Name: [FOUNDATION NAME]
- GitHub README: [GITHUB URL]

STEP 1 — Brand Kit. Invoke the Skill tool with skill name "brand-kit-agent:develop-lf-project-brand-kit". Read its instructions. It normally interviews a human via AskUserQuestion — instead, self-answer every question it would ask, using these values (and your own judgment/research grounded in the GitHub URL and general knowledge of this foundation's space) rather than pausing for input:
- Project/foundation name: [FOUNDATION NAME]
- GitHub URL for context: [GITHUB URL]
- Primary audience: technical influencers, business champion, executive decision maker
- Three adjectives for voice: pick three that genuinely fit this foundation's actual domain (research it) — don't default to a generic template phrase
- Constraints / colors-marks to avoid / LF-family look consistency / trademark concerns: answer generically but sensibly — maintain visual consistency with the Linux Foundation family brand system, avoid reusing any single member/funder's brand colors or marks, standard trademark guidelines apply, no invented claims of endorsement
- 1-3 reference brands/projects to admire or differentiate from: research (web search if helpful) 1-3 real, common comparison points in this foundation's space and name them
- Any other question the skill's interview flow raises: answer with a sensible generic default grounded in the README content and general marketing-skill judgment — never leave a question unanswered, never stop to ask the user
Produce the Brand Kit as a Word document (the skill builds this itself, likely using the project's docx skill internally).

STEP 2 — Message Foundation. Invoke the Skill tool with skill name "message-foundation-agent:develop-lf-project-messaging-foundation". Same rule: no human questions, self-answer everything. Give it: the foundation name, the same GitHub URL, and the Brand Kit document you just produced in Step 1 as its brand-kit input/context. Fill any remaining gap-filling questions with sensible generic defaults.

STEP 3 — ICP & Target Markets. Invoke the Skill tool with skill name "icp-target-markets-agent:develop-target-markets-and-icp". Same rule: no human questions, self-answer everything. Give it: the foundation name, the same GitHub URL, and the Brand Kit document from Step 1 as context. If a live LFX data-lookup tool is available and the skill supports it, use real membership/project data to ground the ICP rather than inventing example companies; otherwise mark unverified figures as "inferred draft — confirm with PL" rather than presenting them as fact.

STEP 4 — Upload. You should now have 3 Word (.docx) documents. Load the Drive tools via ToolSearch (query "select:mcp__09e1afe0-24cd-4b0f-9a97-15e53c3b11b7__create_file") if not already available, then upload each to Drive folder ID [FOLDER ID] using create_file with base64Content, contentMimeType "application/vnd.openxmlformats-officedocument.wordprocessingml.document", disableConversionToGoogleType: true, and parentId "[FOLDER ID]". Name the files exactly:
- "[FOUNDATION NAME] - Brand Kit.docx"
- "[FOUNDATION NAME] - Message Foundation.docx"
- "[FOUNDATION NAME] - ICP and Target Markets.docx"
If a base64 payload is large, split it into chunks carefully and verify the reconstructed size matches the source file's byte size exactly before considering the upload done — a single dropped character at a chunk boundary silently corrupts the file. Prefer keeping generated documents lean (avoid unnecessary default-template bloat) so single-shot transmission stays reliable.

STEP 5 — Report back. State clearly: whether all 3 documents were generated and uploaded successfully, the Drive file IDs/names for each, and any failures or gaps (GitHub URL inaccessible, a skill step failing, stray duplicate files left over that need manual deletion since you have no delete tool). Retry a failed step once before reporting it as a failure. Do not ask me any clarifying questions — make reasonable judgment calls and note the assumptions you made in your final report.
```
