(function () {
  "use strict";

  var config = window.HITOTSUME_CONFIG || {};
  var formConfig = config.form || {};

  /* ---------- 計測 ---------- */
  // GA4 / GTM どちらでも拾えるよう dataLayer と gtag の両方に送る
  // イベント一覧は README.md「計測」を参照
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

  /* ---------- Instagramリンクの一括設定 ---------- */
  // data-cta="instagram" のリンクはすべて config.instagramUrl に置き換える
  var instagramUrl = config.instagramUrl || "";
  document.querySelectorAll('[data-cta="instagram"]').forEach(function (el) {
    if (!instagramUrl) {
      el.hidden = true;
      return;
    }
    el.setAttribute("href", instagramUrl);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-track]");
    if (!el) return;
    var id = el.getAttribute("data-track");
    var type = el.getAttribute("data-cta") || "";
    track("cta_click", {
      cta_id: id,
      cta_type: type,
      link_url: el.getAttribute("href") || "",
    });
    if (type === "instagram") track("instagram_click", { cta_id: id });
  });

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- 30日間の流れ：STEP詳細の開閉 ---------- */
  document.querySelectorAll(".phase").forEach(function (phase) {
    var btn = phase.querySelector(".phase__toggle");
    if (!btn) return;
    btn.hidden = false;
    phase.classList.add("is-collapsible");
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") !== "true";
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      phase.classList.toggle("is-open", open);
    });
  });

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
  // ファーストビューを過ぎたら表示し、最終CTA〜フォームが見えている間は隠す
  var sticky = document.querySelector(".sticky-cta");
  var hero = document.querySelector(".hero");
  var hideZones = document.querySelectorAll(".final, .contact");

  if (sticky && hero && "IntersectionObserver" in window) {
    var heroVisible = true;
    var zoneVisible = {};
    var update = function () {
      var inZone = Object.keys(zoneVisible).some(function (k) { return zoneVisible[k]; });
      var show = !heroVisible && !inZone;
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
    hideZones.forEach(function (zone, i) {
      new IntersectionObserver(function (entries) {
        zoneVisible[i] = entries[0].isIntersecting;
        update();
      }).observe(zone);
    });
    update();
  }

  /* ---------- 問い合わせフォーム ---------- */
  var form = document.getElementById("contact-form");
  if (!form) return;

  var submitBtn = document.getElementById("form-submit");
  var statusEl = document.getElementById("form-status");
  var doneEl = document.getElementById("form-done");
  var sending = false;

  // フォーム到達（表示）・入力開始の計測
  if ("IntersectionObserver" in window) {
    var viewObserver = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        track("form_view", { form_id: "contact" });
        viewObserver.disconnect();
      }
    }, { threshold: 0.3 });
    viewObserver.observe(form);
  }
  form.addEventListener("focusin", function onStart() {
    track("form_start", { form_id: "contact" });
    form.removeEventListener("focusin", onStart);
  });

  var LABELS = {
    name: "お名前",
    company: "会社名・屋号",
    url: "Webサイト または Instagram",
    business: "どんな事業をされていますか？",
    problem: "今、一番困っていることは何ですか？",
    email: "メールアドレス",
    future: "今後、どうなりたいですか？",
  };

  var validators = {
    name: function (v) { return v ? "" : "お名前を入力してください。"; },
    company: function (v) { return v ? "" : "会社名・屋号を入力してください。"; },
    url: function (v) {
      if (!v) return "WebサイトまたはInstagramのURLを入力してください。";
      // "instagram.com/xxx" のような https なしの入力も受け付ける
      return /^(https?:\/\/)?[^\s.]+\.[^\s]{2,}$/i.test(v) ? "" : "URLの形式で入力してください（例：https://…）";
    },
    business: function (v) { return v ? "" : "事業内容を簡単に教えてください。"; },
    problem: function (v) { return v ? "" : "困っていることを簡単に教えてください。"; },
    email: function (v) {
      if (!v) return "メールアドレスを入力してください。";
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "メールアドレスの形式が正しくありません。";
    },
  };

  function setFieldError(input, message) {
    var errEl = document.getElementById(input.id + "-error");
    var describedBy = (input.getAttribute("aria-describedby") || "")
      .split(" ").filter(function (id) { return id && id !== input.id + "-error"; });
    if (message) {
      input.setAttribute("aria-invalid", "true");
      describedBy.push(input.id + "-error");
      if (errEl) { errEl.textContent = message; errEl.hidden = false; }
    } else {
      input.removeAttribute("aria-invalid");
      if (errEl) { errEl.textContent = ""; errEl.hidden = true; }
    }
    if (describedBy.length) input.setAttribute("aria-describedby", describedBy.join(" "));
    else input.removeAttribute("aria-describedby");
  }

  function validateField(input) {
    var fn = validators[input.name];
    if (!fn) return true;
    var msg = fn(input.value.trim());
    setFieldError(input, msg);
    return !msg;
  }

  Object.keys(validators).forEach(function (name) {
    var input = form.elements[name];
    input.addEventListener("blur", function () {
      if (input.value.trim() || input.hasAttribute("aria-invalid")) validateField(input);
    });
    input.addEventListener("input", function () {
      if (input.hasAttribute("aria-invalid")) validateField(input);
    });
  });

  function showStatus(message) {
    statusEl.innerHTML = message;
    statusEl.hidden = !message;
  }

  function setSending(on) {
    sending = on;
    submitBtn.disabled = on;
    submitBtn.classList.toggle("is-sending", on);
    form.setAttribute("aria-busy", on ? "true" : "false");
  }

  function collect() {
    var data = {};
    Object.keys(LABELS).forEach(function (name) {
      data[name] = (form.elements[name].value || "").trim();
    });
    return data;
  }

  // 送信先ごとの送信処理。成功で resolve、失敗で reject。
  function send(data) {
    var provider = formConfig.provider;
    var subject = formConfig.subject || "LPからの相談";

    var readable = {};
    Object.keys(LABELS).forEach(function (k) { readable[LABELS[k]] = data[k] || "（未入力）"; });

    if (provider === "web3forms") {
      if (!formConfig.web3formsAccessKey) return Promise.reject(new Error("not_configured"));
      return fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.assign({
          access_key: formConfig.web3formsAccessKey,
          subject: subject,
          from_name: "ひとつめ。LP",
          replyto: data.email,
        }, readable)),
      }).then(function (res) {
        return res.json().then(function (json) {
          if (!res.ok || !json.success) throw new Error(json.message || "send_failed");
        });
      });
    }

    if (provider === "formspree") {
      if (!formConfig.endpoint) return Promise.reject(new Error("not_configured"));
      return fetch(formConfig.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.assign({ _subject: subject, email: data.email }, readable)),
      }).then(function (res) {
        if (!res.ok) throw new Error("send_failed");
      });
    }

    if (provider === "gas") {
      if (!formConfig.endpoint) return Promise.reject(new Error("not_configured"));
      // Apps Script はCORSの都合でレスポンスを読めないため、通信が成功すれば完了とみなす
      return fetch(formConfig.endpoint, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ subject: subject, fields: readable, email: data.email, page: location.href }),
      }).then(function () {});
    }

    return Promise.reject(new Error("not_configured"));
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (sending) return;

    // ボット対策：隠し欄に入力があれば送信したふりをして終了
    if (form.elements.website_hp && form.elements.website_hp.value) {
      form.hidden = true;
      doneEl.hidden = false;
      return;
    }

    var firstInvalid = null;
    Object.keys(validators).forEach(function (name) {
      var input = form.elements[name];
      if (!validateField(input) && !firstInvalid) firstInvalid = input;
    });
    if (firstInvalid) {
      showStatus("入力内容をご確認ください。");
      firstInvalid.focus();
      return;
    }

    showStatus("");
    setSending(true);

    send(collect())
      .then(function () {
        track("form_submit", { form_id: "contact", provider: formConfig.provider || "" });
        form.hidden = true;
        doneEl.hidden = false;
        doneEl.focus();
      })
      .catch(function (err) {
        if (err && err.message === "not_configured" && window.console) {
          console.warn("[ひとつめ。] フォームの送信先が未設定です。assets/js/config.js の form を設定してください。");
        }
        track("form_submit_error", { form_id: "contact", reason: (err && err.message) || "unknown" });
        var ig = instagramUrl
          ? '<br>お手数ですが、時間をおいて再度お試しいただくか、<a href="' + instagramUrl + '" target="_blank" rel="noopener" data-cta="instagram" data-track="form_error_instagram">Instagram DM</a>からご連絡ください。'
          : "<br>お手数ですが、時間をおいて再度お試しください。";
        showStatus("送信できませんでした。" + ig);
        setSending(false);
      });
  });
})();
