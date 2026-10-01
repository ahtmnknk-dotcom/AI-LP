import { html, raw } from './lib/html.js';
import { site } from './data/site.js';
import { plans, comparison, thinkingLayers } from './data/plans.js';
import { options, includedLinks, customQuote, domainRules } from './data/options.js';
import { faq } from './data/faq.js';
import { works } from './data/works.js';

import { Header } from './components/header.js';
import { Hero } from './components/hero.js';
import { Concept } from './components/concept.js';
import { Difference } from './components/difference.js';
import { Works } from './components/works.js';
import { Pricing } from './components/pricing.js';
import { Multilingual } from './components/multilingual.js';
import { Options } from './components/options.js';
import { Flow } from './components/flow.js';
import { Maintenance } from './components/maintenance.js';
import { Faq } from './components/faq.js';
import { FinalCta } from './components/finalCta.js';
import { Contact } from './components/contact.js';
import { Footer, MobileCta } from './components/footer.js';

const abs = (path) => new URL(path, site.url).href;

const structuredData = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${site.url}#organization`,
      name: site.name,
      url: site.url,
      logo: abs('favicon.svg'),
      ...(site.social.length ? { sameAs: site.social.map((s) => s.href) } : {}),
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}#website`,
      url: site.url,
      name: site.name,
      inLanguage: site.lang,
      publisher: { '@id': `${site.url}#organization` },
    },
    {
      '@type': 'Service',
      '@id': `${site.url}#service`,
      name: '完全オリジナルLP制作',
      serviceType: 'ランディングページ制作',
      description: site.seo.description,
      provider: { '@id': `${site.url}#organization` },
      areaServed: 'JP',
      offers: plans.map((p) => ({
        '@type': 'Offer',
        name: `${p.name}プラン`,
        description: p.copy.join(''),
        priceCurrency: 'JPY',
        ...(p.from
          ? { priceSpecification: { '@type': 'PriceSpecification', minPrice: p.price, priceCurrency: 'JPY' } }
          : { price: p.price }),
        url: `${site.url}#plan-${p.id}`,
      })),
    },
    {
      '@type': 'FAQPage',
      '@id': `${site.url}#faq`,
      mainEntity: faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.answer.join('') },
      })),
    },
  ],
});

export const renderPage = ({ css, scriptSrc }) => {
  const ctx = { site, plans, comparison, thinkingLayers, options, includedLinks, customQuote, domainRules, faq, works };
  const ogImage = abs(site.seo.ogImage);
  // </script> がJSON内に混入しないようエスケープ
  const jsonLd = JSON.stringify(structuredData()).replace(/</g, '\\u003c');

  return html`<!doctype html>
<html lang="${site.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${site.seo.title}</title>
<meta name="description" content="${site.seo.description}">
<link rel="canonical" href="${site.url}">
<meta name="theme-color" content="${site.themeColor}">
<meta name="format-detection" content="telephone=no">

<meta property="og:type" content="website">
<meta property="og:locale" content="${site.locale}">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${site.seo.title}">
<meta property="og:description" content="${site.seo.description}">
<meta property="og:url" content="${site.url}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${site.seo.ogImageAlt}">
<meta name="twitter:card" content="summary_large_image">
${site.seo.twitter ? html`<meta name="twitter:site" content="${site.seo.twitter}">` : ''}
<meta name="twitter:title" content="${site.seo.title}">
<meta name="twitter:description" content="${site.seo.description}">
<meta name="twitter:image" content="${ogImage}">

<link rel="icon" href="favicon.ico" sizes="32x32">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="apple-touch-icon.png">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@400;500;700;900&display=swap">

<script>document.documentElement.classList.add('js')</script>
<style>${raw(css)}</style>
<script type="application/ld+json">${raw(jsonLd)}</script>
<script src="${scriptSrc}" defer></script>
</head>
<body>
${Header(ctx)}
<main id="main">
${Hero(ctx)}
${Concept(ctx)}
${Difference(ctx)}
${Works(ctx)}
${Pricing(ctx)}
${Multilingual(ctx)}
${Options(ctx)}
${Flow(ctx)}
${Maintenance(ctx)}
${Faq(ctx)}
${FinalCta(ctx)}
${Contact(ctx)}
</main>
${Footer(ctx)}
${MobileCta(ctx)}
</body>
</html>
`;
};
