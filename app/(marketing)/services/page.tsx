import type { Metadata } from "next";

import PageHero from "@/components/marketing/PageHero";
import ServiceList from "@/components/marketing/services/ServiceList";
import { PHOTOS } from "@/lib/cloudinary";
import { INSTALLATION_TYPE_LABELS } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Fireplace installation, chimney caps, hearths and mantels, and service calls for homes, remodels and commercial builds across the Triangle, NC.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Fireplace and hearth work, from new builds to service calls"
        photo={PHOTOS.slateLinear}
        position="object-[60%_55%]"
      >
        <p className="max-w-xl text-[17px] leading-relaxed text-vanilla-custard md:text-xl">
          Every job type below is available for new construction, remodels and commercial builds.
        </p>
        <ul className="mt-1 flex flex-wrap gap-2">
          {Object.values(INSTALLATION_TYPE_LABELS).map((label) => (
            <li
              key={label}
              className="rounded-full border border-vanilla-custard-900/30 bg-deep-space-blue/40 px-3.5 py-2 text-sm backdrop-blur-sm md:text-[15px]"
            >
              {label}
            </li>
          ))}
        </ul>
      </PageHero>
      <ServiceList />
    </>
  );
}
