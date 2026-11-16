import "server-only";

import { resolveMx } from "node:dns/promises";

import { and, count, eq, gte, sql } from "drizzle-orm";

import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";

/*
 * Decides whether a new lead's customer gets the "we received your request" auto-reply.
 *
 * The auto-reply goes to an address typed into a public form, so it could be used to send mail
 * to people who never asked for it. Bots are mostly stopped earlier (BotID + honeypot in the
 * action); these limits cap the damage if one gets through. Skipping the auto-reply never loses
 * a lead: it's already saved and the owners were already emailed.
 *
 * Every check fails closed: if we can't tell, we don't send.
 */

// Real traffic is a few leads a week, so these only trip during abuse.
const PER_ADDRESS_PER_DAY = 1;
const SITE_WIDE_PER_HOUR = 10;
const MX_TIMEOUT_MS = 3000;

export type ConfirmationCheck =
  | { send: true }
  | { send: false; reason: "no-database" | "address-limit" | "hourly-limit" | "no-mail-server" };

/** Call after the lead row is inserted (counts include it). */
export async function checkConfirmation(email: string): Promise<ConfirmationCheck> {
  if (!db) return { send: false, reason: "no-database" };

  const now = Date.now();
  const dayAgo = new Date(now - 24 * 60 * 60 * 1000);
  const hourAgo = new Date(now - 60 * 60 * 1000);

  const [[sameAddress], [lastHour]] = await Promise.all([
    db
      .select({ n: count() })
      .from(leads)
      .where(and(eq(sql`lower(${leads.email})`, email.toLowerCase()), gte(leads.createdAt, dayAgo))),
    db.select({ n: count() }).from(leads).where(gte(leads.createdAt, hourAgo)),
  ]);

  if (sameAddress.n > PER_ADDRESS_PER_DAY) return { send: false, reason: "address-limit" };
  if (lastHour.n > SITE_WIDE_PER_HOUR) return { send: false, reason: "hourly-limit" };
  if (!(await acceptsMail(email))) return { send: false, reason: "no-mail-server" };
  return { send: true };
}

/** True if the address's domain has a mail server. Typos like "gmial.com" fail here instead of bouncing. */
async function acceptsMail(email: string): Promise<boolean> {
  const domain = email.split("@").pop();
  if (!domain) return false;
  try {
    const records = await Promise.race([
      resolveMx(domain),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error("timeout")), MX_TIMEOUT_MS)),
    ]);
    return records.some((r) => r.exchange !== "" && r.exchange !== ".");
  } catch {
    return false;
  }
}
