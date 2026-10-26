import * as lib from "js-util-libs";

const EXPECTED = [
  "debounce", "throttle", "deepCopy", "shallCopy", "call", "apply", "bind",
  "dateFormat", "beforeDateFormat", "getWeek", "escapeHtml", "matchingAllImg",
  "scrollAnimation", "scrollToTop", "scrollToBottom", "loadScript", "getUrlParms",
  "bubbleSort", "counterSort", "insertSort", "mergeSort", "sort", "selectionSort",
  "isEmail", "isPhone", "isURL", "isWeiXin", "isQQ", "isCarNo", "password",
  "isCn", "isPostNo", "isRGB", "bankCardCheck", "isIdCard", "isIpv4", "checkNum",
  "isObject", "isEmptyObject", "isArray", "isType", "isVersion", "isPassport",
  "getOSType", "clipboard", "cliboard", "checkBrowser", "cookieSet", "cookieGet",
  "cookieRemove", "getHtmlText", "base64Decode", "base64Encode", "utf8Decode",
  "utf8Encode", "trim", "thousandth", "changeToChinese", "formatSize", "loadStyle",
  "arrayToTree", "arrScrambling", "unique", "flat", "randomString", "randomRange",
  "randomNum", "digitUppercase", "telFormat", "firstLetterUpper", "fistLetterUpper",
  "largeNumberAdd", "largeNumbersMultiply", "sleep", "retry", "withTimeout",
  "memoize", "once", "pick", "omit", "get", "set", "deepMerge", "deepEqual",
  "escapeRegExp", "camelCase", "kebabCase", "truncate", "chunk", "groupBy",
  "sortBy", "clamp", "sum", "average", "round", "add", "sub", "mul", "div",
  "formatCurrency", "parseMoney", "isNil", "isPromise", "isPlainObject", "isEmpty",
  "isCreditCode", "isOrganizationCode", "isNewEnergyCarNo", "getAge", "getGender",
  "getBankCardType", "maskPhone", "maskIdCard", "maskName", "maskEmail",
  "maskBankCard", "uuid", "encodeHtml", "unescapeHtml", "parseQuery",
  "stringifyQuery", "setQuery", "removeQuery", "storageSet", "storageGet",
  "storageRemove", "on", "off", "delegate", "isInViewport", "copyText",
  "downloadFile", "readFileAsText", "blobToBase64", "base64ToBlob",
];

const cases = new Map();
const add = (name, fn) => cases.set(name, fn);
class SkipError extends Error {
  constructor(reason) {
    super(reason);
    this.skipped = true;
  }
}
const skip = (reason) => {
  throw new SkipError(reason);
};
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const waitFor = async (condition, timeout = 15000) => {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (condition()) return;
    await sleep(50);
  }
  throw new Error("waitFor timeout");
};

function assert(condition, message) {
  if (!condition) throw new Error(message || "assertion failed");
}
function eq(actual, expected, message) {
  const a = JSON.stringify(actual);
  const b = JSON.stringify(expected);
  if (a !== b) {
    throw new Error(`${message || "eq"}: expected ${b}, got ${a}`);
  }
}

add("export list", () => {
  const actual = Object.keys(lib)
    .filter((key) => key !== "default")
    .sort();
  eq(actual, [...EXPECTED].sort(), "exports");
});

add("debounce", async () => {
  let count = 0;
  const fn = lib.debounce(() => count++, 20);
  fn();
  fn();
  await sleep(60);
  eq(count, 1);
});

add("throttle", async () => {
  let count = 0;
  const fn = lib.throttle(() => count++, 20);
  fn();
  fn();
  eq(count, 1);
  await sleep(30);
  fn();
  eq(count, 2);
});

add("deepCopy", () => {
  const source = { a: { b: [1, 2] }, date: new Date(0), map: new Map([["k", 1]]), set: new Set([2]) };
  source.self = source;
  const copy = lib.deepCopy(source);
  assert(copy !== source, "should be new object");
  assert(copy.a !== source.a, "nested should be copied");
  eq(copy.a.b, [1, 2]);
  assert(copy.date instanceof Date, "date");
  assert(copy.self === copy, "cycle");
});

