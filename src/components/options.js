import { html, priceLabel, phrases } from '../lib/html.js';
import { sectionLabel } from './ui.js';

export const Options = ({ options, includedLinks, customQuote, domainRules }) => html`
  <section class="section options" id="options" aria-labelledby="options-title">
    <div class="container">
      ${sectionLabel(6, 'Options')}
      <div class="section-head">
        <h2 class="h-jp-l" id="options-title" data-reveal>${phrases(['必要なものだけ、'])}<br>${phrases(['追加できます。'])}</h2>
      </div>

      <dl class="price-list" data-reveal>
        ${options.map(
          (o) => html`<div class="price-list__row">
            <dt>${o.name}</dt>
            <dd>${priceLabel(o, { plus: true })}</dd>
          </div>`,
        )}
      </dl>

      <div class="scope">
        <div class="scope__col" data-reveal>
          <h3 class="scope__title"><span class="scope__badge">基本料金に含まれます</span>外部リンクの設置</h3>
          <ul class="scope__list">${includedLinks.map((t) => html`<li>${t}</li>`)}</ul>
          <p class="scope__note">予約・決済・SNSなど、すでにお使いのサービスへの導線は追加費用なしで設置します。</p>
        </div>
        <div class="scope__col" data-reveal>
          <h3 class="scope__title"><span class="scope__badge scope__badge--muted">別途お見積り</span>LP制作の範囲外</h3>
          <ul class="scope__list">${customQuote.map((t) => html`<li>${t}</li>`)}</ul>
          <p class="scope__note">LPとは制作範囲が異なるため、内容を伺って個別にお見積りします。</p>
        </div>
      </div>

      <div class="domain" id="domain" data-reveal>
        <div class="domain__head">
          <h3 class="domain__title"><span class="domain__title-en">Domain</span>公開URLについて</h3>
          <p class="domain__lead">無料URLでも公開できます。<br>ブランド名のURLを使いたい場合は、独自ドメインも選べます。</p>
        </div>
        <ul class="domain__list">
          ${domainRules.map(
            (r) => html`<li class="domain__row">
              <span class="domain__label">${r.label}</span>
              <span class="domain__target">${r.target}</span>
              <span class="domain__value">${r.value}</span>
            </li>`,
          )}
        </ul>
      </div>
    </div>
  </section>`;
