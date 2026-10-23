const {
  parseQuery,
  stringifyQuery,
  setQuery,
  removeQuery,
} = require("../index");

describe("query 工具", () => {
  it("parseQuery 解码并合并同名参数", () => {
    expect(
      parseQuery("https://a.com/p?x=1&y=hello%20world&x=2#hash")
    ).toEqual({ x: ["1", "2"], y: "hello world" });
    expect(parseQuery("https://a.com/p")).toEqual({});
  });

  it("stringifyQuery 忽略空值并展开数组", () => {
    expect(
      stringifyQuery({ x: 1, y: ["a", "b"], z: null, w: undefined })
    ).toBe("x=1&y=a&y=b");
  });

  it("setQuery 保留路径与 hash", () => {
    expect(setQuery("https://a.com/p?x=1#h", "y", "2")).toBe(
      "https://a.com/p?x=1&y=2#h"
    );
  });

  it("removeQuery 删除指定参数", () => {
    expect(removeQuery("https://a.com/p?x=1&y=2#h", "x")).toBe(
      "https://a.com/p?y=2#h"
    );
    expect(removeQuery("https://a.com/p?x=1", "x")).toBe("https://a.com/p");
  });
});
