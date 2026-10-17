import { siteConfig } from "@/content/homepage";
import { stackVersions } from "@/content/stack-versions";
import { pageUrl } from "@/lib/page-metadata";

export const ORGANIZATION_LOGO = `${siteConfig.url}/brand/icon-512.png`;

type Breadcrumb = { label: string; href?: string };

const FAQ_ENTRIES = [
  {
    question: "What is DevStackBox?",
    answer:
      "DevStackBox is a free XAMPP alternative for Windows with Apache, MySQL 8.4 LTS, phpMyAdmin, and PHP 8.3 in one desktop app.",
  },
  {
    question: "Which PHP versions are supported?",
    answer: `PHP ${stackVersions.php.bundledLabel} ships in the installer. PHP ${stackVersions.php.onDemandBranches.join(", ")} can be downloaded in the app (latest: ${stackVersions.php.latestSupportedBranch}).`,
  },
  {
    question: "Is DevStackBox free?",
    answer:
      "Yes. DevStackBox is MIT-licensed open source. There is no paid tier.",
  },
  {
    question: "Where does DevStackBox install?",
    answer:
      "The application installs to C:\\devstackbox by default. User data is stored in %LOCALAPPDATA%\\devstackbox\\.",
  },
  {
    question: "Does DevStackBox collect telemetry?",
    answer:
      "DevStackBox does not collect usage telemetry. Optional update checks and downloads make network requests.",
  },
];

export function websiteSchemas() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
      description:
        "Apache, PHP, MySQL and phpMyAdmin in one free, open-source desktop application for Windows.",
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.email,
      logo: ORGANIZATION_LOGO,
      sameAs: [siteConfig.githubUrl],
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: siteConfig.name,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Windows 10, Windows 11",
      description:
        "Free XAMPP alternative: PHP 8.3 bundled, PHP up to 8.5 in app, MySQL 8.4 LTS, Apache, phpMyAdmin.",
      featureList: [
        "PHP 8.3 bundled; PHP 8.1–8.5 on demand",
        "MySQL 8.4 LTS",
        "Import from XAMPP",
        "No telemetry",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      url: siteConfig.url,
      downloadUrl: `${siteConfig.url}/download`,
    },
  ];
}

export function docArticleSchema({
  slug,
  title,
  description,
  modifiedTime,
}: {
  slug: string;
  title: string;
  description?: string;
  modifiedTime?: string | null;
}) {
  const path = slug ? `/docs/${slug}` : "/docs";
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description,
    url: pageUrl(path),
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: ORGANIZATION_LOGO,
    },
    ...(modifiedTime ? { dateModified: modifiedTime } : {}),
  };
}

export function breadcrumbSchema(crumbs: Breadcrumb[]) {
  const items = crumbs
    .filter((c) => c.href)
    .map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: pageUrl(c.href!),
    }));
  if (items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

export function faqPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ENTRIES.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };
}

export function docPageSchemas({
  slug,
  title,
  description,
  crumbs,
  modifiedTime,
}: {
  slug: string;
  title: string;
  description?: string;
  crumbs: Breadcrumb[];
  modifiedTime?: string | null;
}) {
  const schemas: object[] = [
    docArticleSchema({ slug, title, description, modifiedTime }),
  ];
  const breadcrumbs = breadcrumbSchema(crumbs);
  if (breadcrumbs) schemas.push(breadcrumbs);
  if (slug === "faq") schemas.push(faqPageSchema());
  return schemas;
}
