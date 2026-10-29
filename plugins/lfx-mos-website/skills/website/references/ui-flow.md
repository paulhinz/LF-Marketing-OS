# Marketing OS UI flow

How the website skill appears inside Marketing OS. The reference is the prototype (Website Skill Prototype, https://claude.ai/artifact/YVzjtBJtHBySEiN9iCfUPe). It uses the real Akrites build and editors; publishing and the Asana task are simulated. The skill itself stays stateless: the host renders these screens from the skill's JSON output.

## Look
Marketing OS (LFX Insights) shell, one light theme.

| Token | Value |
|---|---|
| Ground, surface, sunk | `#F9FAFB`, `#FFFFFF`, `#F1F5F9` |
| Ink, text, muted | `#0F172A`, `#334155`, `#5A6A7E` (muted darkened from `#64748B` to pass 4.5:1 on the sunk panels) |
| Lines | `#E2E8F0`; form field borders `#8796A9` (3:1) |
| Accent, bright, soft | `#006DBE`, `#0094FF` (focus ring, hover borders), `#EBF5FF` |
| Status | ok `#047857`, warn `#B45309`, bad `#B91C1C` (darkened from `#DC2626` for 4.5:1 on its soft fill), each with a soft fill |
| Owners | IT `#0F766E`, Engineering `#6D28D9`, Web team `#C2410C` |
| Type | Roboto Slab (page titles 300, section heads 700), Inter (body), Roboto Mono (labels, eyebrows, file names) |
| Shape | panels radius 10 px with a light shadow; buttons and chips are pills |

The editor (`edit.html`) uses the same tokens (`EDITOR_CSS` in `sitegen.js`).

## Layout
1. **App bar** (sticky): "Marketing OS", breadcrumb `Website & Analytics › Website skill`.
2. **Page head**: "Build the website", one line of context, a project chip (logo colours, name, domain) with **Start over**.
3. **Step bar** (sticky): five steps, each with a live status. Every step is clickable; nothing is greyed out. Finished steps show a check and a green connector. Under 720 px: numbers only, plus a "Step n of 5 · Name · Status" line.
4. **Workspace**: full width, one step at a time.
5. **Action bar** (fixed bottom): **Back**, a one-line message saying what happens next, and the primary button. Under 720 px the message hides and the primary button fills the bar.

## Steps

| # | Step | Status in the step bar | Primary button | Gate |
|---|---|---|---|---|
| 1 | Sources | `8 of 8 found` (from the inputs found) | Build and audit | Required: `mh`, `bp`, `kit`, logos. If any is missing, the step lists it and offers the skill that makes it |
| 2 | Build and audit | Not run → Running… → Passed / Failed | Preview the site | Result first (passed or failed, with the counts), then the figures, then the build log folded away. The button shows "Building…" and stays disabled while it runs. Nothing after this step is offered until `a11y.passed` |
| 3 | Preview and edit | Not viewed → Viewed | Choose where it lives | The full editor at full width, sized to the screen. Copy edits carry into every hosting option |
| 4 | Where it lives | Not chosen → option name | Depends on the option (below) | Options on the left; details for the chosen one on the right (sticky): who hosts it, how it's edited, the next step, the files `finalize.js` writes, and a preview of the editor the marketer gets. The primary button is disabled until an option is picked |
| 5 | Hand off | Waiting → In progress → Done | Approve (options 1 and 2), then Try another option | A recap (project, audit, hosting) at the top. Options 1 and 2 show the publish steps with an owner on each; 3 shows the README's GitHub steps; 4 confirms the Asana task and asks for the zip to be attached |

Primary button per option on step 4, and the confirmation shown beside it before anything happens:

| Option | Button | Confirmation |
|---|---|---|
| Maintain in Marketing OS | Send to the publish skill | Send the launch request for approval and publishing? |
| Publish on LF GitHub | Send to the publish skill | Same |
| Export for a separate GitHub | Hand over the zip | Package the zip for the project's own GitHub? |
| Host on WordPress | Create the Asana task | Create the Web Requests task, then you attach the zip? |

## Copy
Claude speaks once at the top of steps 1, 3 and 5, in a message with a left accent border. Use plain sentences that name the next decision: "Ready to build?", "Tell me where it should live." Other steps carry no Claude message; the result and the action bar say enough.

## Accessibility
The step bar is a `nav` with `aria-current="step"`; the build result and the action-bar message are live regions; focus moves to the step heading on every change; the editor preview opens in a modal `dialog`. The prototype passes axe-core WCAG 2.2 AA at 1280 and 390 px in every step.
