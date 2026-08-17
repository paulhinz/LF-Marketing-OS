# Committee Health model

## Representative status

Evaluated over the analysis window (default trailing 12 months). Default inactivity threshold: no participation in 180 days (user-overridable in Step 1).

| Status | Definition |
|---|---|
| **Active** | Attended ≥50% of committee meetings in the window AND activity within the last 90 days (attendance, mailing-list post, or upcoming-meeting registration). |
| **Low Activity** | Some activity in the window but <50% attendance, OR last activity 90–180 days ago, OR zero attendance but registered for a meeting in the last 90 days. |
| **Inactive** | No participation of any kind within the inactivity threshold (default 180 days), and no positive evidence of departure. |
| **Outdated** | Positive evidence the rep has left the member company or changed roles (org mismatch, bounce, cited public source) — regardless of attendance. |
| **Unverifiable** | Zero activity in the window and currency checks found no evidence either way. Treated as Inactive for committee scoring but routed to follow-up, not replacement. |

Be conservative: Outdated requires positive evidence. When unsure between Inactive and Outdated, choose Inactive/Unverifiable.

## Participation score (per rep, per committee, 0–100)

- Attendance rate × 60 (attended ÷ held)
- Recency × 25 — 25 if activity ≤30 days ago, linear decay to 0 at the inactivity threshold
- Engagement extras × 15 — mailing-list posts (≤10), upcoming-meeting registration (5)

If mailing-list data is unavailable, reallocate its points to attendance (score = attendance rate × 70 + recency × 25 + registration × 5) and note it in the Method tab.

## Committee health score (per committee, 0–100)

- Active coverage × 40 — share of seats held by Active or Low Activity reps
- Attendance trend × 20 — average attendance rate of last 3 meetings vs. prior 3 (stable/rising = full points)
- Seat fill × 20 — filled seats ÷ (filled + entitled-but-unfilled)
- Meeting regularity × 20 — met at expected cadence in the last 2 quarters (infer cadence from history)

Bands: 80–100 Healthy · 60–79 Watch · 40–59 At Risk · <40 Critical.
**Quorum-risk flag**: set when Active reps < the committee's quorum requirement (if known from charter/settings) or when <50% of voting seats are Active.

## Member-company active-contact rule

A member company **has an active contact** when at least one of the following is Active or Low Activity: any committee rep affiliated with the company, or any LFX key contact with activity in the window. Otherwise the company goes on the Companies Without Active Contact tab, with membership tier, renewal date if available, and every known-but-inactive contact listed.

Also flag per company: entitled committee seats left unfilled (from membership tier entitlements vs. actual seats held).

## Routing rules

Exactly one action per flagged rep or company. Owner ∈ {Project Leader, Executive Director, Marketing}.

| Condition | Action | Default owner |
|---|---|---|
| Low Activity rep | Follow-up outreach (re-engage) | Project Leader |
| Inactive rep, company has other active contacts | Follow-up outreach, cc company key contact | Project Leader |
| Inactive rep >2× threshold, or Unverifiable with company unresponsive | Replacement outreach to company key contact | Executive Director |
| Outdated rep | Replacement outreach to company key contact | Executive Director |
| Company with unfilled entitled seat | Seat-fill outreach to key contact | Marketing |
| Company without any active contact | Seat-fill/contact-recovery outreach; if no deliverable address exists, Escalation | Marketing → ED |
| Committee at quorum risk | Escalation memo to ED with the specific seats to fix first | Executive Director |

## Priority

Priority = severity × company weight.

- Severity: quorum-risk committee seats and no-active-contact companies = High baseline; Outdated = High; Inactive = Medium; Low Activity = Low.
- Company weight: bump one level if membership tier is top-2 for the project or renewal is within 2 quarters; never bump downward.

Order the Outreach Queue by priority, then by committee health score ascending (worst committees first).
