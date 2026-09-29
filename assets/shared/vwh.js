/* ============================================================
   Very Well Hung — shared behaviour (all three directions)
   ------------------------------------------------------------
   1. Mobile nav toggle (same approach as the Fosters/OnPoint
      demos — toggles `.is-nav-open`; each theme styles it).
   2. Content binder: fills [data-vwh="path"] from window.VWH so
      every page draws shared copy/placeholders from content.js.
   3. List renderers: [data-vwh-list="services|gallery|faqs|
      process|why|themes|formfields"].
   4. Enquiry forms: Turnstile check, then POST to the Apps
      Script endpoint in VWH_CONFIG (sheet + email). Falls back
      to the old "phone or email instead" note when unconfigured.
   Defensive throughout: missing keys leave existing markup alone.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 1. Mobile nav ---------- */
  function closeNav(nav) {
    if (!nav) return null;
    nav.classList.remove('is-nav-open');
    var t = nav.querySelector('[data-nav-toggle]');
    if (t) t.setAttribute('aria-expanded', 'false');
    return t;
  }
  document.addEventListener('click', function (e) {
    var toggle = e.target.closest('[data-nav-toggle]');
    if (toggle) {
      e.preventDefault();
      var nav = toggle.closest('nav');
      if (!nav) return;
      var open = nav.classList.toggle('is-nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      return;
    }
    var openNav = document.querySelector('nav.is-nav-open');
    if (openNav && !e.target.closest('nav.is-nav-open')) closeNav(openNav);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape' && e.key !== 'Esc') return;
    var t = closeNav(document.querySelector('nav.is-nav-open'));
    if (t) t.focus();
  });

  /* ---------- helpers ---------- */
  var VWH = window.VWH;
  function get(path) {
    if (!VWH) return undefined;
    return path.split('.').reduce(function (o, k) {
      return (o && o[k] !== undefined) ? o[k] : undefined;
    }, VWH);
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  if (!VWH) return; // content.js not loaded — leave inline fallbacks in place.

  /* ---------- Demo badge (centralised) ----------
     <div class="v-demo-badge" data-vwh-badge="a"></div>
     Renders: current option · title · demo note · A·B·C compare
     links · back to chooser. One bar, identical on every page. */
  var BASE = '/';
  document.querySelectorAll('[data-vwh-badge]').forEach(function (el) {
    var cur = el.getAttribute('data-vwh-badge');
    var opts = get('options');
    if (!opts || !opts[cur]) return;
    var compare = ['a', 'b', 'c'].map(function (k) {
      var o = opts[k];
      return (k === cur)
        ? '<strong>' + esc(o.label) + '</strong>'
        : '<a href="' + BASE + o.dir + '/">' + esc(o.label) + '</a>';
    }).join(' · ');
    el.innerHTML = esc(opts[cur].label) + ' · ' + esc(opts[cur].title) +
      ' · Private concept demo for Simone · Compare: ' + compare +
      ' · <a href="' + BASE + '">Back to chooser</a>';
  });

  /* ---------- 2. Scalar binder ----------
     <span data-vwh="phone">…</span>                      → sets text (and href if data-vwh-href)
     <a data-vwh="phone" data-vwh-attr="href">Call</a>    → sets ONLY href (tel:/mailto:), keeps the label
  */
  function telHref(v) { return 'tel:' + String(v).replace(/[^+\d]/g, ''); }
  document.querySelectorAll('[data-vwh]').forEach(function (el) {
    var key = el.getAttribute('data-vwh');
    var val = get(key);
    if (val === undefined || typeof val === 'object') return;
    var attr = el.getAttribute('data-vwh-attr');

    // href-only mode: set the link from the bound value, leave the label untouched.
    if (attr === 'href') {
      if (val && val !== '#') {
        if (key === 'phone' || key === 'phoneHref') el.href = telHref(val);
        else if (key === 'email' || key === 'emailHref') el.href = 'mailto:' + val;
        else el.href = val;
      }
      return;
    }

    el.textContent = val;
    // optional href driven by a separate key (e.g. show the number, link to tel:)
    var hrefKey = el.getAttribute('data-vwh-href');
    if (hrefKey) {
      var href = get(hrefKey);
      if (href && href !== '#') {
        if (key === 'phone') el.href = telHref(href);
        else if (key === 'email') el.href = 'mailto:' + href;
        else el.href = href;
      }
    }
  });

  /* ---------- 3. List renderers ----------
     The renderers themselves live in assets/shared/render.js so the
     same code can pre-render this HTML into the .html files at author
     time (tools/bake.js). Here they only re-draw what is already
     baked in, which keeps the runtime and the crawlable HTML from
     drifting apart. */
  var R = window.VWHRender;
  if (R) {
    document.querySelectorAll('[data-vwh-list]').forEach(function (el) {
      var html = R.renderList(el.getAttribute('data-vwh-list'), VWH);
      if (html !== null) el.innerHTML = html;
    });
  }

  /* ---------- 3b. Hide sections with nothing confirmed yet ----------
     Wrap anything that depends on unconfirmed content in
     [data-vwh-optional]. Once the binder and renderers above have run,
     a wrapper whose bound targets are all empty is removed from the
     page entirely. This is what lets content.js hold empty slots for
     Simone's answers without the page ever showing a placeholder — the
     page shrinks honestly instead of filling with invention. */
  document.querySelectorAll('[data-vwh-optional]').forEach(function (el) {
    var targets = el.querySelectorAll('[data-vwh-list], [data-vwh-fill]');
    if (!targets.length) return;
    var hasContent = Array.prototype.some.call(targets, function (t) {
      return t.textContent.trim() !== '';
    });
    if (!hasContent) el.hidden = true;
  });

  /* ---------- 3c. Simone's portrait, if there is one yet ----------
     [data-vwh-portrait] blocks are authored to stand on their own as a
     single-column editorial statement. If about.portrait.src is set in
     content.js, the photo is injected and the block flips to the
     portrait-led two-column split via .has-portrait. Nothing else on
     the page needs editing when the photo arrives. */
  var portrait = get('about.portrait');
  if (portrait && portrait.src) {
    document.querySelectorAll('[data-vwh-portrait]').forEach(function (el) {
      var media = el.querySelector('[data-vwh-portrait-media]');
      if (!media) return;
      var img = document.createElement('img');
      img.src = portrait.src;
      img.alt = portrait.alt || 'Simone of Very Well Hung';
      img.loading = 'lazy';
      media.appendChild(img);
      el.classList.add('has-portrait');
    });
  }

  /* ---------- 4. Enquiry forms ----------
     Sends to the Apps Script endpoint in VWH_CONFIG, which writes
     the enquiry to the Google Sheet and emails Simone.

     Two rules shape this code, because a lost enquiry is a lost
     job for a one-person business:
       - With no endpoint configured, the form keeps its previous
         behaviour: show the thank-you telling the visitor to
         phone or email. It never pretends to have sent.
       - If the request fails, the visitor is told plainly and
         given the phone number. The form is NOT cleared, so
         nothing they typed is lost. */

  var CFG = window.VWH_CONFIG || {};
  var ENDPOINT = (CFG.enquiryEndpoint || '').trim();
  var TS_KEY = (CFG.turnstileSiteKey || '').trim();

  var MAX_PHOTOS = 3;
  var MAX_PHOTO_BYTES = 5 * 1024 * 1024;

  function formSource(form) {
    // The office survey form is the one built from officeformfields.
    return form.querySelector('[data-vwh-list="officeformfields"]') ? 'office' : 'home';
  }

  function setBusy(form, busy) {
    var btn = form.querySelector('button[type="submit"]');
    if (!btn) return;
    if (busy) {
      btn.dataset.label = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;
    } else {
      if (btn.dataset.label) btn.textContent = btn.dataset.label;
      btn.disabled = false;
    }
  }

  function showError(form, msg) {
    var el = form.querySelector('[data-vwh-form-error]');
    if (!el) {
      el = document.createElement('p');
      el.className = 'v-form__error';
      el.setAttribute('data-vwh-form-error', '');
      var btn = form.querySelector('button[type="submit"]');
      if (btn && btn.parentNode) btn.parentNode.insertBefore(el, btn.nextSibling);
      else form.appendChild(el);
    }
    el.textContent = msg;
    el.hidden = false;
  }

  function clearError(form) {
    var el = form.querySelector('[data-vwh-form-error]');
    if (el) el.hidden = true;
  }

  // Reads the office form's photo input as base64 so the files can
  // travel in the JSON payload. Oversized or extra files are
  // dropped here rather than failing the whole enquiry.
  function readPhotos(form) {
    var input = form.querySelector('input[type="file"]');
    if (!input || !input.files || !input.files.length) return Promise.resolve([]);

    var files = Array.prototype.slice.call(input.files, 0, MAX_PHOTOS)
      .filter(function (f) { return f.size <= MAX_PHOTO_BYTES; });

    return Promise.all(files.map(function (f) {
      return new Promise(function (resolve) {
        var r = new FileReader();
        r.onload = function () {
          resolve({ name: f.name, type: f.type, data: String(r.result).split(',')[1] });
        };
        r.onerror = function () { resolve(null); };
        r.readAsDataURL(f);
      });
    })).then(function (list) { return list.filter(Boolean); });
  }

  function collect(form) {
    var data = {};
    form.querySelectorAll('input, textarea, select').forEach(function (el) {
      if (!el.name && !el.id) return;
      if (el.type === 'file' || el.type === 'submit') return;
      var key = el.name || el.id;
      if (key === 'cf-turnstile-response') return;
      data[key] = el.value;
    });
    data.pageUrl = location.pathname;
    return data;
  }

  document.querySelectorAll('form[data-vwh-form]').forEach(function (form) {

    // Honeypot. Hidden from people and from screen readers; bots
    // that fill every field give themselves away.
    var pot = document.createElement('input');
    pot.type = 'text';
    pot.name = 'company_website';
    pot.tabIndex = -1;
    pot.autocomplete = 'off';
    pot.setAttribute('aria-hidden', 'true');
    pot.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;opacity:0;';
    form.appendChild(pot);

    // Turnstile mount point, added only when a site key exists.
    if (TS_KEY && ENDPOINT) {
      var mount = document.createElement('div');
      mount.className = 'v-form__turnstile';
      mount.setAttribute('data-turnstile-mount', '');
      var submit = form.querySelector('button[type="submit"]');
      if (submit && submit.parentNode) submit.parentNode.insertBefore(mount, submit);
      else form.appendChild(mount);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearError(form);

      var done = form.querySelector('[data-vwh-form-done]');

      // Not wired up yet: keep the honest fallback. The note in the
      // markup confirms delivery, which would be a lie with nowhere
      // to deliver to, so it is replaced rather than shown.
      if (!ENDPOINT) {
        if (done) {
          done.textContent = 'Thank you. So this reaches Simone straight away, ' +
            'please call 020 8952 0404 or email simone@verywellhung.co.uk.';
          done.hidden = false;
          form.querySelectorAll('input,textarea,button').forEach(function (c) { c.disabled = true; });
        }
        return;
      }

      var source = formSource(form);
      var token = '';
      var tsField = form.querySelector('[name="cf-turnstile-response"]');
      if (tsField) token = tsField.value;

      if (TS_KEY && !token) {
        showError(form, 'Please complete the “I’m not a robot” check just above, then send again.');
        return;
      }

      setBusy(form, true);

      readPhotos(form).then(function (photos) {
        return fetch(ENDPOINT, {
          method: 'POST',
          // text/plain keeps this a "simple" request, so the browser
          // sends no preflight — Apps Script cannot answer OPTIONS.
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            source: source,
            data: collect(form),
            photos: photos,
            company_website: pot.value,
            turnstileToken: token
          })
        });
      }).then(function (res) {
        return res.json().catch(function () { return { ok: false, error: 'bad-response' }; });
      }).then(function (out) {
        if (!out || !out.ok) throw new Error((out && out.error) || 'unknown');

        // The button carries the outcome as much as the note does:
        // left saying "Sending…" it reads as a form still working,
        // or worse as one that hung, which is what a stuck label
        // looks like from the outside.
        var sent = form.querySelector('button[type="submit"]');
        if (sent) sent.textContent = 'Sent, thank you';

        if (done) {
          done.hidden = false;
          form.querySelectorAll('input,textarea,button').forEach(function (c) { c.disabled = true; });
        }
        var mnt = form.querySelector('[data-turnstile-mount]');
        if (mnt) mnt.hidden = true;

        if (window.VWH_CONSENT) {
          window.VWH_CONSENT.track('generate_lead', { form: source });
        }
      }).catch(function (err) {
        setBusy(form, false);
        if (window.turnstile) {
          try { window.turnstile.reset(); } catch (e2) { /* widget already gone */ }
        }
        showError(form,
          'Sorry, that didn’t send. Nothing you typed has been lost, so please try again, ' +
          'or call Simone on 020 8952 0404.');
        console.error('Enquiry submit failed:', err);
      });
    });
  });

  /* Sticky contact bar.

     The bar is in the HTML of the office pages and CSS keeps it off
     screen until <body> gets `is-past-hero`. That class is set here,
     from an IntersectionObserver on the hero, so the bar appears only
     once the reader has scrolled past the buttons it duplicates.

     `has-stickybar` reserves the bottom padding, and is added by this
     script rather than sitting in the markup so a page with JavaScript
     off gets no phantom gap at the foot of the form. The bar itself
     is two ordinary links, so it still works if this never runs; it
     simply stays where CSS put it. */
  var stickybar = document.querySelector('.o-stickybar');
  if (stickybar) {
    document.body.classList.add('has-stickybar');
    var heroEl = document.querySelector('.w-hero-split, .w-page-hero, .w-hero');
    if (heroEl && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        document.body.classList.toggle('is-past-hero', !entries[0].isIntersecting);
      }, { rootMargin: '-40px 0px 0px 0px' }).observe(heroEl);
    } else {
      // No observer, or no hero to watch: show it rather than hide it.
      document.body.classList.add('is-past-hero');
    }
  }

  /* Automika credit click.

     The structural-engineer site fires this through its own
     PANOPTIC_ANALYTICS wrapper; here the equivalent is VWH_CONSENT.track,
     which is a no-op until analytics consent has actually been granted.
     That difference is the only reason this is not a straight port.

     The link itself is plain HTML and needs none of this to work. If the
     script never runs, or consent was declined, the credit still links
     to Automika and simply goes unmeasured. */
  var credit = document.querySelector('[data-automika-credit-link]');
  if (credit) {
    credit.addEventListener('click', function () {
      try {
        if (window.VWH_CONSENT && typeof window.VWH_CONSENT.track === 'function') {
          window.VWH_CONSENT.track('automika_credit_click', {
            link_url: credit.href,
            link_location: 'footer_credit'
          });
        }
      } catch (err) { /* a credit click must never break the navigation */ }
    });
  }

  /* Turnstile script, loaded only if there is a key and an endpoint.
     Explicit rendering, because the site key comes from config
     rather than being hard-coded into the markup. */
  if (TS_KEY && ENDPOINT && document.querySelector('[data-turnstile-mount]')) {
    window.vwhTurnstileReady = function () {
      document.querySelectorAll('[data-turnstile-mount]').forEach(function (m) {
        try {
          window.turnstile.render(m, { sitekey: TS_KEY, theme: 'light' });
        } catch (err) {
          console.error('Turnstile render failed:', err);
        }
      });
    };
    var ts = document.createElement('script');
    ts.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=vwhTurnstileReady&render=explicit';
    ts.async = true;
    ts.defer = true;
    document.head.appendChild(ts);
  }

})();
