# Report spec — live HTML artifact

The report is one persistent Cowork artifact per project, id `community-monitor-<project-slug>`, title `Community Monitor — [Project]`. Create it on the first run; update it (same id) on every later run so the user always opens the latest report from the same place.

## Layout

1. **Header** — project name, run timestamp, report mode, counts: `X new · Y high priority · Z drafted replies`.
2. **High priority queue** (P1 then P2) — one card per item:
   - Question summary (one line, plain language) and the original text (collapsible).
   - Source badge (Slack channel name or repo) linking to the permalink.
   - Asker line: name, company, value score badge, and the evidence string ("Gold member — Acme Corp; TAC member").
   - Sentiment chip (frustrated / concerned / neutral).
   - **Respond mode only:** drafted reply in an editable `<textarea>`, plus:
     - Slack items: a **Send to Slack** button — see mechanics below.
     - GitHub items: a **Copy reply** button (clipboard) and an **Open on GitHub** link to the issue/comment; GitHub has no connector, so the user pastes the reply there.
   - A **Dismiss** button that hides the card (persist dismissed ids in `localStorage`).
3. **Everything else** — compact table (full mode: all items; priority/respond modes: P3 counts only).
4. **Footer** — amplification opportunities (positive mentions), data gaps (sources that failed or were skipped), and "Last run" timestamp.

## One-click Slack reply mechanics

- Before building the artifact the first time, call the Slack send tool once in chat (e.g. send a draft or inspect the tool schema) to confirm the exact tool name and parameters exposed by the user's Slack connector — commonly `slack_send_message` with `channel`, `text`, and `thread_ts`. Build against what was observed, not assumptions.
- List that tool in the artifact's `mcp_tools`.
- The Send button handler:

```js
async function sendReply(btn, channel, threadTs, textareaId) {
  btn.disabled = true; btn.textContent = 'Sending…';
  const text = document.getElementById(textareaId).value;
  const r = await window.cowork.callMcpTool('slack_send_message',
    { channel, thread_ts: threadTs, text });
  if (r.isError) { btn.disabled = false; btn.textContent = 'Retry send'; showError(r); return; }
  btn.textContent = 'Sent ✓';
  const sent = JSON.parse(localStorage.getItem('cm_sent') || '[]');
  sent.push(textareaId); localStorage.setItem('cm_sent', JSON.stringify(sent));
}
```

- Always send into the original thread (`thread_ts`), never as a new channel message.
- On load, re-disable Send buttons whose ids are in `localStorage` `cm_sent`, so a reload can't double-send.
- The textarea is editable — the user can adjust the draft before clicking Send.

## Safety rules

- **No reply is ever posted without the user's click** (or an explicit "send reply N" in chat). There is no auto-send mode, even if asked to "fully automate" — offer the one-click queue instead and explain why.
- Replies send from the user's own Slack identity via their connector; the draft must therefore read as the user, not as a bot.
- Never include member-tier or value-score information in the reply text itself — scoring is internal triage, not something the community should see.
- Keep the artifact self-contained: inline CSS/JS only (Chart.js/Grid.js/Mermaid from CDN are the only allowed external loads; none are usually needed here).

## Chat summary (accompanies every run)

Two or three sentences: how many new items, the top 2–3 high-priority questions with who's asking, and how many drafted replies are waiting in the report. Do not restate the whole report in chat.
