import { defineConfig } from "drizzle-kit";

// drizzle-kit doesn't read .env.local on its own.
try {
  process.loadEnvFile(".env.local");
} catch {}

// Migrations go straight to Postgres, so prefer the unpooled connection.
const url =
  process.env.DATABASE_URL_UNPOOLED ??
  process.env.OZZY_DB_DATABASE_URL_UNPOOLED ??
  process.env.DATABASE_URL ??
  process.env.OZZY_DB_DATABASE_URL;

if (!url) throw new Error("Set DATABASE_URL (or DATABASE_URL_UNPOOLED) in .env.local");

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url },
});
