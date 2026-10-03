import type { Metadata } from "next";
import { Geist_Mono, Figtree, Fraunces } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-serif" });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Ozzy Installations",
    default: "Ozzy Installations — Fireplace & hearth installers in the Triangle, NC",
  },
  description:
    "Family-owned fireplace installers serving Raleigh, Durham, Cary and Wake Forest since 2008. Gas, wood and electric fireplaces, chimney caps, hearths and mantels.",
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
