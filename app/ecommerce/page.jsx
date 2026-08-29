import Link from 'next/link';
import { getProjects } from '@/lib/projects';
import { poster } from '@/lib/poster';
import Reveal from '@/components/Reveal';
import SplitText from '@/components/SplitText';
import Counter from '@/components/Counter';
import Icon from '@/components/Icon';
import TiltCard from '@/components/TiltCard';
import Poster from '@/components/Poster';
import Faq from '@/components/Faq';
import ContactForm from '@/components/ContactForm';
import EcomHero from '@/components/EcomHero';

export const metadata = {
  title: 'E-commerce — Shopify, WooCommerce & Next.js',
  description: 'Online stores that sell. BrandZaha builds Shopify & Shopify Plus, WooCommerce, and custom headless Next.js/React stores — fast, conversion-focused, made to scale.',
  alternates: { canonical: '/ecommerce' },
};

const platforms = [
  { name: 'Shopify', icon: 'bag', tint: '#7ab55c', tagline: 'Launch fast. Scale faster.', desc: 'The fastest route to a polished, reliable store. We build custom Shopify and Shopify Plus themes, integrate the apps you need, and tune everything for conversion — no servers to manage.', points: ['Custom theme development', 'Shopify Plus & headless', 'Payments, shipping & tax', 'App integration & migration', 'Conversion rate optimisation'], ideal: 'Brands that want to launch quickly, sell globally, and grow without infrastructure headaches.' },
  { name: 'WooCommerce', icon: 'cart', tint: '#9b6ec8', tagline: 'Own your store, end to end.', desc: 'Built on WordPress, WooCommerce gives you total control and content-plus-commerce in one place. We craft custom stores, build plugins, and keep them fast — all fully owned by you.', points: ['Custom WordPress + Woo builds', 'Content & commerce together', 'Custom plugins & extensions', 'Any payment gateway', 'Full ownership, no lock-in'], ideal: 'Content-driven brands and businesses that want to own their platform outright.' },
  { name: 'Custom · Next.js', icon: 'bolt', tint: '#5cffce', tagline: 'Headless. Bespoke. Instant.', desc: 'When you want a store like nothing else — a React/Next.js storefront on top of commerce APIs and a headless CMS. Near-instant loads, total design freedom, and SEO built in.', points: ['Headless architecture', 'Next.js / React storefront', 'Custom checkout flows', 'API & CMS integration', 'Ultra-fast, SEO-first'], ideal: 'Ambitious D2C brands that need a signature, lightning-fast experience.' },
];

const faqs = [
  ['Which platform is right for my store?', 'It depends on your goals. Shopify is fastest to launch and easiest to run; WooCommerce gives you full ownership and content flexibility; a custom Next.js headless build gives you unmatched speed and design freedom. Tell us your priorities and we’ll recommend honestly — we build all three.'],
  ['Can you migrate my existing store?', 'Yes. We migrate stores between platforms — products, customers, orders and SEO — with redirects in place so you don’t lose rankings or traffic.'],
  ['Do you handle payments and shipping?', 'Absolutely. We set up payment gateways (Razorpay, Stripe, PayPal and more), shipping rules, taxes and integrations with your logistics and inventory systems.'],
  ['Will my store be fast and rank on Google?', 'Speed and SEO are built in from the start — optimised images, clean markup, structured data and Core Web Vitals tuning. Our headless builds regularly score 95+ on Lighthouse.'],
  ['Do you support the store after launch?', 'Yes — we offer ongoing maintenance, new features, and conversion optimisation so your store keeps improving after go-live.'],
];

const feats = [
  ['bolt', 'Blazing performance', 'Optimised images, clean code and Core Web Vitals tuning so pages load before shoppers lose patience.'],
  ['cart', 'Conversion-first design', 'Product pages, cart and checkout engineered to reduce friction and lift every key metric.'],
  ['layers', 'Payments & logistics', 'Razorpay, Stripe, PayPal, shipping rules, taxes and inventory — wired up and reliable.'],
  ['shield', 'Secure & scalable', 'Hardened, dependable stores that stay fast and safe as your orders grow.'],
  ['spark', 'SEO built in', 'Structured data, clean URLs and speed so your store is found, not just built.'],
  ['grid', 'Migration & support', 'Move from any platform without losing rankings — and keep improving after launch.'],
];

