"""Generates report_catalog.json — the single source of truth for every page,
section and metric in the Marketing Impact report. The catalog mirrors the
v3 clickable prototype (paulhinz.github.io/LF-Marketing-OS-Dashboards-Prototypes)
one page per view. build_report.py renders every item in this catalog whether or
not data exists, so no section is ever silently dropped."""
import json, sys

# Connector labels used in "Data not available, requires X connector" notices.
LFX = "LFX"
HS = "HubSpot"
ADS = "Google Ads / LinkedIn Ads"
SPROUT = "Sprout Social"
GA4 = "Google Analytics (GA4)"
GSC = "Google Search Console"
BEVY = "Bevy (community groups)"
PLAN = "Quarterly Marketing Plan document"
CVENT = "Cvent"
SN = "LinkedIn Sales Navigator"
AMB = "Ambassador activity tracker"
TI = "Thought Industries (training platform)"
CMS = "CMS narrative tags"

def kpi(id, label, tag, src, how, **kw):
    d = dict(id=id, kind="kpi", label=label, tag=tag, source=src, how=how); d.update(kw); return d
def table(id, label, tag, src, how, columns, **kw):
    d = dict(id=id, kind="table", label=label, tag=tag, source=src, how=how, columns=columns); d.update(kw); return d
def note(id, label, how):
    return dict(id=id, kind="note", label=label, tag="", source="agent", how=how)
def section(title, subtitle, items):
    return dict(title=title, subtitle=subtitle, items=items)
def page(id, level, title, question, subtitle, sections):
    return dict(id=id, level=level, title=title, question=question, subtitle=subtitle, sections=sections)

INBOUND_COLS = ["Medium", "Source", "Reach", "Engaged", "Conversions", "Conv. rate", "Cost / conv.", "Campaign"]
INBOUND_HOW = ("One row per source that served this outcome in the period. Reach/engaged/conversions come from the "
               "medium's own system: Paid = ads platforms; Social = Sprout Social; Web = GA4 (HubSpot content analytics "
               "for HubSpot-hosted pages); Direct = HubSpot email analytics. Fill the rows whose connector is present; "
               "leave the others and the builder writes the connector notice per row.")

pages = []

# ---------------------------------------------------------------- P01
pages.append(page("all-summary", 1, "All › Summary",
  "Outcomes from all marketing outbound channels",
  "Overall Business Outcome Metrics · five business outcomes with associated key metrics · goals based on numbers included in the Quarterly Marketing Plan",
  [
   section("Outcome scorecard", "Headline result per business outcome for the period", [
     kpi("memberships_headline","Memberships · new memberships sold and active member organizations","DECISION",LFX,
         "query_lfx_standard_metrics metric=new_members project=<slug> start_date=<period start> (count) + member_organizations project=<slug> (state today)."),
     kpi("events_headline","Events · registrations and sponsorship revenue for events in the period","DECISION",LFX,
         "event_registrations by=total project=<slug> start/end = period; event_sponsorships by=total same window."),
     kpi("education_headline","Education · training enrollments and certifications in the period","DECISION",LFX,
         "training_enrollments by=total project=<slug>; certifications by=total; same window."),
     kpi("audience_headline","Audience · participants (any activity) and social reach in the period","DECISION",LFX,
         "participants by=total project=<slug>; social_reach by=total project=<slug>; same window."),
     kpi("adoption_headline","Adoption · distinct code contributors and active maintainers","DECISION",LFX,
         "contributors by=total project=<slug> window; maintainers by=total project=<slug> (today)."),
   ]),
   section("Goal progress · quarterly plan", "Every goal carries a KPI, budget, timeline and owner", [
     table("goal_progress","Goals vs. progress","DECISION",PLAN,
           "Read the goals (KPI, target, budget, owner, timeline) from the Quarterly Marketing Plan deck or Campaign Brief if the user supplies one; fill progress from the LFX/HubSpot figures gathered for the outcome pages.",
           ["Goal","Outcome","KPI","Target","Progress","Budget","Status"]),
   ]),
   section("Needs attention", "AI summary · the decisions where marketing can move a goal before period close", [
     note("needs_attention","Three items, each tied to a figure on a later page",
          "Write 2–3 short alerts from the live figures only (largest gap to goal, steepest negative trend, one opportunity). Never invent a number; cite the page each figure comes from."),
   ]),
   section("Marketing contribution to outcomes", "Share of each outcome's result that marketing sourced or influenced", [
     table("contribution_by_outcome","Marketing-sourced vs. marketing-influenced by outcome","DECISION",HS,
           "get_campaign_attribution_reports (read tool_guidance first): metrics CONTACT_COUNT, DEAL_COUNT; dimensions CAMPAIGN or UTM_MEDIUM; attributionModel LINEAR vs FIRST_INTERACTION. Map campaigns to outcomes by campaign name/type.",
           ["Outcome","Result","Mktg-sourced","Mktg-influenced","Basis"]),
   ]),
   section("Inbound by medium", "Where the period's engaged and sales-ready contacts came from", [
     table("inbound_by_medium","Reach → engaged → sales-ready by medium","SIGNAL","mixed",
           "Direct and Web (HubSpot-hosted) from HubSpot; Paid requires ads connector; Social requires Sprout Social. Fill what is available; the builder writes a per-row notice for the rest.",
           ["Medium","Reach","Engaged","Sales-ready","Cost / SRC","Trend"], row_sources={"Paid":ADS,"Social":SPROUT,"Web":GA4,"Direct":HS}),
   ]),
  ]))

