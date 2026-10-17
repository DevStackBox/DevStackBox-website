import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const websiteRoot = path.join(__dirname, "..");
const force = process.argv.includes("--force");

const targets = [".next", ".turbo", ".source", "devstackbox"];

console.log(`Website local cleanup (${websiteRoot})`);
if (!force) {
  console.log("Dry run. Re-run with: node scripts/cleanup-local.mjs --force\n");
}

for (const rel of targets) {
  const full = path.join(websiteRoot, rel);
  if (!fs.existsSync(full)) continue;
  if (!force) {
    console.log(`[WhatIf] Would remove: ${rel}`);
    continue;
  }
  console.log(`Removing: ${rel}`);
  fs.rmSync(full, { recursive: true, force: true });
}

if (force) console.log("\nDone.");
else console.log("\nNo files deleted.");
