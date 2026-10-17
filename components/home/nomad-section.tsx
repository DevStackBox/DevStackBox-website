export function NomadSection() {
  return (
    <section className="section-py mx-auto max-w-6xl px-4 sm:px-6">
      <div className="rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-card to-card p-8 sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">Built by Nomad Programmer</p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
          From the Hinglish PHP channel to your desktop
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          DevStackBox is maintained by Nomad Programmer - practical PHP tutorials for Windows developers. Install
          once, run locally, no telemetry.
        </p>
        <a
          href="https://www.youtube.com/@NomadProgrammer"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary mt-6 inline-flex"
        >
          Watch on YouTube
        </a>
      </div>
    </section>
  );
}
