import { html, lines, yen } from '../lib/html.js';
import { sectionLabel, check, button } from './ui.js';

const Plan = (plan, index, planById) => {
  const parent = plan.inherits ? planById[plan.inherits] : null;
  return html`
  <article class="plan plan--${plan.id}" id="plan-${plan.id}" aria-labelledby="plan-${plan.id}-name" data-reveal style="--d:${index * 80}ms">
    <header class="plan__head">
      <p class="plan__index">${String(index + 1).padStart(2, '0')}</p>
      <h3 class="plan__name" id="plan-${plan.id}-name">${plan.name}</h3>
      <p class="price price--plan">
        <span class="price__num">${yen(plan.price)}</span><span class="price__unit">円${plan.from ? '〜' : ''}</span>
      </p>
      <p class="plan__copy">「${lines(plan.copy)}」</p>
    </header>

    <dl class="plan__specs">
      <div><dt>納期</dt><dd>最短<strong>${plan.leadDays}</strong>営業日</dd></div>
      <div><dt>修正</dt><dd><strong>${plan.revisions}</strong>回</dd></div>
    </dl>

    ${plan.useCases.length
      ? html`<div class="plan__block">
          <h4 class="plan__block-title">向いている用途</h4>
          <ul class="plan__uses">${plan.useCases.map((u) => html`<li>${u}</li>`)}</ul>
        </div>`
      : ''}

    <div class="plan__block">
      <h4 class="plan__block-title">${parent ? html`<span class="plan__inherit">${parent.name}の内容すべて</span>に加えて` : '含まれる内容'}</h4>
      <ul class="checklist">
        ${plan.includes.map((item) => html`<li>${check}<span>${item}</span></li>`)}
      </ul>
    </div>

    <div class="plan__foot">
      ${button({ href: '#contact', label: `${plan.name}で相談する`, variant: 'ghost', plan: plan.id, className: 'btn--block' })}
    </div>
  </article>`;
};

const Comparison = ({ plans, comparison }) => html`
  <div class="compare" id="compare" data-compare>
    <div class="compare__head" data-reveal>
      <h3 class="compare__title"><span class="compare__title-en">Plan comparison</span>プラン比較</h3>
    </div>

    <div class="compare__tabs" role="tablist" aria-label="比較するプランを選択" data-compare-tabs hidden>
      ${plans.map(
        (p, i) => html`<button type="button" role="tab" class="compare__tab" id="compare-tab-${p.id}" aria-selected="${i === 0 ? 'true' : 'false'}" aria-controls="compare-table" tabindex="${i === 0 ? '0' : '-1'}" data-plan-tab="${p.id}">${p.name}<span>${yen(p.price)}円${p.from ? '〜' : ''}</span></button>`,
      )}
    </div>

    <div class="compare__table-wrap" data-reveal>
      <table class="compare__table" id="compare-table" data-active="${plans[0].id}">
        <caption class="u-sr">プラン別の制作内容比較</caption>
        <thead>
          <tr>
            <th scope="col" class="compare__corner">項目</th>
            ${plans.map(
              (p) => html`<th scope="col" class="col-${p.id}"><span class="compare__plan">${p.name}</span><span class="compare__price">${yen(p.price)}円${p.from ? '〜' : ''}</span></th>`,
            )}
          </tr>
        </thead>
        ${comparison.map(
          (g) => html`<tbody>
            <tr class="compare__group"><th scope="rowgroup" colspan="${plans.length + 1}">${g.group}</th></tr>
            ${g.rows.map(
              (r) => html`<tr>
                <th scope="row">${r.label}</th>
                ${plans.map((p) =>
                  r.plans.includes(p.id)
                    ? html`<td class="col-${p.id} is-yes">${check}<span class="u-sr">含まれる</span></td>`
                    : html`<td class="col-${p.id} is-no"><span aria-hidden="true">—</span><span class="u-sr">含まれない</span></td>`,
                )}
              </tr>`,
            )}
          </tbody>`,
        )}
        <tbody>
          <tr class="compare__group"><th scope="rowgroup" colspan="${plans.length + 1}">修正・納期</th></tr>
          <tr><th scope="row">修正回数</th>${plans.map((p) => html`<td class="col-${p.id} is-text">${p.revisions}回</td>`)}</tr>
          <tr><th scope="row">納期</th>${plans.map((p) => html`<td class="col-${p.id} is-text">最短${p.leadDays}営業日</td>`)}</tr>
        </tbody>
      </table>
    </div>
  </div>`;

export const Pricing = ({ plans, comparison, site }) => {
  const planById = Object.fromEntries(plans.map((p) => [p.id, p]));
  return html`
  <section class="section pricing" id="pricing" aria-labelledby="pricing-title">
    <div class="container">
      ${sectionLabel(4, 'Pricing')}
      <div class="section-head">
        <h2 class="display-xl" id="pricing-title" data-reveal>Purpose first. <br>Price second.</h2>
        <p class="section-head__lead" data-reveal>目的に合わせて選べる、<br>3つのLP制作プラン。</p>
      </div>

      <div class="plans">
        ${plans.map((p, i) => Plan(p, i, planById))}
      </div>

      <ul class="notes" data-reveal>
        <li>納期は、制作に必要な素材・情報がすべて揃った時点から起算します。</li>
        <li>無料URLでの公開であれば、LIGHT / STANDARD も追加料金なしで公開できます。</li>
        ${site.priceNote ? html`<li>${site.priceNote}</li>` : ''}
      </ul>

      ${Comparison({ plans, comparison })}

      <div class="section-cta" data-reveal>
        <p>どのプランが合うか分からなくても大丈夫です。<br class="u-sp">目的を伺ってご提案します。</p>
        ${button({ href: site.cta.primary.href, label: site.cta.primary.label })}
      </div>
    </div>
  </section>`;
};
