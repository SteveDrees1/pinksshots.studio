# Scripts

| Script | Purpose |
|--------|---------|
| `full.sh` | **Full flow**: Clean, git-clean-ignored, install, build, lint, update-docs, test, start, test-health, open browser. Graceful Ctrl+C shutdown. |
| `dev.sh` | Run dev servers with graceful Ctrl+C (used by root `pnpm dev`). |
| `run.sh` | Clean, optimize, update docs, start services, open login page, run tests. |
| `start.sh` | Start dev environment: env check, install, Postgres, migrate, `pnpm dev`. |
| `clean.sh` | Remove `node_modules`, `.next`, `dist`, `out`, `.turbo` for a fresh build. |
| `build.sh` | Build all apps (web, admin, api). |
| `ensure-docker.sh` | Start Colima if Docker isn't running, then verify Docker is ready. |
| `git-clean-ignored.sh` | Remove tracked files that match `.gitignore` from the index. |
| `update-docs.sh` | Placeholder for doc generation; invoked by `run.sh`. |
| `test-health.js` | Health checks for API (4000), web (3000), admin (3001). |

**Quick start:**
```bash
chmod +x infrastructure/scripts/*.sh
./infrastructure/scripts/full.sh   # or: pnpm full
```

**Stop tracking ignored files:** `./infrastructure/scripts/git-clean-ignored.sh` then `git commit`
