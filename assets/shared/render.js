/* ============================================================
   Very Well Hung — SHARED RENDERERS
   ------------------------------------------------------------
   Every [data-vwh-list] block on the site is built by one of the
   functions in here, from the data in content.js.

   This file exists so the same code can run in two places:

     - in the browser, called by vwh.js on page load
     - in Node, called by tools/bake.js at author time, which
       writes the rendered HTML straight into the .html files

   That second one is the point. The office page's depth — the
   problem blocks, the FAQs, the system comparison — used to
   exist only as an empty <div> until JavaScript filled it.
   Google renders JavaScript eventually; the crawlers behind AI
   answer engines mostly do not, so to them the page was a hero
   and a set of headings. Baking the same HTML into the file
   means the content is there for anything that reads the page,
   and vwh.js still overwrites it at runtime so nothing has to
   stay in sync by hand.

   Renderers take (items, VWH) and return an HTML string. They
   skip entries whose content is still empty, so anything Simone
   has not confirmed renders as nothing at all rather than as a
   placeholder. Nothing is ever invented to fill a gap — see
   SIMONE-OFFICE-INTERVIEW.md.
   ============================================================ */
(function (root, factory) {
  'use strict';
  var api = factory();
  root.VWHRender = api;
  if (typeof module !== 'undefined' && module.exports) { module.exports = api; }
})(typeof window !== 'undefined' ? window : this, function () {
  'use strict';

  function get(VWH, path) {
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

  /* Links inside body copy.
     content.js holds plain strings, so a link is written as
     [label](https://example.com) and converted here AFTER the
     string has been escaped. Escaping first is what makes this
     safe: nothing in the source text can produce the brackets,
     so the only anchors that appear are the ones an author
     deliberately wrote. Used for the outbound authority links
     (HSE, BSI, BBSA) on the office page. */
  var LINK = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
  function links(escaped) {
    return escaped.replace(LINK, '<a href="$2" rel="noopener">$1</a>');
  }
  function text(v) { return links(esc(v)); }

  // A string or an array of strings → one <p> per paragraph. Empty
  // and missing values render nothing, which is how unconfirmed
  // content disappears instead of showing a placeholder.
  function paras(v) {
    var list = Array.isArray(v) ? v : [v];
    return list.filter(function (p) { return p && String(p).trim(); })
      .map(function (p) { return '<p>' + text(p) + '</p>'; }).join('');
  }

  // src → alt lookup from the master photo manifest, so galleries
  // get descriptive alt text even when their own caption is short.
  function photoGallery(items, VWH) {
    var photoAlt = {};
    (get(VWH, 'photos') || []).forEach(function (p) { if (p && p.src) photoAlt[p.src] = p.alt; });
    return items.map(function (g) {
      var alt = g.alt || photoAlt[g.src] || g.caption || '';
      var style = g.pos ? ' style="object-position:' + esc(g.pos) + '"' : '';
      return '<figure class="v-tile v-tile--photo reveal">' +
        '<img class="v-tile__img" src="' + esc(g.src) + '" alt="' + esc(alt) + '"' + style + ' loading="lazy">' +
        (g.caption ? '<figcaption>' + esc(g.caption) + '</figcaption>' : '') +
        '</figure>';
    }).join('');
  }

  var renderers = {
    services: function (items) {
      return items.map(function (s) {
        var img = s.img
          ? '<img class="v-card__img" src="' + esc(s.img) + '" alt="' + esc(s.alt || s.name) + '" loading="lazy">'
          : '';
        return '<article class="v-card reveal' + (s.img ? ' v-card--photo' : '') + '">' + img +
          '<div class="v-card__text">' +
          '<h3 class="v-card__title">' + esc(s.name) + '</h3>' +
          '<p class="v-card__blurb">' + esc(s.blurb) + '</p>' +
          '<p class="v-card__detail">' + esc(s.detail) + '</p>' +
          '</div></article>';
      }).join('');
    },
    faqs: function (items) {
      return items.map(function (f) {
        // `a` is a string, or an array of paragraphs for the longer
        // commercial answers on the office page.
        //
        // `short` is the verdict, bolded ahead of the answer, and it is
        // optional. It exists because the office answers run to three or
        // four hundred words and the reader wants the yes/no before the
        // reasoning. It is also the shape an answer engine extracts: a
        // self-contained verdict that survives being read aloud with no
        // page around it. Where a `short` is set, the answer below it
        // has had its own opening restatement removed, so the two read
        // as one sentence rather than saying the same thing twice.
        var body = paras(f.a);
        if (f.short && String(f.short).trim()) {
          body = body.replace('<p>', '<p><strong class="v-faq__verdict">' + text(f.short) + '</strong> ');
        }
        return '<details class="v-faq"><summary>' + esc(f.q) + '</summary>' +
          body + '</details>';
      }).join('');
    },
    process: function (items) {
      return items.map(function (p, i) {
        // p.icon is a trusted inline-SVG string from content.js (not user
        // input) so it is injected raw; the numeric fallback stays escaped-safe.
        var badge = p.icon ? p.icon : (i + 1);
        return '<div class="v-step reveal"><span class="v-step__num">' + badge + '</span>' +
          '<h4>' + esc(p.step) + '</h4><p>' + esc(p.body) + '</p></div>';
      }).join('');
    },
    why: function (items) {
      return items.map(function (w) { return '<li>' + text(w) + '</li>'; }).join('');
    },
    formfields: function (fields) {
      return fields.map(function (f) {
        var id = 'vwh-' + f.id;
        var input;
        if (f.type === 'textarea') {
          input = '<textarea id="' + id + '" name="' + esc(f.id) + '" placeholder="' + esc(f.placeholder || '') + '"></textarea>';
        } else if (f.type === 'file') {
          input = '<input id="' + id + '" name="' + esc(f.id) + '" type="file" accept="image/*" multiple>' +
            (f.note ? '<span class="v-field__note">' + esc(f.note) + '</span>' : '');
        } else {
          input = '<input id="' + id + '" name="' + esc(f.id) + '" type="' + esc(f.type || 'text') + '"' +
            (f.autocomplete ? ' autocomplete="' + esc(f.autocomplete) + '"' : '') +
            ' placeholder="' + esc(f.placeholder || '') + '">';
        }
        // Only the optional fields are marked. Marking the required
        // ones instead would put a badge on most of the form, which
        // is the impression we are trying to remove: what makes
        // these forms look demanding is not their length but the
        // absence of any sign that most of it can be skipped.
        var flag = f.optional ? '<span class="v-field__opt">Optional</span>' : '';
        return '<div class="v-field"><label for="' + id + '">' +
          '<span>' + esc(f.label) + '</span>' + flag + '</label>' + input + '</div>';
      }).join('');
    },
    // Blind-type comparison rows ({type, bestFor, note?}) for a .w-table
    // tbody. The optional third cell carries the trade-off, which is what
    // makes the table useful rather than a brochure.
    comparerows: function (items) {
      return items.map(function (r) {
        return '<tr><td><strong>' + esc(r.type) + '</strong></td><td>' + esc(r.bestFor) + '</td>' +
          (r.note ? '<td class="w-table__note">' + text(r.note) + '</td>' : '') + '</tr>';
      }).join('');
    },
    // Real client quotes ({quote, name, area, context}), styled as a
    // grid of .w-quote figures. Entries with no quote yet are skipped,
    // so an empty testimonials array renders nothing and the wrapping
    // [data-vwh-optional] section on index.html hides itself.
    testimonials: function (items) {
      return items.filter(function (t) { return t.quote && String(t.quote).trim(); })
        .map(function (t) {
          var meta = [t.area, t.context].filter(Boolean).map(esc).join(', ');
          return '<figure class="w-quote v-testimonial reveal">' +
            '<p>' + text(t.quote) + '</p>' +
            '<figcaption><strong>' + esc(t.name) + '</strong>' +
            (meta ? '<span>' + meta + '</span>' : '') +
            '</figcaption></figure>';
        }).join('');
    }
  };

  /* ---- Office-page renderers ---- */

  // The answer-first block at the top of the office page. Each entry
  // leads with the direct answer and then qualifies it, because that
  // is the shape a featured snippet or an AI assistant extracts.
  function officeQuick(items) {
    return items.filter(function (i) { return i.a && String(i.a).trim(); })
      .map(function (i) {
        return '<div class="o-quick__item reveal">' +
          '<h3 class="o-quick__q">' + esc(i.q) + '</h3>' +
          '<p class="o-quick__a"><strong>' + text(i.short) + '</strong> ' + text(i.a) + '</p>' +
          (i.href ? '<a class="o-quick__more" href="' + esc(i.href) + '">' + esc(i.more || 'Read more') + '</a>' : '') +
          '</div>';
      }).join('');
  }

  // Problem blocks: heading, search-facing question, body paragraphs,
  // and the survey checklist that shows the expertise rather than
  // asserting it.
  function officeProblems(items) {
    return items.map(function (p) {
      var checks = (p.survey || []).map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('');
      return '<article class="o-problem"' + (p.id ? ' id="' + esc(p.id) + '"' : '') + '>' +
        '<div class="o-problem__body">' +
        '<h3 class="o-problem__title">' + esc(p.name) + '</h3>' +
        (p.question ? '<p class="o-problem__q">' + esc(p.question) + '</p>' : '') +
        paras(p.body) +
        // A problem that has its own trigger-event page keeps a short
        // summary here and links out. Nothing is written twice.
        (p.href
          ? '<a class="o-problem__more" href="' + esc(p.href) + '">' +
            esc(p.more || 'Read the full guide') + '</a>'
          : '') +
        '</div>' +
        (checks
          ? '<aside class="o-problem__survey">' +
            '<h4>' + esc(p.surveyLead || 'What the survey establishes') + '</h4>' +
            '<ul>' + checks + '</ul></aside>'
          : '') +
        '</article>';
    }).join('');
  }

  // Case-study fields. A field with no body yet is skipped entirely.
  function officeCase(items) {
    return items.filter(function (f) { return f.body && String(f.body).trim(); })
      .map(function (f) {
        return '<div class="o-case__field reveal"><h4>' + esc(f.label) + '</h4>' + paras(f.body) + '</div>';
      }).join('');
  }

  // Specifying guidance. Entries with no answer render nothing, so this
  // section shrinks rather than showing a placeholder — and it is
  // replaced wholesale once Simone's own answers arrive.
  function officeGuidance(items) {
    return items.filter(function (i) { return i.a && String(i.a).trim(); })
      .map(function (i) {
        return '<div class="o-ask__item reveal"><h3>' + esc(i.q) + '</h3>' + paras(i.a) + '</div>';
      }).join('');
  }

  // Recent commercial jobs: { area, product, scope }. No client names.
  function officeProjects(items) {
    return items.map(function (p) {
      return '<li class="o-projects__item">' +
        '<strong>' + esc(p.area) + '</strong>' +
        '<span>' + esc(p.product) + '</span>' +
        (p.scope ? '<span class="o-projects__scope">' + esc(p.scope) + '</span>' : '') +
        '</li>';
    }).join('');
  }

  // Named areas, rendered as chips. Only real place names go in here.
  function officeAreas(list) {
    return (list || []).filter(Boolean)
      .map(function (a) { return '<li>' + esc(a) + '</li>'; }).join('');
  }

  // Plain {name, body} cards. The workhorse of the trigger-event
  // pages: symptom cards, causes, and the options list. `body` takes
  // a string or an array of paragraphs like everything else.
  function cards(items) {
    return items.filter(function (c) { return c.body && String(c.body).length; })
      .map(function (c) {
        return '<article class="o-card reveal">' +
          '<h3 class="o-card__title">' + esc(c.name) + '</h3>' +
          paras(c.body) + '</article>';
      }).join('');
  }

  // Numbered {name, body} cards, for lists where the order carries
  // meaning: the options on each trigger page run cheapest first, so
  // the free answer is item one and the expensive one is item six.
  function rankedCards(items) {
    return items.filter(function (c) { return c.body && String(c.body).length; })
      .map(function (c, i) {
        return '<article class="o-card o-card--ranked reveal">' +
          '<span class="o-card__num">' + (i + 1) + '</span>' +
          '<h3 class="o-card__title">' + esc(c.name) + '</h3>' +
          paras(c.body) + '</article>';
      }).join('');
  }

  /* The decision table: symptom → what is usually specified → the
     mistake it invites. Three columns, four rows, and the only block
     on the office page a reader can take everything from without
     reading a paragraph.

     The third cell is the one that earns it. A two-column version is
     a product grid and says nothing a supplier's site would not; the
     mistake column is the de-escalation the playbook scores, in the
     most scannable form the page has room for. */
  function decisionRows(items, VWH) {
    // The column headings are hidden on narrow screens, where each row
    // becomes a card, so they are repeated onto the cells as data-label
    // and drawn back by CSS. Reading them from the same array the
    // <thead> is written from is what stops the two drifting apart.
    var head = get(VWH, 'office.decisionHead') || [];
    return items.filter(function (r) { return r.problem && r.spec; })
      .map(function (r) {
        var problem = r.href
          ? '<a href="' + esc(r.href) + '">' + esc(r.problem) + '</a>'
          : esc(r.problem);
        return '<tr>' +
          '<th scope="row">' + problem + '</th>' +
          '<td data-label="' + esc(head[1] || 'Usually specified') + '">' + text(r.spec) + '</td>' +
          '<td class="o-decision__miss" data-label="' + esc(head[2] || 'The common mistake') + '">' +
          text(r.mistake || '') + '</td>' +
          '</tr>';
      }).join('');
  }

  /* Google reviews. Renders nothing at all while the array is empty,
     which is the same discipline as the rest of the file: an unfilled
     block disappears rather than showing a placeholder. `rating` is
     drawn as filled/empty stars with the number also written out, so
     the meaning does not depend on the glyphs rendering. */
  function officeReviews(items) {
    return (items || []).filter(function (r) { return r.quote && String(r.quote).trim(); })
      .map(function (r) {
        var stars = '';
        if (r.rating) {
          var n = Math.max(0, Math.min(5, Math.round(r.rating)));
          stars = '<span class="o-review__stars" aria-label="' + n + ' out of 5">' +
            new Array(n + 1).join('★') + new Array(6 - n).join('☆') + '</span>';
        }
        // Dates are stored at the precision we actually have, which for
        // a Google relative date ("a month ago") is the month. Written
        // out longhand here so the card reads "Google · July 2026"
        // rather than showing the reader an ISO string.
        var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'];
        var when = '';
        if (r.date) {
          var parts = String(r.date).split('-');
          var mi = parseInt(parts[1], 10) - 1;
          when = MONTHS[mi] ? MONTHS[mi] + ' ' + parts[0] : String(r.date);
        }
        var meta = ['Google', r.area, when].filter(Boolean).map(esc).join(' · ');
        // A truncated review says so, and the section's link goes to the
        // profile where the rest of it is.
        var quote = text(r.quote) + (r.partial ? '<span class="o-review__more"> …</span>' : '');
        return '<figure class="o-review reveal">' + stars +
          '<blockquote><p>' + quote + '</p></blockquote>' +
          '<figcaption><strong>' + esc(r.name || 'Google review') + '</strong>' +
          (meta ? '<span>' + meta + '</span>' : '') +
          '</figcaption></figure>';
      }).join('');
  }

  // Fact-bar cells built from {strong, span} arrays (office trust strip).
  function factList(items) {
    return items.map(function (i) {
      return '<div><strong>' + esc(i.strong) + '</strong><span>' + esc(i.span) + '</span></div>';
    }).join('');
  }

  renderers.questions = renderers.why;
  renderers.galleryhome = photoGallery;
  renderers.gallerycurtains = photoGallery;
  renderers.galleryblinds = photoGallery;
  renderers.gallerysoft = photoGallery;
  renderers.galleryhomes = photoGallery;
  renderers.gallerywork = photoGallery;
  renderers.officequick = officeQuick;
  renderers.officedecision = decisionRows;
  renderers.officereviews = officeReviews;
  renderers.officeproblems = officeProblems;
  renderers.officemeet = function (v) { return paras(v); };
  renderers.officechecks = renderers.why;
  renderers.officecase = officeCase;
  renderers.officeguidance = officeGuidance;
  renderers.officeprojects = officeProjects;
  renderers.officeareasprimary = officeAreas;
  renderers.officeprocess = renderers.process;
  renderers.officefaqs = renderers.faqs;
  renderers.officecompare = renderers.comparerows;
  renderers.officeformfields = renderers.formfields;
  renderers.officetrust = factList;
  renderers.cards = cards;
  renderers.ranked = rankedCards;
  renderers.quick = officeQuick;
  renderers.list = renderers.why;
  renderers.related = function (items) {
    return items.map(function (r) {
      return '<a class="o-related__item" href="' + esc(r.href) + '">' +
        '<strong>' + esc(r.label) + '</strong>' +
        (r.note ? '<span>' + esc(r.note) + '</span>' : '') + '</a>';
    }).join('');
  };

  var listKeyMap = {
    services: 'services', faqs: 'faqs',
    testimonials: 'testimonials',
    process: 'process', why: 'whyChoose',
    formfields: 'form.fields',
    questions: 'questionsForSimone',
    galleryhome: 'galleries.home',
    gallerycurtains: 'galleries.curtains',
    galleryblinds: 'galleries.blinds',
    gallerysoft: 'galleries.soft',
    galleryhomes: 'galleries.projectsHomes',
    gallerywork: 'galleries.projectsWork',
    officequick: 'office.quickAnswers',
    officedecision: 'office.decision',
    officereviews: 'office.reviews',
    officeproblems: 'office.problems',
    officemeet: 'office.meet.body',
    officechecks: 'office.specify.checks',
    officecase: 'office.caseStudy.fields',
    officeguidance: 'office.guidance',
    officeprojects: 'office.recentProjects',
    officeareasprimary: 'office.areas.primary',
    officeprocess: 'office.process', officefaqs: 'office.faqs',
    officecompare: 'office.compare', officeformfields: 'office.form.fields',
    officetrust: 'office.trustStrip'
  };

  /* Render one [data-vwh-list] kind against a content object.
     Returns null when there is nothing to draw, which both callers
     read as "leave whatever is already in the page alone".

     Two forms are accepted:

       data-vwh-list="officefaqs"
         a named kind, resolved through listKeyMap above.

       data-vwh-list="cards:triggers.glare.signs"
         renderer name, then the path in content.js to read. The
         trigger-event pages use this form. Three pages with six
         lists each would otherwise mean eighteen more listKeyMap
         entries that say nothing a reader of the HTML could not
         already see. */
  function renderList(kind, VWH) {
    var path = kind, name = kind, colon = kind.indexOf(':');
    if (colon !== -1) {
      name = kind.slice(0, colon);
      path = kind.slice(colon + 1);
    } else {
      path = listKeyMap[kind] || kind;
    }
    var data = get(VWH, path);
    if (!Array.isArray(data) || !renderers[name]) return null;
    return renderers[name](data, VWH);
  }

  return {
    get: get,
    esc: esc,
    paras: paras,
    renderers: renderers,
    listKeyMap: listKeyMap,
    renderList: renderList
  };
});
