import CloudinaryImage from "@/components/CloudinaryImage";
import { PHOTOS } from "@/lib/cloudinary";

// One real job, start to finish (the whitewashed-brick fireplace).
const STEPS = [
  {
    label: "Opened up",
    photo: PHOTOS.shiplapFraming,
    position: "object-[50%_40%]",
    alt: "Fireplace wall opened down to the framing",
  },
  {
    label: "Brick & hearth",
    photo: PHOTOS.shiplapBrick,
    position: "object-center",
    alt: "Whitewashed brick being laid on the hearth beside the new fireplace",
  },
  {
    label: "Shiplap",
    photo: PHOTOS.shiplapShiplap,
    position: "object-center",
    alt: "Shiplap boards going up on the wall above the fireplace",
  },
  {
    label: "Finished",
    photo: PHOTOS.shiplapFinished,
    position: "object-[50%_60%]",
    alt: "Finished gas fireplace in whitewashed brick under a beam mantel and shiplap wall",
  },
];

export default function BeforeAfter() {
  return (
    <div className="mx-5 flex flex-col gap-4 rounded-2xl border border-section-border bg-section p-4 md:mx-0 md:gap-8 md:p-10">
      <div className="flex flex-col gap-1 md:max-w-2xl md:gap-3">
        <p className="text-[13px] font-semibold tracking-[0.06em] text-ember uppercase md:text-sm">
          Start to finish
        </p>
        <h3 className="font-sans text-[17px] font-semibold md:font-heading md:text-4xl md:leading-tight md:font-medium">
          Whitewashed brick, shiplap and a beam mantel
        </h3>
        <p className="text-[15px] text-muted-foreground md:text-[17px] md:leading-relaxed">
          From an opened-up wall to the finished fireplace — framing, the fireplace, the brick and
          hearth, and the shiplap.
        </p>
      </div>
      <ol className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-4">
        {STEPS.map((step, i) => (
          <li key={step.label}>
            <figure className="relative aspect-[3/4] overflow-hidden rounded-xl bg-deep-space-blue">
              <CloudinaryImage
                watermark
                aspect="3:4"
                src={step.photo}
                alt={step.alt}
                fill
                sizes="(min-width: 768px) 260px, 45vw"
                className={`object-cover ${step.position}`}
              />
              <figcaption
                className={`absolute top-2 left-2 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold md:top-3 md:left-3 md:px-3 md:text-[13px] ${
                  i === STEPS.length - 1
                    ? "bg-vivid-tangerine text-deep-space-blue-400"
                    : "bg-deep-space-blue-400/90 text-vanilla-custard-900"
                }`}
              >
                <span className="opacity-70">{i + 1}</span>
                {step.label}
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>
    </div>
  );
}
