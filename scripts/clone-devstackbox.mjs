import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const websiteRoot = fs.realpathSync(path.join(path.dirname(fileURLToPath(import.meta.url)), ".."));
const target = path.resolve(websiteRoot, "devstackbox");
if (path.dirname(target) !== websiteRoot) throw new Error("Invalid checkout target");
if (fs.existsSync(target)) fs.rmSync(target, { recursive: true, force: true });
const repo = process.env.DEVSTACKBOX_GIT_URL ?? "https://github.com/DevStackBox/DevStackBox.git";
const ref = process.env.DEVSTACKBOX_REF ?? "main";
const git = (args, cwd) => execFileSync("git", args, { cwd, stdio: "inherit" });
git(["clone", "--depth", "1", "--filter=blob:none", "--sparse", "--branch", ref, "--", repo, target], websiteRoot);
git(["sparse-checkout", "init", "--no-cone"], target);
git(["sparse-checkout", "set", "docs", "/DEVSTACKBOX.md", "/CHANGELOG.md", "/PRIVACY.md", "/SECURITY.md", "/LICENSE", "/CODE_OF_CONDUCT.md"], target);
console.log("DevStackBox docs ready at", target);
