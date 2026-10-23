'use client';
import { useEffect, useRef } from 'react';
import s from './zaha.module.css';

// Lime bar along the bottom of the top bar that fills as the page scrolls.
// Also makes in-page links (#demo, #guide …) scroll smoothly and move keyboard focus to the section.
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;

    const update = () => {
      raf = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0})`;
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(update); };

    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target.closest('a[href^="#"]');
      const id = link && decodeURIComponent(link.getAttribute('href').slice(1));
      const target = id && document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      // Absolute position from the real scroll offset, so it lands right even mid-scroll.
      const y = target.getBoundingClientRect().top + window.scrollY;
      if (window.__lenis && !reduced.matches) window.__lenis.scrollTo(y);
      else window.scrollTo({ top: y, behavior: reduced.matches ? 'instant' : 'smooth' });
      history.pushState(null, '', `#${id}`);
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    };

    update();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    document.addEventListener('click', onClick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
      document.removeEventListener('click', onClick);
    };
  }, []);

  return <div ref={barRef} className={s.progress} aria-hidden="true" />;
}
