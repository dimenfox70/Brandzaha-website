import Link from 'next/link';
import { getProjects } from '@/lib/projects';
import { getServices } from '@/lib/services';
import { getTestimonials } from '@/lib/testimonials';
import Reveal from '@/components/Reveal';
import SplitText from '@/components/SplitText';
import Magnetic from '@/components/Magnetic';
import Marquee from '@/components/Marquee';
import Counter from '@/components/Counter';
import WorkCard from '@/components/WorkCard';
import ServiceFlip from '@/components/ServiceFlip';
import Products from '@/components/Products';

export default async function Home() {
  const [projects, services, testimonials] = await Promise.all([getProjects(), getServices(), getTestimonials()]);
  const featured = projects.filter((p) => p.featured).slice(0, 4);
  return (
    <main id="main">
      {/* HERO */}
      <section className="hero wrap" aria-label="Introduction">
        <div className="glow hero__glow-a" aria-hidden="true" />
        <div className="glow hero__glow-b" aria-hidden="true" />
        <Reveal as="p" className="eyebrow" style={{ marginBottom: '1.4rem' }}>Creative &amp; Digital Agency · Jaipur</Reveal>
        <h1 className="hero__title">
          <SplitText hero text="We design" className="accent-line" /><br />
          <SplitText hero text="brands that" /><br />
          <span className="outline"><SplitText hero text="move people." /></span>
        </h1>
        <div className="hero__meta">
          <Reveal as="p" className="hero__lead lead" delay={0.15}>BrandZaha turns ambitious ideas into cinematic websites, sharp identities, e-commerce and AI experiences that grow the businesses behind them.</Reveal>
          <Reveal delay={0.25}>
            <Magnetic><Link href="/work" className="btn" data-cursor="Explore"><span className="btn__label">View our work</span> <span className="btn__arrow" aria-hidden="true">↗</span></Link></Magnetic>
          </Reveal>
        </div>
        <div className="hero__meta" style={{ marginTop: 'clamp(2.5rem,6vw,5rem)' }}>
          <span className="hero__scroll"><i aria-hidden="true" /> Scroll to explore</span>
          <div className="stats" style={{ maxWidth: 520, flex: 1 }}>
            <div className="stat"><div className="stat__num"><Counter value="200+" /></div><div className="stat__label">Projects shipped</div></div>
            <div className="stat"><div className="stat__num"><Counter value="8" /></div><div className="stat__label">Years crafting</div></div>
            <div className="stat"><div className="stat__num"><Counter value="98%" /></div><div className="stat__label">Client retention</div></div>
          </div>
        </div>
      </section>

      <Marquee items={['Brand Identity', 'Next.js Development', 'E-commerce', 'UI / UX', 'AI Agents', 'SEO', 'Mobile Apps']} speed={34} />

      {/* FEATURED WORK */}
      <section className="section wrap" aria-label="Selected work">
        <div className="sec-head">
          <div>
            <p className="eyebrow"><Reveal as="span">Selected work</Reveal></p>
            <h2 className="h2 sec-head__title"><SplitText text="Work that speaks louder than decks." /></h2>
          </div>
          <Reveal delay={0.15}><Link href="/work" className="tlink" style={{ fontSize: 'var(--step-1)' }}>All projects ↗</Link></Reveal>
        </div>
        <div className="work-list">
          {featured.map((p, i) => (
            <Reveal key={p.slug} className={`work-list__item ${i % 3 === 0 ? 'is-wide' : ''}`} delay={(i % 2) * 0.08}>
              <WorkCard p={p} wide={i % 3 === 0} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES TEASER */}
      <section className="section wrap" aria-label="What we do">
        <div className="sec-head">
          <div>
            <p className="eyebrow"><Reveal as="span">Capabilities</Reveal></p>
            <h2 className="h2 sec-head__title"><SplitText text="Everything your brand needs to win online." /></h2>
          </div>
          <Reveal delay={0.15}><Link href="/services" className="tlink" style={{ fontSize: 'var(--step-1)' }}>All services ↗</Link></Reveal>
        </div>
        <div className="svc-grid">
          {services.slice(0, 4).map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06} style={{ height: '100%' }}>
              <ServiceFlip s={s} n={i + 1} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* READY-TO-LAUNCH PRODUCTS */}
      <Products />

      {/* PROOF */}
      <section className="section wrap" aria-label="Proof">
        <p className="eyebrow center" style={{ justifyContent: 'center' }}>Trusted by teams across India</p>
        <div className="logo-row mt-3" style={{ justifyContent: 'center' }}>
          {['Zenith Home', 'FPF Foundation', 'Property Bapu', 'Aurum Retail', 'Nova Labs', 'Kesar Foods'].map((l) => <span key={l}>{l}</span>)}
        </div>
        <div style={{ marginTop: 'clamp(3rem,7vw,6rem)' }}>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))' }}>
            {testimonials.slice(0, 3).map((t, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <blockquote className="tcard">
                  <p className="tcard__quote" style={{ fontSize: 'var(--step-1)' }}>{t.quote}</p>
                  <footer className="tcard__by"><span className="tcard__avatar">{t.name[0]}</span><span><strong>{t.name}</strong><br /><span className="dim">{t.role}</span></span></footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section wrap">
        <Reveal className="cta-band">
          <span className="glow cta-band__glow" aria-hidden="true" />
          <p className="eyebrow" style={{ justifyContent: 'center', position: 'relative' }}>Have a project in mind?</p>
          <h2 className="h1 display" style={{ marginTop: '1rem' }}><SplitText text="Let’s make it unforgettable." /></h2>
          <div className="mt-3" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
            <Magnetic><Link href="/contact" className="btn" data-cursor="Let's talk"><span className="btn__label">Start a project</span> <span className="btn__arrow" aria-hidden="true">↗</span></Link></Magnetic>
            <Magnetic><a href="https://wa.me/916376509220" className="btn btn--ghost" target="_blank" rel="noopener noreferrer"><span className="btn__label">WhatsApp us</span></a></Magnetic>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
