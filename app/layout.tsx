import type { Metadata } from "next";
import { RootProvider } from "fumadocs-ui/provider/next";
import { Analytics } from "@/components/analytics";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/content/homepage";
import { buildPageMetadata } from "@/lib/page-metadata";
import { websiteSchemas } from "@/lib/structured-data";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-geist-sans'});

export const metadata: Metadata = {
  ...buildPageMetadata({
    path: "/",
    description:
      "Free XAMPP alternative for Windows: PHP 8.3 in the installer, PHP up to 8.5 in the app, MySQL 8.4 LTS, Apache, phpMyAdmin. MIT licensed.",
  }),
  title: {
    default: "DevStackBox - Modern local PHP development for Windows",
    template: "%s · DevStackBox",
  },
  metadataBase: new URL(siteConfig.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <JsonLd data={websiteSchemas()} />
        <Analytics />
        <RootProvider>
          <a href="#main-content" className="skip-link">Skip to content</a>
          <SiteHeader />
          <main id="main-content" tabIndex={-1} className="min-w-0 flex-1">{children}</main>
          <SiteFooter />
        </RootProvider>
      </body>
    </html>
  );
}
