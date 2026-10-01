import { html, yen } from '../lib/html.js';

export const Footer = ({ site, plans }) => {
  const year = new Date().getFullYear();
  const range = site.copyrightSince && site.copyrightSince < year ? `${site.copyrightSince}–${year}` : year;
  return html`
  <footer class="site-footer">
    <div class="container">
      <div class="site-footer__top">
        <p class="site-footer__statement">Purpose first.<br>Price second.</p>
        <nav aria-label="フッター">
          <ul class="site-footer__nav">
            ${site.nav.map((n) => html`<li><a href="${n.href}">${n.label}</a></li>`)}
            <li><a href="${site.cta.primary.href}">Contact</a></li>
            ${site.social.map((s) => html`<li><a href="${s.href}" target="_blank" rel="noopener">${s.label}</a></li>`)}
          </ul>
        </nav>
      </div>
      <p class="site-footer__wordmark" aria-hidden="true">${site.name}<span>.</span></p>
      <div class="site-footer__bottom">
        <p>${site.tagline} — 完全オリジナルLP ${yen(plans[0].price)}円〜</p>
        <p><small>© ${range} ${site.name}</small></p>
      </div>
    </div>
  </footer>`;
};

export const MobileCta = ({ site, plans }) => html`
  <div class="mobile-cta" data-mobile-cta inert>
    <p class="mobile-cta__price"><span>完全オリジナルLP</span><strong>${yen(plans[0].price)}<small>円〜</small></strong></p>
    <a class="btn btn--primary btn--sm" href="${site.cta.primary.href}"><span class="btn__label">${site.cta.primary.label}</span></a>
  </div>`;
