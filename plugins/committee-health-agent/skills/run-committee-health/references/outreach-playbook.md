# Outreach playbook

## Approval flow (non-negotiable)

1. Draft every email first; nothing is sent during drafting.
2. Present drafts in chat grouped by outreach type: recipient, subject, body, and the flag it addresses.
3. The user approves individually, edits, or says "approve all". Only then call `send_email`, marking each Outreach Queue row Sent.
4. If the user doesn't respond or sending is unavailable, leave drafts in the Outreach Queue tab with Status = Draft and say so in the summary.

Check `list_email_templates` before drafting; adapt an LF template when one fits the outreach type. Send from the user's identity/project address per LFX configuration — never invent a sender.

## Personalization rules

Every draft must include: the rep's or contact's name, the specific committee, a concrete fact from the evidence (last meeting attended, seat entitlement, meeting cadence), and one specific, easy ask with a date. Never send a generic "just checking in". Keep emails under 150 words, warm and factual, zero guilt-tripping — the tone is "we value the seat" not "you've been absent".

## Templates

Fill `[brackets]` from run data. Adjust voice to match any project Brand Kit in the working folder.

### Follow-up (Low Activity / recently Inactive rep)

> **Subject:** [Committee] at [Project] — we'd love to have you back at the table
>
> Hi [First name],
>
> You hold [Company]'s seat on the [Project] [Committee], and we've missed you — our records show your last meeting was [date]. A lot has moved since then, including [one concrete recent committee item].
>
> The next meeting is [date/time]. Could you join, or let me know if a different cadence or format would work better for you? If your role has changed, happy to talk through options.
>
> Thanks for all you've contributed so far,
> [Sender name], [Project]

### Replacement (Outdated or long-Inactive rep — sent to the company's key contact)

> **Subject:** [Company]'s seat on the [Project] [Committee] — naming a representative
>
> Hi [Key contact first name],
>
> [Company] holds a seat on the [Project] [Committee], currently listed under [rep name]. Our records suggest [he/she/they] [has left the company / hasn't been able to participate since [date]], and we want to make sure [Company] keeps its voice in these decisions.
>
> Could you nominate a representative in the next two weeks? The commitment is [cadence, e.g., one 60-minute meeting per month]. I'm glad to brief whoever you choose before their first meeting.
>
> Best,
> [Sender name], [Project]

### Seat-fill / contact recovery (company with unfilled seat or no active contact)

> **Subject:** [Company]'s [membership tier] benefits at [Project] — an open seat with your name on it
>
> Hi [Key contact first name],
>
> As a [tier] member of [Project], [Company] is entitled to [specific entitlement, e.g., a seat on the Governing Board / Marketing Committee] that's currently unfilled. Members in that seat shape [one concrete thing the committee decides].
>
> Who at [Company] would be the right person? Send me a name and I'll handle onboarding — it takes one email and about 30 minutes.
>
> Best,
> [Sender name], [Project]

### Escalation memo (to the ED — chat/Slack or email, not to the member)

Short internal note, not a template email: the committee or company at issue, the specific risk (quorum, renewal exposure, zero reachable contacts), what's already been tried, and one recommended next step with a deadline. Keep to 5 sentences.

## Cadence and etiquette

- Do not re-draft outreach to someone contacted by this agent within the last 30 days (check prior run's Outreach Queue); note "recently contacted, skipped" instead.
- One rep departed + company has other active reps → skip replacement outreach, just note the roster correction and offer to update LFX (`update_committee_member` / `delete_committee_member`) on the user's instruction.
- Anything the user edits in a draft: apply verbatim, then offer once to save recurring phrasing changes for future runs.
