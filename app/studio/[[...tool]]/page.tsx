// Embedded Sanity Studio at /studio (docs/architecture-v1.md §1).
// TODO: once `next-sanity` + sanity.config.ts land, replace this with:
//   import { NextStudio } from "next-sanity/studio";
//   import config from "@/sanity.config";
//   export default function StudioPage() { return <NextStudio config={config} /> }

export default function StudioPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-24">
      <h1 className="text-4xl">Studio</h1>
      <p className="mt-2 text-muted-foreground">Sanity Studio is not wired up yet.</p>
    </section>
  );
}
