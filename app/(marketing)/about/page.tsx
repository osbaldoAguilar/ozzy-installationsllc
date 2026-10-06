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
import PageHero from "@/components/marketing/PageHero";
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
    text: "Our owner starts installing fireplaces.",
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
    body: `${SITE.name} carries the owner's name, and he stands behind every install.`,
  },
];

const ON_THE_JOB = [
  {
    photo: PHOTOS.crewCopperCap,
    alt: "Two crew members setting a copper chimney cap on a roof",
    position: "object-[50%_30%]",
  },
  {
    photo: PHOTOS.crewInsert,
    alt: "Crew members kneeling at a fireplace, fitting the surround",
    position: "object-center",
  },
  {
    photo: PHOTOS.crewFraming,
    alt: "Crew member framing out a fireplace wall",
    position: "object-center",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About · Family-owned"
        title={`A family business with ${yearsInTrade()} years behind it`}
        photo={PHOTOS.onTheRoof}
        position="object-[35%_40%]"
      >
        <p className="max-w-xl text-[17px] leading-relaxed text-vanilla-custard md:text-xl">
          {SITE.name} is new as a name, not as a crew. Our owner has been installing
          fireplaces since {SITE.experienceSince}.
        </p>
      </PageHero>

      {/* Story */}
      <section>
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-6 px-5 py-14 md:gap-14 md:px-6 md:py-24">
          <div className="relative aspect-square w-full flex-[1_1_340px] overflow-hidden rounded-2xl bg-vanilla-custard md:max-w-[480px]">
            <CloudinaryImage
              watermark
              aspect="1:1"
              src={PHOTOS.whiteMantelNewBuild}
              alt="White mantel and black hearth installed in a new-construction home"
              fill
              sizes="(min-width: 768px) 480px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex min-w-0 flex-[999_1_420px] flex-col gap-5">
            <SectionHeading eyebrow="Our story" title="Learned on the job, now under our own name" />
            <p className="max-w-2xl leading-relaxed text-muted-foreground md:text-lg">
              Our owner started as a fireplace installer in {SITE.experienceSince}. Over{" "}
              {yearsBeforeFounding} years on the job he installed just about every kind of
              fireplace and hearth product — wood stoves, thru-roof venting, gas inserts, electric
              units and everything in between.
            </p>
            <p className="max-w-2xl leading-relaxed text-muted-foreground md:text-lg">
              In {SITE.foundedYear} he opened {SITE.name} as a family business. Those years in the
              trade built the supplier relationships that let us offer every type of fireplace,
              not just one brand. Today it&apos;s still family-owned and family-run, and every job
              carries his name.
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
      <section className="bg-section">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-14 md:gap-12 md:px-6 md:py-24">
          <SectionHeading eyebrow="How we work" title="What you can count on" />
          <ul className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
            {PROMISES.map((promise) => (
              <li
                key={promise.title}
                className="flex flex-col gap-3 rounded-2xl border border-section-border bg-background p-6 md:p-7"
              >
                <HugeiconsIcon icon={promise.icon} size={30} className="text-ember" />
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
                  watermark
                  aspect="4:5"
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
