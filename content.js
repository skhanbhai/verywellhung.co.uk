/* ============================================================
   Very Well Hung — SHARED CONTENT (single source of truth)
   ------------------------------------------------------------
   One content file feeds the chooser and all three strategic
   website directions:
     Option A — Premium Made-to-Measure   (recommended lead)
     Option B — Trusted Local Specialist  (safe fallback)
     Option C — Trade & Property Partner  (BNI/referral stretch)

   RULES baked in (see assets/research/*):
   - Every factual detail Simone has not confirmed stays a
     [PLACEHOLDER]. Nothing is invented — no years trading,
     accreditations, guarantees, team size, job count, areas.
   - Reviews are quoted verbatim from Simone's Google Business
     Profile and nowhere else. Spelling and punctuation are the
     reviewers' own, except for an outright typo, which may be
     corrected if it changes no meaning and the original is kept
     alongside it in `verbatim`. A review Google truncates behind
     "... More" is marked `partial`, shows on the page as an
     excerpt, and is kept out of the Review markup, because
     reviewBody asserts it IS the review. Ratings come off the
     profile's own ratings distribution; the aggregate is
     computed, never typed.
   - No stock photography. Gallery uses labelled placeholder tiles
     until Simone provides her own photos (Facebook images are
     draft-only and not bundled here).
   - Curtains, blinds, shutters and soft furnishings are all
     confirmed services Simone offers (shutters + soft furnishings
     confirmed by Simone 17 Jun 2026). Real photos of her shutter
     and soft-furnishing work still to come — those cards use clearly
     labelled illustrative stock until then.
   ============================================================ */
