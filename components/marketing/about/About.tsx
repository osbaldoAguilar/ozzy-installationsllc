import CloudinaryImage from "@/components/CloudinaryImage";
import SectionHeading from "@/components/marketing/SectionHeading";
import { PHOTOS } from "@/lib/cloudinary";
import { SITE, yearsInTrade } from "@/lib/site";

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-vanilla-custard-700 bg-vanilla-custard-900">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-5 px-5 py-14 md:gap-14 md:px-6 md:py-28">
        <div className="relative aspect-[4/3] w-full flex-[1_1_340px] overflow-hidden rounded-2xl bg-vanilla-custard md:aspect-square md:max-w-[480px]">
          <CloudinaryImage
            src={PHOTOS.onTheRoof}
            alt="Ozzy Installations crew member on a roof beside a newly finished chimney chase"
            fill
            sizes="(min-width: 768px) 480px, 100vw"
            className="object-cover object-[40%_45%]"
          />
        </div>
        <div className="flex min-w-0 flex-[999_1_420px] flex-col gap-5">
          <SectionHeading
            eyebrow={`About ${SITE.name} · Family-owned`}
            title={`A family business with ${yearsInTrade()} years behind it`}
          />
          <p className="max-w-2xl leading-relaxed text-muted-foreground md:text-lg">
            {SITE.owner} started as a fireplace installer in {SITE.experienceSince}. Over{" "}
            {SITE.foundedYear - SITE.experienceSince} years on the job he installed just about
            every kind of fireplace and hearth product — wood stoves, thru-roof venting, gas
            inserts, electric units and everything in between.
          </p>
          <p className="max-w-2xl leading-relaxed text-muted-foreground md:text-lg">
            In {SITE.foundedYear} he opened {SITE.name} as a family business. Those years in the
            trade built the supplier relationships that let us offer every type of fireplace, not
            just one brand. Today it&apos;s still family-owned and family-run, and every job
            carries {SITE.owner}&apos;s name.
          </p>
        </div>
      </div>
    </section>
  );
}
