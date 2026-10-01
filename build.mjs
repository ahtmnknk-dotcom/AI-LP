/**
 * 静的ビルド: src/ のデータとコンポーネントから dist/index.html を生成します。
 * 依存パッケージなし（Node.js 18+）。
 */
import { readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { renderPage } from './src/page.js';
import { toString } from './src/lib/html.js';
import { site } from './src/data/site.js';

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, 'dist');

/** 安全な範囲の簡易CSS圧縮（コメント・余分な空白の除去） */
const minifyCss = (css) =>
  css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};,>])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();

const hash = (s) => createHash('sha256').update(s).digest('hex').slice(0, 8);

await rm(dist, { recursive: true, force: true });
await mkdir(join(dist, 'assets'), { recursive: true });
await cp(join(root, 'public'), dist, { recursive: true });

const css = minifyCss(await readFile(join(root, 'src/styles/main.css'), 'utf8'));
const js = await readFile(join(root, 'src/scripts/main.js'), 'utf8');
const scriptSrc = `assets/main.${hash(js)}.js`;
await writeFile(join(dist, scriptSrc), js);

const page = toString(renderPage({ css, scriptSrc }));
await writeFile(join(dist, 'index.html'), page);

const today = new Date().toISOString().slice(0, 10);
await writeFile(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${site.url}</loc><lastmod>${today}</lastmod></url></urlset>\n`,
);
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap.xml', site.url).href}\n`);

console.log(`Built dist/index.html (${(page.length / 1024).toFixed(1)} KB, css ${(css.length / 1024).toFixed(1)} KB, js ${(js.length / 1024).toFixed(1)} KB)`);
