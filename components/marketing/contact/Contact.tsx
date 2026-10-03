import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

// Closing call-to-action band on the home page. The full form lives at /contact.
export default function Contact() {
  return (
    <section className="bg-deep-space-blue text-vanilla-custard-900">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-14 md:gap-8 md:px-6 md:py-22">
        <div className="flex max-w-xl flex-col gap-3">
          <h2 className="text-3xl leading-[1.12] text-balance text-vanilla-custard-900 md:text-[2.75rem]">
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
              "hidden h-13 border-vanilla-custard-900/35 bg-transparent px-6 text-[17px] font-semibold text-vanilla-custard-900 hover:border-sunflower-gold hover:bg-transparent hover:text-sunflower-gold sm:inline-flex",
            )}
          >
            Call {SITE.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
