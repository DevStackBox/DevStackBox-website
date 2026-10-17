import type { Metadata } from "next";
import { SeoLanding } from "@/components/marketing/seo-landing";
import { stackVersions } from "@/content/stack-versions";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  path: "/xampp-alternative",
  title: "XAMPP alternative for Windows",
  description: `DevStackBox is a free XAMPP alternative with PHP ${stackVersions.php.bundledLabel} bundled and PHP ${stackVersions.php.latestSupportedBranch} on demand.`,
  ogImage: "/og/xampp-alternative.png",
});

export default function XamppAlternativePage() {
  return (
    <SeoLanding
      title="XAMPP alternative for Windows"
      intro={`XAMPP for Windows ships PHP ${stackVersions.xamppWindowsPhp}. DevStackBox installs PHP ${stackVersions.php.bundledLabel} and lets you add PHP ${stackVersions.php.latestSupportedBranch} without a second stack.`}
      bullets={[
        "One MIT-licensed desktop app for Apache, MySQL, phpMyAdmin, and PHP",
        "Unlimited local sites - no paid tier",
        "Offline-friendly after install",
      ]}
    />
  );
}