# ---------------------------------------------------------------- P02 Paid
pages.append(page("all-paid", 2, "All › Paid",
  "Paid placement across standard sources.",
  "Medium: Paid · standard metrics per source: spend, impressions, clicks, CTR, CPC, conversions, cost / conversion, ROAS",
  [
   section("Paid · key metrics", "Period totals across all paid sources", [
     kpi("paid_spend","Spend","",ADS,"Sum of spend across ad accounts for the period."),
     kpi("paid_impressions","Impressions","",ADS,""),
     kpi("paid_ctr","Blended CTR","SIGNAL",ADS,""),
     kpi("paid_cpc","Blended CPC","",ADS,""),
     kpi("paid_cost_per_conv","Cost / conversion","DECISION",ADS,""),
     kpi("paid_roas","ROAS (floor 2.0×)","DECISION",ADS,""),
   ]),
   section("Sources · standard metrics", "Paid social · Search ads · Retargeting · 3rd-party ads · 3rd-party newsletters · Affiliate", [
     table("paid_sources","Paid sources","DECISION",ADS,"One row per paid source (UTM source registry).",
           ["Source","Spend","Impressions","Clicks","CTR","CPC","Conv.","Cost / conv.","ROAS"]),
   ]),
   section("Cost per conversion by business outcome", "Each outcome has its own benchmark — never compare event promo against membership awareness", [
     table("paid_cost_by_outcome","Cost per conversion by outcome","DECISION",ADS,"Group ads campaigns by business outcome (campaign naming or UTM campaign).",
           ["Outcome","Spend","Clicks","CPC","Conversions","Conversion =","Cost / conv.","Benchmark"]),
   ]),
   section("Ad variant test · CTR by message", "Variants tagged with their primary message", [
     table("paid_ad_variants","CTR by ad variant / message tag","DECISION",ADS,"Requires a message-tag attribute on every ad.",
           ["Variant · message tag","Impressions","CTR","Conv. rate"]),
   ]),
   section("Top converting keywords & terms", "Search ads", [
     table("paid_keywords","Top converting keywords","DECISION",ADS,"",["Keyword / term","Clicks","Conv.","Conv. rate","CPC"]),
   ]),
   section("Impressions & reach by audience segment", "Are we reaching new profiles or re-hitting the existing community?", [
     table("paid_segments","Reach by audience segment","SIGNAL",ADS,"Ad-platform audience definitions mapped to ICP personas.",
           ["Audience segment","Impressions","Reach","Share","CTR"]),
   ]),
   section("12-week trend", "Blended CTR and cost per conversion by week", [
     table("paid_trend","Weekly trend","SIGNAL",ADS,"",["Week","CTR","Cost / conv.","Spend"]),
   ]),
  ]))

# ---------------------------------------------------------------- P03 Paid › Budget
pages.append(page("all-budget", 2, "All › Budget",
  "All current marketing spend",
  "Paid ads by medium type with results, plus the other marketing spend tracked by the Executive Director and Marketing Lead · budget set per goal in the quarterly plan",
  [
   section("Budget · key metrics", "", [
     kpi("budget_total","Total marketing budget for the period","",PLAN,"From the Quarterly Marketing Plan."),
     kpi("budget_spent","Spent to date","",PLAN,"From the plan's budget tracker or finance export."),
     kpi("budget_pacing","Pacing vs. plan","SIGNAL",PLAN,""),
     kpi("budget_paid_share","Paid media share of spend","",ADS,""),
     kpi("budget_roas","Blended ROAS","SIGNAL",ADS,""),
     kpi("budget_hot_reserve","Opportunistic (HOT) reserve remaining","DECISION",PLAN,""),
   ]),
   section("Budget by business outcome", "Where the money goes vs. where results come from", [
     table("budget_by_outcome","Budget vs. spend vs. goal progress","DECISION",PLAN,"Goal budgets from the plan; goal progress from the outcome pages.",
           ["Outcome","Goal budget","Spent","% spent","of which Paid","ROAS","Goal progress","Status"]),
   ]),
   section("Planned vs. opportunistic (HOT)", "Discretionary reserve for in-quarter opportunities", [
     table("budget_planned_vs_hot","Planned campaigns · HOT used · HOT remaining","",PLAN,"",["Bucket","Amount","Share","Note"]),
   ]),
   section("Paid ads · spend and results by medium type", "Planned vs. actual per paid source, with what the spend bought", [
     table("budget_paid_by_source","Paid ads by medium type","DECISION",ADS,"Paid social · Search ads · Retargeting · 3rd-party ads · 3rd-party newsletters · Affiliate; results from the ads platforms.",
           ["Paid medium type","Planned","Spent","% spent","Impressions","Clicks","Conversions","Cost / conv.","ROAS","Status"]),
   ]),
   section("Other marketing spend", "Tracked by the Executive Director and Marketing Lead · non-ads spend against the same goals", [
     table("budget_other_spend","Other marketing spend by category","SIGNAL",PLAN,"Event production & promotion · Content & creative · Agency, PR & AR · Community programs (KCD support, ambassador incentives) · Membership & sponsorship sales enablement · Education promotion · Martech & tools. From the plan's budget tracker or finance export; no connector today.",
           ["Spend category","Planned","Spent","% spent","Supports (outcomes)","What it bought","Owner","Status"]),
     kpi("budget_all_total","All marketing spend (paid ads + other) · planned vs. spent","DECISION",PLAN,"Sum of the two tables above."),
   ]),
   section("Agent recommendation", "Reallocation proposal, if the figures support one", [
     note("budget_recommendation","One proposal with the evidence","Only when both budget and ROAS data exist; otherwise write 'No recommendation — requires budget and paid-media data.'"),
   ]),
  ]))

