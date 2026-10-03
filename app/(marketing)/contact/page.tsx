import type { Metadata } from "next";
import { HugeiconsIcon } from "@hugeicons/react";
import { Call02Icon } from "@hugeicons/core-free-icons";

import ContactForm from "@/components/forms/ContactForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get an Estimate",
  description:
    "Tell us about your fireplace project. Written quote before any work starts — serving Raleigh, Durham, Cary, Wake Forest and the Triangle.",
};

const { coreArea, tripFee, diagnosticFee } = SITE.estimates;

export default async function ContactPage(props: PageProps<"/contact">) {
  // /contact?service=chimney_cap preselects the service (links from /services).
  const { service } = await props.searchParams;

  return (
    <section className="bg-section">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-start gap-8 px-5 pt-12 pb-16 md:gap-14 md:px-6 md:pt-20 md:pb-28">
        <div className="flex flex-[1_1_320px] flex-col gap-5 md:gap-6">
          <p className="text-[13px] font-semibold tracking-[0.08em] text-ember uppercase md:text-sm">
            Get an estimate
          </p>
          <h1 className="text-[2.4rem] leading-[1.06] md:text-[3.5rem]">Tell us about the job</h1>
          <p className="leading-relaxed text-muted-foreground md:text-lg">
            A few details — and photos, if you have them — help us come prepared. We&apos;ll
            reach out to set up an estimate, and you&apos;ll get a written quote before any work
            starts.
          </p>

          <div className="flex flex-col gap-3 rounded-2xl bg-deep-space-blue p-6 text-vanilla-custard-900 dark:border dark:border-white/10">
            <p className="font-semibold text-sunflower-gold">Prefer to talk?</p>
            <a href={SITE.phone.href} className="flex min-h-11 items-center gap-3 text-xl font-semibold">
              <HugeiconsIcon icon={Call02Icon} size={20} />
              {SITE.phone.display}
            </a>
            <p className="text-[15px] text-deep-space-blue-900">
              Serving {SITE.serviceArea.join(", ")} and the greater Triangle
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-background p-6">
            <p className="font-semibold">About estimates</p>
            <ul className="flex list-disc flex-col gap-2 pl-5 text-[15px] leading-relaxed text-muted-foreground">
              <li>
                <span className="font-semibold text-foreground">Installs:</span> free estimate in{" "}
                {coreArea}. Farther out, a trip fee based on distance, from ${tripFee}. We&apos;ll
                tell you the exact amount before we schedule.
              </li>
              <li>
                <span className="font-semibold text-foreground">Service calls:</span> $
                {diagnosticFee} diagnostic visit.
              </li>
              <li>Any fee is credited toward your job if you hire us.</li>
              <li>Photos up front help us quote faster, sometimes without a visit.</li>
            </ul>
          </div>
        </div>

        <div className="relative w-full min-w-0 flex-[999_1_520px] rounded-2xl border border-border bg-background p-5 sm:p-8 md:p-10">
          <ContactForm initialService={typeof service === "string" ? service : undefined} />
        </div>
      </div>
    </section>
  );
}
