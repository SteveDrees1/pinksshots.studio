# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.2.0] - 2025-03-08

### Added

- **Portfolio theme** — Futuristic, edgy UI: Orbitron + JetBrains Mono, dark background, neon green accent (`#00ff9d`), grid overlay.
- **Web landing page** — `apps/web`: hero, gradient title, "Login to manage" CTA, CSS variables for theme.
- **Auth API** — `POST /auth/login`, `POST /auth/logout`, `GET /auth/me`; session-based auth with `@fastify/cookie` and `@fastify/session`.
- **API DB layer** — `apps/api/src/db/index.ts` with Drizzle + PostgreSQL client.
- **Graceful shutdown** — `full.sh` cleanup trap and `pkill` for Ctrl+C; avoids tsx "Force killing" and exit 129/130.

### Changed

- **CORS** — Credentials + origin allowlist (`WEB_ORIGIN`, `ADMIN_ORIGIN`, `API_URL`).
- **Admin** — Login page placeholder; dashboard CRUD coming soon.

---

## [0.1.0] - 2025-03-07

### Added

- **One-command run script** (`./infrastructure/scripts/run.sh`): Cleans, optimizes, updates docs, starts services, opens login page, runs health tests.
- **Root package.json**: Centralized `pnpm dev`, `build`, `lint`, `clean`, `start`, `run`, `docker:up`/`down`, `db:migrate`, `test`.
- **Unit tests**: Vitest for API (health route), web (HomePage), admin (AdminLoginPage). `pnpm test` runs all.
- **Health check tests** (`infrastructure/scripts/test-health.js`): Verifies API, web, admin endpoints when servers run.
- **API bootstrap**: Fastify server with CORS, health route at `/health`.
- **Minimal DB schema** (`apps/api/src/db/schema.ts`): `admin_users` table for migrations.
- **Mono-repo structure**: `apps/web` (Next.js public site), `apps/admin` (Next.js admin), `apps/api` (Fastify API).
- **pnpm workspace** (`pnpm-workspace.yaml`) scoped to `apps/*` for web, admin, and api.
- **Docker Compose** (`infrastructure/docker/docker-compose.yml`) for local PostgreSQL 16.
- **Environment config**: `.env.example` with `DATABASE_URL`, `SESSION_SECRET`, `ADMIN_ORIGIN`, `WEB_ORIGIN`, `API_URL`.
- **Infrastructure placeholders**: Proxmox, Docker, reverse-proxy, scripts, backups under `infrastructure/`.
- **`scripts/clean.sh`**: Removes `node_modules`, `.next`, `dist`, `out`, `.turbo`, and `*.tsbuildinfo` before a fresh build.
- **`scripts/start.sh`**: Ensures `.env` exists, installs deps, starts Postgres (Docker), runs migrations, then `pnpm dev`.

### Changed

- **Simplified workspace**: Removed `@pinkshots/config`, `@pinkshots/ui`, `@pinkshots/types`, `@pinkshots/validation` from app dependencies to avoid pnpm workspace resolution issues. Apps run standalone.
- **Docker commands**: Switched from `docker compose` to `docker-compose` for compatibility with older Docker setups.

### Removed

- `packages/config` package (was causing workspace resolution errors).
- Internal workspace package dependencies from web, admin, and api.
