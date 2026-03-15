#!/usr/bin/env bash
# Run dev servers with graceful Ctrl+C shutdown.
set -e
cd "$(dirname "$0")/../.."
chmod +x infrastructure/scripts/dev.sh 2>/dev/null || true

pnpm -r --parallel run dev &
DEV_PID=$!

cleanup() {
  echo ""
  echo "Shutting down..."
  pkill -TERM -P $DEV_PID 2>/dev/null || true
  kill -TERM $DEV_PID 2>/dev/null || true
  sleep 2
  pkill -9 -P $DEV_PID 2>/dev/null || true
  kill -9 $DEV_PID 2>/dev/null || true
  wait $DEV_PID 2>/dev/null || true
  exit 0
}
trap cleanup SIGINT SIGTERM

wait $DEV_PID
