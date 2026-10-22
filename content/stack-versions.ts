/** Marketing copy for bundled vs in-app stack - keep in sync with DevStackBox releases. */
export const stackVersions = {
  php: {
    bundledBranch: "8.3",
    bundledLabel: "8.3.36",
    supportedBranches: ["8.5", "8.4", "8.3", "8.2"] as const,
    latestSupportedBranch: "8.5",
    onDemandBranches: ["8.5", "8.4", "8.2"] as const,
  },
  apache: { bundledLabel: "2.4.65" },
  mysql: { bundledLabel: "8.4.11 LTS" },
  phpMyAdmin: { bundledLabel: "5.2.2" },
  xamppWindowsPhp: "8.2",
} as const;

export const positioning = {
  headline: "The free XAMPP alternative for Windows",
  subhead:
    "Apache, MySQL, and PHP 8.3 in one installer. Add PHP 8.2–8.5 from the app. MIT licensed. No site limits.",
} as const;
