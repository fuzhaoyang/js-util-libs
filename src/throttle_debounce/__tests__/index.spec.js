it('防抖Debounce this指向', () => {
  const { debounce } = require("../index");
  // 定义测试函数
  const testData = Object.create({});
  let testFncThis;
  const testFnc = function() {
    testFncThis = this;
  }
  // 封装一个防抖函数
  const fn = debounce(testFnc, 10);
  // 改变函数this执行
  fn.call(testData);
  setTimeout(() => {
    expect(testFncThis).toBe(testData);
  }, 30)
})

it('节流Throttle this指向', () => {
  const { throttle } = require("../index");
  // 定义测试函数
  const testData = Object.create({});
  const testFnc = function() {
    // 验证函数this执行是否正确
    expect(this).toBe(testData);
  }
  // 封装一个防抖函数
  const fn = throttle(testFnc, 10);
  // 改变函数this执行
  fn.call(testData);
})


it("节流Throttle", (done) => {
  const { throttle } = require("../index");

  // 定义一个Mock函数
  const mockFn = jest.fn();

  // 封装为节流方法
  const fn = throttle(mockFn, 10);

  // 同步调用两次
  fn(1);
  fn(2);

  setTimeout(() => {
    const calls = mockFn.mock.calls;

    // 断言 mock方法只调用一次
    expect(calls.length).toBe(1);
    // 根据参数判断以第一次调用为准
    expect(calls[0][0]).toBe(1);
    done();
  }, 50);
});

it("防抖Debounce", (done) => {
  const { debounce } = require("../index");
  const mockFn = jest.fn();
  // 封装一个防抖函数
  const fn = debounce(mockFn, 10);

  // 连续两次调用
  fn(1);
  fn(2);
  setTimeout(() => {
    const calls = mockFn.mock.calls;
    // 断言只调用一次
    expect(calls.length).toBe(1);

    // 断言以最后一次调用为准
    expect(calls[0][0]).toBe(2);
    done();
  }, 50);
});

describe("debounce 扩展", () => {
  it("cancel 后不再执行", (done) => {
    const { debounce } = require("../index");
    const fn = jest.fn();
    const debounced = debounce(fn, 10);
    debounced(1);
    debounced.cancel();
    setTimeout(() => {
      expect(fn).not.toHaveBeenCalled();
      done();
    }, 30);
  });

  it("flush 立即执行", () => {
    const { debounce } = require("../index");
    const fn = jest.fn();
    const debounced = debounce(fn, 1000);
    debounced(1);
    debounced.flush();
    expect(fn).toHaveBeenCalledWith(1);
  });

  it("leading 为 true 时首次立即执行", (done) => {
    const { debounce } = require("../index");
    const fn = jest.fn();
    const debounced = debounce(fn, 10, { leading: true });
    debounced(1);
    expect(fn).toHaveBeenCalledTimes(1);
    setTimeout(() => {
      expect(fn).toHaveBeenCalledTimes(1);
      done();
    }, 30);
  });
});
