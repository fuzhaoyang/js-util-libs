import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const pkgRoot = path.resolve(root, "..");

const copy = (from, to) => {
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
};

const copyDir = (from, to) => {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const source = path.join(from, entry.name);
    const target = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(source, target);
    else copy(source, target);
  }
};

if (!fs.existsSync(path.join(pkgRoot, "dist/index.mjs"))) {
  console.error("缺少 dist 产物，请先在项目根目录执行 npm run build");
  process.exit(1);
}

const smoke = fs.readFileSync(path.join(root, "shared/smoke.mjs"), "utf8");
fs.writeFileSync(path.join(root, "apps/vue/smoke.mjs"), smoke);
fs.writeFileSync(path.join(root, "apps/react/smoke.mjs"), smoke);
fs.writeFileSync(
  path.join(root, "apps/angular/smoke.ts"),
  `// @ts-nocheck\n${smoke}`
);

for (const app of ["vue", "react", "angular"]) {
  copyDir(
    path.join(root, "fixtures"),
    path.join(root, "apps", app, "public/fixtures")
  );
}

execSync("npx --no-install vite build --config vite.vue.config.mjs", {
  cwd: root,
  stdio: "inherit",
});
execSync("npx --no-install vite build --config vite.react.config.mjs", {
  cwd: root,
  stdio: "inherit",
});
execSync("npx --no-install ng build", { cwd: root, stdio: "inherit" });

const native = path.join(root, "dist/native");
fs.rmSync(native, { recursive: true, force: true });
fs.mkdirSync(native, { recursive: true });
copy(path.join(pkgRoot, "dist/index.mjs"), path.join(native, "index.mjs"));
copy(
  path.join(pkgRoot, "dist/index.global.js"),
  path.join(native, "index.global.js")
);
for (const file of ["worker.html", "worker.mjs", "csp.html", "csp-test.js"]) {
  copy(path.join(root, "native", file), path.join(native, file));
}
copyDir(path.join(root, "fixtures"), path.join(native, "fixtures"));

console.log("compat apps built");
