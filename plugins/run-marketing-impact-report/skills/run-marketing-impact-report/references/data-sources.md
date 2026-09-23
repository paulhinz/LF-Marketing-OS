# Data sources — item by item

Every item id below is an `id` in `report_catalog.json`. The catalog's `how` field on each item repeats the short form; this file adds the call shapes and the caveats to carry into `detail`. `<slug>` is the project slug returned by `search_projects`; `<start>`/`<end>` are the period's UTC calendar days.

## Connector status → notice

| Connector | Status in a run | Items that need it |
|---|---|---|
| LFX | required; stop if absent | all `*_headline`, `mem_*` state items, `ev_regs`, `ev_attendance_rate`, `ev_sponsorship_rev`, `ev_speakers`, `ev_events_table`, `ev_kcd_table`, `ev_social_lift`, `ed_*` (except free→paid, cost, B2B), `au_participants`, `au_social_reach`, `au_share_of_voice`, `au_sentiment`, `au_pull_through`, `ad_contributors*`, `ad_contributions`, `ad_contributing_orgs`, `ad_maintainers*`, `ad_participants`, `ad_project_health*`, `ad_stars` (ad hoc), `sl_*`, `sli_mentions`, ambassador enrolled count |
| HubSpot | optional; continue without | `direct_*`, `attr_*`, `contribution_by_outcome`, `mem_leads_pipeline`, `mem_mktg_*`, `mem_velocity`, `mem_hand_raisers`, `mem_funnel`, `ev_post_event_*`, `ev_third_party_contacts`, `ed_b2b_deals`, `au_net_new_contacts`, `au_engaged_contacts`, `web_cta_conv_rate`, `web_top_landing`, `web_top_exit`, HubSpot-hosted rows of `web_sources`, `campaigns_table`, `cd_*`, `swb_*`, `sdn_*` |
| Google Ads / LinkedIn Ads | not available in Claude today | every `paid_*`, `sps_*`, `ev_cost_per_reg`, `ed_cost_per_enroll`, Paid rows of inbound tables |
| Sprout Social | not available | `social_followers` … `social_message_tags`, `sli_*` (except mentions), Social rows of inbound tables |
| Google Analytics (GA4) / Search Console | not available | `web_sessions`, `web_uniques`, `web_organic_share`, `web_scroll_depth`, `web_organic_keywords`, non-HubSpot rows of `web_sources`, Web rows of inbound tables |
| Bevy | not available | `ad_rsvps`, `ad_groups_by_region`, `ad_campaign_tied_events` |
| Cvent | not available | region/format on `ev_kcd_table`, attendee join for `ev_post_event_payback` |
| Sales Navigator | not available | `mem_outreach_response`, `mem_outreach_by_profile`, Social DM row of `direct_sources` |
| Ambassador activity tracker | not available | active/submitted activity, project-specific vs general, `ad_ambassador_activity_type` |
| Quarterly Marketing Plan document | user-supplied | `goal_progress`, `*_goals`, `budget_*` (except paid share/ROAS), `cd_budget`, `cd_definition`, goal/KPI columns of `campaigns_table` |

## LFX — standard metrics (preferred)

All calls: `query_lfx_standard_metrics` with `project=<slug>` (default `subprojects=combined` = the whole foundation tree). Window families take `start_date=<start> end_date=<end>`; at-date families take `end_date` only (today = leave unset). Read `applied.definition`, `applied.scope`, `applied.partial_last_period`, `applied.truncated` and carry them into `detail`.

