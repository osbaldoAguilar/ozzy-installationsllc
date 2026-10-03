import type { Metadata } from "next";
import Link from "next/link";

import Contact from "@/components/marketing/contact/Contact";
import BeforeAfter from "@/components/marketing/portfolio/BeforeAfter";
import ProjectCard from "@/components/marketing/portfolio/ProjectCard";
import PageHero from "@/components/marketing/PageHero";
import { PHOTOS } from "@/lib/cloudinary";
import { PROJECTS } from "@/lib/portfolio";
import { SERVICE_CATEGORIES, SERVICE_TYPES, type ServiceType } from "@/lib/services";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Fireplace installations, chimney caps, hearths and mantels by Ozzy Installations across North Carolina.",
};

// Only offer filters for services that have photos.
const FILTERS = SERVICE_TYPES.filter((type) => PROJECTS.some((p) => p.service === type));

const isFilter = (v: unknown): v is ServiceType =>
  typeof v === "string" && (FILTERS as string[]).includes(v);

export default async function PortfolioPage(props: PageProps<"/portfolio">) {
  // Filters are plain links (?service=chimney_cap) — shareable and no JS needed.
  const { service } = await props.searchParams;
  const active = isFilter(service) ? service : null;
  const projects = active ? PROJECTS.filter((p) => p.service === active) : PROJECTS;

  const chip = (selected: boolean) =>
    cn(
      "flex min-h-11 shrink-0 items-center rounded-full border px-4 text-[15px] font-medium transition-colors",
      selected
        ? "border-deep-space-blue bg-deep-space-blue text-vanilla-custard-900"
        : "border-border bg-background hover:border-vivid-tangerine",
    );

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Our work, start to finish"
        photo={PHOTOS.afterShiplap}
        position="object-[50%_60%]"
      >
        <p className="max-w-xl text-[17px] leading-relaxed text-vanilla-custard md:text-xl">
          Real jobs from homes, remodels and commercial builds across North Carolina.
        </p>
      </PageHero>

      <section>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 py-12 md:gap-12 md:px-6 md:py-20">
          <BeforeAfter />

          <div className="flex flex-col gap-5 md:gap-8">
            <nav aria-label="Filter by service" className="flex gap-2 overflow-x-auto px-5 pb-1 md:flex-wrap md:px-0">
              <Link href="/portfolio" scroll={false} aria-current={!active ? "page" : undefined} className={chip(!active)}>
                All work
              </Link>
              {FILTERS.map((type) => (
                <Link
                  key={type}
                  href={`/portfolio?service=${type}`}
                  scroll={false}
                  aria-current={active === type ? "page" : undefined}
                  className={chip(active === type)}
                >
                  {SERVICE_CATEGORIES[type].label}
                </Link>
              ))}
            </nav>

            <ul className="grid grid-cols-2 gap-x-3 gap-y-6 px-5 md:grid-cols-3 md:gap-x-5 md:gap-y-10 md:px-0">
              {projects.map((project) => (
                <li key={project.photo}>
                  <ProjectCard project={project} sizes="(min-width: 768px) 360px, 50vw" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
