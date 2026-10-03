import CloudinaryImage from "@/components/CloudinaryImage";
import SectionHeading from "@/components/marketing/SectionHeading";
import { PHOTOS } from "@/lib/cloudinary";
import { SERVICE_CATEGORIES } from "@/lib/services";

// TODO: move to Sanity `portfolioItem` once the Studio is wired up.
const PROJECTS = [
  {
    photo: PHOTOS.slateLinear,
    title: "Linear gas fireplace in slate tile",
    service: SERVICE_CATEGORIES.fireplace_installation.label,
    alt: "Linear gas fireplace in a slate tile surround under a wood mantel",
  },
  {
    photo: PHOTOS.traditionalMantel,
    title: "Gas insert in a traditional mantel",
    service: SERVICE_CATEGORIES.hearth_mantel.label,
    alt: "Lit gas insert set in a carved white mantel with black stone surround",
  },
  {
    photo: PHOTOS.whiteBrickChimney,
    title: "Painted brick chimney with custom shroud",
    service: SERVICE_CATEGORIES.chimney_cap.label,
    alt: "Painted white brick chimney with a black metal shroud at dusk",
  },
];

function BeforeAfter() {
  const shots = [
    {
      label: "Before",
      photo: PHOTOS.beforeShiplap,
      position: "object-[50%_30%]",
      badge: "bg-deep-space-blue-400 text-vanilla-custard-900",
      alt: "Fireplace wall during installation, with brick and shiplap in place and floor protection down",
    },
    {
      label: "After",
      photo: PHOTOS.afterShiplap,
      position: "object-[50%_45%]",
      badge: "bg-vivid-tangerine text-deep-space-blue-400",
      alt: "Finished fireplace with whitewashed brick, beam mantel, sconces and shiplap wall",
    },
  ];

  return (
    <div className="mx-5 flex flex-col gap-3 rounded-2xl border border-vanilla-custard-700 bg-vanilla-custard-900 p-4 md:mx-0 md:flex-row-reverse md:flex-wrap md:items-center md:gap-10 md:p-10">
      <div className="grid flex-[999_1_520px] grid-cols-2 gap-2.5 md:gap-4">
        {shots.map((shot) => (
          <figure key={shot.label} className="relative aspect-[3/4] overflow-hidden rounded-xl bg-deep-space-blue">
            <CloudinaryImage
              src={shot.photo}
              alt={shot.alt}
              fill
              sizes="(min-width: 768px) 360px, 45vw"
              className={`object-cover ${shot.position}`}
            />
            <figcaption
              className={`absolute top-2 left-2 rounded-full px-2.5 py-1 text-xs font-semibold tracking-[0.04em] uppercase md:top-3 md:left-3 md:px-3 md:text-[13px] ${shot.badge}`}
            >
              {shot.label}
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="flex flex-[1_1_280px] flex-col gap-1 md:gap-3.5">
        <p className="hidden text-sm font-semibold tracking-[0.06em] text-vivid-tangerine-400 uppercase md:block">
          Before &amp; after
        </p>
        <h3 className="font-sans text-[15px] font-semibold md:font-heading md:text-4xl md:leading-tight md:font-medium">
          Whitewashed brick, shiplap and a beam mantel
        </h3>
        <p className="text-[15px] text-muted-foreground md:text-[17px] md:leading-relaxed">
          The same wall mid-install, floors still covered, and the day we finished.
        </p>
      </div>
    </div>
  );
}

export default function Portfolio() {
  return (
    <section id="work" className="scroll-mt-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 py-14 md:gap-10 md:px-6 md:py-28">
        <SectionHeading
          eyebrow="Recent work"
          title="Installed across North Carolina"
          className="px-5 md:px-0"
        />
        <BeforeAfter />
        {/* Swipe row on phones, 3-up grid on desktop. */}
        <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
          {PROJECTS.map((project) => (
            <li key={project.photo} className="w-64 shrink-0 snap-start md:w-auto">
              <figure className="flex flex-col gap-2 md:gap-3">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-deep-space-blue md:rounded-2xl">
                  <CloudinaryImage
                    src={project.photo}
                    alt={project.alt}
                    fill
                    sizes="(min-width: 768px) 360px, 256px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-semibold md:text-base">{project.title}</span>
                  <span className="text-[13px] text-muted-foreground md:text-sm">
                    {project.service}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
