import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { installationType, SERVICE_SUBTYPES, SERVICE_TYPES } from "@/lib/services";

// Enums derive from the taxonomy in lib/services.ts — no hand-typed duplicate lists.
type NonEmpty = [string, ...string[]];

export const serviceTypeEnum = pgEnum("service_type", SERVICE_TYPES as NonEmpty);
export const serviceSubtypeEnum = pgEnum("service_subtype", SERVICE_SUBTYPES as NonEmpty);
export const installationTypeEnum = pgEnum(
  "installation_type",
  Object.values(installationType) as NonEmpty,
);
export const leadStatusEnum = pgEnum("lead_status", ["new", "contacted", "scheduled", "closed"]);
export const leadSourceEnum = pgEnum("lead_source", ["form", "chatbot"]);

export const leads = pgTable("leads", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  serviceType: serviceTypeEnum("service_type").notNull(),
  serviceSubtype: serviceSubtypeEnum("service_subtype"),
  installationType: installationTypeEnum("installation_type"),
  message: text("message"),
  photoUrls: text("photo_urls").array().notNull().default([]),
  source: leadSourceEnum("source").notNull().default("form"),
  status: leadStatusEnum("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type NewLead = typeof leads.$inferInsert;
