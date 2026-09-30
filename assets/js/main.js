(function () {
  "use strict";

  var config = window.HITOTSUME_CONFIG || {};

  /* ---------- 計測 ---------- */
  // GA4 / GTM どちらでも拾えるよう dataLayer と gtag の両方に送る
  window.dataLayer = window.dataLayer || [];

  if (config.ga4Id) {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(config.ga4Id);
    document.head.appendChild(s);
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", config.ga4Id);
  }

  function track(eventName, params) {
    params = params || {};
    window.dataLayer.push(Object.assign({ event: eventName }, params));
    if (typeof window.gtag === "function" && config.ga4Id) {
      window.gtag("event", eventName, params);
    }
  }
  window.hitotsumeTrack = track;

  /* ---------- CTAリンクの一括設定 ---------- */
  var urls = {
    instagram: config.instagramUrl || "",
    form: config.formUrl || "",
  };
  urls.primary = urls[config.primaryCta] || urls.instagram;

  document.querySelectorAll("[data-cta]").forEach(function (el) {
    var type = el.getAttribute("data-cta");
    var url = urls[type];

    if (!url) {
      if (type === "form") el.hidden = true;
      return;
    }
    el.setAttribute("href", url);
    if (/^https?:/.test(url)) {
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    }
  });

  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-track]");
    if (!el) return;
    track("cta_click", {
      cta_id: el.getAttribute("data-track"),
      cta_type: el.getAttribute("data-cta") || "",
      link_url: el.getAttribute("href") || "",
    });
  });

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- スクロールフェード ---------- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fades = document.querySelectorAll(".fade");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    fades.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    fades.forEach(function (el) { fadeObserver.observe(el); });
  }

  /* ---------- 下部固定CTA ---------- */
  // ファーストビューを過ぎたら表示し、最後のCTAセクションが見えている間は隠す
  var sticky = document.querySelector(".sticky-cta");
  var hero = document.querySelector(".hero");
  var finalCta = document.querySelector(".final");

  if (sticky && hero && finalCta && "IntersectionObserver" in window) {
    var heroVisible = true;
    var finalVisible = false;
    var update = function () {
      var show = !heroVisible && !finalVisible;
      sticky.classList.toggle("is-shown", show);
      sticky.setAttribute("aria-hidden", show ? "false" : "true");
      sticky.querySelectorAll("a").forEach(function (a) {
        a.tabIndex = show ? 0 : -1;
      });
    };
    new IntersectionObserver(function (entries) {
      heroVisible = entries[0].isIntersecting;
      update();
    }).observe(hero);
    new IntersectionObserver(function (entries) {
      finalVisible = entries[0].isIntersecting;
      update();
    }).observe(finalCta);
    update();
  }
})();
