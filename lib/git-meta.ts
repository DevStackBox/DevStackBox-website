import { execSync } from "node:child_process";
import { devstackboxPath, getDevstackboxRoot } from "./devstackbox-root";

export function getLastUpdated(relativePath: string): string | null {
  const iso = getLastModifiedIso(relativePath);
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getLastModifiedIso(relativePath: string): string | null {
  try {
    const full = devstackboxPath(relativePath);
    const out = execSync(
      `git log -1 --format=%cI -- "${full.replace(/\\/g, "/")}"`,
      { cwd: getDevstackboxRoot(), encoding: "utf8" },
    ).trim();
    return out || null;
  } catch {
    return null;
  }
}
