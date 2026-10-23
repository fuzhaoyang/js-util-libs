const { checkBrowser } = require("../index");

function withUserAgent(userAgent, fn) {
  const original = Object.getOwnPropertyDescriptor(global, "navigator");
  Object.defineProperty(global, "navigator", {
    value: { userAgent },
    configurable: true,
  });
  try {
    fn();
  } finally {
    if (original) Object.defineProperty(global, "navigator", original);
    else delete global.navigator;
  }
}

describe("判断浏览器内核", () => {
  it("识别 Chrome", () => {
    withUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      () => expect(checkBrowser()).toEqual({ type: "Chrome", version: 120 })
    );
  });

  it("识别 Safari", () => {
    withUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
      () => expect(checkBrowser()).toEqual({ type: "Safari", version: 17 })
    );
  });
});
