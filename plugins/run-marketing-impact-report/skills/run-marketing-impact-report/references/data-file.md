# report_data.json — schema and example

The builder (`scripts/build_report.py`) merges this file with `report_catalog.json`. Only items present here are rendered as data; every other catalog item is rendered with its connector notice. Keys under `metrics`, `tables`, `notes` and `page_notes` are catalog ids.

```json
{
  "project":   {"name": "Cloud Native Computing Foundation", "slug": "cncf"},
  "period":    {"label": "Q3 2026 (to date)", "start": "2026-07-01", "end": "2026-09-23"},
  "generated": "2026-09-23",
  "connectors": {"lfx": true, "hubspot": false},

  "summary": "Written from the filled figures only. 3–5 sentences. Name the pages the figures come from.",

  "metrics": {
    "mem_member_orgs": {
      "value": "412",
      "detail": "distinct organizations holding an active CNCF membership today",
      "source": "LFX · member_organizations · cncf (whole tree)",
      "as_of": "2026-09-23"
    },
    "ev_regs": {
      "value": "14,210",
      "detail": "accepted registrations for events starting 2026-07-01 → 2026-09-23 · 12,980 unique registrants · check-in recorded for 2 of 6 events",
      "source": "LFX · event_registrations",
      "as_of": "2026-09-23"
    }
  },

  "tables": {
    "mem_by_tier": {
      "columns": ["Tier", "Members", "List revenue", "New in period", "Renewing next qtr", "At risk", "Benefit use", "Engaged 90d"],
      "rows": [
        ["Platinum Membership", "28", "$3.36M", "1", "requires HubSpot connector", "requires HubSpot connector", "requires Member benefits tracker", "requires HubSpot connector"],
        ["Gold Membership", "64", "$3.84M", "2", "…", "…", "…", "…"]
      ],
      "source": "LFX · memberships by=tier (list price, not dues billed) · new by tier ad hoc via semantic layer",
      "as_of": "2026-09-23",
      "note": "Tier names as stored in LFX. Revenue is list price."
    },
    "ev_inbound_by_medium": {
      "columns": ["Medium", "Source", "Reach", "Engaged", "Conversions", "Conv. rate", "Cost / conv.", "Campaign"],
      "rows": [
        ["Direct", "Email · invites & reminders", "184,000 delivered", "9,912 clicks", "—", "—", "—", "NavCon NA invites"]
      ],
      "source": "HubSpot · marketing email OVERVIEW by email"
    }
  },

  "notes": {
    "needs_attention": "1. Events: 14,210 registrations against a 15,000 goal with 47 days to go (Events page). 2. …",
    "budget_recommendation": "No recommendation — requires budget and paid-media data.",
    "cd_definition": "Campaign Brief not supplied."
  },

  "page_notes": {
    "memberships": "One short paragraph reading the page from its filled figures."
  }
}
```

Rules

- A cell whose connector is missing may carry a short notice string, as in `mem_by_tier` above, so a partly-filled row still renders. Use the same wording the builder uses: `requires <connector> connector`.
- For tables with `row_sources` in the catalog (the inbound-by-medium tables, member health, audience mix), include only rows that have data; the builder adds a notice row for each missing medium.
- `value` is a display string (already formatted); `detail` is one line; `source` is in reader's words; `as_of` is the data date, not the run date, when they differ.
- Do not include an item at all if you have no data for it. An item with an empty `value` is rendered as a notice.
