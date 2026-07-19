export const homepage = {
  hero: {
    title: "The modern local development environment for Windows",
    subtitle:
      "Apache, PHP, MySQL and phpMyAdmin in one free, open-source desktop application. No telemetry. No cloud dependency. Built for modern PHP development.",
    primaryCta: "Download for Windows",
    secondaryCta: "Read the Documentation",
    heroImage: "hero-dashboard.webp",
    trustBadges: [
      "MIT Licensed",
      "Open Source",
      "Windows 10/11",
      "Offline First",
    ],
    stackBadges: ["Apache", "PHP", "MySQL", "phpMyAdmin"],
  },
  openSourceStrip: [
    { label: "MIT Licensed", href: "/license" },
    { label: "GitHub", href: "https://github.com/DevStackBox/DevStackBox", external: true },
    { label: "Privacy First", href: "/privacy" },
    { label: "Offline", href: "/docs/advanced/environment" },
    { label: "No Telemetry", href: "/privacy" },
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
      title: "Manage your entire stack",
      description:
        "Start and stop Apache, MySQL, and PHP from a single dashboard. See status at a glance and open phpMyAdmin when you need it.",
      image: "showcase-services.webp",
      imagePosition: "right" as const,
    },
    {
      title: "Edit configs without leaving the app",
      description:
        "Tune Apache, PHP, and MySQL settings with guided UI - fixed paths under C:\\devstackbox so you always know where files live.",
      image: "showcase-config.webp",
      imagePosition: "left" as const,
    },
    {
      title: "A desktop app, not a control panel from 2005",
      description:
        "Dark and light themes, service health, backups, and a workflow designed for daily PHP development on Windows.",
      image: "showcase-dashboard.webp",
      imagePosition: "right" as const,
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
