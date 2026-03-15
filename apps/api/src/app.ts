import Fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import session from "@fastify/session";
import { healthRoutes } from "./routes/health.js";
import { authRoutes } from "./routes/auth.js";

const WEB_ORIGIN = process.env.WEB_ORIGIN ?? "http://localhost:3000";
const ADMIN_ORIGIN = process.env.ADMIN_ORIGIN ?? "http://localhost:3001";

export async function buildApp(opts?: { logger?: boolean }) {
  const app = Fastify({ logger: opts?.logger ?? true });
  await app.register(cors, {
    origin: [WEB_ORIGIN, ADMIN_ORIGIN],
    credentials: true,
  });
  await app.register(cookie);
  await app.register(session, {
    secret: process.env.SESSION_SECRET ?? "dev-secret-min-32-chars-required!!",
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  });
  await app.register(healthRoutes);
  await app.register(authRoutes);
  return app;
}
