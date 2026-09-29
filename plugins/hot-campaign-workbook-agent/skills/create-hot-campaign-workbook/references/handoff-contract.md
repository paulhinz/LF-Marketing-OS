# Handoff Contract — what the completed workbook gives `hot-campaign-plan-agent`

The Hot Campaign Workbook is the IDENTIFY deliverable. Once the ED marks **Go** and the CFT has answered its questions, the workbook becomes the approved brief. `hot-campaign-plan-agent` (PLAN stage) reads it, together with the ICP & Target Markets document and the Content Plan, and produces two deliverables:

1. **Segmentation List** — the real contact list or segment definition for the SOM (built in HubSpot / Segment, or handed to the list owner), with exclusions.
2. **Hot Campaign Plan** — the per-source execution plan: persona messages, CTA, stance, FAQ, message sequence, assets with owners and ready-by dates, UTMs, QA gate, daily pulse metrics, dashboard push, close-out criteria, and the ordered list of content creation and source execution agents to run.

So the workbook must leave the plan agent nothing to re-derive. Appendix slide A3 carries the block below, filled in from the card and the sections, with the ED and CFT answers merged in after the workbook returns. Fields the workbook could not fill are written as `UNKNOWN — see [slide]` rather than left blank, so the plan agent knows to ask.

## The handoff block

