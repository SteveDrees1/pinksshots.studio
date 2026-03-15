# Docker

## Local development

PostgreSQL 16 runs via Docker Compose for local dev:

```bash
pnpm docker:up   # Start Postgres
pnpm docker:down # Stop
```

Config: `docker-compose.yml` — database `pinkshots`, user `pinkshots`, port 5432.

## Production (planned)

- Dockerfiles for `apps/api`, `apps/web`, `apps/admin`
- `docker-compose.yml` for production stack
