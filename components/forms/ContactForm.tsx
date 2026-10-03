"use client";

import { useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { Call02Icon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";

import { submitLead, type LeadFormState } from "@/app/(marketing)/contact/actions";
import { buttonVariants } from "@/components/ui/button";
import {
  INSTALLATION_TYPE_LABELS,
  SERVICE_CATEGORIES,
  SERVICE_TYPES,
  type InstallationType,
  type ServiceType,
} from "@/lib/services";
import { SITE } from "@/lib/site";
import type { LeadField } from "@/lib/validations/lead";
import { cn } from "@/lib/utils";

const INPUT =
  "min-h-12 w-full rounded-[10px] border border-border bg-background px-3.5 text-base outline-none transition-colors focus-visible:border-vivid-tangerine focus-visible:ring-2 focus-visible:ring-vivid-tangerine/40 aria-invalid:border-destructive";
const LABEL = "text-[15px] font-semibold";
const OPTIONAL = <span className="font-normal text-muted-foreground"> (optional)</span>;

const isService = (v: string | undefined): v is ServiceType =>
  !!v && (SERVICE_TYPES as string[]).includes(v);

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p id={id} className="text-sm text-destructive">
      {errors[0]}
    </p>
  );
}

export default function ContactForm({ initialService }: { initialService?: string }) {
  const [state, formAction, pending] = useActionState<LeadFormState, FormData>(submitLead, {
    status: "idle",
  });
  const [service, setService] = useState<ServiceType | "">(
    isService(initialService) ? initialService : "",
  );

  const v = state.values ?? {};
  const err = (f: LeadField) => state.errors?.[f];
  const invalid = (f: LeadField) => (err(f) ? true : undefined);
  const describedBy = (f: LeadField) => (err(f) ? `${f}-error` : undefined);
  const subtypes = service ? SERVICE_CATEGORIES[service].subtypes : null;

  if (state.status === "sent") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 py-6">
        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={44} className="text-ember" />
        <h2 className="text-3xl">Thanks — we&apos;ve got it.</h2>
        <p className="text-[17px] leading-relaxed text-muted-foreground">
          We&apos;ll reach out to set up your estimate.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5 md:gap-6">
      {state.status === "unavailable" && (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-xl border border-vivid-tangerine bg-ember-soft p-4"
        >
          <p className="font-semibold">Online requests aren&apos;t connected yet.</p>
          <p className="text-[15px] leading-relaxed">
            Your details weren&apos;t sent. Please call us and we&apos;ll take it from there.
          </p>
          <a
            href={SITE.phone.href}
            className={cn(
              buttonVariants(),
              "h-11 gap-2 self-start bg-deep-space-blue px-5 font-semibold text-vanilla-custard-900 hover:bg-deep-space-blue-400",
            )}
          >
            <HugeiconsIcon icon={Call02Icon} size={18} />
            Call {SITE.phone.display}
          </a>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={LABEL}>Name</label>
          <input
            id="name"
            name="name"
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            defaultValue={v.name}
            aria-invalid={invalid("name")}
            aria-describedby={describedBy("name")}
            className={INPUT}
          />
          <FieldError id="name-error" errors={err("name")} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className={LABEL}>Phone{OPTIONAL}</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            maxLength={30}
            autoComplete="tel"
            defaultValue={v.phone}
            className={INPUT}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className={LABEL}>Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          defaultValue={v.email}
          aria-invalid={invalid("email")}
          aria-describedby={describedBy("email")}
          className={INPUT}
        />
        <FieldError id="email-error" errors={err("email")} />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="serviceType" className={LABEL}>Service</label>
          <select
            id="serviceType"
            name="serviceType"
            required
            value={service}
            onChange={(e) => setService(e.target.value as ServiceType | "")}
            aria-invalid={invalid("serviceType")}
            aria-describedby={describedBy("serviceType")}
            className={INPUT}
          >
            <option value="">Choose a service</option>
            {SERVICE_TYPES.map((type) => (
              <option key={type} value={type}>
                {SERVICE_CATEGORIES[type].label}
              </option>
            ))}
          </select>
          <FieldError id="serviceType-error" errors={err("serviceType")} />
        </div>
        {subtypes && (
          <div className="flex flex-col gap-2">
            <label htmlFor="serviceSubtype" className={LABEL}>Venting / build type</label>
            <select
              id="serviceSubtype"
              name="serviceSubtype"
              defaultValue={v.serviceSubtype ?? ""}
              aria-invalid={invalid("serviceSubtype")}
              aria-describedby={describedBy("serviceSubtype")}
              className={INPUT}
            >
              <option value="">Not sure yet</option>
              {Object.entries(subtypes).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
            <FieldError id="serviceSubtype-error" errors={err("serviceSubtype")} />
          </div>
        )}
      </div>

      <fieldset className="flex flex-col gap-2.5">
        <legend className={cn(LABEL, "mb-2.5")}>Project type{OPTIONAL}</legend>
        <div className="flex flex-wrap gap-2">
          {(Object.entries(INSTALLATION_TYPE_LABELS) as [InstallationType, string][]).map(
            ([value, label]) => (
              <label
                key={value}
                className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full border border-border bg-background px-4 text-[15px] font-medium has-checked:border-vivid-tangerine has-checked:bg-ember-soft has-focus-visible:ring-2 has-focus-visible:ring-vivid-tangerine/40"
              >
                <input
                  type="radio"
                  name="installationType"
                  value={value}
                  defaultChecked={v.installationType === value}
                  className="accent-vivid-tangerine"
                />
                {label === "Commercial construction" ? "Commercial" : label}
              </label>
            ),
          )}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={LABEL}>Anything we should know?{OPTIONAL}</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={2000}
          placeholder="Room, existing fireplace, timeline…"
          defaultValue={v.message}
          aria-invalid={invalid("message")}
          aria-describedby={describedBy("message")}
          className={cn(INPUT, "py-3")}
        />
        <FieldError id="message-error" errors={err("message")} />
      </div>

      {/* TODO (Phase 2): upload straight to Cloudinary (signed) — photos are too big for a
          Server Action body (1MB). Unnamed for now so files are never posted. */}
      <div className="flex flex-col gap-2">
        <label htmlFor="photos" className={LABEL}>
          Photos of the space
          <span className="font-normal text-muted-foreground"> (optional, helps us quote faster)</span>
        </label>
        <input
          id="photos"
          type="file"
          accept="image/*"
          multiple
          className="min-h-12 rounded-[10px] border border-dashed border-border bg-section px-3.5 py-2.5 text-[15px] file:mr-3 file:rounded-full file:border-0 file:bg-deep-space-blue file:px-3.5 file:py-1.5 file:text-sm file:font-semibold file:text-vanilla-custard-900"
        />
      </div>

      {/* Honeypot — hidden from people and screen readers; bots fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          We&apos;ll only use your details to respond to this request.
        </p>
        <button
          type="submit"
          disabled={pending}
          className={cn(buttonVariants(), "h-13 px-8 text-[17px] font-semibold")}
        >
          {pending ? "Sending…" : "Send request"}
        </button>
      </div>
    </form>
  );
}

// Reads ?service= after load (links from /services), so the page itself can be prerendered.
export function ContactFormFromUrl() {
  const service = useSearchParams().get("service") ?? undefined;
  return <ContactForm key={service} initialService={service} />;
}
