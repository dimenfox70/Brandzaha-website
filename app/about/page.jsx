import Link from 'next/link';
import { getTestimonials } from '@/lib/testimonials';
import { getSite } from '@/lib/site';
import Reveal from '@/components/Reveal';
import SplitText from '@/components/SplitText';
import Counter from '@/components/Counter';
import Poster from '@/components/Poster';
import TiltCard from '@/components/TiltCard';
import Magnetic from '@/components/Magnetic';
import FounderPhoto from '@/components/FounderPhoto';

export const metadata = {
  title: 'About',
  description: 'Meet BrandZaha — a Jaipur creative & digital studio pairing strategy, design and engineering to build brands that perform. Founded 2017.',
  alternates: { canonical: '/about' },
};

const steps = [
  ['Listen first', 'We start by understanding — your business, your customers, your constraints. The brief is a conversation, not a form.'],
  ['Design with intent', 'Nothing is decorative for its own sake. Every choice ladders up to a goal you can measure.'],
  ['Build to last', 'Clean, fast, accessible engineering that won’t crumble a year later or lock you into a stack you can’t maintain.'],
  ['Stay in it', 'We’re partners, not vendors. We stick around to measure, learn and keep the work sharp.'],
];

export default async function AboutPage() {
  const [testimonials, site] = await Promise.all([getTestimonials(), getSite()]);
  return (
    <main id="main">
      <section className="page-head wrap">
        <div className="glow hero__glow-b" aria-hidden="true" style={{ opacity: 0.2 }} />
        <p className="eyebrow"><Reveal as="span">Studio · Est. {site.founded}</Reveal></p>
        <h1 className="page-head__title"><SplitText hero text="We’re" /><br />Brand<span className="text-accent">Zaha.</span></h1>
        <Reveal as="p" className="page-head__lead lead" delay={0.15}>A tight-knit team of strategists, designers and engineers in Jaipur who believe great work comes from caring about the details nobody else notices.</Reveal>
      </section>

      <section className="section wrap">
        <div className="split">
          <div>
            <p className="eyebrow">Our story</p>
            <h2 className="h2" style={{ marginTop: '.6rem' }}><SplitText text="From a small idea to a full-service studio." /></h2>
            <Reveal className="prose" delay={0.08} style={{ marginTop: '1rem' }}>
              <p>BrandZaha started in {site.founded} with a simple conviction: most agency work looks the same because it’s made the same way. We wanted to build differently — strategy, design and engineering at one table, obsessed with craft and outcomes in equal measure.</p>
              <p>Today we partner with founders, non-profits and growing companies to design brands, build fast Next.js websites and apps, ship e-commerce, and run marketing that moves numbers. No bloated retainers, no template thinking — just work we’re proud to sign.</p>
            </Reveal>
          </div>
          <div className="split__media"><TiltCard max={6} style={{ width: '100%', height: '100%' }}><Poster palette={['#131313', '#26301a', '#d8ff36']} seed="team" alt="The BrandZaha team" /></TiltCard></div>
        </div>
      </section>

      <section className="section wrap">
        <div className="stats">
          <Reveal className="stat"><div className="stat__num"><Counter value={String(site.founded)} /></div><div className="stat__label">Founded in Jaipur</div></Reveal>
          <Reveal className="stat" delay={0.06}><div className="stat__num"><Counter value="200+" /></div><div className="stat__label">Projects delivered</div></Reveal>
          <Reveal className="stat" delay={0.12}><div className="stat__num"><Counter value="8+" /></div><div className="stat__label">Years crafting</div></Reveal>
          <Reveal className="stat" delay={0.18}><div className="stat__num"><Counter value="98%" /></div><div className="stat__label">Would work with us again</div></Reveal>
        </div>
      </section>

      <section className="section wrap">
        <div className="sec-head"><div><p className="eyebrow">Our approach</p><h2 className="h2 sec-head__title"><SplitText text="Care, at every step." /></h2></div></div>
        <div className="process">
          {steps.map((s, i) => (
            <Reveal key={i} className="process__step" delay={i * 0.06}><div className="process__num">{String(i + 1).padStart(2, '0')}</div><h3>{s[0]}</h3><p>{s[1]}</p></Reveal>
          ))}
        </div>
      </section>

      <section className="section wrap" aria-label="Founder">
        <div className="sec-head">
          <div>
            <p className="eyebrow">The founder</p>
            <h2 className="h2 sec-head__title"><SplitText text="The person behind BrandZaha." /></h2>
          </div>
        </div>
        <div className="founder">
          <Reveal>
            <FounderPhoto alt="Himanshi Shrivastav, Founder of BrandZaha" />
          </Reveal>
          <Reveal delay={0.1} className="founder__copy">
            <p className="founder__role">Founder &amp; Creative Director</p>
            <h3 className="founder__name">Himanshi Shrivastav</h3>
            <div className="prose" style={{ marginTop: '1.1rem' }}>
              <p>Himanshi founded BrandZaha in {site.founded} in Jaipur with a simple brief: make work that looks unforgettable and actually performs. She leads the studio’s creative direction — from brand systems and cinematic websites to e-commerce and AI experiences for founders across India.</p>
              <p>Her approach is hands-on and detail-obsessed: listen first, design with intent, and stay close after launch. Every BrandZaha project still carries that founder standard — craft you can feel, and results you can measure.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section wrap">
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))' }}>
          {testimonials.slice(0, 3).map((t, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <blockquote className="tcard"><p className="tcard__quote" style={{ fontSize: 'var(--step-1)' }}>{t.quote}</p><footer className="tcard__by"><span className="tcard__avatar">{t.name[0]}</span><span><strong>{t.name}</strong><br /><span className="dim">{t.role}</span></span></footer></blockquote>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <Reveal className="cta-band">
          <span className="glow cta-band__glow" aria-hidden="true" />
          <h2 className="h2 display" style={{ position: 'relative' }}><SplitText text="Want to build with us?" /></h2>
          <div className="mt-3" style={{ position: 'relative' }}><Magnetic><Link href="/contact" className="btn"><span className="btn__label">Let’s talk</span> <span className="btn__arrow" aria-hidden="true">↗</span></Link></Magnetic></div>
        </Reveal>
      </section>
    </main>
  );
}
