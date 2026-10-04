import { notFound } from "next/navigation";

// Embedded Sanity Studio at /studio (docs/architecture-v1.md §1).
// 404 until it's wired up so the public site doesn't show a placeholder.
// TODO: once `next-sanity` + sanity.config.ts land, replace this with:
//   import { NextStudio } from "next-sanity/studio";
//   import config from "@/sanity.config";
//   export default function StudioPage() { return <NextStudio config={config} /> }

export default function StudioPage() {
  notFound();
}
