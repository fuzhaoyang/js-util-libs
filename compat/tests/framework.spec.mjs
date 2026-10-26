import { test, expect } from "@playwright/test";

const APPS = [
  { name: "Vue 3 + Vite", url: "http://127.0.0.1:4173/" },
  { name: "React 19 + Vite", url: "http://127.0.0.1:4174/" },
  { name: "Angular 19", url: "http://127.0.0.1:4175/" },
];

for (const app of APPS) {
  test(`${app.name}: 全部导出行为正常`, async ({
    page,
    context,
    browserName,
  }) => {
    if (browserName === "chromium") {
      try {
        await context.grantPermissions(["clipboard-read", "clipboard-write"]);
      } catch {
        // 部分移动端 Chromium 不支持该权限
      }
    }
    const pageErrors = [];
    page.on("pageerror", (error) => pageErrors.push(String(error)));

    await page.bringToFront();
    await page.goto(app.url, { waitUntil: "load" });
    // Firefox 在 history.replaceState 后偶发执行上下文竞态，这里轮询读取
    let results;
    const startedAt = Date.now();
    while (Date.now() - startedAt < 60000) {
      try {
        const value = await page.evaluate(() => window.__SMOKE_RESULTS__);
        if (Array.isArray(value)) {
          results = value;
          break;
        }
      } catch {
        // 执行上下文切换中，继续重试
      }
      await page.waitForTimeout(100);
    }
    if (!Array.isArray(results)) {
      const status = await page
        .locator("#status")
        .textContent()
        .catch(() => "");
      throw new Error(`未取到测试结果，页面状态: ${String(status).slice(0, 200)}`);
    }
    const failed = results.filter((item) => !item.ok);
    const skipped = results.filter((item) => item.skipped);
    if (skipped.length) {
      console.log(
        `[${browserName}] skipped: ${skipped
          .map((item) => `${item.name} (${item.reason})`)
          .join(", ")}`
      );
    }
    expect(failed, JSON.stringify(failed, null, 2)).toEqual([]);
    expect(pageErrors).toEqual([]);
  });
}
