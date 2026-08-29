import Link from 'next/link';
import { services } from '@/lib/services';
import Reveal from '@/components/Reveal';
import SplitText from '@/components/SplitText';
import ServiceFlip from '@/components/ServiceFlip';
import Magnetic from '@/components/Magnetic';

export const metadata = {
  title: 'Services',
  description: 'From websites and e-commerce to branding, marketing, AI and custom software — explore the full range of what BrandZaha builds.',
  alternates: { canonical: '/services' },
};

const steps = [
  ['Discover', 'We dig into your business, audience and goals — no assumptions, just the right questions and honest research.'],
  ['Design', 'Concepts, systems and prototypes. We design in the open so you see the thinking, not just the polish.'],
  ['Build', 'Hand-crafted, performance-first engineering in React/Next.js. Fast, accessible, and made to last.'],
  ['Grow', 'Launch is the start. We measure, iterate and optimise so the work keeps paying off long after go-live.'],
];

export default function ServicesPage() {
  return (
    <main id="main">
      <section className="page-head wrap">
        <div className="glow hero__glow-a" aria-hidden="true" style={{ opacity: 0.16 }} />
        <p className="eyebrow"><Reveal as="span">Capabilities</Reveal></p>
        <h1 className="page-head__title"><SplitText hero text="What we" /><br /><span className="text-accent"><SplitText hero text="do." /></span></h1>
        <Reveal as="p" className="page-head__lead lead" delay={0.15}>Strategy, design, engineering and growth — a full-stack creative team that takes ideas from blank page to measurable results. Hover a card on desktop, or scroll to read each one on mobile.</Reveal>
      </section>

      <section className="section wrap">
        <div className="svc-grid">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 4) * 0.06} style={{ height: '100%' }}>
              <ServiceFlip s={s} n={i + 1} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <div className="sec-head"><div><p className="eyebrow">How we work</p><h2 className="h2 sec-head__title"><SplitText text="A process built for clarity." /></h2></div></div>
        <div className="process">
          {steps.map((s, i) => (
            <Reveal key={i} className="process__step" delay={i * 0.06}>
              <div className="process__num">{String(i + 1).padStart(2, '0')}</div>
              <h3>{s[0]}</h3><p>{s[1]}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <Reveal className="cta-band">
          <span className="glow cta-band__glow" aria-hidden="true" />
          <h2 className="h2 display" style={{ position: 'relative' }}><SplitText text="Not sure where to start?" /></h2>
          <p className="lead mt-2" style={{ position: 'relative' }}>Tell us the goal — we’ll shape the path.</p>
          <div className="mt-3" style={{ position: 'relative' }}><Magnetic><Link href="/contact" className="btn"><span className="btn__label">Book a free consult</span> <span className="btn__arrow" aria-hidden="true">↗</span></Link></Magnetic></div>
        </Reveal>
      </section>
    </main>
  );
}
