import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";

import { buttonVariants } from "@/components/ui/button";
import SectionHeading from "@/components/marketing/SectionHeading";
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
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-start gap-6 px-5 py-14 md:gap-14 md:px-6 md:py-28">
        <div className="flex flex-[1_1_360px] flex-col gap-5">
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
          <Link
            href="/contact"
            className={cn(
              buttonVariants(),
              "hidden h-13 self-start px-7 text-[17px] font-semibold md:inline-flex",
            )}
          >
            Talk to us about your next build
          </Link>
        </div>
        <ul className="flex flex-[1_1_360px] flex-col">
          {POINTS.map((point) => (
            <li key={point.title} className="flex gap-3 border-b border-border py-3.5 md:gap-4 md:py-5">
              <HugeiconsIcon
                icon={Tick02Icon}
                size={22}
                className="mt-0.5 shrink-0 text-vivid-tangerine-400"
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
          className={cn(buttonVariants(), "h-13 w-full text-[17px] font-semibold md:hidden")}
        >
          Talk to us about your next build
        </Link>
      </div>
    </section>
  );
}