| Item | Call | Result fields → value | Detail / caveat to carry |
|---|---|---|---|
| memberships_headline, mem_new | `new_members by=total start_date=<start> end_date=<end>` | `new_membership_count` | "new business by install date; an org joining a second project counts again" |
| mem_member_orgs, memberships_headline | `member_organizations` (no dates) | `member_organizations` | "distinct organizations with an active membership today" |
| mem_current_count, mem_list_revenue | `memberships by=total` | `current_membership_count`, `current_membership_revenue` | "project-account pairs; revenue is list price, not dues billed" |
| mem_by_tier | `memberships by=tier` | one row per tier | tier names as stored; new-by-tier needs the semantic layer (below); renewing/at-risk/benefit/engaged columns come from HubSpot or stay as notice |
| mem_new_by_quarter | `new_members by=total period=quarter` (no start_date → all history; show the trailing 5 rows and say so) + `new_member_organizations period=quarter` | per quarter | last row is to-date if `partial_last_period` |
| mem_churn | `membership_churn by=total start_date end_date` | `churned_membership_count` | "churn date is the day after the term ended" |
| mem_lost_orgs | `lost_member_organizations start_date end_date` | `lost_member_organizations` | "left with nothing in force the next day" |
| events_headline, ev_regs, ev_attendance_rate | `event_registrations by=total start_date end_date` | `total_registrations`, `total_unique_registrants`, `total_checked_in_attendees` | "events starting in the window; check-in exists only for some registration sources" — compute attendance rate only when checked-in > 0, else write "check-in not recorded for these events" |
| ev_sponsorship_rev, events_headline | `event_sponsorships by=total start_date end_date` | `total_sponsorship_revenue`, `total_sponsorship_count` | "USD, all tier types" |
| ev_speakers | `speakers by=total` | `total_speakers` | "accepted speakers only" |
| ev_events_table | `event_registrations by=event`, `event_sponsorships by=event`, `speakers by=event` (same window; join on event name) | one row per event | Type column: Owned unless the plan/user marks it third-party |
| ev_kcd_table | filter `ev_events_table` rows whose name contains "Community Day", "KCD" or the foundation's equivalent; for YoY re-run `event_registrations by=event` for the prior year window | regs, avg per event | Region: infer from city in the event name; format requires Cvent → say so per row |
| ev_social_lift, social_event_lift | `social_mentions by=total period=week start_date=<end − 16 weeks>` | weekly mentions | for each event: pre = 2 weeks before start, during = start week, post = 2 weeks after; baseline = median of the other weeks |
| education_headline, ed_enrollments, ed_enrolled_users | `training_enrollments by=total start_date end_date` | `total_enrollments`, `total_enrolled_users` | "platform data (TI + edX); lifetime totals read below the official trained figure" |
| ed_certifications | `certifications by=total start_date end_date` | `total_certifications` | "by enrollment date" |
| ed_courses | `training_enrollments by=course order_by=-total_enrollments limit=10` | per course | YoY: same call for the prior-year window |
| ed_enroll_by_month | `training_enrollments by=total period=month` and `certifications by=total period=month` | per month | default trailing year |
| ed_enrolled_orgs | `training_enrollments by=org order_by=-total_enrollments limit=10` | per account | "attributed enrollments — a floor; edX rows carry no account" |
| audience_headline, au_participants, ad_participants | `participants by=total start_date end_date` | `total_participants` | "distinct non-bot people with any activity" |
| au_social_reach, sl_reach, sl_avg_followers | `social_reach by=total start_date end_date` | `social_listening_total_author_followers`, `_avg_author_followers` | "sum counts a prolific author once per mention; NULL followers excluded" |
| sl_mentions, sl_unique_authors, sl_positive, sl_negative, au_sentiment | `social_mentions by=total` and `by=sentiment` | mentions, unique authors, positive, negative | "neutral in neither" |
| sl_by_network, sli_mentions | `social_mentions by=network` | per network | stored network name 'Twitter' = X |
| sl_trend_weekly | `social_mentions by=total period=week` | per week | |
| adoption_headline, ad_contributors | `contributors by=total start_date end_date` | `total_contributors` | "distinct code contributors, bots excluded" |
| ad_contributions | `contributions by=total` | `code_contribution_activities` | additive |
| ad_contributing_orgs | `contributing_organizations by=total` | `total_contributing_organizations` | |
| ad_contributors_by_org | `contributions by=org order_by=-code_contribution_activities limit=10` + `contributors by=org limit=10` | per account | report the NULL account row as unattributed |
| ad_contributors_trend | `contributors by=total period=month` + `contributions by=total period=month` | per month | |
| ad_maintainers, adoption_headline | `maintainers by=total` | `active_maintainers`, `active_maintainers_excl_reviewers`, `active_reviewers` | "today's roster; LF projects only" |
| ad_maintainers_by_role | `maintainers by=role` and `by=source` | per row | |
| ad_project_health, ad_project_health_table | `project_health by=total` and `by=category` | count, avg score | state `applied.snapshot_date` and coverage |

## LFX — semantic layer (ad hoc; label as such)

Read `read_lfx_semantic_layer_guidance` first; `explore_lfx_semantic_layer` (get_dimensions / get_dimension_values) before any filter literal you have not seen.

