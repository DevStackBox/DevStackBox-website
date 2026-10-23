import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";

export function imageDimensions(bytes) {
  if (bytes.length >= 24 && bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) {
    return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20), format: "png" };
  }
  if (bytes[0] === 0xff && bytes[1] === 0xd8) {
    let offset = 2;
    while (offset + 4 <= bytes.length) {
      if (bytes[offset++] !== 0xff) throw new Error("Invalid JPEG marker");
      while (bytes[offset] === 0xff) offset++;
      const marker = bytes[offset++];
      if (marker === 0xd9 || marker === 0xda) break;
      if (marker === 1 || (marker >= 0xd0 && marker <= 0xd7)) continue;
      const length = bytes.readUInt16BE(offset);
      if (length < 2 || offset + length > bytes.length) throw new Error("Truncated JPEG");
      if ([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker)) {
        if (length < 7) throw new Error("Invalid JPEG frame");
        return { width: bytes.readUInt16BE(offset + 5), height: bytes.readUInt16BE(offset + 3), format: "jpeg" };
      }
      offset += length;
    }
  }
  throw new Error("Screenshot must be a valid PNG or JPEG");
}

export function containedPath(root, relative) {
  const base = path.resolve(root);
  const target = path.resolve(base, relative);
  if (!target.startsWith(base + path.sep)) throw new Error(`Path escapes asset root: ${relative}`);
  return target;
}

export function validateScreenshots(imageRoot, manifest) {
  if (manifest.schemaVersion !== 1 || !Array.isArray(manifest.screenshots)) throw new Error("Unsupported screenshot manifest");
  const ids = new Set(), urls = new Set();
  return manifest.screenshots.map(item => {
    if (!item.approved || !item.id || ids.has(item.id) || !item.alt?.trim() || !item.caption?.trim() || !item.version) throw new Error("Screenshot needs unique ID, approval, alt, caption and version");
    ids.add(item.id);
    const source = containedPath(imageRoot, item.file);
    const realSource = fs.realpathSync(source);
    if (!realSource.startsWith(fs.realpathSync(imageRoot) + path.sep)) throw new Error("Screenshot symlink escapes source root");
    const bytes = fs.readFileSync(source);
    const dimensions = imageDimensions(bytes);
    if (dimensions.width !== item.width || dimensions.height !== item.height) throw new Error(`Wrong native dimensions: ${item.id}`);
    if (!((dimensions.format === "png" && /\.png$/i.test(item.file)) || (dimensions.format === "jpeg" && /\.jpe?g$/i.test(item.file)))) throw new Error("Screenshot extension differs from bytes");
    if (!Array.isArray(item.publicPaths) || !item.publicPaths.length) throw new Error("Screenshot needs public destinations");
    for (const url of item.publicPaths) {
      if (!/^\/(docs-images|screenshots)\/[a-zA-Z0-9/_.-]+\.(png|jpe?g)$/.test(url) || url.split("/").some(segment => segment === ".." || segment === ".") || urls.has(url)) throw new Error(`Invalid or duplicate screenshot URL: ${url}`);
      urls.add(url);
    }
    return { ...item, ...dimensions, source, sha256: createHash("sha256").update(bytes).digest("hex") };
  });
}

export function validateScreenshotReferences(docsRoot, screenshots) {
  const approved = new Set(screenshots.flatMap(item => item.publicPaths));
  const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() && !["archive", "images"].includes(e.name) ? walk(path.join(dir, e.name)) : e.isFile() && e.name.endsWith(".mdx") ? [path.join(dir, e.name)] : []);
  for (const file of walk(docsRoot)) {
    const content = fs.readFileSync(file, "utf8");
    for (const match of content.matchAll(/!\[[^\]]*\]\(([^\s)]+)\)/g)) {
      const href = match[1];
      if (/^https?:/.test(href)) continue;
      const rel = path.relative(path.join(docsRoot, "images"), path.resolve(path.dirname(file), href)).replaceAll("\\", "/");
      const url = href.startsWith("/docs-images/") ? href : "/docs-images/" + rel;
      if (!approved.has(url)) throw new Error(`Unapproved or missing documentation screenshot: ${file}: ${href}`);
    }
  }
}

export function syncScreenshots(websiteRoot, screenshots) {
  const metadata = {};
  for (const { source, ...item } of screenshots) {
    for (const url of item.publicPaths) {
      const destination = containedPath(path.join(websiteRoot, "public"), url.slice(1));
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      const publicRoot = fs.realpathSync(path.join(websiteRoot, "public"));
      if (!fs.realpathSync(path.dirname(destination)).startsWith(publicRoot + path.sep) ||
          (fs.existsSync(destination) && !fs.realpathSync(destination).startsWith(publicRoot + path.sep))) {
        throw new Error(`Screenshot destination escapes public root: ${url}`);
      }
      fs.copyFileSync(source, destination);
      const copiedHash = createHash("sha256").update(fs.readFileSync(destination)).digest("hex");
      if (copiedHash !== item.sha256) throw new Error(`Screenshot copy mismatch: ${url}`);
      metadata[url] = item;
    }
  }
  fs.writeFileSync(path.join(websiteRoot, "content", "screenshots.json"), JSON.stringify(metadata, null, 2) + "\n");
}
