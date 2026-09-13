import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
};

// TODO: Gallery (next/image, lazy) — content from Sanity `portfolioItem`.

export default function PortfolioPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-24">
      <h1 className="text-4xl">Portfolio</h1>
    </section>
  );
}
