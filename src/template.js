// Page template — renders one language version of the landing page.
// Copy lives in content.js, settings in config.js.

import { config, fmtJpy, fmtUsd } from "./config.js";
import { icons, cloud, star, flower, castle, petArt } from "./icons.js";

const esc = (str = "") =>
  String(str).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
// Escape + turn "\n" into <br> + *text* into <em>
const t = (str = "") => esc(str).replace(/\n/g, "<br>").replace(/\*(.+?)\*/g, "<em>$1</em>");

const ig = config.instagram;

// Two kinds of CTA across the page:
//  - Primary  "ORDER NOW / 注文する": jumps to the order request form (#order-form)
//  - Secondary "DM US / まず相談する": real link to Instagram (works without JS);
//    main.js intercepts it to show the DM "PET" guide sheet.
// Every click is tracked as cta_click with id "<place>_order" / "<place>_dm".
const orderCta = (c, id, variant = "primary", extra = "") =>
  `<a class="btn btn--${variant}" href="#order-form" data-cta="${id}_order" data-direct ${extra}>${t(c.ctas.order)}</a>`;
const dmCta = (c, id, variant = "secondary", extra = "") =>
  `<a class="btn btn--${variant}" href="${esc(ig.url)}" target="_blank" rel="noopener" data-cta="${id}_dm" ${extra}>${t(c.ctas.dm)}</a>`;
const ctaPair = (c, id, extra = "") => `<div class="cta-pair" ${extra}>${orderCta(c, id)}${dmCta(c, id)}</div>`;

const sectionHead = ({ eyebrow, titleEn, title }, lang, id) => {
  // English display heading + a sub-heading in the page language.
  const h = titleEn || title;
  const sub = titleEn && title ? `<p class="section__sub">${t(title)}</p>` : "";
  return `<header class="section__head reveal">
      ${eyebrow ? `<p class="eyebrow">${t(eyebrow)}</p>` : ""}
      <h2 class="section__title" id="${id}-title" ${lang === "ja" && titleEn ? 'lang="en"' : ""}>${t(h)}</h2>
      ${sub}
    </header>`;
};

