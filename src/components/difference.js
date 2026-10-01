import { html, lines, phrases, yen } from '../lib/html.js';
import { sectionLabel } from './ui.js';

export const Difference = ({ plans, thinkingLayers }) => html`
  <section class="section section--dark difference" id="difference" aria-labelledby="difference-title">
    <div class="container">
      ${sectionLabel(2, 'Difference', { dark: true })}

      <h2 class="difference__title" id="difference-title" data-reveal>
        <span class="difference__title-a">安い。</span>
        <span class="difference__title-b">${phrases(['でも、', 'テンプレじゃない。'])}</span>
      </h2>

      <div class="difference__body" data-reveal>
        <p>
          ${yen(plans[0].price)}円だからといって、<br class="u-md">テンプレートに写真と文章を当てはめるだけではありません。
        </p>
        <p>
          あなたのお店、サービス、イベント、ブランドに合わせて、<br class="u-md">デザインを一から制作します。
        </p>
      </div>

      <p class="difference__quality" data-reveal>
        ${phrases(['価格によって', '変わるのは、'])}<br>
        ${phrases(['デザインの品質では', 'ありません。'])}
      </p>

      <div class="difference__answer" data-reveal>
        <p class="difference__answer-lead">違うのは、</p>
        <p class="difference__answer-main">${phrases(['「どこまで', '私たちが', '考えるか。」'])}</p>
      </div>

      <div class="depth" data-reveal>
        <div class="depth__head" aria-hidden="true">
          <span></span>
          <span class="depth__head-layers">${thinkingLayers.map((l) => html`<span>${l.en}</span>`)}</span>
        </div>
        <ul class="depth__list">
          ${plans.map(
            (p) => html`
            <li class="depth__row">
              <div class="depth__plan">
                <span class="depth__plan-name">${p.name}</span>
                <span class="depth__plan-text">${lines(p.summary)}</span>
              </div>
              <ul class="depth__bars" aria-label="${p.name}で私たちが考える範囲">
                ${thinkingLayers.map((l) => {
                  const on = l.plans.includes(p.id);
                  return html`<li class="depth__bar${on ? ' is-on' : ''}">
                    <span class="depth__bar-fill" aria-hidden="true"></span>
                    <span class="depth__bar-label">${l.ja}<span class="u-sr">${on ? '：含まれる' : '：含まれない'}</span></span>
                  </li>`;
                })}
              </ul>
            </li>`,
          )}
        </ul>
        <p class="depth__note">デザインと実装の品質は、全プラン共通です。</p>
      </div>
    </div>
  </section>`;
