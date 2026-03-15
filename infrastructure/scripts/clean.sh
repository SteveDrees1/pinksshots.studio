#!/usr/bin/env bash
# Remove build artifacts for a clean rebuild.
set -e
cd "$(dirname "$0")/../.."
echo "Cleaning..."
rm -rf node_modules apps/*/node_modules
rm -rf apps/*/.next apps/*/dist apps/*/out .turbo apps/*/.turbo
rm -f apps/*/*.tsbuildinfo
echo "Done. Run: pnpm install && pnpm build"
