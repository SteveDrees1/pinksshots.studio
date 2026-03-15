#!/usr/bin/env bash
# One command: clean, git-clean-ignored, install, build, update-docs, test, start, test-health, open browser.
# Optimized flow for full project setup and run.
set -e
cd "$(dirname "$0")/../.."

echo "=== 1. Clean ==="
./infrastructure/scripts/clean.sh

echo ""
echo "=== 2. Git clean ignored ==="
./infrastructure/scripts/git-clean-ignored.sh 2>/dev/null || true

echo ""
echo "=== 3. Install ==="
pnpm install

echo ""
echo "=== 4. Build ==="
pnpm build

echo ""
echo "=== 5. Lint ==="
pnpm lint || true

echo ""
echo "=== 6. Update docs ==="
[[ -f infrastructure/scripts/update-docs.sh ]] && ./infrastructure/scripts/update-docs.sh

echo ""
echo "=== 7. Test ==="
pnpm test

echo ""
echo "=== 8. Start services ==="
[[ ! -f .env ]] && { cp .env.example .env; echo "Created .env. Set SESSION_SECRET before production."; }
chmod +x infrastructure/scripts/*.sh 2>/dev/null || true
./infrastructure/scripts/ensure-docker.sh
pnpm docker:up
sleep 3
pnpm db:migrate 2>/dev/null || true
pnpm db:seed 2>/dev/null || true

echo ""
echo "=== 9. Starting dev servers ==="
pnpm dev &
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
sleep 8

echo ""
echo "=== 10. Open browser & test health ==="
open_url() {
  if command -v open >/dev/null 2>&1; then open "$1"
  elif command -v xdg-open >/dev/null 2>&1; then xdg-open "$1"
  fi
}
open_url "http://localhost:3000"
sleep 2
pnpm run test:health

echo ""
echo "=== Ready ==="
echo "Login:  http://localhost:3001"
echo "Web:    http://localhost:3000"
echo "API:    http://localhost:4000"
echo ""
echo "Dev servers running (PID $DEV_PID). Press Ctrl+C to stop."
wait $DEV_PID
