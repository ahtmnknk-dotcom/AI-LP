// Build: renders /docs/index.html (JP) and /docs/en/index.html (EN) from src/.
// Usage: npm run build   (no dependencies required)
import { cpSync, mkdirSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { config } from "./src/config.js";
import { content } from "./src/content.js";
import { renderPage } from "./src/template.js";

const out = "docs";
rmSync(out, { recursive: true, force: true });
mkdirSync(`${out}/en`, { recursive: true });
cpSync("src/assets", `${out}/assets`, { recursive: true });

writeFileSync(`${out}/index.html`, renderPage(content.ja));
writeFileSync(`${out}/en/index.html`, renderPage(content.en));
writeFileSync(`${out}/.nojekyll`, "");
writeFileSync(`${out}/robots.txt`, `User-agent: *\nAllow: /\nSitemap: ${config.siteUrl}sitemap.xml\n`);
writeFileSync(
  `${out}/sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${["", "en/"]
  .map(
    (p) => `  <url><loc>${config.siteUrl}${p}</loc>
    <xhtml:link rel="alternate" hreflang="ja" href="${config.siteUrl}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${config.siteUrl}en/"/>
  </url>`
  )
  .join("\n")}
</urlset>
`
);

for (const v of config.videos) {
  if (v.src && !existsSync(`src/${v.src}`)) console.warn(`⚠ video not found: src/${v.src}`);
}
if (config.siteUrl.includes("example.com")) console.warn("⚠ config.siteUrl is still a placeholder (example.com)");
console.log("✓ built docs/index.html (JP) and docs/en/index.html (EN)");
