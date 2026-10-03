import SectionHeading from "@/components/marketing/SectionHeading";
import { GOOGLE_REVIEWS_URL, REVIEWS } from "@/lib/reviews";
import { cn } from "@/lib/utils";

export default function Reviews() {
  // Hidden until real reviews are added to lib/reviews.ts — no placeholder quotes on the live site.
  if (REVIEWS.length === 0) return null;

  return (
    <section id="reviews" className="border-y border-vanilla-custard-700 bg-vanilla-custard-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 py-14 md:gap-10 md:px-6 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6 px-5 md:px-0">
          <SectionHeading eyebrow="Reviews" title="What our customers say" />
          {GOOGLE_REVIEWS_URL && (
            <a
              href={GOOGLE_REVIEWS_URL}
              className="hidden min-h-11 items-center border-b-2 border-vivid-tangerine font-semibold md:inline-flex"
            >
              Read all reviews on Google
            </a>
          )}
        </div>
        <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
          {REVIEWS.map((review) => (
            <li key={review.quote} className="w-72 shrink-0 snap-start md:w-auto">
              <figure
                className={cn(
                  "flex h-full flex-col justify-between gap-5 rounded-2xl p-6 md:gap-6 md:p-7",
                  review.builder
                    ? "bg-deep-space-blue text-vanilla-custard-900"
                    : "border border-vanilla-custard-700 bg-background",
                )}
              >
                <blockquote className="font-heading text-lg leading-snug md:text-xl">
                  “{review.quote}”
                </blockquote>
                <figcaption className="flex flex-col gap-0.5">
                  <span className="font-semibold">{review.name}</span>
                  <span
                    className={cn(
                      "text-sm",
                      review.builder ? "text-deep-space-blue-900" : "text-muted-foreground",
                    )}
                  >
                    {review.detail}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
