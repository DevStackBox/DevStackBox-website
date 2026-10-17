import type { Metadata } from "next";
import { SeoLanding } from "@/components/marketing/seo-landing";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  path: "/migrate-from-xampp",
  title: "Migrate from XAMPP",
  description: "Move projects from XAMPP to DevStackBox on Windows - copy htdocs and import databases with the in-app wizard.",
  ogImage: "/og/migrate-from-xampp.png",
});

export default function MigrateFromXamppPage() {
  return (
    <SeoLanding
      title="Migrate from XAMPP to DevStackBox"
      intro="Install DevStackBox, then use Import from XAMPP in the app to copy your htdocs folder. Export MySQL from phpMyAdmin in XAMPP and import into DevStackBox if you need existing databases."
      bullets={[
        "Default XAMPP path: C:\\xampp",
        "Projects land in DevStackBox www folder",
        "PHP 8.3 works immediately; add 8.4 or 8.5 from PHP Versions",
      ]}
    />
  );
}
