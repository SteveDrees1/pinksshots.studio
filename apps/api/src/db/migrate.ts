/**
 * Run migrations directly (bypasses drizzle-kit to avoid esbuild "service was stopped" error).
 */
import path from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";
import postgres from "postgres";
import { readFileSync, readdirSync } from "fs";

config({ path: path.resolve(process.cwd(), "../../.env") });
config({ path: path.resolve(process.cwd(), ".env") });

const connectionString =
  process.env.DATABASE_URL ?? "postgresql://pinkshots:pinkshots@localhost:5432/pinkshots";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function migrate() {
  const sql = postgres(connectionString);
  const migrationsDir = path.resolve(__dirname, "migrations");
  const files = readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const filePath = path.join(migrationsDir, file);
    const content = readFileSync(filePath, "utf-8");
    console.log(`Running ${file}...`);
    await sql.unsafe(content);
  }

  await sql.end();
  console.log("Migrations complete.");
  process.exit(0);
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
