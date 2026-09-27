// Regenerates og-image.png (1200x630) and apple-touch-icon.png (180x180) with Playwright.
// Usage: node tools/make-images.cjs   (requires playwright)
const path = require("path");
let chromium;
try { ({ chromium } = require("playwright")); } catch { ({ chromium } = require("/opt/node22/lib/node_modules/playwright")); }
const img = (f) => path.join(__dirname, "..", "src/assets/img", f);
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ ignoreHTTPSErrors: true });
  // Fetch Google Fonts via curl (respects HTTPS_PROXY in sandboxed environments)
  const { execFileSync } = require("child_process");
  await ctx.route(/fonts\.(googleapis|gstatic)\.com/, (r) => {
    const url = r.request().url();
    try {
      const body = execFileSync("curl", ["-sS", "-m", "20", "-A", "Mozilla/5.0 Chrome/120", url]);
      r.fulfill({ body, contentType: url.includes("css") ? "text/css" : "font/woff2", headers: { "access-control-allow-origin": "*" } });
    } catch { r.abort(); }
  });
  const p = await ctx.newPage();
  await p.setViewportSize({ width: 1200, height: 630 });
  await p.goto("file://" + path.join(__dirname, "og-image.html"));
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  await p.screenshot({ path: img("og-image.png") });
  await p.setViewportSize({ width: 180, height: 180 });
  const svg = require("fs").readFileSync(img("favicon.svg"), "utf8").replace("<svg ", '<svg width="180" height="180" ');
  await p.setContent(`<style>html,body{margin:0}svg{display:block}</style>${svg}`);
  await p.waitForTimeout(200);
  await p.screenshot({ path: img("apple-touch-icon.png") });
  await b.close();
  console.log("✓ images generated");
})();
