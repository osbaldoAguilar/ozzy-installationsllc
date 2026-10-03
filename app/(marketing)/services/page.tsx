import type { Metadata } from "next";

import ServiceList from "@/components/marketing/services/ServiceList";
import { INSTALLATION_TYPE_LABELS } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Fireplace installation, chimney caps, hearths and mantels, and service calls for homes, remodels and commercial builds across the Triangle, NC.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-deep-space-blue text-vanilla-custard-900">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 pt-14 pb-12 md:px-6 md:pt-22 md:pb-18">
          <p className="text-[13px] font-semibold tracking-[0.08em] text-sunflower-gold uppercase md:text-sm">
            Services
          </p>
          <h1 className="max-w-3xl text-[2.4rem] leading-[1.06] text-balance text-vanilla-custard-900 md:text-6xl">
            Fireplace and hearth work, from new builds to service calls
          </h1>
          <p className="max-w-2xl text-[17px] leading-relaxed text-vanilla-custard md:text-xl">
            Every job type below is available for new construction, remodels and commercial
            builds.
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {Object.values(INSTALLATION_TYPE_LABELS).map((label) => (
              <li
                key={label}
                className="rounded-full border border-vanilla-custard-900/30 px-3.5 py-2 text-sm md:text-[15px]"
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ServiceList />
    </>
  );
}
