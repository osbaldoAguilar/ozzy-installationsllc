"use server";

import { z } from "zod";

import { leadSchema, type LeadField } from "@/lib/validations/lead";

export type LeadFormState = {
  status: "idle" | "invalid" | "unavailable" | "sent";
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

  // TODO (Phase 2, docs/architecture-v1.md §6): insert into Neon via Drizzle
  // (source "form", status "new"), email the owner with Resend, then return "sent".
  // Until then, never tell the visitor we got it — point them to the phone instead.
  // The log is a stopgap so a lead still shows up in the Vercel function logs.
  console.warn("[lead] backend not connected yet; lead not saved:", parsed.data);
  return { status: "unavailable", values };
}