```yaml
hot_campaign:
  campaign_id: HOT-[PROJECTSLUG]-[YYYYMMDD]-[slug]      # also the utm_campaign value
  project: "[canonical project name]"
  foundation: "[parent foundation, if any]"
  workbook_file: "[deck file name]"
  workbook_version: "DRAFT v1 | RETURNED v2 | APPROVED"
  raised_by: "[name, role]"
  owner: "[name, role]"
  message_approver: "[name, role]"
  decision: "GO | NO-GO | PARK"
  decision_date: "[date]"
  park_until: "[date or condition, if parked]"

trigger:
  type: "off-track | industry-news | own-release | ecosystem-release | viral-creator | competitor-move | demand-signal"
  archetype: "rescue-boost | newsjack | launch-amplification | competitive-response | nurture-surge | community-moment"
  summary: "[one sentence, with the date]"
  primary_source: "[URL or file, access date]"
  verified: true | false
  newsfeed_items: ["[issue date] — [headline]"]
  decay_date: "[date]"                # when the trigger stops being worth a campaign
  live_by_date: "[date]"              # message approval + 72h at most
  clock_starts_on: "messages approved"

fit:
  business_outcome: "Adoption | Fill the Seats | Grow the Audience | Secure/Retain Commitment | Education"
  quarterly_goal: "[goal name and KPI] | net new"
  goal_pace_at_flag: "[actual / target, pace label, report date]"
  mode: "rescue | net-new"
  planned_campaigns_unchanged: ["[campaign names]"]
  planned_campaigns_touched: ["[campaign name — how]"]
  shared_lf_resources_needed: ["[resource — dates — conflict status]"]

target:
  intent: "create-new-contacts | nurture-existing"
  som_definition: "[one sentence]"
  personas: ["[persona name from ICP]"]
  journey_stage: "ICP-unknown | Aware | Engaged"
  tier: "Viable | Warm | Hot"
  buying_criterion: "[the unlocking condition the message addresses, or 'awareness only']"
  reachable_estimate: "[count] (est., [source and definition])"
  new_contact_sources: ["[where new contacts come from, if intent is new contacts]"]
  existing_list_or_segment: "[name, size, owner] | UNKNOWN"
  exclusions: ["[suppression rules]"]
  hand_raiser_actions: ["[actions that count as immediate wins]"]

message:
  pillar: "[named pillar from the Message Foundation]"
  angle: "[one sentence]"
  ed_sound_bite: "[from ED INPUT, or UNKNOWN]"
  voice: "ED | project | both"
  key_messages:
    - persona: "[persona]"
      message: "[key message]"
      proof: "[Stat Bank proof point — verification status]"
      cta: "[CTA from the library, tier]"
  stance:
    say: ["..."]
    do_not_say: ["..."]
    approver: "[name]"
  faq:
    - q: "[question]"
      a: "[one-line answer]"

assets:
  content_plan_source: "Asana:[project] | Sheet:[file] | none"
  pull_forward: ["[asset — owner — from date → to date]"]
  repurpose: ["[asset — new cut — owner]"]
  re_angle: ["[asset — new hook — owner]"]
  net_new:
    - asset: "[type and title]"
      serves_source: "[source]"
      owner_or_agent: "[name or creation agent]"
      ready_by: "[date within the 72h]"
  reuse_from_drive: ["[existing asset — location]"]

sources:
  - medium: "Social | Direct Message | Email | Web | Paid"
    source: "[catalog name]"
    owned: "confirmed | unconfirmed"
    tactic: "[what and how often in the window]"
    asset: "[asset it uses]"
    cta: "[CTA]"
    utm: "utm_campaign=[campaign_id]&utm_medium=[medium]&utm_source=[source]"
    execution: "[tool — owner or execution agent]"
    shared_resource: true | false
    paid_budget: "[amount or n/a]"

kpi:
  primary: { name: "", baseline: "", target: "", measured_by: "", measure_date: "" }
  secondary: [ { name: "", target: "" } ]
  daily_pulse: ["reach", "sentiment", "conversions vs KPI", "spend vs discretionary"]
  close_rule: "end date [date] or KPI met, whichever first"
  hard_stop: "[date]"
  measurable_with_current_tools: true | false
  proxy_if_not: "[nearest measurable proxy]"
  listening_keywords_to_add: ["..."]

budget:
  ask: "[amount]"
  reserve_before: "[amount or UNKNOWN]"
  reserve_after: "[amount or UNKNOWN]"
  spend_on: ["paid media", "creative", "tooling"]
  qbr_reporting: true

risks:
  - risk: ""
    likelihood: "L | M | H"
    impact: "L | M | H"
    mitigation: ""
    owner: ""
  stop_signal: "[from ED INPUT]"
  qa_gate_owner: "[name]"
  reversibility: "[what can be pulled back and how fast]"

ed_satisfaction:
  worth_flagging: 1-5
  fast_and_complete: 1-5
  would_run_as_drafted: 1-5
  comment: ""
  re_ask_at_close_out: true

agents_to_run_in_order:
  - "hot-campaign-plan-agent → Segmentation List + Hot Campaign Plan"
  - "[creation agents, e.g. case-study-agent, linkedin-post-agent] → assets"
  - "[execution: HubSpot email/LP via connector, Sprout Social manual, paid manual] → tactics scheduled, QA gate"
  - "push to Hot Campaigns dashboard"
  - "social-listening-report (campaign echo) + run-marketing-impact-report → daily pulse"
  - "close-out report → learnings to next quarter's plan workbook"

provenance:
  newsfeed_folder_id: "[Drive folder ID]"
  listening_workspace: "[name]"
  sources_used: ["[source — file or query — date]"]
  gaps: ["[what was missing and which slide asks for it]"]
```

## Rules

- The block is written once when the workbook is generated (version DRAFT v1, decision blank) and rewritten by whoever runs the plan agent after the workbook returns, with the ED and CFT answers merged. `hot-campaign-plan-agent` refuses to plan a workbook whose `decision` is not `GO`; it may pre-build the Segmentation List definition for a `PARK` so the campaign can start fast later.
- `campaign_id` is the `utm_campaign` value for every source and the name of the HubSpot campaign, the Asana campaign, and the dashboard row. Never change it after the first asset goes live.
- Every list in `sources` uses the exact source names from the mediums-and-sources catalog used by `qtrly-campaign-plan-agent`, so the Campaign Performance dashboard can group hot and planned campaigns the same way.
- The close-out report (MONITOR stage) reuses `kpi`, `budget`, and `ed_satisfaction` from this block and adds actuals, attribution, and learnings; those learnings are an input to the next `create-quarterly-marketing-review-workbook` and `create-marketing-plan-workbook` runs.
