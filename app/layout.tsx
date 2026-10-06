import type { Metadata } from "next";
import { Geist_Mono, Figtree, Fraunces } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-serif" });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Absolute base for share images and links (app/opengraph-image.jpg, sitemap).
  metadataBase: new URL(SITE.url),
  title: {
    template: "%s | Ozzy Installations",
    default: "Ozzy Installations — Fireplace & hearth installers in the Triangle, NC",
  },
  description:
    `Family-owned fireplace installers serving Raleigh, Durham, Cary and Wake Forest, installing fireplaces since ${SITE.experienceSince}. Gas, wood and electric fireplaces, chimney caps, hearths and mantels.`,
  openGraph: { type: "website", siteName: SITE.name, locale: "en_US" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        fraunces.variable,
        geistMono.variable,
        "font-sans",
        figtree.variable,
      )}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
