import Link from "next/link";

import BeforeAfter from "@/components/marketing/portfolio/BeforeAfter";
import ProjectCard from "@/components/marketing/portfolio/ProjectCard";
import SectionHeading from "@/components/marketing/SectionHeading";
import { PROJECTS } from "@/lib/portfolio";

export default function Portfolio() {
  const featured = PROJECTS.filter((p) => p.featured);

  return (
    <section id="work" className="scroll-mt-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 py-14 md:gap-10 md:px-6 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6 px-5 md:px-0">
          <SectionHeading eyebrow="Recent work" title="Installed across North Carolina" />
          <Link
            href="/portfolio"
            className="hidden min-h-11 items-center border-b-2 border-vivid-tangerine font-semibold md:inline-flex"
          >
            View the portfolio
          </Link>
        </div>
        <BeforeAfter />
        {/* Swipe row on phones, 3-up grid on desktop. */}
        <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
          {featured.map((project) => (
            <li key={project.photo} className="w-64 shrink-0 snap-start md:w-auto">
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
        <Link
          href="/portfolio"
          className="mx-5 flex min-h-12 items-center justify-center rounded-full border border-border font-semibold md:hidden"
        >
          View the portfolio
        </Link>
      </div>
    </section>
  );
}
