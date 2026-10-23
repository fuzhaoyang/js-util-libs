const { on, off, delegate, isInViewport, copyText } = require("../index");

const createElement = () => {
  const listeners = {};
  return {
    listeners,
    addEventListener(type, handler) {
      (listeners[type] = listeners[type] || []).push(handler);
    },
    removeEventListener(type, handler) {
      listeners[type] = (listeners[type] || []).filter(
        (item) => item !== handler
      );
    },
    contains() {
      return true;
    },
    getBoundingClientRect() {
      return this.rect;
    },
  };
};

describe("dom 工具", () => {
  it("on 返回解绑函数", () => {
    const el = createElement();
    const handler = () => {};
    const unbind = on(el, "click", handler);
    expect(el.listeners.click).toHaveLength(1);
    unbind();
    expect(el.listeners.click).toHaveLength(0);
  });

  it("off 解绑事件", () => {
    const el = createElement();
    const handler = () => {};
    on(el, "click", handler);
    off(el, "click", handler);
    expect(el.listeners.click).toHaveLength(0);
  });

  it("delegate 命中选择器时触发", () => {
    const root = createElement();
    const target = { id: "item" };
    const handler = jest.fn();
    delegate(root, ".item", "click", handler);
    root.listeners.click[0]({ target: { closest: () => target } });
    expect(handler).toHaveBeenCalledWith(expect.anything(), target);
  });

  it("isInViewport", () => {
    global.window = { innerWidth: 100, innerHeight: 100 };
    const el = createElement();
    el.rect = { top: 10, bottom: 50, left: 10, right: 50 };
    expect(isInViewport(el)).toBe(true);
    el.rect = { top: 200, bottom: 300, left: 10, right: 50 };
    expect(isInViewport(el)).toBe(false);
    delete global.window;
  });

  it("copyText 优先使用 Clipboard API", async () => {
    const writeText = jest.fn(() => Promise.resolve());
    Object.defineProperty(global, "navigator", {
      value: { clipboard: { writeText } },
      configurable: true,
    });
    await copyText("hello");
    expect(writeText).toHaveBeenCalledWith("hello");
    delete global.navigator;
  });
});
