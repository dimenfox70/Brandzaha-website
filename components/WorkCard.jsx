import Link from 'next/link';
import TiltCard from './TiltCard';
import Poster from './Poster';

export default function WorkCard({ p, wide = false }) {
  return (
    <TiltCard className="work-card" max={7} cursor="View case" style={{ aspectRatio: wide ? '21 / 9' : '4 / 3' }}>
      <Link href={`/work/${p.slug}`} style={{ position: 'absolute', inset: 0, display: 'block' }} aria-label={`${p.title} case study`}>
        <div className="work-card__media"><Poster palette={p.palette} seed={p.slug} alt={`${p.title} case study`} /></div>
        <div className="tilt__glare" aria-hidden="true" />
        <div className="work-card__overlay">
          <div className="work-card__top">
            <div className="work-card__cat">
              {(p.platform ? [p.platform, ...p.category.slice(0, 1)] : p.category).map((c) => <span key={c} className="chip">{c}</span>)}
            </div>
            <span className="work-card__year">{p.year}</span>
          </div>
          <div className="work-card__bottom">
            <h3>{p.title}</h3>
            <p className="work-card__summary">{p.summary}</p>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}
