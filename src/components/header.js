import { html } from '../lib/html.js';

export const Header = ({ site }) => html`
  <a class="skip-link" href="#main">本文へスキップ</a>
  <header class="site-header" data-header>
    <div class="container site-header__inner">
      <a class="wordmark" href="#top" aria-label="${site.name} トップへ戻る">${site.name}<span class="wordmark__dot" aria-hidden="true">.</span></a>

      <nav class="site-nav" id="site-nav" aria-label="メイン" data-nav>
        <ul class="site-nav__list">
          ${site.nav.map(
            (item) => html`<li><a class="site-nav__link" href="${item.href}">${item.label}</a></li>`,
          )}
        </ul>
        <a class="site-nav__cta" href="${site.cta.primary.href}">${site.cta.primary.label}</a>
      </nav>

      <a class="btn btn--primary btn--sm site-header__cta" href="${site.cta.primary.href}">
        <span class="btn__label">${site.cta.primary.label}</span>
      </a>

      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" data-menu-toggle>
        <span class="menu-toggle__label" data-menu-label>Menu</span>
        <span class="menu-toggle__bars" aria-hidden="true"><span></span><span></span></span>
      </button>
    </div>
  </header>`;
