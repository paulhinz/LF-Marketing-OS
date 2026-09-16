import csv, datetime as dt, json
W1 = dt.date(2026,9,14)
# (week, agent, area, type, requester/source, rationale)
items = [
 (1,"marketing-os-product-manager","Program","Plan","Paul","Weekly PM agent: requirements, roadmap, epics, PRDs (this agent)"),
 (1,"qtrly-campaign-plan-agent","Planning","Plan","Paul / Jim","In repo at 0.1.0 (4/6 done); completes Foundation→Qtrly Plan→Campaign chain"),
 (1,"marketing-data-sources","Foundation Setup","Reference","Paul","Built locally; publish to marketplace so other agents know where data lives"),
 (2,"hot-campaign-orchestration","Outbound – Cross-channel","Plan","CNCF (Holistic Campaign Orchestration); Nirav (Guild e2e use case)","In development; LFX+HubSpot+Social Listening; candidate for Guild end-to-end demo"),
 (2,"social-listening-setup","Outbound – Social","Reference","Deck: Agent #3 (TBD)","Keyword governance w/ quota guardrails; 'four of five pilot users get nothing on day one' without it"),
 (2,"campaign-copy","Outbound – Cross-channel","Create","Events","Email/social/kit copy, local outreach copy, abandoned-reg emails; feeds Hot Campaign"),
 (3,"newsletter-composition","Outbound – Email","Create","LF Media; LFX Tier 2 'HIGHEST PRIORITY' (LFXV2-2681–2684)","Core Agent #2; aligns with Gatewaze newsletter epic #2260"),
 (3,"trend-spike-detection","Outbound – Social","Monitor","Deck: Agent #2; All personas (weekly digest)","Scheduled weekly volume/sentiment digest to Slack; = 'Monday Morning Report'"),
 (3,"proposal-agent","Memberships","Create","OpenSearch (Lisa) – Designing","Sponsor/member proposal generation from Pitch Deck + ICP"),
 (4,"editorial-calendar","Content Production","Plan","CNCF; Allison (#39)","Cross-foundation content calendar with conflict checks"),
 (4,"landing-page","Outbound – Web","Create","Events (HubSpot landing pages)","HubSpot LP end-to-end via HubSpot MCP"),
 (4,"executive-briefing","Events","Monitor","Events","Weekly reg/email/social/paid snapshot with budget recommendation to ED + mktg lead"),
 (5,"launch-plan","Foundation Setup","Plan","Allison P1 (Marcom playbook, #7)","Launch plan doc: goals, timeline, RACI, channel mix"),
 (5,"new-member-announcement","Memberships","Create","Allison (#26)","PR + 3 social + newsletter para + welcome email"),
 (5,"social-post-and-calendar","Outbound – Social","Create","Core Agent #3; LFX Tier 2 (LFXV2-2405)","Weekly 5–10 platform-formatted drafts queued to Sprout"),
 (6,"blog-post","Content Production","Create","Allison (#10 blog template)","Blog post + 3 amplification posts"),
 (6,"event-website-qa","Events","Monitor","Events","Crawl event sites: broken links, inconsistencies, SEO"),
 (6,"comparative-content","Content Production","Create","Education","Comparative content to drive AEO for projects"),
 (7,"member-news-monitor","Memberships","Monitor","CNCF (LFX Lens)","Member news alerts for co-marketing / renewal signals"),
 (7,"marketing-recap","Business Outcomes","Monitor","Allison 'Showcasing Results' (#38)","Committee-ready recap: OKR results, wins, budget vs actuals"),
 (7,"webinar-promo-recap","Events","Create","Allison; Events (#18)","Promo email+social; recap blog + follow-up"),
 (8,"structured-campaign-brief","Outbound – Cross-channel","Plan","Demand Gen (#31)","Campaign brief: ICP, messaging, channels, RACI, metrics"),
 (8,"abm-targeted-list","Memberships","Plan","Demand Gen (#29)","Named-account outreach plan; uses LFX + Clay/Common Room"),
 (8,"email-sequence-planner","Outbound – Email","Plan","Education (#28 Lifecycle Nurture)","Welcome / re-engagement / abandonment flows in HubSpot"),
 (9,"post-webinar-followup","Education","Execute","Education (enterprise + public variants)","HubSpot workflow from template; coupon + B2B play"),
 (9,"member-edu-outreach-content","Education","Create","Education","Member marketing content for training/cert offers"),
 (9,"google-slides-template","Foundation Setup","Reference","Creative Services","Google Slides + AI/PPT template creation for all deck agents"),
 (10,"marketing-performance-action","Business Outcomes","Monitor","Events; CNCF (review w/ Misha dashboards) (#36)","Reg trends, email/social/ads, ROAS → recommendations"),
 (10,"okr-tracking","Foundation Setup","Monitor","LFX Tier 1 (#37)","OKR progress on-track/watch/at-risk"),
 (10,"project-health-narrative","Foundation Setup","Monitor","LFX Tier 1 (#35, LFXV2-2148)","Plain-English 'How are we doing?' for ED dashboard"),
 (11,"meetup-kit","Events","Create","Allison (Meetup Guidelines, #17)","Meetup description + 3 social + day-of checklist (Thanksgiving week: 2 agents)"),
 (11,"minor-release-checklist","Content Production","Execute","Allison (#11)","Pre-filled comms checklist"),
 (12,"cfp-review","Events","Execute","AAIF","CFP scoring & shortlist"),
 (12,"ambassador-application-review","Adoption (Community)","Execute","AAIF","Ambassador application/submission review"),
 (12,"ambassador-nomination","Adoption (Community)","Execute","#30","Ranked shortlist of 5–10 candidates + outreach"),
 (13,"event-execution","Events","Execute","Core Agent #5 (#13)","12-week milestone plan + email waves + social calendar"),
 (13,"speaker-promotion-kit","Events","Create","#15","Social card + bio + LinkedIn post + email"),
 (13,"post-event-content","Events","Create","#16","Recap + follow-up email + social clips"),
 (14,"local-outreach","Events","Plan","Events","Universities/meetups within radius + contacts"),
 (14,"reg-pace-tracker","Events","Monitor","Landscape","Registration pace vs goal with alerts"),
 (14,"stakeholder-communication","Program","Monitor","Events","Summarize Slack/email/meetings: decisions, open questions, deadlines"),
 (15,"whitepaper-ebook","Content Production","Create","Allison (#22)","LF-template white paper draft (holiday week: 1 agent)"),
 (16,"canva-brand-kit","Foundation Setup","Reference","Creative Services","Canva Brand Kit generation from Brand Guidelines (holiday week: 1 agent)"),
 (17,"media-mix-planner","Outbound – Paid","Plan","Misha; LFX Tier 2 HIGH PRIORITY (LFXV2-2023)","Budget allocation across LinkedIn/Google/Reddit"),
 (17,"ad-copy-variants","Outbound – Paid","Create","Misha","Ad copy variants per persona/channel"),
 (17,"ad-spend-monitor","Outbound – Paid","Monitor","Misha (#32)","Spend/pacing/ROAS alerts; depends on epic #1613 campaign platform testing"),
 (18,"audience-segmentation","Audience Development","Execute","Core Agent #6 (#25, LFXV2-2252)","Segment.io audience → HubSpot list synced"),
 (18,"engagement-scorer","Audience Development","Monitor","Landscape; funnel Viable/Warm/Hot","Fit/Warmth scoring + hand-raiser overrides"),
 (18,"list-hygiene-and-sync","Outbound – Email","Plan","LFXV2-2393 Mailing List Sync","List hygiene + Groups.io/HubSpot sync"),
 (19,"youtube-to-wordpress","Content Production","Execute","Education","Video → WordPress post pipeline"),
 (19,"video-clipper","Content Production","Create","Landscape; OpusClip","Clips from recordings for social"),
 (19,"owned-media-production","Content Production","Execute","Core Agent #7 (#21)","Transcript → show notes → clips → distribution"),
 (20,"podcast-setup","Content Production","Execute","#19","Transistor + RSS + Apple/Spotify"),
 (20,"youtube-channel-setup","Content Production","Execute","#20","Branded channel + upload workflow"),
 (20,"owned-media-flywheel","Content Production","Execute","#24","Episode → newsletter teaser → clip → event promo"),
 (21,"certification-awareness","Education","Create","#34","Cert awareness campaign kit"),
 (21,"affiliate-program-monitor","Education","Monitor","Events/EDU","Weekly affiliate report + trends"),
 (21,"course-launch-planner","Education","Plan","Landscape","Course launch plan"),
 (22,"social-amplification","Outbound – Social","Monitor","Events","High-engagement posters → influencer strategy"),
 (22,"creative-agent","Content Production","Create","Events","Template variations for social/email/ads"),
 (22,"image-brief-generator","Content Production","Create","Other Ideas","Image briefs for Creative Services / Midjourney"),
 (23,"member-onboarding","Memberships","Execute","#27 (LFX released LFXV2-1344)","Groups.io + Slack + welcome email in one run; wrap LFX capability"),
 (23,"renewal-planner","Memberships","Plan","Landscape","Renewal outreach plan from Member 360"),
 (23,"member-churn-signals","Memberships","Monitor","Landscape","Churn risk from engagement decline"),
 (24,"github-activity-monitor","Adoption (Community)","Monitor","#14 (CM-1262)","Contributor milestones flagged"),
 (24,"contributor-recognition","Adoption (Community)","Create","#15 (LFXV2-2547)","Recognition post + outreach"),
 (24,"adoption-tracker","Adoption (Community)","Monitor","Landscape","Adoption signals across GitHub/Slack/LFX"),
 (25,"board-deck","Planning","Create","Deck: QBR Board Deck","Quarterly board deck from plan + dashboards"),
 (25,"budget-planner","Foundation Setup","Plan","Landscape","Planned vs opportunistic budget"),
 (25,"consent-setup","Foundation Setup","Execute","#9b (LFXV2-1666)","OneTrust + GA4 on project site"),
 (26,"ab-test-evaluator","Outbound – Cross-channel","Monitor","#33","Winner recommendation"),
 (26,"web-analytics-reporter","Outbound – Web","Monitor","Others suggested","Plausible/GA4 weekly report"),
 (26,"roadmap-replan","Program","Plan","PM agent","6-month re-plan; buffer"),
]
rows=[]
for w,a,area,t,req,why in items:
    start=W1+dt.timedelta(weeks=w-1); end=start+dt.timedelta(days=4)
    status = "Now" if w<=2 else "Next" if w<=4 else "Later"
    rows.append(dict(week=w,week_start=start.isoformat(),week_end=end.isoformat(),agent=a,area=area,type=t,requested_by=req,rationale=why,status=status))
