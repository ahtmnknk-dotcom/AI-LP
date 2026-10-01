import { html, yen } from '../lib/html.js';
import { button } from './ui.js';

export const Hero = ({ site, plans }) => {
  const entry = plans[0];
  const tags = [`最短${entry.leadDays}営業日`, '完全オリジナル', 'スマホ対応', '多言語対応'];

  return html`
  <section class="hero" id="top" aria-labelledby="hero-title">
    <div class="container">
      <div class="hero__meta" data-reveal>
        <span>${site.tagline}</span>
        <span class="hero__meta-plans" aria-hidden="true">Light / Standard / Pro</span>
      </div>

      <h1 class="hero__title" id="hero-title">
        <span class="line"><span class="line__inner">LPって、</span></span>
        <span class="line line--join"><span class="line__inner"><span class="hero__num">30</span>万円も</span></span><span class="line line--join"><span class="line__inner">必要ですか<span class="hero__q">？</span></span></span>
      </h1>

      <div class="hero__grid">
        <div class="hero__lead" data-reveal>
          <ul class="hero__scenes">
            <li>イベントを開催する。</li>
            <li>新しいサービスを始める。</li>
            <li>お店の情報をまとめたい。</li>
            <li>Instagramだけでは伝えきれない。</li>
          </ul>
          <p class="hero__voice">
            <span class="ib">「ちゃんとしたページは欲しい。</span><br>
            <span class="ib">でも、そのために</span><span class="ib">何十万円も</span><span class="ib">かける必要はない。」</span>
          </p>
          <p class="hero__closing">そんなビジネスのためのLP制作サービスです。</p>
        </div>

        <div class="hero__offer" data-reveal>
          <p class="hero__offer-label">完全オリジナルLP</p>
          <p class="price price--hero">
            <span class="price__num">${yen(entry.price)}</span><span class="price__unit">円〜</span>
          </p>
          <ul class="tags" aria-label="特長">
            ${tags.map((t) => html`<li class="tag">${t}</li>`)}
          </ul>
          <div class="hero__ctas">
            ${button({ href: site.cta.primary.href, label: site.cta.primary.label })}
            ${button({ href: site.cta.works.href, label: site.cta.works.label, variant: 'ghost' })}
          </div>
        </div>
      </div>
    </div>
    <div class="hero__scroll" aria-hidden="true"><span>Scroll</span></div>
  </section>`;
};
