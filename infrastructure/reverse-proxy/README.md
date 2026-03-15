# Reverse proxy

## Planned setup

| Host | Backend | Port |
|------|---------|------|
| `pinkshots.studio` or `www` | Web (Next.js) | 3000 |
| `admin.pinkshots.studio` | Admin (Next.js) | 3001 |
| `api.pinkshots.studio` | API (Fastify) | 4000 |

**TLS**: Let's Encrypt via Caddy or Traefik.

**CORS**: Set `WEB_ORIGIN`, `ADMIN_ORIGIN` in `.env` to match public URLs.
