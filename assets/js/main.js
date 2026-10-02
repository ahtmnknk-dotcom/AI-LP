/* Next Re.Live — main.js (no dependencies) */
(function () {
  'use strict';

  var doc = document.documentElement;
  doc.classList.add('js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  document.addEventListener('DOMContentLoaded', function () {
    initHero();
    initHeader();
    initMenu();
    initReveal();
    initFlow();
    initScope();
    initTopicLinks();
    initForm();
    initDock();
    var y = $('[data-year]');
    if (y) y.textContent = new Date().getFullYear();
  });

  /* ---------- hero: start the red-pen sequence once fonts are in ---------- */
  function initHero() {
    var hero = $('.hero');
    if (!hero) return;
    var started = false;
    var play = function () {
      if (started) return;
      started = true;
      hero.classList.add('is-play');
    };
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(play);
      setTimeout(play, 900);
    } else {
      play();
    }
  }

  /* ---------- header shadow ---------- */
  function initHeader() {
    var header = $('[data-header]');
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- mobile menu ---------- */
  function initMenu() {
    var btn = $('[data-menu-btn]');
    var menu = $('[data-menu]');
    if (!btn || !menu) return;
    var label = $('.menu-btn__label', btn);

    var setOpen = function (open) {
      btn.setAttribute('aria-expanded', String(open));
      label.textContent = open ? '閉じる' : 'メニュー';
      document.body.classList.toggle('is-locked', open);
      if (open) {
        menu.hidden = false;
        requestAnimationFrame(function () { menu.classList.add('is-open'); });
        var first = $('a', menu);
        if (first) first.focus({ preventScroll: true });
      } else {
        menu.classList.remove('is-open');
        menu.hidden = true;
      }
    };

    btn.addEventListener('click', function () {
      setOpen(btn.getAttribute('aria-expanded') !== 'true');
    });
    $$('a', menu).forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        btn.focus();
      }
    });
    // keep focus inside the open menu
    menu.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var items = $$('a', menu).concat([btn]);
      var first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' && !e.shiftKey && btn.getAttribute('aria-expanded') === 'true') {
        e.preventDefault();
        $('a', menu).focus();
      }
    });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', function (mq) {
      if (mq.matches) setOpen(false);
    });
  }

  /* ---------- reveal on scroll ---------- */
  function initReveal() {
    var targets = $$('[data-reveal], [data-strike]');
    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---------- THINK → MAKE → DELIVER → SELL ---------- */
  function initFlow() {
    var flow = $('[data-flow]');
    if (!flow) return;
    var stages = $$('article.stage', flow);
    var end = $('.stage--end', flow);
    var stacks = $$('[data-stage-stack]', flow);
    var nodes = $$('[data-stage-node]', flow);
    var num = $('[data-stage-num]', flow);
    var rail = $('.rail__track', flow);
    var line = $('.rail__line', flow);
    var current = -1;
    var ticking = false;

    function placeLine() {
      if (!rail || !line || rail.offsetParent === null) return;
      var railNodes = $$('li', rail);
      var first = railNodes[0], last = railNodes[railNodes.length - 1];
      var top = first.offsetTop + first.offsetHeight / 2;
      var bottom = rail.offsetHeight - (last.offsetTop + last.offsetHeight / 2);
      line.style.top = top + 'px';
      line.style.bottom = bottom + 'px';
    }

    function setStage(i) {
      if (i === current) return;
      current = i;
      stacks.forEach(function (s) { s.style.setProperty('--stage', i); });
      if (num) num.textContent = '0' + (i + 1);
      nodes.forEach(function (n) {
        var k = Number(n.getAttribute('data-stage-node'));
        n.classList.toggle('is-now', k === i);
        n.classList.toggle('is-done', k < i);
      });
      stages.forEach(function (s, k) { s.classList.toggle('is-now', k === i); });
    }

    function update() {
      ticking = false;
      var mid = window.innerHeight * 0.5;
      // anchor = vertical centre of each stage, relative to viewport
      var anchors = stages.map(function (s) {
        var r = s.getBoundingClientRect();
        return r.top + r.height / 2;
      });
      var f = 0;
      if (mid <= anchors[0]) f = 0;
      else if (mid >= anchors[anchors.length - 1]) f = anchors.length - 1;
      else {
        for (var i = 0; i < anchors.length - 1; i++) {
          if (mid >= anchors[i] && mid < anchors[i + 1]) {
            f = i + (mid - anchors[i]) / (anchors[i + 1] - anchors[i]);
            break;
          }
        }
      }
      flow.style.setProperty('--p', (f / (anchors.length - 1)).toFixed(4));

      // active = the stage whose box contains the viewport middle
      var active = 0;
      stages.forEach(function (s, k) {
        if (s.getBoundingClientRect().top <= mid) active = k;
      });
      setStage(active);

      if (end) {
        var er = end.getBoundingClientRect();
        end.classList.toggle('is-near', er.top < window.innerHeight * 0.8);
      }
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    placeLine();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () { placeLine(); onScroll(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { placeLine(); update(); });
  }

  /* ---------- PURPOSE: how much do we think for you ---------- */
  function initScope() {
    var scope = $('[data-scope]');
    if (!scope) return;
    var rows = $$('tbody tr', scope);
    var apply = function (level) {
      scope.setAttribute('data-level', level);
      rows.forEach(function (tr) {
        var on = level >= Number(tr.getAttribute('data-from'));
        if (on && !tr.classList.contains('is-us')) {
          tr.classList.add('is-us');
        } else if (!on) {
          tr.classList.remove('is-us');
        }
      });
    };
    $$('input[name="scope"]', scope).forEach(function (input) {
      input.addEventListener('change', function () { apply(Number(input.value)); });
    });
    var checked = $('input[name="scope"]:checked', scope);
    apply(checked ? Number(checked.value) : 0);
  }

  /* ---------- links that pre-select the consultation topic ---------- */
  function initTopicLinks() {
    $$('[data-topic]').forEach(function (a) {
      a.addEventListener('click', function () {
        var key = a.getAttribute('data-topic');
        var radio = $('input[data-topic-key="' + key + '"]');
        if (radio) radio.checked = true;
      });
    });
  }

  /* ---------- contact form ---------- */
  function initForm() {
    var form = $('[data-form]');
    if (!form) return;
    var status = $('[data-form-status]', form);
    var submit = $('button[type="submit"]', form);
    var submitLabel = $('[data-submit-label]', form);
    var MAIL = 'relivenabi@gmail.com';
    // FormSubmit の AJAX エンドポイント（action と同じ宛先）
    var endpoint = form.getAttribute('action').replace('formsubmit.co/', 'formsubmit.co/ajax/');

    var messages = {
      name: 'お名前を入力してください。',
      email: 'メールアドレスを入力してください。',
      emailFormat: 'メールアドレスの形式を確認してください。',
      topic: 'ご相談の内容をひとつ選んでください。',
      message: 'ご相談の本文を入力してください。'
    };

    function setError(field, msg) {
      var wrap = field.closest('.field');
      var err = wrap && $('.field__err', wrap);
      if (wrap) wrap.classList.toggle('is-error', !!msg);
      if (err) err.textContent = msg || '';
      if (field.type !== 'radio') field.setAttribute('aria-invalid', msg ? 'true' : 'false');
    }

    // returns an error message for one field ('' when fine)
    function fieldError(el) {
      if (el.name === 'topic') return $('input[name="topic"]:checked', form) ? '' : messages.topic;
      if (el.name === 'email') {
        if (!el.value.trim()) return messages.email;
        return el.validity.typeMismatch ? messages.emailFormat : '';
      }
      if (messages[el.name]) return el.value.trim() ? '' : messages[el.name];
      return '';
    }

    function validate() {
      var firstBad = null;
      [form.elements.name, form.elements.email, $('input[name="topic"]', form), form.elements.message].forEach(function (el) {
        var msg = fieldError(el);
        setError(el, msg);
        if (msg && !firstBad) firstBad = el;
      });
      return firstBad;
    }

    // once a field shows an error, re-check only that field while the user fixes it
    // (re-validating everything on blur shifts the layout under the user's finger)
    $$('input, textarea', form).forEach(function (el) {
      var evt = el.type === 'radio' ? 'change' : 'input';
      el.addEventListener(evt, function () {
        var wrap = el.closest('.field');
        if (wrap && wrap.classList.contains('is-error')) {
          setError(el.type === 'radio' ? $('input[name="topic"]', form) : el, fieldError(el));
        }
      });
    });

    function mailtoFromForm() {
      var data = new FormData(form);
      var body = [
        'お名前：' + (data.get('name') || ''),
        '会社名・屋号：' + (data.get('company') || ''),
        'メール：' + (data.get('email') || ''),
        'ご相談の内容：' + (data.get('topic') || ''),
        '',
        data.get('message') || ''
      ].join('\n');
      return 'mailto:' + MAIL + '?subject=' + encodeURIComponent('【ご相談】' + (data.get('topic') || '')) + '&body=' + encodeURIComponent(body);
    }

    function showStatus(html) {
      status.innerHTML = html;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var bad = validate();
      if (bad) {
        bad.focus();
        showStatus('');
        return;
      }
      // honeypot: bots fill this, people don't
      if (form.elements._honey && form.elements._honey.value) {
        form.reset();
        showStatus('<strong>送信しました。</strong>');
        return;
      }

      var data = new FormData(form);
      var payload = {};
      data.forEach(function (v, k) { payload[k] = v; });
      payload._replyto = payload.email;

      submit.disabled = true;
      submitLabel.textContent = '送信しています…';
      showStatus('');

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          return res.json().catch(function () { return {}; }).then(function (json) {
            if (!res.ok || String(json.success) === 'false') {
              throw new Error(json.message || 'HTTP ' + res.status);
            }
            return json;
          });
        })
        .then(function () {
          form.reset();
          showStatus('<strong>送信しました。ありがとうございます。</strong>内容を確認のうえ、' + MAIL + ' からご連絡します。');
          status.setAttribute('tabindex', '-1');
          status.focus();
        })
        .catch(function () {
          var href = mailtoFromForm();
          showStatus('<strong>送信できませんでした。</strong>お手数ですが、<a href="' + href.replace(/"/g, '&quot;') + '">メールソフトで送る</a>か、' + MAIL + ' まで直接ご連絡ください。入力内容はそのまま残っています。');
        })
        .then(function () {
          submit.disabled = false;
          submitLabel.textContent = 'この内容で送信する';
        });
    });
  }

  /* ---------- mobile CTA dock ---------- */
  function initDock() {
    var dock = $('[data-dock]');
    var hero = $('.hero');
    var contact = $('#contact');
    var footer = $('.footer');
    if (!dock || !hero || !('IntersectionObserver' in window)) return;
    var state = { hero: true, contact: false, footer: false };
    var sync = function () {
      dock.classList.toggle('is-show', !state.hero && !state.contact && !state.footer);
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.target === hero) state.hero = en.isIntersecting;
        if (en.target === contact) state.contact = en.isIntersecting;
        if (en.target === footer) state.footer = en.isIntersecting;
      });
      sync();
    }, { threshold: 0 });
    io.observe(hero);
    if (contact) io.observe(contact);
    if (footer) io.observe(footer);
  }
})();
