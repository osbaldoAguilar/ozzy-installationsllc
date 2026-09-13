export default function SectionFooter() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto w-full max-w-6xl px-6 py-8 text-sm text-secondary-foreground">
        &copy; {new Date().getFullYear()} Ozzy Installations LLC
      </div>
    </footer>
  );
}