add("shallCopy", () => {
  const source = { a: { b: 1 } };
  const copy = lib.shallCopy(source);
  assert(copy !== source, "new object");
  assert(copy.a === source.a, "nested shared");
});

add("call", () => {
  const fn = function (a, b) { return [this.x, a, b]; };
  eq(lib.call.call(fn, { x: 1 }, 2, 3), [1, 2, 3]);
});

add("apply", () => {
  const fn = function (a, b) { return [this.x, a, b]; };
  eq(lib.apply.call(fn, { x: 1 }, [2, 3]), [1, 2, 3]);
});

add("bind", () => {
  const fn = function (a, b) { return [this.x, a, b]; };
  const bound = lib.bind.call(fn, { x: 1 }, 2);
  eq(bound(3), [1, 2, 3]);
});

add("dateFormat", () => {
  const ts = new Date(2022, 1, 21, 11, 33, 15).getTime();
  eq(lib.dateFormat("YYYY-mm-dd HH:MM:SS", ts), "2022-02-21 11:33:15");
});

add("beforeDateFormat", () => {
  assert(typeof lib.beforeDateFormat(Date.now() - 3 * 86400000) === "string", "string");
  assert(lib.beforeDateFormat(null) === undefined, "empty");
});

add("getWeek", () => {
  eq(lib.getWeek(new Date(2022, 1, 21).getTime()), "星期一");
});

add("escapeHtml", () => {
  eq(lib.escapeHtml("&lt;p&gt;&nbsp;"), "<p> ");
});

add("matchingAllImg", () => {
  eq(lib.matchingAllImg('<img src="a.png"/><img src="b.png"/>'), ["a.png", "b.png"]);
});

add("scrollAnimation", async () => {
  document.body.style.height = "4000px";
  window.scrollTo(0, 100);
  await sleep(50);
  lib.scrollAnimation(100, 700);
  await waitFor(() => Math.abs(window.scrollY - 700) <= 2, 30000);
  document.body.style.height = "";
});

add("scrollToTop", async () => {
  document.body.style.height = "4000px";
  window.scrollTo(0, 500);
  lib.scrollToTop();
  await waitFor(() => window.scrollY < 5, 30000);
  document.body.style.height = "";
});

add("scrollToBottom", async () => {
  document.body.style.height = "4000px";
  lib.scrollToBottom();
  await sleep(50);
  assert(window.scrollY > 0, `scrollY=${window.scrollY}`);
  document.body.style.height = "";
  window.scrollTo(0, 0);
});

add("loadScript", async () => {
  await lib.loadScript(["/fixtures/hello.js"]);
  eq(window.__helloLoaded, true);
});

add("getUrlParms", () => {
  history.replaceState(null, "", "?foo=bar");
  eq(lib.getUrlParms("foo"), "bar");
  eq(lib.getUrlParms("missing"), false);
  history.replaceState(null, "", location.pathname);
});

add("bubbleSort", () => eq(lib.bubbleSort([3, 1, 2]), [1, 2, 3]));
add("counterSort", () => eq(lib.counterSort([3, 1, 2]), [1, 2, 3]));
add("insertSort", () => eq(lib.insertSort([3, 1, 2]), [1, 2, 3]));
add("mergeSort", () => eq(lib.mergeSort([3, 1, 2]), [1, 2, 3]));
add("sort", () => eq(lib.sort([3, 1, 2]), [1, 2, 3]));
add("selectionSort", () => eq(lib.selectionSort([3, 1, 2]), [1, 2, 3]));