export default async function EcommercePage() {
  const projects = await getProjects();
  const ecomWork = projects.filter((p) => p.category.includes('E-commerce'));
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };

  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <EcomHero />

      <section className="section wrap" style={{ paddingBlock: 'clamp(2rem,4vw,3.5rem)' }}>
        <div className="stats">
          <Reveal className="stat"><div className="stat__num"><Counter value="+52%" /></div><div className="stat__label">Avg. conversion lift</div></Reveal>
          <Reveal className="stat" delay={0.06}><div className="stat__num"><Counter value="1.5s" /></div><div className="stat__label">Avg. store load time</div></Reveal>
          <Reveal className="stat" delay={0.12}><div className="stat__num"><Counter value="3" /></div><div className="stat__label">Platforms mastered</div></Reveal>
          <Reveal className="stat" delay={0.18}><div className="stat__num"><Counter value="₹10Cr+" /></div><div className="stat__label">Client GMV powered</div></Reveal>
        </div>
      </section>

      {/* PLATFORMS */}
      <section className="section wrap" id="platforms">
        <div className="sec-head"><div><p className="eyebrow">Choose your platform</p><h2 className="h2 sec-head__title"><SplitText text="Three ways to build. One standard: excellence." /></h2></div></div>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))' }}>
          {platforms.map((pf, i) => (
            <Reveal key={pf.name} delay={i * 0.08}>
              <TiltCard className="tcard" max={6} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', height: '100%', '--accent': pf.tint }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                  <span className="flip__icon" style={{ color: pf.tint, margin: 0 }}><Icon name={pf.icon} size={46} /></span>
                  <span className="chip" style={{ borderColor: pf.tint, color: pf.tint }}>{`0${i + 1}`}</span>
                </div>
                <div><h3 className="h3" style={{ fontSize: 'var(--step-2)' }}>{pf.name}</h3><p style={{ color: pf.tint, fontWeight: 600, marginTop: '.3rem' }}>{pf.tagline}</p></div>
                <p className="muted">{pf.desc}</p>
                <ul className="flip__list" style={{ margin: '.2rem 0' }}>{pf.points.map((pt) => <li key={pt} style={{ '--accent': pf.tint }}>{pt}</li>)}</ul>
                <p className="dim" style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--line)' }}><strong style={{ color: 'var(--ink)' }}>Ideal for:</strong> {pf.ideal}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
        <p className="muted center mt-3" style={{ maxWidth: '60ch', marginInline: 'auto' }}>Not sure which fits? <a href="#enquire" className="tlink text-accent">Tell us your goals</a> — we’ll recommend the right platform, honestly.</p>
      </section>

      {/* WORK */}
      <section className="section wrap" id="work">
        <div className="sec-head"><div><p className="eyebrow">Store work</p><h2 className="h2 sec-head__title"><SplitText text="Brands we’ve helped sell more." /></h2></div><Link href="/work" className="tlink" style={{ fontSize: 'var(--step-1)' }}>All work ↗</Link></div>
        <div className="work-list">
          {ecomWork.map((p, i) => {
            const wide = i % 3 === 0; const top = p.results[0];
            return (
              <Reveal key={p.slug} className={`work-list__item ${wide ? 'is-wide' : ''}`} delay={(i % 2) * 0.08}>
                <TiltCard className="work-card" max={7} cursor="View case" style={{ aspectRatio: wide ? '21 / 9' : '4 / 3' }}>
                  <Link href={`/work/${p.slug}`} style={{ position: 'absolute', inset: 0, display: 'block' }} aria-label={p.title}>
                    <div className="work-card__media"><Poster palette={p.palette} seed={p.slug} alt={p.title} /></div>
                    <div className="tilt__glare" aria-hidden="true" />
                    <div className="work-card__overlay">
                      <div className="work-card__top"><div className="work-card__cat">{p.platform && <span className="chip">{p.platform}</span>}<span className="chip">{p.industry}</span></div><span className="work-card__year" style={{ fontSize: '1.6rem', color: 'var(--accent)' }}>{top.metric}</span></div>
                      <div className="work-card__bottom"><h3>{p.title}</h3><p className="work-card__summary">{p.summary}</p></div>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* FEATURES */}
      <section className="section wrap">
        <div className="sec-head"><div><p className="eyebrow">What’s included</p><h2 className="h2 sec-head__title"><SplitText text="Everything a store needs." /></h2></div></div>
        <div className="svc-grid">
          {feats.map((f, i) => (
            <Reveal key={f[1]} delay={(i % 3) * 0.06}>
              <div className="tcard" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span className="flip__icon" style={{ color: 'var(--accent)', margin: 0 }}><Icon name={f[0]} size={44} /></span>
                <h3 className="h3" style={{ fontSize: 'var(--step-1)' }}>{f[1]}</h3><p className="muted">{f[2]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ + FORM */}
      <section className="section wrap" id="enquire">
        <div className="split" style={{ alignItems: 'start', gap: 'clamp(2rem,6vw,5rem)' }}>
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 className="h2" style={{ marginTop: '.6rem' }}><SplitText text="Before you start." /></h2>
            <div className="mt-3"><Faq items={faqs} /></div>
          </div>
          <div className="tcard">
            <p className="eyebrow">Get a quote</p>
            <h3 className="h3 mt-1" style={{ fontSize: 'var(--step-2)' }}>Let’s build your store.</h3>
            <div className="mt-3"><ContactForm variant="short" formName="E-commerce Lead" pageUrl="/ecommerce" hidden={{ service: 'E-commerce Development' }} /></div>
          </div>
        </div>
      </section>
    </main>
  );
}
