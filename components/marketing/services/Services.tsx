import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

import CloudinaryImage from "@/components/CloudinaryImage";
import SectionHeading from "@/components/marketing/SectionHeading";
import { SERVICE_PHOTOS } from "@/lib/cloudinary";
import { SERVICE_CATEGORIES, type ServiceType } from "@/lib/services";

export const SERVICE_BLURBS: Record<ServiceType, string> = {
  fireplace_installation:
    "Gas, wood and electric units sized, vented and finished for the room — installed to code, with the venting your home actually allows.",
  chimney_cap: "Worn or missing caps replaced to keep out rain, debris and animals.",
  hearth_mantel: "The finish work that turns a firebox into the centerpiece of the room.",
  service_call: "Won't light, won't stay lit, or something's off — we diagnose and repair.",
  other_services: "Wood stoves, gas inserts, electric fireplaces and other hearth products.",
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

        {/* Lead service: photo + venting types. */}
        <Link
          href="/services#fireplace_installation"
          className="group grid overflow-hidden rounded-2xl border border-border bg-section transition-colors hover:border-vivid-tangerine md:grid-cols-[1.1fr_1fr]"
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-deep-space-blue md:aspect-auto md:min-h-[360px]">
            <CloudinaryImage
              watermark
              aspect="16:10"
              src={SERVICE_PHOTOS.fireplace_installation.photo}
              alt={SERVICE_PHOTOS.fireplace_installation.alt}
              fill
              sizes="(min-width: 768px) 600px, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span className="absolute top-3 left-3 rounded-full bg-vivid-tangerine px-3 py-1 text-xs font-semibold tracking-[0.04em] text-deep-space-blue-400 uppercase md:top-4 md:left-4 md:text-[13px]">
              Every venting type
            </span>
          </div>
          <div className="flex flex-col justify-center gap-4 p-5 md:gap-5 md:p-10">
            <h3 className="text-2xl md:text-[2rem]">{install.label}</h3>
            <p className="leading-relaxed text-muted-foreground md:text-[17px]">
              {SERVICE_BLURBS.fireplace_installation}
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
            <span className="inline-flex items-center gap-1.5 font-semibold text-ember">
              See installation details
              <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
            </span>
          </div>
        </Link>

        {/* Phones: tappable rows with a thumbnail. Desktop: photo cards. */}
        <ul className="-mt-2 flex flex-col border-t border-border md:mt-0 md:grid md:grid-cols-2 md:gap-5 md:border-0 lg:grid-cols-4">
          {OTHERS.map((key) => (
            <li key={key}>
              <Link
                href={`/services#${key}`}
                className="group flex min-h-20 items-center gap-4 border-b border-border py-3 md:h-full md:flex-col md:items-stretch md:gap-0 md:overflow-hidden md:rounded-2xl md:border md:p-0 md:transition-colors md:hover:border-vivid-tangerine"
              >
                <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-deep-space-blue md:aspect-[4/3] md:size-auto md:rounded-none">
                  <CloudinaryImage
                    watermark
                    aspect="4:3"
                    gravity={SERVICE_PHOTOS[key].gravity}
                    src={SERVICE_PHOTOS[key].photo}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 270px, (min-width: 768px) 360px, 64px"
                    className="object-cover transition-transform duration-500 md:group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-0.5 md:gap-2 md:p-6">
                  <h3 className="font-sans text-[17px] font-semibold md:font-heading md:text-[22px] md:font-medium">
                    {SERVICE_CATEGORIES[key].label}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground md:text-base">
                    {SERVICE_BLURBS[key]}
                  </p>
                </div>
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={20}
                  className="shrink-0 text-ember md:hidden"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