# ---------------------------------------------------------------- P04 Social
pages.append(page("all-social", 2, "All › Social",
  "Social outbound across standard sources.",
  "Medium: Social (organic) · standard metrics per source: followers, net new / wk, posts, impressions, engagements, engagement rate, link clicks, site sessions",
  [
   section("Social accounts · key metrics", "Owned accounts (publishing analytics)", [
     kpi("social_followers","Followers · all accounts","",SPROUT,""),
     kpi("social_follower_growth","Follower growth rate (net new / week)","WATCH",SPROUT,""),
     kpi("social_impressions","Impressions","",SPROUT,""),
     kpi("social_engagement_rate","Engagement rate","DECISION",SPROUT,""),
     kpi("social_link_clicks","Link clicks","SIGNAL",SPROUT,""),
     kpi("social_sessions","Sessions driven to site","SIGNAL",GA4,"GA4 sessions with medium=social."),
   ]),
   section("Sources · standard metrics", "LinkedIn · X · Bluesky/Mastodon · Meta/WeChat · Reddit · YouTube/Medium/Stack Overflow · Slack/Discord", [
     table("social_sources","Social sources","",SPROUT,"",["Source","Followers","Net new / wk","Posts","Impressions","Engagements","Eng. rate","Link clicks","Sessions"]),
   ]),
   section("Social listening · key metrics", "Mentions of the project across social and web platforms (LFX Lens)", [
     kpi("sl_mentions","Mentions in period","SIGNAL",LFX,"social_mentions by=total project=<slug> start/end=period."),
     kpi("sl_unique_authors","Unique authors","",LFX,"same call · social_listening_unique_authors."),
     kpi("sl_positive","Positive mentions","SIGNAL",LFX,"same call."),
     kpi("sl_negative","Negative mentions","WATCH",LFX,"same call."),
     kpi("sl_reach","Potential reach (sum of author followers)","SIGNAL",LFX,"social_reach by=total project=<slug>."),
     kpi("sl_avg_followers","Avg author followers per mention","",LFX,"social_reach · social_listening_avg_author_followers."),
   ]),
   section("Social listening by network", "Where the conversation happens", [
     table("sl_by_network","Mentions by network","SIGNAL",LFX,"social_mentions by=network project=<slug>.",["Network","Mentions","Unique authors","Positive","Negative"]),
     table("sl_trend_weekly","Mentions by week","SIGNAL",LFX,"social_mentions by=total period=week.",["Week","Mentions","Positive","Negative"]),
   ]),
   section("Engagement rate by content type", "Video vs. carousel vs. text vs. link — like-for-like by message tag", [
     table("social_content_type","Engagement by content type","DECISION",SPROUT,"",["Content type","Posts","Eng. rate","Link CTR"]),
   ]),
   section("Top posts by message tag", "Which narrative threads resonate", [
     table("social_message_tags","Top posts by message tag","DECISION",SPROUT,"Requires a message tag on every post.",["Message tag","Posts","Avg eng. rate","Top post"]),
   ]),
   section("Event social lift · pre / during / post", "Event weeks vs. the non-event baseline", [
     table("social_event_lift","Event lift","SIGNAL",LFX,"social_mentions by=total period=week; compare the event week(s) with the trailing 8-week baseline for each event in the events table. Add Sprout engagement lift when that connector exists.",
           ["Event","Pre (2 wks)","During","Post (2 wks)","Lift vs. baseline"]),
   ]),
  ]))

# ---------------------------------------------------------------- P05 Web
pages.append(page("all-web", 2, "All › Web",
  "Owned web placements and standard sources.",
  "Medium: Web · standard metrics per source: sessions, unique visitors, page views, pages / session, time on page, scroll depth, conversions, conversion rate",
  [
   section("Web · key metrics", "", [
     kpi("web_sessions","Sessions","",GA4,""),
     kpi("web_uniques","Unique visitors","",GA4,""),
     kpi("web_organic_share","Organic search share","SIGNAL",GA4,""),
     kpi("web_time_on_page","Avg time on page","SIGNAL",GA4,"HubSpot content analytics TIME_PER_PAGEVIEW for HubSpot-hosted pages."),
     kpi("web_scroll_depth","Scroll depth (median)","",GA4,"Requires GA4 enhanced-measurement scroll event."),
     kpi("web_cta_conv_rate","CTA conversion rate","DECISION",HS,"get_content_analytics_report mode=TOTALS sortMetric=CTA_RATE / SUBMISSIONS for HubSpot-hosted pages."),
   ]),
   section("Sources · standard metrics", "Pages · Blogs · Landing pages · CTAs · Banners", [
     table("web_sources","Web sources","",GA4,"HubSpot-hosted landing pages, website pages and blog posts: get_content_analytics_report mode=TOTALS (RAW_VIEWS, VISITS, SUBMISSIONS, CTA_VIEWS, CTA_CLICKS, ENTRANCES, EXITS, PAGE_BOUNCE_RATE, TIME_PER_PAGEVIEW). Non-HubSpot properties require GA4.",
           ["Source","Sessions","Uniques","Page views","Pages / sess.","Time on page","Scroll","Conv.","Conv. rate"], alt_source=HS),
   ]),
   section("Traffic by narrative tag", "Content tagged by narrative — which topics drive organic discovery", [
     table("web_narrative_tags","Traffic by narrative tag","DECISION",CMS,"Requires a narrative taxonomy in the CMS plus GA4.",["Narrative tag","Sessions","Organic share","Time on page","Conv. rate"]),
   ]),
   section("Organic search traffic by keyword", "Is the narrative cutting through beyond owned channels?", [
     table("web_organic_keywords","Organic search by keyword","SIGNAL",GSC,"",["Keyword","Clicks","Impressions","Avg position","QoQ"]),
   ]),
   section("Top landing pages", "Where people enter", [
     table("web_top_landing","Top landing pages","SIGNAL",HS,"get_content_analytics_report mode=TOTALS sortMetric=ENTRANCES limit=10 (HubSpot-hosted); GA4 for others.",["Page","Entrances","Bounce","Conv. rate"]),
   ]),
   section("Top exit pages", "Where journeys break — exits before the CTA", [
     table("web_top_exit","Top exit pages","SIGNAL",HS,"get_content_analytics_report mode=TOTALS sortMetric=EXITS limit=10.",["Page","Exits","Exit rate","Journey"]),
   ]),
  ]))

