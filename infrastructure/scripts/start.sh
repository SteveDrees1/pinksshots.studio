#!/usr/bin/env bash
# Start the full dev environment: env check, install, Postgres, migrate, dev, open login.
set -e
cd "$(dirname "$0")/../.."

[[ ! -f .env ]] && { cp .env.example .env; echo "Created .env. Set SESSION_SECRET (min 32 chars)."; }

echo "Installing dependencies..."
pnpm install

echo "Starting PostgreSQL..."
chmod +x infrastructure/scripts/*.sh 2>/dev/null || true
./infrastructure/scripts/ensure-docker.sh
pnpm docker:up
sleep 3

echo "Running migrations..."
pnpm db:migrate 2>/dev/null || echo "Migrations skipped (run pnpm db:generate first if needed)"
pnpm db:seed 2>/dev/null || true

echo "Starting dev servers (browser will open to web app in ~8s)..."
(sleep 8; command -v open >/dev/null 2>&1 && open "http://localhost:3000" || command -v xdg-open >/dev/null 2>&1 && xdg-open "http://localhost:3000" || true) &
pnpm dev
