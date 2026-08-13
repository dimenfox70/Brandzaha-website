'use client';
import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const d = dot.current, r = ring.current, l = label.current;
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, raf;
    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      d.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      const t = e.target.closest('a, button, .tilt, [data-cursor]');
      if (t) { r.classList.add('is-hover'); l.textContent = t.getAttribute('data-cursor') || ''; }
      else { r.classList.remove('is-hover'); l.textContent = ''; }
    };
    const loop = () => { rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18; r.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`; raf = requestAnimationFrame(loop); };
    const down = () => r.classList.add('is-down');
    const up = () => r.classList.remove('is-down');
    loop();
    addEventListener('mousemove', onMove);
    addEventListener('mousedown', down);
    addEventListener('mouseup', up);
    return () => { cancelAnimationFrame(raf); removeEventListener('mousemove', onMove); removeEventListener('mousedown', down); removeEventListener('mouseup', up); };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true"><span ref={label} className="cursor-label" /></div>
    </>
  );
}
