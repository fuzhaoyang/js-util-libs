const { get, set, pick, omit, deepMerge, deepEqual } = require("../index");

describe("object 工具", () => {
  const source = { a: { b: [{ c: 1 }] }, d: 2 };

  it("get 支持路径与默认值", () => {
    expect(get(source, "a.b[0].c")).toBe(1);
    expect(get(source, "a.b[1].c", "default")).toBe("default");
    expect(get(source, ["d"])).toBe(2);
  });

  it("set 支持路径并返回原对象", () => {
    const target = {};
    expect(set(target, "a.b[0].c", 1)).toBe(target);
    expect(target).toEqual({ a: { b: [{ c: 1 }] } });
  });

  it("pick / omit", () => {
    expect(pick(source, ["d"])).toEqual({ d: 2 });
    expect(omit(source, ["d"])).toEqual({ a: { b: [{ c: 1 }] } });
  });

  it("deepMerge 递归合并并直接修改目标", () => {
    const target = { a: { x: 1 }, list: [1] };
    const result = deepMerge(target, { a: { y: 2 }, list: [2, 3] });
    expect(result).toBe(target);
    expect(result).toEqual({ a: { x: 1, y: 2 }, list: [2, 3] });
  });

  it("deepEqual", () => {
    expect(deepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] })).toBe(true);
    expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false);
    expect(deepEqual(new Date(0), new Date(0))).toBe(true);
    expect(deepEqual(/a/g, /a/g)).toBe(true);
  });
});
