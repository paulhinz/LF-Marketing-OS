# LFX data pull for the member executive briefing

All queries use the LFX connector (MCP). Substitute the member's names/domain throughout.

## 1. Memberships & dues

- Resolve the org: `search_members` with `search_name: "<Company>"` → note the `b2b_org_uid`.
- Full roster: `search_members` with `b2b_org_uid` (page_size 100). Each row has project, tier product name, and annual full price.
- Compute:
  - **Total active memberships** (count) and **total annual dues** (sum of annual prices).
  - **Core dues** = total minus special directed funds (Alpha-Omega, Overture Maps, Chromium Supporters, Caliptra, and similar earmarked funds).
  - Flag recent joins (start dates in the last ~12 months) — these are talking points.
- Repeat for the peer set (Microsoft, Amazon, Google, IBM, Red Hat) for the comparison slide.

## 2. Semantic layer queries (contributions, maintainers, events, training)

Use `explore_lfx_semantic_layer` first when unsure of names; then `query_lfx_semantic_layer`.

**Gotchas (each cost a failed query once):**

- Query **one metric at a time**. Combining metrics (e.g., `code_contribution_activities,total_contributors`) outer-joins and returns garbage ordering/nulls.
- Organization-name literals vary by model: contribution dimensions use short names (`'Google'`, `'IBM'`, `'Red Hat'`); maintainer dimensions use legal names (`'Google LLC'`, `'International Business Machines Corporation'`, `'Red Hat LLC'`). Confirm with `get_dimension_values` before filtering — a wrong literal returns zero rows, not an error.
- Time filter: `{{ TimeDimension('metric_time', 'DAY') }} >= '<12 months ago>'`.
- There is **no meeting-attendance metric** in the semantic layer, and org-level **event sponsorship** rows may not resolve — omit those stats or use qualitative statements.

Queries:

1. **Contribution rank** — metric `code_contribution_activities`, group by `activity_project_id__organization_name`, last 12 months, order desc, limit 12. Ignore the `null` and "Individual - No Account" rows when ranking.
2. **Contributor rank** — metric `total_contributors`, same grouping (excludes bots already).
3. **Maintainer rank** — metric `active_maintainers`, group by `maintainer_key__account_name`, order desc, limit 8 (no time filter needed; active-only).
4. **Member's top projects by maintainers** — `active_maintainers`, group by `maintainer_key__project_name`, where `maintainer_key__account_name = '<Legal Name>'`, limit 10.
5. **Where the code lands** — `code_contribution_activities`, group by `activity_project_id__project_spine_name`, where organization = '<Short Name>', last 12 months, limit 12.
6. **Event registrations** — `total_registrations`, group by `registration_id__event_name`, where `registration_id__domain = '<company.com>'`, last 12 months, limit 10–15; also group by `registration_id__is_event_speaker` for the speaker split.
7. **Training** — `total_enrollments` (and `certification_enrollments` / `training_enrollments` separately for the split), where `enrollment_id__user_domain = '<company.com>'`, last 12 months; group by `enrollment_id__course_name` for most-taken.
8. **Foundation-specific engagement** (e.g., AAIF) — `total_contributors`, group by `activity_project_id__project_name`, where organization = '<Short Name>' AND `activity_project_id__project_spine_name = 'Agentic AI Foundation (AAIF)'` (confirm the spine literal first).

## 3. Coverage caveats to carry onto slides

- Event/training figures match corporate email domains only — personal-email registrations are excluded. Say "undercounted" on the slide, as the template does.
- Contribution org attribution is "as recorded in LFX"; unaffiliated contributors are excluded.
- Cite as: "Source: LFX Insights / LFX membership records, <date range>."
