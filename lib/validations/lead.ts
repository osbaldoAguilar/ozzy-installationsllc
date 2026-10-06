import { z } from "zod";

import {
  installationType,
  SERVICE_CATEGORIES,
  SERVICE_SUBTYPES,
  SERVICE_TYPES,
  type ServiceSubtype,
  type ServiceType,
} from "@/lib/services";
import { LEAD_PHOTO_MAX, LEAD_PHOTO_URL } from "@/lib/cloudinary";

const INSTALLATION_TYPES = Object.values(installationType);

// Empty form fields arrive as "" — treat them as not provided.
const optional = <T extends z.ZodType>(schema: T) =>
  z.preprocess((v) => (v === "" || v === null ? undefined : v), schema.optional());

// Runs on the server only (the action is the source of truth). The form inputs use matching
// HTML attributes (required, type="email", minLength) for quick feedback in the browser.
export const leadSchema = z
  .object({
    name: z.string().trim().min(2, "Please enter your name.").max(100),
    email: z.email("Please enter a valid email."),
    phone: optional(z.string().trim().max(30)),
    serviceType: z.enum(SERVICE_TYPES as [ServiceType, ...ServiceType[]], {
      error: "Please choose a service.",
    }),
    serviceSubtype: optional(z.enum(SERVICE_SUBTYPES as [ServiceSubtype, ...ServiceSubtype[]])),
    installationType: optional(z.enum(INSTALLATION_TYPES)),
    message: optional(z.string().trim().max(2000, "Please keep it under 2,000 characters.")),
    // Links to photos the browser already uploaded to our Cloudinary leads/ folder.
    photoUrls: z
      .array(z.string().regex(LEAD_PHOTO_URL, "One of the photos didn't upload correctly."))
      .max(LEAD_PHOTO_MAX, `Please attach up to ${LEAD_PHOTO_MAX} photos.`)
      .default([]),
  })
  .refine(
    (lead) => {
      if (!lead.serviceSubtype) return true;
      const subtypes = SERVICE_CATEGORIES[lead.serviceType].subtypes;
      return !!subtypes && lead.serviceSubtype in subtypes;
    },
    { path: ["serviceSubtype"], message: "That type doesn't match the service." },
  );

export type Lead = z.infer<typeof leadSchema>;
export type LeadField = keyof Lead;
