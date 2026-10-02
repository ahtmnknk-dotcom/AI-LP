// 控えめなモーションと、スマートフォン用追従CTAの表示制御のみ。
// 計測・Cookie・フォーム送信などは一切行わない。
(function () {
  var root = document.documentElement;
  if (!('IntersectionObserver' in window)) return;
  root.classList.add('js');

  // soft reveal
  var revealIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      revealIO.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.reveal').forEach(function (el) { revealIO.observe(el); });

    // 追従CTA：ヒーローを過ぎてから表示し、募集概要〜最終CTAが見えている間は隠す
    var bar = document.querySelector('[data-sticky-cta]');
    var hero = document.querySelector('.hero');
    var hideZones = document.querySelectorAll('#information, .final');
    if (!bar || !hero) return;

    var pastHero = false;
    var inHideZone = new Set();
    var update = function () {
      var show = pastHero && inHideZone.size === 0;
      bar.classList.toggle('is-visible', show);
      bar.setAttribute('aria-hidden', show ? 'false' : 'true');
      bar.querySelector('a').tabIndex = show ? 0 : -1;
    };

    new IntersectionObserver(function (entries) {
      pastHero = !entries[0].isIntersecting && entries[0].boundingClientRect.top < 0;
      update();
    }).observe(hero);

    var zoneIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) inHideZone.add(entry.target);
        else inHideZone.delete(entry.target);
      });
      update();
    });
    hideZones.forEach(function (el) { zoneIO.observe(el); });
  });
})();
