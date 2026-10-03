import Link from "next/link";

import CloudinaryImage from "@/components/CloudinaryImage";
import { buttonVariants } from "@/components/ui/button";
import { PHOTOS } from "@/lib/cloudinary";
import {
  SERVICE_CATEGORIES,
  SERVICE_TYPES,
  type ServiceSubtype,
  type ServiceType,
} from "@/lib/services";
import { cn } from "@/lib/utils";

// TODO: move to Sanity `service` documents once the Studio is wired up.
const DETAILS: Record<
  ServiceType,
  { body: string; photo: string; alt: string; cta: string }
> = {
  fireplace_installation: {
    body: "Gas, wood and electric fireplaces sized, vented and finished for your space. We work out which venting the house allows, then install to code.",
    photo: PHOTOS.slateLinear,
    alt: "Linear gas fireplace in a slate tile surround under a wood mantel",
    cta: "Get an installation estimate",
  },
  chimney_cap: {
    body: "Worn, rusted or missing caps replaced to keep rain, debris and animals out of the flue.",
    photo: PHOTOS.rooftopShroud,
    alt: "Stone chimney with a black decorative shroud on a commercial rooftop",
    cta: "Request this service",
  },
  hearth_mantel: {
    body: "Hearths and mantels built and set to suit the room — the finish work that makes a fireplace the centerpiece.",
    photo: PHOTOS.whiteMantelNewBuild,
    alt: "White mantel and black hearth installed in a new-construction home",
    cta: "Request this service",
  },
  service_call: {
    body: "Pilot won't stay lit, ignition trouble, or something just isn't right — we come out, diagnose and repair.",
    photo: PHOTOS.insertInstall,
    alt: "Gas fireplace insert being fitted with the surrounding wall opened up",
    cta: "Book a service call",
  },
  other_services: {
    body: "Wood stoves, gas inserts, electric fireplaces and other hearth products. Not sure it fits a category? Ask.",
    photo: PHOTOS.linearElectric,
    alt: "Wall-mounted linear electric fireplace installed during construction",
    cta: "Ask about a project",
  },
};

const SUBTYPE_NOTES: Record<ServiceSubtype, string> = {
  direct_vent: "Sealed unit that pulls outside air and vents straight out a wall.",
  thru_roof: "Vent pipe runs up through the roof — no masonry chimney needed.",
  thru_chase: "Venting runs inside a framed chase on the outside of the house.",
  vent_free: "No flue at all, where code and the room allow it.",
  brick_mortar: "A masonry firebox built and lined with firebrick.",
};

export default function ServiceList() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col px-5 pt-4 pb-14 md:px-6 md:pt-8 md:pb-28">
      {SERVICE_TYPES.map((type, i) => {
        const service = SERVICE_CATEGORIES[type];
        const detail = DETAILS[type];
        const primary = i === 0;

        return (
          <article
            key={type}
            id={type}
            className="flex scroll-mt-24 flex-wrap gap-6 border-b border-border py-10 last:border-0 md:gap-10 md:py-16"
          >
            <div className="relative aspect-[4/3] w-full flex-[1_1_360px] overflow-hidden rounded-2xl bg-deep-space-blue md:max-w-[520px]">
              <CloudinaryImage
                src={detail.photo}
                alt={detail.alt}
                fill
                sizes="(min-width: 768px) 520px, 100vw"
                className="object-cover"
              />
            </div>

            <div className="flex min-w-0 flex-[999_1_420px] flex-col justify-center gap-4">
              <p className="text-sm font-semibold text-vivid-tangerine-400">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="text-3xl leading-[1.1] md:text-[2.5rem]">{service.label}</h2>
              <p className="max-w-2xl leading-relaxed text-muted-foreground md:text-lg">
                {detail.body}
              </p>

              {service.subtypes && (
                <ul className="mt-2 grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-2.5">
                  {(Object.entries(service.subtypes) as [ServiceSubtype, string][]).map(
                    ([key, label]) => (
                      <li
                        key={key}
                        className="flex flex-col gap-1 rounded-xl border border-vanilla-custard-700 bg-vanilla-custard-900 px-4 py-3.5"
                      >
                        <span className="font-semibold">{label}</span>
                        <span className="text-sm text-muted-foreground">{SUBTYPE_NOTES[key]}</span>
                      </li>
                    ),
                  )}
                </ul>
              )}

              <Link
                href="/contact"
                className={cn(
                  primary
                    ? cn(buttonVariants(), "mt-2 h-12 px-6 text-base font-semibold")
                    : "inline-flex min-h-11 items-center border-b-2 border-vivid-tangerine font-semibold",
                  "self-start",
                )}
              >
                {detail.cta}
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
