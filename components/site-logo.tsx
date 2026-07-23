import { siteConfig } from "@/content/homepage";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
};

export function SiteLogo({ className }: SiteLogoProps) {
  return (
    <>
      <img
        src="/brand/logo.svg"
        alt={siteConfig.name}
        width={32}
        height={32}
        className={cn("h-8 w-8 dark:hidden", className)}
      />
      <img
        src="/brand/logo-dark.svg"
        alt={siteConfig.name}
        width={32}
        height={32}
        className={cn("hidden h-8 w-8 dark:block", className)}
      />
    </>
  );
}
