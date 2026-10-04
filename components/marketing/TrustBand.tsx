import { SITE } from "@/lib/site";

const STATS = [
  { value: String(SITE.experienceSince), label: "Installing fireplaces since" },
  { value: "Family-owned", label: "The owner stands behind every install" },
  { value: "In writing", label: "Your quote, before work starts" },
  { value: "The Triangle", label: SITE.serviceArea.join(" · ") },
];

// Floats over the bottom edge of the hero so the proof points get seen first.
export default function TrustBand() {
  return (
    <section className="relative z-10 px-4 md:px-6">
      <dl className="mx-auto -mt-16 grid w-full max-w-6xl grid-cols-2 gap-x-4 gap-y-6 rounded-2xl border border-border border-t-4 border-t-vivid-tangerine bg-card px-5 py-6 text-card-foreground shadow-[0_20px_50px_-20px_rgb(0_37_57/0.35)] md:-mt-20 md:grid-cols-4 md:gap-8 md:px-10 md:py-9">
        {STATS.map((stat) => (
          <div key={stat.value} className="flex flex-col gap-1 md:gap-1.5">
            <dt className="font-heading text-[26px] leading-none text-deep-space-blue md:text-4xl dark:text-sunflower-gold">
              {stat.value}
            </dt>
            <dd className="text-sm leading-snug text-muted-foreground md:text-[15px]">{stat.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
