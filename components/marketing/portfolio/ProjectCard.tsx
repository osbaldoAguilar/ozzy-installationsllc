import CloudinaryImage from "@/components/CloudinaryImage";
import type { Project } from "@/lib/portfolio";
import { SERVICE_CATEGORIES } from "@/lib/services";

export default function ProjectCard({
  project,
  sizes = "(min-width: 768px) 360px, 256px",
}: {
  project: Project;
  sizes?: string;
}) {
  return (
    <figure className="flex flex-col gap-2 md:gap-3">
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-deep-space-blue md:rounded-2xl">
        <CloudinaryImage
          watermark
          aspect="4:5"
          src={project.photo}
          alt={project.alt}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </div>
      <figcaption className="flex flex-col gap-0.5">
        <span className="text-[15px] font-semibold md:text-base">{project.title}</span>
        <span className="text-[13px] text-muted-foreground md:text-sm">
          {SERVICE_CATEGORIES[project.service].label}
        </span>
      </figcaption>
    </figure>
  );
}
