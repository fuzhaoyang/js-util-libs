const { sleep, retry, withTimeout } = require("../index");

describe("async 工具", () => {
  it("sleep 延时", async () => {
    const start = Date.now();
    await sleep(20);
    expect(Date.now() - start).toBeGreaterThanOrEqual(15);
  });

  it("retry 成功前会重试", async () => {
    let count = 0;
    const result = await retry(
      async () => {
        count++;
        if (count < 3) throw new Error("fail");
        return "ok";
      },
      { retries: 3, delay: 0 }
    );
    expect(result).toBe("ok");
    expect(count).toBe(3);
  });

  it("retry 用尽后抛出最后一次错误", async () => {
    await expect(
      retry(async () => {
        throw new Error("boom");
      }, { retries: 1, delay: 0 })
    ).rejects.toThrow("boom");
  });

  it("withTimeout 正常返回", async () => {
    await expect(withTimeout(Promise.resolve(1), 100)).resolves.toBe(1);
  });

  it("withTimeout 超时", async () => {
    await expect(withTimeout(new Promise(() => {}), 10)).rejects.toThrow(
      /Timeout/
    );
  });
});
