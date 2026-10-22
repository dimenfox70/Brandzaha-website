import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/lib/site';
import { zaha } from '@/lib/zaha';
import { findImage, publicFileExists } from '@/lib/zaha-media';
import Icon from '@/components/Icon';
import Marquee from '@/components/Marquee';
import Counter from '@/components/Counter';
import Magnetic from '@/components/Magnetic';
import HeroScene from '@/components/zaha/HeroScene';
import PageProgress from '@/components/zaha/PageProgress';
import ChatDemo from '@/components/zaha/ChatDemo';
import TryOnSlider from '@/components/zaha/TryOnSlider';
import LiveCam from '@/components/zaha/LiveCam';
import GuideShot from '@/components/zaha/GuideShot';
import { FigureArt } from '@/components/zaha/Art';
import '@/components/zaha/zaha.css';

const pageTitle = `${zaha.seo.title} — ${site.name}`;

export const metadata = {
  title: zaha.seo.title,
  description: zaha.seo.description,
  alternates: { canonical: zaha.slug },
  openGraph: { type: 'website', siteName: site.name, url: zaha.slug, title: pageTitle, description: zaha.seo.description },
  twitter: { card: 'summary_large_image', title: pageTitle, description: zaha.seo.description },
};

const rupees = (s) => Number(String(s).replace(/[^0-9.]/g, ''));

function Arrow() {
  return <span className="btn__arrow" aria-hidden="true">↗</span>;
}

function SectionHead({ eyebrow, title, lead, id }) {
  return (
    <div className="sec-head">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id} className="h2 display zh-h2 sec-head__title">{title}</h2>
      </div>
      {lead && <p className="muted zh-sec-lead">{lead}</p>}
    </div>
  );
}

