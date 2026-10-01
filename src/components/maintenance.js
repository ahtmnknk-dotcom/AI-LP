import { html, priceLabel, phrases } from '../lib/html.js';
import { sectionLabel } from './ui.js';

export const Maintenance = ({ options }) => {
  const related = options.filter((o) => o.id === 'update' || o.id === 'maintenance');
  return html`
  <section class="section maintenance" id="maintenance" aria-labelledby="maintenance-title">
    <div class="container maintenance__grid">
      <div>
        ${sectionLabel(8, 'After launch')}
        <h2 class="h-jp-l" id="maintenance-title" data-reveal>${phrases(['作ったあとも、'])}<br>${phrases(['縛りません。'])}</h2>
      </div>
      <div class="maintenance__body">
        <p class="maintenance__emphasis" data-reveal>${phrases(['保守契約の', '縛りなし。'])}</p>
        <div data-reveal>
          <p>公開後の保守・管理契約は必須ではありません。<br>必要な場合のみ、更新・保守サービスをご利用いただけます。</p>
          <dl class="maintenance__list">
            ${related.map((o) => html`<div><dt>${o.name}</dt><dd>${priceLabel(o, { plus: true })}</dd></div>`)}
          </dl>
        </div>
      </div>
    </div>
  </section>`;
};
