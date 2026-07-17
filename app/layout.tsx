import type { Metadata } from "next";
import { RootProvider } from "fumadocs-ui/provider/next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/content/homepage";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "DevStackBox - Local PHP development for Windows",
    template: "%s · DevStackBox",
  },
  description:
    "Free, open-source Apache, MySQL, PHP, and phpMyAdmin stack for Windows with a modern desktop UI.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description:
      "Free, open-source local PHP development stack for Windows.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <RootProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </RootProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "DevStackBox",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Windows 10, Windows 11",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              url: siteConfig.url,
              downloadUrl: `${siteConfig.url}/download`,
            }),
          }}
        />
      </body>
    </html>
  );
}
