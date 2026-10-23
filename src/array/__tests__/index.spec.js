const { chunk, groupBy, sortBy } = require("../index");

describe("array 扩展", () => {
  it("chunk", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk([1], 0)).toEqual([]);
  });

  it("groupBy 支持函数与字段名", () => {
    const list = [
      { type: "a", n: 1 },
      { type: "b", n: 2 },
      { type: "a", n: 3 },
    ];
    expect(groupBy(list, "type")).toEqual({
      a: [list[0], list[2]],
      b: [list[1]],
    });
    expect(groupBy([1, 2, 3, 4], (n) => (n % 2 ? "odd" : "even"))).toEqual({
      odd: [1, 3],
      even: [2, 4],
    });
  });

  it("sortBy 返回新数组并支持倒序", () => {
    const list = [{ n: 2 }, { n: 1 }];
    expect(sortBy(list, "n").map((item) => item.n)).toEqual([1, 2]);
    expect(sortBy(list, "n", "desc").map((item) => item.n)).toEqual([2, 1]);
  });
});