add("isEmail", () => {
  eq(lib.isEmail("a@b.com"), true);
  eq(lib.isEmail("a@b"), false);
});
add("isPhone", () => {
  eq(lib.isPhone("17791430698"), true);
  eq(lib.isPhone("17791430698", ["77"]), true);
  eq(lib.isPhone("27791430698"), false);
});
add("isURL", () => {
  eq(lib.isURL("https://a.com/x"), true);
  eq(lib.isURL("sss://a.com"), false);
});
add("isWeiXin", () => {
  eq(lib.isWeiXin("linsanxin885577"), true);
  eq(lib.isWeiXin("我的vx"), false);
});
add("isQQ", () => {
  eq(lib.isQQ("932647051"), true);
  eq(lib.isQQ("191580163333"), false);
});
add("isCarNo", () => {
  eq(lib.isCarNo("粤A12345"), true);
  eq(lib.isCarNo("广东A12345"), false);
});
add("password", () => {
  eq(lib.password("sunshine_Lin12345222"), true);
  eq(lib.password("sunshineLin12345"), false);
});
add("isCn", () => {
  eq(lib.isCn("我是sunshin"), true);
  eq(lib.isCn("sunshine"), false);
});
add("isPostNo", () => {
  eq(lib.isPostNo("522000"), true);
  eq(lib.isPostNo("5220000"), false);
});
add("isRGB", () => {
  eq(lib.isRGB("#fff"), true);
  eq(lib.isRGB("#1234567"), false);
});
add("bankCardCheck", () => {
  eq(lib.bankCardCheck(4485275742308327), true);
  eq(lib.bankCardCheck(6011329933655299), false);
});
add("isIdCard", () => {
  eq(lib.isIdCard("11010519491231002X"), true);
  eq(lib.isIdCard("110105491231002"), true);
  eq(lib.isIdCard("415106199801012130"), false);
});
add("isIpv4", () => {
  eq(lib.isIpv4("122.12.56.65"), true);
  eq(lib.isIpv4("122.12.56.655"), false);
});
add("checkNum", () => {
  eq(lib.checkNum(5), true);
  eq(lib.checkNum("5"), false);
});
add("isObject", () => {
  eq(lib.isObject({}), true);
  eq(lib.isObject(() => {}), true);
  eq(lib.isObject(null), false);
});
add("isEmptyObject", () => {
  eq(lib.isEmptyObject({}), true);
  eq(lib.isEmptyObject({ a: 1 }), false);
});
add("isArray", () => {
  eq(lib.isArray([]), true);
  eq(lib.isArray({}), false);
});
add("isType", () => {
  eq(lib.isType([]), "Array");
  eq(lib.isType(null), "Null");
});
add("isVersion", () => {
  eq(lib.isVersion("1.1.0"), true);
  eq(lib.isVersion("12.52.522.522"), false);
});
add("isPassport", () => {
  eq(lib.isPassport("E12345678"), true);
  eq(lib.isPassport("123"), false);
});

add("getOSType", () => {
  assert(["ios", "android", "others"].includes(lib.getOSType()), "os type");
});
add("clipboard", () => {
  eq(lib.clipboard, lib.cliboard);
  try {
    lib.clipboard("hello");
  } catch (error) {
    if (/execCommand|not implemented|not supported|not allowed|denied|permission|security/i.test(String(error))) {
      skip(`execCommand unavailable: ${error.message || error}`);
    }
    throw error;
  }
});
add("cliboard", () => {
  try {
    lib.cliboard("hello");
  } catch (error) {
    if (/execCommand|not implemented|not supported|not allowed|denied|permission|security/i.test(String(error))) {
      skip(`execCommand unavailable: ${error.message || error}`);
    }
    throw error;
  }
});
add("checkBrowser", () => {
  const browser = lib.checkBrowser();
  assert(browser && typeof browser.type === "string", "type");
  assert(typeof browser.version === "number", "version");
});

