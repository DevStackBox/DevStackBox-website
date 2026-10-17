import type { Metadata } from "next";
import { SeoLanding } from "@/components/marketing/seo-landing";
import { stackVersions } from "@/content/stack-versions";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  path: "/vs/laragon",
  title: "DevStackBox vs Laragon",
  description: "Compare DevStackBox and Laragon - free MIT stack vs paid Pro features on Windows.",
  ogImage: "/og/vs-laragon.png",
});

export default function VsLaragonPage() {
  return (
    <SeoLanding
      title="DevStackBox vs Laragon"
      intro="Laragon Pro adds paid features. DevStackBox is fully open source (MIT) with PHP 8.3 bundled and PHP up to 8.5 in the app."
      bullets={[
        `DevStackBox: PHP ${stackVersions.php.bundledLabel} + optional ${stackVersions.php.onDemandBranches.join(", ")}`,
        "No subscription for unlimited local sites",
        "Same Apache + MySQL + phpMyAdmin workflow you expect",
      ]}
    />
  );
}
