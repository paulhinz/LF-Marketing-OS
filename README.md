# LFX Marketing OS Plugin Marketplace

This is a private Claude plugin marketplace for The Linux Foundation's LFX Marketing OS agents and skills. It holds all 15 plugins in one git repository so the team can install and update them from a single source in Cowork.

## Folder structure

```
lfx-marketing-os-plugins/
  .claude-plugin/
    marketplace.json       # marketplace manifest (lists every plugin below)
  plugins/
    brand-guidelines-agent/
      .claude-plugin/
        plugin.json         # plugin manifest (name, version, description, author)
      skills/               # or commands/, agents/, hooks/, .mcp.json
      README.md
    message-foundation-agent/
      ...
    icp-target-markets-agent/
      ...
    (12 more plugins, one folder each)
  README.md                 # this file
```

Each plugin is self-contained: its own `.claude-plugin/plugin.json`, plus whatever `skills/`, `commands/`, `agents/`, or `hooks/` it needs.

## Releasing an update

To ship a change to a plugin:

1. Make your edits inside that plugin's folder under `plugins/<plugin-name>/`.
2. Bump the `version` field in that plugin's `plugins/<plugin-name>/.claude-plugin/plugin.json`. This is the only place version numbers live — do not add a `version` field to the plugin's entry in `marketplace.json`. If a plugin has no `version` field at all, Cowork falls back to the git commit SHA to detect changes.
3. Commit and push to `main`.

Team members pick up the change the next time they click "Update" on this marketplace in Cowork. No other steps are needed — the marketplace itself does not need a version bump.