export function renderPage(c) {
  const isJa = c.lang === "ja";
  const root = isJa ? "" : "../"; // relative path to site root
  const pageUrl = config.siteUrl + c.path;
  const ogImage = config.siteUrl + config.ogImage;
  const altLang = isJa ? { href: "en/", code: "en" } : { href: "../", code: "ja" };

  const runtime = {
    lang: c.lang,
    instagramUrl: ig.url,
    keyword: ig.dmKeyword,
    sheet: c.sheet,
    orderEndpoint: config.order.endpoint,
    orderForm: {
      errors: c.orderForm.errors,
      success: c.orderForm.success,
      sending: c.orderForm.sending,
      submit: c.orderForm.submit,
      methods: { instagram: c.orderForm.fields.contactMethod.instagram, whatsapp: c.orderForm.fields.contactMethod.whatsapp },
    },
  };

  // ---------- Sections ----------

  const header = `
  <header class="site-header" id="top">
    <a class="logo" href="${root || "./"}" aria-label="${esc(config.brandName)}">
      ${
        config.logo
          ? `<img src="${root}${esc(config.logo)}" alt="${esc(config.brandName)}" width="160" height="40">`
          : `<span class="logo__mark">${icons.sparkle}</span><span class="logo__text">MILKUNE <span>STORIES</span></span>`
      }
    </a>
    <nav class="lang-switch" aria-label="${esc(c.nav.langLabel)}">
      <a href="${isJa ? "./" : "../"}" hreflang="ja" lang="ja" ${isJa ? 'aria-current="page"' : ""} data-lang-link>JP</a>
      <span aria-hidden="true">|</span>
      <a href="${isJa ? "en/" : "./"}" hreflang="en" lang="en" ${!isJa ? 'aria-current="page"' : ""} data-lang-link>EN</a>
    </nav>
  </header>`;

  const hero = `
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__sky" aria-hidden="true">
      ${cloud("c1")}${cloud("c2")}${cloud("c3")}
      ${star("s1")}${star("s2")}${star("s3")}${star("s4")}
      ${castle("hero__castle")}
    </div>
    <div class="hero__inner">
      <p class="hero__brand reveal">${esc(config.brandName)}</p>
      <h1 class="hero__title reveal" id="hero-title" lang="en">
        ${c.hero.titleLines.map((l, i) => `<span class="hero__line hero__line--${i + 1}">${esc(l)}</span>`).join("")}
      </h1>
      <p class="hero__sub reveal">${t(c.hero.sub)}</p>
      <p class="hero__body reveal">${t(c.hero.body)}</p>
      <div class="hero__cta reveal">
        <p class="price-tag"><span>${t(c.hero.price)}</span></p>
        ${ctaPair(c, "hero", "data-hero-cta")}
        <p class="dm-hint">${t(c.dmHint)}</p>
      </div>
    </div>
  </section>`;

  const videoCard = (v, i) => {
    const item = c.examples.items[v.id];
    const media = v.src
      ? `<video class="video-card__video" muted playsinline loop preload="none"
            ${v.poster ? `poster="${root}${esc(v.poster)}"` : ""} data-src="${root}${esc(v.src)}"
            aria-label="${esc(item.caption)}"></video>
          <button class="video-card__toggle" type="button" aria-label="${esc(c.examples.playLabel)}"
            data-label-play="${esc(c.examples.playLabel)}" data-label-pause="${esc(c.examples.pauseLabel)}">
            <span class="i-play">${icons.play}</span><span class="i-pause">${icons.pause}</span>
          </button>`
      : `<div class="video-card__placeholder ph--${i + 1}" role="img" aria-label="${esc(item.caption)} — ${esc(c.examples.placeholder)}">
            ${star("ph-star a")}${star("ph-star b")}
            <div class="ph-pet">${petArt(v.pet)}</div>
            <span class="ph-note">${esc(c.examples.placeholder)}</span>
          </div>`;
    return `
      <li class="video-card reveal" style="--d:${i * 80}ms">
        <div class="video-card__frame">
          ${media}
          <span class="video-card__label" lang="en">VIDEO 0${i + 1} · ${esc(item.label)}</span>
        </div>
        <p class="video-card__caption" lang="en">${esc(item.caption)}</p>
      </li>`;
  };

  const examples = `
  <section class="section examples" id="examples" aria-labelledby="examples-title">
    ${sectionHead({ eyebrow: "", titleEn: c.examples.eyebrow, title: c.examples.title }, c.lang, "examples")}
    <ul class="video-list" role="list">
      ${config.videos.map(videoCard).join("")}
    </ul>
    <p class="swipe-hint" aria-hidden="true">${esc(c.examples.swipeHint)}</p>
    <div class="section__cta reveal">${orderCta(c, "examples")}</div>
  </section>`;

  const why = `
  <section class="section why" id="why" aria-labelledby="why-title">
    ${sectionHead(c.why, c.lang, "why")}
    <p class="section__lead reveal">${t(c.why.lead)}</p>
    <ul class="pain-list" role="list">
      ${c.why.cards
        .map(
          (card, i) => `
        <li class="pain-card reveal" style="--d:${i * 60}ms">
          <span class="pain-card__icon">${icons[card.icon]}</span>
          <div>
            <h3 class="pain-card__title" lang="en">${esc(card.title)}</h3>
            <p class="pain-card__text">${t(card.text)}</p>
          </div>
        </li>`
        )
        .join("")}
    </ul>
    <div class="solve reveal">
      ${star("solve-star a")}${star("solve-star b")}
      <p class="solve__title" lang="en">${t(c.why.solveTitle)}</p>
      <p class="solve__lead">${t(c.why.solveLead)}</p>
      ${c.why.solveBody.map((p) => `<p class="solve__body">${t(p)}</p>`).join("")}
      ${orderCta(c, "why")}
    </div>
  </section>`;

  const whatif = `
  <section class="section whatif" id="whatif" aria-labelledby="whatif-title">
    ${sectionHead(c.whatif, c.lang, "whatif")}
    <ul class="dream-grid" role="list">
      ${c.whatif.items
        .map(
          (it, i) => `
        <li class="dream-card dream-card--${(i % 4) + 1} reveal" style="--d:${i * 50}ms">
          <span class="dream-card__icon">${icons[it.icon]}</span>
          <span class="dream-card__en" lang="en">${esc(it.en)}</span>
          <span class="dream-card__label">${t(it.label)}</span>
        </li>`
        )
        .join("")}
    </ul>
    <p class="whatif__closing reveal">${t(c.whatif.closing)}</p>
  </section>`;

  const pricing = `
  <section class="section pricing" id="pricing" aria-labelledby="pricing-title">
    ${sectionHead({ eyebrow: c.pricing.eyebrow, title: c.pricing.title }, c.lang, "pricing")}
    <ul class="plan-list" role="list">
      ${config.plans
        .map((p, i) => {
          const pc = c.pricing.plans[p.id];
          const biz = p.id === "business";
          return `
        <li class="plan reveal ${biz ? "plan--business" : ""} ${i === 0 ? "plan--entry" : ""}" style="--d:${i * 60}ms">
          <div class="plan__top">
            <h3 class="plan__name" lang="en">${esc(p.name)}</h3>
            <span class="plan__badge">${esc(biz ? c.pricing.businessBadge : c.pricing.personalBadge)}</span>
          </div>
          <p class="plan__price"><small lang="en">${esc(c.pricing.from)}</small> <strong>${fmtJpy(p.jpy)}</strong> <span class="plan__usd">/ ${fmtUsd(p.usd)}</span></p>
          ${pc.spec ? `<p class="plan__spec">${esc(pc.spec)}</p>` : ""}
          <p class="plan__desc">${t(pc.desc)}</p>
        </li>`;
        })
        .join("")}
    </ul>
    <div class="pricing__notes reveal">
      <p>※ ${t(c.pricing.note)}</p>
      ${c.pricing.noteSub ? `<p class="pricing__note-en" lang="en">${t(c.pricing.noteSub)}</p>` : ""}
      <p>※ ${t(c.pricing.commercial)}</p>
    </div>
    <div class="section__cta reveal">${ctaPair(c, "pricing")}</div>
  </section>`;

  const order = `
  <section class="section order" id="order" aria-labelledby="order-title">
    ${sectionHead(c.order, c.lang, "order")}
    <ol class="steps" role="list">
      ${c.order.steps
        .map(
          (s, i) => `
        <li class="step reveal" style="--d:${i * 50}ms">
          <span class="step__num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
          <span class="step__text">${t(s)}</span>
        </li>`
        )
        .join("")}
    </ol>
    <p class="order__note reveal">${t(c.order.note)}</p>
    <div class="delivery reveal">
      <span class="delivery__label" lang="en">${esc(c.order.deliveryLabel)}</span>
      <span class="delivery__value">${t(c.order.delivery)}</span>
    </div>
    <div class="section__cta reveal">${ctaPair(c, "order")}</div>
  </section>`;

  // ---------- Order request form ----------
  const f = c.orderForm;
  const F = f.fields;
  const req = `<span class="field__req">${esc(f.required)}</span>`;
  const opt = `<span class="field__opt">${esc(f.optional)}</span>`;
  const err = (name) => `<p class="field__error" id="err-${name}" data-error-for="${name}" hidden></p>`;
  const planOptions = [
    ...config.plans.map((p) => ({ value: p.id, label: p.name, price: `${fmtJpy(p.jpy)} / ${fmtUsd(p.usd)}` })),
    { value: "unsure", label: F.plan.unsure, price: "" },
  ];
  const orderForm = `
  <section class="section order-form" id="order-form" aria-labelledby="order-form-title">
    ${sectionHead(f, c.lang, "order-form")}
    <div class="order-card reveal">
      <form class="oform" data-order-form novalidate>
        <p class="oform__lead">${t(f.lead)}</p>
        <p class="oform__summary" data-form-summary role="alert" hidden></p>

        <div class="field" data-field="name">
          <label class="field__label" for="of-name">${esc(F.name.label)} ${req}</label>
          <input class="field__input" id="of-name" name="name" type="text" autocomplete="name" required
            placeholder="${esc(F.name.placeholder)}" aria-describedby="err-name">
          ${err("name")}
        </div>

        <fieldset class="field" data-field="contact_method">
          <legend class="field__label">${esc(F.contactMethod.label)} ${req}</legend>
          <div class="choice-row">
            <label class="choice"><input type="radio" name="contact_method" value="instagram" required>
              <span>${icons.instagram}${esc(F.contactMethod.instagram)}</span></label>
            <label class="choice"><input type="radio" name="contact_method" value="whatsapp">
              <span>${icons.chat}${esc(F.contactMethod.whatsapp)}</span></label>
          </div>
          ${err("contact_method")}
        </fieldset>

        <div class="field" data-field="instagram" data-contact-field="instagram" hidden>
          <label class="field__label" for="of-instagram">${esc(F.instagram.label)} ${req}</label>
          <input class="field__input" id="of-instagram" name="instagram" type="text" autocomplete="off"
            autocapitalize="none" spellcheck="false" placeholder="${esc(F.instagram.placeholder)}"
            aria-describedby="hint-instagram err-instagram">
          <p class="field__hint" id="hint-instagram">${esc(F.instagram.hint)}</p>
          ${err("instagram")}
        </div>

        <div class="field" data-field="whatsapp" data-contact-field="whatsapp" hidden>
          <label class="field__label" for="of-whatsapp">${esc(F.whatsapp.label)} ${req}</label>
          <input class="field__input" id="of-whatsapp" name="whatsapp" type="tel" inputmode="tel" autocomplete="tel"
            placeholder="${esc(F.whatsapp.placeholder)}" aria-describedby="hint-whatsapp err-whatsapp">
          <p class="field__hint" id="hint-whatsapp">${esc(F.whatsapp.hint)}</p>
          ${err("whatsapp")}
        </div>

        <div class="field" data-field="pet">
          <label class="field__label" for="of-pet">${esc(F.pet.label)} ${req}</label>
          <input class="field__input" id="of-pet" name="pet" type="text" required
            placeholder="${esc(F.pet.placeholder)}" aria-describedby="err-pet">
          ${err("pet")}
        </div>

        <fieldset class="field" data-field="plan">
          <legend class="field__label">${esc(F.plan.label)} ${req}</legend>
          <div class="plan-choices">
            ${planOptions
              .map(
                (o) => `
            <label class="choice choice--plan"><input type="radio" name="plan" value="${o.value}" required>
              <span><b ${o.value === "unsure" ? "" : 'lang="en"'}>${esc(o.label)}</b>${o.price ? `<small>FROM ${esc(o.price)}</small>` : ""}</span></label>`
              )
              .join("")}
          </div>
          ${err("plan")}
        </fieldset>

        <div class="field" data-field="request">
          <label class="field__label" for="of-request">${esc(F.request.label)} ${req}</label>
          <textarea class="field__input field__textarea" id="of-request" name="request" rows="5" required
            placeholder="${esc(F.request.placeholder)}" aria-describedby="err-request"></textarea>
          ${err("request")}
        </div>

        <div class="field" data-field="reference_url">
          <label class="field__label" for="of-ref">${esc(F.referenceUrl.label)} ${opt}</label>
          <input class="field__input" id="of-ref" name="reference_url" type="url" inputmode="url" autocapitalize="none"
            spellcheck="false" placeholder="${esc(F.referenceUrl.placeholder)}" aria-describedby="err-reference_url">
          ${err("reference_url")}
        </div>

        <fieldset class="field" data-field="commercial">
          <legend class="field__label">${esc(F.commercial.label)} ${req}</legend>
          <div class="choice-col">
            <label class="choice"><input type="radio" name="commercial" value="no" required><span>${esc(F.commercial.no)}</span></label>
            <label class="choice"><input type="radio" name="commercial" value="yes"><span>${esc(F.commercial.yes)}</span></label>
          </div>
          <p class="field__note" data-business-hint hidden>${esc(F.commercial.businessHint)}</p>
          ${err("commercial")}
        </fieldset>

        <!-- spam trap: humans never see or fill this -->
        <div class="oform__trap" aria-hidden="true">
          <label>Leave empty <input type="text" name="_gotcha" tabindex="-1" autocomplete="off"></label>
        </div>

        <div class="oform__notice">
          <p>※ ${t(f.notice)}</p>
          <p>※ ${t(f.contactNotice)}</p>
        </div>

        <button class="btn btn--primary btn--block oform__submit" type="submit" data-order-submit>${t(f.submit)}</button>
      </form>

      <div class="oform__done" data-order-done tabindex="-1" hidden>
        <span class="sheet__paw">${icons.paw}</span>
        <h3 class="oform__done-title">${t(f.success.title)}</h3>
        ${f.success.body.map((p) => `<p>${t(p)}</p>`).join("")}
        <p class="oform__done-contact" data-order-contact></p>
        ${config.order.endpoint ? "" : `<p class="oform__preview">${t(f.previewNote)}</p>`}
      </div>

      <div class="oform__consult">
        <p>${t(f.consult)}</p>
        ${dmCta(c, "order_form")}
      </div>
    </div>
  </section>`;

  const brand = `
  <section class="section brand" id="story" aria-labelledby="story-title">
    ${flower("bf1")}${flower("bf2")}${star("bs1")}
    <h2 class="brand__title reveal" id="story-title" lang="en">${t(c.brand.title)}</h2>
    <div class="brand__body">
      ${c.brand.body.map((p, i) => `<p class="reveal ${i === 1 ? "brand__quote" : ""}">${t(p)}</p>`).join("")}
    </div>
  </section>`;

  const faq = `
  <section class="section faq" id="faq" aria-labelledby="faq-title">
    ${sectionHead({ eyebrow: c.faq.eyebrow, title: c.faq.title }, c.lang, "faq")}
    <div class="faq__list">
      ${c.faq.items
        .map(
          (f) => `
        <details class="faq__item reveal">
          <summary><span>${t(f.q)}</span><span class="faq__icon">${icons.plus}</span></summary>
          <div class="faq__answer">${f.a.map((p) => `<p>${t(p)}</p>`).join("")}</div>
        </details>`
        )
        .join("")}
    </div>
  </section>`;

  const final = `
  <section class="final" id="start" aria-labelledby="final-title">
    <div class="final__sky" aria-hidden="true">
      ${cloud("fc1")}${cloud("fc2")}
      ${star("fs1")}${star("fs2")}${star("fs3")}${star("fs4")}${star("fs5")}
      ${flower("ff1")}${flower("ff2")}
      ${castle("final__castle")}
    </div>
    <div class="final__inner">
      <h2 class="final__title reveal" id="final-title" lang="en">${t(c.final.titleEn)}</h2>
      <p class="final__sub reveal">${t(c.final.title)}</p>
      ${c.final.body.map((p) => `<p class="final__body reveal">${t(p)}</p>`).join("")}
      ${c.final.bodyEn ? `<p class="final__en reveal" lang="en">${t(c.final.bodyEn)}</p>` : ""}
      <p class="price-tag reveal"><span>${t(c.final.price)}</span></p>
      <div class="reveal">${ctaPair(c, "final", "data-final-cta")}</div>
    </div>
  </section>`;

  const footer = `
  <footer class="site-footer">
    <p class="site-footer__brand">${esc(config.brandName)}</p>
    <p class="site-footer__tagline" lang="en">${esc(c.footerTagline)}</p>
    <a class="site-footer__ig" href="${esc(ig.url)}" target="_blank" rel="noopener" data-cta="footer_instagram" data-direct>
      ${icons.instagram}<span>@${esc(ig.username)}</span>
    </a>
    <p class="site-footer__copy">${esc(c.footer.copyright)}</p>
  </footer>`;

  const sticky = `
  <div class="sticky-cta" data-sticky-cta hidden>
    <div class="sticky-cta__row">${orderCta(c, "sticky")}${dmCta(c, "sticky")}</div>
  </div>`;

  const sheet = `
  <div class="sheet" data-sheet hidden>
    <div class="sheet__backdrop" data-sheet-close></div>
    <div class="sheet__panel" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
      <button class="sheet__close" type="button" data-sheet-close aria-label="${esc(c.sheet.close)}">×</button>
      <span class="sheet__paw">${icons.paw}</span>
      <h2 class="sheet__title" id="sheet-title">${t(c.sheet.title)}</h2>
      <ol class="sheet__steps">
        <li><span>1</span>${t(c.sheet.step1)}</li>
        <li><span>2</span>${t(c.sheet.step2)}</li>
      </ol>
      <p class="sheet__body">${t(c.sheet.body)}</p>
      <a class="btn btn--primary btn--block" href="${esc(ig.url)}" target="_blank" rel="noopener" data-sheet-open>${icons.instagram}<span>${t(c.sheet.open)}</span></a>
      <button class="btn btn--ghost btn--block" type="button" data-copy data-copied-label="${esc(c.sheet.copied)}">${t(c.sheet.copy)}</button>
    </div>
  </div>`;

  // ---------- Document ----------
  return `<!doctype html>
<html lang="${c.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(c.meta.title)}</title>
<meta name="description" content="${esc(c.meta.description)}">
<meta name="theme-color" content="#FFF8EE">
<link rel="canonical" href="${pageUrl}">
<link rel="alternate" hreflang="ja" href="${config.siteUrl}">
<link rel="alternate" hreflang="en" href="${config.siteUrl}en/">
<link rel="alternate" hreflang="x-default" href="${config.siteUrl}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(config.brandName)}">
<meta property="og:title" content="${esc(c.meta.title)}">
<meta property="og:description" content="${esc(c.meta.description)}">
<meta property="og:url" content="${pageUrl}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="${c.ogLocale}">
<meta property="og:locale:alternate" content="${isJa ? "en_US" : "ja_JP"}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(c.meta.title)}">
<meta name="twitter:description" content="${esc(c.meta.description)}">
<meta name="twitter:image" content="${ogImage}">
<link rel="icon" href="${root}${config.favicon}" type="image/svg+xml">
<link rel="apple-touch-icon" href="${root}assets/img/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Zen+Maru+Gothic:wght@500;700&display=swap">
<link rel="stylesheet" href="${root}assets/css/style.css">
<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    name: config.brandName,
    description: c.meta.description,
    url: pageUrl,
    serviceType: "AI pet video production",
    offers: config.plans.map((p) => ({
      "@type": "Offer",
      name: p.name,
      price: isJa ? p.jpy : p.usd,
      priceCurrency: isJa ? "JPY" : "USD",
    })),
    sameAs: [ig.url],
  })}</script>
<script>(function(){var q=new URLSearchParams(location.search),l=(q.get("lang")||"").toLowerCase();if(l&&l.indexOf("${isJa ? "en" : "ja"}")===0){q.delete("lang");var r=q.toString();location.replace("${altLang.href}"+(r?"?"+r:"")+location.hash);}})();</script>
<script>window.MILKUNE=${JSON.stringify(runtime)};window.dataLayer=window.dataLayer||[];</script>
${config.analytics.headHtml}
</head>
<body class="lang-${c.lang}">
<a class="skip-link" href="#main">${esc(c.nav.skip)}</a>
${header}
<main id="main">
${hero}
${examples}
${why}
${whatif}
${pricing}
${order}
${orderForm}
${brand}
${faq}
${final}
</main>
${footer}
${sticky}
${sheet}
<script src="${root}assets/js/main.js" defer></script>
${config.analytics.bodyEndHtml}
</body>
</html>
`;
}

