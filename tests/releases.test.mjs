import test from "node:test";
import assert from "node:assert/strict";
import { findWindowsInstaller, findSha256 } from "../lib/github.ts";
test("only a supported x64 Windows installer becomes a download", () => {
  const invalid = [{name:"latest.json"},{name:"app_arm64-setup.exe"},{name:"app_x64-setup.exe.sig"}];
  assert.equal(findWindowsInstaller({assets:invalid}), undefined);
  const good = {name:"DevStackBox_0.1.11_x64-setup.exe"};
  assert.equal(findWindowsInstaller({assets:[...invalid, good]}), good);
});
test("checksum belongs to the selected asset, with strict digest validation", () => {
  const digest = "ab".repeat(32);
  assert.equal(findSha256({digest:"sha256:"+digest}), digest.toUpperCase());
  assert.equal(findSha256({digest:"sha256:bad"}), null);
  assert.equal(findSha256(undefined), null);
});
