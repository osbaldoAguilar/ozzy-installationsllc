import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

// TODO: Story + TrustBand — content from Sanity `siteCopy`
// (fireplace experience since 2008, company founded 2020).

export default function AboutPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-24">
      <h1 className="text-4xl">About</h1>
    </section>
  );
}