# ---------------------------------------------------------------- P06 Direct
pages.append(page("all-direct", 2, "All › Direct",
  "Direct messaging to enriched and known contacts.",
  "Medium: Direct · standard metrics per source: audience, sends, delivered, open rate, CTR, conversions, conversion rate, unsubscribe rate, active vs. dormant",
  [
   section("Direct · key metrics", "All marketing email in the period", [
     kpi("direct_sends","Sends","",HS,"get_marketing_email_analytics analysisRequest={_type:OVERVIEW, statisticsSection:{startDate,endDate,frequency:TOTAL}}."),
     kpi("direct_open_rate","Open rate (directional — Apple MPP inflates it)","DECISION",HS,"same call: opens / delivered."),
     kpi("direct_ctr","Click-through rate","",HS,"same call: clicks / delivered."),
     kpi("direct_conv_rate","Campaign conversion rate","DECISION",HS,"Form submissions or goal completions attributed to email: get_campaign_attribution_reports ASSET_TYPE=EMAIL, or read_campaign_data GET_ASSET_METRICS assetType=MARKETING_EMAIL."),
     kpi("direct_unsub_rate","Unsubscribe rate","WATCH",HS,"same OVERVIEW call: unsubscribes / delivered."),
     kpi("direct_list_health","List health · active share","WATCH",HS,"query_crm_data: COUNT(*) FROM CONTACT WHERE hs_email_last_open_date >= <90 days ago> vs. total marketing contacts; confirm the dormant definition with Marketing Ops."),
   ]),
   section("Sources · standard metrics", "Newsletter · Invites & reminders · Nurture sequences · Surveys · Social DM · Slack/Discord · SMS", [
     table("direct_sources","Direct sources","",HS,"OVERVIEW with dimensions=[MARKETING_EMAIL_OBJECT_ID]; classify emails by type/name (newsletter, invite, nurture, survey) via search_crm_objects MARKETING_EMAIL. Social DM requires Sales Navigator; Slack/Discord and SMS have no connector.",
           ["Source","Audience","Sends","Open rate","CTR","Conv.","Conv. rate","Unsub.","Active"], row_sources={"Social DM":SN,"Slack · Discord":"Slack/Discord analytics","SMS":"SMS platform"}),
   ]),
   section("Open rate & CTR by audience segment", "Members, community and prospects tracked separately", [
     table("direct_by_segment","By audience segment","DECISION",HS,"Requires the segment (list) attached at send time; otherwise approximate with HubSpot lists (member key contacts, community, prospects) and per-email stats.",
           ["Segment","Contacts","Open rate","CTR","Conv. rate"]),
   ]),
   section("Conversion & unsubscribe by campaign type", "Every email has one goal — did it accomplish it?", [
     table("direct_by_campaign_type","By campaign type","WATCH",HS,"",["Campaign type","Goal","Sends","Conv. rate","Unsub. rate"]),
   ]),
   section("List health · active vs. dormant", "Month over month · deliverability risk", [
     table("direct_list_health_table","List health by list","WATCH",HS,"query_crm_data with hs_crm_search.ilsListIds per list; active = open or click in 90 days.",["List","Size","Active %","MoM"]),
   ]),
   section("12-week trend", "CTR and conversion rate by week", [
     table("direct_trend","Weekly trend","",HS,"OVERVIEW frequency=WEEKLY.",["Week","Sends","Open rate","CTR","Unsub."]),
   ]),
  ]))

# ---------------------------------------------------------------- P07 Defined Campaigns
pages.append(page("all-campaigns", 2, "All › Defined Campaigns",
  "Goals, campaigns and tactics — with the KPI at every level",
  "Goals (KPI, budget, timeline) from the Quarterly Marketing Plan · campaigns and tactics (activities per Medium : Source) from the Quarterly Campaign Plan",
  [
   section("Defined campaigns · goals → campaigns → tactics", "Grouped by goal, then campaign, then tactic; each level carries its own KPI, result, budget, timeline, owner and status", [
     table("defined_campaigns","Goal › Campaign › Tactic","DECISION",PLAN,
           "Goal rows: every business goal in the Quarterly Marketing Plan with KPI target, budget, timeline, owner (e.g. '12,500 KubeCon NA attendees registered'). Campaign rows under each goal: from the Quarterly Campaign Brief — leader, mediums, KPI (e.g. 'Grow KubeCon NA audience by 500K new contacts'), budget. Tactic rows under each campaign: one per Medium : Source activity with its KPI (e.g. 'Publish 2 LinkedIn posts per week and average 1,000 impressions per week'). Results: goal progress from the outcome pages; campaign results from HubSpot read_campaign_data GET_ANALYTICS (sessions, new contacts, influenced contacts) when connected; tactic results from the medium pages. Mark the Level column GOAL / CAMPAIGN / TACTIC so the builder can shade rows.",
           ["Level","Goal › Campaign › Tactic","Medium : Source","KPI","Result","Budget / spent","Timeline","Owner","Status"], alt_source=HS),
   ]),
   section("Campaign results (HubSpot)", "Engagement metrics per active campaign, joined to the table above by campaign name", [
     table("campaign_results","Active campaigns · sessions, new contacts, influenced contacts","",HS,"search_crm_objects objectType=CAMPAIGN (active in period) → read_campaign_data GET_ANALYTICS per campaign.",
           ["Campaign","Goal","Sessions","New contacts","Influenced contacts","Attributed revenue (linear)"]),
   ]),
  ]))

