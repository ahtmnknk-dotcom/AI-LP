import { html, priceLabel } from '../lib/html.js';
import { sectionLabel } from './ui.js';

const samples = [
  { text: 'こんにちは', lang: 'ja' },
  { text: 'Hello', lang: 'en' },
  { text: '你好', lang: 'zh' },
  { text: '안녕하세요', lang: 'ko' },
  { text: 'Bonjour', lang: 'fr' },
];

export const Multilingual = ({ options }) => {
  const language = options.find((o) => o.id === 'language');
  return html`
  <section class="section multilingual" id="multilingual" aria-labelledby="multilingual-title">
    <div class="container">
      ${sectionLabel(5, 'Multilingual')}
      <div class="multilingual__grid">
        <div>
          <h2 class="display-l" id="multilingual-title" data-reveal>One business. <br>More languages.</h2>
          <div class="multilingual__body" data-reveal>
            <p>英語、中国語、韓国語など、<br>多言語LPにも対応しています。</p>
            <p>海外向けサービスや、<br>インバウンド向け店舗にも。</p>
          </div>
          <div class="multilingual__price" data-reveal>
            <p class="multilingual__price-value">${priceLabel(language, { plus: true })}</p>
            <p class="multilingual__price-note">対応可能言語はご相談ください。</p>
          </div>
        </div>
        <ul class="langs" aria-label="対応言語の例" data-reveal>
          ${samples.map((s, i) => html`<li lang="${s.lang}" style="--i:${i}">${s.text}</li>`)}
          <li class="langs__more" aria-label="ほか">…</li>
        </ul>
      </div>
    </div>
  </section>`;
};
