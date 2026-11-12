/* ==========================================================
   Gourav Chouhan — Portfolio
   Small, dependency-free enhancements.
   ========================================================== */
(function () {
  'use strict';

  var nav = document.querySelector('.nav');
  var links = document.querySelectorAll('.nav ul a');
  var sections = document.querySelectorAll('main section[id]');

  /* 1. Solid nav background after scrolling past the top */
  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* 2. Highlight the nav link of the section currently in view */
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        var map = { what: 'about', skills: 'about', education: 'about' };
        var target = map[id] || id;
        links.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + target);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });

    /* 3. Scroll reveal fallback (only when CSS scroll-driven animations are unsupported) */
    var supportsTimeline = window.CSS && CSS.supports && CSS.supports('animation-timeline: view()');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!supportsTimeline && !reduce) {
      document.documentElement.classList.add('js-reveal');
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.15 });
      document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
    }
  }

})();
