import path from "node:path";

export function getDevstackboxRoot(): string {
  return path.resolve(
    process.env.DEVSTACKBOX_ROOT ??
      path.join(process.cwd(), "..", "DevStackBox"),
  );
}

export function devstackboxPath(...segments: string[]): string {
  return path.join(getDevstackboxRoot(), ...segments);
}
