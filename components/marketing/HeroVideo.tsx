export default function HeroVideo() {
  return (
    <section className="relative flex h-[80vh] min-h-[500px] w-full items-center justify-center overflow-hidden text-vanilla-custard-900">
      {/* Background video. Decorative, so it's hidden from assistive tech.
          The navy fill shows while the file is still buffering. */}
      <div className="absolute inset-0 z-0 bg-deep-space-blue">
        <video
          src="/hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-deep-space-blue/50" />
      </div>

      <div className="z-10 container mx-auto max-w-3xl px-4 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">
          Experience Innovation in Motion
        </h1>
        <p className="mb-8 text-lg text-vanilla-custard md:text-xl">
          A dynamic visual experience designed to captivate your audience immediately.
        </p>
        <button className="rounded-4xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/80">
          Watch More
        </button>
      </div>
    </section>
  );
}
