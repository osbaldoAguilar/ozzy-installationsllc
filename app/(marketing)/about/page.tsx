import type { Metadata } from "next";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ChimneyIcon,
  File02Icon,
  UserGroupIcon,
  CheckmarkBadge01Icon,
} from "@hugeicons/core-free-icons";

import CloudinaryImage from "@/components/CloudinaryImage";
import Contact from "@/components/marketing/contact/Contact";
import SectionHeading from "@/components/marketing/SectionHeading";
import { PHOTOS } from "@/lib/cloudinary";
import { SITE, yearsInTrade } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Family-owned since ${SITE.foundedYear}, installing fireplaces since ${SITE.experienceSince}. Meet Ozzy Installations.`,
};

const yearsBeforeFounding = SITE.foundedYear - SITE.experienceSince;

const TIMELINE = [
  {
    year: String(SITE.experienceSince),
    text: `${SITE.owner} starts installing fireplaces.`,
  },
  {
    year: String(SITE.foundedYear),
    text: `After ${yearsBeforeFounding} years in the trade, he opens ${SITE.name} with his family.`,
  },
  {
    year: "Today",
    text: "Still family-owned and family-run, serving homeowners and builders across the Triangle.",
  },
];

const PROMISES = [
  {
    icon: File02Icon,
    title: "Written quote first",
    body: "You see the price in writing before any work starts. No surprise charges.",
  },
  {
    icon: UserGroupIcon,
    title: "Our own crew",
    body: "The work is done by our crew, not handed off to subcontractors.",
  },
  {
    icon: ChimneyIcon,
    title: "Every kind of fireplace",
    body: "Gas, wood and electric, every venting type — and the supplier relationships to offer more than one brand.",
  },
  {
    icon: CheckmarkBadge01Icon,
    title: "A name behind every job",
    body: `${SITE.name} carries ${SITE.owner}'s name, and he stands behind every install.`,
  },
];

const ON_THE_JOB = [
  {
    photo: PHOTOS.onTheRoof,
    alt: "Crew member on a roof beside a newly finished chimney chase",
    position: "object-[40%_45%]",
  },
  {
    photo: PHOTOS.shiplapInProgress,
    alt: "Shiplap boards being set on a fireplace wall",
    position: "object-center",
  },
  {
    photo: PHOTOS.stoneChaseCover,
    alt: "Crew working at the top of a tall stone chimney",
    position: "object-[50%_25%]",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-deep-space-blue text-vanilla-custard-900">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 pt-14 pb-12 md:px-6 md:pt-22 md:pb-18">
          <p className="text-[13px] font-semibold tracking-[0.08em] text-sunflower-gold uppercase md:text-sm">
            About · Family-owned
          </p>
          <h1 className="max-w-3xl text-[2.4rem] leading-[1.06] text-balance text-vanilla-custard-900 md:text-6xl">
            A family business with {yearsInTrade()} years behind it
          </h1>
          <p className="max-w-2xl text-[17px] leading-relaxed text-vanilla-custard md:text-xl">
            {SITE.name} is new as a name, not as a crew. {SITE.owner} has been installing
            fireplaces since {SITE.experienceSince}.
          </p>
        </div>
      </section>

      {/* Story */}
      <section>
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-6 px-5 py-14 md:gap-14 md:px-6 md:py-24">
          <div className="relative aspect-[4/3] w-full flex-[1_1_340px] overflow-hidden rounded-2xl bg-vanilla-custard md:aspect-square md:max-w-[480px]">
            <CloudinaryImage
              src={PHOTOS.onTheRoof}
              alt="Ozzy Installations crew member on a roof beside a newly finished chimney chase"
              fill
              sizes="(min-width: 768px) 480px, 100vw"
              className="object-cover object-[40%_45%]"
              preload
            />
          </div>
          <div className="flex min-w-0 flex-[999_1_420px] flex-col gap-5">
            <SectionHeading eyebrow="Our story" title="Learned on the job, now under our own name" />
            <p className="max-w-2xl leading-relaxed text-muted-foreground md:text-lg">
              {SITE.owner} started as a fireplace installer in {SITE.experienceSince}. Over{" "}
              {yearsBeforeFounding} years on the job he installed just about every kind of
              fireplace and hearth product — wood stoves, thru-roof venting, gas inserts, electric
              units and everything in between.
            </p>
            <p className="max-w-2xl leading-relaxed text-muted-foreground md:text-lg">
              In {SITE.foundedYear} he opened {SITE.name} as a family business. Those years in the
              trade built the supplier relationships that let us offer every type of fireplace,
              not just one brand. Today it&apos;s still family-owned and family-run, and every job
              carries {SITE.owner}&apos;s name.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-deep-space-blue-400 text-vanilla-custard-900">
        <ol className="mx-auto grid w-full max-w-6xl gap-6 px-5 py-10 md:grid-cols-3 md:gap-8 md:px-6 md:py-14">
          {TIMELINE.map((item) => (
            <li key={item.year} className="flex flex-col gap-2 border-l-2 border-sunflower-gold/40 pl-4">
              <span className="font-heading text-3xl leading-none text-sunflower-gold md:text-4xl">
                {item.year}
              </span>
              <span className="text-[15px] leading-relaxed text-deep-space-blue-900 md:text-base">
                {item.text}
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* What you can count on */}
      <section className="bg-vanilla-custard-900">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-14 md:gap-12 md:px-6 md:py-24">
          <SectionHeading eyebrow="How we work" title="What you can count on" />
          <ul className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
            {PROMISES.map((promise) => (
              <li
                key={promise.title}
                className="flex flex-col gap-3 rounded-2xl border border-vanilla-custard-700 bg-background p-6 md:p-7"
              >
                <HugeiconsIcon icon={promise.icon} size={30} className="text-vivid-tangerine-400" />
                <h3 className="text-xl md:text-[22px]">{promise.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground md:text-base">
                  {promise.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* On the job */}
      <section>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 py-14 md:gap-10 md:px-6 md:py-24">
          <SectionHeading eyebrow="On the job" title="Up on the roof and inside the wall" className="px-5 md:px-0" />
          <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
            {ON_THE_JOB.map((shot) => (
              <li
                key={shot.photo}
                className="relative aspect-[4/5] w-64 shrink-0 snap-start overflow-hidden rounded-xl bg-deep-space-blue md:w-auto md:rounded-2xl"
              >
                <CloudinaryImage
                  src={shot.photo}
                  alt={shot.alt}
                  fill
                  sizes="(min-width: 768px) 360px, 256px"
                  className={`object-cover ${shot.position}`}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Contact />
    </>
  );
}