# ---------------------------------------------------------------- P08 Memberships
pages.append(page("memberships", 1, "Memberships",
  "Identifying, nurturing, and protecting member commitment",
  "Business outcome: Targeted Accounts, Enriched Contacts, Cross Sale, Renewal",
  [
   section("Goals · quarterly plan", "Goals for this outcome", [
     table("mem_goals","Membership goals","DECISION",PLAN,"From the Quarterly Marketing Plan; progress from the figures below.",["Goal","KPI","Target","Progress","Budget","Status"]),
   ]),
   section("Membership state (LFX)", "Foundation-level memberships attach at the foundation; state today unless noted", [
     kpi("mem_current_count","Active memberships (project-account pairs)","",LFX,"memberships by=total project=<slug>."),
     kpi("mem_member_orgs","Distinct member organizations","DECISION",LFX,"member_organizations project=<slug>."),
     kpi("mem_list_revenue","Active membership list-price revenue (not dues billed)","",LFX,"memberships by=total · current_membership_revenue."),
     kpi("mem_new","New memberships sold in period (new business)","DECISION",LFX,"new_members by=total project=<slug> start_date=<period start>."),
     kpi("mem_churn","Memberships churned in period","WATCH",LFX,"membership_churn by=total project=<slug> start_date=<period start>."),
     kpi("mem_lost_orgs","Organizations lost in period","WATCH",LFX,"lost_member_organizations project=<slug> start_date=<period start>."),
   ]),
   section("Membership pipeline", "HubSpot leads joined to closed members — the funnel is the join", [
     kpi("mem_leads_pipeline","Member leads in pipeline","DECISION",HS,"query_crm_data: SELECT COUNT(*) FROM DEAL WHERE pipeline = <membership pipeline> AND dealstage NOT IN (closed) — confirm names with search_properties."),
     kpi("mem_mktg_sourced","Marketing-sourced share of pipeline","DECISION",HS,"get_campaign_attribution_reports FIRST_INTERACTION vs. total deals."),
     kpi("mem_mktg_influenced","Marketing-influenced share (multi-touch)","DECISION",HS,"LINEAR / DEAL_COUNT vs. total."),
     kpi("mem_velocity","Pipeline velocity · first touch → close","SIGNAL",HS,"Avg (closedate − createdate) on closed-won membership deals in period: query_crm_data."),
     kpi("mem_outreach_response","Outreach response rate by target profile","SIGNAL",SN,""),
     kpi("mem_hand_raisers","Hand-raisers in period (membership inquiry forms)","DECISION",HS,"Form submissions on membership inquiry forms: search_crm_objects / query_crm_data on form submission properties."),
   ]),
   section("Members by tier · new, renewing, at risk", "An at-risk Platinum is a bigger problem than an at-risk Silver", [
     table("mem_by_tier","Members by tier","DECISION",LFX,"memberships by=tier project=<slug> (count, list revenue). New by tier: new_members has no tier grouping — use query_lfx_semantic_layer new_membership_count group_by asset_id tier dimension (get_dimensions first; tier literals differ per foundation). Renewing/at-risk require HubSpot renewal fields.",
           ["Tier","Members","List revenue","New in period","Renewing next qtr","At risk","Benefit use","Engaged 90d"]),
     table("mem_new_by_quarter","New memberships by quarter","",LFX,"new_members by=total project=<slug> period=quarter (trailing 5).",["Quarter","New memberships","New organizations"]),
   ]),
   section("Inbound marketing · member journey funnel", "Contacts by stage · Fit × Warmth", [
     table("mem_funnel","Journey funnel","",HS,"query_crm_data: COUNT(*) FROM CONTACT GROUP BY lifecyclestage (or the foundation's Fit/Warmth score properties).",["Stage","Contacts","Conversion from prior"]),
     table("mem_inbound_by_medium","Inbound by medium and source · Memberships","",'mixed',INBOUND_HOW,INBOUND_COLS, row_sources={"Paid":ADS,"Social":SPROUT,"Web":GA4,"Direct":HS}),
   ]),
   section("Outreach response by target profile", "Direct › Social DM (Sales Navigator)", [
     table("mem_outreach_by_profile","Outreach by target profile","SIGNAL",SN,"",["Target profile","Sent","Replies","Rate","Meetings"]),
   ]),
   section("Member health · touchpoints & amplification", "Zero touchpoints in 90 days is a churn risk regardless of contract", [
     table("mem_health","Member health signals","DECISION","mixed",
           "Zero-touchpoint members: HubSpot last-engagement properties on member companies (query_crm_data COMPANY) joined with LFX committee meeting attendance (query_lfx_semantic_layer attendees_count group_by primary_key__account_name, project__foundation_slug=<slug>, trailing 90 days). Amplification-kit uptake requires UTM member tagging. Message pull-through: social_mentions filtered by keyword (query_lfx_semantic_layer mention_key__keyword) — LFX.",
           ["Signal","Value","Trend","Source"], row_sources={"Zero-touchpoint members (90d)":HS,"Committee meeting attendance by member (90d)":LFX,"Amplification kit uptake via UTM":"UTM member tagging","Message pull-through":LFX,"Benefit utilization by tier":"Member benefits tracker"}),
   ]),
  ]))

