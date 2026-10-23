import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { validateScreenshots, validateScreenshotReferences, syncScreenshots } from "../scripts/screenshot-assets.mjs";

test("approved assets retain bytes and native dimensions across destinations", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "dsb-media-test-"));
  try {
    const images = path.join(root, "docs/images"); fs.mkdirSync(images, {recursive:true});
    const bytes = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+j2ioAAAAASUVORK5CYII=", "base64");
    fs.writeFileSync(path.join(images,"pixel.png"), bytes);
    const item = {id:"fixture", file:"pixel.png", width:1, height:1, approved:true, version:"test", alt:"Fixture", caption:"Test only", publicPaths:["/docs-images/pixel.png", "/screenshots/pixel.png"]};
    const manifest = {schemaVersion:1, screenshots:[item]};
    const approved = validateScreenshots(images, manifest);
    fs.mkdirSync(path.join(root,"content")); syncScreenshots(root,approved);
    assert.deepEqual(fs.readFileSync(path.join(root,"public/screenshots/pixel.png")), bytes);
    assert.throws(()=>validateScreenshots(images,{...manifest,screenshots:[{...item,width:2}]}),/dimensions/);
    assert.throws(()=>validateScreenshots(images,{...manifest,screenshots:[{...item,file:"missing.png"}]}));
    assert.throws(()=>validateScreenshots(images,{...manifest,screenshots:[{...item,file:"../secret.png"}]}),/escapes/);
    assert.throws(()=>validateScreenshots(images,{...manifest,screenshots:[{...item,publicPaths:["/docs-images/../outside.png"]}]}),/Invalid/);
    assert.throws(()=>validateScreenshots(images,{...manifest,screenshots:[item,item]}),/unique/);
    fs.mkdirSync(path.join(root,"docs/user-guide"));
    fs.writeFileSync(path.join(root,"docs/user-guide/test.mdx"),"![Fixture](../images/pixel.png)");
    validateScreenshotReferences(path.join(root,"docs"),approved);
    fs.writeFileSync(path.join(root,"docs/user-guide/test.mdx"),"![Missing](../images/missing.png)");
    assert.throws(()=>validateScreenshotReferences(path.join(root,"docs"),approved),/Unapproved/);
  } finally {
    if (!root.startsWith(path.join(os.tmpdir(),"dsb-media-test-"))) throw new Error("Unexpected test cleanup root");
    fs.rmSync(root,{recursive:true,force:true});
  }
});
