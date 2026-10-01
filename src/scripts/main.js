/* PURPOSE — small, dependency-free enhancements. The page is fully readable without this file. */
(() => {
  const doc = document.documentElement;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  requestAnimationFrame(() => requestAnimationFrame(() => doc.classList.add('is-ready')));

  /* ---------- Scroll reveal ---------- */
  const revealTargets = $$('[data-reveal], .depth, .langs');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- Header state ---------- */
  const header = $('[data-header]');
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const toggle = $('[data-menu-toggle]');
  const nav = $('[data-nav]');
  const label = $('[data-menu-label]');
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    header.classList.toggle('menu-open', open);
    label.textContent = open ? 'Close' : 'Menu';
    document.body.style.overflow = open ? 'hidden' : '';
    // メニュー表示中は背面のコンテンツをフォーカス対象外に
    $$('main, .site-footer').forEach((el) => (el.inert = open));
    if (open) $('a', nav)?.focus();
  };
  toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  nav?.addEventListener('click', (e) => {
    if (e.target.closest('a') && nav.classList.contains('is-open')) setMenu(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav?.classList.contains('is-open')) {
      setMenu(false);
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => e.matches && setMenu(false));

  /* ---------- Comparison tabs (mobile) ---------- */
  const tabs = $('[data-compare-tabs]');
  const table = $('#compare-table');
  if (tabs && table) {
    tabs.hidden = false;
    const buttons = $$('[role="tab"]', tabs);
    const select = (btn, focus = false) => {
      buttons.forEach((b) => {
        const on = b === btn;
        b.setAttribute('aria-selected', String(on));
        b.tabIndex = on ? 0 : -1;
      });
      table.dataset.active = btn.dataset.planTab;
      table.setAttribute('aria-labelledby', btn.id);
      if (focus) btn.focus();
    };
    buttons.forEach((b, i) => {
      b.addEventListener('click', () => select(b));
      b.addEventListener('keydown', (e) => {
        const dir = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (dir) {
          e.preventDefault();
          select(buttons[(i + dir + buttons.length) % buttons.length], true);
        } else if (e.key === 'Home' || e.key === 'End') {
          e.preventDefault();
          select(buttons[e.key === 'Home' ? 0 : buttons.length - 1], true);
        }
      });
    });
  }

  /* ---------- Plan preselect from CTA ---------- */
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-plan]');
    if (!link) return;
    const radio = $(`input[name="plan"][value="${link.dataset.plan}"]`);
    if (radio) radio.checked = true;
  });

  /* ---------- Mobile fixed CTA ---------- */
  const mobileCta = $('[data-mobile-cta]');
  const hero = $('.hero');
  const hideZones = $$('.final, #contact, .site-footer');
  if (mobileCta && hero && 'IntersectionObserver' in window) {
    const state = { pastHero: false, inHideZone: new Set() };
    const update = () => {
      const show = state.pastHero && state.inHideZone.size === 0;
      mobileCta.classList.toggle('is-visible', show);
      mobileCta.inert = !show;
    };
    new IntersectionObserver(([entry]) => {
      state.pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      update();
    }).observe(hero);
    const zoneObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => (entry.isIntersecting ? state.inHideZone.add(entry.target) : state.inHideZone.delete(entry.target)));
      update();
    });
    hideZones.forEach((z) => zoneObserver.observe(z));
  }

  /* ---------- Contact form ---------- */
  const form = $('[data-form]');
  if (!form) return;
  const done = $('[data-form-done]');
  const status = $('[data-status]', form);
  const submit = $('[data-submit]', form);
  const submitLabel = $('[data-submit-label]', form);
  const endpoint = form.dataset.endpoint;

  const messages = {
    name: 'お名前を入力してください。',
    email: 'メールアドレスを入力してください。',
    emailFormat: 'メールアドレスの形式をご確認ください（例：name@example.com）。',
    message: '作りたいLPについて、分かる範囲でご記入ください。',
  };

  const setError = (input, msg) => {
    const error = $(`#${input.id}-error`);
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (!error) return;
    error.textContent = msg || '';
    error.hidden = !msg;
  };

  const validate = (input) => {
    const value = input.value.trim();
    let msg = '';
    if (input.required && !value) msg = messages[input.name] || 'この項目を入力してください。';
    else if (input.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) msg = messages.emailFormat;
    setError(input, msg);
    return !msg;
  };

  const fields = $$('input.input, textarea.input', form).filter((el) => el.required);
  fields.forEach((input) => {
    input.addEventListener('blur', () => input.value && validate(input));
    input.addEventListener('input', () => input.getAttribute('aria-invalid') === 'true' && validate(input));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = '';
    status.classList.remove('is-error');

    const invalid = fields.filter((f) => !validate(f));
    if (invalid.length) {
      status.textContent = `${invalid.length}件の入力内容をご確認ください。`;
      status.classList.add('is-error');
      invalid[0].focus();
      return;
    }

    const data = new FormData(form);
    if (data.get('_gotcha')) return; // bot

    submit.setAttribute('aria-busy', 'true');
    submitLabel.textContent = '送信中…';

    try {
      if (endpoint) {
        const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || json.success === false) throw new Error(json.message || `HTTP ${res.status}`);
      } else {
        // デモモード: site.form.endpoint が未設定のため実際には送信していません
        console.info('[contact] demo mode — set site.form.endpoint to receive submissions.', Object.fromEntries(data));
        await new Promise((r) => setTimeout(r, 700));
      }
      $('[data-done-email]', done).textContent = data.get('email');
      form.hidden = true;
      done.hidden = false;
      done.focus({ preventScroll: true });
      done.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    } catch (err) {
      console.error(err);
      status.textContent = '送信できませんでした。時間をおいて再度お試しください。';
      status.classList.add('is-error');
    } finally {
      submit.removeAttribute('aria-busy');
      submitLabel.textContent = 'この内容で送信する';
    }
  });
})();
