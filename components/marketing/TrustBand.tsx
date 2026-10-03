import { SITE } from "@/lib/site";

const STATS = [
  { value: String(SITE.experienceSince), label: "Installing fireplaces since" },
  { value: "Family-owned", label: `${SITE.owner} stands behind every install` },
  { value: "In writing", label: "Your quote, before work starts" },
  { value: "The Triangle", label: SITE.serviceArea.join(" · ") },
];

export default function TrustBand() {
  return (
    <section className="border-t border-white/10 bg-deep-space-blue-400 text-vanilla-custard-900">
      <dl className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-x-4 gap-y-6 px-5 py-7 md:grid-cols-4 md:gap-7 md:px-6 md:py-9">
        {STATS.map((stat) => (
          <div key={stat.value} className="flex flex-col gap-1 md:gap-1.5">
            <dt className="font-heading text-[28px] leading-none text-sunflower-gold md:text-4xl">
              {stat.value}
            </dt>
            <dd className="text-sm leading-snug text-deep-space-blue-900 md:text-[15px]">
              {stat.label}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