# ---------------------------------------------------------------- P09 Events
pages.append(page("events", 1, "Events",
  "Fill the seats and sell the sponsorships",
  "Business outcome: event attendance growth, sponsorship growth across owned and supported community events",
  [
   section("Goals · quarterly plan", "", [
     table("ev_goals","Event goals","DECISION",PLAN,"",["Goal","KPI","Target","Progress","Budget","Status"]),
   ]),
   section("Event ROI · key metrics", "Registrations, cost and what events pay back", [
     kpi("ev_regs","Registrations (events starting in period)","DECISION",LFX,"event_registrations by=total project=<slug> start/end=period → total_registrations, total_unique_registrants."),
     kpi("ev_attendance_rate","Attendance rate (checked-in / registered)","SIGNAL",LFX,"same call · total_checked_in_attendees / total_registrations; check-in exists only for some sources — say so."),
     kpi("ev_sponsorship_rev","Sponsorship revenue","DECISION",LFX,"event_sponsorships by=total project=<slug>."),
     kpi("ev_speakers","Accepted speakers","",LFX,"speakers by=total project=<slug>."),
     kpi("ev_cost_per_reg","Cost / registration","SIGNAL",ADS,"Paid spend on event campaigns / registrations — requires ads connector and plan budget."),
     kpi("ev_post_event_pipeline","Post-event pipeline (90-day window)","DECISION",HS,"Attendees → HubSpot contacts → deals within 90 days: requires Cvent → HubSpot contact match (query_crm_data on event-attendance properties)."),
     kpi("ev_third_party_contacts","Net new contacts · third-party events","SIGNAL",HS,"query_crm_data CONTACT WHERE hs_analytics_source / original source = event list of third-party events."),
   ]),
   section("Inbound by medium and source · Events", "Registration volume and cost per registration by medium", [
     table("ev_inbound_by_medium","Registrations by medium and source","SIGNAL","mixed",INBOUND_HOW.replace("Conversions","Registrations"),INBOUND_COLS, row_sources={"Paid":ADS,"Social":SPROUT,"Web":GA4,"Direct":HS}),
   ]),
   section("Events in period · attendance and sponsorship", "Owned and third-party · one row per event", [
     table("ev_events_table","Events","DECISION",LFX,"event_registrations by=event project=<slug> (registrations, unique registrants, checked-in); event_sponsorships by=event (revenue, count); speakers by=event. Goals per event from the plan.",
           ["Event","Type","Start date","Registered","Unique","Checked in","Sponsorship $","Sponsorships","Speakers"]),
   ]),
   section("Community Days (KCD) · by region and format", "The leading indicator for flagship-city viability", [
     table("ev_kcd_table","Community Days","DECISION",LFX,"Filter the event rows above whose name contains 'Community Day' / 'KCD'; registrations and growth from event_registrations by=event over the prior year too. Region and format are not LFX fields — infer region from the event name/city where possible and mark 'requires Bevy/Cvent event metadata' otherwise.",
           ["Region","Events","In-person / hybrid","Total regs","Avg regs / event","Growth YoY"], alt_source=CVENT),
   ]),
   section("Post-event payback · 90-day window", "Did attendees become leads or members within 90 days?", [
     table("ev_post_event_payback","Post-event payback","DECISION",HS,"Requires Cvent attendee → HubSpot contact join.",["Event","Attendees","→ HubSpot leads","→ Sales-ready","→ Members","Pipeline"], alt_source=CVENT),
   ]),
   section("Event social lift", "Pre / during / post vs. baseline", [
     table("ev_social_lift","Event social lift (mentions)","SIGNAL",LFX,"social_mentions period=week around each event start date vs. trailing 8-week baseline.",["Event","Pre (2 wks)","During","Post (2 wks)","Lift vs. baseline"]),
   ]),
  ]))

# ---------------------------------------------------------------- P10 Education
pages.append(page("education", 1, "Education",
  "Fill the courses and grow certifications",
  "Business outcome: Course attendance and growing certifications across channels.",
  [
   section("Goals · quarterly plan", "", [
     table("ed_goals","Education goals","DECISION",PLAN,"",["Goal","KPI","Target","Progress","Budget","Status"]),
   ]),
   section("Education · key metrics", "", [
     kpi("ed_enrollments","Enrollments in period","DECISION",LFX,"training_enrollments by=total project=<slug> start/end=period (platform data: TI + edX)."),
     kpi("ed_enrolled_users","Enrolled users (distinct)","",LFX,"same call · total_enrolled_users."),
     kpi("ed_certifications","Certifications completed (by enrollment date)","DECISION",LFX,"certifications by=total project=<slug>."),
     kpi("ed_free_to_paid","Free → paid conversion","DECISION",TI,""),
     kpi("ed_cost_per_enroll","Cost / enrollment","SIGNAL",ADS,""),
     kpi("ed_b2b_deals","B2B training deals","",HS,"query_crm_data DEAL in the training pipeline, closed-won in period."),
   ]),
   section("Inbound by medium and source · Education", "Conversion = enrollment or training inquiry", [
     table("ed_inbound_by_medium","Enrollments by medium and source","", "mixed",INBOUND_HOW,INBOUND_COLS, row_sources={"Paid":ADS,"Social":SPROUT,"Web":GA4,"Direct":HS}),
   ]),
   section("Courses · enrollments", "Top courses in period", [
     table("ed_courses","Courses","",LFX,"training_enrollments by=course project=<slug> order_by=-total_enrollments limit=10.",["Course","Enrollments","Enrolled users","YoY"]),
   ]),
   section("Enrollments by month", "Trailing 12 months", [
     table("ed_enroll_by_month","Enrollments by month","",LFX,"training_enrollments by=total period=month (default trailing year).",["Month","Enrollments","Enrolled users","Certifications"]),
   ]),
   section("Enrollments by organization", "Attributed enrollments (a floor — edX rows carry no account)", [
     table("ed_enrolled_orgs","Top organizations by enrollments","",LFX,"training_enrollments by=org project=<slug> limit=10.",["Organization","Enrollments","Enrolled users"]),
   ]),
  ]))

# ---------------------------------------------------------------- P11 Audience
pages.append(page("audience", 1, "Audience",
  "Grow the audience and ensure industry is carrying key messaging",
  "Business Outcome: Audience · net new contacts · engaged contacts · reach · share of voice.",
  [
   section("Goals · quarterly plan", "", [
     table("au_goals","Audience goals","DECISION",PLAN,"",["Goal","KPI","Target","Progress","Budget","Status"]),
   ]),
   section("Audience · key metrics", "", [
     kpi("au_net_new_contacts","Net new contacts in period","DECISION",HS,"query_crm_data: SELECT COUNT(*) FROM CONTACT WHERE createdate BETWEEN <start> AND <end> (scope to the foundation's lists/properties where they exist)."),
     kpi("au_engaged_contacts","Engaged contacts (activity in 90 days)","DECISION",HS,"CONTACT WHERE hs_last_sales_activity_timestamp / hs_email_last_click_date within 90 days."),
     kpi("au_participants","Community participants (any activity)","SIGNAL",LFX,"participants by=total project=<slug> start/end=period."),
     kpi("au_social_reach","Social listening reach","SIGNAL",LFX,"social_reach by=total project=<slug>."),
     kpi("au_share_of_voice","Share of voice vs. adjacent foundations","DECISION",LFX,"query_lfx_semantic_layer social_listening_mentions group_by project__foundation_slug over the period; share = project mentions / sum of the compared foundations (state which)."),
     kpi("au_sentiment","Sentiment (positive / negative share)","SIGNAL",LFX,"social_mentions by=sentiment project=<slug>."),
   ]),
   section("Inbound by medium and source · Audience", "Conversion = net new contact (subscribe, RSVP, follow, first-visit enrichment)", [
     table("au_inbound_by_medium","Net new contacts by medium and source","","mixed",INBOUND_HOW,INBOUND_COLS, row_sources={"Paid":ADS,"Social":SPROUT,"Web":GA4,"Direct":HS}),
   ]),
   section("Audience mix", "Where the audience lives · month over month", [
     table("au_mix","Audience mix","","mixed","Social followers: Sprout. Newsletter subscribers: HubSpot list size. Community members: LFX participants / Slack. Web visitors: GA4. Learners: LFX training_enrollments.",
           ["Channel","Audience","MoM"], row_sources={"Social followers":SPROUT,"Newsletter subscribers":HS,"Community participants":LFX,"Monthly web visitors":GA4,"Learners":LFX}),
   ]),
   section("Narrative & message pull-through", "Is the narrative spreading beyond our channels?", [
     table("au_pull_through","Mentions by message / keyword","WATCH",LFX,"query_lfx_semantic_layer social_listening_mentions, social_listening_unique_authors group_by mention_key__keyword where project scope + period. Ask the user for the 3–5 message tags to track if not in the Message Foundation.",
           ["Message / keyword","Mentions","Unique authors","Positive","Negative","Trend"]),
   ]),
  ]))

