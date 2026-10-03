import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";

import CloudinaryImage from "@/components/CloudinaryImage";
import { buttonVariants } from "@/components/ui/button";
import SectionHeading from "@/components/marketing/SectionHeading";
import { PHOTOS } from "@/lib/cloudinary";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const POINTS = [
  {
    title: "New construction, remodel & commercial",
    body: "Rough-in through finish, one home or several.",
  },
  {
    title: "Every venting type",
    body: "Direct vent, thru-roof, thru-chase, vent-free and masonry.",
  },
  {
    title: "One point of contact",
    body: "You'll always know who's coming and when.",
  },
];

export default function Builders() {
  return (
    <section id="builders" className="scroll-mt-20">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-5 py-14 md:grid-cols-[1.15fr_1fr] md:gap-16 md:px-6 md:py-28">
        <div className="flex flex-col gap-5 md:gap-6">
          <SectionHeading
            eyebrow="For builders & contractors"
            title="A fireplace crew you can schedule around"
          >
            <p className="leading-relaxed text-muted-foreground md:text-lg">
              {SITE.owner} spent {SITE.foundedYear - SITE.experienceSince} years as a fireplace
              installer before starting {SITE.name}. We know how a build runs and where the
              fireplace fits in it.
            </p>
          </SectionHeading>
          <ul className="flex flex-col">
            {POINTS.map((point) => (
              <li key={point.title} className="flex gap-3 border-b border-border py-3.5 md:gap-4 md:py-4">
                <HugeiconsIcon
                  icon={Tick02Icon}
                  size={22}
                  className="mt-0.5 shrink-0 text-ember"
                />
                <div className="flex flex-col gap-0.5 md:gap-1">
                  <span className="font-semibold md:text-[17px]">{point.title}</span>
                  <span className="text-[15px] text-muted-foreground md:text-base">{point.body}</span>
                </div>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className={cn(
              buttonVariants(),
              "h-13 w-full px-7 text-[17px] font-semibold md:w-auto md:self-start",
            )}
          >
            Talk to us about your next build
          </Link>
        </div>

        <div className="relative order-first aspect-[4/3] overflow-hidden rounded-2xl bg-deep-space-blue md:order-none md:aspect-[4/5]">
          <CloudinaryImage
            src={PHOTOS.newbuildFraming}
            alt="Fireplace set at the base of a tall framed chase inside a new home"
            fill
            sizes="(min-width: 768px) 480px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
