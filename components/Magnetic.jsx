'use client';
import { useRef } from 'react';

export default function Magnetic({ children, strength = 0.35, className }) {
  const ref = useRef(null);
  const move = (e) => {
    const el = ref.current;
    if (!el || !window.matchMedia('(hover: hover)').matches) return;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * strength}px,${(e.clientY - r.top - r.height / 2) * strength}px)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ''; };
  return (
    <span ref={ref} className={className} onMouseMove={move} onMouseLeave={leave} style={{ display: 'inline-flex', transition: 'transform .3s cubic-bezier(.22,1,.36,1)' }}>
      {children}
    </span>
  );
}
