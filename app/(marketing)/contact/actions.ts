"use server";

import { z } from "zod";

import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { leadSchema, type LeadField } from "@/lib/validations/lead";

export type LeadFormState = {
  // saved = in the database but nobody notified yet (email not connected) → also ask them to call.
  status: "idle" | "invalid" | "unavailable" | "saved" | "sent";
  errors?: Partial<Record<LeadField, string[]>>;
  values?: Record<string, string>;
};

const FIELDS = [
  "name",
  "email",
  "phone",
  "serviceType",
  "serviceSubtype",
  "installationType",
  "message",
] as const;

export async function submitLead(
  _prev: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  // Honeypot: real people never see or fill this field. Pretend it worked.
  if (formData.get("company")) return { status: "sent" };

  const values = Object.fromEntries(
    FIELDS.map((f) => [f, String(formData.get(f) ?? "")]),
  );
  const parsed = leadSchema.safeParse(values);

  if (!parsed.success) {
    return {
      status: "invalid",
      errors: z.flattenError(parsed.error).fieldErrors,
      values,
    };
  }

  if (!db) {
    console.error("[lead] no database configured; lead not saved:", parsed.data);
    return { status: "unavailable", values };
  }

  try {
    await db.insert(leads).values({ ...parsed.data, source: "form" });
  } catch (error) {
    console.error("[lead] insert failed; lead not saved:", parsed.data, error);
    return { status: "unavailable", values };
  }

  // TODO: email the owner with Resend (CONTACT_NOTIFICATION_EMAIL), then return "sent".
  return { status: "saved" };
}