add("cookieSet", () => {
  lib.cookieSet("compat_a", "1");
  assert(document.cookie.includes("compat_a=1"), "cookie set");
});
add("cookieGet", () => {
  eq(lib.cookieGet("compat_a"), "1");
});
add("cookieRemove", () => {
  lib.cookieRemove("compat_a");
  eq(lib.cookieGet("compat_a"), "");
});
add("getHtmlText", () => {
  eq(lib.getHtmlText('<div class="a"><span>456</span></div>'), "456");
});
add("base64Decode", () => {
  eq(lib.base64Decode("5oiR5piv"), "我是");
});
add("base64Encode", () => {
  eq(lib.base64Encode("我是"), "5oiR5piv");
});
add("utf8Decode", () => {
  eq(lib.utf8Decode([230, 136, 145]), "我");
});
add("utf8Encode", () => {
  eq(lib.utf8Encode("我"), [230, 136, 145]);
});
add("trim", () => {
  eq(lib.trim("  a b  "), "ab");
  eq(lib.trim("  a b  ", 2), "a b");
  eq(lib.trim("  a  ", 3), "a  ");
  eq(lib.trim("  a  ", 4), "  a");
});
add("thousandth", () => {
  eq(lib.thousandth(10000000), "10,000,000");
});
add("changeToChinese", () => {
  eq(lib.changeToChinese(10000), "一萬");
});
add("formatSize", () => {
  eq(lib.formatSize(1024), "1KB");
  eq(lib.formatSize(1024 ** 4), "1TB");
});
add("loadStyle", async () => {
  lib.loadStyle("/fixtures/style.css");
  await sleep(200);
  assert(document.querySelector('link[href*="style.css"]') != null, "link inserted");
});
add("arrayToTree", () => {
  eq(lib.arrayToTree([{ id: 1, pid: 0 }, { id: 2, pid: 1 }]), [
    { id: 1, pid: 0, children: [{ id: 2, pid: 1, children: [] }] },
  ]);
});
add("arrScrambling", () => {
  eq(lib.arrScrambling([1, 2, 3]).sort(), [1, 2, 3]);
});
add("unique", () => {
  eq(lib.unique([1, 1, 2]), [1, 2]);
});
add("flat", () => {
  eq(lib.flat([1, [2, [3]]]), [1, 2, 3]);
});
add("randomString", () => {
  eq(lib.randomString(8).length, 8);
});
add("randomRange", () => {
  const value = lib.randomRange(1, 3);
  assert(value >= 1 && value <= 3, "range");
});
add("randomNum", () => {
  eq(lib.randomNum([7]), 7);
});
add("digitUppercase", () => {
  eq(lib.digitUppercase(10529520), "壹仟零伍拾贰万玖仟伍佰贰拾元整");
});
add("telFormat", () => {
  eq(lib.telFormat(17791430699), "177****0699");
});
add("firstLetterUpper", () => {
  eq(lib.firstLetterUpper("hello"), "Hello");
});
add("fistLetterUpper", () => {
  eq(lib.fistLetterUpper("hello"), "Hello");
});
add("largeNumberAdd", () => {
  eq(lib.largeNumberAdd("199999990", "9007199254740991"), "9007199454740981");
});
add("largeNumbersMultiply", () => {
  eq(lib.largeNumbersMultiply("199999990", "9007199254740991"), "1801439760876205652590090");
});

