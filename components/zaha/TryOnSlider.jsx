'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

const clamp = (v) => Math.min(100, Math.max(0, v));

// Before/after compare. Drag, tap or use arrow keys. Starts at 50% without JS.
export default function TryOnSlider({ before, after, labelBefore = 'Before', labelAfter = 'After', label, compact = false, hint = true, className = '' }) {
  const ref = useRef(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const touched = useRef(false);

  const fromEvent = useCallback((e) => {
    const r = ref.current.getBoundingClientRect();
    setPos(clamp(((e.clientX - r.left) / r.width) * 100));
  }, []);

  // One gentle "drag me" sweep the first time it scrolls into view.
  useEffect(() => {
    if (!hint || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const el = ref.current;
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const run = (now) => {
        if (touched.current) return;
        const t = Math.min(1, (now - t0) / 2200);
        setPos(50 + Math.sin(t * Math.PI * 2) * 18 * (1 - t));
        if (t < 1) raf = requestAnimationFrame(run);
      };
      raf = requestAnimationFrame(run);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [hint]);

  const onPointerDown = (e) => {
    touched.current = true;
    dragging.current = true;
    ref.current.setPointerCapture?.(e.pointerId);
    fromEvent(e);
  };
  const onPointerMove = (e) => { if (dragging.current) fromEvent(e); };
  const onPointerUp = () => { dragging.current = false; };
  const onKeyDown = (e) => {
    const step = e.shiftKey ? 10 : 4;
    const map = { ArrowLeft: -step, ArrowDown: -step, ArrowRight: step, ArrowUp: step };
    if (e.key in map) { e.preventDefault(); touched.current = true; setPos((p) => clamp(p + map[e.key])); }
    if (e.key === 'Home') { e.preventDefault(); touched.current = true; setPos(0); }
    if (e.key === 'End') { e.preventDefault(); touched.current = true; setPos(100); }
  };

  return (
    <div
      ref={ref}
      className={`zh-compare ${compact ? 'is-compact' : ''} ${className}`}
      style={{ '--pos': `${pos}%` }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div className="zh-compare__layer zh-compare__after">{after}</div>
      <div className="zh-compare__layer zh-compare__before">{before}</div>
      <span className="zh-compare__tag is-before" aria-hidden="true">{labelBefore}</span>
      <span className="zh-compare__tag is-after" aria-hidden="true">{labelAfter}</span>
      {compact ? (
        // Inside the decorative chat mock: pointer only, kept out of the tab order.
        <div className="zh-compare__handle" aria-hidden="true"><span>‹ ›</span></div>
      ) : (
        <div
          className="zh-compare__handle"
          role="slider"
          tabIndex={0}
          aria-label={label}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)}% ${labelBefore.toLowerCase()}`}
          onKeyDown={onKeyDown}
        >
          <span aria-hidden="true">‹ ›</span>
        </div>
      )}
    </div>
  );
}
