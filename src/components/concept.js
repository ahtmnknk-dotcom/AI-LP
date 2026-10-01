import { html, phrases } from '../lib/html.js';
import { sectionLabel } from './ui.js';

const cases = [
  { tag: 'EVENT', text: ['来週開催するイベントのページが欲しい。'] },
  { tag: 'NEW SERVICE', text: ['新しく始めたサービスを紹介したい。'] },
  { tag: 'SHOP', text: ['GoogleマップやInstagramしかないので、', 'きちんとした店舗ページが欲しい。'] },
  { tag: 'CAMPAIGN', text: ['期間限定キャンペーンの受け皿が欲しい。'] },
];

const advanced = ['広告から問い合わせを獲得したい', 'LPを本格的な集客チャネルとして使いたい', 'SEOや市場調査まで含めて設計したい'];

export const Concept = () => html`
  <section class="section concept" id="concept" aria-labelledby="concept-title">
    <div class="container">
      ${sectionLabel(1, 'Concept')}
      <h2 class="h-jp-l concept__title" id="concept-title" data-reveal>
        ${phrases(['高いLPが', '必要な人もいれば、'])}<br>
        ${phrases(['必要ない人も', 'います。'])}
      </h2>

      <ol class="cases">
        ${cases.map(
          (c, i) => html`
          <li class="cases__item" data-reveal style="--d:${i * 60}ms">
            <span class="cases__index">${String(i + 1).padStart(2, '0')}</span>
            <span class="cases__tag">${c.tag}</span>
            <p class="cases__text">${c.text.map((t) => html`<span class="ib">${t}</span>`)}</p>
          </li>`,
        )}
      </ol>

      <div class="concept__advanced" data-reveal>
        <p class="concept__advanced-lead">一方で、</p>
        <ul class="concept__advanced-list">
          ${advanced.map((t) => html`<li>${t}</li>`)}
        </ul>
        <p class="concept__advanced-note">
          <span class="ib">こうした目的には、</span><span class="ib">より高度な設計が必要です。</span>
        </p>
      </div>

      <p class="statement" data-reveal>
        <span class="statement__before"><span class="statement__strike">「LPはいくらか」</span>ではなく、</span><br>
        <span class="statement__after"><em>「LPで何をしたいか」</em>で</span><span class="ib">料金を分けました。</span>
      </p>
    </div>
  </section>`;
