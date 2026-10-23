const { memoize, once } = require("../index");

describe("function 工具", () => {
  it("memoize 缓存结果", () => {
    const fn = jest.fn((n) => n * 2);
    const memoized = memoize(fn);
    expect(memoized(2)).toBe(4);
    expect(memoized(2)).toBe(4);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("memoize 支持 resolver", () => {
    const fn = jest.fn((a, b) => a + b);
    const memoized = memoize(fn, (a, b) => `${a}-${b}`);
    expect(memoized(1, 2)).toBe(3);
    expect(memoized(1, 2)).toBe(3);
    expect(memoized(2, 1)).toBe(3);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("once 只执行一次", () => {
    const fn = jest.fn(() => "value");
    const wrapped = once(fn);
    expect(wrapped()).toBe("value");
    expect(wrapped()).toBe("value");
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
