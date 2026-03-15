# Login Flow Documentation

## Overview

Users sign in at the web app (`/login`), which authenticates against the API and redirects to the admin dashboard on success.

## Flow

1. **Landing** — User visits `http://localhost:3000` (web)
2. **Login** — Clicks "Login to manage" → `http://localhost:3000/login`
3. **Auth** — Form submits `POST /auth/login` (email + password) to API with `credentials: "include"`
4. **Session** — API validates credentials, sets session cookie, returns `{ ok: true }`
5. **Redirect** — On success, `window.location.href = ADMIN_URL` (default `http://localhost:3001` — admin dashboard)

## Test User

| Email | Password |
|-------|----------|
| `dev@pinkshots.studio` | `dev123` |

Create/update the test user:

```bash
pnpm db:seed
```

## Prerequisites

1. **Postgres** — `pnpm docker:up` (or `pnpm docker:reset` if "password authentication failed")
2. **Migrations** — `pnpm db:migrate`
3. **Seed** — `pnpm db:seed`
4. **Env** — `.env` with correct `DATABASE_URL` (see `.env.example`)

## Files Involved

| File | Purpose |
|------|---------|
| `apps/web/src/app/page.tsx` | Landing page; "Login to manage" links to `/login` |
| `apps/web/src/app/login/page.tsx` | Login form; POSTs to API, redirects on success |
| `apps/api/src/routes/auth.ts` | `POST /auth/login`, `POST /auth/logout`, `GET /auth/me` |
| `apps/api/src/app.ts` | CORS (credentials), session, cookie config |
| `apps/api/src/db/seed.ts` | Creates `dev@pinkshots.studio` / `dev123` |
| `apps/api/src/db/index.ts` | DB connection; loads `.env` via dotenv |

## Browser Opening

Scripts open **one** browser tab to `http://localhost:3000` (web landing). From there users go to `/login` and, after sign-in, are redirected to the admin app.

- `full.sh` — Opens `http://localhost:3000` only
- `run.sh` — Opens `http://localhost:3000` only
- `start.sh` — Opens `http://localhost:3000` only

## Changes Made (Summary)

1. **Typo fix** — `pinkshots` → `pinkshots` in `.env.example`, `.env`, `drizzle.config.ts`
2. **dotenv** — API and seed load `.env` from project root
3. **db:seed in scripts** — `full.sh`, `run.sh`, `start.sh` run `pnpm db:seed` after migrations
4. **Single browser** — Scripts open only `http://localhost:3000` instead of multiple tabs
5. **Error message** — Login page suggests `pnpm db:seed` when server returns 5xx
