import Link from "next/link";

import { SITE } from "@/lib/site";

export default function SeasonBanner() {
  if (!SITE.seasonBanner) return null;

  return (
    <Link
      href="/contact"
      className="flex min-h-11 flex-wrap items-center justify-center gap-x-3 gap-y-1 bg-sunflower-gold px-4 py-2 text-center text-sm text-deep-space-blue-400 md:text-[15px]"
    >
      <span className="font-bold">Get ready before the cold sets in.</span>
      <span>Book your pre-winter fireplace service call →</span>
    </Link>
  );
}
