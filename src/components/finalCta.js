import { html, phrases, yen } from '../lib/html.js';
import { button } from './ui.js';

export const FinalCta = ({ site, plans }) => html`
  <section class="final" id="start" aria-labelledby="final-title">
    <div class="container">
      <h2 class="final__title" id="final-title" data-reveal>
        <span class="final__quote">「LPが欲しい。」</span>
        <span class="final__sub">${phrases(['そのために、'])}<br>${phrases(['30万円から', '始めなくてもいい。'])}</span>
      </h2>

      <div class="final__grid">
        <div class="final__body" data-reveal>
          <p>まず必要なのは、<br>あなたの目的に合ったページを持つこと。</p>
          <ul class="final__scenes">
            <li>イベントでも。</li>
            <li>新しいサービスでも。</li>
            <li>小さなお店でも。</li>
            <li>初めてのビジネスでも。</li>
          </ul>
          <p class="final__closing">必要なものだけを選んで、<br>ちゃんと作る。</p>
        </div>

        <div class="final__offer" data-reveal>
          <p class="final__offer-label">完全オリジナルLP</p>
          <p class="price price--final"><span class="price__num">${yen(plans[0].price)}</span><span class="price__unit">円〜</span></p>
          <ul class="final__facts">
            <li>最短${plans[0].leadDays}営業日。</li>
            <li>テンプレート不使用。</li>
            <li>保守契約の縛りなし。</li>
          </ul>
          ${button({ href: site.cta.primary.href, label: site.cta.primary.label, variant: 'light', size: 'lg' })}
        </div>
      </div>
    </div>
  </section>`;
