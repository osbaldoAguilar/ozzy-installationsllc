import { escape } from "@/lib/email/escape";
import { INSTALLATION_TYPE_LABELS, SERVICE_CATEGORIES, type ServiceType } from "@/lib/services";
import { SITE } from "@/lib/site";
import type { Lead } from "@/lib/validations/lead";

// "We received your request" email to the customer. The address comes from a public form, so
// we never repeat their message back, only our own copy, their picked service, and a first name
// that looks like a real name. Email clients ignore most CSS, hence tables and inline styles.

const C = {
  navy: "#003049", // deep-space-blue
  ink: "#002539", // foreground text
  footer: "#00131d", // site footer background
  footerText: "#a7e0ff",
  muted: "#4c6e80",
  border: "#d9e0e4",
  cream: "#fbf9f1", // warm section background
  creamBorder: "#f3eed4",
  tangerine: "#f77f00", // buttons
  ember: "#934c00", // small orange text, 6.4:1 on white
  gold: "#fcbf49",
};
const SERIF = "Fraunces,Georgia,'Times New Roman',serif";
const SANS = "Figtree,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

// Email needs a full URL, so the logo loads from the live site.
const LOGO_URL = `${SITE.url}/brand/logo-gold.png`;

const { coreArea, tripFee, diagnosticFee } = SITE.estimates;
const INSTALL_ESTIMATE = `Install estimates are free in ${coreArea}. Farther out there's a trip fee based on distance (from $${tripFee}), and we'll tell you the exact amount before we schedule. It's credited to your job if you hire us.`;

// Per service. A Record, so a new service won't compile until it has copy here.
const NEXT_STEPS: Record<ServiceType, { noun: string; intro: string; steps: string[] }> = {
  fireplace_installation: {
    noun: "fireplace installation",
    intro: "A new fireplace starts with figuring out what your house allows: which venting works, where it can go, and what size fits the room.",
    steps: [
      "We look over your request and photos.",
      "We reach out to set up an on-site estimate, where we measure and check your venting options.",
      "You get a written quote before any work is scheduled.",
    ],
  },
  chimney_cap: {
    noun: "chimney cap",
    intro: "A worn, rusted or missing cap lets rain, debris and animals into the flue. We'll get the right one on.",
    steps: [
      "We look over your request and photos.",
      "We reach out to confirm the size and style, or to set up a visit to measure.",
      "You get a written quote before any work is scheduled.",
    ],
  },
  hearth_mantel: {
    noun: "hearth and mantel",
    intro: "The hearth and mantel are the finish work that make a fireplace the centerpiece of the room.",
    steps: [
      "We look over your request and photos.",
      "We reach out to talk through materials and set up an on-site estimate.",
      "You get a written quote before any work is scheduled.",
    ],
  },
  service_call: {
    noun: "service call",
    intro: "Whether the pilot won't stay lit or something just isn't right, we'll come out, diagnose it, and fix it.",
    steps: [
      "We look over your request.",
      `We reach out to schedule a diagnostic visit ($${diagnosticFee}, credited toward the repair if you hire us).`,
      "We tell you what's wrong and what the repair costs before we do it.",
    ],
  },
  other_services: {
    noun: "project",
    intro: "Wood stoves, gas inserts, electric fireplaces and other hearth products: if it's not a standard job, we'll talk it through with you.",
    steps: [
      "We look over your request and photos.",
      "We reach out to ask any questions and set up an estimate if it's needed.",
      "You get a written quote before any work is scheduled.",
    ],
  },
};

