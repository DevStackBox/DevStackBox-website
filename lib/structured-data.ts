import { siteConfig } from "@/content/homepage";
import { pageUrl } from "@/lib/page-metadata";

type Breadcrumb = { label: string; href?: string };

const FAQ_ENTRIES = [
  {
    question: "What is DevStackBox?",
    answer:
      "DevStackBox is a free, open-source local PHP development stack for Windows. It bundles Apache, MySQL, PHP, and phpMyAdmin in a single desktop app with a modern UI.",
  },
  {
    question: "Is DevStackBox free?",
    answer:
      "Yes. DevStackBox is MIT-licensed open source. There is no paid tier.",
  },
  {
    question: "Where does DevStackBox install?",
    answer:
      "The application installs to C:\\devstackbox by default. User data is stored in %LOCALAPPDATA%\\DevStackBox\\.",
  },
  {
    question: "Does DevStackBox collect telemetry?",
    answer:
      "No. DevStackBox does not collect usage data or phone home.",
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
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteConfig.url}/docs?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.email,
      sameAs: [siteConfig.githubUrl],
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: siteConfig.name,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Windows 10, Windows 11",
      description:
        "Apache, PHP, MySQL and phpMyAdmin in one free, open-source desktop application for Windows.",
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
