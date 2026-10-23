import Link from 'next/link';
import { zaha } from '@/lib/zaha';
import t from './ZahaTeaser.module.css';

const TILES = ['#d8c4a0', '#9fb391', '#ff6b6b', '#efe8d8', '#4d7cff', '#95bf47'];

// Small promo card linking to the Zaha page from other pages (used on /ecommerce).
export default function ZahaTeaser() {
  return (
    <div className={t.teaser}>
      <div>
        <p className={t.label}><span className={t.badge}>New</span>New from BrandZaha</p>
        <h2 className="display">Zaha, the AI shopping assistant.</h2>
        <p className="muted">It finds products from your live catalogue, lets shoppers try clothes on, and adds to bag inside the chat. Live on Shopify today.</p>
        <div className={t.actions}>
          <Link href={zaha.path} className="btn btn--ghost"><span className="btn__label">Meet Zaha</span><span className="btn__arrow" aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <div className={t.art} aria-hidden="true">
        <div className={t.ring}>
          <span className={t.glass} />
          <span className={t.orbit}>
            {TILES.map((c, i) => <i key={c} style={{ '--c': c, '--a': `${(360 / TILES.length) * i}deg` }} />)}
          </span>
        </div>
      </div>
    </div>
  );
}
