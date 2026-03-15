import path from "path";
import { config } from "dotenv";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { db } from "./index.js";
import { adminUsers } from "./schema.js";

// Load .env from monorepo root (pnpm -C apps/api) or apps/api
config({ path: path.resolve(process.cwd(), "../../.env") });
config({ path: path.resolve(process.cwd(), ".env") });

const TEST_EMAIL = "dev@pinkshots.studio";
const TEST_PASSWORD = "dev123";

async function seed() {
  const passwordHash = await bcrypt.hash(TEST_PASSWORD, 10);
  const existing = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.email, TEST_EMAIL))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(adminUsers)
      .set({ passwordHash })
      .where(eq(adminUsers.email, TEST_EMAIL));
    console.log(`Updated test user: ${TEST_EMAIL}`);
  } else {
    await db.insert(adminUsers).values({
      email: TEST_EMAIL,
      passwordHash,
    });
    console.log(`Created test user: ${TEST_EMAIL}`);
  }
  console.log(`  Email:    ${TEST_EMAIL}`);
  console.log(`  Password: ${TEST_PASSWORD}`);
  console.log("\nUse these credentials to log in at /login");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
