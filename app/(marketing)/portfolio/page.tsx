import { Suspense } from "react";
import type { Metadata } from "next";

import Contact from "@/components/marketing/contact/Contact";
import BeforeAfter from "@/components/marketing/portfolio/BeforeAfter";
import {
  PortfolioGallery,
  PortfolioGalleryFromUrl,
} from "@/components/marketing/portfolio/PortfolioGallery";
import PageHero from "@/components/marketing/PageHero";
import { PHOTOS } from "@/lib/cloudinary";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Fireplace installations, chimney caps, hearths and mantels by Ozzy Installations across North Carolina.",
};

// Static page (prerendered + prefetched). The ?service= filter is applied in the browser.
export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Our work, start to finish"
        photo={PHOTOS.afterShiplap}
        position="object-[50%_60%]"
      >
        <p className="max-w-xl text-[17px] leading-relaxed text-vanilla-custard md:text-xl">
          Real jobs from homes, remodels and commercial builds across North Carolina.
        </p>
      </PageHero>

      <section>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 py-12 md:gap-12 md:px-6 md:py-20">
          <BeforeAfter />
          <Suspense fallback={<PortfolioGallery />}>
            <PortfolioGalleryFromUrl />
          </Suspense>
        </div>
      </section>

      <Contact />
    </>
  );
}
