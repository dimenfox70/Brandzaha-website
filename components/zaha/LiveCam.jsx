'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Icon from '@/components/Icon';
import { FigureArt, ShirtArt } from './Art';

const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
const SWITCH_EVERY = 3; // seconds per outfit

// Animated "live camera try-on" mock. Static frame without JS or with reduced motion.
export default function LiveCam({ content, photo }) {
  const outfits = content.outfits;
  const [sec, setSec] = useState(12);
  const [idx, setIdx] = useState(0);
  const [live, setLive] = useState(false);
  const rootRef = useRef(null);
  const manual = useRef(0);
  const secRef = useRef(12);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let timer = 0;
    const tick = () => {
      const n = secRef.current + 1 >= content.sessionSeconds ? 0 : secRef.current + 1;
      secRef.current = n;
      setSec(n);
      if (n % SWITCH_EVERY === 0 && Date.now() - manual.current > 6000) setIdx((i) => (i + 1) % outfits.length);
    };
    const io = new IntersectionObserver(([entry]) => {
      clearInterval(timer);
      setLive(entry.isIntersecting);
      if (entry.isIntersecting) timer = setInterval(tick, 1000);
    }, { threshold: 0.25 });
    io.observe(rootRef.current);
    return () => { io.disconnect(); clearInterval(timer); };
  }, [outfits.length, content.sessionSeconds]);

  const o = outfits[idx];
  const left = Math.max(0, content.sessionSeconds - sec);

  return (
    <figure className={`zh-live ${live ? 'is-live' : ''}`} ref={rootRef}>
      <div className="zh-live__feed">
        {photo ? (
          <Image className="zh-live__photo" src={photo.src} width={photo.width} height={photo.height} alt={content.alt} sizes="(min-width: 900px) 34vw, 90vw" />
        ) : (
          <div className="zh-live__figure" role="img" aria-label={`${content.alt}: ${o.name}`}>
            <FigureArt key={o.name} className="zh-fig zh-live__body" shirt={o.color} shade={o.shade} collar={idx === 2 ? 'mandarin' : 'camp'} />
          </div>
        )}
        <span className="zh-live__scan" aria-hidden="true" />
        <span className="zh-live__corners" aria-hidden="true"><i /><i /><i /><i /></span>

        <div className="zh-live__top" aria-hidden="true">
          <span className="zh-live__rec"><i />{content.rec} {fmt(sec)}</span>
          <span className="zh-live__badge">{content.liveBadge}</span>
        </div>
        <span className="zh-live__session" aria-hidden="true">{content.sessionLabel} {fmt(left)}</span>
        <span key={`flash-${idx}`} className="zh-live__swap" aria-hidden="true" />
        <span className="zh-live__name" aria-hidden="true">{o.name}</span>
      </div>

      <div className="zh-live__bar">
        <div className="zh-live__strip">
          {outfits.map((item, i) => (
            <button
              key={item.name}
              type="button"
              className={i === idx ? 'is-on' : ''}
              aria-pressed={i === idx}
              aria-label={`Try ${item.name}`}
              onClick={() => { manual.current = Date.now(); setIdx(i); }}
            >
              <ShirtArt color={item.color} shade={item.shade} />
            </button>
          ))}
        </div>
        <div className="zh-live__actions" aria-hidden="true">
          <span className="zh-live__btn"><Icon name="camera" size={15} />{content.snapshot}</span>
          <span className="zh-live__btn is-primary"><Icon name="bag" size={15} />{content.addToBag}</span>
        </div>
      </div>
    </figure>
  );
}
