/* ============================================================
   Very Well Hung — SITE CONFIG
   ------------------------------------------------------------
   The only file you edit to switch on analytics, spam
   protection and enquiry delivery. Every value starts empty,
   and empty means "that feature stays off" — the site works
   exactly as it does today until a value is filled in, so a
   half-finished setup can never break the live site.

   See SETUP-GA-GSC-SHEETS.md for where each value comes from.
   ============================================================ */
(function (root) {
  'use strict';

  root.VWH_CONFIG = {

    /* ---- 1. Google Analytics 4 ----------------------------------
       Measurement ID from GA4 → Admin → Data streams → your web
       stream. Looks like 'G-XXXXXXXXXX'.
       While empty: no analytics, and no cookie banner is shown
       (there are no cookies to consent to). */
    ga4MeasurementId: 'G-8JZRWHTHWW',

    /* ---- 2. Cloudflare Turnstile --------------------------------
       Site key from Cloudflare dashboard → Turnstile → your
       widget. Public — safe to sit in this file. Looks like
       '0x4AAAAAAA...'.
       The matching SECRET key is NOT stored here: it belongs in
       the Apps Script, server-side, and must never reach the
       browser.
       While empty: forms still submit, just without a bot check. */
    turnstileSiteKey: '',

    /* ---- 3. Enquiry endpoint ------------------------------------
       The Apps Script web app URL, ending in /exec. This is what
       writes enquiries to the Google Sheet and emails Simone.
       While empty: forms fall back to today's behaviour — they
       show the thank-you note telling the visitor to phone or
       email instead, so no enquiry is silently lost. */
    enquiryEndpoint: 'https://script.google.com/macros/s/AKfycbz0lVQy7qNp9ZHJMNtZKAB86bAWe85VoNOcwAQArj10Zxsp2Om8vYg6651uGmBAbqM/exec',

    /* ---- 4. Consent banner --------------------------------------
       Bump this version to re-ask everyone for consent (for
       example if you later add advertising cookies). Visitors who
       already chose are not asked again until this changes. */
    consentVersion: 1
  };

})(typeof window !== 'undefined' ? window : this);
