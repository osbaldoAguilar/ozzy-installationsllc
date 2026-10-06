import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import SectionFooter from "@/components/marketing/SectionFooter";
import SectionHeader from "@/components/marketing/SectionHeader";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

// Shown for any unknown url and for notFound() (e.g. /services/[slug], /studio).
export default function NotFound() {
  return (
    <>
      <SectionHeader />
      <main className="flex flex-1 items-center bg-section">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-5 px-5 py-24 md:px-6 md:py-32">
          <p className="text-[13px] font-semibold tracking-[0.08em] text-ember uppercase md:text-sm">
            Page not found
          </p>
          <h1 className="max-w-2xl text-4xl leading-tight md:text-6xl">
            We couldn&apos;t find that page.
          </h1>
          <p className="max-w-xl leading-relaxed text-muted-foreground md:text-lg">
            It may have moved. Head back home, or get in touch about your project.
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className={cn(buttonVariants(), "h-12 px-6 text-base font-semibold")}>
              Back to home
            </Link>
            <a
              href={SITE.phone.href}
              className={cn(buttonVariants({ variant: "outline" }), "h-12 px-6 text-base font-semibold")}
            >
              Call {SITE.phone.display}
            </a>
          </div>
        </div>
      </main>
      <SectionFooter />
    </>
  );
}