# ---------------------------------------------------------------- P12 Adoption
pages.append(page("adoption", 1, "Adoption",
  "Grow use, contributions, champions.",
  "Business outcome: Adoption · users / downloads / stars · ambassadors · contributors · maintainers · community groups.",
  [
   section("Goals · quarterly plan", "", [
     table("ad_goals","Adoption goals","DECISION",PLAN,"",["Goal","KPI","Target","Progress","Budget","Status"]),
   ]),
   section("Adoption · key metrics", "", [
     kpi("ad_contributors","Distinct code contributors in period","DECISION",LFX,"contributors by=total project=<slug> start/end=period."),
     kpi("ad_contributions","Code contributions in period","",LFX,"contributions by=total project=<slug>."),
     kpi("ad_contributing_orgs","Contributing organizations","",LFX,"contributing_organizations by=total project=<slug>."),
     kpi("ad_maintainers","Active maintainers (today)","DECISION",LFX,"maintainers by=total project=<slug> (report active_maintainers and the excl_reviewers split)."),
     kpi("ad_participants","Participants (any activity)","",LFX,"participants by=total project=<slug>."),
     kpi("ad_project_health","Projects with a health score · average score","SIGNAL",LFX,"project_health by=total project=<slug> (state snapshot date)."),
     kpi("ad_downloads","Monthly downloads / users","DECISION","Package registries / download telemetry",""),
     kpi("ad_stars","Repository stars (period change)","SIGNAL",LFX,"Ad hoc: query_lfx_semantic_layer total_activities filtered to star activity type on the project spine (explore first); mark ad hoc."),
     kpi("ad_active_ambassadors","Active ambassadors / enrolled","DECISION",AMB,"Enrolled: search_committees name contains 'Ambassador' → search_committee_members count (LFX). Active (submitted activity) requires the ambassador tracker."),
     kpi("ad_rsvps","Community group RSVPs / month","SIGNAL",BEVY,""),
   ]),
   section("Inbound by medium and source · Adoption", "Conversion = nomination, first contribution, RSVP or download from a marketing touch", [
     table("ad_inbound_by_medium","Conversions by medium and source","","mixed",INBOUND_HOW,INBOUND_COLS, row_sources={"Paid":ADS,"Social":SPROUT,"Web":GA4,"Direct":HS}),
   ]),
   section("Contributors and maintainers (LFX)", "", [
     table("ad_contributors_by_org","Top contributing organizations","",LFX,"contributions by=org project=<slug> order_by=-code_contribution_activities limit=10 (report the unattributed NULL row).",["Organization","Contributions","Contributors"]),
     table("ad_contributors_trend","Contributors by month","",LFX,"contributors by=total project=<slug> period=month.",["Month","Contributors","Contributions"]),
     table("ad_maintainers_by_role","Maintainers by role and source","",LFX,"maintainers by=role and by=source project=<slug>.",["Role / source","Active maintainers"]),
     table("ad_project_health_table","Project health by category","SIGNAL",LFX,"project_health by=category project=<slug>.",["Category","Projects","Avg score"]),
   ]),
   section("Community groups · active vs. stagnant by region", "Active groups are the business signal; total groups is a vanity number", [
     table("ad_groups_by_region","Community groups by region","DECISION",BEVY,"",["Region","Active","Stagnant","RSVPs / mo","MoM","Technical / general"]),
   ]),
   section("Community events tied to a campaign", "Proves community is a marketing channel", [
     table("ad_campaign_tied_events","Campaign-tied community events","DECISION",BEVY,"",["Campaign","Groups participating","Events","RSVPs","Attended"]),
   ]),
   section("Ambassador program", "Active per quarter · project-specific vs. general activity", [
     table("ad_ambassador_program","Ambassador program by quarter","DECISION",AMB,"Enrolled from LFX committee roster; submitted activity, project-specific vs. general from the tracker.",["Quarter","Enrolled","Submitted activity","Active %","Project-specific","General"], alt_source=LFX),
     table("ad_ambassador_activity_type","Ambassador activity by contribution type","WATCH",AMB,"",["Contribution type","Count","Share"]),
   ]),
  ]))

