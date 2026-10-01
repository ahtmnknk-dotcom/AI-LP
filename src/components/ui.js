import { html } from '../lib/html.js';

/** セクション上部の番号ラベル: (01) ── Concept */
export const sectionLabel = (index, label, { dark = false } = {}) => html`
  <p class="section-label${dark ? ' section-label--dark' : ''}" data-reveal>
    <span class="section-label__index">(${String(index).padStart(2, '0')})</span>
    <span class="section-label__rule" aria-hidden="true"></span>
    <span class="section-label__text">${label}</span>
  </p>`;

export const arrow = html`<svg class="icon-arrow" viewBox="0 0 20 20" width="20" height="20" aria-hidden="true" focusable="false"><path d="M3 10h13M11 4.5 16.5 10 11 15.5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`;

export const arrowUpRight = html`<svg class="icon-arrow" viewBox="0 0 20 20" width="20" height="20" aria-hidden="true" focusable="false"><path d="M5.5 14.5 14.5 5.5M7 5.5h7.5V13" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`;

export const check = html`<svg class="icon-check" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false"><path d="m3 8.4 3.2 3.1L13 4.6" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>`;

/**
 * ボタン / リンク。variant: primary | ghost | light
 * plan を渡すとフォームのプランが事前選択されます。
 */
export const button = ({ href, label, variant = 'primary', size, plan, className = '' }) => html`
  <a class="btn btn--${variant}${size ? ` btn--${size}` : ''}${className ? ` ${className}` : ''}" href="${href}"${
    plan ? html` data-plan="${plan}"` : ''
  }>
    <span class="btn__label">${label}</span>
    <span class="btn__icon">${arrow}</span>
  </a>`;

/** 画像（width/height 指定で CLS を防止） */
export const image = ({ src, width, height, alt, sources = [] }, { lazy = true, className = '', sizes } = {}) => html`
  <picture>
    ${sources.map((s) => html`<source type="${s.type}" srcset="${s.srcset}"${sizes ? html` sizes="${sizes}"` : ''}>`)}
    <img class="${className}" src="${src}" width="${width}" height="${height}" alt="${alt}"${
      lazy ? html` loading="lazy"` : ''
    } decoding="async"${sizes ? html` sizes="${sizes}"` : ''}>
  </picture>`;
