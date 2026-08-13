'use client';
import Link from 'next/link';
import { poster } from '@/lib/poster';
import Icon from './Icon';
import Reveal from './Reveal';
import SplitText from './SplitText';
import Magnetic from './Magnetic';

const storePoster = poster(['#1a1207', '#3a2410', '#e7c65b'], 'aurum-store');

export default function EcomHero() {
  const onMove = (e) => {
    if (!window.matchMedia('(hover: hover)').matches) return;
    const scene = e.currentTarget;
    const r = scene.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    scene.querySelectorAll('[data-depth]').forEach((el) => {
      const d = parseFloat(el.getAttribute('data-depth')) || 10;
      el.style.setProperty('--px', (px * d).toFixed(1) + 'px');
      el.style.setProperty('--py', (py * d).toFixed(1) + 'px');
    });
  };
  const onLeave = (e) => {
    e.currentTarget.querySelectorAll('[data-depth]').forEach((el) => { el.style.setProperty('--px', '0px'); el.style.setProperty('--py', '0px'); });
  };

  return (
    <section className="ecom-hero wrap" onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="ecom-hero__text">
        <p className="eyebrow"><Reveal as="span">E-commerce · Jaipur</Reveal></p>
        <h1 className="page-head__title"><SplitText hero text="Stores that" /><br /><span className="text-accent"><SplitText hero text="sell." /></span></h1>
        <Reveal as="p" className="page-head__lead lead" delay={0.15}>We design and build online stores that turn browsers into buyers — on <strong>Shopify</strong>, <strong>WooCommerce</strong>, or a fully custom <strong>Next.js</strong> headless build. Fast, beautiful, and made to scale.</Reveal>
        <Reveal className="pill-row mt-3" delay={0.2}>
          <span className="pill"><Icon name="bag" size={16} /> Shopify &amp; Shopify Plus</span>
          <span className="pill"><Icon name="cart" size={16} /> WooCommerce</span>
          <span className="pill"><Icon name="bolt" size={16} /> Headless Next.js</span>
        </Reveal>
        <Reveal className="mt-3" delay={0.25} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Magnetic><a href="#enquire" className="btn"><span className="btn__label">Start your store</span> <span className="btn__arrow" aria-hidden="true">↗</span></a></Magnetic>
          <Magnetic><a href="#work" className="btn btn--ghost"><span className="btn__label">See store work</span></a></Magnetic>
        </Reveal>
      </div>

      <div className="ecom-hero__visual" aria-hidden="true">
        <div className="ecom-glow" data-depth="6" />

        <div className="shopify-mark" data-depth="16">
          <svg className="shopify-mark__img" viewBox="0 0 300 348" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Shopify">
            <defs>
              <linearGradient id="bzShop" x1="0.15" y1="0" x2="0.5" y2="1"><stop offset="0" stopColor="#95BF47" /><stop offset="1" stopColor="#5E8E3E" /></linearGradient>
            </defs>
            <path d="M112 96 V74 a38 38 0 0 1 76 0 V96" fill="none" stroke="#4c7a2f" strokeWidth="17" strokeLinecap="round" />
            <path d="M66 90 h168 a16 16 0 0 1 15.9 14.6 l16 210 a20 20 0 0 1 -19.9 21.4 H54 a20 20 0 0 1 -19.9 -21.4 l16 -210 A16 16 0 0 1 66 90 z" fill="url(#bzShop)" />
            <path d="M66 90 h168 a16 16 0 0 1 15.9 14.6 l1.6 21 H48.5 l1.6 -21 A16 16 0 0 1 66 90 z" fill="#a9cf5e" opacity=".45" />
            <text x="150" y="262" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="158" fill="#ffffff">S</text>
          </svg>
        </div>

        <div className="phone" data-depth="30">
          <div className="phone__inner">
            <div className="phone__frame">
              <span className="phone__notch" />
              <div className="phone__screen">
                <div className="store">
                  <div className="store__bar"><span className="store__logo">AURUM</span><span className="store__cart"><Icon name="bag" size={18} /><b>2</b></span></div>
                  <div className="store__hero" style={{ backgroundImage: `url("${storePoster}")` }}><span className="store__tag">NEW IN</span></div>
                  <div className="store__body">
                    <div className="store__row"><span className="store__title">Linen Overcoat</span><span className="store__stars">★★★★★</span></div>
                    <div className="store__row"><span className="store__price">₹4,999 <s>₹7,499</s></span><span className="store__stars" style={{ color: 'var(--ink-dim)' }}>128 reviews</span></div>
                    <div className="store__btn">Add to cart</div>
                    <div className="store__grid"><i /><i /><i /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <span className="ecom-chip ecom-chip--a" data-depth="44"><span className="dot" /> +52% conversion</span>
        <span className="ecom-chip ecom-chip--b" data-depth="52"><span className="dot" /> 1.5s load time</span>
      </div>
    </section>
  );
}
