/* MILKUNE STORIES — minimal runtime (no dependencies) */
(function () {
  "use strict";

  var M = window.MILKUNE || {};
  var doc = document.documentElement;
  doc.classList.add("js");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ------------------------------------------------------------
  // Tracking hook
  // Every CTA click calls track("cta_click", {...}).
  // - Always pushed to window.dataLayer (GTM / GA4 compatible)
  // - If you define window.MILKUNE_TRACK = function(name, params){...}
  //   (e.g. to call fbq / gtag), it is called too.
  // ------------------------------------------------------------
  function track(name, params) {
    var payload = Object.assign({ event: name, lang: M.lang }, params || {});
    try {
      (window.dataLayer = window.dataLayer || []).push(payload);
      if (typeof window.MILKUNE_TRACK === "function") window.MILKUNE_TRACK(name, payload);
    } catch (e) {
      /* never break the CTA because of analytics */
    }
  }
  window.milkuneTrack = track;

  // ------------------------------------------------------------
  // Language links: keep query string (utm etc.) and hash
  // ------------------------------------------------------------
  var extra = location.search + location.hash;
  if (extra) {
    document.querySelectorAll("[data-lang-link]").forEach(function (a) {
      a.setAttribute("href", a.getAttribute("href") + extra);
    });
  }

  // ------------------------------------------------------------
  // CTA → guide sheet → Instagram DM
  // ------------------------------------------------------------
  var sheet = document.querySelector("[data-sheet]");
  var lastFocus = null;

  function openSheet(source) {
    if (!sheet) return false;
    lastFocus = document.activeElement;
    sheet.hidden = false;
    document.body.style.overflow = "hidden";
    sheet.dataset.source = source;
    var first = sheet.querySelector("[data-sheet-open]");
    if (first) first.focus();
    track("cta_sheet_open", { cta: source });
    return true;
  }
  function closeSheet() {
    if (!sheet || sheet.hidden) return;
    sheet.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-cta]");
    if (!a) return;
    var id = a.getAttribute("data-cta");
    track("cta_click", { cta: id, href: a.href });
    if (a.hasAttribute("data-direct")) return; // go straight to the link
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    if (openSheet(id)) e.preventDefault();
  });

  if (sheet) {
    sheet.addEventListener("click", function (e) {
      if (e.target.closest("[data-sheet-close]")) closeSheet();
      if (e.target.closest("[data-sheet-open]")) {
        track("cta_instagram_open", { cta: sheet.dataset.source });
        setTimeout(closeSheet, 300);
      }
    });
    document.addEventListener("keydown", function (e) {
      if (sheet.hidden) return;
      if (e.key === "Escape") closeSheet();
      if (e.key === "Tab") {
        // simple focus trap
        var f = sheet.querySelectorAll("a[href], button");
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
        else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
      }
    });

    var copyBtn = sheet.querySelector("[data-copy]");
    if (copyBtn) {
      var original = copyBtn.innerHTML;
      copyBtn.addEventListener("click", function () {
        var done = function () {
          copyBtn.textContent = copyBtn.getAttribute("data-copied-label");
          setTimeout(function () { copyBtn.innerHTML = original; }, 2000);
          track("cta_copy_keyword", { cta: sheet.dataset.source });
        };
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(M.keyword).then(done, fallback);
        } else fallback();
        function fallback() {
          var ta = document.createElement("textarea");
          ta.value = M.keyword; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
          document.body.appendChild(ta); ta.select();
          try { document.execCommand("copy"); done(); } catch (e) {}
          document.body.removeChild(ta);
        }
      });
    }
  }

  // ------------------------------------------------------------
  // Reveal on scroll
  // ------------------------------------------------------------
  var reveals = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || reduceMotion) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    // Failsafe: if the observer never reports (e.g. inside some embedded
    // viewers), show everything so no section stays invisible.
    var ioAlive = false;
    setTimeout(function () {
      if (!ioAlive) reveals.forEach(function (el) { el.classList.add("is-in"); });
    }, 1500);
    var ro = new IntersectionObserver(function (entries) {
      ioAlive = true;
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); ro.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { ro.observe(el); });
  }

  // ------------------------------------------------------------
  // Sticky mobile CTA: hidden while the hero or final CTA is visible
  // ------------------------------------------------------------
  var sticky = document.querySelector("[data-sticky-cta]");
  var hero = document.querySelector(".hero");
  var finalSec = document.querySelector(".final");
  if (sticky && "IntersectionObserver" in window) {
    sticky.hidden = false;
    sticky.classList.add("is-hidden");
    var visible = new Set();
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) visible.add(en.target); else visible.delete(en.target);
      });
      sticky.classList.toggle("is-hidden", visible.size > 0);
    }, { threshold: 0.05 });
    if (hero) so.observe(hero);
    if (finalSec) so.observe(finalSec);
  } else if (sticky) {
    sticky.hidden = false;
  }

  // ------------------------------------------------------------
  // Videos: lazy-load src when near viewport, autoplay (muted) while visible.
  // With reduced motion, videos don't autoplay — the play button is used.
  // ------------------------------------------------------------
  var cards = document.querySelectorAll(".video-card");
  function setPlaying(card, playing) {
    card.classList.toggle("is-playing", playing);
    var btn = card.querySelector(".video-card__toggle");
    if (btn) btn.setAttribute("aria-label", btn.getAttribute(playing ? "data-label-pause" : "data-label-play"));
  }
  function load(video) {
    if (!video.getAttribute("src") && video.dataset.src) {
      video.src = video.dataset.src;
      video.preload = "metadata";
    }
  }
  cards.forEach(function (card) {
    var video = card.querySelector("video");
    if (!video) return;
    video.muted = true;
    card.dataset.userPaused = "";
    video.addEventListener("play", function () { setPlaying(card, true); });
    video.addEventListener("pause", function () { setPlaying(card, false); });
    var btn = card.querySelector(".video-card__toggle");
    if (btn) {
      btn.addEventListener("click", function () {
        load(video);
        if (video.paused) {
          card.dataset.userPaused = "";
          video.play().catch(function () {});
          track("video_play", { video: card.querySelector(".video-card__label").textContent });
        } else {
          card.dataset.userPaused = "1";
          video.pause();
        }
      });
    }
  });

  if ("IntersectionObserver" in window) {
    var preload = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { load(en.target); preload.unobserve(en.target); }
      });
    }, { rootMargin: "300px 300px" });
    var autoplay = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = en.target, card = v.closest(".video-card");
        if (en.isIntersecting && en.intersectionRatio >= 0.5) {
          if (!reduceMotion && !card.dataset.userPaused) { load(v); v.play().catch(function () {}); }
        } else if (!v.paused) {
          v.pause();
        }
      });
    }, { threshold: [0, 0.5] });
    document.querySelectorAll(".video-card video").forEach(function (v) {
      preload.observe(v);
      autoplay.observe(v);
    });
  } else {
    document.querySelectorAll(".video-card video").forEach(load);
  }

  // FAQ open tracking
  document.querySelectorAll(".faq__item").forEach(function (d, i) {
    d.addEventListener("toggle", function () { if (d.open) track("faq_open", { index: i + 1 }); });
  });
})();
