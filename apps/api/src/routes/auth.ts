import type { FastifyInstance } from "fastify";
import { z } from "zod";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { adminUsers } from "../db/schema.js";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function authRoutes(app: FastifyInstance) {
  app.post("/auth/login", async (request, reply) => {
    const parsed = loginSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: "Invalid email or password" });
    }
    const { email, password } = parsed.data;

    const [user] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.email, email))
      .limit(1);

    if (!user) {
      return reply.status(401).send({ error: "Invalid email or password" });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return reply.status(401).send({ error: "Invalid email or password" });
    }

    (request.session as { userId?: number }).userId = user.id;
    await request.session.save();
    return reply.send({ ok: true });
  });

  app.post("/auth/logout", async (request, reply) => {
    await request.session.destroy();
    return reply.send({ ok: true });
  });

  app.get("/auth/me", async (request, reply) => {
    const userId = (request.session as { userId?: number }).userId;
    if (!userId) {
      return reply.status(401).send({ error: "Not authenticated" });
    }
    const [user] = await db
      .select({ id: adminUsers.id, email: adminUsers.email })
      .from(adminUsers)
      .where(eq(adminUsers.id, userId))
      .limit(1);
    if (!user) {
      await request.session.destroy();
      return reply.status(401).send({ error: "Not authenticated" });
    }
    return reply.send({ id: user.id, email: user.email });
  });
}
