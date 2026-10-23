const lib = require("../index");

const EXPORTS = [
  "debounce",
  "throttle",
  "deepCopy",
  "shallCopy",
  "call",
  "apply",
  "bind",
  "dateFormat",
  "beforeDateFormat",
  "getWeek",
  "escapeHtml",
  "matchingAllImg",
  "scrollAnimation",
  "scrollToTop",
  "scrollToBottom",
  "loadScript",
  "getUrlParms",
  "bubbleSort",
  "counterSort",
  "insertSort",
  "mergeSort",
  "sort",
  "selectionSort",
  "isEmail",
  "isPhone",
  "isURL",
  "isWeiXin",
  "isQQ",
  "isCarNo",
  "password",
  "isCn",
  "isPostNo",
  "isRGB",
  "bankCardCheck",
  "isIdCard",
  "isIpv4",
  "checkNum",
  "isObject",
  "isEmptyObject",
  "isArray",
  "isType",
  "isVersion",
  "isPassport",
  "getOSType",
  "clipboard",
  "cliboard",
  "checkBrowser",
  "cookieSet",
  "cookieGet",
  "cookieRemove",
  "getHtmlText",
  "base64Decode",
  "base64Encode",
  "utf8Decode",
  "utf8Encode",
  "trim",
  "thousandth",
  "changeToChinese",
  "formatSize",
  "loadStyle",
  "arrayToTree",
  "arrScrambling",
  "unique",
  "flat",
  "randomString",
  "randomRange",
  "randomNum",
  "digitUppercase",
  "telFormat",
  "firstLetterUpper",
  "fistLetterUpper",
  "largeNumberAdd",
  "largeNumbersMultiply",
  "sleep",
  "retry",
  "withTimeout",
  "memoize",
  "once",
  "pick",
  "omit",
  "get",
  "set",
  "deepMerge",
  "deepEqual",
  "escapeRegExp",
  "camelCase",
  "kebabCase",
  "truncate",
  "chunk",
  "groupBy",
  "sortBy",
  "clamp",
  "sum",
  "average",
  "round",
  "add",
  "sub",
  "mul",
  "div",
  "formatCurrency",
  "parseMoney",
  "isNil",
  "isPromise",
  "isPlainObject",
  "isEmpty",
  "isCreditCode",
  "isOrganizationCode",
  "isNewEnergyCarNo",
  "getAge",
  "getGender",
  "getBankCardType",
  "maskPhone",
  "maskIdCard",
  "maskName",
  "maskEmail",
  "maskBankCard",
  "uuid",
  "encodeHtml",
  "unescapeHtml",
  "parseQuery",
  "stringifyQuery",
  "setQuery",
  "removeQuery",
  "storageSet",
  "storageGet",
  "storageRemove",
  "on",
  "off",
  "delegate",
  "isInViewport",
  "copyText",
  "downloadFile",
  "readFileAsText",
  "blobToBase64",
  "base64ToBlob",
];

describe("入口导出", () => {
  it("所有导出都存在且为函数", () => {
    EXPORTS.forEach((name) => {
      expect(typeof lib[name]).toBe("function");
    });
  });

  it("导出清单与入口一致（无遗漏、无多余）", () => {
    expect(Object.keys(lib).sort()).toEqual([...EXPORTS].sort());
  });

  it("此前导出错误的模块已可用", () => {
    expect(lib.mergeSort([3, 1, 2])).toEqual([1, 2, 3]);
    expect(lib.utf8Decode(lib.utf8Encode("我是utf8"))).toBe("我是utf8");
    expect(lib.clipboard).toBe(lib.cliboard);
    expect(lib.firstLetterUpper).toBe(lib.fistLetterUpper);
    expect(lib.arrScrambling([1, 2, 3]).sort()).toEqual([1, 2, 3]);
  });
});

describe("cookie 导出", () => {
  afterEach(() => {
    delete global.document;
  });

  it("设置、获取、移除 cookie", () => {
    let jar = {};
    global.document = {
      get cookie() {
        return Object.keys(jar)
          .map((key) => `${key}=${jar[key]}`)
          .join("; ");
      },
      set cookie(value) {
        const [pair, ...attrs] = value.split(";");
        const index = pair.indexOf("=");
        const key = pair.slice(0, index);
        const val = pair.slice(index + 1);
        const expired = attrs.some((attr) => attr.includes("1970"));
        if (expired) delete jar[key];
        else jar[key] = val;
      },
    };

    lib.cookieSet("token", "abc");
    expect(lib.cookieGet("token")).toBe("abc");

    lib.cookieRemove("token");
    expect(lib.cookieGet("token")).toBe("");
  });
});
