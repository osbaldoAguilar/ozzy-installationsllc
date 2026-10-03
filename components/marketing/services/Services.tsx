import Link from "next/link";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  ChimneyIcon,
  Fire02Icon,
  Sofa01Icon,
  ToolboxIcon,
  Wrench01Icon,
} from "@hugeicons/core-free-icons";

import SectionHeading from "@/components/marketing/SectionHeading";
import { SERVICE_CATEGORIES, type ServiceType } from "@/lib/services";

export const SERVICE_COPY: Record<ServiceType, { blurb: string; icon: IconSvgElement }> = {
  fireplace_installation: {
    blurb:
      "Gas, wood and electric units sized, vented and finished for the room — installed to code, with the venting your home actually allows.",
    icon: Fire02Icon,
  },
  chimney_cap: {
    blurb: "Worn or missing caps replaced to keep out rain, debris and animals.",
    icon: ChimneyIcon,
  },
  hearth_mantel: {
    blurb: "The finish work that turns a firebox into the centerpiece of the room.",
    icon: Sofa01Icon,
  },
  service_call: {
    blurb: "Won't light, won't stay lit, or something's off — we diagnose and repair.",
    icon: Wrench01Icon,
  },
  other_services: {
    blurb: "Wood stoves, gas inserts, electric fireplaces and other hearth products.",
    icon: ToolboxIcon,
  },
};

const OTHERS = ["chimney_cap", "hearth_mantel", "service_call", "other_services"] as const;

export default function Services() {
  const install = SERVICE_CATEGORIES.fireplace_installation;

  return (
    <section id="services" className="scroll-mt-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-14 md:gap-12 md:px-6 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="What we do" title="Everything from the firebox to the mantel">
            <p className="hidden text-lg leading-relaxed text-muted-foreground md:block">
              New installs, replacements and repairs, handled start to finish.
            </p>
          </SectionHeading>
          <Link
            href="/services"
            className="hidden min-h-11 items-center border-b-2 border-vivid-tangerine font-semibold md:inline-flex"
          >
            All services
          </Link>
        </div>

        <Link
          href="/services"
          className="flex flex-wrap gap-5 rounded-2xl border border-border bg-vanilla-custard-900 p-5 transition-colors hover:border-vivid-tangerine md:gap-8 md:p-9"
        >
          <div className="flex flex-[1_1_320px] flex-col gap-3 md:gap-3.5">
            <HugeiconsIcon
              icon={SERVICE_COPY.fireplace_installation.icon}
              size={40}
              className="hidden text-vivid-tangerine-400 md:block"
            />
            <h3 className="text-2xl md:text-[28px]">{install.label}</h3>
            <p className="max-w-lg leading-relaxed text-muted-foreground md:text-[17px]">
              {SERVICE_COPY.fireplace_installation.blurb}
            </p>
          </div>
          <div className="flex flex-[1_1_320px] flex-col justify-center gap-3">
            <p className="hidden text-[13px] font-semibold tracking-[0.06em] text-muted-foreground uppercase md:block">
              Venting &amp; build types
            </p>
            <ul className="flex flex-wrap gap-1.5 md:gap-2">
              {Object.values(install.subtypes).map((label) => (
                <li
                  key={label}
                  className="rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium md:px-3.5 md:py-2 md:text-[15px]"
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </Link>

        {/* Phones: tappable rows. Desktop: cards. */}
        <ul className="-mt-2 flex flex-col border-t border-border md:mt-0 md:grid md:grid-cols-2 md:gap-5 md:border-0 lg:grid-cols-4">
          {OTHERS.map((key) => (
            <li key={key}>
              <Link
                href="/services"
                className="flex min-h-18 items-center gap-3.5 border-b border-border py-3 md:h-full md:flex-col md:items-start md:gap-3 md:rounded-2xl md:border md:p-7 md:transition-colors md:hover:border-vivid-tangerine"
              >
                <HugeiconsIcon
                  icon={SERVICE_COPY[key].icon}
                  size={32}
                  className="hidden text-vivid-tangerine-400 md:block"
                />
                <div className="flex flex-1 flex-col gap-0.5 md:gap-3">
                  <h3 className="font-sans text-[17px] font-semibold md:font-heading md:text-[22px] md:font-medium">
                    {SERVICE_CATEGORIES[key].label}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground md:text-base">
                    {SERVICE_COPY[key].blurb}
                  </p>
                </div>
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={20}
                  className="shrink-0 text-vivid-tangerine-400 md:hidden"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
