import CloudinaryImage from "@/components/CloudinaryImage";
import { PHOTOS } from "@/lib/cloudinary";

const SHOTS = [
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

export default function BeforeAfter() {
  return (
    <div className="mx-5 flex flex-col gap-3 rounded-2xl border border-section-border bg-section p-4 md:mx-0 md:flex-row-reverse md:flex-wrap md:items-center md:gap-10 md:p-10">
      <div className="grid flex-[999_1_520px] grid-cols-2 gap-2.5 md:gap-4">
        {SHOTS.map((shot) => (
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
        <p className="hidden text-sm font-semibold tracking-[0.06em] text-ember uppercase md:block">
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
