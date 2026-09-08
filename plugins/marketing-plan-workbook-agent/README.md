# Marketing Plan Workbook Agent

LFX Marketing OS **Planning** agent (Plan-type in the References | Plan | Create | Execute | Monitor landscape).

Generates a pre-filled, question-driven **marketing plan workbook** (.pptx, Google Slides-ready) for one Linux Foundation project/foundation. The workbook is sent to the foundation's ED/Project Leader before a planning interview; their corrections and answers, captured in the workbook, feed the final marketing plan generation step.

## What it does

1. **Pulls the data** — the LF master foundation tracker (roster, budgets, plan links, events), the foundation's past marketing plan and H2 update from Google Drive, LFX metrics (memberships by tier, contributors, contributing organizations), and market context from the web.
2. 2. **Builds the workbook** — a ~25-32 slide deck mirroring the PyTorch Foundation 2026 integrated plan's five parts: The Story, The Goals (five, ranked), Message & Audiences, One Plan / One Engine, Execution.
   3. 3. **Marks every draft** — each pre-filled slide carries a `DRAFT — CONFIRM OR CORRECT` badge, slide notes carry data provenance, and each part ends with `YOUR INPUT` slides of lettered questions with answer boxes. Unknowns become questions, never invented facts.
     
      4. ## Usage
     
      5. Say: `create a marketing plan workbook for [foundation]` (e.g., OpenSSF, LF Energy).
     
      6. ## Requirements
     
      7. - Google Drive connector (master tracker + past plans)
         - - LFX connector (metrics baselines)
           - - Web search (market stakes data)
            
             - Missing connectors degrade gracefully: the gap becomes a question in the workbook.
            
             - ## Workflow position
            
             - Workbook (this agent) → foundation leader review → planning interview → **final marketing plan generation agent** (downstream) → planning/creating/executing agents.
