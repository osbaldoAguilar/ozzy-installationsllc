import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Call02Icon } from "@hugeicons/core-free-icons";

import { buttonVariants } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

// Phones only: Call + Estimate stay pinned while scrolling.
export default function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-border bg-background px-3 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] shadow-[0_-6px_16px_rgb(0_37_57/0.08)] md:hidden">
      <a
        href={SITE.phone.href}
        className={cn(
          buttonVariants(),
          "h-12 flex-1 gap-2 bg-deep-space-blue text-base font-semibold text-vanilla-custard-900 hover:bg-deep-space-blue-400",
        )}
      >
        <HugeiconsIcon icon={Call02Icon} size={18} />
        Call
      </a>
      <Link
        href="/contact"
        className={cn(buttonVariants(), "h-12 flex-1 text-base font-semibold")}
      >
        Get an estimate
      </Link>
    </div>
  );
}
