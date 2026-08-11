# Velocity Engine field reference (ICP & Persona schema)

Grounded in the "2026 Marketing OS Agent List" spreadsheet's Velocity Engine
Data Architecture tab and Jim Zemlin's LFX Marketing OS Product Plan. This is
the target schema a future MCP connection to Velocity Engine is expected to
populate automatically. Until that connector exists, this skill's interview +
Brand Kit + Message Foundation + README flow populates the same field names by
hand, so a later swap to a live connector doesn't require re-templating the
output document.

## Target Customers / ICP fields (5 fields — "5 dimensions per ICP")

1. **ICP** — organization-level description of who this profile is.
2. **Trigger Events / Compelling Moments** — what causes this org to start
   evaluating or adopting.
3. **Who is not an ideal customer** — explicit disqualifiers/anti-patterns.
4. **Customer Use Cases** — what this org does with the product.
5. **Customer Pain Points** — what's driving the need in the first place.

## Persona fields (per persona, up to ~8 personas in Velocity Engine's own
architecture; this skill uses 2-3 per ICP)

- Title
- Name
- Nickname
- Role
- Goals
- Challenges
- Works for
- Other Roles Performed
- Trusted Sources
- Key Responsibilities
- Statements to share with the boss
- Features and Persona Benefits
- Example Use Cases

## Adjacent Velocity Engine categories (not owned by this skill)

For context — these live in sibling agents' outputs, not here:

- **Company and Brand**, **Voice**, **Products**, **Positioning and
  Messaging** — owned by the Brand Kit and Message Foundation agents.
- **Market and Competitive Intelligence** (Primary Category, Category
  Definition, Competitor List, Competitor Description, Competitive
  Positioning Strategy, Industry Trends, SWOT) — this skill's Section 1
  (Market Segment Overview) is a lighter-weight version of this category,
  scoped to what's needed to support the ICP definitions rather than a full
  competitive-intelligence deliverable.
- **Segments** and **Stats & Quotes** — may be split into a dedicated
  Segmentation Agent output in a future version of Marketing OS; this skill's
  Section 1.3/1.4 currently covers the initial, one-time segment definition.

## Known limitation

Cell-level formatting (e.g., which fields are marked as the Velocity Engine
"minimum viable schema" vs. stretch fields) could not be confirmed by text
extraction from the source spreadsheet. Treat the field list above as the
full target schema; if a future Velocity Engine connector distinguishes
required vs. optional fields, prefer its live signal over this file.
