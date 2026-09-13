import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

// TODO: ContactForm + ServiceSelect -> Server Action -> Drizzle/Neon + Resend
// (see docs/architecture-v1.md §6).

export default function ContactPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-24">
      <h1 className="text-4xl">Contact</h1>
    </section>
  );
}
