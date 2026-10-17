import { MarkdownPage } from "@/components/markdown-page";
import { readRootMarkdown } from "@/lib/markdown";
import { buildPageMetadata } from "@/lib/page-metadata";
export const metadata = buildPageMetadata({path:"/privacy",title:"Privacy",description:"How the DevStackBox desktop app and website handle data, downloads, and optional analytics."});
export default function PrivacyPage() {
  const analytics = Boolean(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN);
  const website = "\n\n## This website\n\nThis website does not require an account or accept project or database uploads. Our hosting provider processes requests to deliver pages and assets, which can include your IP address, browser information, and requested URL.\n\n" + (analytics ? "This deployment enables Plausible website analytics. See [Plausible data policy](https://plausible.io/data-policy) for how it handles analytics data." : "Plausible analytics is not enabled in this website build.") + "\n\nYour light/dark theme choice can be stored in your browser. Download and source links take you to GitHub; GitHub processes those requests under its own privacy policy. Documentation searches are sent to this website's search endpoint.\n\nThe desktop application's no-telemetry statement is separate from requests made when visiting this website. Contact hello@devstackbox.com with privacy questions.";
  return <MarkdownPage title="Privacy" description="Desktop application and website data handling." markdown={readRootMarkdown("PRIVACY.md") + website} />;
}
