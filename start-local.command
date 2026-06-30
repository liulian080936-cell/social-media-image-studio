#!/bin/zsh

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
BUNDLED_NODE="/Users/joyin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"

if command -v node >/dev/null 2>&1; then
  NODE_BIN="$(command -v node)"
elif [ -x "$BUNDLED_NODE" ]; then
  NODE_BIN="$BUNDLED_NODE"
else
  echo "找不到可用的 Node.js。"
  exit 1
fi

cd "$ROOT_DIR"
PORT="${PORT:-8786}" "$NODE_BIN" ./scripts/dev-server.mjs
