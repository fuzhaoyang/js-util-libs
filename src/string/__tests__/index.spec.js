const { escapeRegExp, camelCase, kebabCase, truncate } = require("../index");

describe("string 工具", () => {
  it("escapeRegExp", () => {
    expect(escapeRegExp("a.b*c")).toBe("a\\.b\\*c");
    expect(new RegExp(escapeRegExp("1+1")).test("1+1")).toBe(true);
  });

  it("camelCase", () => {
    expect(camelCase("foo-bar")).toBe("fooBar");
    expect(camelCase("foo_bar baz")).toBe("fooBarBaz");
    expect(camelCase("FooBar")).toBe("fooBar");
  });

  it("kebabCase", () => {
    expect(kebabCase("fooBar")).toBe("foo-bar");
    expect(kebabCase("foo_bar baz")).toBe("foo-bar-baz");
  });

  it("truncate", () => {
    expect(truncate("abcdef", 4)).toBe("a...");
    expect(truncate("abcdef", 10)).toBe("abcdef");
    expect(truncate("abcdef", 2, "…")).toBe("a…");
  });
});
