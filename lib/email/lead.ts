import "server-only";

import { INSTALLATION_TYPE_LABELS, SERVICE_CATEGORIES } from "@/lib/services";
import type { Lead } from "@/lib/validations/lead";

// Verified sending domain in Resend (DNS lives at Squarespace).
const FROM = "Ozzy Installations Website <leads@contact.ozzyinstallationsllc.com>";

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function describe(lead: Lead) {
  const service = SERVICE_CATEGORIES[lead.serviceType];
  const subtypes = service.subtypes as Record<string, string> | null;
  return {
    service: service.label,
    rows: [
      ["Name", lead.name],
      ["Phone", lead.phone],
      ["Email", lead.email],
      ["Service", service.label],
      ["Venting / build type", lead.serviceSubtype ? subtypes?.[lead.serviceSubtype] : undefined],
      ["Project type", lead.installationType ? INSTALLATION_TYPE_LABELS[lead.installationType] : undefined],
      ["Message", lead.message],
    ].filter((row): row is [string, string] => !!row[1]),
  };
}

/** Emails the owner about a new lead. Returns false (never throws) so the lead flow can fall back. */
export async function sendLeadEmail(lead: Lead, leadId: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  // Everyone who gets lead emails. Either var may also hold a comma-separated list.
  const to = [process.env.CONTACT_NOTIFICATION_EMAIL, process.env.CONTACT_NOTIFICATION_EMAIL_TWO]
    .flatMap((v) => (v ?? "").split(","))
    .map((v) => v.trim())
    .filter(Boolean);
  if (!apiKey || to.length === 0) return false;

  const { service, rows } = describe(lead);
  const photos = lead.photoUrls ?? [];
  const thumb = (url: string) => url.replace("/image/upload/", "/image/upload/c_fill,w_160,h_160,q_auto,f_jpg/");
  const phoneHref = lead.phone ? `tel:${lead.phone.replace(/[^\d+]/g, "")}` : null;

  const html = `
<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#002539;max-width:560px">
  <h2 style="margin:0 0 4px">New lead: ${escape(lead.name)}</h2>
  <p style="margin:0 0 20px;color:#4c6e80">${escape(service)} · from the website form</p>
  <table cellpadding="8" style="border-collapse:collapse;width:100%;font-size:15px">
    ${rows
      .map(
        ([label, value]) =>
          `<tr><td style="border-bottom:1px solid #d9e0e4;color:#4c6e80;white-space:nowrap;vertical-align:top">${label}</td><td style="border-bottom:1px solid #d9e0e4;white-space:pre-line">${escape(value)}</td></tr>`,
      )
      .join("")}
  </table>
  ${
    photos.length
      ? `<p style="margin:20px 0 8px;color:#4c6e80">Photos (${photos.length}), tap to open full size</p>
  <div>${photos
    .map(
      (url) =>
        `<a href="${escape(url)}" style="display:inline-block;margin:0 8px 8px 0"><img src="${escape(thumb(url))}" width="80" height="80" alt="Customer photo" style="border-radius:8px;display:block"></a>`,
    )
    .join("")}</div>`
      : ""
  }
  <p style="margin:24px 0 0">
    ${phoneHref ? `<a href="${phoneHref}" style="background:#f77f00;color:#002539;padding:10px 18px;border-radius:999px;text-decoration:none;font-weight:600">Call ${escape(lead.phone!)}</a>&nbsp;&nbsp;` : ""}
    <a href="mailto:${escape(lead.email)}" style="color:#002539;font-weight:600">Reply by email</a>
  </p>
</div>`;

  const text = [
    `New lead: ${lead.name} (${service})`,
    "",
    ...rows.map(([l, v]) => `${l}: ${v}`),
    ...(photos.length ? ["", "Photos:", ...photos] : []),
  ].join("\n");

  // Plain REST call (https://resend.com/docs/api-reference/emails/send-email) — no SDK needed.
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `lead-${leadId}`, // a retried submit never double-emails
      },
      body: JSON.stringify({
        from: FROM,
        to, // already a list of addresses
        reply_to: lead.email, // hitting Reply answers the customer directly
        subject: `New lead: ${lead.name} · ${service}`,
        html,
        text,
      }),
    });
    if (!res.ok) {
      console.error("[lead] email failed:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("[lead] email failed:", error);
    return false;
  }
}
