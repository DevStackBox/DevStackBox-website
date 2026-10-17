import { ComparisonPage } from "@/components/marketing/comparison-page";
import { buildPageMetadata } from "@/lib/page-metadata";
import { laragonPrice } from "@/content/comparisons";
export const metadata = buildPageMetadata({path:"/vs/laragon",title:"DevStackBox vs Laragon",description:"Compare two Windows development environments: DevStackBox's MIT-licensed PHP stack and Laragon's non-commercial and commercial licensing."});
export default function Page() { return <ComparisonPage title="DevStackBox vs Laragon" competitor="Laragon" intro="Two ways to build locally on Windows. DevStackBox focuses on an open-source PHP stack; Laragon offers a broader environment for multiple languages and services." rows={[
["Price", "Free (MIT)", laragonPrice], ["Local sites","Unlimited","Unlimited"], ["Platform","Windows 10/11 x64","Windows"], ["Stack","Apache, PHP, MySQL 8.4 LTS, phpMyAdmin","Configurable services and multiple runtimes"], ["PHP versions","PHP 8.3 bundled; additional branches in the app","Multiple versions supported"],
]} tradeoff="Choose DevStackBox for an MIT-licensed Apache and MySQL workflow with no commercial license purchase. Consider Laragon if its broader runtime support, portability, and established workflows suit your projects. Check the licensing terms for your use." source="https://laragon.org/pricing" sourceLabel="Official Laragon pricing" />; }
