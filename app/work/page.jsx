import Link from 'next/link';
import Reveal from '@/components/Reveal';
import SplitText from '@/components/SplitText';
import Booklet from '@/components/Booklet';
import Products from '@/components/Products';
import Magnetic from '@/components/Magnetic';

export const metadata = {
  title: 'Work & Portfolio',
  description: 'Flip through BrandZaha’s booklet portfolio — cinematic websites, e-commerce, brands and apps, with real results.',
  alternates: { canonical: '/work' },
};

export default function WorkPage() {
  return (
    <main id="main">
      <section className="page-head wrap">
        <div className="glow hero__glow-a" aria-hidden="true" style={{ opacity: 0.18 }} />
        <p className="eyebrow"><Reveal as="span">Portfolio · Booklet</Reveal></p>
        <h1 className="page-head__title"><SplitText hero text="Our" /><br /><span className="text-accent"><SplitText hero text="work." /></span></h1>
        <Reveal as="p" className="page-head__lead lead" delay={0.15}>Every project is a partnership. Flip through the booklet, drag the pages, or use the strip to jump around — each spread opens into a full case study.</Reveal>
      </section>

      <section className="section wrap" style={{ paddingTop: 'clamp(1rem,3vw,2rem)' }}>
        <Booklet />
      </section>

      <Products />

      <section className="section wrap">
        <Reveal className="cta-band">
          <span className="glow cta-band__glow" aria-hidden="true" />
          <h2 className="h2 display" style={{ position: 'relative' }}><SplitText text="Your project could be next." /></h2>
          <div className="mt-3" style={{ position: 'relative' }}>
            <Magnetic><Link href="/contact" className="btn" data-cursor="Let's talk"><span className="btn__label">Start a project</span> <span className="btn__arrow" aria-hidden="true">↗</span></Link></Magnetic>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
