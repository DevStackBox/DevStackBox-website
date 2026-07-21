import type { Metadata } from "next";
import { RootProvider } from "fumadocs-ui/provider/next";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/content/homepage";
import { buildPageMetadata, DEFAULT_OG_IMAGE } from "@/lib/page-metadata";
import { websiteSchemas } from "@/lib/structured-data";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  ...buildPageMetadata({
    path: "/",
    description:
      "Apache, PHP, MySQL and phpMyAdmin in one free, open-source desktop application for Windows. No telemetry. No cloud dependency.",
  }),
  title: {
    default: "DevStackBox - Modern local PHP development for Windows",
    template: "%s · DevStackBox",
  },
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: siteConfig.name }],
  },
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
        <RootProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </RootProvider>
      </body>
    </html>
  );
}
