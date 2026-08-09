/* =============================================================
   BrandZaha v2 — core interactions (no library dependency)
   Custom cursor · nav · magnetic buttons · counters · FAQ ·
   marquee · forms · reveal fallback
   ============================================================= */
(function () {
  'use strict';

  const root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('has-js');

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover)').matches;

  /* ---------- Preloader ---------- */
  const pre = document.querySelector('.preloader');
  if (pre) {
    const bar = pre.querySelector('.preloader__bar i');
    const count = pre.querySelector('.preloader__count');
    let p = 0;
    const tick = () => {
      p = Math.min(100, p + Math.random() * 18);
      if (bar) bar.style.width = p + '%';
      if (count) count.textContent = Math.round(p) + '%';
      if (p < 100) { setTimeout(tick, 120); }
      else {
        pre.style.transition = 'opacity .6s ease, visibility .6s';
        pre.style.opacity = '0';
        pre.style.visibility = 'hidden';
        document.body.classList.add('is-loaded');
        setTimeout(() => pre.remove(), 700);
        window.dispatchEvent(new Event('bz:loaded'));
      }
    };
    if (reduce) { pre.remove(); document.body.classList.add('is-loaded'); }
    else { setTimeout(tick, 200); }
  }

  /* ---------- Custom cursor ---------- */
  if (canHover && !reduce) {
    const dot = document.createElement('div');
    const ring = document.createElement('div');
    dot.className = 'cursor-dot';
    ring.className = 'cursor-ring';
    ring.innerHTML = '<span class="cursor-label"></span>';
    document.body.append(dot, ring);
    const label = ring.querySelector('.cursor-label');

    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`; });
    const loop = () => { rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18; ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`; requestAnimationFrame(loop); };
    loop();
    addEventListener('mousedown', () => ring.classList.add('is-down'));
    addEventListener('mouseup', () => ring.classList.remove('is-down'));

    const hoverSel = 'a, button, .tilt, [data-cursor]';
    document.addEventListener('mouseover', (e) => {
      const t = e.target.closest(hoverSel);
      if (t) { ring.classList.add('is-hover'); label.textContent = t.getAttribute('data-cursor') || ''; }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverSel)) { ring.classList.remove('is-hover'); label.textContent = ''; }
    });
  }

  /* ---------- Header scroll behaviour ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 30);
      if (!document.body.classList.contains('nav-open')) {
        header.classList.toggle('is-hidden', y > last && y > 200);
      }
      last = y;
    };
    addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Full-screen menu ---------- */
  const toggle = document.querySelector('.menu-toggle');
  const overlay = document.querySelector('.nav-overlay');
  if (toggle && overlay) {
    const setOpen = (open) => {
      document.body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      overlay.setAttribute('aria-hidden', String(!open));
    };
    toggle.addEventListener('click', () => setOpen(!document.body.classList.contains('nav-open')));
    overlay.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
    addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  }

  /* ---------- Magnetic buttons ---------- */
  if (canHover && !reduce) {
    document.querySelectorAll('[data-magnetic], .btn').forEach((el) => {
      const strength = parseFloat(el.getAttribute('data-magnetic')) || 0.35;
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * strength;
        const y = (e.clientY - r.top - r.height / 2) * strength;
        el.style.transform = `translate(${x}px,${y}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- 3D tilt cards ---------- */
  if (canHover && !reduce) {
    document.querySelectorAll('.tilt').forEach((card) => {
      const max = parseFloat(card.getAttribute('data-tilt')) || 10;
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const rx = (0.5 - py) * max * 2;
        const ry = (px - 0.5) * max * 2;
        card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        card.style.setProperty('--mx', px * 100 + '%');
        card.style.setProperty('--my', py * 100 + '%');
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  /* ---------- Pointer-parallax scenes (e.g. e-commerce hero) ---------- */
  if (canHover && !reduce) {
    document.querySelectorAll('[data-pointer-scene]').forEach((scene) => {
      const layers = scene.querySelectorAll('[data-depth]');
      scene.addEventListener('mousemove', (e) => {
        const r = scene.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        layers.forEach((el) => {
          const d = parseFloat(el.getAttribute('data-depth')) || 10;
          el.style.setProperty('--px', (px * d).toFixed(1) + 'px');
          el.style.setProperty('--py', (py * d).toFixed(1) + 'px');
        });
      });
      scene.addEventListener('mouseleave', () => {
        layers.forEach((el) => { el.style.setProperty('--px', '0px'); el.style.setProperty('--py', '0px'); });
      });
    });
  }

  /* ---------- Reveal on scroll (IntersectionObserver fallback) ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if (reduce || !('IntersectionObserver' in window)) {
      reveals.forEach((el) => el.classList.add('is-in'));
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            const d = en.target.getAttribute('data-delay');
            if (d) en.target.style.transitionDelay = d + 'ms';
            en.target.classList.add('is-in');
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
      reveals.forEach((el) => io.observe(el));
    }
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const run = (el) => {
      const raw = el.getAttribute('data-count');
      const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
      const prefix = raw.match(/^[^0-9.-]*/)[0];
      const suffix = raw.match(/[^0-9.]*$/)[0];
      const dec = (raw.split('.')[1] || '').replace(/[^0-9]/g, '').length;
      if (isNaN(num) || reduce) { el.textContent = raw; return; }
      const dur = 1600; const t0 = performance.now();
      const step = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + (num * e).toFixed(dec) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = raw;
      };
      requestAnimationFrame(step);
    };
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { run(en.target); cio.unobserve(en.target); } });
    }, { threshold: 0.6 });
    counters.forEach((el) => cio.observe(el));
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq__item').forEach((item) => {
    const q = item.querySelector('.faq__q');
    const a = item.querySelector('.faq__a');
    if (!q || !a) return;
    q.setAttribute('aria-expanded', 'false');
    q.addEventListener('click', () => {
      const open = item.classList.toggle('is-open');
      q.setAttribute('aria-expanded', String(open));
      a.style.height = open ? a.scrollHeight + 'px' : '0px';
    });
  });

  /* ---------- CSS marquee (duplicate track for seamless loop) ---------- */
  document.querySelectorAll('.marquee__track').forEach((track) => {
    if (track.dataset.cloned) return;
    track.dataset.cloned = '1';
    const clone = track.firstElementChild ? track.cloneNode(true) : null;
    const speed = parseFloat(track.closest('.marquee').getAttribute('data-speed')) || 40;
    const wrapper = track.parentElement;
    const secondary = track.cloneNode(true);
    wrapper.appendChild(secondary);
    if (!reduce) {
      const kf = `@keyframes bz-marq { to { transform: translateX(-100%); } }`;
      if (!document.getElementById('bz-marq-kf')) {
        const s = document.createElement('style'); s.id = 'bz-marq-kf'; s.textContent = kf; document.head.appendChild(s);
      }
      [track, secondary].forEach((t) => { t.style.animation = `bz-marq ${speed}s linear infinite`; });
    }
  });

  /* ---------- Work filters ---------- */
  const filterBar = document.querySelector('[data-filters]');
  if (filterBar) {
    const items = document.querySelectorAll('[data-cats]');
    filterBar.querySelectorAll('.filter-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        filterBar.querySelectorAll('.filter-chip').forEach((c) => c.classList.remove('is-active'));
        chip.classList.add('is-active');
        const f = chip.getAttribute('data-filter');
        items.forEach((it) => {
          const cats = it.getAttribute('data-cats');
          const show = f === 'all' || cats.includes(f);
          it.style.display = show ? '' : 'none';
        });
        if (window.gsap && window.ScrollTrigger) ScrollTrigger.refresh();
      });
    });
  }

  /* ---------- Forms (AJAX to send_mail.php) ---------- */
  document.querySelectorAll('form[data-ajax]').forEach((form) => {
    const status = form.querySelector('.form-status');
    const btn = form.querySelector('[type="submit"]');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (status) { status.textContent = ''; status.className = 'form-status'; }
      const btnLabel = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      try {
        const res = await fetch(form.getAttribute('action') || '/send_mail.php', {
          method: 'POST',
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
          body: new FormData(form),
        });
        const data = await res.json().catch(() => ({ success: false, message: 'Unexpected response.' }));
        if (status) {
          status.textContent = data.message || (data.success ? 'Thank you — we’ll be in touch shortly.' : 'Something went wrong.');
          status.className = 'form-status ' + (data.success ? 'is-ok' : 'is-err');
        }
        if (data.success) form.reset();
      } catch (err) {
        if (status) { status.textContent = 'Network error — please try again or call us.'; status.className = 'form-status is-err'; }
      } finally {
        if (btn) { btn.disabled = false; btn.textContent = btnLabel; }
      }
    });
  });

  /* ---------- Current year in footer ---------- */
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  /* ---------- Smooth same-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); }
    });
  });
})();
