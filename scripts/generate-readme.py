#!/usr/bin/env python3
"""Generate the plugin listing in README.md from .claude-plugin/marketplace.json.

marketplace.json is the single source of truth. This script rewrites the
README block between the <!-- plugins:start --> and <!-- plugins:end -->
markers with the plugin count, category headings, and one concise line per
plugin.

Usage:
  python3 scripts/generate-readme.py           # regenerate the README block
  python3 scripts/generate-readme.py --check   # validate, exit 1 on any drift

--check fails when:
  * a plugin directory on disk has no marketplace.json entry
  * a marketplace.json entry points to a missing directory
  * the README block differs from the generated output
"""

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MARKETPLACE = ROOT / ".claude-plugin" / "marketplace.json"
README = ROOT / "README.md"
PLUGINS_DIR = ROOT / "plugins"
START = "<!-- plugins:start -->"
END = "<!-- plugins:end -->"

CATEGORY_ORDER = [
    "Foundation",
    "Planning",
    "Pipeline Development",
    "Outbound Marketing",
    "Inbound / Monitoring",
    "Additional",
]


def render(plugins):
    lines = [f"## 2. The {len(plugins)} plugins in this marketplace", ""]
    categories = list(CATEGORY_ORDER)
    for p in plugins:  # keep any unknown category rather than dropping it
        if p["category"] not in categories:
            categories.append(p["category"])
    for cat in categories:
        entries = [p for p in plugins if p["category"] == cat]
        if not entries:
            continue
        lines.append(f"**{cat}**")
        for p in entries:
            lines.append(f"- `{p['name']}` — {p['description']}")
        lines.append("")
    return "\n".join(lines).rstrip() + "\n"


def main():
    check = "--check" in sys.argv[1:]
    errors = []

    plugins = json.loads(MARKETPLACE.read_text())["plugins"]

    listed = {p["name"] for p in plugins}
    on_disk = {d.name for d in PLUGINS_DIR.iterdir()
               if (d / ".claude-plugin" / "plugin.json").is_file()}
    for name in sorted(on_disk - listed):
        errors.append(f"plugins/{name} exists on disk but has no marketplace.json entry")
    for name in sorted(listed - on_disk):
        errors.append(f"marketplace.json lists '{name}' but plugins/{name} is missing")
    for p in plugins:
        if not (ROOT / p["source"]).is_dir():
            errors.append(f"marketplace.json entry '{p['name']}' points to missing path {p['source']}")

    readme = README.read_text()
    if START not in readme or END not in readme:
        print(f"ERROR: README.md is missing the {START} / {END} markers", file=sys.stderr)
        sys.exit(1)

    head, rest = readme.split(START, 1)
    _, tail = rest.split(END, 1)
    block = f"{START}\n{render(plugins)}{END}"
    new_readme = head + block + tail

    if check:
        if new_readme != readme:
            errors.append("README.md plugin block is out of date; run scripts/generate-readme.py")
        if errors:
            for e in errors:
                print(f"ERROR: {e}", file=sys.stderr)
            sys.exit(1)
        print(f"OK: README.md and marketplace.json agree on {len(plugins)} plugins")
    else:
        if errors:
            for e in errors:
                print(f"ERROR: {e}", file=sys.stderr)
            sys.exit(1)
        README.write_text(new_readme)
        print(f"Regenerated README.md plugin block ({len(plugins)} plugins)")


if __name__ == "__main__":
    main()
