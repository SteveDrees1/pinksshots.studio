# pinkshots.studio

Portfolio platform with a futuristic, edgy aesthetic. Public site, admin CMS, and API. Built as a mono-repo for a Proxmox-hosted VM.

- **Public site** — Futuristic landing page; gallery, collections, portfolio items (coming soon).
- **Admin** — Login at port 3001; CRUD for profile, collections, portfolio items (coming soon).
- **API** — Fastify + PostgreSQL + Drizzle; session-based auth (`/auth/login`, `/auth/logout`, `/auth/me`).

---

## Quick start

```bash
# Option 1: Full flow (recommended)
chmod +x infrastructure/scripts/*.sh
./infrastructure/scripts/full.sh
# or: pnpm full

# Option 2: Manual steps
pnpm install
cp .env.example .env   # Edit and set SESSION_SECRET
pnpm docker:up         # Start Postgres
pnpm db:migrate
pnpm db:seed           # Create test user (dev@pinkshots.studio / dev123)
pnpm dev
```

**Test user (for dev/UI testing):** `dev@pinkshots.studio` / `dev123` — run `pnpm db:seed` to create.

**URLs when running (browser opens to web app only):**
- **Web**: http://localhost:3000 — Landing + `/login` (sign in → redirects to admin)
- **Admin**: http://localhost:3001 — Dashboard (after login)
- **API**: http://localhost:4000 — Health, auth endpoints  

---

## Scripts

| Script | Purpose |
|--------|---------|
| `./infrastructure/scripts/full.sh` | **Full flow**: Clean, git-clean-ignored, install, build, lint, update-docs, test, start, test-health, open browser. Graceful Ctrl+C. |
| `./infrastructure/scripts/run.sh` | Clean, optimize, update docs, start services, open login page, run tests. |
| `./infrastructure/scripts/start.sh` | Start dev environment; opens browser to login after ~8s. |
| `./infrastructure/scripts/clean.sh` | Remove `node_modules`, `.next`, `dist`, `out`, `.turbo` before a fresh build. |

After running `clean.sh`, run `pnpm install` and `pnpm build` for a clean release build.

---

## Repo layout

| Path | Description |
|------|-------------|
| `apps/web` | Next.js public site (port 3000) — futuristic landing, Orbitron/JetBrains Mono theme |
| `apps/admin` | Next.js admin dashboard (port 3001) — login, CRUD (coming soon) |
| `apps/api` | Fastify API (port 4000) — health, auth (login/logout/me), Drizzle + PostgreSQL |
| `infrastructure/scripts/` | `run.sh`, `clean.sh`, `start.sh`, `test-health.js` |
| `infrastructure/` | Proxmox, Docker, reverse-proxy, backups |

---

## Root commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start web, admin, and api in parallel |
| `pnpm dev:web` | Start only the public site |
| `pnpm dev:admin` | Start only the admin app |
| `pnpm dev:api` | Start only the API |
| `pnpm build` | Build all apps |
| `pnpm docker:up` | Start PostgreSQL in Docker |
| `pnpm docker:down` | Stop PostgreSQL |
| `pnpm docker:reset` | Reset Postgres (remove volume, recreate) — use if "password authentication failed" |
| `pnpm db:migrate` | Run migrations (direct SQL; use `db:migrate:drizzle` if drizzle-kit works) |
| `pnpm db:seed` | Create test admin user (dev@pinkshots.studio / dev123) |
| `pnpm db:studio` | Open Drizzle Studio (DB GUI) |
| `pnpm clean` | Run `infrastructure/scripts/clean.sh` (remove build artifacts) |
| `pnpm start` | Run `infrastructure/scripts/start.sh` (full dev startup) |
| `pnpm full` | Run `full.sh` (clean → git-clean → install → build → docs → test → start → health → browser) |
| `pnpm run` | Run `run.sh` (clean, optimize, docs, run, open browser, test) |
| `pnpm test` | Run unit tests (API, web, admin) |
| `pnpm test:health` | Run health checks (requires dev servers) |
| `pnpm test:all` | Run unit tests + health checks |

---

## Environment

Copy `.env.example` to `.env` and set:

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string (default matches Docker Compose) |
| `SESSION_SECRET` | Min 32 chars; generate with `openssl rand -hex 32` |
| `ADMIN_ORIGIN`, `WEB_ORIGIN` | CORS origins (defaults: localhost:3001, localhost:3000) |
| `API_URL`, `NEXT_PUBLIC_API_URL` | API base URL for web/admin (default: localhost:4000) |
| `NEXT_PUBLIC_ADMIN_URL` | Admin dashboard URL after login (default: localhost:3001) |

**Postgres "password authentication failed"?** The volume may have been created with different credentials. Run `pnpm docker:reset` to wipe and recreate Postgres, then `pnpm db:migrate` and `pnpm db:seed`.

## Auth flow

1. Owner visits **http://localhost:3000** (web) → clicks "Login to manage" → `/login`.
2. Enters `dev@pinkshots.studio` / `dev123` → `POST /auth/login` → session cookie set.
3. Redirects to **http://localhost:3001** (admin dashboard).
4. `GET /auth/me` verifies session for protected routes.

---

## Documentation

- [docs/LOGIN.md](./docs/LOGIN.md) — Login flow, test user, troubleshooting
- [CHANGELOG.md](./CHANGELOG.md) — Version history
- [RELEASENOTES.md](./RELEASENOTES.md) — Release summaries
- [infrastructure/](./infrastructure/) — Docker, Proxmox, reverse-proxy, backups, scripts

---

## Clean before release

```bash
pnpm clean   # or ./infrastructure/scripts/clean.sh
pnpm install
pnpm build
```
