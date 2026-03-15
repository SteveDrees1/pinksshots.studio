#!/usr/bin/env bash
# One-command: clean, optimize, update docs, run project, open login page, run tests.
set -e
cd "$(dirname "$0")/../.."

echo "=== 1. Clean ==="
./infrastructure/scripts/clean.sh

echo ""
echo "=== 2. Install & Optimize ==="
pnpm install
pnpm build 2>/dev/null || true
pnpm lint 2>/dev/null || true

echo ""
echo "=== 3. Update documentation ==="
[[ -f infrastructure/scripts/update-docs.sh ]] && ./infrastructure/scripts/update-docs.sh

echo ""
echo "=== 4. Start services ==="
[[ ! -f .env ]] && { cp .env.example .env; echo "Created .env. Set SESSION_SECRET before production."; }
chmod +x infrastructure/scripts/*.sh 2>/dev/null || true
./infrastructure/scripts/ensure-docker.sh
pnpm docker:up
sleep 3
pnpm db:migrate 2>/dev/null || true
pnpm db:seed 2>/dev/null || true

echo ""
echo "=== 5. Starting dev servers ==="
pnpm dev &
DEV_PID=$!
sleep 8

echo ""
echo "=== 6. Open web app in browser ==="
open_url() {
  if command -v open >/dev/null 2>&1; then open "$1"
  elif command -v xdg-open >/dev/null 2>&1; then xdg-open "$1"
  fi
}
open_url "http://localhost:3000"

echo ""
echo "=== 7. Run tests ==="
pnpm test
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
