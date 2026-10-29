# Standard membership overview outline (21 slides, cap 22)

Modeled on the x402 Pitch Deck v1 that Member Growth rebuilt from the v1 agent output (Oct 2026), with slide patterns borrowed from the AAIF and CNCF membership overview decks. Three parts, in the order Member Growth presents them. Each line gives the slide, the `layout` key for `scripts/build_deck.py`, and where the content comes from. `references/example-spec-x402.json` is a complete worked spec.

## Part 1 — About the Linux Foundation (slides 1–5)

1. **Title** — `title`. Foundation name, tagline (Message Foundation), month and year. Project mark as the hero image. LF | project lockup. Nothing else: no presenter name, no "briefing" label, no agent attribution.
2. **Agenda** — `agenda`. Exactly three items: *About the Linux Foundation* / *Introducing the [Project] Foundation* / *How to Join as a Member*.
3. **The LF goal** — `statement`. Fixed copy: *The Linux Foundation's **goal is to create the greatest shared technology investment in history** by enabling open collaboration across companies, developers and users.* Sub: *We are the nonprofit organization of choice to build ecosystems that accelerate open source technology development and commercial adoption on a global scale.*
4. **Critical projects** — `image_full`. Title *We are behind some of the most critical projects in the world*; the current LF-approved project logo mosaic by vertical (`assets/lf-project-mosaic.png`). Fallback: `cards` listing the verticals.
5. **Four core factors** — `cards` (2×2). Title *Successful open collaboration ecosystems come down to four core factors.* Fixed copy: **Neutrality** (no one company or organization can "take it away" from the community that forms around a project), **IP Clarity** (removal of intellectual property uncertainty enables anyone to get involved as a contributor or implement as a user), **Open Governance Do-ocracy** (the most successful projects that have stood the test of time have neutral, open governance models where those who do the work make the decisions in a defined governance model), **Financial Support Ecosystem** (encouraging academic, government, and commercial engagement leads to jobs, faster adoption, new contributions and features that address new use cases).

## Part 2 — Introducing the Foundation (slides 6–16)

6. **Introducing the [Project] Foundation** — `two_col`. Left *The [Project] Foundation* (stewards / drives / ensures / hosted by the Linux Foundation — 4 bullets with a bold lead verb). Right *The [Project] standard / project* (what it is, purpose-built for, extensible across, established as "[Project] a Series of LF Projects, LLC" — legal name from the LFX record). Message Foundation locked summary.
7. **Vision, Mission, Strategy** — `vision`. Verbatim from the Message Foundation; strategy as 3 bullets. (ED feedback: keep slides 6–7 short — one screen each.)
8. **The current state** — `rows`. Title names the prospect's problem in their vocabulary (*every API call and every AI agent still has a human-shaped payment flow*). Three label + description rows from the ICP persona pain points; an optional footnote naming the fragmented alternatives (this replaces the v1 "cost of going it alone", "why now" and "landscape" slides).
9. **How it works** — `steps`. Title is the one-sentence promise (*One request, one response, paid.*). Four numbered steps, last one highlighted in the accent. Technical depth stays in notes.
10. **Architecture / composability** — `cards` (3 across, each with an eyebrow label). Why it integrates without lock-in; adjacent protocols it works with.
11. **Already running in production** — `stats`. Six big-number tiles. Defensible rounded figures; exact value, source URL and read date in notes.
12. **Member logos — Premier** — `logo_wall`. Top tier(s) on their own slide.
13. **Member logos — General & Associate** — `logo_wall` with two groups. Split again if a group does not fit; the builder warns.
14. **Leadership** — `person`. *Welcome, [ED name]!* with headshot, title line and a two-sentence bio. Omit if the project has no named ED or lead yet.
15. **What members get that users don't** — `cards` (2×2): **Influence**, **Access**, **Visibility**, **De-risking**. The core value slide — each card names the concrete mechanism (board seat, TSC line, showcase placement alongside named members, neutral governance).
16. **What's next — and where members hold the pen** — `cards` (2×2) of working groups / roadmap items, plus the dashed `callout` *Your priority here — this box is intentionally blank* inviting the prospect to charter a working group.

## Part 3 — How to join as a member (slides 17–21)

17. **Tiers** — `tiers`. Title *Three tiers, one governance structure, one open door* (adjust the count). One card per tier with fee and ≤ 4 short bullets; top tier highlighted dark. `strip` *Open to every member, at every tier* with 4–5 arrowed steps (join at any tier → public meeting calendar → attend technical meetings → join a working group → shape the standard).
18. **Membership ROI by Role** — `table` with columns Persona / Their pain / What membership delivers; one row per ICP persona (4 max).
19. **First 90 days** — `timeline`. *Sign, onboard, ship — inside your first 90 days*: Week 1 Sign (enrollment URL) → Weeks 2–3 Onboard → Weeks 3–6 Integrate → By day 90 Show up.
20. **The ask** — `ask` (dark). One sentence with the hyperlinked sign-up call to action and the membership contact address.
21. **Thank you** — `thanks`. LF | project lockup.

Slide 22 is the only spare: use it for a `section` divider or a second logo-wall split, never for new content.

## Appendix module library (separate file, optional)

Patterns from the AAIF and CNCF membership overview decks for a longer leave-behind, built with the same layouts:

- **Per-tier benefit detail** — one `bullets` slide per tier (Platinum/Premier, Gold, Silver/General, Associate), grouped as project benefits then "Linux Foundation benefits" (event and sponsorship discounts, education vouchers, NPE deterrence, legal summits).
- **Membership fees** — `table` with columns Level / Not yet an LF member / Already an LF member, employee-count bands as rows, footnote on parent-company headcount and the LF Silver prerequisite; enrollment URL.
- **Benefit matrix snapshot** — `table` with one column per tier and ✓ cells.
- **Governance** — `cards` for Governing Board / Technical Committee or TSC / Outreach committee responsibilities; `table` rosters (Member / Name / Title).
- **Working groups** — `table` (group / cadence / questions it works on) and one `cards` slide per group (The challenge / Mission / Scope areas).
- **Projects and velocity** — `stats` or `cards` per hosted project (contributors, contributions, organizations, post-donation growth).
- **Events** — `bullets` of upcoming events with member discount codes and sponsorship contact.
- **Get involved** — `bullets` (working groups, Discord/Slack, GitHub, propose a project, outreach committee, speak, sponsor, program committees).
- **Antitrust policy notice** — `bullets` with the standard LF text.
- **Launch / membership recap** — `stats` (coverage, reach, sentiment, member counts by tier).

## Speaker-notes guidance (write into every deck's notes)

- Tell the story of why the project exists rather than listing features.
- Every figure: exact value, source URL, read date, and whether it is refreshed on a schedule.
- Every slide must answer the prospect's "so what?" — if the note can't say why the slide matters to this prospect, flag it.
- Prospect-specific pain-point mapping and suggested talking points go here, not on the slides.
- The ask slide's notes name the recommended tier for this prospect and the single next step.
- Follow up within 24 hours.