with open("roadmap.csv","w",newline="") as f:
    wr=csv.DictWriter(f,fieldnames=list(rows[0].keys())); wr.writeheader(); wr.writerows(rows)
json.dump(rows,open("roadmap.json","w"),indent=1)
# Mermaid
m=["```mermaid","gantt","  title LFX Marketing OS — Agent Build Roadmap (Sep 14, 2026 → Mar 12, 2027, ≤3 agents/week)","  dateFormat YYYY-MM-DD","  axisFormat %b %d","  excludes weekends"]
cur=None
for r in rows:
    sec=f"W{r['week']:02d} {r['week_start']}"
    if sec!=cur: m.append(f"  section {sec}"); cur=sec
    tag={"Now":"active, ","Next":"crit, ","Later":""}[r['status']]
    m.append(f"    {r['agent']} :{tag}{r['agent'].replace('-','_')}, {r['week_start']}, 5d")
m.append("```")
tbl=["| Wk | Week of | Agent | Area | Type | Requested by / source | Status |","|---|---|---|---|---|---|---|"]
for r in rows: tbl.append(f"| {r['week']} | {r['week_start']} | `{r['agent']}` | {r['area']} | {r['type']} | {r['requested_by']} | **{r['status']}** |")
md=f"""# LFX Marketing OS — 6-Month Agent Roadmap

Maintained weekly by the **Marketing OS Product Manager Agent** (runs Sunday nights). Source of truth: [`roadmap.csv`](roadmap.csv). Static image: [`gantt.png`](gantt.png).

**Assumptions:** 26 weeks starting Mon 2026-09-14; max 3 agents/week; reduced capacity Thanksgiving week (2) and the two holiday weeks (1 each). 21 agents already shipped in `plugins/`. **Now** = weeks 1–2, **Next** = weeks 3–4, **Later** = weeks 5–26.

**Sequencing logic:** finish the Plan chain (Qtrly Plan → Campaign Plan → Hot Campaign) → unblock social listening for all pilot users → Newsletter (LFX highest priority) → content/creation agents requested by Marcom, Events, Education, CNCF, AAIF → execution and monitoring agents that depend on LFX epics (#1613 campaign platform, #1679 dashboards, #1697 email, #2260 newsletters).

{chr(10).join(m)}

## Week-by-week

{chr(10).join(tbl)}

_Last updated {dt.date.today().isoformat()} by the Marketing OS Product Manager Agent._
"""
open("ROADMAP.md","w").write(md)
print(len(rows),"items")
