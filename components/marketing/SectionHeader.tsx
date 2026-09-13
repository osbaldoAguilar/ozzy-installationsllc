import Link from "next/link";


const NAV = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
] as const;


export default function SectionHeader() {
  return (
    <header className="border-b border-border">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-6">
        <Link href="/" className="font-heading text-lg font-semibold">
          Ozzy Installations
        </Link>
        <div className="ml-auto flex items-center gap-6 text-sm">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-4xl bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/80"
          >
            Get a Quote
          </Link>
        </div>
      </nav>
    </header>
  );
}
