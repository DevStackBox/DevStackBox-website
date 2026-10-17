import { stackVersions } from "@/content/stack-versions";

export function StackVersionsSection() {
  const { php, apache, mysql, phpMyAdmin } = stackVersions;

  return (
    <section className="section-py mx-auto max-w-6xl px-4 sm:px-6">
      <h2 className="text-section mb-3 text-center">What you get</h2>
      <p className="text-body mx-auto mb-10 max-w-2xl text-center text-muted-foreground">
        PHP {php.bundledBranch} ships in the installer. Branches through PHP {php.latestSupportedBranch} are
        available inside the app.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold">In the installer</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>PHP {php.bundledLabel} (default)</li>
            <li>Apache {apache.bundledLabel}</li>
            <li>MySQL {mysql.bundledLabel}</li>
            <li>phpMyAdmin {phpMyAdmin.bundledLabel}</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold">In the app (on demand)</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              PHP {php.onDemandBranches.join(", ")} - latest supported:{" "}
              <span className="font-medium text-foreground">{php.latestSupportedBranch}</span>
            </li>
            <li>Switch versions from Services → PHP → Versions</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
