const { storageSet, storageGet, storageRemove } = require("../index");

describe("storage 工具", () => {
  let store;

  beforeEach(() => {
    store = {};
    global.localStorage = {
      getItem: (key) => (key in store ? store[key] : null),
      setItem: (key, value) => {
        store[key] = String(value);
      },
      removeItem: (key) => {
        delete store[key];
      },
    };
  });

  afterEach(() => {
    delete global.localStorage;
  });

  it("存取删除对象", () => {
    storageSet("user", { id: 1 });
    expect(storageGet("user")).toEqual({ id: 1 });
    storageRemove("user");
    expect(storageGet("user", null)).toBe(null);
  });

  it("过期后返回默认值并删除", () => {
    storageSet("token", "abc", -1);
    expect(storageGet("token", "empty")).toBe("empty");
    expect(store.token).toBeUndefined();
  });

  it("兼容非 JSON 的历史数据", () => {
    store.legacy = "plain";
    expect(storageGet("legacy")).toBe("plain");
  });
});
