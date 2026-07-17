export const homepage = {
  hero: {
    title: "Local PHP development for Windows",
    subtitle:
      "Apache, MySQL, PHP, and phpMyAdmin in one free, open-source desktop app. No telemetry. No cloud dependency.",
    primaryCta: "Download for Windows",
    secondaryCta: "Read the docs",
  },
  features: [
    {
      title: "All-in-one stack",
      description:
        "Apache, PHP, MySQL, and phpMyAdmin bundled and ready to start from a modern desktop UI.",
    },
    {
      title: "Fixed, predictable paths",
      description:
        "Installs to C:\\devstackbox with app data in %LOCALAPPDATA%\\devstackbox - easy to find and back up.",
    },
    {
      title: "Built for developers",
      description:
        "Config editing, SSL, backups, dark/light themes, and English & Hindi UI - without XAMPP-style manual wiring.",
    },
    {
      title: "Your machine stays yours",
      description:
        "No accounts, no telemetry, no phone-home. Works offline for everyday local development.",
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
} as const;
