import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";

import { buttonVariants } from "@/components/ui/button";
import { cldUrl, PHOTOS } from "@/lib/cloudinary";
import { SITE, yearsInTrade } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function HeroVideo() {
  return (
    <section className="relative flex min-h-[560px] items-center overflow-hidden bg-deep-space-blue text-vanilla-custard-900 md:min-h-[680px]">
      {/* Background video. Decorative, so it's hidden from assistive tech.
          The poster shows while the file buffers and for reduced-motion users. */}
      <div className="absolute inset-0 z-0 bg-deep-space-blue">
        <video
          src="/hero-video.mp4"
          poster={cldUrl(PHOTOS.afterShiplap, "f_auto,q_auto,w_1600,c_fill,ar_16:9")}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        />
        <div className="absolute inset-0 bg-deep-space-blue/60" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-12 md:px-6 md:py-24">
        <div className="flex max-w-3xl flex-col gap-5 md:gap-6">
          <p className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.08em] text-sunflower-gold uppercase md:text-sm">
            <span className="hidden h-0.5 w-7 bg-sunflower-gold md:block" />
            Family-owned · Fireplaces since {SITE.experienceSince}
          </p>
          <h1 className="text-[2.4rem] leading-[1.05] text-balance text-vanilla-custard-900 md:text-7xl md:leading-[1.04]">
            {yearsInTrade()} years installing fireplaces. Now under our own name.
          </h1>
          <p className="max-w-xl text-[17px] leading-relaxed text-vanilla-custard md:text-xl">
            {SITE.owner} has installed fireplaces across the Triangle since{" "}
            {SITE.experienceSince}. In {SITE.foundedYear} he started {SITE.name} with his
            family, so homeowners and builders deal directly with a family business — and{" "}
            {SITE.owner} stands behind every job.
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className={cn(buttonVariants(), "h-13 gap-2 px-7 text-[17px] font-semibold")}
            >
              Get an estimate
              <HugeiconsIcon icon={ArrowRight02Icon} size={18} />
            </Link>
            <a
              href={SITE.phone.href}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-13 border-vanilla-custard-900/35 bg-transparent px-7 text-[17px] font-semibold text-vanilla-custard-900 hover:border-sunflower-gold hover:bg-transparent hover:text-sunflower-gold",
              )}
            >
              Call {SITE.phone.display}
            </a>
          </div>
          <p className="text-center text-sm text-deep-space-blue-900 sm:text-left md:text-[15px]">
            Written quote before any work starts.
          </p>
        </div>
      </div>
    </section>
  );
}
