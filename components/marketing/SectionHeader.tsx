import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import MobileMenu from "@/components/marketing/MobileMenu";
import { NAV } from "@/lib/nav";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import logoNavy from "@/public/brand/logo-navy.png";

export default function SectionHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center gap-2 pr-3 pl-4 md:h-18 md:gap-8 md:px-6">
        <Link
          href="/"
          className="mr-auto flex items-center gap-2.5 font-heading text-lg font-semibold md:text-xl"
        >
          <Image src={logoNavy} alt="" className="h-10 w-auto md:h-12" preload />
          {SITE.name}
        </Link>

        <div className="hidden items-center gap-7 text-[15px] lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <a href={SITE.phone.href} className="font-semibold">
            {SITE.phone.display}
          </a>
          <Link
            href="/contact"
            className={cn(buttonVariants(), "h-11 px-5 text-[15px] font-semibold")}
          >
            Get an Estimate
          </Link>
        </div>

        <MobileMenu />
      </nav>
    </header>
  );
}
