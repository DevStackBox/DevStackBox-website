import { Check } from "lucide-react";
import { stackVersions } from "@/content/stack-versions";

export function StackIncludedPanel() {
  const { php, apache, mysql, phpMyAdmin } = stackVersions;

  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <div>
        <h2 className="text-lg font-semibold">In the installer</h2>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
            PHP {php.bundledLabel} (default runtime)
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
            Apache {apache.bundledLabel}
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
            MySQL {mysql.bundledLabel}
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
            phpMyAdmin {phpMyAdmin.bundledLabel}
          </li>
        </ul>
      </div>
      <div>
        <h2 className="text-lg font-semibold">Add in the app</h2>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
            PHP {php.onDemandBranches.join(", ")} (latest: {php.latestSupportedBranch})
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
            Download from Services → PHP → Versions
          </li>
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">
          PHP 8.4 and 8.5 are not bundled in the installer.
        </p>
      </div>
    </div>
  );
}
