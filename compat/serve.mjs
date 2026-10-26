import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] || ".");
const port = Number(process.argv[3] || 4173);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
};

http
  .createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    let filePath = path.join(root, urlPath === "/" ? "index.html" : urlPath);
    if (!filePath.startsWith(root)) {
      res.writeHead(403).end("forbidden");
      return;
    }
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(root, "index.html");
    }
    fs.readFile(filePath, (error, data) => {
      if (error) {
        res.writeHead(404).end("not found");
        return;
      }
      const headers = {
        "Content-Type": MIME[path.extname(filePath)] || "application/octet-stream",
        "Cache-Control": "no-store",
      };
      if (urlPath === "/csp.html") {
        headers["Content-Security-Policy"] =
          "default-src 'self'; script-src 'self'; worker-src 'self'";
      }
      res.writeHead(200, headers);
      res.end(data);
    });
  })
  .listen(port, "127.0.0.1", () => {
    console.log(`serving ${root} on http://127.0.0.1:${port}`);
  });
