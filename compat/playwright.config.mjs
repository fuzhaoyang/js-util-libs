import { defineConfig, devices } from "@playwright/test";
import { fileURLToPath } from "node:url";

const cwd = fileURLToPath(new URL(".", import.meta.url));
const systemChrome =
  process.env.PLAYWRIGHT_SYSTEM_CHROME === "1" ? { channel: "chrome" } : {};

export default defineConfig({
  testDir: "./tests",
  timeout: 90000,
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  webServer: [
    {
      command: "node serve.mjs dist/vue 4173",
      url: "http://127.0.0.1:4173",
      cwd,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "node serve.mjs dist/react 4174",
      url: "http://127.0.0.1:4174",
      cwd,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "node serve.mjs dist/angular/browser 4175",
      url: "http://127.0.0.1:4175",
      cwd,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "node serve.mjs dist/native 4176",
      url: "http://127.0.0.1:4176/worker.html",
      cwd,
      reuseExistingServer: !process.env.CI,
    },
  ],
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"], ...systemChrome } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    { name: "mobile-chrome", use: { ...devices["Pixel 7"], ...systemChrome } },
    { name: "mobile-safari", use: { ...devices["iPhone 13"] } },
  ],
});
