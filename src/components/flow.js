import { html, lines } from '../lib/html.js';
import { sectionLabel } from './ui.js';

const steps = [
  { en: 'Contact', text: ['お問い合わせ'] },
  { en: 'Plan', text: ['目的や必要な内容を確認し、', 'プランを決定。'] },
  { en: 'Materials', text: ['写真、ロゴ、サービス内容、料金など、', '制作に必要な情報をご提出。'] },
  { en: 'Design & Build', text: ['内容をもとに、', 'オリジナルデザインで制作。'] },
  { en: 'Review', text: ['完成したLPをご確認いただき、', 'プラン規定回数まで修正。'] },
  { en: 'Launch', text: ['最終確認後、', '公開まで対応。'] },
];

export const Flow = () => html`
  <section class="section flow" id="flow" aria-labelledby="flow-title">
    <div class="container">
      ${sectionLabel(7, 'Flow')}
      <h2 class="display-xl" id="flow-title" data-reveal>From idea <br>to live.</h2>

      <ol class="steps">
        ${steps.map(
          (s, i) => html`<li class="step" data-reveal style="--d:${(i % 3) * 70}ms">
            <p class="step__no">Step ${String(i + 1).padStart(2, '0')}</p>
            <h3 class="step__title">${s.en}</h3>
            <p class="step__text">${lines(s.text)}</p>
          </li>`,
        )}
      </ol>

      <aside class="callout" data-reveal aria-label="納期について">
        <p class="callout__label">納期について</p>
        <p class="callout__text">
          納期は、<strong>制作に必要な素材・情報がすべて揃った時点</strong>から起算します。
        </p>
      </aside>
    </div>
  </section>`;
