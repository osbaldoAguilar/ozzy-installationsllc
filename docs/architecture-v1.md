# Ozzy Installations — v1 Architecture

Build reference for **v1** (Phases 0–2): the marketing site + lead capture. The admin
portal, `Job`/`User` models, chatbot, and scheduling are **v2** and intentionally out of
scope here — we don't design what we're not about to build.

**Stack (locked):** Next.js 16 (App Router) · TypeScript · Tailwind v4 + shadcn/ui (Maia) ·
**Drizzle + Neon Postgres** · Sanity CMS · Resend · Auth.js *(v2)* · Vercel.

> Next 16 note (per `AGENTS.md`): the exact API shape of anything below —
> Server Actions, `next/font`, metadata, Drizzle/Sanity clients — gets verified against
> `node_modules/next/dist/docs/` at the moment we implement it, not assumed from memory.

---

## 1. Folder structure

```
ozzy-installationsllc/
├─ app/
│  ├─ layout.tsx                 # root: <html>, fonts (Figtree/Fraunces), globals — EXISTS
│  ├─ globals.css                # tokens (ember), theme — EXISTS
│  ├─ (marketing)/               # route group: public site, shared header/footer
│  │  ├─ layout.tsx              # <SiteHeader/> {children} <SiteFooter/> (+ chatbot slot in v2)
│  │  ├─ page.tsx                # Home
│  │  ├─ services/
│  │  │  ├─ page.tsx             # all services (from Sanity)
│  │  │  └─ [slug]/page.tsx      # service detail — OPTIONAL for v1
│  │  ├─ portfolio/page.tsx      # gallery (from Sanity)
│  │  ├─ about/page.tsx          # story (from Sanity)
│  │  └─ contact/page.tsx        # contact form → Server Action
│  └─ studio/[[...tool]]/page.tsx # embedded Sanity Studio at /studio
│
├─ components/
│  ├─ ui/                        # shadcn (owned) — button.tsx here already
│  ├─ marketing/                 # Hero, ServicesGrid, TrustBand, PortfolioTeaser, CTA, SiteHeader, SiteFooter
│  └─ forms/                     # ContactForm, ServiceSelect (category + dependent subtype)
│
├─ lib/
│  ├─ utils.ts                   # cn() — EXISTS
│  ├─ services.ts                # ⭐ SINGLE SOURCE OF TRUTH for the service taxonomy
│  ├─ validations/lead.ts        # Zod schema (derives from services.ts)
│  ├─ db/
│  │  ├─ index.ts                # Drizzle client bound to Neon
│  │  └─ schema.ts               # leads table + pgEnums (derive from services.ts)
│  └─ email/resend.ts            # Resend client + "new lead" template
│
├─ sanity/
│  ├─ schemas/                   # service.ts, portfolioItem.ts, siteCopy.ts
│  ├─ client.ts                  # read client for the site
│  └─ queries.ts                 # GROQ queries
│
├─ drizzle/                      # generated SQL migrations
├─ drizzle.config.ts
├─ sanity.config.ts
└─ .env.local / .env.example
```

**Why route groups:** `(marketing)` shares one header/footer layout across all public pages
without putting `marketing` in the URL. Studio lives outside that group because it has its
own full-screen UI. In v2, `(admin)` becomes a second group with its own auth-gated layout.

---

## 2. The service taxonomy — one source of truth

`lib/services.ts`. Everything else (form dropdowns, Zod, Drizzle enums, later the chatbot and
admin filters) **derives** from this object so they physically cannot drift apart.

```ts
// lib/services.ts
export const SERVICE_CATEGORIES = {
  fireplace_installation: {
    label: "Fireplace Installation",
    subtypes: {
      direct_vent:  "Direct Vent",
      thru_roof:    "Thru-Roof",
      thru_chase:   "Thru-Chase",
      vent_free:    "Vent-Free",
      brick_mortar: "Firebrick & Mortar",
    },
  },
  chimney_cap:    { label: "Chimney Cap",    subtypes: null },
  hearth_mantel:  { label: "Hearth & Mantel", subtypes: null },
  service_call:   { label: "Service Call",   subtypes: null },
  other_services: { label: "Other Services", subtypes: null },
} as const;

export type ServiceType = keyof typeof SERVICE_CATEGORIES;

// every subtype key across all categories, as a flat union + array (for the DB enum)
export type ServiceSubtype = {
  [K in ServiceType]: (typeof SERVICE_CATEGORIES)[K]["subtypes"] extends null
    ? never
    : keyof NonNullable<(typeof SERVICE_CATEGORIES)[K]["subtypes"]>;
}[ServiceType];

export const SERVICE_TYPES = Object.keys(SERVICE_CATEGORIES) as ServiceType[];
export const SERVICE_SUBTYPES = Object.values(SERVICE_CATEGORIES)
  .flatMap((c) => (c.subtypes ? Object.keys(c.subtypes) : [])) as ServiceSubtype[];
```

