/* ============================================================
   Very Well Hung — reveal-on-scroll fallback
   ------------------------------------------------------------
   Modern browsers run the reveal entirely in CSS via
   `animation-timeline: view()`, which the compositor drives with
   no main-thread work at all. This file exists only for the
   browsers that do not have it yet (Safari and Firefox at the
   time of writing) and it does nothing anywhere else.

   The contract with site.css:
     - resting state of `.reveal` is VISIBLE
     - `.rv-js` on <html> is what opts into the hidden-then-shown
       transition, and it is only ever added when this file is
       running AND the native path is unavailable
   So a visitor with JavaScript disabled, or one whose browser has
   scroll-driven animations, can never end up with hidden content.
   ============================================================ */
(function () {
  'use strict';

  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* A page opened in a background tab, restored from a session, or
     prerendered runs its load animation where nobody can see it. Worse,
     a throttled hidden tab can leave the hero drape part-way through its
     delay. An intro nobody watched is not worth playing, so skip it and
     show the finished state. */
  if (document.visibilityState === 'hidden') {
    document.documentElement.classList.add('no-intro');
  }

  var native = window.CSS && CSS.supports && CSS.supports('animation-timeline', 'view()');
  if (native || reduced || !('IntersectionObserver' in window)) return;

  var root = document.documentElement;
  root.classList.add('rv-js');

  function observe() {
    var targets = document.querySelectorAll('.reveal:not(.is-in)');
    if (!targets.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    targets.forEach(function (el) {
      // Anything already on screen at load is shown immediately rather
      // than animated, so the first paint is never a page of blanks.
      var box = el.getBoundingClientRect();
      if (box.top < innerHeight * 0.92) { el.classList.add('is-in'); return; }
      io.observe(el);
    });
  }

  // vwh.js renders cards, tiles and steps from content.js, so anything
  // marked .reveal inside those containers only exists after it runs.
  // Both scripts are deferred and vwh.js is ordered first, so a single
  // pass on DOMContentLoaded catches the lot.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observe);
  } else {
    observe();
  }

  /* ---------- Pinned scroll-scrub fallback ----------
     Three sections (site.css: "3 · Pinned scroll-scrub") pin
     themselves and read a --scrub custom property that runs 0 → 1
     across their own scroll distance. Where `native` is true, a CSS
     named view-timeline drives it with no JS at all, and everything
     below is skipped (the early return above already covers that).
     Here — the same browsers this whole file exists for — a scroll
     listener drives it instead. Either way this only ever sets one
     number; what --scrub actually changes is entirely CSS's call. */
  var scrubWide = window.matchMedia && matchMedia('(min-width: 860px)');
  if (scrubWide && scrubWide.matches) {
    var scrubEls = Array.prototype.slice.call(document.querySelectorAll('[data-scrub]'));
    if (scrubEls.length) {
      scrubEls.forEach(function (el) { el.classList.add('is-scrub-js'); });

      var scrubTicking = false;
      function updateScrub() {
        scrubTicking = false;
        scrubEls.forEach(function (el) {
          var rect = el.getBoundingClientRect();
          var span = rect.height - innerHeight;
          var progress = span > 0 ? (-rect.top) / span : 0;
          el.style.setProperty('--scrub', Math.max(0, Math.min(1, progress)));
        });
      }
      function onScrub() {
        if (scrubTicking) return;
        scrubTicking = true;
        requestAnimationFrame(updateScrub);
      }
      window.addEventListener('scroll', onScrub, { passive: true });
      window.addEventListener('resize', onScrub);
      updateScrub();
    }
  }
})();
