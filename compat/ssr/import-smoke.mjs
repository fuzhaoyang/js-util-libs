import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const esm = await import("js-util-libs");
const cjs = require("js-util-libs");

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

assert(Object.keys(esm).length >= 135, "ESM 导出数量不足");
assert(Object.keys(cjs).length >= 135, "CJS 导出数量不足");
assert(typeof esm.deepCopy === "function", "ESM deepCopy 缺失");
assert(typeof cjs.deepCopy === "function", "CJS deepCopy 缺失");

// 只调用不依赖 DOM 的函数，验证模块顶层没有访问 window/document
const copy = esm.deepCopy({ a: [1, 2] });
assert(copy.a[0] === 1, "deepCopy 结果错误");
assert(esm.chunk([1, 2, 3], 2).length === 2, "chunk 结果错误");
assert(esm.add(0.1, 0.2) === 0.3, "add 结果错误");
assert(esm.isIdCard("11010519491231002X"), "isIdCard 结果错误");
assert(esm.base64Encode("我是") === "5oiR5piv", "base64 结果错误");
assert(esm.parseQuery("?a=1&a=2").a.length === 2, "parseQuery 结果错误");
assert(esm.formatCurrency(1234.5) === "¥1,234.50", "formatCurrency 结果错误");
assert((await esm.retry(async () => 1, { retries: 0 })) === 1, "retry 结果错误");

console.log(`SSR import ok (esm ${Object.keys(esm).length}, cjs ${Object.keys(cjs).length})`);
