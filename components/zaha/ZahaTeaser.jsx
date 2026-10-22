import Link from 'next/link';
import { zaha } from '@/lib/zaha';
import './zaha.css';

const TILES = ['#d8c4a0', '#9fb391', '#ff6b6b', '#efe8d8', '#4d7cff', '#95bf47'];

// Small promo card linking to /ai-shopping-assistant from other pages.
export default function ZahaTeaser() {
  const t = zaha.teaser;
  return (
    <div className="zh-teaser">
      <div>
        <p className="zh-label"><span className="zh-badge is-new">New</span>{t.eyebrow}</p>
        <h2 className="display">{t.title}</h2>
        <p className="muted">{t.text}</p>
        <div className="zh-actions">
          <Link href={zaha.slug} className="btn btn--ghost"><span className="btn__label">{t.cta}</span><span className="btn__arrow" aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <div className="zh-teaser__art" aria-hidden="true">
        <div className="zh-fallback__ring">
          <span className="zh-fallback__glass" />
          <span className="zh-fallback__orbit">
            {TILES.map((c, i) => <i key={c} style={{ '--c': c, '--a': `${(360 / TILES.length) * i}deg` }} />)}
          </span>
        </div>
      </div>
    </div>
  );
}
