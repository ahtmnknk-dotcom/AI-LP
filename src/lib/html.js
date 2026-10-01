/**
 * 依存ゼロの最小テンプレートユーティリティ。
 * html`` 内の埋め込み値は自動でエスケープされ、html`` / raw() の戻り値はそのまま出力されます。
 */
const RAW = Symbol('raw');

export const raw = (value) => ({ [RAW]: true, value: String(value) });

export const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );

const render = (value) => {
  if (value == null || value === false || value === true) return '';
  if (Array.isArray(value)) return value.map(render).join('');
  if (typeof value === 'object' && value[RAW]) return value.value;
  return escape(value);
};

export const html = (strings, ...values) =>
  raw(strings.reduce((out, str, i) => out + str + (i < values.length ? render(values[i]) : ''), ''));

export const toString = (value) => render(value);

/** 行の配列を <br> 区切りで出力 */
export const lines = (arr) =>
  (Array.isArray(arr) ? arr : [arr]).map((line, i) => (i === 0 ? html`${line}` : html`<br>${line}`));

/**
 * 日本語見出しを文節単位で折り返すための inline-block 化。
 * 配列の要素ごとに改行候補になります。
 */
export const phrases = (arr) => arr.map((p) => html`<span class="ib">${p}</span>`);

/** 29800 → "29,800" */
export const yen = (n) => n.toLocaleString('ja-JP');

/** オプション・プランの価格表記: "＋5,000円〜 / 1ページ" */
export const priceLabel = ({ price, from, unit, extra }, { plus = false } = {}) =>
  `${plus ? '＋' : ''}${yen(price)}円${from ? '〜' : ''}${extra ? ` ＋ ${extra}` : ''}${unit ? ` / ${unit}` : ''}`;