add("sleep", async () => {
  const start = Date.now();
  await lib.sleep(20);
  assert(Date.now() - start >= 15, "slept");
});
add("retry", async () => {
  let count = 0;
  const result = await lib.retry(async () => {
    count++;
    if (count < 3) throw new Error("fail");
    return "ok";
  }, { retries: 3, delay: 0 });
  eq(result, "ok");
  eq(count, 3);
});
add("withTimeout", async () => {
  eq(await lib.withTimeout(Promise.resolve(1), 100), 1);
  let failed = false;
  try {
    await lib.withTimeout(new Promise(() => {}), 10);
  } catch (error) {
    failed = /Timeout/.test(error.message);
  }
  eq(failed, true);
});
add("memoize", () => {
  let count = 0;
  const fn = lib.memoize((n) => {
    count++;
    return n * 2;
  });
  eq(fn(2), 4);
  eq(fn(2), 4);
  eq(count, 1);
});
add("once", () => {
  let count = 0;
  const fn = lib.once(() => ++count);
  fn();
  fn();
  eq(count, 1);
});
add("pick", () => eq(lib.pick({ a: 1, b: 2 }, ["a"]), { a: 1 }));
add("omit", () => eq(lib.omit({ a: 1, b: 2 }, ["a"]), { b: 2 }));
add("get", () => {
  eq(lib.get({ a: { b: [{ c: 1 }] } }, "a.b[0].c"), 1);
  eq(lib.get({}, "a.b", "d"), "d");
});
add("set", () => {
  const target = {};
  lib.set(target, "a.b[0].c", 1);
  eq(target, { a: { b: [{ c: 1 }] } });
});
add("deepMerge", () => {
  eq(lib.deepMerge({ a: { x: 1 } }, { a: { y: 2 } }), { a: { x: 1, y: 2 } });
});
add("deepEqual", () => {
  eq(lib.deepEqual({ a: [1] }, { a: [1] }), true);
  eq(lib.deepEqual({ a: 1 }, { a: 2 }), false);
});
add("escapeRegExp", () => {
  eq(lib.escapeRegExp("a.b"), "a\\.b");
});
add("camelCase", () => eq(lib.camelCase("foo-bar"), "fooBar"));
add("kebabCase", () => eq(lib.kebabCase("fooBar"), "foo-bar"));
add("truncate", () => eq(lib.truncate("abcdef", 4), "a..."));
add("chunk", () => eq(lib.chunk([1, 2, 3], 2), [[1, 2], [3]]));
add("groupBy", () => {
  eq(lib.groupBy([1, 2, 3], (n) => (n % 2 ? "odd" : "even")), {
    odd: [1, 3],
    even: [2],
  });
});
add("sortBy", () => {
  eq(lib.sortBy([{ n: 2 }, { n: 1 }], "n"), [{ n: 1 }, { n: 2 }]);
});
add("clamp", () => eq(lib.clamp(5, 1, 3), 3));
add("sum", () => eq(lib.sum([1, 2, 3]), 6));
add("average", () => eq(lib.average([1, 2, 3]), 2));
add("round", () => eq(lib.round(1.005, 2), 1.01));
add("add", () => eq(lib.add(0.1, 0.2), 0.3));
add("sub", () => eq(lib.sub(0.3, 0.1), 0.2));
add("mul", () => eq(lib.mul(0.1, 0.2), 0.02));
add("div", () => eq(lib.div(0.3, 0.1), 3));
add("formatCurrency", () => {
  eq(lib.formatCurrency(1234567.891), "¥1,234,567.89");
});
add("parseMoney", () => eq(lib.parseMoney("¥1,234.56"), 1234.56));
add("isNil", () => {
  eq(lib.isNil(null), true);
  eq(lib.isNil(0), false);
});
add("isPromise", () => {
  eq(lib.isPromise(Promise.resolve()), true);
  eq(lib.isPromise({}), false);
});
add("isPlainObject", () => {
  eq(lib.isPlainObject({}), true);
  eq(lib.isPlainObject(new Date()), false);
});
add("isEmpty", () => {
  eq(lib.isEmpty({}), true);
  eq(lib.isEmpty([]), true);
  eq(lib.isEmpty(0), false);
});
add("isCreditCode", () => {
  eq(lib.isCreditCode("91350100M000100Y43"), true);
  eq(lib.isCreditCode("91350100M000100Y44"), false);
});
add("isOrganizationCode", () => {
  eq(lib.isOrganizationCode("12345678-8"), true);
});
add("isNewEnergyCarNo", () => {
  eq(lib.isNewEnergyCarNo("粤BD12345"), true);
});
add("getAge", () => {
  eq(lib.getAge("11010519491231002X", new Date(2026, 9, 23)), 76);
});
add("getGender", () => {
  eq(lib.getGender("11010519491231002X"), "female");
});
add("getBankCardType", () => {
  eq(lib.getBankCardType("4111111111111111"), "visa");
});
add("maskPhone", () => eq(lib.maskPhone(17791430699), "177****0699"));
add("maskIdCard", () => eq(lib.maskIdCard("11010519491231002X"), "110105********002X"));
add("maskName", () => eq(lib.maskName("张三丰"), "张**"));
add("maskEmail", () => eq(lib.maskEmail("test123@qq.com"), "te***@qq.com"));
add("maskBankCard", () => eq(lib.maskBankCard("6222021234567890123"), "***************0123"));
add("uuid", () => {
  assert(/^[0-9a-f-]{36}$/.test(lib.uuid()), "uuid format");
});
add("encodeHtml", () => {
  eq(lib.encodeHtml("<a>"), "&lt;a&gt;");
});
add("unescapeHtml", () => {
  eq(lib.unescapeHtml("&lt;a&gt;"), "<a>");
});
add("parseQuery", () => {
  eq(lib.parseQuery("https://a.com?x=1&x=2&y=hello%20world"), {
    x: ["1", "2"],
    y: "hello world",
  });
});
add("stringifyQuery", () => {
  eq(lib.stringifyQuery({ a: 1, b: [2, 3], c: null }), "a=1&b=2&b=3");
});
add("setQuery", () => {
  eq(lib.setQuery("/p?x=1#h", "y", "2"), "/p?x=1&y=2#h");
});
add("removeQuery", () => {
  eq(lib.removeQuery("/p?x=1&y=2", "x"), "/p?y=2");
});
add("storageSet", () => {
  lib.storageSet("compat_key", { a: 1 });
  assert(localStorage.getItem("compat_key") != null, "stored");
});
add("storageGet", () => {
  eq(lib.storageGet("compat_key"), { a: 1 });
  eq(lib.storageGet("compat_missing", "d"), "d");
});
add("storageRemove", () => {
  lib.storageRemove("compat_key");
  eq(localStorage.getItem("compat_key"), null);
});
add("on", () => {
  const el = document.createElement("button");
  let count = 0;
  const handler = () => count++;
  const unbind = lib.on(el, "click", handler);
  el.click();
  eq(count, 1);
  unbind();
  el.click();
  eq(count, 1);
});
add("off", () => {
  const el = document.createElement("button");
  let count = 0;
  const handler = () => count++;
  lib.on(el, "click", handler);
  lib.off(el, "click", handler);
  el.click();
  eq(count, 0);
});
add("delegate", () => {
  const root = document.createElement("div");
  const button = document.createElement("button");
  button.className = "item";
  root.appendChild(button);
  document.body.appendChild(root);
  let count = 0;
  const unbind = lib.delegate(root, ".item", "click", () => count++);
  button.click();
  eq(count, 1);
  unbind();
  button.click();
  eq(count, 1);
  root.remove();
});
add("isInViewport", () => {
  const el = document.createElement("div");
  document.body.appendChild(el);
  eq(lib.isInViewport(el), true);
  el.style.position = "absolute";
  el.style.top = "100000px";
  eq(lib.isInViewport(el), false);
  el.remove();
});
add("copyText", async () => {
  if (!navigator.clipboard) skip("Clipboard API unavailable");
  try {
    await lib.copyText("hello");
    const text = await navigator.clipboard.readText();
    eq(text, "hello");
  } catch (error) {
    if (/permission|denied|not allowed|not implemented|not supported/i.test(String(error && error.message))) {
      skip(`clipboard permission: ${error.message}`);
    }
    throw error;
  }
});
add("downloadFile", () => {
  const originalClick = HTMLAnchorElement.prototype.click;
  const originalCreate = URL.createObjectURL;
  const originalRevoke = URL.revokeObjectURL;
  let clicked = 0;
  let revoked = 0;
  HTMLAnchorElement.prototype.click = () => {
    clicked++;
  };
  URL.createObjectURL = () => "blob:mock";
  URL.revokeObjectURL = () => {
    revoked++;
  };
  try {
    lib.downloadFile("hello", "compat.txt", "text/plain");
  } finally {
    HTMLAnchorElement.prototype.click = originalClick;
    URL.createObjectURL = originalCreate;
    URL.revokeObjectURL = originalRevoke;
  }
  eq(clicked, 1, "anchor clicked");
  eq(revoked, 1, "blob url revoked");
});
add("readFileAsText", async () => {
  const file = new File(["hello"], "a.txt", { type: "text/plain" });
  eq(await lib.readFileAsText(file), "hello");
});
add("blobToBase64", async () => {
  const base64 = await lib.blobToBase64(new Blob(["hi"]));
  eq(base64, "aGk=");
});
add("base64ToBlob", async () => {
  const blob = lib.base64ToBlob("aGk=", "text/plain");
  eq(await blob.text(), "hi");
});

export async function runSmoke() {
  const results = [];
  const missing = EXPECTED.filter((name) => typeof lib[name] !== "function");
  results.push({
    name: "all exports exist",
    ok: missing.length === 0,
    error: missing.length ? `missing: ${missing.join(", ")}` : undefined,
  });
  const untested = EXPECTED.filter((name) => !cases.has(name));
  results.push({
    name: "all exports covered",
    ok: untested.length === 0,
    error: untested.length ? `untested: ${untested.join(", ")}` : undefined,
  });
  for (const [name, fn] of cases) {
    try {
      await fn();
      results.push({ name, ok: true });
    } catch (error) {
      if (error && error.skipped) {
        results.push({ name, ok: true, skipped: true, reason: String(error.message) });
      } else {
        results.push({ name, ok: false, error: String((error && error.message) || error) });
      }
    }
  }
  return results;
}
