'use client';
import { useEffect, useRef } from 'react';

// Scroll progress bar pinned under the site header, plus smooth in-page anchor links.
export default function PageProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    const header = document.querySelector('.site-header');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;

    const headerBottom = () => (header ? Math.max(0, header.getBoundingClientRect().bottom) : 0);
    const update = () => {
      raf = 0;
      const top = headerBottom();
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.top = `${top}px`;
      bar.style.transform = `scaleX(${p})`;
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(update); };

    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      const id = decodeURIComponent(a.getAttribute('href').slice(1));
      const target = id && document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      // Land with the section's heading just under the header (sections carry big top padding).
      const pad = parseFloat(getComputedStyle(target).paddingTop) || 0;
      const y = Math.max(0, target.getBoundingClientRect().top + window.scrollY + pad - headerBottom() - 40);
      if (window.__lenis && !reduced) window.__lenis.scrollTo(y);
      else window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
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

  return <div ref={barRef} className="zh-progress" aria-hidden="true" />;
}
