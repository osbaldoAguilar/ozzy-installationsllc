import Image from "next/image";
import Link from "next/link";

import { SERVICE_CATEGORIES } from "@/lib/services";
import { SITE } from "@/lib/site";
import logoGold from "@/public/brand/logo-gold.png";

const FOOTER_SERVICES = [
  "fireplace_installation",
  "chimney_cap",
  "hearth_mantel",
  "service_call",
] as const;

export default function SectionFooter() {
  return (
    <footer className="bg-deep-space-blue-200 text-deep-space-blue-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 pt-14 pb-8 md:px-6 md:pt-16">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-8 text-[15px]">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Image src={logoGold} alt="" className="h-14 w-auto" />
              <span className="font-heading text-xl font-semibold text-vanilla-custard-900">
                {SITE.name}
              </span>
            </div>
            <p className="leading-relaxed">
              Family-owned fireplace &amp; hearth specialists serving the Triangle, North
              Carolina.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            <p className="font-semibold text-sunflower-gold">Services</p>
            {FOOTER_SERVICES.map((key) => (
              <Link key={key} href={`/services#${key}`} className="hover:text-vanilla-custard-900">
                {SERVICE_CATEGORIES[key].label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2.5">
            <p className="font-semibold text-sunflower-gold">Company</p>
            <Link href="/about" className="hover:text-vanilla-custard-900">About</Link>
            <Link href="/portfolio" className="hover:text-vanilla-custard-900">Portfolio</Link>
            <Link href="/#builders" className="hover:text-vanilla-custard-900">For builders</Link>
            <Link href="/contact" className="hover:text-vanilla-custard-900">Get an estimate</Link>
          </div>

          <div className="flex flex-col gap-2.5">
            <p className="font-semibold text-sunflower-gold">Contact</p>
            <a href={SITE.phone.href} className="hover:text-vanilla-custard-900">
              {SITE.phone.display}
            </a>
            <a href={`mailto:${SITE.email}`} className="hover:text-vanilla-custard-900">
              {SITE.email}
            </a>
            <span>{SITE.serviceArea.join(" · ")}</span>
            <a href={SITE.instagram.href} className="hover:text-vanilla-custard-900">
              Instagram · {SITE.instagram.handle}
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-sm text-[#6da2bf]">
          &copy; {new Date().getFullYear()} Ozzy Installations LLC
        </div>
      </div>
    </footer>
  );
}
