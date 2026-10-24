import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
const base = process.env.SMOKE_BASE_URL ?? "http://localhost:3000";
function walk(dir) { return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]); }
const routes = ["/","/download","/releases","/changelog","/community","/privacy","/security","/license","/whats-new","/xampp-alternative","/migrate-from-xampp","/vs/laragon","/vs/herd",...walk("content/docs").filter(f=>f.endsWith(".mdx")).map(f=>"/docs/"+path.relative("content/docs",f).replaceAll("\\","/").replace(/(?:\/)?index\.mdx$|\.mdx$/g,"")).map(p=>p.replace(/\/$/,""))];
const htmlByPath = new Map();
const guideResponse = await fetch(base + "/DEVSTACKBOX.md");
assert.equal(guideResponse.status, 200, "AI guide URL");
assert.match(guideResponse.headers.get("content-type") ?? "", /^text\/plain/);
const guide = await guideResponse.text();
assert.equal(guide, fs.readFileSync("public/DEVSTACKBOX.md", "utf8"), "served guide matches prepared source");
for (const alias of ["/llms.txt", "/llms-full.txt"]) {
  const discoveryResponse = await fetch(base + alias);
  assert.equal(discoveryResponse.status, 200, alias);
  assert.equal(await discoveryResponse.text(), guide, "one canonical guide at " + alias);
}
for (const route of routes) {
  const response = await fetch(base+route); assert.equal(response.status,200,route);
  const html=await response.text(); htmlByPath.set(route,html);
  assert.equal((html.match(/<h1\b/g)||[]).length,1,route+" must have one H1");
  assert.ok(html.includes('rel="canonical"'),route+" canonical");
  assert.ok(!/Content not found\.|Laragon Pro adds|Free tier limits/.test(html),route+" stale content");
}
const failures=[];
assert.ok(htmlByPath.get("/").includes('href="/DEVSTACKBOX.md"'), "homepage links to AI guide");
const assets = new Set();
for(const [route,html] of htmlByPath) {
  for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const href=match[1].replaceAll("&amp;","&");
    if(/^(?:mailto:|tel:|data:)/.test(href)) continue;
    const url=new URL(href,base+route);
    if(url.origin!==new URL(base).origin || url.pathname.startsWith("/_next/")) continue;
    if(htmlByPath.has(url.pathname)) {
      if(url.hash) {
        const id=decodeURIComponent(url.hash.slice(1));
        if(!htmlByPath.get(url.pathname).includes('id="'+id+'"')) failures.push(route+" → "+href+" (missing anchor)");
      }
    } else assets.add(url.pathname);
  }
}
for(const asset of assets) { const r=await fetch(base+asset); if(!r.ok) failures.push(asset+" ("+r.status+")"); }
assert.deepEqual(failures,[]);
assert.equal((await fetch(base+"/not-a-real-page")).status,404);
const sitemap=await (await fetch(base+"/sitemap.xml")).text();
const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
assert.equal(new Set(urls).size,urls.length,"duplicate sitemap URLs");
assert.equal((await fetch(base+"/api/search?query=installation")).status,200);
console.log("PASS: "+routes.length+" pages, headings, canonicals, internal links/anchors, assets, 404, sitemap, and search.");
