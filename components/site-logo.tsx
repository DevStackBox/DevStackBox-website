import Image from "next/image";
import { siteConfig } from "@/content/homepage";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
};

export function SiteLogo({ className }: SiteLogoProps) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Image
        src="/brand/logo.svg"
        alt={siteConfig.name}
        width={32}
        height={32}
        className="h-8 w-8 dark:hidden"
        priority
        unoptimized
      />
      <Image
        src="/brand/logo-white.svg"
        alt={siteConfig.name}
        width={32}
        height={32}
        className="hidden h-8 w-8 dark:block"
        priority
        unoptimized
      />
      <span className="text-base font-semibold tracking-tight text-foreground">{siteConfig.name}</span>
    </span>
  );
}
