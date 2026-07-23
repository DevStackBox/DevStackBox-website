import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const websiteRoot = path.join(__dirname, "..");
const devstackboxRoot = path.resolve(
  process.env.DEVSTACKBOX_ROOT ?? path.join(websiteRoot, "..", "DevStackBox"),
);

const docsSrc = path.join(devstackboxRoot, "docs");
const docsDest = path.join(websiteRoot, "content", "docs");
const imagesSrc = path.join(docsSrc, "images");
const imagesDest = path.join(websiteRoot, "public", "docs-images");

const SKIP_DIRS = new Set(["archive", "images", "assets", "standards"]);

function copyMdx(srcDir, destDir, relative = "") {
  if (!fs.existsSync(srcDir)) return;
  fs.mkdirSync(destDir, { recursive: true });
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    if (entry.name === "navigation.ts") continue;
    const rel = relative ? `${relative}/${entry.name}` : entry.name;
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      copyMdx(srcPath, destPath, rel);
    } else if (entry.name.endsWith(".mdx")) {
      let content = fs.readFileSync(srcPath, "utf8");
      content = content.replace(/<!--[\s\S]*?-->\n?/g, "");
      content = content.replace(/<->/g, "↔");
      fs.writeFileSync(destPath, content);
    }
  }
}

const navSrc = path.join(docsSrc, "navigation.ts");
const navDest = path.join(websiteRoot, "lib", "navigation-data.ts");
if (fs.existsSync(navSrc)) {
  fs.copyFileSync(navSrc, navDest);
  console.log("Synced docs/navigation.ts → lib/navigation-data.ts");
}

if (!fs.existsSync(docsSrc)) {
  console.error("DevStackBox docs not found at:", docsSrc);
  process.exit(1);
}

fs.rmSync(docsDest, { recursive: true, force: true });
copyMdx(docsSrc, docsDest);
console.log("Synced MDX → content/docs from", devstackboxRoot);

if (fs.existsSync(imagesSrc)) {
  fs.rmSync(imagesDest, { recursive: true, force: true });
  fs.mkdirSync(imagesDest, { recursive: true });
  for (const file of fs.readdirSync(imagesSrc)) {
    if (/\.(png|jpe?g|webp|gif)$/i.test(file)) {
      fs.copyFileSync(path.join(imagesSrc, file), path.join(imagesDest, file));
    }
  }
  console.log("Synced docs/images → public/docs-images");
} else {
  fs.mkdirSync(imagesDest, { recursive: true });
}

const logoSrc = path.join(imagesSrc, "logo");
const brandDest = path.join(websiteRoot, "public", "brand");
const appDir = path.join(websiteRoot, "app");

function syncLogoAssets() {
  if (!fs.existsSync(logoSrc)) {
    console.warn("Logo folder not found at:", logoSrc);
    return;
  }

  fs.rmSync(brandDest, { recursive: true, force: true });
  fs.mkdirSync(brandDest, { recursive: true });

  for (const file of fs.readdirSync(logoSrc)) {
    const srcPath = path.join(logoSrc, file);
    if (!fs.statSync(srcPath).isFile()) continue;
    if (!/\.(svg|png|jpe?g|webp|ico)$/i.test(file)) continue;
    fs.copyFileSync(srcPath, path.join(brandDest, file));
  }

  const faviconSrc = path.join(logoSrc, "favicon.ico");
  if (fs.existsSync(faviconSrc)) {
    fs.copyFileSync(faviconSrc, path.join(appDir, "favicon.ico"));
  }

  const icon512Src = path.join(logoSrc, "icon-512.png");
  if (fs.existsSync(icon512Src)) {
    fs.copyFileSync(icon512Src, path.join(appDir, "icon.png"));
  }

  const appleIconSrc = path.join(logoSrc, "apple-icon.png");
  if (fs.existsSync(appleIconSrc)) {
    fs.copyFileSync(appleIconSrc, path.join(appDir, "apple-icon.png"));
  }

  const ogSrc = path.join(logoSrc, "og-default.png");
  if (fs.existsSync(ogSrc)) {
    fs.copyFileSync(ogSrc, path.join(websiteRoot, "public", "og-default.png"));
  }

  console.log("Synced docs/images/logo → public/brand + app icons");
}

syncLogoAssets();
