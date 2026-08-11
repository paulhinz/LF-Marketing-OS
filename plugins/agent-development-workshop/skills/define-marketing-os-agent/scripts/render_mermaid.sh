#!/bin/bash
# Renders a Mermaid (.mmd) source file to a PNG image.
# Usage: render_mermaid.sh <input.mmd> <output.png>
# Requires Node/npx to be available in the environment. Falls back with a
# non-zero exit code and a clear message if mermaid-cli cannot run --
# the calling skill should then fall back to embedding the raw Mermaid text.

set -e

INPUT="$1"
OUTPUT="$2"

if [ -z "$INPUT" ] || [ -z "$OUTPUT" ]; then
  echo "Usage: render_mermaid.sh <input.mmd> <output.png>" >&2
  exit 1
fi

if ! command -v npx >/dev/null 2>&1; then
  echo "npx/Node not available -- cannot rasterize Mermaid. Embed the raw .mmd text instead." >&2
  exit 2
fi

npx -y @mermaid-js/mermaid-cli -i "$INPUT" -o "$OUTPUT" -b transparent --scale 2 \
  || { echo "mermaid-cli failed -- embed the raw .mmd text instead." >&2; exit 3; }

echo "Rendered $OUTPUT"
