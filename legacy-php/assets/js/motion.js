/* =============================================================
   BrandZaha v2 — motion layer (GSAP + Lenis + Splitting)
   Loaded after libraries. Everything here is progressive
   enhancement — the site is fully functional without it.
   ============================================================= */
(function () {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined';

  if (reduce || !hasGSAP) return;

  const { gsap } = window;
  if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);
  const ST = window.ScrollTrigger;

  /* ---------- Lenis smooth scroll ---------- */
  let lenis = null;
  if (typeof window.Lenis !== 'undefined') {
    lenis = new window.Lenis({ duration: 1.1, smoothWheel: true, lerp: 0.1 });
    lenis.on('scroll', () => { if (ST) ST.update(); });
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    document.documentElement.classList.add('lenis');
    // pause Lenis while the full-screen menu is open
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) menuToggle.addEventListener('click', () => {
      setTimeout(() => { document.body.classList.contains('nav-open') ? lenis.stop() : lenis.start(); }, 10);
    });
  }

  const start = () => {
    /* ---------- Split-text hero reveal ---------- */
    if (typeof window.Splitting !== 'undefined') {
      window.Splitting({ target: '[data-split]', by: 'chars' });
    }
    document.querySelectorAll('[data-split]').forEach((el) => {
      const chars = el.querySelectorAll('.char, .word');
      const targets = chars.length ? chars : [el];
      gsap.set(el, { perspective: 800 });
      gsap.from(targets, {
        yPercent: 120, rotateX: -80, opacity: 0,
        transformOrigin: '0% 50% -40px',
        stagger: 0.02, duration: 1, ease: 'power4.out',
        scrollTrigger: el.hasAttribute('data-split-hero') ? undefined : { trigger: el, start: 'top 85%' },
        delay: el.hasAttribute('data-split-hero') ? 0.2 : 0,
      });
    });

    /* ---------- Nav menu staggered link reveal ---------- */
    const navLinks = document.querySelectorAll('.nav-menu a');
    if (navLinks.length) {
      gsap.set(navLinks, { yPercent: 120, rotateX: -40, opacity: 0 });
      const toggle = document.querySelector('.menu-toggle');
      toggle && toggle.addEventListener('click', () => {
        if (document.body.classList.contains('nav-open')) {
          gsap.to(navLinks, { yPercent: 0, rotateX: 0, opacity: 1, stagger: 0.06, duration: 0.8, ease: 'power4.out', delay: 0.25 });
        } else {
          gsap.to(navLinks, { yPercent: 120, opacity: 0, duration: 0.4, ease: 'power2.in' });
        }
      });
    }

    if (!ST) return;

    /* ---------- Generic parallax ---------- */
    document.querySelectorAll('[data-parallax]').forEach((el) => {
      const amt = parseFloat(el.getAttribute('data-parallax')) || 0.2;
      gsap.to(el, {
        yPercent: -amt * 100, ease: 'none',
        scrollTrigger: { trigger: el.closest('[data-parallax-wrap]') || el, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });

    /* ---------- Hero image / poster 3D unfold ---------- */
    document.querySelectorAll('[data-unfold]').forEach((el) => {
      gsap.from(el, {
        rotateX: 35, scale: 1.15, transformOrigin: 'center top', opacity: 0,
        duration: 1.4, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%' },
      });
    });

    /* ---------- Horizontal project strip (Home) ---------- */
    const hstrip = document.querySelector('[data-hstrip]');
    if (hstrip && window.innerWidth > 820) {
      const track = hstrip.querySelector('.hstrip__track');
      const prog = hstrip.querySelector('.hstrip__progress i');
      const dist = () => track.scrollWidth - window.innerWidth + 120;
      gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: {
          trigger: hstrip, start: 'top top', end: () => '+=' + dist(),
          scrub: 1, pin: true, invalidateOnRefresh: true,
          onUpdate: (self) => { if (prog) prog.style.width = (self.progress * 100) + '%'; },
        },
      });
    }

    /* ---------- Pinned showcase depth (project detail) ---------- */
    document.querySelectorAll('[data-pin-scale]').forEach((el) => {
      gsap.fromTo(el.querySelector('img, .work-card__poster') || el,
        { scale: 1.25 }, {
          scale: 1, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'top top', scrub: true },
        });
    });

    /* ---------- Section pin quote (subtle) ---------- */
    document.querySelectorAll('[data-fade-scrub]').forEach((el) => {
      gsap.fromTo(el, { opacity: 0.25 }, {
        opacity: 1, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'top 40%', scrub: true },
      });
    });

    ST.refresh();
  };

  window.addEventListener('bz:loaded', start);
  // fallback if preloader already gone / disabled
  if (document.body.classList.contains('is-loaded')) start();
  else setTimeout(() => { if (!document.body.classList.contains('is-loaded')) start(); }, 2500);

  /* ---------- Page transition curtain (PJAX-lite) ---------- */
  const curtain = document.querySelector('.curtain');
  if (curtain) {
    const spans = curtain.querySelectorAll('span');
    const cover = () => gsap.timeline()
      .set(curtain, { pointerEvents: 'all' })
      .set(spans, { transformOrigin: 'bottom', scaleY: 0 })
      .to(spans, { scaleY: 1, stagger: 0.06, duration: 0.5, ease: 'power3.inOut' });
    const reveal = () => gsap.timeline()
      .set(spans, { transformOrigin: 'top' })
      .to(spans, { scaleY: 0, stagger: 0.06, duration: 0.5, ease: 'power3.inOut' })
      .set(curtain, { pointerEvents: 'none' });

    // Reveal on load
    window.addEventListener('bz:loaded', reveal);

    // Intercept internal links for smooth wipe transition
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || a.target === '_blank' || a.hasAttribute('data-no-transition')) return;
      if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http')) return;
      if (a.hostname && a.hostname !== location.hostname) return;
      e.preventDefault();
      cover().then(() => { window.location.href = href; });
    });
  }
})();
