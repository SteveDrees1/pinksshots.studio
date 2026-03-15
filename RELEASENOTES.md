# Release notes

See [CHANGELOG.md](./CHANGELOG.md) for the full history.

## v0.2.0 (2025-03-08)

**Portfolio theme & auth**

- Futuristic UI: Orbitron + JetBrains Mono, dark theme, neon green accent
- Web landing page with "Login to manage" CTA
- Auth API: `POST /auth/login`, `POST /auth/logout`, `GET /auth/me`
- Session-based auth with `@fastify/cookie` and `@fastify/session`
- Graceful Ctrl+C shutdown in `full.sh`

## v0.1.0 (2025-03-07)

- Mono-repo: web, admin, API
- Docker Compose for PostgreSQL
- Health checks, unit tests, scripts
