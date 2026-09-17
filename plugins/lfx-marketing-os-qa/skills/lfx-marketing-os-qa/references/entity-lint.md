# Entity and trademark lint

The governance sentence in a Brand Kit becomes the boilerplate, the llms.txt, a messaging pillar, a persona's talking point and a press-release paragraph. It is the single most-copied sentence in the package, so it is derived from the system of record, not from the interview.

## Step 1 — Pull the records

Use the LFX MCP:

1. `search_projects` with `name` = the project name, `include_total: true`. Expect two or more records: the technical project (often slug `<name>-protocol`, `<name>`, or similar) and the membership foundation or fund (often `<name>-foundation`). Keep both.
2. For each record, note: `name`, `slug`, `uid`, `legal_entity_name`, `legal_entity_type`, `legal_parent_uid`, `parent_uid`, `funding`, `funding_model`, `charter_url`, `formation_date`, `website_url`, `repository_url`.
3. `get_project` on each `legal_parent_uid` until you reach a known root. The two you will meet most: The Linux Foundation (slug `tlf`, legal entity "The Linux Foundation", an incorporated entity) and LF Projects, LLC (slug `lfprojects`, "a Delaware series limited liability company"; projects are separate series of it).
4. If `charter_url` is set, fetch and read the charter. A technical charter states the exact entity name, the governing body it defines (usually a TSC only), the code and documentation licenses, and who holds the marks.

## Step 2 — Map the structure to wording

| What LFX shows | What it means | Wording to use |
|---|---|---|
| `legal_entity_type` "Series LLC", `legal_entity_name` "<Project> a Series of LF Projects, LLC", legal parent `lfprojects` | The technical project is its own series of LF Projects, LLC. This is the entity that holds the code, the spec and (via LF Projects) the marks. | "<Project> is a project of LF Projects, LLC" or "<Project>, a Series of LF Projects, LLC". Footer: "© <Project> a Series of LF Projects, LLC. For web site terms of use, trademark policy and other project policies please see https://lfprojects.org". |
| A "<Project> Foundation" record with `funding` "Funded", `funding_model` ["Membership"], legal parent `tlf`, `legal_entity_type` "Subproject" (or "Directed Fund") | The foundation is the membership and governance programme at The Linux Foundation. It funds and stewards the technical project; it is not the Series LLC. | "the <Project> Foundation, an open-governance body at the Linux Foundation" — or the exact phrase from the LF press release for that project, which Legal has already approved. Never "<Project> Foundation, a Series of LF Projects, LLC". |
| `legal_entity_type` "Incorporated Entity" | A separately incorporated foundation with its own legal name. | Use `legal_entity_name` verbatim. |
| Anything else (JDF, hosted foundations, regional entities) | Unfamiliar structure. | Quote the LFX record verbatim in the report and flag for LF Legal before any boilerplate is locked. |

Two clauses that belong together in a boilerplate, in this order: what the code lives under (the Series LLC, the license) and who stewards it (the foundation at the Linux Foundation). Keep the two nouns attached to the right entities.

## Step 3 — Trademark sentence

The LF Projects technical-charter template vests marks in LF Projects, LLC ("LF Projects (or an associated hosting entity) will hold title to all trade or service marks"). So:

- Say: "<Project> is a trademark of LF Projects, LLC" (confirm against the charter you fetched), plus the standard pointer to the trademark policy at lfprojects.org.
- Do not say the mark belongs to the foundation, the membership programme, or "the community".
- Keep the project's casing rule (for example, lowercase "x402" even at the start of a sentence) — that is brand, not law, and the Brand Kit governs it.

When the charter says something different from the template, the charter wins; quote it.

## Step 4 — Grep the documents

Search every document in the package for these patterns and list each hit with document and section:

- "a Series of LF Projects, LLC" — check which noun it is attached to.
- "governed by LF Projects" / "under LF Projects, LLC" — the fund is under The Linux Foundation; the project is under LF Projects.
- "public charter" — the technical charter is public and defines the TSC; Governing Board and membership rights come from the foundation's participation agreement and the members page. Do not cite the technical charter as the source for board seats.
- "trademark of", "™", "registered" — compare with Step 3.
- "Foundation" vs "project" used interchangeably in a sentence about who owns what.

Every hit that contradicts Step 2 or Step 3 is a High finding, and the fix list must carry the corrected sentence for each location, because the same wrong sentence appears in several places under different section numbers.

## Worked example — x402 (September 16, 2026)

LFX records:

- `x402-protocol` — uid 526f4850-ef08-44b6-8e60-e3af9d7a0332; legal entity "x402 a Series of LF Projects, LLC"; type Series LLC; legal parent LF Projects, LLC; parent project x402 Foundation; charter: technical charter (TSC only; code Apache-2.0; docs CC-BY-4.0; LF Projects holds marks); formed 2026-03-31.
- `x402-foundation` — uid 233d9236-9091-473b-926d-25a150b64f37; type Subproject; legal parent The Linux Foundation; funded, membership model; formed 2026-04-02.
- Site footer (x402.org): "Copyright © x402 a Series of LF Projects, LLC. For web site terms of use, trademark policy and other project policies please see https://lfprojects.org".
- LF press release (2026-07-14): the x402 Foundation is "a new open-governance body formed to steward the x402 protocol" under "the neutral governance of the Linux Foundation".

Wrong (appeared verbatim in Brand Kit §1, At a Glance, §5, §6 and Message Foundation §2a boilerplate, §7 Pillar 2, §9 value message 2, §15; looser "governed under LF Projects, LLC with a public charter" variants in Message Foundation §12 objections 2 and 4 and ICP persona B2 — eleven locations. Message Foundation §0, §3 and llms.txt had it right: "stewarded by the x402 Foundation under the Linux Foundation"):

> stewarded by the x402 Foundation, a Series of LF Projects, LLC, under the neutral governance of the Linux Foundation

Corrected boilerplate clause (send to Legal with the press-release citation):

> Contributed by Coinbase, x402 is developed in the open under the Apache 2.0 license as x402, a Series of LF Projects, LLC, and stewarded by the x402 Foundation, an open-governance body at the Linux Foundation.

Corrected trademark line:

> x402 is a trademark of LF Projects, LLC. Use the lowercase form, do not create derivative marks without Foundation approval, and follow the LF Projects trademark policy at lfprojects.org.
