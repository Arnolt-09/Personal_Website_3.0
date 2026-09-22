/* =========================================================
   arnolt.id — renders content from /data/*.json, then animates.
   Content lives in the JSON files so it can be edited from /admin
   without touching this code.
   ========================================================= */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const narrow = matchMedia('(max-width: 900px)');
  const gsap = window.gsap;
  // ?still turns every animation off (handy for screenshots)
  const still = new URLSearchParams(location.search).has('still');
  const animate = !!(gsap && window.ScrollTrigger && !reduceMotion && !still);
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const pad = (n) => String(n).padStart(2, '0');

  // Relative paths may contain spaces ("CV/CV Inggris.pdf"); absolute URLs are used as-is.
  const src = (p) => (!p ? '' : /^(https?:)?\/\//.test(p) || p.startsWith('mailto:') ? p : encodeURI(p));

  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === 'class') node.className = v;
      else if (k === 'text') node.textContent = v;
      else if (k === 'dataset') Object.assign(node.dataset, v);
      else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v === true ? '' : v);
    }
    for (const c of children.flat(Infinity)) if (c != null && c !== false) node.append(c);
    return node;
  }

  const img = (path, alt = '', attrs = {}) =>
    el('img', { src: src(path), alt, loading: 'lazy', decoding: 'async', ...attrs });

  /* ---------------- data ---------------- */

  const FILES = ['profile', 'services', 'education', 'projects', 'certificates', 'stack'];

  async function loadData() {
    const data = {};
    await Promise.all(
      FILES.map(async (name) => {
        const res = await fetch(`data/${name}.json`, { cache: 'no-cache' });
        if (!res.ok) throw new Error(`data/${name}.json → ${res.status}`);
        data[name] = await res.json();
      })
    );
    return data;
  }

  /* ---------------- render ---------------- */

  function renderProfile(p) {
    $$('[data-bind]').forEach((n) => {
      const v = p[n.dataset.bind];
      if (v != null) n.textContent = v;
    });
    $$('[data-bind-src]').forEach((n) => {
      const v = p[n.dataset.bindSrc];
      if (v) n.src = src(v);
    });

    const mark = p.wordmark || 'Arnolt';
    $('.nav__mark').textContent = mark;
    $('.preloader__mark span').textContent = mark;

    $('[data-about]').replaceChildren(...(p.about || []).map((t) => el('p', { text: t })));

    $$('[data-cv-view]').forEach((a) => (a.href = src(p.cv_file)));
    $$('[data-cv-download]').forEach((a) => (a.href = src(p.cv_file)));
    $$('[data-mail]').forEach((a) => {
      a.href = `mailto:${p.email}`;
      if (a.hasAttribute('data-mail-text')) a.textContent = p.email;
    });

    $('[data-footer-social]').replaceChildren(
      ...(p.socials || []).map((s) =>
        el('li', {}, el('a', { href: src(s.url), target: '_blank', rel: 'noopener', text: `[ ${s.label} ]` }))
      ),
      el('li', {}, el('a', { href: `mailto:${p.email}`, text: '[ Email ]' }))
    );

    $('[data-footer-mark]').replaceChildren(...[...mark].map((ch) => el('span', { text: ch })));
    $$('[data-year]').forEach((n) => (n.textContent = new Date().getFullYear()));

    const words = p.tape_words && p.tape_words.length ? p.tape_words : [p.role];
    $$('[data-tape]').forEach((t) => fillTape(t, words));
  }

  function fillTape(track, words, repeat = 4) {
    const group = () =>
      el('div', { class: 'tape__group' }, Array.from({ length: repeat }, () => words.map((w) => el('span', { text: w }))));
    track.replaceChildren(group(), group());
  }

  function renderCollages(projects, profile) {
    const covers = projects.map((p) => p.cover).filter(Boolean);
    const gallery = [...new Set(projects.flatMap((p) => [p.cover, ...(p.gallery || [])]).filter(Boolean))];

    // hero collage: chosen in profile.json, topped up with featured project covers
    const featured = projects.filter((p) => p.featured).map((p) => p.cover);
    const heroImgs = [...new Set([...(profile.hero_images || []), ...featured, ...covers])].filter(Boolean).slice(0, 4);
    $('[data-hero-collage]').replaceChildren(
      ...heroImgs.map((c, i) => el('figure', { dataset: { speed: [0.5, 0.9, 0.25, 1.2][i] } }, img(c, '', { loading: 'eager' })))
    );

    // floating decoration (About + big portrait): chosen in profile.json, else other project shots
    const decor = (profile.decor_images || []).filter(Boolean);
    const rest = decor.length ? decor : gallery.filter((g) => !heroImgs.includes(g));
    const pick = (i) => rest[i % Math.max(rest.length, 1)] || covers[i % covers.length];
    $$('[data-float]').forEach((n, i) => (n.src = src(pick(i))));

    $('[data-portrait-floats]').replaceChildren(
      ...[2, 3, 4, 5, 6].map((k, i) => el('figure', { dataset: { speed: [0.6, 1.1, 0.4, 0.9, 1.3][i] } }, img(pick(k))))
    );
  }

  /* services ------------------------------------------------ */

  let setService = () => {};

  function renderServices(items) {
    const list = $('[data-services-list]');
    const band = el('span', { class: 'services__band', 'aria-hidden': 'true' });
    list.replaceChildren(
      ...items.map((s, i) =>
        el(
          'li',
          {},
          el(
            'button',
            { class: 'services__item', type: 'button', 'aria-pressed': 'false', dataset: { i } },
            el('small', { text: `(${pad(i + 1)})` }),
            el('span', { class: 'dots', 'aria-hidden': 'true' }),
            el('span', { text: s.title }),
            el('span', { class: 'dots', 'aria-hidden': 'true' })
          )
        )
      )
    );
    list.before(band);

    const buttons = $$('.services__item', list);
    const card = $('[data-services-card]');
    const bg = $('[data-services-img]');
    const title = $('[data-services-title]');
    const deliver = $('[data-services-deliver]');
    let current = -1;

    const placeBand = (instant) => {
      const b = buttons[current];
      if (!b) return;
      const top = b.offsetTop;
      const height = b.offsetHeight;
      if (animate && !instant) gsap.to(band, { y: top, height, duration: 0.6, ease: 'expo.out' });
      else Object.assign(band.style, { transform: `translateY(${top}px)`, height: `${height}px` });
    };

    const fill = (s) => {
      bg.src = src(s.image);
      title.textContent = s.summary;
      deliver.replaceChildren(...(s.deliverables || []).map((d) => el('li', { text: d })));
    };

    setService = (i, instant = false) => {
      if (i === current || !items[i]) return;
      current = i;
      buttons.forEach((b, k) => {
        b.classList.toggle('is-active', k === i);
        b.setAttribute('aria-pressed', String(k === i));
      });
      placeBand(instant);
      if (animate && !instant) {
        gsap.timeline()
          .to([title, deliver], { opacity: 0, y: 8, duration: 0.18, ease: 'power1.in' })
          .add(() => fill(items[i]))
          .fromTo(bg, { scale: 1.14, opacity: 0.4 }, { scale: 1.06, opacity: 1, duration: 0.9, ease: 'expo.out' })
          .to([title, deliver], { opacity: 1, y: 0, duration: 0.45, ease: 'expo.out', stagger: 0.05 }, '<');
      } else fill(items[i]);
    };

    buttons.forEach((b, i) => {
      b.addEventListener('click', () => setService(i));
      b.addEventListener('focus', () => setService(i));
      if (finePointer) b.addEventListener('mouseenter', () => setService(i));
    });
    window.addEventListener('resize', () => placeBand(true));
    if (document.fonts) document.fonts.ready.then(() => placeBand(true));
    setService(Math.min(1, items.length - 1), true);
    card.hidden = !items.length;
  }

  /* education ------------------------------------------------ */

  function renderEducation(edu) {
    $('[data-edu-title]').textContent = edu.title || '';
    $('[data-edu-intro]').textContent = edu.intro || '';
    $('[data-edu-list]').replaceChildren(
      ...(edu.items || []).map((e) =>
        el(
          'li',
          { class: 'step' },
          el('h3', { class: 'step__name', text: e.school }),
          el(
            'div',
            { class: 'step__body' },
            el('span', { class: 'step__meta', text: [e.program, e.years].filter(Boolean).join('  ·  ') }),
            e.description && el('p', { text: e.description }),
            e.map_url && el('a', { class: 'step__map', href: src(e.map_url), target: '_blank', rel: 'noopener', text: 'View location ↗' })
          )
        )
      )
    );
    if (!animate) $$('.step').forEach((s) => s.classList.add('is-active'));
  }

  /* work ------------------------------------------------ */

  function renderWork(projects) {
    const list = $('[data-work-list]');
    list.replaceChildren(
      ...projects.map((p, i) =>
        el(
          'li',
          { class: 'work__row', dataset: { cat: (p.category || 'Other').toLowerCase(), i } },
          el(
            'button',
            { class: 'work__link', type: 'button', dataset: { cursor: 'View' }, 'aria-haspopup': 'dialog' },
            el('span', { class: 'work__thumb' }, img(p.cover, '')),
            el('span', { class: 'work__idx', text: `(${pad(i + 1)})` }),
            el('span', { class: 'work__name', text: p.title }),
            el('span', { class: 'work__cat', text: [p.category, p.role].filter(Boolean).join(' — ') }),
            el('span', { class: 'work__year', text: p.year }),
            el('span', { class: 'work__arrow', 'aria-hidden': 'true', text: '↗' })
          )
        )
      )
    );

    $$('.work__row', list).forEach((row) => {
      const p = projects[+row.dataset.i];
      $('.work__link', row).addEventListener('click', () =>
        openViewer({
          kicker: [p.category, p.year].filter(Boolean).join(' · '),
          title: p.title,
          text: p.summary,
          meta: p.role,
          tags: p.tags,
          images: p.gallery && p.gallery.length ? p.gallery : [p.cover],
          links: [
            p.live_url && { href: p.live_url, text: '[ Visit site ↗ ]' },
            p.repo_url && { href: p.repo_url, text: '[ Source code ↗ ]' },
          ].filter(Boolean),
        })
      );
    });

    // filters
    const cats = [];
    projects.forEach((p) => {
      const c = p.category || 'Other';
      if (!cats.includes(c)) cats.push(c);
    });
    const filters = $('[data-filters]');
    const makeBtn = (label, value, count) =>
      el('button', { type: 'button', 'aria-pressed': String(value === 'all'), dataset: { value } }, label, el('sup', { text: count }));
    filters.replaceChildren(
      makeBtn('All', 'all', projects.length),
      ...cats.map((c) => makeBtn(c, c.toLowerCase(), projects.filter((p) => (p.category || 'Other') === c).length))
    );
    filters.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      $$('button', filters).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      const v = b.dataset.value;
      const rows = $$('.work__row', list);
      rows.forEach((r) => (r.hidden = !(v === 'all' || r.dataset.cat === v)));
      if (animate) {
        gsap.fromTo(rows.filter((r) => !r.hidden), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.04, ease: 'expo.out' });
        ScrollTrigger.refresh();
      }
    });

    if (finePointer && animate) workPreview(list, projects);
  }

  function workPreview(list, projects) {
    const box = $('[data-work-preview]');
    const inner = $('.work__preview-inner', box);
    const xTo = gsap.quickTo(box, 'x', { duration: 0.6, ease: 'power3' });
    const yTo = gsap.quickTo(box, 'y', { duration: 0.6, ease: 'power3' });
    const pointer = { x: -1, y: -1, known: false };
    let shown = -1;

    const hide = () => {
      if (shown === -1) return;
      shown = -1;
      gsap.to(box, { opacity: 0, scale: 0.8, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
    };

    const show = (row) => {
      const i = +row.dataset.i;
      if (i === shown) return;
      // appear right at the pointer, never at the corner of the screen
      if (shown === -1) {
        xTo(pointer.x, pointer.x);
        yTo(pointer.y, pointer.y);
      }
      shown = i;
      const pic = img(projects[i].cover, '', { loading: 'eager' });
      inner.append(pic);
      gsap.fromTo(pic, { clipPath: 'inset(100% 0 0 0)', scale: 1.15 }, { clipPath: 'inset(0% 0 0 0)', scale: 1, duration: 0.6, ease: 'expo.out' });
      while (inner.children.length > 3) inner.firstElementChild.remove();
      gsap.to(box, { opacity: 1, scale: 1, duration: 0.4, ease: 'expo.out', overwrite: 'auto' });
    };

    // decide from the real pointer position, not from hover events
    const update = () => {
      if (!pointer.known || viewer.open) return hide();
      const under = document.elementFromPoint(pointer.x, pointer.y);
      const row = under && under.closest('.work__row');
      if (row && list.contains(row) && !row.hidden) show(row);
      else hide();
    };

    window.addEventListener('pointermove', (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.known = true;
      if (shown !== -1) {
        xTo(pointer.x);
        yTo(pointer.y);
      }
      update();
    }, { passive: true });
    window.addEventListener('scroll', update, { passive: true });
    list.addEventListener('click', hide);
    document.documentElement.addEventListener('mouseleave', () => {
      pointer.known = false;
      hide();
    });
    window.addEventListener('blur', hide);
  }

  /* certificates ------------------------------------------------ */

  function renderCerts(items) {
    const list = $('[data-cert-list]');
    const pic = $('[data-cert-img]');
    const issuer = $('[data-cert-issuer]');
    const desc = $('[data-cert-desc]');
    const tags = $('[data-cert-tags]');
    let current = -1;

    list.replaceChildren(
      ...items.map((c, i) =>
        el(
          'li',
          {},
          el(
            'button',
            { type: 'button', dataset: { i, cursor: 'Open' }, 'aria-pressed': 'false' },
            el('small', { text: `(${pad(i + 1)})` }),
            el('span', { text: c.title }),
            el('em', { text: c.year })
          )
        )
      )
    );
    const buttons = $$('button', list);

    const open = (c) =>
      openViewer({
        kicker: ['Certificate', c.year].filter(Boolean).join(' · '),
        title: c.title,
        meta: c.issuer,
        text: c.description,
        tags: c.tags,
        images: [c.image, ...(c.more_images || [])].filter(Boolean),
        links: [
          c.verify_url && { href: c.verify_url, text: '[ Verify certificate ↗ ]' },
          { href: c.image, text: '[ Open full image ↗ ]' },
        ].filter(Boolean),
      });

    const set = (i) => {
      if (i === current) return;
      current = i;
      const c = items[i];
      buttons.forEach((b, k) => {
        b.classList.toggle('is-active', k === i);
        b.setAttribute('aria-pressed', String(k === i));
      });
      pic.alt = `${c.title} certificate`;
      issuer.textContent = [c.issuer, c.year].filter(Boolean).join(' · ');
      desc.textContent = c.description || '';
      tags.replaceChildren(...(c.tags || []).map((t) => el('li', { text: t })));
      if (animate) {
        gsap.timeline()
          .to(pic, { opacity: 0, duration: 0.15 })
          .add(() => (pic.src = src(c.image)))
          .fromTo(pic, { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'expo.out' });
      } else pic.src = src(c.image);
    };

    buttons.forEach((b, i) => {
      if (finePointer) b.addEventListener('mouseenter', () => set(i));
      b.addEventListener('focus', () => set(i));
      b.addEventListener('click', () => {
        if (narrow.matches || current === i) open(items[i]);
        set(i);
      });
    });
    $('[data-cert-open]').addEventListener('click', () => current >= 0 && open(items[current]));
    $('[data-cert-open]').dataset.cursor = 'Open';
    if (items.length) set(0);
    else $('#certificates').hidden = true;
  }

  /* stack ------------------------------------------------ */

  function renderStack(stack) {
    const groups = stack.groups || [];
    $('[data-stack]').replaceChildren(
      ...groups.map((g, i) =>
        el(
          'div',
          { class: 'stack__group' },
          el('h3', { text: `(${pad(i + 1)}) ${g.name}` }),
          el('ul', { class: 'stack__items' }, (g.items || []).map((t) => el('li', { text: t })))
        )
      )
    );
    const all = groups.flatMap((g) => g.items || []);
    fillTape($('[data-tape-stack]'), all, 1);
  }

  function renderFooter(services) {
    $('[data-footer-services]').replaceChildren(
      ...services.map((s) => el('li', {}, el('a', { href: '#services', text: `[ ${s.title} ]` })))
    );
  }

  /* ---------------- viewer (dialog) ---------------- */

  const viewer = $('[data-viewer]');
  let lenis = null;

  function openViewer({ kicker, title, meta, text, tags = [], images = [], links = [] }) {
    const main = $('[data-viewer-img]', viewer);
    const thumbs = $('[data-viewer-thumbs]', viewer);
    $('[data-viewer-kicker]', viewer).textContent = kicker || '';
    $('[data-viewer-title]', viewer).textContent = title || '';
    $('[data-viewer-text]', viewer).textContent = [meta, text].filter(Boolean).join(' — ');
    $('[data-viewer-tags]', viewer).replaceChildren(...tags.map((t) => el('li', { text: t })));
    $('[data-viewer-links]', viewer).replaceChildren(
      ...links.map((l) => el('a', { class: 'btn', href: src(l.href), target: '_blank', rel: 'noopener', text: l.text }))
    );

    const show = (i) => {
      main.src = src(images[i]);
      main.alt = `${title} — image ${i + 1} of ${images.length}`;
      $$('button', thumbs).forEach((b, k) => b.setAttribute('aria-current', String(k === i)));
    };
    thumbs.replaceChildren(
      ...(images.length > 1
        ? images.map((im, i) =>
            el('button', { type: 'button', 'aria-label': `Show image ${i + 1}`, onclick: () => show(i) }, img(im, ''))
          )
        : [])
    );
    show(0);

    if (typeof viewer.showModal === 'function') viewer.showModal();
    else viewer.setAttribute('open', '');
    lenis && lenis.stop();
    if (animate) gsap.fromTo(viewer, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' });
  }

  function closeViewer() {
    if (viewer.open) viewer.close();
  }

  viewer.addEventListener('close', () => lenis && lenis.start());
  document.addEventListener('keydown', (e) => e.key === 'Escape' && viewer.open && closeViewer());
  viewer.addEventListener('click', (e) => e.target === viewer && closeViewer());
  $('[data-viewer-close]').addEventListener('click', closeViewer);

  /* ---------------- navigation ---------------- */

  function scrollToHash(hash, instant = false) {
    const target = hash === '#home' ? 0 : $(hash);
    if (target == null) return;
    if (lenis) return lenis.scrollTo(target, instant ? { immediate: true, force: true } : { duration: 1.4 });
    const top = target === 0 ? 0 : target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: instant || reduceMotion ? 'auto' : 'smooth' });
  }

  function initNav() {
    const menu = $('#menu');
    const toggle = $('.nav__toggle');
    const setMenu = (open) => {
      menu.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? '[ Close ]' : '[ Menu ]';
      document.body.style.overflow = open ? 'hidden' : '';
      if (lenis) open ? lenis.stop() : lenis.start();
      if (open && animate) gsap.from($$('a', menu), { yPercent: 60, opacity: 0, stagger: 0.04, duration: 0.6, ease: 'expo.out' });
    };
    toggle.addEventListener('click', () => setMenu(menu.hidden));
    document.addEventListener('keydown', (e) => e.key === 'Escape' && !menu.hidden && setMenu(false));

    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute('href');
      if (hash.length < 2) return;
      // scroll only; the address bar stays clean (no #about, #work, ...)
      e.preventDefault();
      if (!menu.hidden) setMenu(false);
      scrollToHash(hash);
    });

    // hide header on scroll down, show on scroll up
    const nav = $('[data-nav]');
    let last = 0;
    const onScroll = (y) => {
      nav.classList.toggle('is-hidden', y > 240 && y > last && menu.hidden);
      last = y;
    };
    if (lenis) lenis.on('scroll', ({ scroll }) => onScroll(scroll));
    else window.addEventListener('scroll', () => onScroll(window.scrollY), { passive: true });
  }

  /* ---------------- contact form ---------------- */

  // Sends the message to my inbox through Web3Forms (a public "access key", not a secret).
  // Without a key it falls back to opening the visitor's email app with everything filled in.
  function initContactForm(p) {
    const form = $('[data-contact-form]');
    if (!form) return;
    const f = form.elements;
    const status = $('[data-form-status]', form);
    const button = $('button[type="submit"]', form);
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const say = (content, kind = '') => {
      status.replaceChildren(...[].concat(content));
      status.dataset.kind = kind;
    };
    const mailto = (d) =>
      `mailto:${p.email}?subject=${encodeURIComponent(`Message from ${d.name} via arnolt.id`)}` +
      `&body=${encodeURIComponent(`${d.message}\n\n— ${d.name} (${d.email})`)}`;

    ['name', 'email', 'message'].forEach((n) => f.namedItem(n).addEventListener('input', (e) => e.target.removeAttribute('aria-invalid')));

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (f.namedItem('botcheck').checked) return; // a bot filled the hidden box

      const d = {
        name: f.namedItem('name').value.trim(),
        email: f.namedItem('email').value.trim(),
        message: f.namedItem('message').value.trim(),
      };
      const problems = [
        [!d.name, 'name', 'Please tell me your name.'],
        [!EMAIL_RE.test(d.email), 'email', 'Please enter a valid email so I can reply.'],
        [d.message.length < 5, 'message', 'Please write a short message.'],
      ].filter(([bad]) => bad);
      ['name', 'email', 'message'].forEach((n) => f.namedItem(n).removeAttribute('aria-invalid'));
      if (problems.length) {
        problems.forEach(([, n]) => f.namedItem(n).setAttribute('aria-invalid', 'true'));
        f.namedItem(problems[0][1]).focus();
        return say(problems[0][2], 'error');
      }

      if (!p.form_key) {
        say('Opening your email app…');
        window.location.href = mailto(d);
        return;
      }

      button.disabled = true;
      say('Sending…');
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: p.form_key,
            subject: `New message from ${d.name} — arnolt.id`,
            from_name: 'arnolt.id contact form',
            name: d.name,
            email: d.email,
            message: d.message,
            botcheck: false,
          }),
        });
        const out = await res.json().catch(() => ({}));
        if (!res.ok || !out.success) throw new Error(out.message || `HTTP ${res.status}`);
        form.reset();
        say("Thanks! Your message has been sent. I'll reply to your email soon.", 'ok');
      } catch (err) {
        console.error('Contact form:', err);
        say(['Sorry, the message could not be sent. ', el('a', { href: mailto(d), text: 'Email me instead' })], 'error');
      } finally {
        button.disabled = false;
      }
    });
  }

  // Scale the giant footer wordmark so it spans the full width.
  function fitFooterMark() {
    const mark = $('[data-footer-mark]');
    const fit = () => {
      mark.style.fontSize = '';
      const spans = $$('span', mark);
      const used = spans.reduce((w, s) => w + s.getBoundingClientRect().width, 0);
      if (!used) return;
      const size = parseFloat(getComputedStyle(mark).fontSize);
      mark.style.fontSize = `${(size * mark.clientWidth * 0.985) / used}px`;
    };
    fit();
    window.addEventListener('resize', fit);
    return fit;
  }

  /* ---------------- cursor & magnetic ---------------- */

  function initCursor() {
    if (!finePointer || !animate) return;
    document.documentElement.classList.add('has-cursor');
    const cur = $('.cursor');
    const label = $('.cursor__label');
    const xTo = gsap.quickTo(cur, 'x', { duration: 0.35, ease: 'power3' });
    const yTo = gsap.quickTo(cur, 'y', { duration: 0.35, ease: 'power3' });
    let seen = false;
    gsap.set(cur, { opacity: 0 }); // hidden until the mouse actually moves
    window.addEventListener('pointermove', (e) => {
      if (!seen) {
        seen = true;
        xTo(e.clientX, e.clientX);
        yTo(e.clientY, e.clientY);
        gsap.to(cur, { opacity: 1, duration: 0.2 });
        return;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    });
    document.addEventListener('mouseover', (e) => {
      const t = e.target.closest('[data-cursor]');
      cur.classList.toggle('is-big', !!t);
      label.textContent = t ? t.dataset.cursor : '';
    });
    document.addEventListener('mouseleave', () => gsap.to(cur, { opacity: 0, duration: 0.2 }));
    document.addEventListener('mouseenter', () => gsap.to(cur, { opacity: 1, duration: 0.2 }));
  }

  function initMagnetic() {
    if (!finePointer || !animate) return;
    $$('[data-magnetic]').forEach((b) => {
      const xTo = gsap.quickTo(b, 'x', { duration: 0.5, ease: 'elastic.out(1, 0.4)' });
      const yTo = gsap.quickTo(b, 'y', { duration: 0.5, ease: 'elastic.out(1, 0.4)' });
      b.addEventListener('mousemove', (e) => {
        const r = b.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
      });
      b.addEventListener('mouseleave', () => {
        xTo(0);
        yTo(0);
      });
    });
  }

  /* ---------------- animations ---------------- */

  function initSmoothScroll() {
    if (!animate || !window.Lenis) return;
    lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  function initTapes() {
    const tracks = $$('[data-tape], [data-tape-stack]');
    if (!animate) return;
    const tweens = tracks.map((t) => {
      const rev = t.hasAttribute('data-reverse');
      const tw = gsap.fromTo(t, { xPercent: rev ? -50 : 0 }, { xPercent: rev ? 0 : -50, duration: t.hasAttribute('data-tape-stack') ? 60 : 38, ease: 'none', repeat: -1 });
      tw.totalTime(tw.duration() * 500); // far from 0 so it can also run backwards
      return tw;
    });
    // scrolling speeds the tapes up and flips their direction with the scroll direction
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate(self) {
        const boost = Math.min(1 + Math.abs(self.getVelocity()) / 600, 6);
        tweens.forEach((tw) => {
          gsap.killTweensOf(tw);
          tw.timeScale(self.direction * boost);
          gsap.to(tw, { timeScale: self.direction, duration: 1.2, ease: 'power2.out', delay: 0.05 });
        });
      },
    });
  }

  function splitWords(target) {
    if (window.SplitText) return window.SplitText.create(target, { type: 'words' }).words;
    return [target];
  }

  function initScrollAnimations() {
    if (!animate) return;
    const ST = window.ScrollTrigger;

    // hero: words drift apart, collage floats upward at different speeds
    gsap.to('.hero__word--left', { xPercent: -14, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero__word--right', { xPercent: 14, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    $$('.hero__collage figure').forEach((f) => {
      gsap.to(f, { y: () => -window.innerHeight * 0.25 * +f.dataset.speed, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    });

    // generic parallax
    $$('[data-parallax]').forEach((n) => {
      const s = parseFloat(n.dataset.parallax) || 0.2;
      gsap.fromTo(n, { y: () => -s * 300 }, { y: () => s * 300, ease: 'none', scrollTrigger: { trigger: n.parentElement, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true } });
    });

    // big statements light up word by word
    $$('[data-reveal-words]').forEach((h) => {
      const words = splitWords(h);
      gsap.fromTo(words, { opacity: 0.12 }, { opacity: 1, stagger: 0.08, ease: 'none', scrollTrigger: { trigger: h, start: 'top 82%', end: 'bottom 42%', scrub: true } });
    });

    // simple fade-ups
    const ups = '.label, .work__title, .stack__title, .cv__title, .justify-title, .footer__title, .statement__foot, .services__card, .cv__doc, .education__aside .frame, .certs__preview, .certs__meta, .filters, .cv__text > .small-text, .cv__actions, .contact-form';
    $$(ups).forEach((n) => {
      gsap.from(n, { y: 50, opacity: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: n, start: 'top 90%', once: true } });
    });

    // services list items slide in
    gsap.from('.services__item', { x: -40, opacity: 0, stagger: 0.07, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: '.services__list', start: 'top 80%', once: true } });

    // education steps light up as they pass the middle of the screen
    $$('.step').forEach((s) => {
      ST.create({ trigger: s, start: 'top 72%', end: 'bottom 28%', toggleClass: 'is-active' });
    });

    // work rows, certificate titles, stack words
    ST.batch('.work__row, .big-list li', {
      start: 'top 92%',
      once: true,
      onEnter: (batch) => gsap.from(batch, { y: 40, opacity: 0, stagger: 0.06, duration: 0.9, ease: 'expo.out' }),
    });
    $$('.stack__items').forEach((ul) => {
      gsap.from(ul.children, { yPercent: 60, opacity: 0, stagger: 0.035, duration: 0.8, ease: 'expo.out', scrollTrigger: { trigger: ul, start: 'top 88%', once: true } });
    });

    // portrait rises, floating cards drift
    gsap.fromTo('.portrait__img', { yPercent: 14, scale: 1.06 }, { yPercent: 0, scale: 1, ease: 'none', scrollTrigger: { trigger: '.portrait', start: 'top bottom', end: 'bottom bottom', scrub: true } });
    $$('.portrait__floats figure').forEach((f) => {
      gsap.fromTo(f, { y: () => 160 * +f.dataset.speed }, { y: () => -160 * +f.dataset.speed, ease: 'none', scrollTrigger: { trigger: '.portrait', start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true } });
    });

    // CV page tilts upright
    gsap.fromTo('.cv__doc', { rotate: 8 }, { rotate: 3, ease: 'none', scrollTrigger: { trigger: '.cv', start: 'top bottom', end: 'center center', scrub: true } });

    // giant footer wordmark
    gsap.from('.footer__mark span', { yPercent: 100, stagger: 0.06, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: '.footer__mark', start: 'top 95%', once: true } });

    // images that load late change heights → recalc triggers
    $$('img').forEach((i) => !i.complete && i.addEventListener('load', () => ST.refresh(), { once: true }));
  }

  function heroIntro() {
    if (!animate) return;
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    let chars = $$('.hero__word');
    if (window.SplitText) {
      chars = $$('.hero__word').flatMap((w) => window.SplitText.create(w, { type: 'chars', mask: 'chars' }).chars);
    }
    tl.from(chars, { yPercent: 110, duration: 1.2, stagger: 0.03 })
      .from('.hero__rule', { scaleX: 0, duration: 1.4, ease: 'expo.inOut' }, 0)
      .from('.hero__collage figure', { y: 140, opacity: 0, scale: 0.85, rotate: (i) => [-6, 5, -3, 7][i % 4], duration: 1.4, stagger: 0.1 }, 0.1)
      .from('.hero__intro, .hero__side, .hero__actions', { y: 30, opacity: 0, duration: 1, stagger: 0.08 }, 0.5)
      .from('.hero .tapes', { yPercent: 60, opacity: 0, duration: 1.2 }, 0.4)
      .from('.nav', { y: -30, opacity: 0, duration: 1, clearProps: 'transform,opacity' }, 0.4);
    return tl;
  }

  /* ---------------- preloader ---------------- */

  function imagesReady(scope, timeout = 4000) {
    const imgs = $$('img', scope).filter((i) => i.src && !i.complete);
    const all = Promise.all(imgs.map((i) => new Promise((r) => { i.addEventListener('load', r, { once: true }); i.addEventListener('error', r, { once: true }); })));
    return Promise.race([all, wait(timeout)]);
  }

  async function runPreloader(ready) {
    const pre = $('.preloader');
    const count = $('[data-count]', pre);
    if (!animate) {
      await ready;
      pre.remove();
      return;
    }
    const n = { v: 0 };
    const start = performance.now();
    gsap.from('.preloader__mark span', { yPercent: 110, duration: 0.9, ease: 'expo.out' });
    const climb = gsap.to(n, { v: 88, duration: 2.2, ease: 'power2.out', onUpdate: () => (count.textContent = Math.round(n.v)) });
    await ready;
    const elapsed = performance.now() - start;
    if (elapsed < 1100) await wait(1100 - elapsed);
    climb.kill();
    await gsap.to(n, { v: 100, duration: 0.35, ease: 'power1.out', onUpdate: () => (count.textContent = Math.round(n.v)) });
    const out = gsap.timeline();
    out.to('.preloader__mark span', { yPercent: -110, duration: 0.55, ease: 'expo.in' })
      .to('.preloader__count', { opacity: 0, duration: 0.3 }, '<')
      .to(pre, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '-=0.1')
      .add(() => pre.remove());
    await wait(900);
  }

  /* ---------------- boot ---------------- */

  function showError(err) {
    console.error(err);
    const pre = $('.preloader');
    if (pre) pre.remove();
    const hint = location.protocol === 'file:'
      ? 'Open this site through a web server (for example Laragon: http://arnolt.test), not by double-clicking the file.'
      : 'Something went wrong while loading the content. Please refresh the page.';
    $('main').prepend(el('p', { class: 'noscript', role: 'alert', text: hint }));
  }

  async function boot() {
    // links from outside (e.g. old CV.html → /#cv) still land on the right section,
    // but the # is removed from the address bar right away
    const startHash = location.hash.length > 1 ? location.hash : '';
    if (startHash) history.replaceState(null, '', location.pathname + location.search);

    if (animate) gsap.registerPlugin(ScrollTrigger, ...(window.SplitText ? [window.SplitText] : []));

    let data;
    try {
      data = await loadData();
    } catch (err) {
      showError(err);
      return;
    }

    renderProfile(data.profile);
    renderCollages(data.projects.items || [], data.profile);
    renderServices(data.services.items || []);
    renderEducation(data.education || {});
    renderWork(data.projects.items || []);
    renderCerts(data.certificates.items || []);
    renderStack(data.stack || {});
    renderFooter(data.services.items || []);
    initContactForm(data.profile);

    const ready = Promise.all([document.fonts ? document.fonts.ready : null, imagesReady($('.hero'))]);

    initSmoothScroll();
    initNav();
    const fitMark = fitFooterMark();
    ready.then(fitMark);
    // jump to the requested section while the loading screen still covers the page
    if (startHash) ready.then(() => scrollToHash(startHash, true));

    await runPreloader(ready);

    heroIntro();
    initTapes();
    initScrollAnimations();
    initCursor();
    initMagnetic();

    if (startHash && animate) ScrollTrigger.refresh();
    window.addEventListener('load', () => animate && ScrollTrigger.refresh());
  }

  boot();
})();
