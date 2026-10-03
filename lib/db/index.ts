import "server-only";

import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/lib/db/schema";

// Locally: DATABASE_URL in .env.local. On Vercel: the Neon integration's OZZY_DB_DATABASE_URL.
const url = process.env.DATABASE_URL ?? process.env.OZZY_DB_DATABASE_URL;

export const db = url ? drizzle(url, { schema }) : null;
