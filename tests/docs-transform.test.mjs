import test from "node:test";
import assert from "node:assert/strict";
import { resolveDocLink, transformDoc } from "../scripts/docs-transform.mjs";
test("resolves index-page links, sibling docs, anchors and repository files", () => {
  assert.equal(resolveDocLink("faq", "index.mdx"), "/docs/faq");
  assert.equal(resolveDocLink("001-use-tauri", "development/adr/index.mdx"), "/docs/development/adr/001-use-tauri");
  assert.equal(resolveDocLink("../reference/configuration#ports", "advanced/environment.mdx"), "/docs/reference/configuration#ports");
  assert.equal(resolveDocLink("../../scripts/build-release.mjs", "development/release-process.mdx"), "https://github.com/DevStackBox/DevStackBox/blob/main/scripts/build-release.mjs");
  assert.equal(resolveDocLink("https://example.com", "index.mdx"), "https://example.com");
});
test("normalizes CRLF and headings without editing code examples", () => {
  const source = "# Title\r\n[FAQ](faq)\r\n```sh\r\n# Comment\r\n```";
  assert.equal(transformDoc(source,"index.mdx"), "## Title\n[FAQ](/docs/faq)\n```sh\n# Comment\n```");
});
