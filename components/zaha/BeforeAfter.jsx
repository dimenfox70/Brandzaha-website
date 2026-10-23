'use client';
import { useEffect, useRef } from 'react';
import s from './zaha.module.css';

// Before / after try-on slider. It sweeps gently on its own until the shopper
// touches it, then follows the drag or the arrow keys.
export default function BeforeAfter() {
  const boxRef = useRef(null);
  const inputRef = useRef(null);
  const touched = useRef(false);

  const set = (v) => boxRef.current.style.setProperty('--p', `${v}%`);

  useEffect(() => {
    const input = inputRef.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let raf = 0;
    let visible = false;
    const t0 = performance.now();
    const sweep = (t) => {
      if (touched.current || !visible) { raf = 0; return; }
      const v = 50 + 28 * Math.sin((t - t0) / 1400);
      input.value = String(v);
      set(v);
      raf = requestAnimationFrame(sweep);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf && !touched.current) raf = requestAnimationFrame(sweep);
    });
    io.observe(input);

    const stop = () => { touched.current = true; };
    const events = ['pointerdown', 'keydown', 'focus'];
    events.forEach((e) => input.addEventListener(e, stop));
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      events.forEach((e) => input.removeEventListener(e, stop));
    };
  }, []);

  return (
    <div ref={boxRef} className={s.ba}>
      <div className={`${s.side} ${s.before}`}>
        <div className={s.fig} style={{ '--g': '#3d3d46' }} aria-hidden="true" />
        <span className={s.lbl}>Your photo</span>
      </div>
      <div className={`${s.side} ${s.after}`}>
        <div className={s.fig} style={{ '--g': '#d8ff36' }} aria-hidden="true" />
        <span className={s.lbl}>Try-on</span>
      </div>
      <input
        ref={inputRef}
        type="range"
        min="0"
        max="100"
        step="1"
        defaultValue="50"
        aria-label="Drag to compare before and after"
        onChange={(e) => { touched.current = true; set(e.target.value); }}
      />
      <div className={s.handle} aria-hidden="true" />
    </div>
  );
}
