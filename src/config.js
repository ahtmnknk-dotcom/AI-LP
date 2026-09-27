// ============================================================
// MILKUNE STORIES — site configuration
// Edit this file to change URLs, prices, videos and analytics.
// Then run `npm run build` to regenerate /docs.
// ============================================================

export const config = {
  // Public URL where the site is hosted (used for canonical / hreflang / OG).
  // Must end with a slash.
  siteUrl: "https://example.com/",

  brandName: "MILKUNE STORIES",

  // ---- Instagram (conversion) ----
  instagram: {
    username: "milkune", // without "@"
    // DM keyword users are asked to send
    dmKeyword: "PET",
    // Opens a DM thread in the Instagram app / web. Built from username by default.
    get dmUrl() {
      return `https://ig.me/m/${this.username}`;
    },
    get profileUrl() {
      return `https://www.instagram.com/${this.username}/`;
    },
  },

  // ---- Pricing (single source of truth) ----
  // Values are "starting from" prices.
  plans: [
    { id: "sample", name: "SAMPLE / TREND", jpy: 3980, usd: 29 },
    { id: "custom", name: "CUSTOM SHORT", jpy: 5980, usd: 45 },
    { id: "original", name: "ORIGINAL MOVIE", jpy: 10000, usd: 69 },
    { id: "business", name: "BUSINESS", jpy: 15000, usd: 99 },
  ],

  // ---- Sample videos (9:16) ----
  // Leave `src` empty to show the designed placeholder.
  // Put files in src/assets/videos/ and reference them as "assets/videos/xxx.mp4".
  // `poster` is optional (a 9:16 still image shown before playback).
  videos: [
    { id: "dance", src: "assets/videos/dance.mp4", poster: "assets/videos/dance-poster.jpg", pet: "dog" },
    { id: "chef", src: "", poster: "", pet: "cat" },
    { id: "talking", src: "assets/videos/interview.mp4", poster: "assets/videos/interview-poster.jpg", pet: "dog2" },
  ],

  // ---- Images ----
  // Replace these with real files when available (paths relative to /docs root).
  logo: "", // e.g. "assets/img/logo.svg" — empty = text wordmark
  ogImage: "assets/img/og-image.png",
  favicon: "assets/img/favicon.svg",

  // ---- Analytics ----
  // Paste raw tag snippets here (e.g. GA4 / Meta Pixel). Injected as-is.
  // CTA clicks are always pushed to window.dataLayer as { event: "cta_click", ... }.
  analytics: {
    headHtml: "",
    bodyEndHtml: "",
  },
};

// ---- Helpers (no need to edit) ----
export const plan = (id) => config.plans.find((p) => p.id === id);
export const fmtJpy = (n) => `¥${n.toLocaleString("en-US")}`;
export const fmtUsd = (n) => `$${n.toLocaleString("en-US")}`;
export const fromPrice = (id) => {
  const p = plan(id);
  return `FROM ${fmtJpy(p.jpy)} / ${fmtUsd(p.usd)}`;
};