This matches the plan exactly: `brick_mortar` is a **subtype** of installation (not its own
category), and hearth products fold into `other_services`.

---

## 3. Data model — `leads` only (v1)

`lib/db/schema.ts`. `Job`/`Appointment` and `User` are v2.

```ts
import { pgTable, pgEnum, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { SERVICE_TYPES, SERVICE_SUBTYPES } from "@/lib/services";

// enums derive from the taxonomy — no hand-typed duplicate list
export const serviceTypeEnum    = pgEnum("service_type", SERVICE_TYPES as [string, ...string[]]);
export const serviceSubtypeEnum = pgEnum("service_subtype", SERVICE_SUBTYPES as [string, ...string[]]);
export const leadStatusEnum     = pgEnum("lead_status", ["new", "contacted", "scheduled", "closed"]);
export const leadSourceEnum     = pgEnum("lead_source", ["form", "chatbot"]);

export const leads = pgTable("leads", {
  id:             uuid("id").defaultRandom().primaryKey(),
  name:           text("name").notNull(),
  email:          text("email").notNull(),
  phone:          text("phone"),
  serviceType:    serviceTypeEnum("service_type").notNull(),
  serviceSubtype: serviceSubtypeEnum("service_subtype"),          // nullable
  message:        text("message"),
  source:         leadSourceEnum("source").notNull().default("form"),
  status:         leadStatusEnum("status").notNull().default("new"),
  createdAt:      timestamp("created_at").defaultNow().notNull(),
});
```

`lib/db/index.ts` binds Drizzle to Neon over `DATABASE_URL`. Migrations generated with
`drizzle-kit` into `drizzle/`.

---

## 4. Sanity content schemas

Editable by the owner in the embedded Studio (`/studio`). Everything *not* here stays in code.

- **`service`** — `title`, `slug`, `category` (options mirror `SERVICE_TYPES`), `summary`,
  `body` (portable text), `image`, `order`.
- **`portfolioItem`** — `title`, `images[]`, `category`, `description`, `completedDate`.
- **`siteCopy`** (singletons) — Home hero copy, About story, **two distinct dates**
  (fireplace experience since **2008**, company founded **2020**), trust-band stats, service area.

Images ride Sanity's asset CDN, rendered through `next/image`.

---

## 5. Route / component map

| Route | Data source | Key components |
|---|---|---|
| `/` | Sanity (`siteCopy`, `service`, `portfolioItem`) | Hero, ServicesGrid, TrustBand, PortfolioTeaser, CTA |
| `/services` | Sanity (`service`) | ServicesGrid / ServiceCard |
| `/services/[slug]` *(optional v1)* | Sanity (`service`) | ServiceDetail |
| `/portfolio` | Sanity (`portfolioItem`) | Gallery (next/image, lazy) |
| `/about` | Sanity (`siteCopy`) | Story, TrustBand |
| `/contact` | — (writes to Neon) | **ContactForm** + ServiceSelect |
| `/studio` | Sanity | embedded Studio |

---

## 6. Lead-capture data flow (Phase 2)

```
ContactForm (client: React Hook Form + Zod, dependent subtype dropdown, honeypot)
   │  submit
   ▼
Server Action  ── re-validate with the SAME Zod schema (never trust the client)
   ├─► Drizzle insert → Neon (leads, source="form", status="new")
   └─► Resend → email the owner ("New lead: {name} / {serviceType}")
   ▼
return { ok } → success/error UI
```

Spam: honeypot field first (free), lightweight captcha only if it proves necessary.

---

## 7. Environment variables (v1)

Add to both `.env.local` (real values) and `.env.example` (empty template) as each lands:

```
DATABASE_URL=                    # Neon Postgres connection string
RESEND_API_KEY=                  # Resend
CONTACT_NOTIFICATION_EMAIL=      # owner's inbox for new-lead alerts
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_READ_TOKEN=           # only if reading drafts/private content
```

---

## 8. Build order (maps to the plan's phases)

1. **Phase 1** — `(marketing)` layout + static pages with placeholder content → wire Sanity
   (`sanity.config.ts`, schemas, `/studio`, GROQ) → swap placeholders for real content.
2. **Phase 2** — `lib/services.ts` → Drizzle `schema.ts` + Neon + first migration →
   `lib/validations/lead.ts` → `ContactForm` + `ServiceSelect` → Server Action → Resend.
3. **Phase 6 (v1 cutover)** — SEO/metadata, Lighthouse, a11y, analytics, then point the root
   domain at Vercel.

---

*Open/soft decisions to confirm: `src/` vs root (chose root), embedded vs standalone Studio
(chose embedded), and whether `/services/[slug]` detail pages ship in v1 or wait.*
