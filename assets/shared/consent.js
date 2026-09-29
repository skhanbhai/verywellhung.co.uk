/* ============================================================
   Very Well Hung — COOKIE CONSENT + GA4
   ------------------------------------------------------------
   UK PECR requires consent BEFORE analytics cookies are set, so
   this script makes no request to Google until the visitor
   accepts. Nothing is pre-loaded and nothing is "denied by
   default but already downloaded" — if consent is refused, the
   browser never contacts Google at all.

   Behaviour:
     - No GA4 measurement ID configured → no banner, no scripts.
       (There is nothing to consent to, so asking would be noise.)
     - Choice remembered in localStorage against consentVersion.
     - "Cookie settings" link is injected into the footer so the
       choice can always be changed, which the ICO expects.

   Public API:
     VWH_CONSENT.open()        reopen the banner
     VWH_CONSENT.state()       'granted' | 'denied' | null
     VWH_CONSENT.track(n, p)   send a GA4 event if, and only if,
                               consent was granted
   ============================================================ */
(function () {
  'use strict';

  var CFG = window.VWH_CONFIG || {};
  var GA_ID = (CFG.ga4MeasurementId || '').trim();
  var VERSION = CFG.consentVersion || 1;
  var KEY = 'vwh-consent-v' + VERSION;

  var loaded = false;

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function remember(v) {
    try { localStorage.setItem(KEY, v); } catch (e) { /* private mode: choice lasts the session only */ }
  }

  /* ---- GA4, loaded only once consent exists ---- */
  function loadGA() {
    if (loaded || !GA_ID) return;
    loaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };

    // Consent Mode v2. Analytics is granted because we only reach
    // this function after an explicit accept; advertising stays
    // denied because this site sets no advertising cookies.
    window.gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'granted',
      functionality_storage: 'granted',
      security_storage: 'granted'
    });

    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
    document.head.appendChild(s);

    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { anonymize_ip: true });
  }

  /* ---- Banner ---- */
  var banner = null;

  /* The banner is fixed to the bottom of the viewport at z-index 200,
     above both the office pages' sticky contact bar and the floating
     WhatsApp button. Rather than fight that with z-index, which would
     put a CTA over a consent choice, the body carries a class while the
     banner is up and CSS lifts the other two clear of it. */
  function flag(on) {
    if (document.body) document.body.classList.toggle('has-consent-banner', !!on);
  }

  function close() {
    if (banner) { banner.remove(); banner = null; }
    flag(false);
  }

  function decide(choice) {
    remember(choice);
    close();
    if (choice === 'granted') loadGA();
  }

  function build() {
    if (banner) return;
    banner = document.createElement('div');
    banner.className = 'vwh-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie choices');
    banner.innerHTML =
      '<div class="vwh-consent__inner">' +
        '<p class="vwh-consent__text">' +
          'We’d like to use Google Analytics to see which pages are useful, ' +
          'which sets cookies on your device. Nothing is loaded unless you accept, ' +
          'and we never use advertising cookies.' +
        '</p>' +
        '<div class="vwh-consent__actions">' +
          '<button type="button" class="w-btn w-btn--green" data-consent="granted">Accept</button>' +
          '<button type="button" class="w-btn w-btn--ghost" data-consent="denied">Reject</button>' +
        '</div>' +
      '</div>';

    banner.addEventListener('click', function (e) {
      var b = e.target.closest('[data-consent]');
      if (b) decide(b.getAttribute('data-consent'));
    });

    document.body.appendChild(banner);
    flag(true);
  }

  /* ---- Footer "Cookie settings" link ----
     Injected rather than hard-coded into eight footers, so there
     is one definition and it only appears when there is actually
     a choice to change. */
  function addFooterLink() {
    var legal = document.querySelector('.v-footer__legal');
    if (!legal || legal.querySelector('[data-consent-reopen]')) return;
    var a = document.createElement('a');
    a.href = '#';
    a.textContent = 'Cookie settings';
    a.setAttribute('data-consent-reopen', '');
    a.style.marginLeft = '10px';
    a.addEventListener('click', function (e) { e.preventDefault(); build(); });
    legal.appendChild(document.createTextNode(' · '));
    legal.appendChild(a);
  }

  function start() {
    // No measurement ID means no cookies, so no banner and no link.
    if (!GA_ID) return;
    var choice = stored();
    if (choice === 'granted') loadGA();
    else if (choice !== 'denied') build();
    addFooterLink();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

  window.VWH_CONSENT = {
    open: build,
    state: stored,
    /* Fires a GA4 event only when consent was granted. Safe to call
       unconditionally — it is a no-op otherwise. */
    track: function (name, params) {
      if (!GA_ID || stored() !== 'granted' || typeof window.gtag !== 'function') return;
      window.gtag('event', name, params || {});
    }
  };

})();