| Item | Query |
|---|---|
| mem_by_tier (new in period by tier) | `query_lfx_semantic_layer metrics=new_membership_count group_by=<tier dimension from get_dimensions on new_membership_count> where={{ Dimension('project__foundation_slug') }} = '<slug>' AND {{ TimeDimension('metric_time','DAY') }} >= '<start>' AND … <= '<end>'` — tier literals differ per foundation |
| au_share_of_voice | `metrics=social_listening_mentions group_by=project__foundation_slug where={{ TimeDimension('metric_time','DAY') }} >= '<start>' AND … <= '<end>'`; share = project row / sum of the foundations the user names as comparators (default: the five largest rows); say which |
| au_pull_through | `metrics=social_listening_mentions,social_listening_unique_authors,social_listening_positive_mentions,social_listening_negative_mentions group_by=mention_key__keyword where={{ Dimension('project__foundation_slug') }} = '<slug>' AND <window>` — keep the rows matching the user's message tags; trend = same for the prior period |
| mem_health (committee attendance) | `metrics=attendees_count,unique_attendees group_by=primary_key__account_name where={{ Dimension('project__foundation_slug') }} = '<slug>' AND {{ TimeDimension('metric_time','DAY') }} >= '<end − 90 days>'` — meeting attendance per member account, trailing 90 days; '' and 'Individual - No Account' are unattributed |
| ad_stars | `explore_lfx_semantic_layer action=list_metrics search=activity` then `get_dimension_values` on the activity-type dimension for 'star'; `metrics=total_activities` filtered to that type on `activity_project_id__project_spine_slug = '<slug>'` for the window and the prior window. If the type is absent, leave the item unfilled (notice) |
| sli_mentions weekly | `metrics=social_listening_mentions,social_listening_unique_authors,… group_by=metric_time__week where={{ Dimension('mention_key__social_network') }} = 'LinkedIn' AND {{ Dimension('project__foundation_slug') }} = '<slug>' AND <window>` |

## LFX — committee tools

| Item | Call |
|---|---|
| ad_active_ambassadors (enrolled), ad_ambassador_program (Enrolled column) | `search_committees` with the project and name containing "Ambassador"; then `search_committee_members` (paginate) → count. Active / submitted activity stays a notice (`requires Ambassador activity tracker`). |

## HubSpot (optional)

Call `tool_guidance` for `get_campaign_attribution_reports`, `read_campaign_data` and `query_crm_data` before first use. Confirm internal names with `search_properties` (CONTACT, DEAL, COMPANY) and `search_crm_objects` (MARKETING_EMAIL, CAMPAIGN, BLOG_POST, LANDING_PAGE). Where the portal has a foundation/project property or list, scope to it and say so; otherwise say "portal-wide" in `detail`.

