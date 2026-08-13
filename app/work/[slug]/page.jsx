import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects, getProject, getNext } from '@/lib/projects';
import { poster } from '@/lib/poster';
import Reveal from '@/components/Reveal';
import SplitText from '@/components/SplitText';
import Counter from '@/components/Counter';
import Poster from '@/components/Poster';
import TiltCard from '@/components/TiltCard';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const p = getProject(params.slug);
  if (!p) return { title: 'Not found' };
  return { title: `${p.title} — Case Study`, description: p.summary, alternates: { canonical: `/work/${p.slug}` } };
}

export default function ProjectPage({ params }) {
  const p = getProject(params.slug);
  if (!p) notFound();
  const next = getNext(p.slug);
  const accent = p.accent;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: p.title,
    about: p.summary,
    dateCreated: String(p.year),
    creator: { '@type': 'Organization', name: 'BrandZaha' },
    keywords: [...p.category, ...p.services].join(', '),
  };

  return (
    <main id="main" style={{ '--accent': accent }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* HERO */}
      <section className="proj-hero">
        <div className="proj-hero__media"><Poster palette={p.palette} seed={`${p.slug}-hero`} alt={`${p.title} hero`} /></div>
        <div className="wrap proj-hero__inner">
          <p className="eyebrow"><Reveal as="span">{p.category.join(' · ')}</Reveal></p>
          <h1 className="proj-hero__title"><SplitText hero text={p.title} /></h1>
          <Reveal as="p" className="lead" delay={0.15} style={{ maxWidth: '44ch' }}>{p.summary}</Reveal>
          <Reveal className="proj-meta-row" delay={0.2}>
            <div><span>Client</span><strong>{p.client}</strong></div>
            <div><span>Year</span><strong>{p.year}</strong></div>
            <div><span>Industry</span><strong>{p.industry}</strong></div>
            {p.platform && <div><span>Platform</span><strong>{p.platform}</strong></div>}
            <div><span>Services</span><strong>{p.services.join(', ')}</strong></div>
            {p.liveUrl && <div><span>Live</span><a href={p.liveUrl} className="tlink text-accent" target="_blank" rel="noopener noreferrer">Visit site ↗</a></div>}
          </Reveal>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="section wrap">
        <div className="editorial">
          <div><p className="eyebrow">The challenge</p><Reveal as="p" className="lead" delay={0.05} style={{ marginTop: '1rem' }}>{p.challenge}</Reveal></div>
          <div><p className="eyebrow">Our approach</p><Reveal as="p" className="lead" delay={0.05} style={{ marginTop: '1rem' }}>{p.solution}</Reveal></div>
        </div>
        <div style={{ marginTop: 'clamp(3rem,8vw,7rem)' }}>
          <p className="pullquote"><span className="accent">“</span>{p.summary}<span className="accent">”</span></p>
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="section wrap" aria-label="Showcase">
        <div className="showcase">
          <Reveal className="showcase__item"><Poster palette={p.palette} seed={`${p.slug}-g0`} alt={`${p.title} screen`} /></Reveal>
          <div className="showcase__row">
            <Reveal className="showcase__item is-tall"><TiltCard max={5} style={{ width: '100%', height: '100%' }}><Poster palette={p.palette} seed={`${p.slug}-g1`} alt={`${p.title} screen`} /></TiltCard></Reveal>
            <Reveal className="showcase__item is-tall" delay={0.08}><TiltCard max={5} style={{ width: '100%', height: '100%' }}><Poster palette={p.palette} seed={`${p.slug}-g2`} alt={`${p.title} screen`} /></TiltCard></Reveal>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="section wrap" aria-label="Results">
        <p className="eyebrow">The results</p>
        <h2 className="h2" style={{ marginTop: '.6rem' }}><SplitText text="Numbers that moved." /></h2>
        <div className="stats mt-3">
          {p.results.map((r, i) => (
            <Reveal key={i} className="stat" delay={i * 0.07}>
              <div className="stat__num"><Counter value={r.metric} /></div>
              <div className="stat__label">{r.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      {p.testimonial?.quote && (
        <section className="section wrap">
          <blockquote className="tcard" style={{ maxWidth: 920, marginInline: 'auto' }}>
            <p className="tcard__quote">{p.testimonial.quote}</p>
            <footer className="tcard__by"><span className="tcard__avatar">{p.testimonial.name[0]}</span><span><strong>{p.testimonial.name}</strong><br /><span className="dim">{p.testimonial.role}</span></span></footer>
          </blockquote>
        </section>
      )}

      {/* NEXT */}
      <section className="section wrap">
        <Link href={`/work/${next.slug}`} className="next-proj tilt" data-cursor="Next">
          <div className="next-proj__poster" style={{ background: `#0a0a0a url("${poster(next.palette, `${next.slug}-next`)}") center/cover` }}>
            <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(10,10,10,.5),rgba(10,10,10,.78))' }} />
          </div>
          <div className="next-proj__inner">
            <span className="next-proj__label">Next project</span>
            <h2 className="next-proj__title">{next.title}</h2>
            <span className="dim">{next.category.join(' · ')}</span>
          </div>
        </Link>
        <div className="center mt-3"><Link href="/work" className="tlink" style={{ fontSize: 'var(--step-1)' }}>← Back to all work</Link></div>
      </section>
    </main>
  );
}
