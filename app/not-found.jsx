import Link from 'next/link';
import Magnetic from '@/components/Magnetic';

export const metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <main id="main">
      <section className="hero wrap" style={{ minHeight: '100svh', justifyContent: 'center', textAlign: 'center', alignItems: 'center' }}>
        <div className="glow hero__glow-a" aria-hidden="true" />
        <div>
          <div className="badge-404" aria-hidden="true">404</div>
          <p className="eyebrow" style={{ justifyContent: 'center', marginTop: '1rem' }}>Lost in space</p>
          <h1 className="h2 mt-2">This page took a wrong turn.</h1>
          <p className="lead mt-2" style={{ maxWidth: '44ch', marginInline: 'auto' }}>The link may be broken or the page may have moved. Let’s get you back to something good.</p>
          <div className="mt-3" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Magnetic><Link href="/" className="btn"><span className="btn__label">Back home</span> <span className="btn__arrow" aria-hidden="true">↗</span></Link></Magnetic>
            <Magnetic><Link href="/work" className="btn btn--ghost"><span className="btn__label">See our work</span></Link></Magnetic>
          </div>
        </div>
      </section>
    </main>
  );
}
