import Link from "next/link";
import { laragonPrice, comparisonChecked } from "@/content/comparisons";
import { stackVersions } from "@/content/stack-versions";

const rows = [
  {
    label: "Price",
    devstackbox: "Free (MIT)",
    xampp: "Free",
    laragon: laragonPrice,
  },
  {
    label: "PHP in installer",
    devstackbox: `${stackVersions.php.bundledLabel} (+ up to ${stackVersions.php.latestSupportedBranch} in app)`,
    xampp: stackVersions.xamppWindowsPhp,
    laragon: "Varies",
  },
  {
    label: "Database",
    devstackbox: stackVersions.mysql.bundledLabel,
    xampp: "MariaDB 10.4.32",
    laragon: "MySQL / MariaDB",
  },
  {
    label: "Site limits",
    devstackbox: "Unlimited",
    xampp: "Unlimited",
    laragon: "Unlimited",
  },
  {
    label: "Desktop UI",
    devstackbox: "Windows desktop app",
    xampp: "Control panel",
    laragon: "Desktop app",
  },
] as const;

export function ComparisonTable() {
  return (
    <section className="section-py mx-auto max-w-6xl px-4 sm:px-6">
      <h2 className="text-section mb-3 text-center">DevStackBox vs XAMPP vs Laragon</h2>
      <p className="text-body mx-auto mb-8 max-w-xl text-center text-muted-foreground">
        XAMPP for Windows still ships older PHP. DevStackBox gives you PHP {stackVersions.php.bundledBranch}{" "}
        immediately and {stackVersions.php.latestSupportedBranch} when you need it.
      </p>
      <div role="region" aria-label="Local stack comparison" tabIndex={0} className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[640px] text-left text-sm">
          <caption className="sr-only">Windows PHP development environments</caption>
          <thead className="border-b border-border bg-muted/40">
            <tr>
              <th className="px-4 py-3 font-semibold" scope="col">Feature</th>
              <th className="px-4 py-3 font-semibold" scope="col">
                DevStackBox
              </th>
              <th className="px-4 py-3 font-semibold" scope="col">
                XAMPP (Windows)
              </th>
              <th className="px-4 py-3 font-semibold" scope="col">
                Laragon
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-border last:border-0">
                <th className="px-4 py-3 font-medium text-muted-foreground" scope="row">
                  {row.label}
                </th>
                <td className="px-4 py-3">{row.devstackbox}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.xampp}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.laragon}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs leading-6 text-muted-foreground">Checked {comparisonChecked}. Laragon commercial prices are for one device. Sources: <a href="https://www.apachefriends.org/download.html" className="link-primary">XAMPP downloads</a> · <a href="https://laragon.org/pricing" className="link-primary">Laragon pricing</a>.</p>
      <div className="mt-5 flex flex-wrap gap-5 text-sm"><Link href="/xampp-alternative" className="link-primary">Compare XAMPP →</Link><Link href="/vs/laragon" className="link-primary">Compare Laragon →</Link><Link href="/vs/herd" className="link-primary">Compare Herd →</Link></div>
    </section>
  );
}
