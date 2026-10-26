import { test, expect } from "@playwright/test";

test("Web Worker 中可加载并运行", async ({ page }) => {
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(String(error)));
  await page.goto("http://127.0.0.1:4176/worker.html");
  const handle = await page.waitForFunction(
    () => window.__WORKER_RESULTS__ ?? false,
    null,
    { timeout: 30000 }
  );
  const result = await handle.jsonValue();
  expect(result.error).toBeUndefined();
  expect(result).toEqual({
    chunk: "[[1,2],[3]]",
    deepCopy: 1,
    base64: "5oiR5piv",
    query: '{"a":["1","2"]}',
    add: 0.3,
  });
  expect(pageErrors).toEqual([]);
});

test("严格 CSP（无 unsafe-eval）下可运行", async ({ page }) => {
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(String(error)));
  await page.goto("http://127.0.0.1:4176/csp.html");
  const handle = await page.waitForFunction(
    () =>
      window.__CSP_OK__ === true || window.__CSP_ERROR__ != null
        ? { ok: window.__CSP_OK__, error: window.__CSP_ERROR__ }
        : false,
    null,
    { timeout: 30000 }
  );
  const state = await handle.jsonValue();
  expect(state.error).toBeUndefined();
  expect(state.ok).toBe(true);
  expect(pageErrors).toEqual([]);
});
