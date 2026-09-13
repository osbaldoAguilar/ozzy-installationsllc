import type { Metadata } from "next";

import { SERVICE_CATEGORIES, SERVICE_TYPES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
};

// TODO: swap this taxonomy render for Sanity `service` documents (ServicesGrid / ServiceCard).

export default function ServicesPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-24">
      <h1 className="text-4xl">Services</h1>
      <ul className="mt-6 space-y-2">
        {SERVICE_TYPES.map((type) => (
          <li key={type}>{SERVICE_CATEGORIES[type].label}</li>
        ))}
      </ul>
    </section>
  );
}
