import Link from 'next/link';
import Icon from './Icon';

export default function ServiceFlip({ s, n }) {
  return (
    <div className="flip">
      <div className="flip__inner">
        <div className="flip__face flip__face--front">
          <span className="flip__num">{String(n).padStart(2, '0')}</span>
          <span className="flip__icon"><Icon name={s.icon} size={52} /></span>
          <h3 className="flip__title">{s.title}</h3>
          <p className="flip__tag">{s.tagline}</p>
        </div>
        <div className="flip__face flip__face--back">
          <div>
            <h3 className="flip__title" style={{ fontSize: 'var(--step-1)' }}>{s.title}</h3>
            <p className="muted" style={{ marginTop: '.5rem' }}>{s.summary}</p>
            <ul className="flip__list">{s.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
          </div>
          <Link href={s.href || '/services'} className="flip__cta">Explore <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </div>
  );
}
