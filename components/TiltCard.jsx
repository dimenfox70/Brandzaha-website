'use client';
import { useRef } from 'react';

export default function TiltCard({ children, className = '', max = 8, cursor, style, ...rest }) {
  const ref = useRef(null);
  const move = (e) => {
    const el = ref.current;
    if (!el || !window.matchMedia('(hover: hover)').matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(1000px) rotateX(${(0.5 - py) * max * 2}deg) rotateY(${(px - 0.5) * max * 2}deg)`;
    el.style.setProperty('--mx', px * 100 + '%');
    el.style.setProperty('--my', py * 100 + '%');
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ''; };
  return (
    <div ref={ref} className={`tilt ${className}`} data-cursor={cursor} onMouseMove={move} onMouseLeave={leave} style={style} {...rest}>
      {children}
    </div>
  );
}
