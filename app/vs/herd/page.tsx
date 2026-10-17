import type { Metadata } from "next";
import { SeoLanding } from "@/components/marketing/seo-landing";
import { stackVersions } from "@/content/stack-versions";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  path: "/vs/herd",
  title: "DevStackBox vs Herd",
  description: "DevStackBox is a free, open-source Windows PHP stack. Compare with Herd for local Laravel development.",
  ogImage: "/og/vs-herd.png",
});

export default function VsHerdPage() {
  return (
    <SeoLanding
      title="DevStackBox vs Herd"
      intro="Herd targets macOS and Windows with a paid model. DevStackBox is MIT-licensed for Windows with PHP 8.3 out of the box and MySQL 8.4 LTS."
      bullets={[
        "No account required",
        `PHP through ${stackVersions.php.latestSupportedBranch} via in-app download`,
        "Full control of Apache and MySQL configs",
      ]}
    />
  );
}