| Item | Call |
|---|---|
| direct_sends, direct_open_rate, direct_ctr, direct_unsub_rate | `get_marketing_email_analytics analysisRequest={"_type":"OVERVIEW","statisticsSection":{"startDate":"<start>","endDate":"<end>","frequency":"TOTAL"}}` → sends, deliveries, opens, clicks, unsubscribes; rates over deliveries |
| direct_trend | same with `frequency:"WEEKLY"` |
| direct_sources, direct_by_campaign_type, sdn_* | OVERVIEW with `dimensions:["MARKETING_EMAIL_OBJECT_ID"]`; look up email names/types with `search_crm_objects objectType=MARKETING_EMAIL`; classify by name/type (newsletter, invite, reminder, nurture, survey, promo) |
| direct_conv_rate | `get_campaign_attribution_reports metrics=[ATTRIBUTION_COUNT,CONTACT_COUNT] filters=[{dimension:ASSET_TYPE,operator:EQ,value:<email asset type>}]` or `read_campaign_data operation=GET_ASSET_METRICS assetType=<email type from GET_CAMPAIGN_ASSET_TYPES>` per campaign; conversions = form submissions / goal completions |
| direct_list_health, direct_list_health_table, sdn_subs | `query_crm_data sql="SELECT COUNT(*) FROM CONTACT WHERE hs_crm_search.ilsListIds = '<list id>'"` for size; active = `hs_email_last_open_date >= '<end − 90 days>' OR hs_email_last_click_date >= …` — confirm property names first; state the dormant definition |
| direct_by_segment | per-list OVERVIEW is not available; approximate with the three lists (member key contacts, community, prospects) and their contacts' `hs_email_open`/`hs_email_click` counts in the period via `query_crm_data`; label "approximation" |
| attr_* , contribution_by_outcome, mem_mktg_sourced, mem_mktg_influenced | `get_campaign_attribution_reports mode=AGGREGATION metrics=[REVENUE,DEAL_COUNT,CONTACT_COUNT] dimensions=[UTM_MEDIUM] attributionModel=<LINEAR|FIRST_INTERACTION|LAST_INTERACTION|TIME_DECAY> startDate=<start> endDate=<end>` — four calls for the model table; by CAMPAIGN for the outcome mapping (map campaigns to outcomes by name / campaign type) |
| attr_sales_only | closed-won deals in period (`query_crm_data SELECT COUNT(*), SUM(amount_in_home_currency) FROM DEAL WHERE dealstage = '<closed won stage>' AND closedate BETWEEN '<start>' AND '<end>'`) minus attributed DEAL_COUNT |
| mem_leads_pipeline, mem_funnel | `query_crm_data SELECT dealstage, COUNT(*), SUM(amount_in_home_currency) FROM DEAL WHERE pipeline = '<membership pipeline id>' GROUP BY dealstage`; contacts funnel: `SELECT lifecyclestage, COUNT(*) FROM CONTACT GROUP BY lifecyclestage` |
| mem_velocity | `SELECT MEDIAN(days_to_close) FROM DEAL WHERE …closed won in period` (use the portal's days-to-close property; confirm name) |
| mem_hand_raisers | form submissions on membership inquiry forms in period: `search_crm_objects` on FORM / form submission properties, or `query_crm_data` on `num_conversion_events` for contacts with the membership form |
| mem_health (zero-touchpoint members) | `query_crm_data SELECT name FROM COMPANY WHERE <member flag/list> AND (notes_last_updated < '<end − 90 days>' OR notes_last_updated IS NULL)` — confirm the engagement property |
| ev_post_event_pipeline, ev_post_event_payback | requires attendee → contact join (Cvent). If the portal stores event attendance on contacts (a property or list per event), `query_crm_data` contacts with that attendance and `createdate`/deal association within 90 days of the event; otherwise notice |
| ev_third_party_contacts | `SELECT COUNT(*) FROM CONTACT WHERE createdate BETWEEN … AND hs_analytics_source_data_1 LIKE '%<event>%'` (or the event list) — confirm the source property |
| ed_b2b_deals | `SELECT COUNT(*), SUM(amount_in_home_currency) FROM DEAL WHERE pipeline = '<training pipeline>' AND dealstage = '<closed won>' AND closedate BETWEEN …` |
| au_net_new_contacts | `SELECT COUNT(*) FROM CONTACT WHERE createdate BETWEEN '<start>' AND '<end>'` (+ foundation scope where it exists) |
| au_engaged_contacts | `SELECT COUNT(*) FROM CONTACT WHERE hs_email_last_click_date >= '<end − 90 days>' OR hs_last_sales_activity_timestamp >= …` |
| au_mix (newsletter subscribers row) | list size as above |
| web_cta_conv_rate, web_sources (HubSpot-hosted rows), web_top_landing, web_top_exit, swb_* | `get_content_analytics_report mode=TOTALS start=<start> end=<end> includeMetadata=true sortMetric=<RAW_VIEWS|ENTRANCES|EXITS|CTA_RATE> limit=10`; group rows by type (landing page / website page / blog post) for `web_sources`; note "HubSpot-hosted properties only" |
| campaigns_table, cd_* | `search_crm_objects objectType=CAMPAIGN` (active, in period) → `read_campaign_data operation=GET_ANALYTICS analyticsRequest.requests=[{campaignCrmObjectId, requestedData:"METRICS", startDate, endDate}]` (sessions, new contacts, influenced contacts); assets via `GET_CAMPAIGN_ASSET_TYPES` then `GET_ASSET_METRICS`; revenue via `get_campaign_attribution_reports campaignCrmObjectIds=[id] metrics=[REVENUE]` |

## Not available in Claude today (always a notice)

Paid media (Google Ads, LinkedIn Ads, Reddit Ads), Sprout Social publishing analytics, GA4 and Search Console, Bevy community groups, Cvent event metadata, LinkedIn Sales Navigator, the ambassador activity tracker, Thought Industries free→paid conversion, CMS narrative tags, download/package telemetry. When one of these gets a connector, add its calls to this file and the SKILL, and nothing in the catalog needs to change.
