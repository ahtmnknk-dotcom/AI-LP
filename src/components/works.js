import { html, lines } from '../lib/html.js';
import { sectionLabel, arrowUpRight, button, image } from './ui.js';

const Work = (work, index, total) => {
  const hasSp = Boolean(work.images.sp);
  const no = String(index + 1).padStart(2, '0');
  return html`
  <article class="work${hasSp ? ' work--has-sp' : ''}" style="--stage:${work.stage.bg};--stage-ink:${work.stage.ink}" aria-labelledby="work-${work.id}">
    <div class="work__stage" data-reveal>
      <figure class="device device--pc">
        <div class="device__bar" aria-hidden="true">
          <span class="device__dots"><i></i><i></i><i></i></span>
          <span class="device__url">${work.displayUrl}</span>
        </div>
        <div class="device__screen">
          ${image(work.images.pc, { sizes: '(min-width: 1024px) 70vw, 100vw' })}
        </div>
      </figure>
      ${hasSp
        ? html`<figure class="device device--sp">
            <div class="device__screen">${image(work.images.sp, { sizes: '(min-width: 1024px) 14vw, 30vw' })}</div>
          </figure>`
        : ''}
    </div>

    <div class="work__meta" data-reveal>
      <p class="work__index"><span>${no}</span> / ${String(total).padStart(2, '0')}</p>
      <div class="work__main">
        <h3 class="work__title" id="work-${work.id}">${work.title}</h3>
        <p class="work__category">${work.category}</p>
      </div>
      <p class="work__desc">${lines(work.description)}</p>
      ${work.url
        ? html`<a class="link-cta" href="${work.url}" target="_blank" rel="noopener">
            <span>VIEW PROJECT</span>${arrowUpRight}<span class="u-sr">（${work.title}・新しいタブで開きます）</span>
          </a>`
        : html`<span class="link-cta is-disabled" aria-disabled="true"><span>VIEW PROJECT</span><span class="link-cta__soon">Coming soon</span></span>`}
    </div>
  </article>`;
};

export const Works = ({ works, site }) => html`
  <section class="section works" id="works" aria-labelledby="works-title">
    <div class="container">
      ${sectionLabel(3, 'Works')}
      <h2 class="display-xl works__title" id="works-title" data-reveal>Selected <br>Works</h2>
      <div class="works__intro" data-reveal>
        <p class="works__copy">
          <span class="ib">テンプレートを使わないから、</span><br>
          <span class="ib">同じ会社が作っても、</span><span class="ib">こんなに違う。</span>
        </p>
        <p class="works__text">ブランド、サービス、届けたい相手に合わせて、<br>一つひとつゼロからデザインします。</p>
      </div>

      <div class="works__list">
        ${works.map((w, i) => Work(w, i, works.length))}
      </div>

      <div class="manifesto">
        <p class="manifesto__en" data-reveal>
          <span class="manifesto__line">No templates.</span>
          <span class="manifesto__line">No same-looking websites.</span>
        </p>
        <div class="manifesto__foot" data-reveal>
          <p class="manifesto__ja">業種が違えば、伝え方も違う。<br>だから私たちは、<br class="u-sp">テンプレートから選ばせません。</p>
          ${button({ href: site.cta.primary.href, label: site.cta.primary.label })}
        </div>
      </div>
    </div>
  </section>`;
