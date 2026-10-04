import { notFound } from "next/navigation";

// Service detail pages: OPTIONAL for v1 (docs/architecture-v1.md §5).
// 404 until they're built so random /services/<anything> urls don't render a page.
// TODO: fetch the Sanity `service` by slug and render it; keep notFound() for unknown slugs.

export default async function ServiceDetailPage(
  props: PageProps<"/services/[slug]">,
) {
  await props.params;
  notFound();
}
