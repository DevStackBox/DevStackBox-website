import { Check } from "lucide-react";
import type { GitHubRelease } from "@/lib/github";
import { findSha256, findWindowsInstaller } from "@/lib/github";

type ReleaseChecksumProps = {
  release: GitHubRelease;
  className?: string;
};

export function ReleaseChecksum({ release, className }: ReleaseChecksumProps) {
  const installer = findWindowsInstaller(release);
  const checksum = findSha256(installer);
  if (!checksum) return null;

  return (
    <div className={className}>
      <p className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
        <Check className="size-4 text-primary" />
        SHA-256 checksum (GitHub release asset)
      </p>
      <code className="mt-2 block break-all font-mono text-xs leading-relaxed">
        {checksum}
      </code>
      <p className="mt-3 text-xs leading-6 text-muted-foreground">
        In PowerShell:{" "}
        <code className="text-foreground">
          Get-FileHash -Algorithm SHA256 &quot;path-to-installer.exe&quot;
        </code>
      </p>
    </div>
  );
}