export default function ZahaPage() {
  const { hero, demo, capabilities, whatsNew, why, integrations, guide, setupDay, pricing, faq, closing, media } = zaha;

  // Optional media in /public/zaha. Anything missing falls back to the animated placeholders.
  const demoVideo = publicFileExists(media.demoVideo)
    ? { src: media.demoVideo, poster: publicFileExists(media.demoPoster) ? media.demoPoster : null }
    : null;
  const tryBefore = findImage(media.tryOnBefore);
  const tryAfter = findImage(media.tryOnAfter);
  const realTryOn = tryBefore && tryAfter;
  const livePhoto = findImage(media.live);
  const shots = guide.steps.map((s) => findImage(s.image));
  const sage = demo.chat.products.find((p) => /sage/i.test(p.name)) || demo.chat.products[0];

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Zaha AI Shopping Assistant',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: zaha.seo.description,
    url: `${site.domain}${zaha.slug}`,
    publisher: { '@type': 'Organization', name: site.name, url: site.domain },
    offers: pricing.plans.map((p) => ({ '@type': 'Offer', name: p.name, price: rupees(p.price), priceCurrency: 'INR' })),
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };

  return (
    <main id="main" className="zh">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {/* Without JavaScript: drop the preloader and any scroll-reveal starting states. */}
      <noscript>
        <style dangerouslySetInnerHTML={{ __html: '.preloader{display:none!important}[style*="opacity:0;"],[style$="opacity:0"]{opacity:1!important;transform:none!important}' }} />
      </noscript>
      <PageProgress />

      {/* 1 — HERO */}
      <section className="zh-hero" aria-labelledby="zh-title">
        <HeroScene />
        <div className="wrap zh-hero__inner">
          <p className="zh-pill"><span className="zh-pill__tag">{hero.pill.tag}</span>{hero.pill.text}</p>
          <h1 id="zh-title" className="zh-hero__title">
            {hero.title.map((line, i) => (
              <span key={line} className={`zh-line ${i === hero.title.length - 1 ? 'is-outline' : ''}`}>
                <span style={{ '--i': i }}>{line}{i < hero.title.length - 1 ? ' ' : ''}</span>
              </span>
            ))}
          </h1>
          <p className="lead zh-hero__lead">{hero.lead}</p>
          <div className="zh-actions">
            <Magnetic><a href={hero.primary.href} className="btn"><Icon name="play" size={18} /><span className="btn__label">{hero.primary.label}</span></a></Magnetic>
            <Magnetic><a href={hero.secondary.href} className="btn btn--ghost"><span className="btn__label">{hero.secondary.label}</span><Arrow /></a></Magnetic>
          </div>
          <p className="zh-hero__note"><i aria-hidden="true" />{hero.note}</p>
        </div>
      </section>

      {/* 2 — FEATURE MARQUEE */}
      <Marquee items={zaha.marquee} speed={40} />

      {/* 3 — DEMO */}
      <section id="demo" className="section wrap zh-sec" aria-label={demo.title}>
        <ChatDemo content={demo} video={demoVideo} />
      </section>

      {/* 4 — CAPABILITIES */}
      <section id="features" className="section wrap zh-sec" aria-labelledby="zh-caps-title">
        <SectionHead id="zh-caps-title" eyebrow={capabilities.eyebrow} title={capabilities.title} />
        <ul className="zh-caps">
          {capabilities.items.map((it) => (
            <li key={it.title} className="zh-cap">
              <span className="zh-cap__icon"><Icon name={it.icon} size={26} /></span>
              {it.badge && <span className="zh-badge is-new">{it.badge}</span>}
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 5 — WHAT'S NEW */}
      <section id="whats-new" className="section wrap zh-sec" aria-labelledby="zh-new-title">
        <SectionHead id="zh-new-title" eyebrow={whatsNew.eyebrow} title={whatsNew.title} />
        <div className="zh-new">
          <article className="zh-new__item">
            <div className="zh-new__media">
              <TryOnSlider
                label={whatsNew.photo.sliderLabel}
                labelBefore={whatsNew.photo.before}
                labelAfter={whatsNew.photo.after}
                before={realTryOn
                  ? <Image src={tryBefore.src} alt={whatsNew.photo.altBefore} fill sizes="(min-width: 900px) 44vw, 92vw" />
                  : <div className="zh-studio" role="img" aria-label={whatsNew.photo.altBefore}><FigureArt className="zh-fig" shirt="#3a3a42" shade="#2b2b32" collar="tee" /></div>}
                after={realTryOn
                  ? <Image src={tryAfter.src} alt={whatsNew.photo.altAfter} fill sizes="(min-width: 900px) 44vw, 92vw" />
                  : <div className="zh-studio" role="img" aria-label={whatsNew.photo.altAfter}><FigureArt className="zh-fig" shirt={sage.color} shade={sage.shade} collar="camp" /></div>}
              />
              {!realTryOn && <span className="zh-illus">{whatsNew.photo.illustration}</span>}
            </div>
            <div className="zh-new__copy">
              <p className="zh-label">{whatsNew.photo.label}</p>
              <h3 className="zh-h3 display">{whatsNew.photo.title}</h3>
              <p className="lead">{whatsNew.photo.text}</p>
              <ul className="zh-checks">{whatsNew.photo.points.map((pt) => <li key={pt}><Icon name="check" size={18} />{pt}</li>)}</ul>
            </div>
          </article>

          <article className="zh-new__item is-reverse">
            <div className="zh-new__media">
              <LiveCam content={whatsNew.live} photo={livePhoto} />
              {!livePhoto && <span className="zh-illus">{whatsNew.photo.illustration}</span>}
            </div>
            <div className="zh-new__copy">
              <p className="zh-label"><span className="zh-badge is-new">{whatsNew.live.tag}</span>{whatsNew.live.label}</p>
              <h3 className="zh-h3 display">{whatsNew.live.title}</h3>
              <p className="lead">{whatsNew.live.text}</p>
              <ul className="zh-checks">{whatsNew.live.points.map((pt) => <li key={pt}><Icon name="check" size={18} />{pt}</li>)}</ul>
            </div>
          </article>
        </div>
      </section>

      {/* 6 — WHY ZAHA */}
      <section id="why" className="section wrap zh-sec" aria-labelledby="zh-why-title">
        <SectionHead id="zh-why-title" eyebrow={why.eyebrow} title={why.title} />
        <table className="zh-vs">
          <caption className="sr-only">{`${why.them} compared with ${why.us}`}</caption>
          <thead>
            <tr>
              <td />
              <th scope="col">{why.them}</th>
              <th scope="col" className="is-us">{why.us}</th>
            </tr>
          </thead>
          <tbody>
            {why.rows.map((r, i) => (
              <tr key={r.title}>
                <th scope="row"><span className="zh-vs__n">{String(i + 1).padStart(2, '0')}</span>{r.title}</th>
                <td data-label={why.them}><Icon name="close" size={16} />{r.them}</td>
                <td data-label={why.us} className="is-us"><Icon name="check" size={18} />{r.us}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="stats zh-stats">
          {why.stats.map((s) => (
            <div key={s.label} className="stat">
              <div className="stat__num"><Counter value={s.value} /></div>
              <div className="stat__label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 7 — INTEGRATIONS */}
      <section id="integrations" className="section wrap zh-sec" aria-labelledby="zh-int-title">
        <SectionHead id="zh-int-title" eyebrow={integrations.eyebrow} title={integrations.title} lead={integrations.note} />
        <ul className="zh-ints">
          {integrations.items.map((it) => (
            <li key={it.name} className={`zh-int ${it.badgeTone === 'shopify' ? 'is-shopify' : ''}`}>
              <div className="zh-int__top">
                <span className="zh-int__icon"><Icon name={it.icon} size={30} /></span>
                <span className={`zh-badge ${it.badgeTone === 'shopify' ? 'is-shopify' : ''}`}>{it.badge}</span>
              </div>
              <h3>{it.name}</h3>
              <p className="muted">{it.text}</p>
              <ul className="flip__list">{it.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
              <Link href={it.cta.href} className="tlink zh-int__cta">{it.cta.label} <span aria-hidden="true">→</span></Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 8 — SHOPIFY SETUP GUIDE */}
      <section id="shopify-guide" className="section wrap zh-sec" aria-labelledby="zh-guide-title">
        <SectionHead id="zh-guide-title" eyebrow={guide.eyebrow} title={guide.title} lead={guide.lead} />
        <ol className="zh-guide">
          {guide.steps.map((s, i) => {
            const shot = shots[i];
            return (
              <li key={s.title} className={`zh-guide__step ${shot ? 'has-shot' : ''}`}>
                <span className="zh-guide__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div className="zh-guide__text">
                  <h3><span className="sr-only">{`Step ${i + 1}: `}</span>{s.title}</h3>
                  <p>{s.text}</p>
                  {s.link && <Link href={s.link.href} className="tlink zh-guide__link">{s.link.label} <span aria-hidden="true">→</span></Link>}
                </div>
                {shot && (
                  <GuideShot src={shot.src} width={shot.width} height={shot.height} alt={s.alt} step={i + 1} enlargeLabel={guide.enlarge} closeLabel={guide.close} />
                )}
              </li>
            );
          })}
        </ol>
        <p className="zh-guide__foot">
          {guide.footer.map((f) => (
            <span key={f.label}>{f.label}: <strong>{f.value}</strong></span>
          ))}
          <span>{guide.footerCta.prefix} <Link href={guide.footerCta.href} className="tlink text-accent">{guide.footerCta.label}</Link></span>
        </p>
      </section>

      {/* 9 — SETUP DAY */}
      <section id="setup-day" className="section wrap zh-sec" aria-labelledby="zh-setup-title">
        <div className="zh-setup">
          <div className="zh-setup__price">
            <div className="zh-setup__head">
              <p className="zh-setup__eyebrow">{setupDay.eyebrow}</p>
              <svg className="zh-setup__seal" viewBox="0 0 120 120" aria-hidden="true">
                <defs><path id="zh-seal-path" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" /></defs>
                <text><textPath href="#zh-seal-path">{`SETUP DAY · ${setupDay.price} · SETUP DAY · ${setupDay.price} · `}</textPath></text>
                <circle cx="60" cy="60" r="20" />
              </svg>
            </div>
            <p className="zh-setup__amount">{setupDay.price}</p>
            <p className="zh-setup__per">{setupDay.priceNote}</p>
          </div>
          <div className="zh-setup__body">
            <h2 id="zh-setup-title" className="display zh-setup__title">{setupDay.title}</h2>
            <p className="zh-setup__text">{setupDay.text}</p>
            <ul className="zh-setup__list">{setupDay.checklist.map((c) => <li key={c}><Icon name="check" size={18} />{c}</li>)}</ul>
            <Magnetic><Link href={setupDay.cta.href} className="btn zh-btn-ink"><span className="btn__label">{setupDay.cta.label}</span><Arrow /></Link></Magnetic>
          </div>
        </div>
      </section>

      {/* 10 — PRICING */}
      <section id="pricing" className="section wrap zh-sec" aria-labelledby="zh-price-title">
        <SectionHead id="zh-price-title" eyebrow={pricing.eyebrow} title={pricing.title} lead={pricing.lead} />
        <ul className="zh-plans">
          {pricing.plans.map((p) => (
            <li key={p.name} className={`zh-plan ${p.highlight ? 'is-hot' : ''}`}>
              {p.highlight && <span className="zh-plan__flag">{p.highlight}</span>}
              <h3 className="zh-plan__name">{p.name}</h3>
              <p className="zh-plan__price"><strong>{p.price}</strong><span>{pricing.period}<br />{pricing.tax}</span></p>
              <ul className="zh-plan__list">{p.features.map((f) => <li key={f}><Icon name="check" size={16} />{f}</li>)}</ul>
              <Link href={pricing.cta.href} className={`btn ${p.highlight ? '' : 'btn--ghost'} zh-plan__cta`}><span className="btn__label">{pricing.cta.label}</span></Link>
            </li>
          ))}
        </ul>
        <p className="zh-plans__note">{pricing.note} <Link href={pricing.customCta.href} className="tlink text-accent">{pricing.customCta.label}</Link></p>
      </section>

      {/* 11 — FAQ */}
      <section id="faq" className="section wrap zh-sec" aria-labelledby="zh-faq-title">
        <div className="zh-faq-wrap">
          <div>
            <p className="eyebrow">{faq.eyebrow}</p>
            <h2 id="zh-faq-title" className="h2 display zh-h2">{faq.title}</h2>
          </div>
          <div className="faq zh-faq">
            {faq.items.map(([q, a], i) => (
              <details key={q} className="faq__item" open={i === 0}>
                <summary className="faq__q">{q}<i aria-hidden="true" /></summary>
                <p className="faq__a-inner">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 12 — CLOSING CTA */}
      <section className="section wrap zh-sec" aria-labelledby="zh-close-title">
        <div className="cta-band zh-close">
          <span className="glow cta-band__glow" aria-hidden="true" />
          <h2 id="zh-close-title" className="h2 display">{closing.title}</h2>
          <p className="lead mt-2">{closing.text}</p>
          <div className="zh-actions zh-actions--center">
            <Magnetic><Link href={closing.primary.href} className="btn"><span className="btn__label">{closing.primary.label}</span><Arrow /></Link></Magnetic>
            <Magnetic><Link href={closing.secondary.href} className="btn btn--ghost"><span className="btn__label">{closing.secondary.label}</span></Link></Magnetic>
          </div>
        </div>
      </section>
    </main>
  );
}
