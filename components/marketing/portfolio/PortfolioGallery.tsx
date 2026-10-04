"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import ProjectCard from "@/components/marketing/portfolio/ProjectCard";
import { PROJECTS } from "@/lib/portfolio";
import { SERVICE_CATEGORIES, SERVICE_TYPES, type ServiceType } from "@/lib/services";
import { cn } from "@/lib/utils";

// Only offer filters for services that have photos.
const FILTERS = SERVICE_TYPES.filter((type) => PROJECTS.some((p) => p.service === type));

const isFilter = (v: unknown): v is ServiceType =>
  typeof v === "string" && (FILTERS as string[]).includes(v);

const chip = (selected: boolean) =>
  cn(
    "flex min-h-11 shrink-0 cursor-pointer items-center rounded-full border px-4 text-[15px] font-medium transition-colors",
    selected
      ? "border-deep-space-blue bg-deep-space-blue text-vanilla-custard-900 dark:border-vanilla-custard-800 dark:bg-vanilla-custard-800 dark:text-deep-space-blue-400"
      : "border-border bg-background hover:border-vivid-tangerine",
  );

// Filters instantly in the browser; the URL (?service=chimney_cap) stays shareable.
export function PortfolioGallery({ initial = null }: { initial?: ServiceType | null }) {
  const [active, setActive] = useState<ServiceType | null>(initial);
  const projects = active ? PROJECTS.filter((p) => p.service === active) : PROJECTS;

  const pick = (service: ServiceType | null) => {
    setActive(service);
    window.history.replaceState(null, "", service ? `?service=${service}` : "/portfolio");
  };

  return (
    <div className="flex flex-col gap-5 md:gap-8">
      <div role="group" aria-label="Filter by service" className="flex gap-2 overflow-x-auto px-5 pb-1 md:flex-wrap md:px-0">
        <button type="button" aria-pressed={!active} onClick={() => pick(null)} className={chip(!active)}>
          All work
        </button>
        {FILTERS.map((type) => (
          <button
            key={type}
            type="button"
            aria-pressed={active === type}
            onClick={() => pick(type)}
            className={chip(active === type)}
          >
            {SERVICE_CATEGORIES[type].label}
          </button>
        ))}
      </div>

      <ul className="grid grid-cols-2 gap-x-3 gap-y-6 px-5 md:grid-cols-3 md:gap-x-5 md:gap-y-10 md:px-0">
        {projects.map((project) => (
          <li key={project.photo}>
            <ProjectCard project={project} sizes="(min-width: 768px) 360px, 50vw" />
          </li>
        ))}
      </ul>
    </div>
  );
}

// Reads ?service= after load, so the page itself can be prerendered.
export function PortfolioGalleryFromUrl() {
  const service = useSearchParams().get("service");
  return <PortfolioGallery initial={isFilter(service) ? service : null} />;
}
