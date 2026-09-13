// Service detail — OPTIONAL for v1 (docs/architecture-v1.md §5).
// TODO: fetch the Sanity `service` by slug and 404 via notFound() when missing.

export default async function ServiceDetailPage(
  props: PageProps<"/services/[slug]">,
) {
  const { slug } = await props.params;

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-24">
      <h1 className="text-4xl">{slug}</h1>
    </section>
  );
}
