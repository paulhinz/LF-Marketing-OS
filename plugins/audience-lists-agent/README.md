# audience-lists-agent

LFX Marketing OS "Audience Lists Agent" (Foundation Setup, the "Earned and Social Media Audiences LISTS" deliverable on the Foundation Set Up workflow).

It reads a project's three foundation documents (Brand Kit, Message Foundation, ICP and Target Markets), the LFX Marketing OS earned media tiers, Octolens and LFX Lens social listening, and the audiences in HubSpot, Twilio Segment and LFX, and writes one Word document with three sections:

1. **Earned Media Target List.** Outlets and newsletters grouped by the five tiers (business and finance, policy and government, tech trade, newsletters and independent voices, vertical industry press), ordered by priority for the project, with the strategy and lead message per outlet and the news hooks available.
2. **Social Media Voices.** The top 5 to 15 people already talking about the project's topics with real reach, in three relationship tiers, with the next action for each.
3. **Existing Audiences.** Up to 20 lists other foundations have already built whose contacts overlap with the project's ICPs, who owns each, and the overlapping message and CTA.

Output: `[Project] Audience Lists [Mon YYYY].docx` on the LF Agent DOCS template, re-skinned with the project's logo, colors and fonts through `lf-output-formatter`, plus a `(Drive upload)` copy.

Trigger: "build the audience lists for [project]", "run the audience lists agent", "earned media list for [project]", "who is talking about [project]", "which existing lists overlap with [project]".

Connectors: Google Drive (foundation documents), Octolens, LFX, HubSpot; Twilio Segment when a connector exists. Read-only: the agent never creates, changes or sends anything in any connected system.

Skill: `skills/build-audience-lists/SKILL.md`. References: earned media tiers, data source playbook, document template, quality rubric.
