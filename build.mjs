import { build } from "esbuild";
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const lib = require(path.join(root, "index.js"));

const names = Object.keys(lib).sort();
const entry = path.join(root, ".esm-entry.js");
fs.writeFileSync(
  entry,
  [
    'import lib from "./index.js";',
    ...names.map((name) => `export const ${name} = lib.${name};`),
  ].join("\n")
);

const common = {
  bundle: true,
  platform: "browser",
  target: ["es2020"],
  legalComments: "none",
  logLevel: "info",
};

try {
  await Promise.all([
    build({
      ...common,
      entryPoints: [entry],
      format: "esm",
      outfile: path.join(root, "dist/index.mjs"),
    }),
    build({
      ...common,
      entryPoints: [path.join(root, "index.js")],
      format: "iife",
      globalName: "jsUtilLibs",
      outfile: path.join(root, "dist/index.global.js"),
    }),
  ]);
} finally {
  fs.rmSync(entry, { force: true });
}
