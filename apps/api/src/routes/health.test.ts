import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { buildApp } from "../app";

describe("Health routes", () => {
  let app: Awaited<ReturnType<typeof buildApp>>;

  beforeAll(async () => {
    app = await buildApp({ logger: false });
  });

  afterAll(async () => {
    await app.close();
  });

  it("GET /health returns 200 and status ok", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/health",
    });
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body).toMatchObject({ status: "ok" });
    expect(body).toHaveProperty("timestamp");
    expect(typeof body.timestamp).toBe("string");
  });

  it("GET /health returns valid ISO timestamp", async () => {
    const res = await app.inject({ method: "GET", url: "/health" });
    const body = res.json();
    const date = new Date(body.timestamp);
    expect(date.toISOString()).toBe(body.timestamp);
  });
});
