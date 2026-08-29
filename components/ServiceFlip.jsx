import Link from 'next/link';
import Icon from './Icon';

export default function ServiceFlip({ s, n }) {
  return (
    <article className="flip">
      <div className="flip__inner">
        <div className="flip__face flip__face--front">
          <span className="flip__num">{String(n).padStart(2, '0')}</span>
          <span className="flip__icon" aria-hidden="true"><Icon name={s.icon} size={48} /></span>
          <h3 className="flip__title">{s.title}</h3>
          <p className="flip__tag">{s.tagline}</p>
        </div>
        <div className="flip__face flip__face--back">
          <div>
            <h3 className="flip__title flip__back-title">{s.title}</h3>
            <p className="flip__summary">{s.summary}</p>
            <ul className="flip__list">{s.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
          </div>
          <Link href={s.href || '/services'} className="flip__cta">Explore <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </article>
  );
}
