import { html } from '../lib/html.js';
import { sectionLabel, button } from './ui.js';

export const Faq = ({ faq, site }) => html`
  <section class="section faq" id="faq" aria-labelledby="faq-title">
    <div class="container faq__grid">
      <div class="faq__side">
        ${sectionLabel(9, 'FAQ')}
        <h2 class="display-l" id="faq-title" data-reveal>Questions <span class="faq__title-ja">よくあるご質問</span></h2>
      </div>
      <div>
        <div class="accordion" data-reveal>
          ${faq.map(
            (item, i) => html`<details class="accordion__item" name="faq">
              <summary class="accordion__q">
                <span class="accordion__no">Q${String(i + 1).padStart(2, '0')}</span>
                <span class="accordion__text">${item.q}</span>
                <span class="accordion__icon" aria-hidden="true"></span>
              </summary>
              <div class="accordion__a">
                ${item.answer.map((p) => html`<p>${p}</p>`)}
              </div>
            </details>`,
          )}
        </div>
        <div class="faq__cta" data-reveal>
          <p>ほかにも気になることがあれば、お気軽にご相談ください。</p>
          ${button({ href: site.cta.primary.href, label: site.cta.primary.label, variant: 'ghost' })}
        </div>
      </div>
    </div>
  </section>`;
