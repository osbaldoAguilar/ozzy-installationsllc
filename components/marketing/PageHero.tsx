import CloudinaryImage from "@/components/CloudinaryImage";
import { cn } from "@/lib/utils";

// Inner-page header: a photo of our work behind the title.
export default function PageHero({
  eyebrow,
  title,
  photo,
  position = "object-center",
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  photo: string; // Cloudinary public ID
  position?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate flex min-h-[440px] items-end overflow-hidden bg-deep-space-blue text-vanilla-custard-900 md:min-h-[540px] md:items-center">
      <CloudinaryImage
        src={photo}
        alt=""
        fill
        preload
        sizes="100vw"
        className={cn("-z-20 object-cover", position)}
      />
      {/* Darker where the text sits so it stays readable over any photo. */}
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-deep-space-blue via-deep-space-blue/75 to-deep-space-blue/25 md:bg-linear-to-r md:from-deep-space-blue/95 md:via-deep-space-blue/70 md:to-deep-space-blue/10" />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 pt-28 pb-10 md:px-6 md:py-24">
        <p className="flex items-center gap-2.5 text-[13px] font-semibold tracking-[0.08em] text-sunflower-gold uppercase md:text-sm">
          <span className="hidden h-0.5 w-7 bg-sunflower-gold md:block" />
          {eyebrow}
        </p>
        <h1 className="max-w-2xl text-[2.4rem] leading-[1.06] text-balance text-vanilla-custard-900 md:text-6xl">
          {title}
        </h1>
        {children}
      </div>
    </section>
  );
}
