export const homepage = {
  hero: {
    title: "Your local PHP stack, ready on Windows.",
    subtitle:
      "Run Apache, PHP, and MySQL from one desktop app. Keep your projects on your PC, manage the stack in one place, and get started without stitching together separate installers.",
    primaryCta: "Download for Windows",
    secondaryCta: "Read the Documentation",
    heroImage: "services-dashboard.jpg",
    trustBadges: ["MIT Licensed", "Windows 10/11", "No telemetry"],
    stackBadges: ["Apache", "PHP", "MySQL", "phpMyAdmin"],
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
        "No accounts, no telemetry, no phone-home. Your projects and data stay on your machine.",
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
    {
      title: "Manage your stack",
      description:
        "Start and stop Apache and MySQL, check versions and ports, and open phpMyAdmin from one screen.",
      image: "services-dashboard.jpg",
    },
    {
      title: "Keep project work in one place",
      description:
        "Browse local projects and manage virtual hosts, logs, and configuration from the same Windows app.",
      image: "projects.jpg",
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
      href: "/docs",
      description: "Overview of the stack, folders, and next steps.",
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
