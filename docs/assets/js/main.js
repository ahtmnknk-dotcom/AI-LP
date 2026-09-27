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
  // Sticky mobile CTA: hidden while the hero, the order form or the final CTA is visible
  // ------------------------------------------------------------
  var sticky = document.querySelector("[data-sticky-cta]");
  var hero = document.querySelector(".hero");
  var finalSec = document.querySelector(".final");
  var formSec = document.querySelector("#order-form");
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
    if (formSec) so.observe(formSec);
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


  // ------------------------------------------------------------
  // Order request form (no payment). Validates, then POSTs the fields to
  // M.orderEndpoint (Formspree / Google Apps Script / any form backend).
  // With no endpoint configured it runs in preview mode: nothing is sent.
  // ------------------------------------------------------------
  var form = document.querySelector("[data-order-form]");
  if (form) {
    var OF = M.orderForm || {};
    var E = OF.errors || {};
    var done = document.querySelector("[data-order-done]");
    var summary = form.querySelector("[data-form-summary]");
    var submitBtn = form.querySelector("[data-order-submit]");
    var bizHint = form.querySelector("[data-business-hint]");
    var started = false;

    var val = function (name) {
      var el = form.elements[name];
      if (!el) return "";
      if (el instanceof RadioNodeList || (el.length && !el.tagName)) return el.value || "";
      return (el.value || "").trim();
    };
    var method = function () { return val("contact_method"); };

    function showContactField() {
      var m = method();
      form.querySelectorAll("[data-contact-field]").forEach(function (box) {
        var on = box.getAttribute("data-contact-field") === m;
        box.hidden = !on;
        var input = box.querySelector("input");
        input.required = on;
        if (!on) setError(box.getAttribute("data-field"), "");
      });
    }
    function showBusinessHint() {
      bizHint.hidden = !(val("commercial") === "yes" && val("plan") && val("plan") !== "business");
    }

    function setError(name, msg) {
      var box = form.querySelector('[data-field="' + name + '"]');
      var p = form.querySelector('[data-error-for="' + name + '"]');
      if (!box || !p) return;
      p.textContent = msg || "";
      p.hidden = !msg;
      box.classList.toggle("is-invalid", !!msg);
      box.querySelectorAll("input, textarea").forEach(function (el) {
        if (msg) el.setAttribute("aria-invalid", "true"); else el.removeAttribute("aria-invalid");
      });
    }

    var IG_RE = /^@?(?!.*\.\.)(?!\.)[A-Za-z0-9._]{1,30}$/;
    var WA_RE = /^\+[1-9][0-9 ()\-]{6,20}$/;
    function checkField(name) {
      var v = val(name), m = method();
      var msg = "";
      switch (name) {
        case "name": case "pet": case "request": msg = v ? "" : E.required; break;
        case "contact_method": case "plan": case "commercial": msg = v ? "" : E.choose; break;
        case "instagram": if (m === "instagram") msg = !v ? E.required : IG_RE.test(v) ? "" : E.instagram; break;
        case "whatsapp":
          if (m === "whatsapp") msg = !v ? E.required : WA_RE.test(v) && v.replace(/\D/g, "").length >= 8 ? "" : E.whatsapp;
          break;
        case "reference_url": msg = !v || /^https?:\/\/\S+\.\S+/i.test(v) ? "" : E.url; break;
      }
      setError(name, msg);
      return !msg;
    }
    var ORDER = ["name", "contact_method", "instagram", "whatsapp", "pet", "plan", "request", "reference_url", "commercial"];

    form.addEventListener("change", function (e) {
      if (e.target.name === "contact_method") { showContactField(); checkField("contact_method"); }
      if (e.target.name === "plan" || e.target.name === "commercial") { showBusinessHint(); checkField(e.target.name); }
    });
    // Clear/refresh a flagged field's error while the user types. (Done on input,
    // not on blur, so the layout never shifts under a tap on the submit button.)
    form.addEventListener("input", function (e) {
      var box = e.target.closest && e.target.closest("[data-field]");
      if (box && box.classList.contains("is-invalid")) checkField(box.getAttribute("data-field"));
    });
    form.addEventListener("focusin", function () {
      if (!started) { started = true; track("order_form_start"); }
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      summary.hidden = true;
      var firstBad = null;
      ORDER.forEach(function (n) { if (!checkField(n) && !firstBad) firstBad = n; });
      if (firstBad) {
        summary.textContent = E.summary;
        summary.hidden = false;
        var target = form.querySelector('[data-field="' + firstBad + '"] input, [data-field="' + firstBad + '"] textarea');
        if (target) target.focus();
        track("order_form_invalid", { field: firstBad });
        return;
      }

      var m = method();
      var contactValue = m === "instagram" ? "@" + val("instagram").replace(/^@/, "") : val("whatsapp");
      var data = new FormData();
      data.append("name", val("name"));
      data.append("contact_method", m);
      data.append("contact", contactValue);
      data.append("instagram", m === "instagram" ? contactValue : "");
      data.append("whatsapp", m === "whatsapp" ? contactValue : "");
      data.append("pet", val("pet"));
      data.append("plan", val("plan"));
      data.append("request", val("request"));
      data.append("reference_url", val("reference_url"));
      data.append("commercial_use", val("commercial"));
      data.append("lang", M.lang);
      data.append("page", location.href);
      data.append("submitted_at", new Date().toISOString());
      data.append("_subject", "MILKUNE STORIES order request: " + val("name") + " (" + val("plan") + ")");
      data.append("_gotcha", val("_gotcha"));

      submitBtn.disabled = true;
      submitBtn.textContent = OF.sending;

      function success() {
        track("order_form_success", { plan: val("plan"), contact_method: m, preview: !M.orderEndpoint });
        var line = (OF.success.contactLine || "")
          .replace("{method}", (OF.methods || {})[m] || m)
          .replace("{value}", contactValue);
        done.querySelector("[data-order-contact]").textContent = line;
        form.hidden = true;
        done.hidden = false;
        done.focus();
        done.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" });
      }
      function failure(err) {
        submitBtn.disabled = false;
        submitBtn.textContent = OF.submit;
        summary.textContent = E.network;
        summary.hidden = false;
        track("order_form_error", { message: String(err && err.message || err) });
      }

      // Spam trap filled → pretend success, send nothing
      if (val("_gotcha")) return success();

      if (!M.orderEndpoint) {
        // Preview mode: nothing is delivered (see config.order.endpoint)
        if (window.console) console.info("[MILKUNE] order form preview — not sent:", Object.fromEntries(data));
        return setTimeout(success, 400);
      }

      var appsScript = /script\.google(usercontent)?\.com/.test(M.orderEndpoint);
      fetch(M.orderEndpoint, appsScript
        ? { method: "POST", mode: "no-cors", body: new URLSearchParams(data) } // Apps Script: opaque response
        : { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (res) {
          if (appsScript || res.ok) return success();
          throw new Error("HTTP " + res.status);
        })
        .catch(failure);
    });
  }

  // FAQ open tracking
  document.querySelectorAll(".faq__item").forEach(function (d, i) {
    d.addEventListener("toggle", function () { if (d.open) track("faq_open", { index: i + 1 }); });
  });
})();