# ---------------------------------------------------------------- P14 Campaign detail
pages.append(page("campaign-detail", 3, "Campaign detail",
  "One campaign, one primary KPI, every medium and source that serves it",
  "Repeat this page for each active campaign (or the top 3 by budget)",
  [
   section("Campaign · key metrics", "", [
     kpi("cd_primary_kpi","Primary KPI result vs. goal","DECISION",HS,"read_campaign_data GET_ANALYTICS METRICS; goal from the brief."),
     kpi("cd_budget","Budget / spent","",PLAN,"hs_budget_items / spend on the CAMPAIGN object if maintained; otherwise the brief."),
     kpi("cd_new_contacts","New contacts (first touch)","",HS,"GET_ANALYTICS · new contacts."),
     kpi("cd_influenced","Influenced contacts","",HS,"GET_ANALYTICS · influenced contacts."),
     kpi("cd_sessions","Sessions","",HS,"GET_ANALYTICS · sessions."),
     kpi("cd_revenue","Attributed revenue (linear)","",HS,"get_campaign_attribution_reports campaignCrmObjectIds=[id] metrics=[REVENUE]."),
   ]),
   section("Mediums and sources in this campaign", "", [
     table("cd_sources","Assets and sources","",HS,"read_campaign_data GET_ASSET_METRICS per asset type (emails, landing pages, blog posts, social posts, ads if HubSpot Ads).",
           ["Medium","Source / asset","Reach","Engaged","Contacts","Conversions","Cost"]),
   ]),
   section("Campaign definition", "From the Quarterly Campaign Brief", [
     note("cd_definition","RACI · lists · lead sources · content · workflow · previous result","Copy from the Campaign Brief if supplied; otherwise write 'Campaign Brief not supplied.'"),
   ]),
  ]))

# ---------------------------------------------------------------- P15–18 Source detail
pages.append(page("source-paid-social", 3, "Paid › Paid social (source detail)",
  "One source, every business outcome it serves", "LinkedIn, X, Reddit, Meta ads",
  [section("Key metrics", "", [kpi("sps_spend","Spend","",ADS,""),kpi("sps_impr","Impressions","",ADS,""),kpi("sps_ctr","CTR","",ADS,""),kpi("sps_cpc","CPC","",ADS,""),kpi("sps_cost_conv","Cost / conversion","",ADS,""),kpi("sps_roas","ROAS","",ADS,"")]),
   section("By platform and business outcome", "", [table("sps_by_outcome","Platform × outcome","DECISION",ADS,"",["Platform","Outcome","Spend","Impressions","CTR","CPC","Conv.","Cost / conv.","Campaign"])])]))
pages.append(page("source-social-linkedin", 3, "Social › LinkedIn organic (source detail)",
  "One source, every business outcome it serves", "Organic LinkedIn account",
  [section("Key metrics", "", [kpi("sli_followers","Followers","",SPROUT,""),kpi("sli_posts","Posts","",SPROUT,""),kpi("sli_impr","Impressions","",SPROUT,""),kpi("sli_eng","Engagement rate","",SPROUT,""),kpi("sli_clicks","Link clicks","",SPROUT,""),kpi("sli_sessions","Sessions driven","",GA4,"")]),
   section("By business outcome", "", [table("sli_by_outcome","LinkedIn by outcome","",SPROUT,"",["Outcome","Posts","Impressions","Eng. rate","Link clicks","Conversion","Top post"])]),
   section("LinkedIn mentions (social listening)", "", [table("sli_mentions","LinkedIn mentions of the project","SIGNAL",LFX,"social_mentions by=network project=<slug> → the LinkedIn row; weekly via period=week with query_lfx_semantic_layer filter mention_key__social_network='LinkedIn'.",["Week","Mentions","Unique authors","Positive","Negative"])])]))
pages.append(page("source-web-blogs", 3, "Web › Blogs (source detail)",
  "One source, every business outcome it serves", "Blog posts",
  [section("Key metrics", "", [kpi("swb_sessions","Sessions / visits","",HS,"get_content_analytics_report TOTALS filtered to blog posts (HubSpot-hosted); GA4 otherwise."),kpi("swb_uniques","Unique visitors","",GA4,""),kpi("swb_time","Time on page","",HS,"TIME_PER_PAGEVIEW."),kpi("swb_scroll","Scroll depth","",GA4,""),kpi("swb_posts","Posts published in period","",HS,"search_crm_objects BLOG_POST publish date in period."),kpi("swb_conv","CTA conversions","",HS,"CTA_CLICKS / SUBMISSIONS.")]),
   section("Top posts by narrative tag and outcome", "", [table("swb_top_posts","Top posts","DECISION",HS,"TOTALS sortMetric=RAW_VIEWS limit=10, includeMetadata=true; narrative tag from CMS if present.",["Post","Tag","Outcome","Views","Time","Scroll","Conv."], alt_source=GA4)])]))
pages.append(page("source-direct-newsletter", 3, "Direct › Newsletter (source detail)",
  "One source, every business outcome it serves", "Weekly newsletter",
  [section("Key metrics", "", [kpi("sdn_subs","Subscribers (list size)","",HS,"HubSpot list size via query_crm_data hs_crm_search.ilsListIds."),kpi("sdn_sends","Sends in period","",HS,"OVERVIEW filtered to newsletter email ids."),kpi("sdn_open","Open rate","",HS,""),kpi("sdn_ctr","CTR","",HS,""),kpi("sdn_conv","Conversions","",HS,""),kpi("sdn_unsub","Unsubscribe rate","",HS,"")]),
   section("By section and business outcome", "", [table("sdn_by_section","Newsletter sections","",HS,"Per-link click data is not exposed by the connector: use per-issue stats and note the limitation.",["Issue / section","Outcome","Clicks","CTR (of opens)","Conversion"])])]))

ORDER=["all-summary","all-paid","all-social","all-web","all-direct","all-campaigns","all-budget",
       "memberships","events","education","audience","adoption",
       "campaign-detail","source-paid-social","source-social-linkedin","source-web-blogs","source-direct-newsletter"]
pages.sort(key=lambda p: ORDER.index(p["id"]))

catalog = dict(
  version="0.2.0",
  prototype="https://paulhinz.github.io/LF-Marketing-OS-Dashboards-Prototypes/",
  connectors=dict(required=["LFX"], optional=["HubSpot"],
                  other=[ADS,SPROUT,GA4,GSC,BEVY,CVENT,SN,AMB,TI,CMS,PLAN]),
  pages=pages)

out = sys.argv[1] if len(sys.argv)>1 else "report_catalog.json"
json.dump(catalog, open(out,"w"), indent=1, ensure_ascii=False)
n_items = sum(len(s["items"]) for p in pages for s in p["sections"])
print(f"wrote {out}: {len(pages)} pages, {n_items} items")
