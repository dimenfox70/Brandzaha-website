'use client';
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setGone(true); return; }
    let p = 0, timer;
    const tick = () => {
      p = Math.min(100, p + Math.random() * 20);
      setPct(Math.round(p));
      if (p < 100) timer = setTimeout(tick, 110);
      else setTimeout(() => setGone(true), 350);
    };
    timer = setTimeout(tick, 150);
    const failsafe = setTimeout(() => setGone(true), 3500);
    return () => { clearTimeout(timer); clearTimeout(failsafe); };
  }, []);

  if (gone) return null;
  return (
    <div className="preloader" aria-hidden="true">
      <div className="preloader__inner">
        <div className="preloader__count">{pct}%</div>
        <div className="preloader__bar"><i style={{ width: pct + '%' }} /></div>
      </div>
    </div>
  );
}
