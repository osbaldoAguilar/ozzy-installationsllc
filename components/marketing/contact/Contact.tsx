import Link from "next/link";

import CloudinaryImage from "@/components/CloudinaryImage";
import { buttonVariants } from "@/components/ui/button";
import { PHOTOS } from "@/lib/cloudinary";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

// Closing call-to-action band (home, portfolio, about). The full form lives at /contact.
export default function Contact() {
  return (
    <section className="relative isolate overflow-hidden bg-deep-space-blue text-vanilla-custard-900">
      <CloudinaryImage
        src={PHOTOS.traditionalMantel}
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[50%_70%]"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-deep-space-blue via-deep-space-blue/85 to-deep-space-blue/60 md:bg-linear-to-r md:from-deep-space-blue md:via-deep-space-blue/85 md:to-deep-space-blue/30" />

      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-16 md:gap-8 md:px-6 md:py-28">
        <div className="flex max-w-xl flex-col gap-3">
          <h2 className="text-3xl leading-[1.12] text-balance text-vanilla-custard-900 md:text-5xl">
            Planning a fireplace? Tell us about the job.
          </h2>
          <p className="leading-relaxed text-vanilla-custard md:text-lg">
            Send a few details and photos of the space. We&apos;ll follow up to set up an
            estimate, and you&apos;ll get a written quote before any work starts.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
          <Link
            href="/contact"
            className={cn(buttonVariants(), "h-13 px-7 text-[17px] font-semibold")}
          >
            Get an estimate
          </Link>
          <a
            href={SITE.phone.href}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "hidden h-13 border-vanilla-custard-900/35 bg-deep-space-blue/30 px-6 text-[17px] font-semibold text-vanilla-custard-900 backdrop-blur-sm hover:border-sunflower-gold hover:bg-deep-space-blue/30 hover:text-sunflower-gold sm:inline-flex",
            )}
          >
            Call {SITE.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
