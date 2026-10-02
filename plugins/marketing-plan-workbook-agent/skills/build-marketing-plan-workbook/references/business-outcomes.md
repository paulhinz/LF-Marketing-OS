# Standard business outcomes, goals and baselines

Source: LFX Marketing OS Strategy deck (2026), slides "Mktg Activities Begin with Std Business Outcomes" and "Project Leads Define Goals, CFT Defines Campaigns". Project leaders set **goals**; the cross-functional team turns them into **campaigns**. A goal is not a campaign and not a channel.

## The four standard business outcomes

| # | Outcome | What it means | Typical goal statements | KPI examples (one number, dated) |
|---|---|---|---|---|
| 1 | **Fill the Seats** (Events and Education BUs) | Registrations and attendance for events; enrollments and certifications for training. Drives potential across all other outcomes. | "75% of 15K attendees registered by [date]"; "first [project] Day co-located at [event]"; "launch first course and enroll N learners" | registrations, checked-in attendees, speakers accepted, sponsorship $ , enrollments, certifications |
| 2 | **Grow the Audience** (community development) | Net new contacts in the contact database with the project's property; subscribers; followers; reach. | "N net new contacts in HubSpot carrying the [project] property"; "newsletter to N subscribers" | net new contacts, subscribers, followers, social mentions and reach, unique web visitors |
| 3 | **Nurture to Adoption** | Contacts become product/project users, content creators, ambassadors, open source contributors (code or content) and maintainers. | "+25% distinct code contributors YoY"; "50 signed ambassadors"; "N named adopter case studies" | contributors, contributing orgs, participants, maintainers, creators active, ambassadors, named adopters, product usage counters |
| 4 | **Secure & Retain Commitment** (Memberships) | New foundation members by tier; renewals; sponsorships of the foundation's own events. Very targeted lists. | "5 new Premier members"; "≥90% renewal of the first cohort" | new memberships by tier, member organizations, paying member orgs, churn, list-price revenue |

Content tags used in the Message Foundation (Brand Visibility, Member Growth, Developer Adoption, Community Content, Ecosystem Integrations) map onto these: Brand Visibility → Grow the Audience; Member Growth → Secure & Retain; Developer Adoption, Community Content, Ecosystem Integrations → Nurture to Adoption.

## What every goal must carry

Definition (one sentence) · KPI (one number with a date) · Budget share (% of total marketing budget, and $ once the Strategy Profile is chosen) · Timeline (quarter or date) · Risks (one to three) · Baseline source (LFX family, counter, document). The deck repeats these fields on the per-outcome goal slides and consolidates them in the Goals Summary table.

## Stage of the project sets the default emphasis

From the Strategy deck slide "Focus May Vary Based on Project Type / Stage":

| Stage | Emphasis | Default budget emphasis across outcomes (draft, ED edits) |
|---|---|---|
| Has product and community | Growth of members and event/education | Secure & Retain 35% · Fill the Seats 25% · Grow Audience 20% · Nurture 20% |
| Has product, no community | Grow the audience through content marketing and ambassador enablement | Grow Audience 35% · Nurture 30% · Secure & Retain 25% · Fill the Seats 10% |
| No product, no community | Awareness, influential memberships, project adoption | Grow Audience 40% · Secure & Retain 30% · Nurture 20% · Fill the Seats 10% |

Adjust when the foundation has no events or courses of its own yet (Fill the Seats then means presence at LF or partner events) and when a membership cohort's first renewals fall inside the plan period.

## LFX source for each baseline (First Plan "Where we stand today")

| Baseline tile | LFX standard metric / tool | Caveat to print |
|---|---|---|
| Member organizations; paying | `member_organizations`, `paying_member_organizations` | status-based, as of date |
| Memberships by tier and list-price revenue | `memberships by=tier` | list price, not dues billed |
| New memberships by month | `new_members period=month` | last month is month-to-date |
| Churn / lost | `membership_churn`, `lost_member_organizations` | churn date is day after term end |
| Events: registrations, attendees, speakers, sponsorships | `event_registrations by=event`, `speakers`, `event_sponsorships` | only events in the LF events system; 0 may mean no owned events |
| Education: enrollments, certifications | `training_enrollments by=course`, `certifications` | platform data only |
| Contributors, orgs, participants | `contributors`, `contributing_organizations`, `participants` | distinct people; employer attribution may be thin (check `contributions by=org` NULL row) |
| Maintainers | `maintainers` | 0 = roster not onboarded, not "no maintainers" |
| Meetings, participants, mailing lists, committees | `count_lfx_resources` (v1_past_meeting, v1_past_meeting_participant, groupsio_mailing_list), `search_committees` | counts only LFX v2 onboarded records visible to caller |
| Social mentions and reach | `social_mentions`, `social_reach` | 0 = keywords not configured |
| Project health | `project_health` | snapshot date; LF-wide coverage note |
| Audience (contacts, subscribers) | HubSpot connector (project property / list), newsletter platform | "team to supply" when no connector |
| Content | project blog, docs, YouTube, GitHub stars/forks | quote as displayed, dated |
