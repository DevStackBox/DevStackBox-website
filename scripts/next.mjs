import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
// Resolve Windows junctions before Next computes module and generated-content paths.
const root = fs.realpathSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."));
const child = spawn(process.execPath, [path.join(root, "node_modules/next/dist/bin/next"), ...process.argv.slice(2)], {cwd: root, stdio: "inherit", env: process.env});
child.on("error", error => { console.error(error.message); process.exitCode = 1; });
child.on("exit", code => { process.exitCode = code ?? 1; });
