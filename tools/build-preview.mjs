// Builds a self-contained preview (CSS/JS/images inlined) into preview/
// for sharing as a private claude.ai Artifact. Not used for production.
// Usage: npm run build && node tools/build-preview.mjs
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, copyFileSync } from "node:fs";

const css = readFileSync("docs/assets/css/style.css", "utf8");
const js = readFileSync("docs/assets/js/main.js", "utf8");
const dataUri = (f, type) => `data:${type};base64,${readFileSync(f).toString("base64")}`;
const favicon = dataUri("docs/assets/img/favicon.svg", "image/svg+xml");

function inline(html, root) {
  return html
    .replace(`<link rel="stylesheet" href="${root}assets/css/style.css">`, `<style>\n${css}\n</style>`)
    .replace(`<script src="${root}assets/js/main.js" defer></script>`, `<script>\n${js}\n</script>`)
    .replace(`href="${root}assets/img/favicon.svg"`, `href="${favicon}"`)
    .replace(/<link rel="apple-touch-icon"[^>]*>\n/, "")
    // Posters: small, inline as data URIs. Videos stay as separate published
    // files (copied to preview/assets/videos) so each page stays light and
    // loads fully on a phone before the videos are fetched.
    .replace(/poster="(?:\.\.\/)?(assets\/videos\/[^"]+)"/g, (_, f) => `poster="${dataUri("docs/" + f, "image/jpeg")}"`)
    .replace(/<title>[^<]*<\/title>/, "<title>MILKUNE STORIES</title>");
}

rmSync("preview", { recursive: true, force: true });
mkdirSync("preview/en", { recursive: true });
mkdirSync("preview/assets/videos", { recursive: true });
for (const f of readdirSync("docs/assets/videos")) {
  if (f.endsWith(".mp4")) copyFileSync(`docs/assets/videos/${f}`, `preview/assets/videos/${f}`);
}

// JP page: the Artifact host supplies <!doctype>/<html>/<head>/<body>, so emit a fragment.
let ja = inline(readFileSync("docs/index.html", "utf8"), "");
ja = ja
  .replace(/<!doctype html>\n<html[^>]*>\n<head>\n/, "")
  .replace(/<\/head>\n<body class="lang-ja">/, '<script>document.documentElement.lang="ja";document.body.classList.add("lang-ja");</script>')
  .replace(/<\/body>\n<\/html>\n?$/, "");
writeFileSync("preview/index.html", ja);

// EN page: served as a supporting page, so it keeps its full document.
writeFileSync("preview/en/index.html", inline(readFileSync("docs/en/index.html", "utf8"), "../"));
console.log("✓ preview/index.html + preview/en/index.html");
