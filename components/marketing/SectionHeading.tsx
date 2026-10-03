import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  children,
  className,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div className={cn("flex max-w-2xl flex-col gap-3.5", className)}>
      <p
        className={cn(
          "text-[13px] font-semibold tracking-[0.08em] uppercase md:text-sm",
          dark ? "text-sunflower-gold" : "text-vivid-tangerine-400",
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "text-3xl leading-[1.12] text-balance md:text-5xl md:leading-[1.1]",
          dark && "text-vanilla-custard-900",
        )}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
