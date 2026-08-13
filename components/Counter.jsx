'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export default function Counter({ value, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [txt, setTxt] = useState(String(value));

  useEffect(() => {
    if (!inView) return;
    const raw = String(value);
    const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (isNaN(num) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setTxt(raw); return; }
    const prefix = raw.match(/^[^0-9.-]*/)[0];
    const suffix = raw.match(/[^0-9.]*$/)[0];
    const dec = (raw.split('.')[1] || '').replace(/[^0-9]/g, '').length;
    let t0, raf;
    const dur = 1500;
    const step = (t) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setTxt(prefix + (num * e).toFixed(dec) + suffix);
      if (p < 1) raf = requestAnimationFrame(step);
      else setTxt(raw);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return <span ref={ref} className={className}>{txt}</span>;
}
