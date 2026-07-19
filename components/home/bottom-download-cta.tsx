import Link from "next/link";
import { Download } from "lucide-react";
import { homepage } from "@/content/homepage";

export function BottomDownloadCta() {
  return (
    <section className="section-py mx-auto max-w-6xl px-4 text-center sm:px-6">
      <h2 className="text-section">Ready to develop locally?</h2>
      <p className="text-body mx-auto mt-3 max-w-lg">
        Download DevStackBox for Windows and start Apache, MySQL, and PHP from
        one desktop app.
      </p>
      <Link href="/download" className="btn-primary mt-8">
        <Download className="h-4 w-4" />
        {homepage.hero.primaryCta}
      </Link>
    </section>
  );
}
