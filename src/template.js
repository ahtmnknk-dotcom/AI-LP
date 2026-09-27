// Page template — renders one language version of the landing page.
// Copy lives in content.js, settings in config.js.

import { config, fmtJpy, fmtUsd } from "./config.js";
import { icons, cloud, star, flower, castle, petArt } from "./icons.js";

const esc = (str = "") =>
  String(str).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
// Escape + turn "\n" into <br> + *text* into <em>
const t = (str = "") => esc(str).replace(/\n/g, "<br>").replace(/\*(.+?)\*/g, "<em>$1</em>");

const ig = config.instagram;

// Every CTA is a real link to Instagram DM (works without JS);
// main.js intercepts it to show the guide sheet and track the click.
const cta = (label, id, variant = "primary", extra = "") =>
  `<a class="btn btn--${variant}" href="${esc(ig.url)}" target="_blank" rel="noopener" data-cta="${id}" ${extra}>${t(label)}</a>`;

const sectionHead = ({ eyebrow, titleEn, title }, lang, id) => {
  // JP: English display heading + Japanese heading. EN: English heading only.
  const h = titleEn || title;
  const sub = titleEn && title ? `<p class="section__sub" lang="ja">${t(title)}</p>` : "";
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
        ${cta(c.hero.cta, "hero", "primary", 'data-hero-cta')}
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
    ${sectionHead({ eyebrow: "", titleEn: c.examples.eyebrow, title: isJa ? c.examples.title : "" }, c.lang, "examples")}
    ${!isJa ? `<p class="section__lead reveal">${t(c.examples.title)}</p>` : ""}
    <ul class="video-list" role="list">
      ${config.videos.map(videoCard).join("")}
    </ul>
    <p class="swipe-hint" aria-hidden="true">${esc(c.examples.swipeHint)}</p>
    <div class="section__cta reveal">${cta(c.examples.cta, "examples", "secondary")}</div>
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
      ${cta(c.why.cta, "why", "primary")}
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
    <div class="section__cta reveal">${cta(c.pricing.cta, "pricing", "secondary")}</div>
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
    <div class="section__cta reveal">${cta(c.order.cta, "order", "primary")}</div>
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
      <div class="reveal">${cta(c.final.cta, "final", "primary", "data-final-cta")}</div>
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
    ${cta(c.stickyCta, "sticky", "primary")}
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

