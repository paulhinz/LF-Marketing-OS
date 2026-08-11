# LinkedIn Post Agent

Drafts LinkedIn posts sharing Linux Foundation and open source ecosystem work in your authentic voice.

## How it works

1. **First run**: the agent asks about you (name, role, focus areas, projects, audience) and your preferred voice and tone, then saves the answers to `.linkedin-post-agent/profile.md` in your working folder. Setup never repeats.
2. **Every run after**: give it a piece of content (blog post, announcement, GitHub release, event recap, research report, or news article) and it generates 3 post options, each with a style label, full post text, 3-5 hashtags, and tagging suggestions.

## Usage

Say things like:

- "Draft a LinkedIn post about this announcement"
- "Turn this blog post into a LinkedIn post: [paste or link]"
- "Update my LinkedIn profile settings"

## What's inside

- `skills/draft-linkedin-post/` — the drafting workflow
- `skills/draft-linkedin-post/references/post-style-guide.md` — the full writing rulebook (hooks, banned phrases, formatting, content priorities)
