'use client';

export default function Marquee({ items, speed = 34, reverse = false }) {
  const Track = () => (
    <div className="marquee__track">
      {items.map((it, i) => <span key={i}>{it}</span>)}
    </div>
  );
  return (
    <div className={`marquee ${reverse ? 'marquee--reverse' : ''}`} style={{ '--marq': `${speed}s`, display: 'flex' }} aria-hidden="true">
      <Track />
      <Track />
    </div>
  );
}
