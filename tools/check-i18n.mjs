// Checks that every text item in the JP content has an English counterpart.
// Reports: keys missing in EN, arrays with different lengths, and items that
// are filled in JP but empty in EN (and vice versa).
// Usage: node tools/check-i18n.mjs   (also run automatically by build.mjs)
import { content } from "../src/content.js";

// Keys that intentionally exist in one language only.
const ALLOW_ONE_SIDED = new Set([
  "path", "lang", "htmlLang", "ogLocale",
  "pricing.noteSub",   // JP page shows the English pricing note as a sub-line
  "final.bodyEn",      // JP page echoes the English final copy
]);

const problems = [];
const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);

function walk(ja, en, path) {
  const key = path.join(".").replace(/\.\d+(?=\.|$)/g, "");
  if (ALLOW_ONE_SIDED.has(key)) return;
  if (Array.isArray(ja) || Array.isArray(en)) {
    if (!Array.isArray(ja) || !Array.isArray(en)) return problems.push(`${path.join(".")}: type mismatch`);
    if (ja.length !== en.length) problems.push(`${path.join(".")}: JP has ${ja.length} items, EN has ${en.length}`);
    ja.forEach((v, i) => walk(v, en[i], [...path, i]));
    return;
  }
  if (isObj(ja) || isObj(en)) {
    const keys = new Set([...Object.keys(ja || {}), ...Object.keys(en || {})]);
    for (const k of keys) {
      if (ALLOW_ONE_SIDED.has([...path, k].join(".").replace(/\.\d+(?=\.|$)/g, ""))) continue;
      if (!(k in (en || {}))) problems.push(`${[...path, k].join(".")}: missing in EN`);
      else if (!(k in (ja || {}))) problems.push(`${[...path, k].join(".")}: missing in JP`);
      else walk(ja[k], en[k], [...path, k]);
    }
    return;
  }
  const jaEmpty = ja === "" || ja == null, enEmpty = en === "" || en == null;
  if (jaEmpty !== enEmpty) problems.push(`${path.join(".")}: ${jaEmpty ? "empty in JP" : "empty in EN"}`);
  if (typeof en === "string" && /[぀-ヿ㐀-鿿]/.test(en)) problems.push(`${path.join(".")}: Japanese text in EN`);
}

walk(content.ja, content.en, []);
if (problems.length) {
  console.error(`✗ i18n: ${problems.length} problem(s)\n  - ` + problems.join("\n  - "));
  process.exitCode = 1;
} else {
  console.log("✓ i18n: every JP text item has an EN counterpart");
}
