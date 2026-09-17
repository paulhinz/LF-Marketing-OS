# LFX project record → governance and trademark wording

The governance sentence written into the Brand Kit becomes the boilerplate, the
llms.txt, a messaging pillar and a persona's talking point in the sibling
documents. It is the most-copied sentence in the package, so it is derived from
the LFX system of record, never from the interview, the README or memory. (The
x402 run of September 2026 merged "the x402 Foundation" with "a Series of LF
Projects, LLC"; eleven locations across three documents inherited it.)

## Pull the records (LFX MCP)

1. `search_projects` with `name` = the project name and `include_total: true`.
   Expect two or more records: the technical project (slug like `<name>` or
   `<name>-protocol`) and the membership foundation or fund (slug like
   `<name>-foundation`). Keep both.
2. For each record note `name`, `slug`, `uid`, `legal_entity_name`,
   `legal_entity_type`, `legal_parent_uid`, `parent_uid`, `funding`,
   `funding_model`, `charter_url`, `formation_date`, `website_url`,
   `repository_url`.
3. `get_project` on each `legal_parent_uid` until a known root: The Linux
   Foundation (slug `tlf`, an incorporated entity) or LF Projects, LLC (slug
   `lfprojects`, a Delaware series LLC whose projects are separate series).
4. If `charter_url` is set, fetch it. A technical charter names the entity, the
   governing body it defines (usually a TSC only), the code and documentation
   licenses, and who holds the marks.

If the LFX MCP is not connected, write `TBD — derive from LFX project record`
in every governance and trademark field and say so in the intake appendix. Do
not fill them from the README or the interview.

## Map the structure to wording

| LFX shows | Meaning | Wording |
|---|---|---|
| `legal_entity_type` "Series LLC", `legal_entity_name` "<Project> a Series of LF Projects, LLC", legal parent `lfprojects` | The technical project is its own series of LF Projects, LLC; it holds the code and spec, and LF Projects holds the marks. | "<Project> is a project of LF Projects, LLC" or "<Project>, a Series of LF Projects, LLC". Footer: "© <Project> a Series of LF Projects, LLC. For web site terms of use, trademark policy and other project policies please see https://lfprojects.org". |
| A "<Project> Foundation" record, `funding` "Funded", `funding_model` ["Membership"], legal parent `tlf`, `legal_entity_type` "Subproject" or "Directed Fund" | The foundation is the membership and governance program at The Linux Foundation. It funds and stewards the technical project; it is not the Series LLC. | "the <Project> Foundation, an open-governance body at the Linux Foundation" — or the exact phrase from the LF press release for that project, which Legal has approved. Never "<Project> Foundation, a Series of LF Projects, LLC". |
| `legal_entity_type` "Incorporated Entity" | A separately incorporated foundation. | Use `legal_entity_name` verbatim. |
| Anything else (JDF, hosted foundations, regional entities) | Unfamiliar structure. | Quote the record verbatim and flag for LF Legal before the boilerplate is locked. |

A boilerplate carries two clauses in this order: what the code lives under (the
Series LLC and the license), then who stewards it (the foundation at the Linux
Foundation). Keep each noun attached to the right entity.

## Trademark sentence

The LF Projects technical-charter template vests marks in LF Projects, LLC
("LF Projects (or an associated hosting entity) will hold title to all trade or
service marks"). Write "<Project> is a trademark of LF Projects, LLC" (confirm
against the charter you fetched) plus the pointer to the trademark policy at
lfprojects.org. Never say the mark belongs to the foundation, the membership
program or "the community". The project's casing rule (for example lowercase
"x402" at sentence start) is brand, not law, and stays in §3.

## Record it

Write the derived governance sentence, the trademark sentence, the records used
(slug, uid, legal entity, legal parent, charter URL) and the date into the Brand
Kit's Appendix C. The Message Foundation and ICP agents copy from Appendix C;
they do not re-derive or paraphrase. If the requester supplies different
wording during intake, keep the derived sentence in the document and log the
requester's version in Appendix B as a conflict for LF Legal.
