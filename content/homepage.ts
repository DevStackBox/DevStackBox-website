export const homepage = {
  hero: {
    title: "The free XAMPP alternative for Windows.",
    subtitle:
      "Apache, MySQL, and PHP 8.3 in one installer. v0.1.12 adds project workspaces, per-site PHP, and trusted local HTTPS. MIT licensed, no site limits.",
    primaryCta: "Download for Windows",
    secondaryCta: "Read the Documentation",
    heroImage: "app/services-preview.jpg",
    trustBadges: ["MIT Licensed", "Windows 10/11", "No telemetry"],
    stackBadges: ["PHP 8.3 bundled", "PHP 8.5 in app", "MySQL 8.4.11", "Apache 2.4"],
  },
  openSourceStrip: [
    { label: "MIT Licensed", href: "/license" },
    { label: "GitHub", href: "https://github.com/DevStackBox/DevStackBox", external: true },
    { label: "Privacy First", href: "/privacy" },
    { label: "Windows desktop app", href: "/download" },
  ],
  features: [
    {
      icon: "Layers" as const,
      title: "All-in-one stack",
      description:
        "Apache, PHP, MySQL, and phpMyAdmin bundled and ready to start from a modern desktop UI.",
    },
    {
      icon: "Shield" as const,
      title: "Privacy by default",
      description:
        "No accounts or usage telemetry. Your projects and data stay on your machine.",
    },
    {
      icon: "Zap" as const,
      title: "Start in seconds",
      description:
        "Start and stop services from one place instead of juggling separate installers and control panels.",
    },
    {
      icon: "Wrench" as const,
      title: "Built for developers",
      description:
        "Config editing, SSL, backups, and English & Hindi UI - without manual stack wiring.",
    },
  ],
  builtFor: [
    "PHP",
    "Laravel",
    "WordPress",
    "CodeIgniter",
    "Symfony",
    "Drupal",
  ],
  featureShowcase: [
    { title: "Your project workspace", description: "Connect a .test hostname, pick an installed PHP runtime per site, and enable trusted HTTPS from project details.", image: "app/projects-preview.jpg" },
    { title: "Website health and HTTPS", description: "Real project details: HTTP 200 and trusted HTTPS checked separately, with folder and document-root settings below.", image: "app/project-details-preview.jpg" },
    {
      title: "Manage your stack",
      description:
        "Start Apache and MySQL, inspect versions and ports, and open phpMyAdmin from one dashboard.",
      image: "app/services-preview.jpg",
    },
    {
      title: "Choose your PHP runtime",
      description:
        "Download PHP 8.1–8.5 in PHP Versions, then select an installed runtime per website. Terminal sessions still use global PHP.",
      image: "app/php-85-download-1202x831.png",
    },
  ],
  docLinks: [
    {
      label: "Install DevStackBox",
      href: "/docs/getting-started/installation",
      description: "Download the Windows installer and get running.",
    },
    {
      label: "Your first project",
      href: "/docs/getting-started/projects",
      description: "Connect a folder, choose PHP, and configure local HTTPS.",
    },
    {
      label: "Upgrade in place",
      href: "/docs/getting-started/upgrading",
      description: "Update without losing your sites or data.",
    },
    {
      label: "Troubleshooting",
      href: "/docs/advanced/troubleshooting",
      description: "Common errors, fixes, and known issues.",
    },
  ],
  systemRequirements: [
    "Windows 10 or Windows 11 (64-bit)",
    "Administrator rights for installation",
    "~500 MB disk space for the full stack",
  ],
} as const;

export const siteConfig = {
  name: "DevStackBox",
  url: "https://www.devstackbox.com",
  githubUrl: "https://github.com/DevStackBox/DevStackBox",
  githubOrg: "DevStackBox/DevStackBox",
  email: "hello@devstackbox.com",
  /** Hide GitHub star/fork counts on marketing pages below this threshold. */
  minStarsToShowStats: 25,
} as const;

export type FeatureIcon = (typeof homepage.features)[number]["icon"];
