import SectionHeading from "@/components/marketing/SectionHeading";
import { SITE } from "@/lib/site";

const { coreArea, tripFee } = SITE.estimates;

const STEPS = [
  {
    title: "Tell us about the job",
    body: "Call or send the form. Add a few photos of the space and we can often tell you what's possible before we visit.",
  },
  {
    title: "On-site estimate",
    body: `We measure, check your venting options and give you a written quote. Install estimates are free in ${coreArea}; farther out, a trip fee based on distance (from $${tripFee}) — you'll know it before we schedule, and it's credited to your job if you hire us.`,
  },
  {
    title: "Installation",
    body: "Our own crew does the work — not subcontractors — to code, and leaves the room clean.",
  },
  {
    title: "Walkthrough",
    body: "Before we leave, we show you how everything works and answer your questions.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="border-t border-section-border bg-section">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-14 md:gap-12 md:px-6 md:py-28">
        <SectionHeading eyebrow="How it works" title="No surprises, start to finish" />
        <ol className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="flex gap-4 md:flex-col md:gap-3 md:rounded-2xl md:border md:border-section-border md:bg-background md:p-7"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-deep-space-blue font-heading text-lg text-sunflower-gold md:size-11 md:text-xl">
                {i + 1}
              </span>
              <div className="flex flex-col gap-1 md:gap-3">
                <h3 className="text-xl md:text-[22px]">{step.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground md:text-base">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
