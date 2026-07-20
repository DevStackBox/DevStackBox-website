import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const websiteRoot = path.join(__dirname, "..");
const target = path.join(websiteRoot, "devstackbox");

if (fs.existsSync(target)) {
  fs.rmSync(target, { recursive: true, force: true });
}

const repo = process.env.DEVSTACKBOX_GIT_URL ?? "https://github.com/DevStackBox/DevStackBox.git";

console.log("Cloning DevStackBox (docs + policy files)...");
execSync(
  `git clone --depth 1 --filter=blob:none --sparse ${repo} devstackbox`,
  { cwd: websiteRoot, stdio: "inherit" },
);

execSync("git sparse-checkout init --no-cone", {
  cwd: target,
  stdio: "inherit",
});

execSync(
  "git sparse-checkout set docs /CHANGELOG.md /PRIVACY.md /SECURITY.md /LICENSE /CODE_OF_CONDUCT.md",
  { cwd: target, stdio: "inherit" },
);

console.log("DevStackBox docs ready at", target);
