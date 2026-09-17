# Worked example — x402 foundational documents, QA run of 2026-09-16

Documents reviewed: x402 Brand Kit (Draft v1), x402 Message Foundation (Draft v1), x402 Target Markets and ICP (Draft v1), all dated September 16, 2026, produced by the LFX Marketing OS Brand Setup, Message Foundation and ICP & Market Target agents at Paul Hinz's request. This file is the regression baseline for the skill: a correct QA run on these three documents finds everything below.

## Gate decision

**PASS WITH FIXES.** Nine High findings, every one with a drop-in replacement. The documents are structurally stronger than a typical in-house first draft and match a good agency messaging platform on copy craft and provenance. They must not go external until the entity wording, the sound-bite date, the "only" claim and the competitive landscape are fixed, and Legal has seen the compliance list.

## 1. Entity and trademark

See `entity-lint.md`, worked example. One root error in Brand Kit §1 propagated to eleven locations across the three documents (eight exact copies, three looser "governed under LF Projects, LLC" variants). Trademark holder misstated in Brand Kit §6 and Message Foundation §15.

## 2. Stat Bank verification

See `stat-bank-verification.md`, worked example. 24 of the 25 S-rows MATCH or are NOT ONBOARDED exactly as the document states; S24 is a MISMATCH (year); the license open item can be closed. Additional checks: site palette and typography verified against computed styles on x402.org (Inter 16px #676767 body on #FFFFFF; Instrument Serif 400 headings; #0A7739 the only green on the page; links #222222); all eight WCAG ratios recomputed and exact; 25-, 50- and 139-word derivatives exact; the elevator pitch labeled "84 words" is 93.

## 3. Found beyond the brief

See `research-sweep.md`, worked example: working groups, facilitator directory, Stripe/Tempo MPP, the AP2 extension, the origin timeline, published benefits and pricing, RFC 2068.

## 4. Claims, dates and superlatives

| Claim | Location | Problem | Replacement |
|---|---|---|---|
| "402 was reserved in 1999. It took the internet 27 years to use it." | MF §8 sound bites, §13 sound bite bank (Keynote, press, social); S24 | HTTP/1.1 first published as RFC 2068, January 1997, with 402 listed; 2616 (1999) is the revision | "402 Payment Required has been in the HTTP spec since 1997. x402 finally uses it." S24: RFC 2068 §10.4.3 (Jan 1997); carried in RFC 2616 (1999) and RFC 9110 (2022) |
| "the only payment standard that lives inside the HTTP request itself" | MF §5 UVP | Superlative without proof; L402 and Stripe/Tempo MPP are HTTP-native | See before/after 2 |
| "Coinbase remains the largest single contributor to the codebase and the operator of the public facilitator" | MF §12 objection 4, What we admit | Superlative with no Stat Bank row (S19/S20 are TBD); facilitator operator unverified; about a Premier member | See before/after 5 |
| "for less than most single-vendor integrations cost" | MF §6a (CFO row); ICP persona B1 statements | Comparative cost claim, no basis | Delete the clause or cite a published list price (S2) |
| "with 53 member organizations including the major card networks, PSPs, cloud providers, and stablecoin issuers" | MF §6 payments-leader core message | "the major" implies all; three of the global card networks are members | "including major card networks, PSPs, cloud providers, and stablecoin issuers (S23)" |
| "Fifty-three companies at one table" | MF §8, §10 hero set, §13 | 12 of 53 are nonprofits, foundations and associations | "Fifty-three organizations at one table" |
| "stablecoin settlement that clears in seconds for fractions of a cent" | ICP §1.1 | Performance claim without a source | Cite a network's published figure or drop to "settles onchain" |
| "Regulated participants join because a neutral, public standard is easier to assess…" | MF §12 objection 2 rebuttal | Motive attributed to named regulated members | Replace with the members' own launch quotes (Visa, Mastercard, American Express, Adyen, Fiserv, Stripe are all quoted in the July 14 release) |
| "publish the audit history it references on x402.org" | MF §12 objection 1 | No audit history found in the pages read during the sweep | Verify on the site or delete |
| "governed by … LF Projects, LLC, with a public charter" as the source of Governing Board / membership rights | MF §7 Pillar 2, §9 value message 2; ICP persona B2 | The public charter is the technical charter (TSC only); board seats come from the participation agreement and the published benefits | "with a public technical charter and a Governing Board of Premier members (x402.org/members)" |

## 5. Brand review

### Summary

Alignment with the Brand Kit's own voice (Secure, Open, Definitive, Direct) is high across all three documents: mechanism before adjective, protocol terms used exactly, no buzzwords, competitors differentiated by category. The two biggest strengths are the Stat Bank discipline (every number carries a window, a source and a caveat) and the honesty about gaps (inferred items labeled, TBDs left as TBDs). The two most important improvements are the governance wording, which is wrong in the locked copy, and the superlatives that the documents' own rules forbid — "only", "largest", "the major" — each of which appears without its proof point.

### Findings

| Issue | Location | Severity | Suggestion |
|---|---|---|---|
| "x402 Foundation, a Series of LF Projects, LLC" — the Foundation is the membership program under The Linux Foundation; the Series LLC is the protocol project. Eight exact occurrences plus three "governed under LF Projects, LLC with a public charter" variants | Exact: BK §1, At a Glance, §5, §6; MF §2a boilerplate, §7 Pillar 2, §9 VM2, §15 hard constraints. Variants: MF §12 objections 2 and 4 evidence rows; ICP persona B2. (MF §0, §3 Do/Don't and llms.txt have it right: "stewarded by the x402 Foundation under the Linux Foundation".) | High | Use the derived governance sentence (entity-lint.md); route to Legal with the July 14 release wording |
| Trademark said to belong to "the x402 Foundation, a Series of LF Projects, LLC" | BK §6; MF §15 | High | "x402 is a trademark of LF Projects, LLC" per the technical charter |
| "402 was reserved in 1999… 27 years" | MF §8, §13; S24 | High | Fix the year; see §4 |
| "the only payment standard that lives inside the HTTP request itself" | MF §5 | High | Rewrite without "only"; see before/after 2 |
| Stripe/Tempo Machine Payments Protocol absent from the competitive landscape; "each alternative delivers one or two of those" no longer holds | ICP §1.2, whitespace paragraph | High | Add an MPP row with peer framing (Stripe is a Premier member; Stripe supports both); update MF §12 objection 3 |
| "largest single contributor" and "operator of the public facilitator" about Coinbase, unverified, in an admission | MF §12 objection 4 | High | See before/after 5 |
| Comparative cost claim "for less than most single-vendor integrations cost" | MF §6a; ICP B1 | High (comparative, unsubstantiated) | Delete or cite list price |
| Motives attributed to regulated members | MF §12 objection 2 | High (attribution) | Use their published quotes |
| Membership list-price and revenue figures (S2, S3, S5) in a document that names agencies as consumers | MF §10 | High (confidentiality) | Keep S5 and tier values in an internal appendix; strip from agency-facing copies |
| Positioning statement is a single 90-word sentence | MF §4 | Medium | Split into three sentences; see before/after 4 |
| "the major card networks" | MF §6 | Medium | "major card networks" |
| "Fifty-three companies" | MF §8, §10, §13 | Medium | "organizations" |
| "General buys a vote"; "Associate membership is zero list price" | ICP persona C2 statements | Medium | "General members elect a representative to the Governing Board; Associate membership is free for eligible nonprofits" |
| "stablecoin settlement that clears in seconds for fractions of a cent" | ICP §1.1 | Medium | Source or soften |
| Charter cited as the source of board/membership rights | MF §7, §9; ICP B2 | Medium | Cite the participation agreement / published benefits |
| "audit history it references on x402.org" | MF §12 objection 1 | Medium | Verify or delete |
| Origin story starts at LFX record dates; omits Coinbase's 2025 launch and the Cloudflare/Coinbase foundation announcement | MF §11; S21 | Medium | Add the timeline from research-sweep.md |
| AP2 row hedged ("confirm that framing with Google") on a public fact | ICP §1.2 | Medium | State that x402 is an official AP2 extension (Sept 2025) and cite it |
| "programme" (LFX spelling) vs. US spelling elsewhere | MF §10 window note, §15 naming conventions | Low | "program" |
| Undated metric in the LinkedIn channel example ("75M transactions in 30 days") | BK §9 | Low | Add "as of <date>" to the example — the rule applies to examples |
| Elevator pitch labeled 84 words; it is 93 | MF §2 | Low | Relabel or trim to 84 |
| "License: Apache 2.0 (confirm…)" and "Confirm exact benefits against the membership page" | BK At a Glance; MF §2a, §14 C2 | Low | Both confirmed; close the open items |
| "4 committees onboarded" counts the LF Staff group | MF S9 | Low | "three governance committees (Governing Board, TSC, Marketing)" |
| "Velocity Engine dimensions" undefined for an external reader | ICP §2 | Low | Define once or drop the label |
| "This Word document uses Georgia and Calibri as installed stand-ins" | BK §7 Component 3 | Low | Remove generation artifact |
| Pillar names in code formatting (`Secure by Spec`) | MF §7 | Low | Plain text |

### Before / after

**1. Boilerplate governance clause (MF §2a; the same fix applies to every location in the findings table)**

Before: "Contributed by Coinbase and stewarded by the x402 Foundation, a Series of LF Projects, LLC, under the neutral governance of the Linux Foundation, x402 is developed in the open under the Apache 2.0 license with reference SDKs in TypeScript, Python, and Go."

After: "Contributed by Coinbase, x402 is developed in the open under the Apache 2.0 license as x402, a Series of LF Projects, LLC, with reference SDKs in TypeScript, Python, and Go, and is stewarded by the x402 Foundation, an open-governance body at the Linux Foundation." (Wording to be confirmed by LF Legal; the Foundation description is the July 14, 2026 release's.)

**2. Unique value proposition (MF §5)**

Before: "x402 is the only payment standard that lives inside the HTTP request itself, is governed by a neutral foundation rather than a vendor, and treats AI agents and humans as the same kind of client."

After: "x402 puts payment inside the HTTP request itself, treats AI agents and humans as the same kind of client, and is governed by a neutral foundation rather than a vendor. Single-vendor schemes offer the first two; none offers all three."

**3. Sound bite (MF §8, §13)**

Before: "402 was reserved in 1999. It took the internet 27 years to use it."

After: "402 Payment Required has been in the HTTP spec since 1997. x402 finally uses it."

**4. Positioning statement (MF §4)**

Before: one 90-word sentence beginning "For developers and businesses who need to charge for anything on the internet, from a single API call to an AI agent's autonomous purchase, x402 is the open payment standard built into HTTP that lets any client pay any server in one request, on any network, with zero protocol fees and no accounts — unlike…"

After: "For developers and businesses that need to charge for anything on the internet, from a single API call to an AI agent's purchase, x402 is the open payment standard built into HTTP. Any client pays any server in one request, on any network, with zero protocol fees and no accounts. Unlike account-first payment APIs, card rails built for human checkout, single-asset micropayment networks, and single-vendor agent-payment schemes, x402 is governed neutrally under the Linux Foundation and owned by no one."

**5. Objection 4, "What we admit" (MF §12)**

Before: "Coinbase remains the largest single contributor to the codebase and the operator of the public facilitator, and contributor diversity is not yet measurable in LFX (S19, S20). The Foundation should onboard the repository to LFX Insights and publish contributor-by-organization figures as they broaden."

After: "Contributor diversity is not yet measurable in LFX (S19, S20). Until github.com/x402-foundation is onboarded to LFX Insights, describe Coinbase's ongoing role only in the words of the launch release ('contributed by Coinbase'), and confirm who operates the x402.org public facilitator before stating it. Publish contributor-by-organization figures as they broaden."

### Legal and compliance flags

1. Governance and trademark wording in locked boilerplate and llms.txt — LF Legal to confirm the derived sentences before any publication.
2. "Only" claim in the UVP — remove; a like-for-like alternative from a Premier member exists.
3. Comparative cost claim about membership — remove or substantiate; LF membership development decides.
4. Motives and roles attributed to named members (objections 2 and 4) — replace with their published quotes; Foundation ED to review the objection set before use with regulated members, as the document itself requests.
5. Membership revenue figures in an agency-consumable document — restrict to internal appendix.
6. Regulatory language in objection 2 (stablecoin treatment, compliance obligations) — Legal review before use.
7. Performance claim "clears in seconds for fractions of a cent" — source or remove.
8. External roster references must cite x402.org/members or the press release, never the LFX export; the ICP document's §1.4 is internal-only and should say so.

## 6. Cross-document consistency

The positioning chain (BK §2 → MF §1 Positioning Platform → MF §4 → ICP §1.1) makes the same claim. Every S-ID and CTA ID cited in the ICP exists in the Message Foundation. Tier counts agree in all three. Two conflicts: the Brand Kit's Appendix A still describes the Message Foundation as "derivatives only" after the requester chose full scope (the MF flags this; update the Brand Kit); and the entity sentence differs between MF §3 Do/Don't ("stewarded by the x402 Foundation under the Linux Foundation" — correct) and the boilerplate (wrong). The propagation list for the entity error is eleven locations (see findings).

## Fix list (ranked)

1. Replace the governance clause in all eleven locations; send to Legal. (High)
2. Replace the trademark line in BK §6 and MF §15. (High)
3. Fix S24 and the two sound bites built on it. (High)
4. Rewrite the UVP without "only". (High)
5. Add Stripe/Tempo MPP to ICP §1.2 with peer framing; update MF §12 objection 3 and the whitespace paragraph. (High)
6. Rewrite objection 4's admission; verify the facilitator operator. (High)
7. Delete the comparative cost clause in MF §6a and ICP B1. (High)
8. Replace attributed motives in objection 2 with published quotes. (High)
9. Move S5 and tier list prices to an internal appendix. (High)
10. Split the MF §4 positioning statement. (Medium)
11. Add the working groups to MF §14 and the personas; add the facilitator directory to MF §11 Case 3 and Pillar 3. (Medium)
12. Add the origin timeline to MF §11 and S21. (Medium)
13. Wording fixes: "major card networks", "organizations", "General members elect…", "program". (Medium/Low)
14. Close the license and benefits open items; relabel the elevator pitch; remove generation artifacts. (Low)

## Two-page digest (for Paul and the x402 Foundation marketing lead)

Verdict: strong, usable, not yet external. The three agents produced a coherent, verifiable package — the roster, the install series, the palette and the contrast math are exact, and every number carries its source. The problems are the four things an agent does not do unless told: it copied a governance sentence nobody checked, it repeated a date from a marketing summary instead of the RFC, it did not search for a competitor the interview forgot, and it did not open the project's own Get Involved page.

Fix before anything ships: the governance and trademark wording (Legal), the 1997/1999 date, the "only" claim, the missing Stripe/Tempo MPP row, and the two claims about Coinbase.

Found beyond the brief: four named working groups (use "Card Acceptance" with card networks and PSPs, "Tax" and "Identity" with legal and compliance), a directory of about fifteen production facilitators including four members (fills Case 3 and proves the ecosystem pillar), and a public integration with Google's AP2 since September 2025.

Decisions the requester still owes: a locked tagline (recommendation: "Payments, built into HTTP." for the hero; "402 Payment Required. Finally." for developer channels), a SOM target for the next four quarters, and one adopter willing to be named.
