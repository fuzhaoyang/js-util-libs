try {
  const chunk = jsUtilLibs.chunk([1, 2, 3], 2);
  window.__CSP_OK__ =
    JSON.stringify(chunk) === "[[1,2],[3]]" &&
    jsUtilLibs.deepCopy({ a: 1 }).a === 1 &&
    jsUtilLibs.base64Encode("我是") === "5oiR5piv";
} catch (error) {
  window.__CSP_ERROR__ = String(error);
}
