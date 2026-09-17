# Beyond-the-brief research sweep

The generating agents are careful with what they are given and blind to what they are not. In the x402 run they used the interview, the README, the homepage and LFX — and never opened the site's Get Involved page (four named working groups), the facilitator directory (fifteen production facilitators, several of them members), the intent-to-launch press release (the origin story, Cloudflare's role), the originator's own announcements (an official extension of a member's protocol, a year old), or a competitor search (a Premier member's like-for-like protocol, six months old). A marketer with one afternoon would have found all five. This sweep is that afternoon, made repeatable.

Run it before the brand review, because what it finds changes which claims are true.

## Sources to open, in order

1. **The project site, every top-level navigation item.** Get Involved (working groups, meeting calendar, mailing lists, Slack), Members (tiers, published pricing, benefits, current roster — this is the public source for any external roster), Announcements and Blog (dates, quotes, adopters), Docs (directories: facilitators, integrations, network support, ecosystem tools), Reports, Contact. Record the exact anchors and URLs the CTA library will need.
2. **The GitHub organization.** README, CONTRIBUTING (acceptance criteria), ROADMAP, LICENSE, `specs/` or equivalent, GOVERNANCE or MAINTAINERS if present, and the org's other repositories (SDKs, examples, community lists). Count packages and schemes yourself.
3. **The LF press archive.** Search linuxfoundation.org/press for the project name. There are usually two releases: intent to launch (founding members, origin, who designed governance) and operational launch (member count, named members by tier, executive quotes). Both are Legal-approved wording — reuse it.
4. **The originator's announcements.** The company that contributed the project (launch post, the foundation announcement with any co-founder, integrations with other protocols). These give the real timeline; LFX formation dates are when the LF record was created, not when the project began.
5. **Competitor and adjacent-protocol scan (web search).** Queries: `"<project>" vs`, `<project> alternative`, `<category> protocol comparison`, `<each Premier member> <category>` (a member's own product in the same category is the one the interview forgets), `<project> extension`, `<project> integration <big platform>`. Look specifically for a like-for-like alternative from a member, because that one needs the "peer, not enemy" treatment and cannot be left out.
6. **What members already built.** Directories, marketplaces, explorers, SDK listings. These fill the "Case 2 / Case 3 — TBD" slots with public information and are the proof for any "ecosystem" pillar.
7. **Standards and dates.** Any RFC, standard, or "since 19xx" claim: open the primary document and record the publication month and year.

## What to record

A "Found beyond the brief" table:

```
| Item | Source (URL, date read) | Which document and section should use it | Why it matters |
```

Keep it to items that change a claim, fill a TBD, or hand a persona its hook. Ten strong rows beat forty trivia rows.

Also record a **timeline** (origin, foundation announcement, intent to launch, operational launch, major integrations) with a source per row. The origin story section of the Message Foundation should match it.

## Where findings go

| Finding type | Destination |
|---|---|
| A named working group | Message Foundation CTA library (Engage), ICP persona hooks (a "Card Acceptance" group is the hook for card networks; "Tax" or "Identity" for compliance and legal personas) |
| A directory of production integrators | Message Foundation §11 case slots, Pillar proof points, ICP-C trigger events |
| A member's like-for-like product | ICP competitive landscape with peer framing, Message Foundation objections ("why not X") and the UVP wording (drop "only") |
| An official integration with another protocol | Message Foundation proof points, ICP competitive landscape ("complementary — established fact, not a framing to confirm") |
| Origin timeline | Message Foundation origin story; Stat Bank S-row for dates |
| Published pricing and benefits | CTA library "Commit" rows (replace "confirm exact benefits" with the published benefit) |
| A stat in a press release | Stat Bank as Published type with the release as source |

## Worked example — x402 (read 2026-09-16)

| Item | Source | Destination | Why |
|---|---|---|---|
| Four working groups: Domain Discovery, Identity, Tax, Card Acceptance | x402.org/get-involved | MF §14 E1; ICP personas B1/B2/C2 | "Card Acceptance" is the hook for card-network and PSP prospects; "Tax" and "Identity" for the compliance persona |
| Facilitator directory lists ~15 production facilitators incl. members Fireblocks, NEAR, Polygon, t54 | docs.x402.org/dev-tools/facilitators | MF §11 Case 3, Pillar 3 proof, ICP-C | Fills a TBD from public information; proves the ecosystem claim |
| Stripe and Tempo's Machine Payments Protocol (announced March 18, 2026; Stripe states it supports both MPP and x402) | stripe.com/blog/machine-payments-protocol | ICP §1.2 landscape; MF §5 UVP; MF §12 objection 3 | Most direct like-for-like alternative, from a Premier member; makes "the only payment standard inside the HTTP request" untenable |
| x402 has been an official extension of Google's AP2 since September 16, 2025 | coinbase.com developer-platform launch post | ICP §1.2 AP2 row | The "confirm with Google" hedge can be replaced with the public fact |
| Coinbase and Cloudflare announced the x402 Foundation on September 23, 2025; the April 2, 2026 LF release says Coinbase, Cloudflare and Stripe developed the initial governance structure | Cloudflare/Coinbase release; LF release 2026-04-02 | MF §11 origin story; S21 | Origin story currently starts at LFX record dates and omits Cloudflare |
| Premier benefit "Appointed seat on the Governing Board"; General tiers $75K / $50K / $25K by headcount; Associate free for eligible nonprofits and academics | x402.org/members | MF §14 C1, C2 (remove "confirm exact benefits"); ICP §1.4 | Published, Legal-approved wording |
| HTTP/1.1 first published as RFC 2068, January 1997, listing 402 Payment Required | rfc-editor.org/rfc/rfc2068 | S24 and the sound bite bank | The "reserved in 1999 / 27 years" line is wrong |