(function (root) {
  'use strict';

  // Base path for Simone's photo assets (saved from her public Facebook page).
  // INTERNAL NOTE: these Facebook-derived images are demo placeholders only,
  // until Simone confirms permission or provides high-resolution originals.
  // They must not ship on a live site without that confirmation.
  var FB = '/assets/Facebook/';

  // Simone's own recent installation photos (July 2026, via WhatsApp) —
  // curated, renamed and converted in assets/work/. These are real jobs.
  var WORK = '/assets/work/';

  // Stock images — ILLUSTRATIVE DEMO PLACEHOLDERS ONLY.
  // These are NOT photographs of Simone's own work and must never be
  // presented as such. They fill non-portfolio slots (the shutters and
  // soft-furnishing category cards, the fabric-advice card, and a subtle
  // CTA-band texture) so no card is empty in the concept demo. The gallery
  // stays 100% Simone's real photos. Replace all of these with Simone's
  // own confirmed images before anything goes live.
  // Sourced from Unsplash (free, Unsplash License), downloaded and converted
  // to local WebP so the demo is self-contained (no external CDN dependency).
  // Originals: unsplash.com/photos/{1483247416020, 1668956343245,
  //            1628512743826, 1705290304455}. See assets/shared/fetch-and-convert.sh.
  var IMG = '/assets/shared/img/';
  var UNS_SHUTTERS = IMG + 'shutters-plantation.webp';
  var UNS_FABRIC   = IMG + 'fabric-samples.webp';
  var UNS_SOFTFURN = IMG + 'cushions-piped.webp';

  var VWH = {
    /* ---- Business identity (cross-cutting placeholders) ---- */
    businessName: 'Very Well Hung',
    tagline: 'Handmade made-to-measure curtains & blinds',
    taglineWide: 'Blinds, curtains & shutters for homes & workplaces',
    owner: 'Simone',

    // Contact — phone/email/website/area are from Simone's public
    // Facebook listing (confirmed hers, 17 Jun 2026; see
    // notes/decisions-and-todo.md). Still to confirm with Simone
    // that these are the contact details she wants used for
    // enquiries before go-live. Hours / response / lead time are
    // genuinely unknown and remain placeholders.
    phone: '020 8952 0404',
    phoneHref: '+44 20 8952 0404',   // binder turns this into tel:
    // Confirmed by Simone, 15 Aug 2026. `whatsappHref` is the
    // international form wa.me needs: digits only, no plus, no
    // leading zero. The office page is read on a phone by someone
    // standing in front of the window, so "send me a photo" is a
    // far smaller ask than "book a survey" and is the primary
    // route on that page.
    whatsapp: '07966 285266',
    whatsappHref: '447966285266',
    email: 'simone@verywellhung.co.uk',
    emailHref: 'simone@verywellhung.co.uk',  // binder turns this into mailto:
    website: 'verywellhung.co.uk',
    // Simone's public Facebook page, confirmed hers. This is the one
    // profile that already ranks for the brand name, so it is what
    // ties this domain to the business Google already knows about:
    // `sameAs` in the schema and a rel="me" link in the footer both
    // point here. Add Instagram to the same list if one turns up.
    facebook: 'https://www.facebook.com/verywellhungcurtains/',
    // Simone's Google Business Profile, supplied 24 Aug 2026. This is the
    // second confirmed entity signal and the more valuable of the two:
    // it is the profile that feeds the map pack, and it is where the
    // reviews live. It goes in `sameAs` alongside the Facebook page.
    //
    // The short link resolves to place 0x86763a81d12b2bc1:0x400f9ca000f4320,
    // i.e. CID 288505022131421984. The canonical `?cid=` form is used here
    // rather than the shortened one because it is stable, it is what Google
    // itself resolves to, and it does not depend on a URL shortener staying up.
    // Both forms were checked live on 24 Aug 2026.
    googleProfile: 'https://www.google.com/maps?cid=288505022131421984',
    area: 'London',                  // boroughs / postcodes to confirm
    bio: 'Make your house a home with beautiful, handmade curtains and blinds.',  // Simone's own public wording
    hours: '[BUSINESS HOURS TO CONFIRM]',
    responseTime: '[RESPONSE TIME TO CONFIRM]',
    leadTime: '[LEAD TIME TO CONFIRM]',

    /* ---- The three directions (label, slug, hero copy, CTAs) ---- */
    options: {
      a: {
        label: 'Option A',
        dir: 'option-a-premium-interiors',
        title: 'Premium Made-to-Measure',
        tagline: 'Made-to-measure curtains, blinds & shutters',
        recommended: true,
        heroTitle: 'Beautiful made-to-measure curtains and blinds, fitted with care.',
        heroSub: 'Personal help choosing fabrics, careful measuring and a refined finish for homes that deserve more than high-street guesswork.',
        ctaPrimary: 'Request a home visit',
        ctaSecondary: 'Ask about your windows',
        hero: FB + 'bay-window-curtains-champagne-01.webp',
        heroAlt: 'Made-to-measure champagne curtains fitted around an elegant bay window'
      },
      b: {
        label: 'Option B',
        dir: 'option-b-friendly-local',
        title: 'Trusted Local Specialist',
        tagline: 'Handmade curtains & blinds for local homes',
        recommended: false,
        heroTitle: 'Handmade curtains and blinds for local homes.',
        heroSub: 'Friendly advice, careful measuring and tidy fitting from a local specialist who sees the job through properly.',
        ctaPrimary: 'Request a home visit',
        ctaSecondary: 'Call Simone',
        hero: FB + 'bay-window-curtains-blue-living-01.webp',
        heroAlt: 'Blue made-to-measure curtains framing a bay window in a homely living room'
      },
      c: {
        label: 'Option C',
        dir: 'option-c-trade-property-partner',
        title: 'Trade & Property Partner',
        tagline: 'A made-to-measure partner for designers & property professionals',
        recommended: false,
        heroTitle: 'A reliable window-dressing partner for designers and property professionals.',
        heroSub: 'Made-to-measure curtains and blinds, handled with care, communication and discretion, so your project looks finished and your client feels looked after.',
        ctaPrimary: 'Discuss a trade project',
        ctaSecondary: 'Send project details',
        hero: FB + 'bedroom-french-doors-neutral-garden-01.webp',
        heroAlt: 'Neutral made-to-measure curtains dressing French doors onto a garden, giving a clean, finished room'
      }
    },

    /* ---- Services (all confirmed: curtains, blinds,
            shutters, soft furnishings) ---- */
    services: [
      {
        name: 'Made-to-measure curtains',
        blurb: 'Handmade, lined or interlined, in your choice of fabric and heading style.',
        detail: 'Personal guidance on fabrics, finishes and headings, so your curtains feel right for the room.',
        img: WORK + 'bay-curtains-plum-sheers-01.webp',
        alt: 'Plum pinch-pleat curtains and sheers dressing a wide bay window'
      },
      {
        name: 'Blinds',
        blurb: 'Roman, roller, Venetian and wooden blinds, measured and fitted to suit each window.',
        detail: 'Careful made-to-measure fitting, so every blind sits exactly as it should, with no gaps.',
        img: WORK + 'nursery-blackout-roller-curtains-01.webp',
        alt: 'Blackout roller blinds layered with curtains in a nursery'
      },
      {
        name: 'Shutters',
        blurb: 'Made-to-measure shutters for a clean, timeless finish.',
        detail: 'Plantation, full-height or café-style shutters, measured and fitted for a neat, durable look.',
        img: UNS_SHUTTERS,  // Illustrative stock placeholder — no photo of Simone's own shutter work yet; replace before live
        alt: 'Made-to-measure plantation shutters (illustrative stock image)'
      },
      {
        name: 'Soft furnishings',
        blurb: 'Cushions, valances, bed runners, pelmets and tie-backs to finish the look.',
        detail: 'The finishing touches that pull a scheme together, made to match your curtains and blinds.',
        img: WORK + 'kids-valance-detail-01.webp',
        alt: 'Handmade fitted bed valance matching the room’s curtains'
      },
      {
        name: 'Measuring & fitting',
        blurb: 'A full measure-and-fit service, so it’s right first time.',
        detail: 'Bays, angled reveals and tricky openings handled with care.',
        img: WORK + 'bedroom-pinch-pleat-garden-01.webp',
        alt: 'Pinch-pleat curtains on an antique-brass pole, measured and fitted around a cottage window'
      },
      {
        name: 'Fabric & design advice',
        blurb: 'Guidance on what suits your room, light and budget.',
        detail: 'Honest, no-pressure advice. You are guided, not sold to.',
        img: WORK + 'kids-curtains-monkey-wall-01.webp',
        alt: 'Handmade curtains in a playful printed fabric chosen with the family'
      }
    ],

    /* ---- Process / how it works ---- */
    // Inline SVG icons (shared assets). stroke="currentColor" so each option's
    // accent colour flows through from .v-step__num. Scalable, theme-aware.
    process: [
      { step: 'Visit & advice',
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11 12 4l8 7"/><path d="M6 9.5V20h12V9.5"/><path d="M10 20v-5h4v5"/></svg>',
        body: 'We come to you, look at your windows and help you choose fabrics and styles that suit the room.' },
      { step: 'Measure',
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="8" rx="1.5"/><path d="M7 8v3.5M11 8v4.5M15 8v3.5M19 8v3"/></svg>',
        body: 'Careful made-to-measure measuring, including bays and awkward openings.' },
      { step: 'Make',
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="2.4"/><circle cx="6" cy="18" r="2.4"/><path d="M8 7.6 20 18M8 16.4 20 6"/></svg>',
        body: 'Your curtains and blinds are made by hand.' },
      { step: 'Fit',
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 5h19"/><path d="M5 5c0 6-1 9-2 14M9 5c0 6 1 9 2 14M15 5c0 6-1 9-2 14M19 5c0 6 1 9 2 14"/></svg>',
        body: 'We fit everything neatly and tidily, and leave your home as we found it.' }
    ],

    /* ---- Why choose ---- */
    whyChoose: [
      'Personal service from one person who sees the job through, start to finish.',
      'Handmade, hand-finished quality, not flat-pack or one-size-fits-all.',
      'Honest, no-pressure advice on fabrics, finishes and budget.',
      'A local, personal alternative to a faceless national chain.',
      'Comfortable with awkward windows: bays, angles, large or period openings.',
      'Tidy, respectful work in your home.'
    ],

    /* ---- IMAGE MANIFEST ----
       WORK = Simone's own recent installation photos (July 2026,
       supplied via WhatsApp; curated + converted in assets/work/).
       A handful of the strongest older Facebook photos are kept;
       the rest of the FB set is retired from the site.
       The office photos/video are real commercial installations by
       Simone — client, location and scope still to be confirmed
       with her before naming anything publicly. ---- */
    photos: [
      // — Recent work (Simone's own photos) —
      { src: WORK + 'living-sheers-curtains-wide-01.webp', alt: 'Full-width taupe pinch-pleat curtains and white sheers across a living-room window wall', category: 'living room', use: 'hero' },
      { src: WORK + 'living-sheers-curtains-tall-01.webp', alt: 'Taupe pinch-pleat curtains layered over sheers beside a TV corner', category: 'living room', use: 'gallery' },
      { src: WORK + 'bedroom-pinch-pleat-garden-01.webp', alt: 'Pale pinch-pleat curtains on an antique-brass pole framing a cottage window and garden view', category: 'bedroom', use: 'hero' },
      { src: WORK + 'nursery-blackout-roller-curtains-01.webp', alt: 'Nursery with blackout roller blinds and pinch-pleat curtains across two windows', category: 'blinds', use: 'gallery' },
      { src: WORK + 'bedroom-blackout-roller-curtains-01.webp', alt: 'Blackout roller blind paired with pinch-pleat curtains on a brass pole', category: 'blinds', use: 'gallery' },
      { src: WORK + 'bay-curtains-evening-01.webp', alt: 'Aubergine curtains drawn across a bay window in a warmly lit evening living room', category: 'bay windows', use: 'gallery' },
      { src: WORK + 'bay-curtains-plum-sheers-01.webp', alt: 'Plum pinch-pleat curtains and white sheers dressing a wide bay window with two armchairs', category: 'bay windows', use: 'hero' },
      { src: WORK + 'roman-blind-scallop-bathroom-01.webp', alt: 'Patterned roller blind finished with a scalloped, trimmed valance over a bathroom window', category: 'blinds', use: 'gallery' },
      { src: WORK + 'kids-curtains-bed-set-01.webp', alt: 'Child\'s bedroom with matching handmade curtains, bed runner and cushion', category: 'soft furnishings', use: 'gallery' },
      { src: WORK + 'kids-valance-detail-01.webp', alt: 'Handmade fitted bed valance in a monkey-print fabric', category: 'soft furnishings', use: 'gallery' },
      { src: WORK + 'kids-curtains-monkey-wall-01.webp', alt: 'Wall-to-wall handmade pinch-pleat curtains in a monkey-print fabric', category: 'bedroom', use: 'gallery' },
      { src: WORK + 'office-roller-meeting-room-01.webp', alt: 'Grey roller blind fitted in a meeting room with a flip chart and green chair', category: 'commercial', use: 'hero' },
      { src: WORK + 'office-roller-blinds-waiting-area-01.webp', alt: 'Grey roller blinds fitted in an office waiting area with green sofas', category: 'commercial', use: 'gallery' },
      // — Strongest of the older Facebook set (draft-only until Simone confirms) —
      { src: FB + 'bay-window-curtains-champagne-01.webp', alt: 'Made-to-measure champagne curtains fitted around an elegant bay window', category: 'bay windows', use: 'hero' },
      { src: FB + 'dining-room-curtains-cream-chandelier-01.webp', alt: 'Cream dining-room curtains beneath a chandelier', category: 'dining', use: 'gallery' },
      { src: FB + 'bay-window-pinch-pleat-grey-lamp-01.webp', alt: 'Grey pinch-pleat curtains framing a bay window beside a lamp', category: 'bay windows', use: 'gallery' },
      { src: FB + 'pinch-pleat-curtain-cream-panel-01.webp', alt: 'Hand-finished cream pinch-pleat curtain panel', category: 'detail', use: 'gallery' }
    ],

    // Client-facing gallery intro.
    galleryNote: 'Recent made-to-measure curtains and blinds, photographed in the homes and workplaces they were fitted in.',

    /* ---- Gallery selections per page ---- */
    galleries: {
      // Homepage — recent work, mostly domestic with one commercial.
      home: [
        { src: WORK + 'bay-curtains-plum-sheers-01.webp', caption: 'A wide bay dressed in plum, with sheers behind' },
        { src: WORK + 'bedroom-pinch-pleat-garden-01.webp', caption: 'Pinch-pleat curtains on an antique-brass pole, hung to frame the garden' },
        { src: WORK + 'living-sheers-curtains-wide-01.webp', caption: 'Sheers for daytime softness, curtains for the evening', pos: '70% 35%' },
        { src: WORK + 'kids-curtains-monkey-wall-01.webp', caption: 'Handmade curtains in a fabric chosen with the family' },
        { src: FB + 'dining-room-curtains-cream-chandelier-01.webp', caption: 'A dining room dressed in cream' },
        { src: WORK + 'office-roller-meeting-room-01.webp', caption: 'Roller blinds fitted for a London workplace' }
      ],
      // Curtains page.
      curtains: [
        { src: WORK + 'bay-curtains-plum-sheers-01.webp', caption: 'Plum pinch pleats and sheers across a wide bay' },
        { src: WORK + 'bedroom-pinch-pleat-garden-01.webp', caption: 'Pale pinch pleats on an antique-brass pole' },
        { src: WORK + 'living-sheers-curtains-wide-01.webp', caption: 'A full window wall: sheers layered under curtains' },
        { src: WORK + 'living-sheers-curtains-tall-01.webp', caption: 'The same room, floor to ceiling' },
        { src: WORK + 'kids-curtains-monkey-wall-01.webp', caption: 'Wall-to-wall handmade curtains in a playful print' },
        { src: WORK + 'bay-curtains-evening-01.webp', caption: 'The bay at night, curtains drawn and room finished', pos: '50% 42%' },
        { src: FB + 'bay-window-curtains-champagne-01.webp', caption: 'Champagne curtains around an elegant bay' },
        { src: FB + 'bay-window-pinch-pleat-grey-lamp-01.webp', caption: 'Grey pinch pleats framing a bay window' },
        { src: FB + 'pinch-pleat-curtain-cream-panel-01.webp', caption: 'A hand-finished pinch-pleat panel, up close' }
      ],
      // Blinds page — real blind installations only.
      blinds: [
        { src: WORK + 'nursery-blackout-roller-curtains-01.webp', caption: 'Blackout rollers layered with curtains in a nursery', pos: '15% 45%' },
        { src: WORK + 'bedroom-blackout-roller-curtains-01.webp', caption: 'A blackout roller behind pinch-pleat curtains', pos: '88% 50%' },
        { src: WORK + 'roman-blind-scallop-bathroom-01.webp', caption: 'A patterned blind finished with a scalloped, trimmed edge', pos: '50% 18%' },
        { src: WORK + 'office-roller-meeting-room-01.webp', caption: 'Roller blind in a meeting room' },
        { src: WORK + 'office-roller-blinds-waiting-area-01.webp', caption: 'Roller blinds in an office waiting area' }
      ],
      // Soft furnishings mini-set.
      soft: [
        { src: WORK + 'kids-curtains-bed-set-01.webp', caption: 'Curtains, bed runner and cushion, made to match' },
        { src: WORK + 'kids-valance-detail-01.webp', caption: 'A handmade fitted valance' },
        { src: WORK + 'roman-blind-scallop-bathroom-01.webp', caption: 'Scalloped, trimmed finishing on a blind', pos: '50% 18%' }
      ],
      // Projects page — homes. (The strongest six of these images now lead
      // as full story rows on projects.html — see the w-row markup there;
      // this list is the supporting archive grid of the rest.)
      projectsHomes: [
        { src: WORK + 'bedroom-pinch-pleat-garden-01.webp', caption: 'Bedroom curtains on an antique-brass pole' },
        { src: WORK + 'nursery-blackout-roller-curtains-01.webp', caption: 'Nursery blackout blinds and curtains', pos: '15% 45%' },
        { src: WORK + 'bedroom-blackout-roller-curtains-01.webp', caption: 'A blackout roller behind pinch-pleat curtains', pos: '88% 50%' },
        { src: WORK + 'roman-blind-scallop-bathroom-01.webp', caption: 'A scallop-edged blind for a bathroom', pos: '50% 18%' },
        { src: WORK + 'living-sheers-curtains-tall-01.webp', caption: 'The same room, floor to ceiling' },
        { src: FB + 'bay-window-curtains-champagne-01.webp', caption: 'Champagne curtains around an elegant bay' },
        { src: FB + 'dining-room-curtains-cream-chandelier-01.webp', caption: 'A cream dining room beneath a chandelier' },
        { src: FB + 'bay-window-pinch-pleat-grey-lamp-01.webp', caption: 'Grey pinch pleats framing a bay' },
        { src: FB + 'pinch-pleat-curtain-cream-panel-01.webp', caption: 'Hand-finished pleating, up close' }
      ],
      // Projects page — workplaces (real commercial installations).
      projectsWork: [
        { src: WORK + 'office-roller-meeting-room-01.webp', caption: 'Roller blind fitted in a meeting room' },
        { src: WORK + 'office-roller-blinds-waiting-area-01.webp', caption: 'Roller blinds across an office waiting area' }
      ]
    },

    /* ---- Quote / enquiry form (homeowner — A & B) ---- */
    form: {
      intro: 'Tell us a little about your windows and what you have in mind, and we’ll arrange a home visit to talk it through. No obligation, just honest advice.',
      privacy: 'No spam and no mailing lists. Your details are only used to reply to your enquiry.',
      // The old wording here carried an internal note about the phone
      // and email still needing confirmation. It was never visible while
      // contact.html held its own shorter copy, and it became visible the
      // moment the baker started writing these bindings into the HTML.
      // A visitor-facing privacy line is not the place to tell people the
      // number might be wrong; the WhatsApp number was confirmed on
      // 15 Aug 2026 and the note has served its purpose.
      fields: [
        { id: 'name', label: 'Your name', type: 'text', autocomplete: 'name', placeholder: 'Jane Smith' },
        { id: 'contact', label: 'Phone or email', type: 'text', autocomplete: 'tel', placeholder: 'So we can get back to you' },
        { id: 'postcode', label: 'Area or postcode', type: 'text', autocomplete: 'postal-code', placeholder: 'So we know it’s in our area' },
        { id: 'rooms', label: 'Rooms / windows', type: 'text', optional: true, placeholder: 'e.g. bay window in the lounge + two bedrooms' },
        { id: 'idea', label: 'What you have in mind', type: 'textarea', optional: true, placeholder: 'A rough idea is fine: curtains, blinds, fabrics you like…' },
        { id: 'besttime', label: 'Best time for a visit', type: 'text', optional: true, placeholder: 'e.g. weekday evenings, weekends' },
        { id: 'referral', label: 'Referred by someone?', type: 'text', optional: true, placeholder: 'Tell us who introduced you, so Simone can thank them' }
      ],
      // Trade enquiry (Option C)
      tradeIntro: 'Tell us about the project and how you’d like to work together. We’ll come back to you to talk through timings and the right approach.',
      tradeFields: [
        { id: 'name', label: 'Your name', type: 'text', autocomplete: 'name', placeholder: 'Jane Smith' },
        { id: 'company', label: 'Company / practice', type: 'text', placeholder: 'Studio, agency or company name' },
        { id: 'role', label: 'Your role', type: 'text', placeholder: 'e.g. interior designer, lettings manager, developer' },
        { id: 'contact', label: 'Phone or email', type: 'text', autocomplete: 'email', placeholder: 'So we can get back to you' },
        { id: 'area', label: 'Project area / postcode', type: 'text', autocomplete: 'postal-code', placeholder: 'Where is the project?' },
        { id: 'project', label: 'Project details', type: 'textarea', placeholder: 'Type of project, number of windows or rooms, and any timescale. A rough idea is fine.' },
        { id: 'timescale', label: 'Rough timescale', type: 'text', placeholder: 'e.g. needed for a move-in date, or flexible' }
      ]
    },

    /* ---- About Simone (placeholder) ---- */
    about: {
      heading: 'About Simone',
      // INTERIM COPY — built only from details already confirmed elsewhere in
      // this file (services, London coverage, measure-and-fit process). It makes
      // no claim about years trading, team size, accreditations or guarantees.
      // Still to be replaced with Simone's own words: see questionsForSimone.
      body: 'Very Well Hung is Simone. She visits your home, helps you choose the fabrics, headings and styles that suit the room, measures every window herself, and fits the finished result with care. Handmade made-to-measure curtains, blinds, shutters and soft furnishings, for homes and workplaces across London.',

      /* ---- Portrait slot ----
         THE ONLY THING TO CHANGE WHEN SIMONE'S PHOTO ARRIVES. Drop the
         file into assets/work/ and set src + alt below. Every "meet
         Simone" block on the site then switches from the single-column
         editorial layout to a portrait-led two-column split, on its own.
         While src is empty the pages are designed to read as finished
         rather than as waiting for an image — no placeholder tile, no
         stand-in photo of a blind standing in for her face. */
      portrait: {
        src: '',
        alt: ''
      }
    },

    /* ---- BNI / local trust line ---- */
    trust: {
      bni: 'Locally recommended through BNI Fortune.',
      line: 'Handmade made-to-measure curtains and blinds for homes across London.'
    },

    /* ---- Testimonials ----
       Real client quotes only. Empty at launch: Simone has no public
       reviews found, and none are invented here (see questionsForSimone,
       "Any real reviews or written testimonials she is happy to use").
       Fill each entry in only when Simone supplies a quote she is happy
       to have published, in her client's own words.
       Shape: { quote: '', name: '', area: '', context: '' }
       context example: 'Living-room curtains, Stanmore'.
       The section on index.html stays hidden while this is empty, and
       no Review or AggregateRating schema is added until it is not. */
    /* Sitewide client quotes, from the same Google Business Profile as
       office.reviews and quoted to the same rule: verbatim, spelling
       included, nothing invented. The homepage block that reads this
       has been sitting hidden behind [data-vwh-optional] since launch
       waiting for exactly this.

       Only the complete reviews are here. The two Google truncates
       behind "… More" stay on the office page, where the section links
       straight to the profile; a homepage trust block is the wrong
       place for a quote that stops mid-thought. */
    testimonials: [
      { quote: 'Amazing attention to detail from 1st contact to finish. Couldn\u2019t be happier', name: 'Grant Scott', context: 'Google review, July 2026' },
      { quote: 'Great service and blinds Simone was very helpful love the blinds thanks so much', name: 'Robert Lyons', context: 'Google review, August 2026' },
      { quote: 'Great service from start to finish the curtains complete the room.', verbatim: 'Great service from start to finish the curtains conplete the room.', name: 'John Rafferty', context: 'Google review, July 2026' }
    ],

    /* ---- Trade & Property Partner content (Option C) ---- */
    tradeWhoFor: [
      { name: 'Interior designers', line: 'Window dressings that match the scheme and the standard your clients expect.' },
      { name: 'Estate agents', line: 'Tidy, well-presented windows that help a property show at its best.' },
      { name: 'Landlords', line: 'Practical, durable curtains and blinds between tenancies. [APPROACH TO CONFIRM]' },
      { name: 'Property developers', line: 'Consistent made-to-measure finishing across a project. [CAPACITY TO CONFIRM]' },
      { name: 'Show-home & property stylists', line: 'A finished, photograph-ready look for staging and show homes.' }
    ],
    tradeWhy: [
      'Reliable communication, from first measure to final fit.',
      'Careful, accurate measuring, with no gaps and no surprises.',
      'Tidy, discreet fitting that respects the client’s home or property.',
      'Makes the room, and the referrer, look good.'
    ],
    tradeProjects: [
      { name: 'Renovations', line: 'Finishing the windows once the work is done.' },
      { name: 'Move-ins', line: 'Curtains and blinds ready for a new home.' },
      { name: 'Rental refreshes', line: 'Smart, durable dressings between tenancies.' },
      { name: 'Show homes', line: 'A polished, photograph-ready finish.' },
      { name: 'Staged properties', line: 'Helping a property present and sell.' }
    ],
    tradeConfirm: [
      'Lead times [TO CONFIRM]',
      'Capacity for repeat or volume work [TO CONFIRM]',
      'Trade pricing [TO CONFIRM]',
      'Service radius [TO CONFIRM]',
      'Whether Simone wants ongoing trade work [TO CONFIRM]'
    ],

    /* ---- Questions for Simone (chooser + Option A) ---- */
    questionsForSimone: [
      'Real photos of her own shutters and soft furnishings (to replace the illustrative stock images)',
      'Service area and lead times, for homes and for commercial work',
      'Any real reviews or written testimonials she is happy to use',
      'Any office or commercial jobs already completed that can be photographed and written up as case studies',
      'Which commercial systems and fabrics she can supply (solar-control, fire-retardant, motorisation) and through whom',
      'Whether she is comfortable being positioned with “a growing specialism in office blinds” at BNI',
      'Which fabric houses and hardware suppliers she buys from. Named supplier logos are a big credibility win once confirmed',
      'How many years she has been making curtains and blinds. A heritage line ("XX years of handmade curtains") is strong trust copy once confirmed',
      'Business hours she wants published, if any, and the response time she is comfortable promising'
    ],

    /* ---- FAQs (questions from competitor objections; answers to confirm) ---- */
    faqs: [
      { q: 'Do you measure and fit, or just supply?', a: 'A full measure-and-fit service, so it’s right first time. [CONFIRM]' },
      { q: 'Will you help me choose the right fabric?', a: 'Yes. Guided advice on fabrics, finishes and headings to suit your room, light and budget.' },
      { q: 'Can you handle bay windows and awkward shapes?', a: 'Yes. Bays, angled reveals and tricky openings are handled with care.' },
      { q: 'How does made-to-measure compare to the high street?', a: 'A personal, handmade alternative to the chains, with honest advice. [PRICING STANCE TO CONFIRM]' },
      { q: 'How long does it take from visit to fitting?', a: '[LEAD TIME TO CONFIRM] from first visit to final fitting.' },
      { q: 'What areas do you cover?', a: 'London. Specific boroughs and postcodes to confirm.' },
      { q: 'What happens if something needs adjusting after fitting?', a: '[AFTERCARE TO CONFIRM].' },
      { q: 'Do you offer curtains, blinds, shutters and soft furnishings?', a: 'Yes. Handmade curtains, blinds, shutters and soft furnishings, all made to measure.' }
    ],

    /* ---- Chooser cards (client-facing) ---- */
    chooser: {
      intro: 'My instinct is the premium made-to-measure route, because it should attract better-value enquiries. The other two options show the safer local route and the trade/referral route.',
      a: {
        title: 'Premium Made-to-Measure',
        badge: 'Recommended',
        previewLabel: 'Premium homeowner route',
        bestFor: 'Design-conscious homeowners who care about finish, fabric and how the room feels.',
        whyWin: 'Positions Very Well Hung away from price-led blind enquiries and towards higher-value handmade curtains, careful fitting and quality-led work.',
        watchOut: 'Needs strong real portfolio photography. Premium positioning falls flat if the visuals are thin.',
        cta: 'View premium concept'
      },
      b: {
        title: 'Trusted Local Specialist',
        badge: '',
        previewLabel: 'Safe local route',
        bestFor: 'Homeowners who want a friendly local person to help them choose, measure and fit properly.',
        whyWin: 'Low-risk and easy to refer. Leads on personal service, careful measuring, tidy fitting and honest advice.',
        watchOut: 'It may bring more of the same work, rather than shifting the business towards higher-value projects.',
        cta: 'View local concept'
      },
      c: {
        title: 'Trade & Property Partner',
        badge: '',
        previewLabel: 'Trade/referral route',
        bestFor: 'Interior designers, estate agents, landlords, developers and property professionals.',
        whyWin: 'Turns BNI and referral relationships into repeat work by positioning Simone as the reliable window-dressing partner who makes the referrer look good.',
        watchOut: 'Only works if Simone wants trade work and can confidently promise capacity, lead times and communication.',
        cta: 'View trade concept'
      }
    },

    /* ---- Homepage (broad, Simone-led, two visitor paths) ----
       Weighting per strategy: ~65% domestic reassurance,
       ~35% commercial aspiration. The office page is 100% commercial. */
    home: {
      // Display type only works with short copy. The full sentence this
      // was cut from still runs as the page's meta description.
      heroTitle: 'Beautifully fitted, personally recommended.',
      heroSub: 'Curtains, blinds and shutters, measured, made and installed by Simone, for homes that deserve better than guesswork and workplaces that need their windows to work.',
      pathHome: {
        name: 'For your home',
        line: 'Made-to-measure window treatments with personal advice and professional fitting.',
        cta: 'Explore home services'
      },
      pathWork: {
        name: 'For your workplace',
        line: 'Commercial blinds that solve glare, privacy, heat and presentation problems.',
        cta: 'See office blinds'
      }
    },

    /* ---- Referral panel (BNI journey) ---- */
    referral: {
      heading: 'Been referred to Simone?',
      // Short form for the homepage closing band, where the full panel
      // copy below would repeat the sentence it sits next to.
      line: 'Been referred by someone? Say who, and Simone will pick it up from there.',
      body: 'Tell us who introduced you and what you need help with. Simone will personally review your enquiry and arrange the next step.'
    },

    // BNI one-line referral sentence (per strategy: do not claim
    // "the office blinds specialist" until the proof exists).
    bniSentence: 'Simone helps homeowners and businesses choose and fit the right window coverings, with a growing specialism in office blinds.',

    /* ---- Office blinds (commercial acquisition page) ----
       100% commercial, and the site's one authority asset.

       PUBLISH POSTURE (SIMONE-OFFICE-INTERVIEW-ANSWERED.md, Aug 2026):
       ship a strong first version now, send Simone the live URL, and
       replace assumptions with her first-party detail as she responds.
       Reasonable assumptions are allowed where being slightly wrong is
       cheap. Regulated, contractual or objectively checkable claims are
       NOT — see the hold list below.

       THREE KINDS OF CONTENT LIVE HERE:

       1. INDUSTRY FACT — glare and contrast, solar gain, openness
          factors, blackout light leak, linked blinds on wide runs,
          BS 5867 Part 2 as an industry concept, price drivers. True
          regardless of who fits them. Written freely, and the reason
          the page is useful enough to rank.
          The line that must not be crossed: discussing a concept is
          fine, claiming Very Well Hung supplies it is not.

       2. CONSERVATIVE ASSUMPTION — the case-study narrative, coverage
          areas, "many years" of experience, owner-led service. Broad
          enough to be safe, specific enough to be useful. Simone
          corrects these against the live page.

       3. HELD UNTIL CONFIRMED — anything a commercial buyer could rely
          on: fire-rated fabric supply and test certificates, BS 5867
          certification as a capability, motorisation (battery or
          hard-wired) as a product offer, electrical work, guaranteed
          out-of-hours installation, supplier warranties, maximum blind
          widths, RAMS/CHAS/SafeContractor/DBS, insurance levels, VAT
          and payment terms, whether Simone personally measures and fits
          every blind, and any project count, location or dimension that
          has not been confirmed. None of these appear as claims.

       Empty strings and empty arrays render as nothing (vwh.js skips
       them and hides the section), so held content leaves no hole.
       Photos and video in assets/work/office-* are genuinely hers. */
    office: {
      heroKicker: 'Survey · Specification · Installation',
      heroTitle: 'Office Blinds in London',
      // NOT "measured and fitted by Simone" — whether she personally
      // measures and fits every job is unconfirmed. Owner-led is safe.
      heroLine: 'Surveyed, specified and personally managed by Simone.',
      heroSub: 'Screen glare across the desks, a south elevation the air-conditioning can’t win against, meeting rooms with no privacy, blinds that make the office look tired to visiting clients. Simone looks at London and Hertfordshire workplaces and recommends the right blind and fabric for how each room is actually used, then manages the project through to installation.',
      /* The primary ask is a photo, not a visit. An office manager
         who is only half sure the glare is worth doing anything
         about will not book a stranger into the building, but they
         will send a picture of the window from their desk. The
         survey is still there as the second button for the people
         who are already decided. */
      ctaPrimary: 'Send Simone a photo of the window',
      ctaSecondary: 'Book an office blind survey',
      whatsappLead: 'Free, no obligation. Photograph the window, add your postcode, and Simone will tell you what she would specify and roughly what it involves.',
      trustStrip: [
        { strong: 'From around £150', span: 'Per window, supplied and fitted' },
        { strong: 'Free site survey', span: 'No obligation to proceed' },
        { strong: 'Specified, not sold', span: 'Recommendation before quote' },
        { strong: 'Owner-led service', span: 'One point of contact' },
        { strong: 'London & Hertfordshire', span: 'Based in North-West London' }
      ],

      /* ---- Price anchor. PROVISIONAL, and the wording is deliberate.
         The range is set above the £85–£180 domestic/fitted operators
         and inside the £100–£500 commercial quotes, so it reads as
         commercial and slightly premium rather than cheap.

         Note what it does NOT say. Not "most office blinds cost", which
         would be a claim about Simone's book that nobody has checked.
         "As a guide" and "typically fall around" are hedges that survive
         being wrong by fifty pounds. Three numbers from Simone tighten
         this without the page changing shape: her cheapest worthwhile
         job, her normal price per window, and a typical total office job.

         It appears twice, which is the point: once beside the first CTA
         where it stops the bounce, and once in the FAQ where someone
         who scrolled to look for it will go. ---- */
      pricing: {
        kicker: 'Roughly what it costs',
        headline: 'Office blinds from around £150 per window, supplied and fitted.',
        body: 'As a guide, standard office roller blinds typically fall around £150 to £300 per window. Larger windows, specialist fabrics and motorisation cost more.',
        note: 'The exact price is confirmed after the free site survey, priced around the actual specification rather than a per-window estimate.'
      },

      /* ---- The decision table. This is the scannable asset the page
         did not have: 2,900 words of good prose with nothing to grab.

         Each row is a symptom in the reader's words, the thing usually
         specified for it, and the thing people buy instead and regret.
         The third column is what makes it worth reading rather than a
         product grid, and it is the column an answer engine lifts.

         Every row is already argued at length further down the page.
         Nothing here is a new claim. ---- */
      decisionKicker: 'Start here',
      decisionHeading: 'Which blind for which problem.',
      decisionIntro: 'These cover most of what sends an office looking for blinds. The last column is the mistake each problem invites.',
      decisionHead: ['The problem', 'Usually specified', 'The common mistake'],
      decision: [
        {
          problem: 'Sun on the screens',
          spec: 'Solar screen roller, 3–5% openness',
          mistake: 'Blackout. It fixes the screens and puts the lights on at eleven in the morning.',
          href: '#screen-glare'
        },
        {
          problem: 'The south side overheats',
          spec: 'Solar-reflective fabric, on that elevation only',
          mistake: 'Doing the whole floor. One or two elevations usually account for all of it.',
          href: '#overheating'
        },
        {
          problem: 'Glass meeting rooms with no privacy',
          spec: 'A blind that opens again, on the partition',
          mistake: 'Frosted film. Privacy in a meeting room is needed for an hour, not permanently.',
          href: '#meeting-room-privacy'
        },
        {
          problem: 'The room has to go properly dark',
          spec: 'Dim-out fitted close, or channels if it truly must',
          mistake: 'Buying blackout fabric alone. The halo down the sides is what washes the image out.',
          href: '#blackout'
        }
      ],

      /* ---- Quick answers. The first thing on the page after the hero,
         and deliberately the least salesy thing on it.

         Each entry leads with the direct answer in `short` and only
         then qualifies it, because that is the shape a featured
         snippet or an AI assistant extracts: a self-contained answer
         that survives being read aloud with no page around it. Three
         of the four talk the reader OUT of the expensive option,
         which is the point. Someone deciding whether this is worth a
         phone call is not persuaded by a claim, they are persuaded by
         being told the truth before they have paid for it. ---- */
      quickKicker: 'Quick answers',
      quickHeading: 'The short version, before the detail.',
      quickAnswers: [
        {
          q: 'Which office blinds stop glare on computer screens?',
          short: 'Usually a solar screen roller blind, not a blackout one.',
          a: 'Screen fabrics are woven to a stated openness factor, roughly 1% to 10%. A lower number cuts more glare and gives more privacy, and lets you see out less. Darkening the room instead fixes the screens and puts the lights on at eleven in the morning.',
          href: '#screen-glare',
          more: 'Why glare is a contrast problem'
        },
        {
          q: 'Do office blinds actually reduce heat?',
          short: 'Yes, but an internal blind cannot match external shading.',
          a: 'By the time the sun reaches the fabric it is already through the glass. A solar-reflective fabric rejects a meaningful share of it back out, and the figures are published for the glass-and-blind combination. Usually only one or two elevations are worth specifying it on.',
          href: '#overheating',
          more: 'What solar gain does to an office'
        },
        {
          q: 'Do we need blackout blinds for the meeting room?',
          short: 'Probably not.',
          a: 'Genuine darkness needs side channels and a cassette as well as the fabric, and the cost gap is large. Modern laser projectors and flat panels tolerate far more ambient light than the equipment of ten years ago, so a good dim-out fitted close is frequently the right answer, and a better room to sit in for two hours.',
          href: '#blackout',
          more: 'Dim-out against genuine blackout'
        },
        {
          q: 'Does the whole office have to be done at once?',
          short: 'No.',
          a: 'Where the existing brackets and tubes are a current system in good condition, replacing fabric on the failed blinds alone can be realistic. Matching across a run is the harder problem, because dye lots shift and UV has already moved the old blinds. It is a judgement worth making room by room rather than across a whole floor.',
          href: '#damaged-dated-blinds',
          more: 'When a partial replacement shows'
        }
      ],

      /* ---- Problem-led depth. The SEO body of the page: real answers
         to the questions people actually search, each ending in what
         the survey establishes. Industry fact throughout — no sentence
         here claims a Very Well Hung capability.

         The three outbound links in this block and the FAQs below go
         to the trade body, the regulator and the standard: BBSA, HSE
         and BSI. They are written as [label](url) and turned into
         anchors by assets/shared/render.js. None of them implies a
         Very Well Hung membership, accreditation or capability, and
         they must not be edited into one. ---- */
      problemsHeading: 'Start with the problem, not the product.',
      problemsIntro: 'Five or six things send a business looking for office blinds. They need different answers, and the wrong specification solves one while creating another.',
      problems: [
        {
          id: 'screen-glare',
          name: 'Screen glare',
          question: 'What are the best office blinds for computer screen glare?',
          body: [
            'Glare is a contrast problem rather than a brightness one, which is why the instinctive fix of darkening the room so often makes the office worse without making the screens much better. The usual answer is a roller blind in a solar screen fabric, chosen at an openness factor that suits the aspect.',
            'How hard that fabric has to work varies more than most people expect. An east or west elevation has a sharp problem for an hour at each end of the day, a south elevation has a longer one that travels across the floorplate, and a north elevation frequently needs nothing at all.'
          ],
          href: '/screen-glare-office-blinds-london',
          more: 'The full guide to screen glare',
          survey: []
        },
        {
          id: 'overheating',
          name: 'Overheating and solar gain',
          question: 'Do office blinds actually reduce heat?',
          body: [
            'Solar gain through glass is the largest summer heat load in most London offices, and the cooling fights it every hour at the tenant\u2019s expense. An internal blind cannot match external shading, because the energy is already through the glass by the time it reaches the fabric, but a solar-reflective fabric rejects a meaningful share of it back out before the room absorbs it.',
            'It is rarely a whole-building problem. One or two elevations usually account for all of it, and putting the reflective fabric only where it earns its place costs a fraction of doing a floor.'
          ],
          href: '/office-overheating-blinds-london',
          more: 'The full guide to office overheating',
          survey: []
        },
        {
          id: 'meeting-room-privacy',
          name: 'Meeting and conference room privacy',
          question: 'What blinds work for glass-partitioned meeting and conference rooms?',
          body: [
            'Workplace privacy is almost always intermittent, whether the room is called a meeting room, a conference room or the boardroom. It needs to be open and visible for most of the week and closed for the hour that matters, which points to something quick and repeatable to operate rather than something permanently opaque, and is why applied film so often disappoints.',
            'Internal partitions and street-facing ground floors are different problems with different answers. Door swings and partition head details usually decide more of the specification than any preference about fabric does.'
          ],
          href: '/meeting-room-privacy-blinds-london',
          more: 'The full guide to meeting-room privacy',
          survey: []
        },
        {
          id: 'blackout',
          name: 'Blackout and presentation rooms',
          question: 'Can you get genuine blackout in an office?',
          body: [
            'Genuine darkness is a fitting problem more than a fabric problem. Any blackout fabric blocks light through its face. What you see in a badly specified room is the halo: light down both sides of the blind, over the top of the roller, and under the bottom bar. In a training or screening room that halo is the difference between a projected image that holds contrast and one that washes out.',
            'Getting there means side channels or a properly deep recess fit, a pelmet or cassette closing the gap at the head, and a decision about what happens at the sill. Each of those adds cost, so it is worth being honest about how dark the room actually needs to be.',
            'Often it does not need to be dark at all. Modern laser projectors and large flat panels tolerate far more ambient light than the equipment of ten years ago. A good dim-out, fitted close, is frequently the right answer at a fraction of the cost and complexity of a fully channelled blackout, and it is a better room to sit in for two hours.'
          ],
          surveyLead: 'What the survey establishes',
          survey: [
            'Whether the room projects, or simply needs to be dim',
            'Recess depth, and whether channels can be fitted without fouling the reveal',
            'What the head fixing goes into, and whether a pelmet already exists',
            'Handles, vents and trickle vents that break the seal at the edges'
          ]
        },
        {
          id: 'large-awkward-glazing',
          name: 'Large, high and awkward glazing',
          question: 'What makes a large or high office window difficult?',
          body: [
            'Three things put a window outside the standard range: width beyond what a single roller tube carries without deflecting, height beyond safe hand reach, and an opening that is not rectangular. Each has a normal solution in the industry, which is why an awkward window is worth surveying rather than writing off.',
            'Very wide openings are generally handled as linked blinds sharing a bracket line, with the joins set on the mullions so the run reads as one. The alternative, a single oversized tube, sags in the middle, and the fabric tracks off to one side within a season.',
            'High glazing is where motorisation gets discussed seriously: a blind nobody can reach is a blind that stays where it was last left, and the access equipment needed to operate one manually has a cost every time it is hired.',
            'Angled, arched and raked glazing needs templating rather than measuring, and an early decision about whether the blind follows the shape or squares it off. Access on the day matters as much as the product: atrium and stairwell glazing may need a tower or podium, and that changes the schedule and the price rather than the specification.'
          ],
          surveyLead: 'What the survey establishes',
          survey: [
            'Overall widths and mullion positions, so joins fall where they disappear',
            'Reach height, and how the blinds would be operated day to day',
            'What is behind the plaster to fix into',
            'What access equipment the installation day would need'
          ]
        },
        {
          id: 'damaged-dated-blinds',
          name: 'Damaged or dated blinds',
          question: 'Does a whole office of blinds have to be replaced at once?',
          body: [
            'Not always. Where existing brackets and tubes are a current, identifiable system in good condition, replacing fabric on the failed blinds alone can be realistic. Where they are an unbranded system from a fit-out ten years ago, the parts have usually gone and replacement is the honest answer. Which applies is a question for the survey rather than the phone.',
            'Matching across a run is the harder problem. The same fabric, same name, same supplier shifts between dye lots, and eight years of UV means the existing blinds have moved anyway. On a client-facing run a partial replacement usually shows. In a back office it usually does not. That is a judgement worth making room by room rather than across a whole floor.'
          ],
          surveyLead: 'What the survey establishes',
          survey: [
            'Whether the existing system is identifiable and still supported',
            'How far the existing fabric has faded, and whether a match is realistic',
            'Which runs are client-facing and which are not',
            'What happens to the blinds being taken down'
          ]
        }
      ],

      /* ---- How the specification is arrived at. The survey checklist
         is the visible form of the expertise — it shows the work rather
         than asserting it. ---- */
      specify: {
        kicker: 'How the recommendation is arrived at',
        heading: 'Every office is different, so the survey comes first.',
        body: 'Most office blind quotes are a price list run against a window schedule. A survey is a different exercise: it establishes what each room is for, what it actually suffers from and what would fix it, which fairly often costs less than the obvious answer. The project can then be quoted around the real specification rather than a generic per-window estimate.',
        checksLead: 'What the survey works through',
        checks: [
          'The aspect of every elevation, and the hours each room is genuinely occupied',
          'Where people sit relative to the glass: desks, screens, and who faces the window',
          'Whether the real problem is glare, heat, privacy, darkness or appearance. They need different answers.',
          'The existing glazing: coatings, tints, opening lights, trickle vents and mullion positions',
          'Recess depth, and what the head fixing goes into',
          'Reach height, and how the blinds would be operated day to day',
          'Whether any existing brackets, tubes or tracks are worth retaining',
          'Any fabric performance the landlord or the fit-out specification calls for',
          'Access on the day: lifts, permits, sign-in, and keeping disruption practical'
        ]
      },

      /* ---- Blind-type comparison. Framed as a GUIDE to the systems
         used in offices, not as a Very Well Hung product list — what
         can be supplied for a given project is established at survey.
         The third column carries the trade-off. ---- */
      compareKicker: 'A guide to office blind systems',
      compareHeading: 'The right system for the job.',
      compareIntro: 'A handful of systems cover almost every office. The differences that matter are in the last column.',
      compare: [
        { type: 'Roller blinds', bestFor: 'Open-plan floors, glare control, clean lines', note: 'The office default, for good reasons: one moving part, a minimal stack at the head, and the widest fabric choice.' },
        { type: 'Solar screen fabric', bestFor: 'Desks facing glass, where the view is worth keeping', note: 'A fabric rather than a system, usually on a roller. Woven to a stated openness factor, typically 1–10%. Lower means less glare and more privacy, but less view.' },
        { type: 'Vertical blinds', bestFor: 'Wide runs and floor-to-ceiling glazing', note: 'Louvres angle to the sun’s position, so light control changes through the day. Replaceable slat by slat, which matters across a large floorplate.' },
        { type: 'Venetian blinds', bestFor: 'Small rooms, kitchens, precise tilt control', note: 'The finest control of any system, and wipeable. Noisy in a draught, and slow to clean across a lot of windows.' },
        { type: 'Blackout & dim-out rollers', bestFor: 'Training, screening and presentation rooms', note: 'Fabric alone gets you dim. Side channels and a cassette get you dark. Decide which the room actually needs, because the gap in cost is large.' },
        { type: 'Motorised blinds', bestFor: 'High or out-of-reach glazing, and whole elevations', note: 'Considered where manual operation would need access equipment, or where an entire elevation should move together.' }
      ],
      // Scalar fields are bound with textContent, so [label](url) link
      // syntax does NOT work here — it only works in fields that go
      // through paras() in render.js (problem bodies, FAQ answers,
      // guidance answers, case-study fields). Keep outbound links in
      // those, so the baked HTML and the runtime render identically.
      compareNote: 'Which of these suits your windows, and what can be supplied for your particular project, is established at the survey.',

      /* ---- Meet Simone. Owner-led service and long experience are safe
         assumptions. A specific number of years is NOT — "many years"
         stands until Simone gives the real figure. Do not upgrade this
         to "Simone personally measures and fits every blind". ---- */
      meet: {
        kicker: 'Who you’ll be dealing with',
        heading: 'Very Well Hung is run by Simone.',
        body: [
          'She is the person you speak to about the windows, the requirements and the specification. There is no call handler, no branch that has to check with head office, and no quote written by someone who has never seen the room. For a business trying to get a decision made rather than a brochure posted, that is most of the value.',
          'Simone has been working with made-to-measure curtains, blinds and window treatments for many years, helping customers choose, measure and fit solutions for their spaces. Most of that work is domestic: bay windows, angled reveals and period openings where a few millimetres show. That is where the measuring discipline comes from. Commercial work is a growing part of what she does, and it suits her: offices have harder problems and clearer briefs.',
          'The business has been built on personal advice, quality window treatments and word-of-mouth recommendation rather than advertising.'
        ],
        linkText: 'More about Simone',
        linkHref: '/about-simone'
      },

      /* ---- Specifying guidance. EDITORIAL, THIRD PERSON, NOT
         attributed to Simone and not presented as her quotations.
         This is the launch stand-in for the first-party "Ask Simone"
         section. When Simone answers, replace this wholesale with her
         own words — those five answers are worth more than another
         twenty generic FAQs:
           1. What mistakes does she see businesses making?
           2. When does she personally prefer roller vs vertical?
           3. How does she handle awkward windows?
           4. What does she tell customers not to spend money on?
           5. What makes one blind last longer than another?     ---- */
      guidanceKicker: 'Choosing office blinds',
      guidanceHeading: 'What to think about before you specify',
      guidance: [
        {
          q: 'What should you consider before choosing office blinds?',
          a: 'Start with the problem the windows need to solve. Appearance matters, but so do glare, privacy, heat, window proportions and how the room is actually used. The right solution for a meeting room may not be the right solution for an open-plan office.'
        },
        {
          q: 'Roller blinds or vertical blinds?',
          a: 'Both can work well in offices. Roller blinds create a clean, simple finish and suit many modern workplaces. Vertical blinds can be particularly useful on larger windows where flexible control of light and privacy matters. The window size, layout and intended look should drive the choice.'
        },
        {
          q: 'What if sunlight is making computer screens difficult to use?',
          a: 'The answer is not automatically to make the room darker. The direction of the windows, the time of day, the intensity of the glare and the need for outward visibility should all be considered before choosing a fabric.'
        },
        {
          q: 'Do office blinds need to be different from domestic blinds?',
          a: [
            'Commercial spaces tend to place more emphasis on durability, on repeatability across multiple windows, on light control, and on how the blinds work with the wider workplace. The specification should reflect how the building is actually used.',
            'Some commercial settings also bring requirements a home never does, from fabric fire performance to cord safety in a school or nursery. The [British Blind and Shutter Association](https://bbsa.org.uk/), the national trade association for the blind and shutter industry, is the reference point for that guidance.'
          ]
        },
        {
          q: 'Are made-to-measure blinds worth it for an office?',
          a: 'Where several windows need to look consistent, accurate measuring and a considered specification make a substantial difference to the finished result. It also avoids trying to force standard sizes onto windows they were not designed for.'
        }
      ],

      /* ---- Featured project. Photos and video are genuinely Simone's.
         The narrative is deliberately non-numeric: no room count, no
         window count, no borough, no named client, and no fabric or
         performance claim that is not visible in the photographs.
         Simone corrects this against the live page. ---- */
      caseStudy: {
        kicker: 'Featured project',
        heading: 'Office blinds for a London workplace',
        intro: 'A real Very Well Hung installation: made-to-measure roller blinds for a London workplace’s meeting room and waiting area, filmed on completion.',
        client: 'London office',
        fields: [
          { label: 'The challenge', body: 'The client wanted to improve the appearance of the office and give the space a more polished, professional finish.' },
          { label: 'The project', body: 'Made-to-measure blinds were supplied for the office windows, with the specification chosen to work with the existing space rather than treating the windows in isolation.' },
          { label: 'The approach', body: 'Simone selected a made-to-measure roller blind solution to improve the look of the workspace while ensuring the blinds suited the proportions and practical requirements of the windows.' },
          { label: 'Installation', body: 'The blinds were measured for the space and fitted on site, with the installation completed as part of the overall office upgrade.' },
          { label: 'The result', body: 'The finished installation gave the office a noticeably smarter, more considered appearance, and helped the windows feel like part of the overall workspace rather than an afterthought.' }
        ],
        // Held: no quote is published until Simone gives us one in her
        // own words. Do not write one for her.
        quote: '',
        quoteAttrib: 'Simone, Very Well Hung',
        note: 'Photographs and video are from this installation. The client has not been named.'
      },

      /* ---- Coverage. Commercial travel is treated separately from the
         domestic radius, and the list is explicitly non-exhaustive.
         Simone confirms the real commercial radius after launch. ---- */
      areas: {
        kicker: 'Where Very Well Hung works',
        heading: 'Office blinds across London and Hertfordshire',
        lead: 'Very Well Hung is based in North-West London and works with businesses across London and Hertfordshire. For larger commercial projects, enquiries from further afield are also welcome.',
        primaryLabel: 'Areas regularly covered, including',
        primary: [
          'Edgware', 'Stanmore', 'Mill Hill', 'Borehamwood', 'Barnet', 'Hendon',
          'Finchley', 'Harrow', 'Bushey', 'Radlett', 'Watford', 'St Albans',
          'Hertford', 'Potters Bar'
        ],
        widerHeading: 'Have a larger project outside these areas?',
        widerBody: 'Get in touch. Larger office and commercial blind projects can be considered further afield across London and Hertfordshire, and beyond.',
        // Kept deliberately: "including", never "only".
        fallback: 'This list is not exhaustive. Commercial projects elsewhere across London and Hertfordshire are welcome.'
      },

      // Three-line entries: { area, product, scope }. EMPTY AT LAUNCH —
      // one entry would look weaker than none, and inventing local
      // examples is not an option. The module stays hidden until Simone
      // identifies real additional jobs. Format when she does:
      //   { area: 'Barnet', product: 'Roller blinds', scope: 'Meeting rooms' }
      recentProjects: [],

      // Compressed from six sector cards — the page should say
      // "Simone knows office blinds", not "we serve every organisation".
      sectorsLine: 'Beyond offices: schools and nurseries, clinics and consulting rooms, salons and hospitality front-of-house, landlords and managing agents refreshing units between tenancies, and workplaces of most other kinds.',

      /* ---- Google reviews. EMPTY UNTIL PASTED IN VERBATIM.
         Simone's Google Business Profile is confirmed (see
         `googleProfile` at the top of this file) and it carries
         reviews, but Google serves them behind a consent wall that
         cannot be read programmatically, so they are not here yet.

         Fill each entry by copying the review text exactly as it
         appears on the profile. Do not tidy the grammar, do not
         shorten to a pull-quote, and do not paraphrase: the schema
         emitted from this array asserts to Google that the text is
         a real review, and a rewritten one makes that assertion
         false. `date` is the review's own date in YYYY-MM-DD.

           { quote: '…', name: 'J. Patel', area: 'Borehamwood',
             rating: 5, date: '2026-03-14' }

         Ratings are only emitted as AggregateRating once there are
         real reviews here, because a self-declared rating with no
         review source breaches Google's guidelines outright. That
         rule has not changed; what has changed is that there is now
         a source to point at. ---- */
      reviewsKicker: 'What clients say',
      reviewsHeading: 'Reviewed on Google.',
      reviewsLinkLabel: 'Read all the reviews on Google',
      reviews: [
        // From the Google Business Profile, 24 Aug 2026. Punctuation
        // and phrasing are the reviewers' own: an edited review is not
        // the review that was left. The single exception is a plain
        // typo, which may be corrected where it changes no meaning, and
        // only with the original recorded in `verbatim` beside it.
        //
        // `partial: true` marks a review Google truncated behind its
        // "… More" control. Those two are quoted here from the complete
        // sentences that were visible, and are deliberately EXCLUDED
        // from the Review schema, because `reviewBody` asserts it is
        // the review and an excerpt is not. Paste the full text and
        // drop the flag and they join the markup.
        //
        // No `rating` on any entry. The stars were not visible in what
        // was supplied, and a rating asserted without having seen it is
        // the one thing in this block that would actually be a
        // guidelines breach. Adding real ratings later switches the
        // AggregateRating node on by itself.
        //
        // Dates are month-precision where Google showed a relative date
        // ("a month ago"). ISO 8601 allows YYYY-MM, so this claims only
        // the precision we have.
        {
          quote: 'Simone Mire of Very Well Hung provides an exceptional service. She has provided curtains and blinds for my house and office.',
          name: 'Simon Miller',
          rating: 5,
          date: '2026-08',
          partial: true
        },
        {
          quote: 'Fantastic service from start to finish, great quality at fair prices, and such a wide range of curtains and blinds. With the recent heatwaves, they’ve proven to be a blessing in repelling the heat from the sun!',
          name: 'David Chernick',
          rating: 5,
          date: '2026-08',
          partial: true
        },
        {
          quote: 'Great service and blinds Simone was very helpful love the blinds thanks so much',
          name: 'Robert Lyons',
          rating: 5,
          date: '2026-08'
        },
        {
          quote: 'Amazing attention to detail from 1st contact to finish. Couldn’t be happier',
          name: 'Grant Scott',
          rating: 5,
          date: '2026-07'
        },
        {
          // "conplete" in the original. Corrected on the page: a typo is
          // not what he meant to say, and leaving it in reads as
          // carelessness on Simone's side rather than on his. `verbatim`
          // keeps the review as it was actually left, so the correction
          // is a recorded decision rather than a silent edit, and so
          // nobody restores the typo later thinking it is a mistake.
          //
          // The bar for touching a quote is: fixes a slip, changes no
          // meaning, one word. Anything past that and the review has to
          // stand as written or come out.
          quote: 'Great service from start to finish the curtains complete the room.',
          verbatim: 'Great service from start to finish the curtains conplete the room.',
          name: 'John Rafferty',
          rating: 5,
          date: '2026-07'
        },
        {
          quote: 'Amazing service',
          name: 'J Stempel',
          rating: 5,
          date: '2026-07'
        }
      ],

      process: [
        { step: 'Survey', body: 'Free, on site, no obligation.' },
        { step: 'Recommendation', body: 'Product, fabric and control, in plain English.' },
        { step: 'Quote', body: 'Priced around the actual specification.' },
        { step: 'Measure', body: 'Every window, plus access planning.' },
        { step: 'Installation', body: 'Scheduled around how the office is used.' },
        { step: 'Aftercare', body: 'Support once the blinds are in.' }
      ],

      /* ---- FAQs. Substantive commercial-intent content. Note the
         framing throughout: the technical answers describe how the
         industry works, and route the specific decision to the survey.
         None of them commits Very Well Hung to a capability on the
         hold list. `a` accepts a string or an array of paragraphs. ---- */
      faqs: [
        {
          q: 'How much do office blinds cost?',
          short: 'As a guide, around £150 to £300 per window for standard office roller blinds, supplied and professionally fitted.',
          a: [
            'The exact price is confirmed after the free site survey. Larger windows, specialist fabrics and motorisation cost more, and the drivers below are predictable enough to tell you where the money goes before anyone quotes.',
            'Quantity and size do most of the work. A forty-window office is not forty times a one-window job, because survey and installation time are shared, but fabric and mechanism scale directly with area.',
            'After that comes the fabric, which runs from plain dim-out polyester at one end to specialist contract cloth at the other, and costs more again in wider widths, because of how it is woven and cut. Then the mechanism: a chain-operated spring roller, a cassette, side channels and motorisation are each a real step up in cost.',
            'Then anything non-standard in the fitting: top-fixing into concrete, wide runs split into linked blinds, angled or arched openings that need templating. And finally access, which is the one people forget. An atrium that needs a tower, or an installation that has to work around a building’s sign-in and lift booking, costs more than the same blind at desk height on a Tuesday morning.',
            'Following the survey, the project can be quoted around the actual specification rather than a generic per-window estimate.'
          ]
        },
        { q: 'Do you provide free office surveys?', short: 'Yes, free and without obligation.', a: 'Simone visits the workplace, looks at the windows and how each room is used, and gives a recommendation. You get the recommendation whether or not you go ahead with the quote.' },
        { q: 'Which blinds are best for reducing screen glare?', short: 'Usually a roller blind in a solar screen fabric, not a blackout one.', a: [
            'Screen fabrics cut glare and solar heat while keeping the room daylit and, at the right openness factor, keeping the outward view. Openness is stated as a percentage, roughly 1% to 10%, and the lower the number, the more glare control and privacy you get, and the less you see through it.',
            'Darker fabrics give better outward visibility and better glare control than pale ones, which surprises most people. Which is right for a particular room depends on the aspect, the hours it is used and what is outside the window.'
          ] },
        { q: 'Can office blinds reduce heat?', short: 'Yes, though an internal blind cannot match external shading.', a: [
            'By the time the energy reaches the fabric it is already through the glass. What a solar-reflective fabric does is reject a meaningful share of it back out before the room absorbs it, and manufacturers publish the figures for the glass-and-blind combination.',
            'In practice it is worth specifying on the one or two elevations that actually overheat, rather than across a whole floor.'
          ] },
        { q: 'Does the whole office have to be done at once?', short: 'Not necessarily.', a: [
            'If an office already has blinds in place, their condition can be assessed during the survey. Whether any existing components are worth retaining depends on their condition and whether they are compatible with the new specification.',
            'Matching a fabric across an existing run is the harder problem, because dye lots shift and UV has already moved the old blinds, so it is worth deciding room by room which runs need to match and which do not.'
          ] },
        { q: 'What blinds are best for a conference room or boardroom?', short: 'The same answer as a meeting room: a dim-out roller on a slimline cassette, in most cases.', a: [
            'Conference room, meeting room and boardroom describe the same problem in different words, and the specification follows the glass rather than the name on the door.',
            'Privacy is intermittent, so the blind has to open again easily; if the room presents to a screen, dim-out matters more than blackout; and if the room is glass-partitioned rather than external, the head detail and the door swing decide more than the fabric does. Where the run is wide, as boardroom glazing usually is, a vertical blind frequently suits it better than a single oversized roller.'
          ] },
        { q: 'How is installation handled in an occupied office?', short: 'It is planned around the working day, and agreed before anything is scheduled.', a: 'If the office is occupied, access and installation requirements are discussed before the work is scheduled, so disruption can be kept practical for the business. Buildings with sign-in procedures, permits or shared goods lifts are worth flagging at survey rather than at quote, because they affect the schedule more often than they affect the specification.' },
        { q: 'What about very large or high office windows?', short: 'They are worth surveying rather than assuming they are impossible.', a: [
            'Wide openings are generally handled as linked blinds sharing a bracket line, with the joins set on the mullions so the run reads as one. A single oversized tube deflects, and the fabric tracks off.',
            'For glazing beyond hand reach, how the blinds would actually be operated day to day becomes part of the specification, and so does the access needed to install them.'
          ] },
        { q: 'What about fire-rated fabrics for commercial premises?', short: 'Commercial projects may require fabrics meeting specific fire-performance standards.', a: [
            'In the UK, textiles for non-domestic curtains and blinds are commonly specified against [BS 5867-2](https://knowledge.bsigroup.com/products/fabrics-for-curtains-drapes-and-window-blinds-flammability-requirements-specification), the British Standard covering their flammability requirements, with different types covering different levels of requirement.',
            'If your landlord, insurer or fit-out specification sets a standard, it is worth raising at the survey rather than afterwards: it narrows the fabric range, and discovering it once the blinds are up means buying them twice. Bring the requirement to the survey and it can be established what is needed before anything is specified.'
          ] },
        { q: 'How long does it take from survey to installation?', short: 'It depends on the fabric and on building access, and it is confirmed with the quotation.', a: [
            'Lead time varies according to the chosen blind system, fabric, quantity and installation requirements, and timescales are confirmed as part of the quotation.',
            'The usual variables are the fabric, where stock ranges move quickly and cut-to-order or specialist contract cloths do not, and access arrangements in a managed building, which can add more than the manufacturing does.'
          ] },
        { q: 'We are fitting out a new office. When should we think about blinds?', short: 'Earlier than most people do.', a: 'Window coverings are usually the last trade on site and the one most often forgotten until the handover date is fixed. Looking at them while the partitions are still drawings avoids the two problems that cost time later: head details with nowhere to fix, and blind positions that fight the door swings.' },
        { q: 'Which areas do you cover?', short: 'London and Hertfordshire, from a base in North-West London.', a: 'Very Well Hung is based in North-West London and works with businesses across London and Hertfordshire: Edgware, Stanmore, Mill Hill, Borehamwood, Barnet, Hendon, Finchley, Harrow, Bushey, Radlett, Watford, St Albans, Hertford and Potters Bar among them, and that list is not exhaustive. For larger commercial projects, enquiries from further afield are welcome.' }
      ],
      // Kept for the older section copy; superseded by `areas` above.
      locations: 'Office blinds across London and Hertfordshire.',
      form: {
        intro: 'Tell Simone about the office, the approximate number of windows and where you are based. She can then advise on the best next step.',
        privacy: 'No spam and no mailing lists. Your details are only used to arrange the survey and reply to your enquiry.',
        fields: [
          { id: 'name', label: 'Your name', type: 'text', autocomplete: 'name', placeholder: 'Alex Taylor' },
          { id: 'company', label: 'Business', type: 'text', autocomplete: 'organization', optional: true, placeholder: 'Company or organisation' },
          { id: 'phone', label: 'Phone', type: 'text', autocomplete: 'tel', optional: true, placeholder: 'Best number to reach you' },
          { id: 'email', label: 'Email', type: 'text', autocomplete: 'email', placeholder: 'you@company.co.uk' },
          { id: 'postcode', label: 'Postcode', type: 'text', autocomplete: 'postal-code', placeholder: 'Where is the office?' },
          { id: 'windows', label: 'Approximate number of windows', type: 'text', optional: true, placeholder: 'A rough count is fine' },
          { id: 'requirement', label: 'Main requirement', type: 'textarea', optional: true, placeholder: 'Glare on screens, overheating, privacy, damaged blinds, blackout\u2026' },
          { id: 'photos', label: 'Photos of the windows', type: 'file', optional: true, note: 'A couple of phone photos help Simone prepare.' }
        ]
      }
    },

    /* ============================================================
       TRIGGER-EVENT PAGES
       ------------------------------------------------------------
       /office-blinds is the money keyword, and the money keyword
       is a fight against national directories and franchises with
       ten-year-old domains. These three pages go after the moment
       before it: the afternoon somebody types "sun on my computer
       screen at work" or "office too hot south facing windows"
       into a phone. Those searches are numerous, individually
       small, ignored by directories whose pages are listings
       rather than answers, and winnable in months.

       One trigger event per page, never two. Folding glare and
       overheating into one page halves the relevance of both,
       even though they share an elevation and a fabric.

       The corresponding blocks on /office-blinds are now short
       summaries that link here, so no paragraph appears twice on
       the site. Duplication across two of your own pages helps
       neither of them.

       Same discipline as everywhere else: industry fact, and
       nothing that claims a Very Well Hung capability which has
       not been confirmed. The outbound links go to the HSE, the
       government's Approved Documents and the BBSA, and none of
       them implies membership or accreditation.
       ============================================================ */
    triggers: {

      /* ---------- 1 · SCREEN GLARE ---------- */
      glare: {
        slug: '/screen-glare-office-blinds-london',
        navLabel: 'Screen glare',
        heroKicker: 'Office blinds · Screen glare',
        h1: 'The sun is on the screens and nobody can work.',
        heroLine: 'What actually fixes screen glare, and what only looks like it does.',
        heroSub: 'It starts at about three o’clock on the west side, it is worse in March than in June, and half the office has already turned their monitors to face the wall. Here is what causes it, how to tell which kind you have, and which blind and fabric fix it without turning a daylit floor into a basement.',
        quickAnswers: [
          {
            q: 'Which blinds are best for screen glare?',
            short: 'A roller blind in a solar screen fabric, in almost every case.',
            a: 'Screen fabric is woven to a stated openness factor, roughly 1% to 10%, which is the proportion of the weave left open. Lower cuts more glare and gives more privacy, and lets you see out less. Blackout fabric also fixes the screens, and puts the overhead lights on at eleven in the morning, which is why it is the wrong answer to this particular problem.'
          },
          {
            q: 'Should the fabric be dark or light?',
            short: 'Dark, if you want to keep the view.',
            a: 'This surprises almost everyone. A darker screen fabric gives better outward visibility and better glare control, because the eye reads through the weave rather than at it. A pale fabric rejects more solar heat, but in direct sun it becomes a bright surface of its own, which is its own glare source in a room full of monitors.'
          },
          {
            q: 'Do we have to do the whole floor?',
            short: 'Usually not.',
            a: 'Glare is an aspect problem before it is a building problem. East and west elevations are the worst and only for an hour or two at each end of the day. A north elevation often needs nothing at all. Specifying the elevations that actually suffer costs less than doing the building, and looks better than three different blinds on one face.'
          }
        ],
        signsHeading: 'How to tell what you are actually dealing with',
        signsIntro: 'Glare gets reported as "the sun is a nightmare", which is not enough to specify against. These six tell you which kind you have, and most of them are visible from the doorway.',
        signs: [
          {
            name: 'Monitors have been turned away from the window',
            body: 'The most reliable sign there is, and the one nobody ever reports. People solve glare themselves by rotating the screen, which fixes the reflection and leaves them sitting at an angle to their desk, the room and whoever they are talking to. If a row of monitors is out of square with the desks beneath them, the window is the reason.'
          },
          {
            name: 'The blinds are down and the lights are on',
            body: 'At eleven in the morning, in a room with a wall of glass. Somebody specified a blackout or dim-out fabric for a glare problem. It works. It also costs the floor its daylight and the business its lighting bill, which is a trade nobody consciously agreed to.'
          },
          {
            name: 'It is only bad for an hour, twice a day',
            body: 'Low sun on an east or west elevation, arriving at screen height at the beginning and end of the working day. This is the sharpest kind of glare and, oddly, the most straightforward to fix, because the fabric only has to do its work at a low sun angle.'
          },
          {
            name: 'It moves across the floor through the day',
            body: 'A south elevation. Higher in the sky, longer in duration, and affecting a different set of desks at ten than at three. It is usually a heat problem as well as a light problem, and that narrows the fabric choice, because the same blind is being asked to do two jobs.'
          },
          {
            name: 'It is worst on video calls',
            body: 'A different problem with the same cause. The camera exposes for the bright window behind the person and turns them into a silhouette. It is solved by controlling the light behind the head rather than the light on the screen, which is why a room can be perfectly comfortable to work in and impossible to be seen in.'
          },
          {
            name: 'The screen looks washed out rather than reflective',
            body: 'Veiling glare: light falling across the face of the monitor and lifting the blacks, rather than a mirror image of the window sitting in it. It reduces contrast on everything at once, and people usually describe it as the screen looking dirty rather than as a glare problem at all.'
          }
        ],
        causesHeading: 'Why it happens',
        causes: [
          {
            name: 'Glare is contrast, not brightness',
            body: [
            'A monitor becomes unreadable when the light around it or falling on it overwhelms the image, not when the room is bright. A well daylit office with the sun under control is a more comfortable place to look at a screen than a dim one with a single blazing window in it.',
            'That is why making the room darker is so often the wrong instinct: it lowers the brightness and leaves the contrast exactly where it was.'
          ]
          },
          {
            name: 'Low sun is the worst offender',
            body: 'Sun low in the sky arrives at desk and screen height and travels a long way into the room. That is a morning problem on an east elevation and an afternoon one on a west. It is also worse in the months either side of midwinter than at the height of summer, which is the opposite of what most people expect and the reason glare complaints often arrive in February.'
          },
          {
            name: 'Reflected light counts as sun',
            body: 'A glass building opposite, a pale render wall, a parked car, a wet car park in low sun. Reflection puts sun on an elevation that should not get any, at times of day that make no sense from the aspect alone. It is the usual explanation for a north-facing room with a glare problem nobody can account for.'
          },
          {
            name: 'It is a duty, not just an irritation',
            body: 'Employers have to assess display screen equipment workstations, and lighting, reflections and glare on the screen are part of what that assessment covers. The HSE sets out what is involved in [working safely with display screen equipment](https://www.hse.gov.uk/msd/dse/). A room where people have quietly turned their monitors away from the window has already failed that assessment in practice, whatever the paperwork says.'
          }
        ],
        optionsHeading: 'What actually fixes it, cheapest first',
        optionsIntro: 'The first two cost nothing. Any specifier who does not raise them before quoting is selling rather than advising.',
        options: [
          {
            name: 'Move the desk, or turn the monitor',
            body: 'Free, and worth trying before anyone quotes for anything. Screens are best placed at right angles to a window rather than facing it or backing on to it. In a small room with one window that is sometimes the entire answer, and it takes ten minutes.'
          },
          {
            name: 'Use what is already there, properly',
            body: 'Existing vertical blinds that nobody adjusts are a very common finding. Louvres angled towards the sun rather than closed flat will control a surprising amount of glare while keeping the daylight, and the cost of that is a conversation rather than an order. Where the existing blinds are the right product badly used, saying so is the honest answer.'
          },
          {
            name: 'A solar screen roller blind',
            body: [
            'The usual answer, and the one that solves the problem without taking the daylight with it. One moving part, a minimal stack at the head, and the widest fabric choice of any system. The decision that matters is not the blind, it is the fabric that goes on it.',
            'Industry guidance on blind systems and their installation is published by the [British Blind and Shutter Association](https://bbsa.org.uk/), the national trade association for the blind and shutter industry.'
          ]
          },
          {
            name: 'Choosing the openness factor',
            body: [
            'Roughly 1% to 10%, the proportion of the weave left open. A 3% fabric cuts glare hard and keeps a usable outward view. A 10% fabric keeps more daylight and more view, and does correspondingly less work. On a low-sun elevation, lower is usually right. Where the view is the reason the business took the office, it is a genuine trade to talk through rather than a number to pick off a chart.',
            'Openness is one of several figures published under [BS EN 14501](https://knowledge.bsigroup.com/products/blinds-and-shutters-thermal-and-visual-comfort-performance-characteristics-and-classification-2), the standard that classifies blinds and shutters for thermal and visual comfort, which is what lets one fabric be compared with another rather than simply described.'
          ]
          },
          {
            name: 'Two fabrics on one window',
            body: 'A dual roller carries a screen fabric and a dim-out on the same bracket, so a room can be daylit and glare-free for most of the week and properly dark when it needs to be. It costs more than either fabric alone and less than fitting two separate blinds, and it earns its place in a room that is both a workspace and a presentation space.'
          },
          {
            name: 'Motorisation on high or wide glazing',
            body: 'Worth considering where blinds are beyond hand reach, or where a whole elevation ought to move together rather than in the order people get round to it. A blind nobody can reach is a blind that stays wherever it was last left, which in practice means down. This is a real step up in cost and is not the answer to a glare problem at desk height.'
          }
        ],
        checksLead: 'What the survey establishes',
        checks: [
          'Which way each elevation faces, and the hours each room is genuinely occupied',
          'Where people sit relative to the glass, and who has their back to it on video calls',
          'What is opposite the window: glass, pale render or standing water that could be reflecting sun onto an elevation the aspect says should be fine',
          'Whether the room overheats as well, because the same fabric cannot be optimised for both',
          'What is outside, because a view worth keeping changes the openness factor',
          'Whether the existing blinds are the right product being used badly'
        ],
        faqs: [
          { q: 'Which blinds are best for computer screen glare?', short: 'A roller blind in a solar screen fabric, in almost every case.', a: [
            'Screen fabrics are woven to a stated openness factor, roughly 1% to 10%, and cut glare while keeping the room daylit and, at the right openness, keeping the view out.',
            'The lower the number, the more glare control and privacy you get and the less you can see through it. Which figure suits a particular room depends on the aspect, the hours it is used and what is outside the window.'
          ] },
          { q: 'Will screen blinds make the office dark?', short: 'No, and that is the point of them.', a: [
            'A screen fabric is a woven fabric with a stated proportion of the weave left open, so daylight continues to come through it while the direct sun is cut.',
            'That is the difference between a screen fabric and a dim-out, and it is why specifying a dim-out for a glare problem is the mistake worth avoiding: it solves the screens and then the overhead lights go on at eleven in the morning.'
          ] },
          { q: 'Should we just get blackout blinds instead?', short: 'Only if the room genuinely needs to be dark for another reason, such as projection.', a: 'Blackout will certainly stop the glare, and it will also stop the daylight, put the lights on and make the room an unpleasant place to sit for eight hours. For a glare problem specifically it is the most expensive way to create a second problem.' },
          { q: 'What openness factor do we need?', short: 'There is no single right answer, which is why it is worth a conversation rather than a default.', a: [
            'As a rule of thumb, 1% to 3% for hard glare control and daytime privacy, 5% as the common middle, and 10% where daylight and view matter more than the last of the glare.',
            'Low sun on an east or west elevation pushes you lower; a view the business is paying for pushes you higher.'
          ] },
          { q: 'Do dark or light fabrics work better for glare?', short: 'Darker, if outward visibility matters.', a: [
            'It surprises most people. A dark fabric absorbs rather than scatters the light hitting it, so the eye reads through the weave instead of at it, giving both better glare control and a clearer view out.',
            'Pale fabrics reflect more solar heat back out, which is an advantage on an elevation that also overheats, but in direct sun a pale blind becomes a bright surface of its own in a room full of monitors.'
          ] },
          { q: 'Will blinds fix glare on video calls?', short: 'Usually, though it is a slightly different job.', a: [
            'On a call the problem is normally the bright window behind the person rather than sun on their screen: the camera exposes for the window and turns the face into a silhouette.',
            'What fixes it is bringing the brightness of the background down to something closer to the face, which a screen fabric does well. It is worth identifying which desks face which way before specifying, because the seat that needs it is not always the one complaining.'
          ] },
          { q: 'Do we have to do every window?', short: 'Almost never.', a: [
            'Glare is an aspect problem: east and west elevations suffer at each end of the day, south moves across the floorplate, and north often needs nothing at all.',
            'Doing the elevations that actually suffer costs less and looks better than a building carrying three different blinds on the same face. Where a run is client-facing, matching across the whole run matters more than the glare does, and that is worth deciding room by room.'
          ] },
          { q: 'Is glare on a screen the employer’s responsibility?', short: 'Assessing it is.', a: [
            'Employers have to carry out display screen equipment workstation assessments, and lighting, reflections and glare on the screen form part of what those assessments cover.',
            'That does not prescribe blinds, or any particular product, and this is not legal advice. It does mean that a room where people have turned their monitors away from the window is a room with a finding waiting to be written down.'
          ] },
          { q: 'Do you cover Edgware, Stanmore and Mill Hill?', short: 'Yes.', a: 'Very Well Hung is based in North-West London and those are part of the area Simone covers regularly, along with Hendon, Finchley, Barnet and Harrow. Send a photo of the window with your postcode and she can tell you what she would specify before anyone visits.' },
          { q: 'Do you cover Watford, Borehamwood and Hertfordshire?', short: 'Yes. Borehamwood, Bushey, Radlett and Watford are all part of the regular area, and the list is not exhaustive.', a: 'For larger office projects, enquiries from further afield across London and Hertfordshire are welcome.' }
        ]
      },

      /* ---------- 2 · OVERHEATING AND SOLAR GAIN ---------- */
      overheating: {
        slug: '/office-overheating-blinds-london',
        navLabel: 'Overheating',
        heroKicker: 'Office blinds · Overheating',
        h1: 'The south side of the office is unbearable by two o’clock.',
        heroLine: 'What a blind can do about solar gain, and what it honestly cannot.',
        heroSub: 'The air conditioning runs flat out and still loses, one side of the floor is uncomfortable while the other is fine, and somebody has brought in a fan. Here is what solar gain actually is, what an internal blind can and cannot do about it, and where a solar-reflective fabric is worth fitting rather than fitting everywhere.',
        quickAnswers: [
          {
            q: 'Will blinds actually cool the office down?',
            short: 'They will cut the heat coming in, but an internal blind cannot match external shading.',
            a: 'By the time the sun reaches the fabric it is already through the glass and inside the room. What a solar-reflective fabric does is bounce a meaningful share of it back out before the room absorbs it. Manufacturers publish that figure for the glass and blind together rather than for the fabric on its own, which is the number worth asking for.'
          },
          {
            q: 'Is there a legal maximum office temperature?',
            short: 'No.',
            a: 'There is no legal maximum working temperature in the UK. There is a duty to keep the temperature at a comfortable level, and a suggested minimum of 16C for most indoor work. The HSE is explicit that no maximum exists because every workplace is different. Worth knowing before anyone quotes you on the basis that there is a number to hit.'
          },
          {
            q: 'Do we need it on every window?',
            short: 'Almost never.',
            a: 'Overheating is usually one or two elevations, and often one or two rooms on them. Putting the reflective fabric where it earns its place costs a fraction of doing the floor, and looks considerably better than a building wearing three different blinds on the same face.'
          }
        ],
        signsHeading: 'How to tell it is solar gain',
        signsIntro: 'Plenty of things make an office too warm. These are the signs that point at the glazing rather than at the air conditioning, the occupancy or the plant.',
        signs: [
          {
            name: 'It peaks in the afternoon, not at the hottest part of the day',
            body: 'A west elevation takes the sun late, and the building holds it. If the worst hour is between two and five rather than tracking the outside temperature, the sun on the glass is doing it rather than the weather.'
          },
          {
            name: 'One side of the floor is uncomfortable and the other is fine',
            body: 'The single clearest indicator. Air temperature equalises across an open floorplate reasonably well; solar gain does not, because it lands where the sun lands. A five-degree difference between two ends of the same room is a glazing problem, not a plant problem.'
          },
          {
            name: 'The air conditioning runs constantly and still loses',
            body: 'Cooling plant is sized for a heat load. When the load through the glass exceeds what it was sized for, it runs continuously at full output and holds the room at a temperature nobody is happy with, while costing more every hour it does it.'
          },
          {
            name: 'The glass and the sill are warm to touch',
            body: 'Worth doing with the back of a hand on a sunny afternoon. Warm glass and a warm sill mean energy is arriving and being absorbed by the room fabric, which then re-radiates it for hours after the sun has moved off the elevation.'
          },
          {
            name: 'It is bad in spring and autumn too',
            body: 'Solar gain is about the angle of the sun as much as the temperature outside. A low March sun reaches deep into a room through south glazing on a day when the outside air is cold, which is why a room can overheat on a day nobody would describe as hot. If that pattern is familiar, it is the sun.'
          },
          {
            name: 'Somebody has propped a door open or bought a fan',
            body: 'People fix their own environment before they report it, exactly as they do with glare. A desk fan on the sunny side of an air-conditioned office is a complaint that has already been made and answered privately.'
          }
        ],
        causesHeading: 'Why it happens',
        causes: [
          {
            name: 'Glass is very good at letting energy in',
            body: 'Solar gain through glazing is the largest summer heat load in most London offices. Glass admits short-wave solar energy easily; the room absorbs it, warms up, and re-radiates it as long-wave heat that the same glass is much worse at letting back out. That asymmetry is the whole mechanism, and it is why a glazed room heats up faster than it cools down.'
          },
          {
            name: 'The air conditioning is fighting it at your cost',
            body: 'Cooling does not remove the cause, it removes the consequence, every hour, for as long as the sun is on the elevation. Reducing the gain at the glass reduces the work the plant has to do, which is the part that shows up on a bill rather than on a thermometer.'
          },
          {
            name: 'Where a blind sits in the order of things',
            body: 'External shading is the most effective, because it stops the energy before it reaches the glass at all. The glazing itself comes next: a modern coated unit rejects far more than old clear glass. An internal blind is third, and it is third for a real reason. It is also, for most tenants in most buildings, the only one of the three they are actually able to change.'
          },
          {
            name: 'What the regulations cover, and what they do not',
            body: [
            'Limiting solar gains is part of the energy guidance for new and refurbished buildings, which for offices sits in [Approved Document L, Volume 2, buildings other than dwellings](https://www.gov.uk/government/publications/conservation-of-fuel-and-power-approved-document-l).',
            'That is a design-stage matter for the building, not something that applies to fitting blinds in an office you already occupy. On workplace temperature itself the position is simpler than most people assume: the HSE confirms there is [no legal maximum working temperature](https://www.hse.gov.uk/temperature/employer/index.htm), only a duty to keep it at a comfortable level.'
          ]
          }
        ],
        optionsHeading: 'What can be done, cheapest first',
        optionsIntro: 'The honest order runs from free to expensive, and the most effective option on the list is the one Very Well Hung does not supply.',
        options: [
          {
            name: 'Use the blinds you have, when the sun is on that elevation',
            body: 'Closing an existing blind on the sunny side for the two or three hours the sun is actually on it does more than most people expect, and it costs nothing. It is worth ruling out before spending anything, and worth knowing that it is often not done because nobody has ever been told which elevation matters and when.'
          },
          {
            name: 'Solar-reflective screen fabric, on the elevations that overheat',
            body: 'The core of the answer. A screen fabric with a reflective backing rejects a substantial share of the solar energy back out through the glass before the room can absorb it, while still letting daylight through and, at the right openness, keeping the view. Fitted on the one or two elevations that actually suffer, rather than across a whole floor.'
          },
          {
            name: 'Asking for the right number',
            body: [
            'The figure that matters is the total solar energy rejected by the glass and blind together, not a claim about the fabric alone.',
            'Fabric manufacturers publish it for common glazing types under [BS EN 14501](https://knowledge.bsigroup.com/products/blinds-and-shutters-thermal-and-visual-comfort-performance-characteristics-and-classification-2), the standard that classifies blinds and shutters for thermal and visual comfort, and it is measured rather than asserted, so it can be compared between quotes. A supplier who cannot produce a figure for your glazing is describing a fabric, not specifying a solution.'
          ]
          },
          {
            name: 'The appearance trade nobody mentions',
            body: 'The reflective backing has to face the glass to work, so from outside the building that elevation reads as a uniform pale band whenever the blinds are down. On a single tenanted floor of a multi-tenant building that can matter to a landlord, and it is much easier to raise before the order than after the installation.'
          },
          {
            name: 'Solar control film',
            body: [
            'Worth knowing about honestly. Film is applied to the glass, is usually cheaper than blinds, and works permanently, which is both its advantage and its problem: it also works in December, when the room would rather have the sun.',
            'It gives no control at all and cannot be adjusted by the person sitting there. Where a room overheats every month of the year and nobody wants to operate anything, it is a reasonable answer, and it is not a blind.'
          ]
          },
          {
            name: 'External shading, which outperforms all of it',
            body: 'Brise soleil, external louvres or an awning stop the energy before it reaches the glass and beat any internal blind comfortably. This is a building-level decision, usually the landlord’s rather than the tenant’s, and it is not what Very Well Hung supplies. It belongs on this list because it is true, and because a specifier who leaves it off the list is not giving you the full picture.'
          }
        ],
        checksLead: 'What the survey establishes',
        checks: [
          'Which elevations overheat, and at which hours of which months',
          'Whether the air conditioning is genuinely struggling or simply running expensively',
          'Whether the glazing is already coated or tinted, which changes what a blind still needs to do',
          'Whether the same windows also cause screen glare, because one fabric cannot be optimised for both',
          'How the building reads from outside, if the landlord cares about uniformity across an elevation',
          'Whether anything in the lease or fit-out specification constrains what can go on the glass'
        ],
        faqs: [
          { q: 'Do blinds actually reduce heat in an office?', short: 'Yes, with a caveat worth being straight about.', a: [
            'An internal blind cannot match external shading, because by the time the energy reaches the fabric it is already through the glass and inside the room. What a solar-reflective fabric does is reject a meaningful share of it back out before the room absorbs it.',
            'The figures are published for the glass and blind combination, so the effect can be compared rather than argued about. In practice it is worth specifying on the one or two elevations that genuinely overheat rather than across a whole floor.'
          ] },
          { q: 'Is there a maximum legal temperature for an office?', short: 'No. There is no legal maximum working temperature in the UK.', a: [
            'Employers have a duty to keep the temperature at a comfortable level and to provide clean, fresh air, and there is a suggested minimum of 16C for most indoor work, or 13C where the work involves rigorous physical effort.',
            'The HSE is explicit that no maximum figure exists because every workplace is different. This is not legal advice, but it is worth knowing before anyone quotes on the basis of a number.'
          ] },
          { q: 'Which blind fabric is best for solar heat?', short: 'A screen fabric with a reflective backing, in a lighter tone.', a: 'Pale and metallised backings reflect more solar energy back out through the glass than dark ones absorb, which is the opposite of the rule for glare control, and it is why a window that both overheats and causes screen glare is a genuine specification decision rather than an obvious one. The reflective face has to point at the glass to work.' },
          { q: 'Is film better than blinds for solar control?', short: 'It depends entirely on whether you want control.', a: [
            'Film is applied to the glass, usually costs less, and works permanently. That is its advantage in a room that overheats all year, and its drawback in December, when the room would rather have the sun and there is no way to change your mind.',
            'Blinds cost more and can be opened. Neither is universally right, and any supplier who only sells one of them will tell you theirs is.'
          ] },
          { q: 'Will solar blinds make the office dark?', short: 'No.', a: 'A screen fabric leaves a stated proportion of the weave open, so daylight continues through it while the direct solar energy is cut. The lighter reflective fabrics used for heat control keep a room notably brighter than a dim-out would. What they do less well is preserve a crisp view out, because a pale weave scatters light rather than letting the eye read straight through it.' },
          { q: 'Does the whole elevation have to be done at once?', short: 'Not necessarily, though this is the one case where doing a partial run often shows.', a: 'A single elevation seen from outside with three windows blinded and five not is conspicuous in a way that a back office is not. Where the elevation is visible from the street or from a shared courtyard, it is usually worth doing the run together even when only some rooms suffer.' },
          { q: 'Will blinds reduce our air conditioning costs?', short: 'They reduce the heat load the plant has to deal with, which is the input to that cost rather than the cost itself.', a: [
            'How much that saves depends on the plant, the tariff, how the building is controlled and how the space is occupied, so anyone quoting you a percentage saving from a blind alone is guessing.',
            'The reliable statement is narrower and still useful: less solar energy entering the room means less work for the cooling, for as long as the sun is on that elevation.'
          ] },
          { q: 'The landlord controls the facade. Does that change anything?', short: 'Often, yes, and it is worth checking early rather than late.', a: [
            'Many leases and fit-out specifications say something about what may be fitted to or seen through the glazing, precisely because a facade with mismatched window coverings behind it is a value question for the building owner.',
            'It rarely stops a project. It does sometimes decide the fabric colour, and it is much easier to establish at survey than after an order has been placed.'
          ] },
          { q: 'Do you cover Edgware, Stanmore and Mill Hill?', short: 'Yes.', a: 'Very Well Hung is based in North-West London and covers those regularly, along with Hendon, Finchley, Barnet and Harrow. Send a photo of the window with your postcode and Simone can tell you what she would specify before anyone visits.' },
          { q: 'Do you cover Watford, Borehamwood and Hertfordshire?', short: 'Yes. Borehamwood, Bushey, Radlett and Watford are all part of the regular area, and the list is not exhaustive.', a: 'For larger office projects, enquiries from further afield across London and Hertfordshire are welcome.' }
        ]
      },

      /* ---------- 3 · MEETING-ROOM PRIVACY ---------- */
      privacy: {
        slug: '/meeting-room-privacy-blinds-london',
        navLabel: 'Meeting-room privacy',
        heroKicker: 'Office blinds · Meeting-room privacy',
        h1: 'The glass meeting room has no privacy when it matters.',
        heroLine: 'Intermittent privacy, and why the permanent solutions keep disappointing.',
        heroSub: 'The room needs to be open and visible for most of the week and properly closed for the hour a candidate is being interviewed or a client is looking at numbers on the wall. Here is what works on internal partitions, whether the room is called a meeting room, a conference room or the boardroom, why applied film so often disappoints, and what changes on a street-facing ground floor.',
        quickAnswers: [
          {
            q: 'What blinds work on a glass meeting room?',
            short: 'A dim-out roller on a slimline cassette, in most cases.',
            a: 'Workplace privacy is almost always intermittent: open and visible most of the week, closed for an hour. That points to something quick and repeatable to operate rather than something permanently opaque, and a roller on a shallow cassette is exactly that. Where the run is wide, a vertical blind often suits it better.'
          },
          {
            q: 'Should we use frosted film instead?',
            short: 'Only if the privacy is genuinely permanent.',
            a: 'Film solves the one hour and compromises the other thirty-nine. A glass-walled room is usually glass-walled on purpose, to borrow light into the middle of a floorplate and to keep the space feeling open. Film gives that up permanently in order to solve a problem that is intermittent.'
          },
          {
            q: 'Can we have privacy and keep the light?',
            short: 'During the day, yes.',
            a: 'A light-toned screen fabric gives daytime privacy while keeping the room bright, because it is brighter outside the glass than inside it. After dark that reverses and the room becomes the lit side, so it stops working exactly when the office is still occupied in winter. That is the single most common surprise on this subject.'
          }
        ],
        signsHeading: 'Work out which kind of privacy you need',
        signsIntro: 'Almost every disappointing privacy installation comes from answering a question nobody asked precisely. These six are the questions worth answering first.',
        signs: [
          {
            name: 'It is needed for an hour or two a week',
            body: 'Interviews, appraisals, a client looking at numbers, a difficult conversation. If that is the requirement, the room does not need to be private, it needs to be able to become private in about four seconds and go back afterwards. Everything about the specification follows from that distinction.'
          },
          {
            name: 'It needs to work one way, or both',
            body: 'Stopping people outside seeing in is a different job from stopping people inside being distracted by the floor. A fabric that solves one may not solve the other, and a room where the occupants keep glancing at the corridor has a concentration problem rather than a confidentiality one.'
          },
          {
            name: 'It is an internal partition, not a window',
            body: 'Partitions bring their own constraints and they are physical rather than aesthetic: head details with nothing to fix into, a track already occupying the top channel, and door swings that decide where a cassette can sit. These usually determine the answer more than the fabric preference does.'
          },
          {
            name: 'The room is used after dark',
            body: 'This rules out the daytime-privacy trick entirely. A light screen fabric that works beautifully at two in the afternoon becomes transparent from outside once the room is the brighter side, which in a London winter is most of the second half of the working day.'
          },
          {
            name: 'It is a ground floor facing the street',
            body: 'A different problem with a different answer. Passers-by can see in whenever it is brighter inside than out, and there is a security and a reputational dimension as well as a comfort one. A dim-out roller solves it and takes the light; a light screen fabric keeps the room bright and reverses after dark.'
          },
          {
            name: 'It is really about being overheard',
            body: 'Worth separating out, because blinds do very little about sound. Fabric absorbs a small amount of reflected noise within a room and does close to nothing about transmission through a glass partition or under a door. If the actual complaint is that conversations carry, that is a partition, seal and door specification, and no window covering will fix it.'
          }
        ],
        causesHeading: 'Why the obvious answers disappoint',
        causes: [
          {
            name: 'The requirement is intermittent and the solution usually is not',
            body: 'Almost every unsatisfactory glass-partition installation comes from solving an occasional need with a permanent measure. The room is then permanently less good at the thing it was built for, in exchange for being adequate at something it needs to do for an hour a week.'
          },
          {
            name: 'Glass partitions are glass on purpose',
            body: 'They exist to borrow daylight into the centre of a floorplate, to make a space feel larger than it is, and increasingly because a visible meeting room is a deliberate cultural choice. Obscuring them permanently undoes a design decision somebody paid for, which is why the complaint after a film installation is so often about the room feeling like a cupboard.'
          },
          {
            name: 'Daytime privacy reverses after dark',
            body: 'Any privacy that works by brightness difference works only while the difference runs the right way. Screen fabrics and mirrored films both do this. Between about November and February, in a room lit in the late afternoon, the effect inverts and the room becomes more visible than it was before anything was fitted.'
          },
          {
            name: 'A blind is not manifestation',
            body: [
            'Large glazed screens and doors in a workplace generally need manifestation, the markings that make the glass visible so nobody walks into it, with the guidance set out in [Approved Document K](https://www.gov.uk/government/publications/protection-from-falling-collision-and-impact-approved-document-k).',
            'A blind does not serve that purpose, because a blind that is usually open leaves the glass exactly as it was. It is worth confirming the markings are there on their own account rather than assuming a new blind has taken care of it.'
          ]
          }
        ],
        optionsHeading: 'The options, cheapest first',
        optionsIntro: 'As with glare, the first answer on the list costs nothing, and it is right more often than anyone selling blinds would like.',
        options: [
          {
            name: 'Change which room the conversation happens in',
            body: 'If confidential conversations happen twice a month and there is a solid-walled room somewhere on the floor, booking that instead is free and immediately effective. Worth ruling out first. It stops being the answer as soon as the requirement is weekly, or the glass room is the only room with a screen in it.'
          },
          {
            name: 'Applied film, where the privacy is permanent',
            body: 'Where a room genuinely should never be seen into, a medical consulting room or an HR office, film is a sound and economical answer and there is no reason to fit a blind instead. The test is honest and simple: if the answer to "should this room be private on a normal Tuesday?" is yes, film is a reasonable choice.'
          },
          {
            name: 'A dim-out roller on a slimline cassette',
            body: 'The usual answer for an internal partition. Fast to operate, repeatable, and out of the way when it is not in use. The cassette keeps the rolled fabric tidy at the head, which matters more on an internal glass wall than on a window because the whole assembly is at eye level and on show from both sides.'
          },
          {
            name: 'Vertical blinds where the run is wide',
            body: 'On a long glazed run, verticals give graduated control rather than an all-or-nothing choice, and they are replaceable slat by slat, which matters when a floorplate has a lot of them and something eventually gets damaged. They are also the system most likely to conflict with a door swing, so where the door sits decides a great deal.'
          },
          {
            name: 'A light screen fabric for daytime privacy',
            body: 'Keeps the room bright and gives obscurity while it is brighter outside than in. Good in a daytime meeting room with an outside wall. Not the answer for a room used in the evening, and not the answer where the privacy requirement is absolute rather than a matter of discouraging casual glances.'
          },
          {
            name: 'Where the cassette can physically go',
            body: [
            'The specification that gets decided on site rather than on paper. Partition head details, existing tracks, sprinklers, ceiling grid and door swings routinely rule out the first choice, and finding that out at installation rather than at survey is what turns a straightforward job into a return visit.',
            'Industry guidance on installation and on internal blind safety is published by the [British Blind and Shutter Association](https://bbsa.org.uk/), the national trade association for the blind and shutter industry.'
          ]
          }
        ],
        checksLead: 'What the survey establishes',
        checks: [
          'Whether privacy is needed one way or both ways',
          'Whether it is an internal partition or external glazing, because they need different products',
          'How often the room actually needs to be private, which decides permanent against operable',
          'Whether the room is used after dark, which rules some fabrics out entirely',
          'Door swings, partition tracks and head details that limit where a cassette can sit',
          'Whether the real complaint is being seen or being overheard'
        ],
        faqs: [
          { q: 'What blinds are best for glass meeting rooms?', short: 'A dim-out roller on a slimline cassette suits most internal partitions.', a: [
            'Workplace privacy is almost always intermittent: the room needs to be open and visible for most of the week and closed for an hour, so what matters is that it is quick and repeatable to operate rather than permanently opaque.',
            'On a wide run a vertical blind often works better, because it gives graduated control and can be replaced a slat at a time.'
          ] },
          { q: 'Is frosted film better than blinds for a meeting room?', short: 'Only where the privacy is genuinely permanent.', a: [
            'Film solves the one hour a week and compromises the other thirty-nine, and a glass-walled room is usually glass-walled on purpose, to borrow daylight into the middle of a floorplate and keep the space feeling open.',
            'For a consulting room or an HR office that should never be seen into, film is a sound and cheaper answer. For a meeting room that is normally open, it is the wrong tool.'
          ] },
          { q: 'Can we have privacy and still keep the daylight?', short: 'During the day, yes.', a: [
            'A light-toned screen fabric obscures the room while it is brighter outside the glass than inside it, so the room stays bright and the view in is broken up.',
            'The important caveat is that it reverses after dark: once the room is the lit side, it becomes more visible than it was. In a London winter that happens well before the end of the working day, so it depends entirely on when the room is used.'
          ] },
          { q: 'Do blinds help with meeting rooms being overheard?', short: 'Barely, and it is worth saying plainly.', a: [
            'Fabric absorbs a little reflected sound inside the room and does almost nothing about transmission through a glass partition, around its edges or under the door.',
            'If the real complaint is that conversations carry, the answer is in the partition, the seals and the door rather than in anything fitted to the glass. Anyone selling you a blind as an acoustic solution is overselling it.'
          ] },
          { q: 'What about privacy on a street-facing ground floor?', short: 'A different problem from an internal partition, and usually a more serious one.', a: [
            'Passers-by can see in whenever it is brighter inside than out, which through a London winter is most of the working day. A dim-out roller solves it completely and takes the daylight with it.',
            'A light screen fabric keeps the room bright and gives daytime obscurity, but reverses after dark, which matters if the room is used in the evening or if there is equipment on show.'
          ] },
          { q: 'Will a blind satisfy the requirement for markings on glass partitions?', short: 'No, and it is worth separating the two.', a: [
            'Large glazed screens and doors generally need manifestation, the markings that make the glass visible so people do not walk into it, and the relevant guidance sits in Approved Document K.',
            'A blind is not manifestation, because a blind that is normally open leaves the glass exactly as it was. This is not a compliance service Very Well Hung provides, and it is worth checking the markings on their own account rather than assuming a new blind has covered it.'
          ] },
          { q: 'How quickly can the blinds be closed when a meeting starts?', short: 'The operating method matters more than the fabric on a meeting room.', a: 'A chain-operated roller on a two-metre partition takes a few seconds. A wide run of verticals takes longer and involves walking the length of it. If a room is booked back to back and needs to switch state between meetings, that difference is the specification.' },
          { q: 'Can the blinds match across several meeting rooms?', short: 'Within one order, yes, and that is the moment to do it.', a: [
            'The same fabric from the same supplier shifts between dye lots, so rooms specified a year apart can be visibly different even with an identical fabric name on the paperwork.',
            'Where several rooms front a client-facing corridor, ordering the run together is worth more than it costs. In back-of-house rooms it usually does not show and does not matter.'
          ] },
          { q: 'Do you cover Edgware, Stanmore and Mill Hill?', short: 'Yes.', a: 'Very Well Hung is based in North-West London and covers those regularly, along with Hendon, Finchley, Barnet and Harrow. Send a photo of the partition with your postcode and Simone can tell you what she would specify before anyone visits.' },
          { q: 'Do you cover Watford, Borehamwood and Hertfordshire?', short: 'Yes. Borehamwood, Bushey, Radlett and Watford are all part of the regular area, and the list is not exhaustive.', a: 'For larger office projects, enquiries from further afield across London and Hertfordshire are welcome.' }
        ]
      }
    },

    /* ---- Footer legal (demo) ---- */
    footerLegal: '© Very Well Hung. Handmade made-to-measure curtains, blinds and shutters across London.'
  };

  root.VWH = VWH;
  if (typeof module !== 'undefined' && module.exports) { module.exports = VWH; }
})(typeof window !== 'undefined' ? window : this);
