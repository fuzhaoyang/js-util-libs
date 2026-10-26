import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "../..");
const temp = fs.mkdtempSync(path.join(os.tmpdir(), "js-util-pack-"));

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

try {
  const output = execFileSync(
    "npm",
    ["pack", root, "--pack-destination", temp, "--json"],
    { encoding: "utf8" }
  );
  const info = JSON.parse(output)[0];
  const files = info.files.map((file) => file.path);

  for (const required of [
    "index.js",
    "index.d.ts",
    "dist/index.mjs",
    "dist/index.global.js",
    "README.md",
    "package.json",
  ]) {
    assert(files.includes(required), `缺少文件: ${required}`);
  }
  const forbidden = files.filter((file) =>
    /(__test|(^|\/)compat\/|test-setup|build\.mjs|package-lock|\.npmrc)/.test(file)
  );
  assert(forbidden.length === 0, `包含不该发布的文件: ${forbidden.join(", ")}`);

  const tarball = path.join(temp, info.filename);
  const consumer = path.join(temp, "consumer");
  fs.mkdirSync(consumer);
  fs.writeFileSync(
    path.join(consumer, "package.json"),
    JSON.stringify({ name: "consumer", private: true })
  );
  execFileSync(
    "npm",
    ["install", tarball, "--no-audit", "--no-fund", "--ignore-scripts"],
    { cwd: consumer, stdio: "pipe" }
  );

  execFileSync(
    process.execPath,
    [
      "-e",
      "const l=require('js-util-libs'); if(Object.keys(l).length<135) throw new Error('cjs exports'); if(l.chunk([1,2,3],2).length!==2) throw new Error('chunk'); console.log('pack cjs ok');",
    ],
    { cwd: consumer, encoding: "utf8" }
  );
  execFileSync(
    process.execPath,
    [
      "--input-type=module",
      "-e",
      "import {chunk,base64Encode,trim,isCreditCode} from 'js-util-libs'; if(chunk([1,2,3],2).length!==2) throw new Error('esm chunk'); if(base64Encode('我是')!=='5oiR5piv') throw new Error('esm base64'); if(trim('  a  ',2)!=='a') throw new Error('esm trim'); if(!isCreditCode('91350100M000100Y43')) throw new Error('esm credit'); console.log('pack esm ok');",
    ],
    { cwd: consumer, encoding: "utf8" }
  );

  console.log(`pack ok (${files.length} files)`);
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
