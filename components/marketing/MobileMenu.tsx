"use client";

import { useState } from "react";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Call02Icon, Cancel01Icon, Menu01Icon } from "@hugeicons/core-free-icons";

import { buttonVariants } from "@/components/ui/button";
import { NAV } from "@/lib/nav";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="flex items-center gap-1 lg:hidden">
      <a
        href={SITE.phone.href}
        aria-label={`Call ${SITE.name}`}
        className="flex size-11 items-center justify-center rounded-full"
      >
        <HugeiconsIcon icon={Call02Icon} size={22} />
      </a>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex size-11 items-center justify-center rounded-full bg-deep-space-blue text-vanilla-custard-900"
      >
        <HugeiconsIcon icon={open ? Cancel01Icon : Menu01Icon} size={20} />
      </button>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="absolute inset-x-0 top-full flex flex-col border-b border-border bg-background px-4 pt-2 pb-5 shadow-lg"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="flex min-h-13 items-center border-b border-section-border text-lg font-medium"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={close}
            className={cn(buttonVariants(), "mt-4 h-13 text-[17px] font-semibold")}
          >
            Get an estimate
          </Link>
        </nav>
      )}
    </div>
  );
}
