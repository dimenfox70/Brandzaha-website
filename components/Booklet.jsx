'use client';
import { useEffect } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { projects as defaultProjects } from '@/lib/data/projects';
import { poster } from '@/lib/poster';
import Icon from './Icon';

const variants = {
  enter: (d) => ({ rotateY: d > 0 ? 88 : -88, opacity: 0, x: d > 0 ? 70 : -70 }),
  center: { rotateY: 0, opacity: 1, x: 0 },
  exit: (d) => ({ rotateY: d > 0 ? -88 : 88, opacity: 0, x: d > 0 ? -70 : 70 }),
};

export default function Booklet({ projects: projectsProp }) {
  const projects = projectsProp || defaultProjects;
  const pages = [{ cover: true }, ...projects];
  const last = pages.length - 1;
  const [[i, dir], set] = useState([0, 0]);
  const clamp = (n) => Math.max(0, Math.min(last, n));
  const go = (d) => set(([ci]) => [clamp(ci + d), d]);
  const jump = (n) => set(([ci]) => [clamp(n), n > ci ? 1 : -1]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const p = pages[i];

  return (
    <div>
      <div className="booklet-stage">
        <motion.div
          className="booklet"
          drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.35}
          onDragEnd={(e, info) => { if (info.offset.x < -80) go(1); else if (info.offset.x > 80) go(-1); }}
        >
          <AnimatePresence custom={dir} initial={false}>
            <motion.div
              key={i} className="booklet__spread" custom={dir} variants={variants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {p.cover ? (
                <div className="booklet__page booklet__page--cover">
                  <div>
                    <p className="eyebrow" style={{ justifyContent: 'center' }}>Portfolio · Booklet</p>
                    <h3 className="display" style={{ fontSize: 'clamp(2.6rem,7vw,5rem)', marginTop: '1rem' }}>Our<br />Work.</h3>
                    <p className="muted mt-2">Flip through {projects.length} selected projects.</p>
                    <p className="booklet__hint">Drag · arrow keys · or the strip below</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="booklet__page booklet__page--left" onClick={() => go(1)} style={{ cursor: 'pointer' }}>
                    <div className="booklet__img-wrap" style={{ backgroundImage: `url("${poster(p.palette, p.slug)}")` }} />
                    <div className="booklet__meta">
                      <span className="booklet__num">{String(i).padStart(2, '0')}</span>
                      <span className="chip">{p.year}</span>
                    </div>
                  </div>
                  <div className="booklet__page booklet__page--right" style={{ background: 'linear-gradient(160deg,var(--bg-3),var(--bg-2))' }}>
                    <div className="booklet__meta" style={{ background: 'none', position: 'relative' }}>
                      <div>
                        <div className="booklet__cats">{p.category.map((c) => <span key={c} className="chip">{c}</span>)}</div>
                        <h3 className="booklet__title" style={{ marginTop: '.8rem' }}>{p.title}</h3>
                        <p className="booklet__summary">{p.summary}</p>
                      </div>
                      <div>
                        <div className="stats" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                          {p.results.slice(0, 2).map((r, k) => (
                            <div className="stat" key={k}>
                              <div className="stat__num" style={{ fontSize: 'var(--step-2)' }}>{r.metric}</div>
                              <div className="stat__label">{r.label}</div>
                            </div>
                          ))}
                        </div>
                        <Link href={`/work/${p.slug}`} className="btn" style={{ marginTop: '1.4rem' }} data-cursor="Open">View case ↗</Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="booklet__controls">
        <button className="booklet__btn" onClick={() => go(-1)} disabled={i === 0} aria-label="Previous page">
          <Icon name="arrow" size={22} style={{ transform: 'rotate(180deg)' }} />
        </button>
        <div className="booklet__progress"><i style={{ width: `${(i / last) * 100}%` }} /></div>
        <span className="booklet__count">{String(i).padStart(2, '0')} / {String(last).padStart(2, '0')}</span>
        <button className="booklet__btn" onClick={() => go(1)} disabled={i === last} aria-label="Next page">
          <Icon name="arrow" size={22} />
        </button>
      </div>

      <div className="film-strip" aria-label="Jump to project">
        {pages.map((pg, idx) => (
          <button
            key={idx}
            className={`film-thumb ${idx === i ? 'is-active' : ''}`}
            onClick={() => jump(idx)}
            aria-label={pg.cover ? 'Cover' : pg.title}
            style={{ backgroundImage: pg.cover ? 'none' : `url("${poster(pg.palette, pg.slug)}")` }}
          >
            {pg.cover ? <span className="film-thumb__cover"><Icon name="book" size={22} /></span> : <span className="film-thumb__label">{pg.title}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
