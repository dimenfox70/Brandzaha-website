import Link from 'next/link';
import { getProducts } from '@/lib/products';
import { poster } from '@/lib/poster';
import Icon from './Icon';
import Reveal from './Reveal';
import TiltCard from './TiltCard';
import SplitText from './SplitText';

export default async function Products() {
  const products = await getProducts();
  return (
    <section className="section wrap" id="products">
      <div className="sec-head">
        <div>
          <p className="eyebrow"><Reveal as="span">Ready to launch</Reveal></p>
          <h2 className="h2 sec-head__title"><SplitText text="Tech-ready products, yours to rebrand." /></h2>
        </div>
        <Reveal className="muted" style={{ maxWidth: '32ch' }} delay={0.1}>Our own IP — battle-tested platforms you can deploy in weeks, not months.</Reveal>
      </div>

      <div className="svc-grid">
        {products.map((pr, i) => (
          <Reveal key={pr.name} delay={(i % 3) * 0.06}>
            <TiltCard className="product-card" max={6} style={{ '--p-accent': pr.accent }}>
              <div className="product-card__poster" style={{ backgroundImage: `url("${poster(pr.palette, pr.name)}")` }} />
              <div className="product-card__top">
                <span className="product-card__icon"><Icon name={pr.icon} size={40} /></span>
                <span className="product-card__badge">{pr.tag}</span>
              </div>
              <div>
                <h3 className="product-card__name">{pr.name}</h3>
              </div>
              <p className="product-card__blurb">{pr.blurb}</p>
              <div className="product-card__stack">{pr.stack.map((t) => <span key={t} className="chip">{t}</span>)}</div>
              <span className="product-card__metric">{pr.metric}</span>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <Reveal className="center" style={{ marginTop: '2.5rem' }} delay={0.1}>
        <Link href="/contact" className="btn btn--ghost" data-cursor="Let's talk"><span className="btn__label">Launch a product with us</span> <span className="btn__arrow" aria-hidden="true">↗</span></Link>
      </Reveal>
    </section>
  );
}
