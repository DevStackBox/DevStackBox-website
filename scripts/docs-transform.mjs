import path from "node:path";
const repository = "https://github.com/DevStackBox/DevStackBox/blob/main/";
export function resolveDocLink(href, sourcePath) {
  if (!href || /^(?:[a-z][a-z\d+.-]*:|\/|#)/i.test(href)) return href;
  const match = href.match(/^([^?#]*)([?#].*)?$/);
  const target = path.posix.normalize(path.posix.join("docs", path.posix.dirname(sourcePath), match[1]));
  const suffix = match[2] ?? "";
  if (target.startsWith("docs/images/") && /\.(?:png|jpe?g|webp|svg)$/i.test(target)) return "/docs-images/" + target.slice("docs/images/".length) + suffix;
  if (!target.startsWith("docs/") || /\.(?!mdx?$)[^/]+$/i.test(target)) return repository + target + suffix;
  return "/" + target.replace(/\.mdx?$/, "").replace(/\/index$/, "") + suffix;
}
export function transformDoc(content, sourcePath) {
  let inFence = false;
  // Normalize headings only outside code fences; the page shell owns the H1.
  return content.replace(/\r\n?/g, "\n").replace(/<!--[\s\S]*?-->\n?/g, "").replace(/<->/g, "↔").split("\n").map(line => {
    if (/^\s*(```|~~~)/.test(line)) { inFence = !inFence; return line; }
    if (inFence) return line;
    const screenshot = line.match(/^!\[[^\]]*\]\(([^\s)]+)\)\s*$/);
    if (screenshot) {
      const src = resolveDocLink(screenshot[1], sourcePath);
      if (src.startsWith("/docs-images/")) return `<Screenshot src=${JSON.stringify(src)} />`;
    }
    return line.replace(/^# /, "## ").replace(/\]\(([^\s)]+)\)/g, (_, href) => "](" + resolveDocLink(href, sourcePath) + ")");
  }).join("\n");
}