/** "maria" → "Maria"; anything that isn't a plain name (links, symbols, long strings) → null. */
export function safeFirstName(fullName: string): string | null {
  const first = fullName.trim().split(/\s+/)[0] ?? "";
  if (!/^[\p{L}][\p{L}'’-]{0,19}$/u.test(first)) return null;
  return first === first.toLowerCase() ? first[0].toUpperCase() + first.slice(1) : first;
}

export function renderLeadConfirmation(lead: Lead) {
  const category = SERVICE_CATEGORIES[lead.serviceType];
  const subtypes = category.subtypes as Record<string, string> | null;
  const firstName = safeFirstName(lead.name);
  const photoCount = lead.photoUrls?.length ?? 0;
  const isInstall = lead.serviceType !== "service_call";
  const { noun, intro, steps } = NEXT_STEPS[lead.serviceType];
  const { replyWindow } = SITE.leads;

  // Only values chosen from our own lists.
  const summary = [
    ["Service", category.label],
    ["Type", lead.serviceSubtype ? subtypes?.[lead.serviceSubtype] : undefined],
    ["Project", lead.installationType ? INSTALLATION_TYPE_LABELS[lead.installationType] : undefined],
    ["Photos", photoCount ? `${photoCount} received` : undefined],
  ].filter((row): row is [string, string] => !!row[1]);

  const greeting = firstName ? `Hi ${firstName},` : "Hi there,";
  const lead1 = `Thanks for reaching out about your ${noun} request. It came through, and we'll get back to you within ${replyWindow}, often sooner.`;
  const photoNote = photoCount
    ? "Thanks for the photos. They help us quote faster, sometimes without a visit."
    : "Have photos of the space? Reply to this email with a few. They help us quote faster, sometimes without a visit.";
  const subject = firstName
    ? `${firstName}, we received your ${noun} request`
    : `We received your ${noun} request`;

  const p = (text: string, extra = "") =>
    `<p style="margin:0 0 16px;font-family:${SANS};font-size:16px;line-height:1.6;color:${C.ink};${extra}">${text}</p>`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${escape(subject)}</title>
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;600&family=Fraunces:wght@600&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background:${C.cream};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">We'll get back to you within ${replyWindow}, often sooner.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.cream};">
<tr><td align="center" style="padding:24px 12px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid ${C.creamBorder};border-radius:16px;overflow:hidden;">

    <!-- Header: navy band with the gold logo, like the site footer -->
    <tr><td style="background:${C.navy};padding:20px 28px;">
      <a href="${SITE.url}" style="text-decoration:none;">
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
          <td style="vertical-align:middle;padding-right:12px;"><img src="${LOGO_URL}" width="43" height="48" alt="${SITE.name} logo" style="display:block;border:0;"></td>
          <td style="vertical-align:middle;font-family:${SERIF};font-size:22px;font-weight:600;color:${C.cream};">${SITE.name}</td>
        </tr></table>
      </a>
    </td></tr>

    <!-- Body -->
    <tr><td style="padding:32px 28px 8px;">
      <p style="margin:0 0 8px;font-family:${SANS};font-size:13px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:${C.ember};">Request received</p>
      <h1 style="margin:0 0 20px;font-family:${SERIF};font-size:28px;line-height:1.25;font-weight:600;color:${C.ink};">${escape(greeting)} we've got it.</h1>
      ${p(escape(lead1))}
      ${p(escape(intro))}
    </td></tr>

    <!-- What they asked for -->
    <tr><td style="padding:0 28px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.cream};border:1px solid ${C.creamBorder};border-radius:12px;">
        <tr><td style="padding:16px 20px 4px;font-family:${SANS};font-size:14px;font-weight:600;color:${C.ink};">Your request</td></tr>
        ${summary
          .map(
            ([label, value]) =>
              `<tr><td style="padding:4px 20px;font-family:${SANS};font-size:15px;color:${C.ink};"><span style="color:${C.muted};">${label}:</span> ${escape(value)}</td></tr>`,
          )
          .join("")}
        <tr><td style="height:12px;line-height:12px;">&nbsp;</td></tr>
      </table>
    </td></tr>

    <!-- What happens next -->
    <tr><td style="padding:28px 28px 8px;">
      <h2 style="margin:0 0 16px;font-family:${SERIF};font-size:20px;font-weight:600;color:${C.ink};">What happens next</h2>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${steps
          .map(
            (step, i) => `<tr>
          <td width="44" style="vertical-align:top;padding:0 0 14px;">
            <div style="width:32px;height:32px;line-height:32px;border-radius:16px;background:${C.navy};color:${C.gold};text-align:center;font-family:${SERIF};font-size:16px;">${i + 1}</div>
          </td>
          <td style="vertical-align:top;padding:5px 0 14px;font-family:${SANS};font-size:15px;line-height:1.55;color:${C.ink};">${escape(step)}</td>
        </tr>`,
          )
          .join("")}
      </table>
      ${isInstall ? p(escape(INSTALL_ESTIMATE), `font-size:14px;color:${C.muted};`) : ""}
      ${p(escape(photoNote))}
    </td></tr>

    <!-- Call button -->
    <tr><td style="padding:0 28px 32px;">
      ${p("Need us sooner? Give us a call.", "margin-bottom:12px;")}
      <a href="${SITE.phone.href}" style="display:inline-block;background:${C.tangerine};color:${C.ink};font-family:${SANS};font-size:16px;font-weight:600;text-decoration:none;padding:12px 24px;border-radius:999px;">Call ${SITE.phone.display}</a>
    </td></tr>

    <!-- Footer: same as the site's -->
    <tr><td style="background:${C.footer};padding:24px 28px;font-family:${SANS};font-size:14px;line-height:1.6;color:${C.footerText};">
      <p style="margin:0 0 4px;font-family:${SERIF};font-size:16px;font-weight:600;color:${C.cream};">${SITE.name}</p>
      <p style="margin:0 0 12px;">Family-owned fireplace &amp; hearth specialists serving the Triangle, North Carolina.</p>
      <p style="margin:0;">
        <a href="${SITE.phone.href}" style="color:${C.gold};text-decoration:none;">${SITE.phone.display}</a>
        &nbsp;·&nbsp; <a href="${SITE.url}" style="color:${C.gold};text-decoration:none;">${SITE.url.replace("https://", "")}</a>
        &nbsp;·&nbsp; <a href="${SITE.instagram.href}" style="color:${C.gold};text-decoration:none;">Instagram</a>
      </p>
      <p style="margin:12px 0 0;font-size:12px;color:#6da2bf;">You're getting this because you requested an estimate on our website. Reply to this email to reach us.</p>
    </td></tr>

  </table>
</td></tr>
</table>
</body>
</html>`;

  const text = [
    `${greeting} we've got it.`,
    "",
    lead1,
    "",
    intro,
    "",
    "Your request",
    ...summary.map(([label, value]) => `  ${label}: ${value}`),
    "",
    "What happens next",
    ...steps.map((step, i) => `  ${i + 1}. ${step}`),
    ...(isInstall ? ["", INSTALL_ESTIMATE] : []),
    "",
    photoNote,
    "",
    `Need us sooner? Call ${SITE.phone.display}.`,
    "",
    "--",
    `${SITE.name} · ${SITE.phone.display} · ${SITE.url}`,
  ].join("\n");

  return { subject, html, text };
}
