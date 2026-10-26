import { chunk, deepCopy, base64Encode, parseQuery, add } from "./index.mjs";

const source = { a: [1, 2] };
postMessage({
  chunk: JSON.stringify(chunk([1, 2, 3], 2)),
  deepCopy: deepCopy(source).a[0],
  base64: base64Encode("我是"),
  query: JSON.stringify(parseQuery("?a=1&a=2")),
  add: add(0.1, 0.2),
});
