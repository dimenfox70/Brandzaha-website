import Link from 'next/link';
import { site } from '@/lib/site';
import { zaha } from '@/lib/zaha';
import { zahaFonts } from '@/components/zaha/fonts';
import WeaveCanvas from '@/components/zaha/WeaveCanvas';
import ScrollProgress from '@/components/zaha/ScrollProgress';
import DemoChat from '@/components/zaha/DemoChat';
import BeforeAfter from '@/components/zaha/BeforeAfter';
import Faq from '@/components/zaha/Faq';
import s from '@/components/zaha/zaha.module.css';

const TITLE = 'Zaha AI Shopping Assistant – AI stylist & virtual try-on for Shopify | Brandzaha';
const DESCRIPTION = 'Zaha is an AI shopping assistant for Shopify. It chats with shoppers, finds products from your catalogue and lets them try outfits on by photo or live camera.';
const OG = {
  title: 'Zaha AI Shopping Assistant',
  description: 'An AI stylist for your Shopify store, with photo and live camera try-on.',
};

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: zaha.path },
  openGraph: { type: 'website', siteName: site.name, url: zaha.path, title: OG.title, description: OG.description },
  twitter: { card: 'summary_large_image', title: OG.title, description: OG.description },
};

/* ---------- Copy ---------- */

const NAV = [
  { label: 'Demo', href: '#demo' },
  { label: 'Features', href: '#features' },
  { label: 'Integrations', href: '#integrations' },
  { label: 'Shopify guide', href: '#guide' },
  { label: 'Pricing', href: '#pricing' },
];

const MARQUEE = ['AI chat', 'Photo try-on', 'Live camera try-on', 'Curated picks', 'Voice search', 'Wishlist', 'Multi-currency', 'Add to bag in chat'];

const DEMO_STEPS = [
  'The shopper asks the way they would ask a person in your store.',
  'Zaha picks matching products from your catalogue, with live prices.',
  'They upload a photo and see the outfit on themselves.',
  'They choose a size and add it to the bag without leaving the chat.',
];

const CAPABILITIES = [
  { title: 'Natural-language shopping', text: '"Linen shirt for a beach wedding under ₹3,000." Zaha turns that into the right products from your live catalogue.', icon: <><path d="M4 5h16v11H8l-4 4z" /><path d="M8 10h8M8 13h5" /></> },
  { title: 'Photo virtual try-on', text: 'Shoppers upload one photo and see the outfit on their own body, with sleeves, fit and colours kept true to the product.', icon: <><path d="M12 3a3 3 0 0 0-3 3c0 1.3.8 2 2 2.7L12 9" /><path d="M12 9 3 16h18z" /></> },
  { title: 'Live camera try-on', text: 'Real-time try-on in the browser camera. Switch products mid-session and take a snapshot.', icon: <><rect x="3" y="6" width="13" height="12" rx="2" /><path d="m16 10 5-3v10l-5-3" /></> },
  { title: 'Smart suggestions', text: 'As shoppers type, Zaha completes the search from what your store actually sells, with ideas for the season and festivals.', icon: <><path d="M4 7h16M4 12h10M4 17h6" /><path d="m16 15 2 2 4-4" /></> },
  { title: 'Try on in your size', text: 'Shoppers pick their size before the try-on, so they can see whether an M sits snug or an XL hangs loose.', icon: <><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" /><path d="M9 9h6v6H9z" /></> },
  { title: 'Style score', text: 'One tap rates the look out of 10 for fit, colour and style, with a short tip on what to pair it with.', icon: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></> },
  { title: 'Colour match', text: "A selfie reads the shopper's skin tone, shows their top colours and colour pairs, and shops your products in them.", icon: <><circle cx="8" cy="9" r="3" /><circle cx="16" cy="9" r="3" /><circle cx="12" cy="16" r="3" /></> },
  { title: 'Add to bag in chat', text: 'Variant and size pickers inside the chat, straight into the Shopify cart. Wishlist for later.', icon: <><path d="M6 7h12l-1 13H7z" /><path d="M9 7a3 3 0 0 1 6 0" /></> },
  { title: 'Private by design', text: 'Shopper photos are used for the try-on and then discarded. Nothing is stored on our side.', icon: <><path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6z" /><path d="m9 12 2 2 4-4" /></> },
];

const PHOTO_POINTS = [
  "Keeps the shopper's face, body and background unchanged.",
  'Try the full look from the product photo, or only the item itself.',
  'Follows tuck, sleeve length and colour from the product image.',
  'HD results in about 20–30 seconds, right inside the chat. Tap to zoom in on the fabric.',
];

const LIVE_POINTS = [
  'Swap between products without restarting the session.',
  'Take a snapshot and add the item to the bag from the same screen.',
  'You set the session length and how many sessions each shopper gets per day.',
  'Rate the look out of 10 while the camera is on.',
  'Available on the Plus plan.',
];

const WHY = [
  { title: 'It knows your catalogue', them: 'Scripted answers and a link to the search page.', us: 'Reads your live Shopify products, prices and stock on every question.' },
  { title: 'It shows, not tells', them: 'Text replies only.', us: 'Product cards, size pickers, photo try-on and live camera try-on in the same chat.' },
  { title: 'Made for Indian brands', them: 'Dollar pricing, foreign support hours.', us: 'Rupee plans, local payment through BezyPay, and a team you can call.' },
  { title: 'You stay in control', them: 'One fixed look and behaviour.', us: 'Your colours, your greeting, your pinned products, your daily try-on limits.' },
  { title: 'Set up by people', them: 'A help article and a support ticket.', us: 'Our technical team can set the whole thing up in one day for ₹599.' },
];

const STATS = [
  { value: '~20s', label: 'for a photo try-on result' },
  { value: 'HD', label: 'try-on images, up to 4K' },
  { value: '1', label: 'app embed to switch it on' },
  { value: '0', label: 'shopper photos stored' },
];

const INTEGRATIONS = [
  {
    name: 'Shopify', state: 'Available now', ready: true,
    text: 'Installs as a Shopify app with a theme app embed. No code changes to your theme.',
    points: ['Live products, variants and stock', 'Add to cart and wishlist', 'Photo and live camera try-on', 'Works with any Online Store 2.0 theme'],
  },
  {
    name: 'WordPress', state: 'Setup by our team',
    text: 'For WooCommerce stores. We connect the assistant to your product feed and cart, then add the chat to your theme.',
    points: ['WooCommerce products and cart', 'Photo try-on', 'Same chat design and settings', 'Book a setup day to get started'],
  },
  {
    name: 'Custom', state: 'Setup by our team',
    text: 'For stores built on Next.js, React, Laravel or anything else. We add one script and connect it to your product API.',
    points: ['One script tag on your site', 'Connects to your product and cart APIs', 'Works for web and app webviews', 'Scoped and quoted after a short call'],
  },
];

const GUIDE = [
  { title: 'Get your install link', text: <>Message our team with your store address, for example <code>yourstore.myshopify.com</code>. We send a private install link made for your store.</> },
  { title: 'Install the app', text: <>Open the link while signed in to Shopify admin and click <b>Install</b>. Zaha AI Shopping Assistant now appears under <b>Apps</b>.</> },
  { title: 'Set up the assistant', text: "In the app, choose the assistant's name, greeting, colours and where the launcher sits. Pin any products you want it to recommend first." },
  { title: 'Switch on the app embed', text: <>Go to <b>Online Store → Themes → Customize → App embeds</b>, turn on <b>Zaha Assistant</b> and click <b>Save</b>.</> },
  { title: 'Turn on try-on', text: <>In the app{"'"}s <b>Virtual try-on</b> section, enable photo try-on, pick which product types can be tried, and set daily limits. Add live camera try-on if your plan includes it.</> },
  { title: 'Choose a plan', text: <>Open <b>Plan &amp; billing</b>, pick Pro or Plus and pay securely with UPI, card or net banking. The assistant goes live on your store as soon as the plan is active.</> },
];

const HIRE_LIST = [
  'Install and connect on Shopify, WordPress or a custom site',
  'Colours, greeting and launcher matched to your brand',
  'Try-on enabled for the product types that suit it',
  'Curated picks and daily limits configured',
  'A walkthrough for you and your team',
];

const PLANS = [
  {
    name: 'Pro', monthly: '₹2,499', yearly: '₹24,990',
    features: [<><b>Unlimited</b> chats</>, <><b>300</b> photo try-ons a month</>, "Try on in the shopper's size", 'Style score and colour match', 'Smart suggestions and curated picks'],
  },
  {
    name: 'Plus', tag: 'Live camera', monthly: '₹9,999', yearly: '₹99,990', popular: true,
    features: ['Everything in Pro', <><b>500</b> photo try-ons a month</>, <><b>60</b> live camera try-on minutes a month</>, 'Live style score and HD snapshots', 'Priority help from our team'],
  },
];

const FAQ = [
  { q: 'Do I need a developer?', a: "Not on Shopify. Installing the app and switching on the app embed takes about 20 minutes. If you'd rather not, our team sets it up for ₹599." },
  { q: 'Is it on the Shopify App Store?', a: 'Not yet. For now we install it privately for each store through a custom install link, which also lets us set it up with you.' },
  { q: "What happens to shoppers' photos?", a: "The photo is sent for the try-on, the result is shown in the chat, and both are discarded. We don't keep shopper photos." },
  { q: 'Which products work with try-on?', a: 'Clothing works best: tops, shirts, dresses, kurtas, trousers, skirts and jackets. You choose which product types show the Try on button.' },
  { q: 'Can it match my brand?', a: "Yes. You set the colours, the assistant's name, its greeting and where the launcher appears. It sits inside your theme, not on top of it." },
  { q: 'How do I pay?', a: 'Through BezyPay, with UPI, cards or net banking. Plans are paid monthly or yearly and you get a reminder before renewal.' },
];

/* ---------- Structured data ---------- */

const rupees = (str) => Number(str.replace(/[^0-9]/g, ''));
const jsonLd = (data) => ({ __html: JSON.stringify(data).replace(/</g, '\\u003c') });

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Zaha AI Shopping Assistant',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, Shopify',
  description: DESCRIPTION,
  url: `${site.domain}${zaha.path}`,
  publisher: { '@type': 'Organization', name: site.name, url: site.domain },
  offers: PLANS.map((p) => ({ '@type': 'Offer', name: p.name, price: rupees(p.monthly), priceCurrency: 'INR' })),
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

/* ---------- Page ---------- */

const Arrow = () => <span className={s.arr} aria-hidden="true">→</span>;

function SecHead({ id, eyebrow, title, lede }) {
  return (
    <div className={s.secHead}>
      <div>
        <p className={s.eyebrow}>{eyebrow}</p>
        <h2 id={id} className={`${s.display} ${s.h2}`}>{title}</h2>
      </div>
      <p className={s.lede}>{lede}</p>
    </div>
  );
}

export default function ZahaPage() {
  return (
    <div className={`${s.page} ${zahaFonts}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(productSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />

      {/* Top bar */}
      <header className={s.nav}>
        <nav aria-label="Zaha AI Shopping Assistant" className={`${s.wrap} ${s.navInner}`}>
          <Link href="/" className={s.logo}>Brand<i>Zaha</i><small>AI Assistant</small></Link>
          <ul className={s.navLinks}>
            {NAV.map((item) => <li key={item.href}><a href={item.href}>{item.label}</a></li>)}
          </ul>
          <div className={s.navR}>
            <a className={`${s.btn} ${s.ghost}`} href={zaha.loginUrl}>Merchant login</a>
            <Link className={`${s.btn} ${s.btnPrimary} ${s.hideSm}`} href={zaha.setupDayHref}>Book setup · ₹599</Link>
          </div>
        </nav>
        <ScrollProgress />
      </header>

      <main id="main">
        {/* Hero */}
        <section className={s.hero} aria-labelledby="zaha-title">
          <WeaveCanvas />
          <div className={`${s.wrap} ${s.heroInner}`}>
            <p className={s.tag}><span className={s.dot} aria-hidden="true" />New · Live camera try-on</p>
            <h1 id="zaha-title" className={s.display}>Your store,<br /><span className={s.outline}>now with a</span> <span className={s.ac}>stylist.</span></h1>
            <div className={s.heroRow}>
              <p className={s.lede}>Zaha is an AI shopping assistant that talks to your shoppers, finds the right product from your real catalogue, and lets them see it on themselves before they buy.</p>
              <div className={s.heroCta}>
                <a className={`${s.btn} ${s.btnPrimary}`} href="#demo">Watch the demo <Arrow /></a>
                <a className={s.btn} href="#guide">Add it to Shopify</a>
              </div>
            </div>
            <p className={s.loginStrip}>Already installed Zaha? <a className={s.u} href={zaha.loginUrl}>Log in to your dashboard <span aria-hidden="true">→</span></a></p>
          </div>
        </section>

        {/* Marquee */}
        <div className={s.marquee} aria-hidden="true">
          <div className={s.marqueeTrack}>
            {/* Two copies back to back so the loop is seamless */}
            {[...MARQUEE, ...MARQUEE].flatMap((word, i) => [
              <span key={`w${i}`}>{word}</span>,
              <span key={`s${i}`}><b>✦</b></span>,
            ])}
          </div>
        </div>

        {/* Demo */}
        <section className={s.band} id="demo" aria-labelledby="demo-title">
          <DemoChat steps={DEMO_STEPS}>
            <p className={s.eyebrow}>Live demo</p>
            <h2 id="demo-title" className={`${s.display} ${s.h2}`}>One chat.<br />Search, style,<br />try, buy.</h2>
            <p className={s.lede}>This is what a shopper sees on your storefront. Zaha understands plain language, reads your live products and stock, and keeps the whole journey inside one conversation.</p>
          </DemoChat>
        </section>

        {/* Capabilities */}
        <section className={s.band} id="capabilities" aria-labelledby="capabilities-title">
          <div className={s.wrap}>
            <SecHead
              id="capabilities-title"
              eyebrow="Capabilities"
              title={<>Everything a great<br />sales assistant does</>}
              lede="Built for fashion and lifestyle stores first, and works for any catalogue where shoppers need help choosing."
            />
            <ul className={s.capGrid}>
              {CAPABILITIES.map((c) => (
                <li key={c.title} className={s.cap}>
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">{c.icon}</svg>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* What's new */}
        <section className={`${s.band} ${s.newBand}`} id="features" aria-labelledby="features-title">
          <div className={s.wrap}>
            <SecHead
              id="features-title"
              eyebrow="What's new"
              title={<>See it on.<br />Then buy it.</>}
              lede={'Returns in fashion e-commerce are mostly about fit and look. Try-on answers "will this suit me?" before the order is placed.'}
            />

            <div className={s.feat}>
              <div className={s.featVis}>
                <BeforeAfter />
              </div>
              <div className={s.featCopy}>
                <span className={s.badge}>Photo try-on</span>
                <h3>One photo.<br />The whole look.</h3>
                <p className={s.lede}>{"Powered by Google's virtual try-on model, with a styling pass that matches how the product is actually worn."}</p>
                <ul>{PHOTO_POINTS.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
            </div>

            <div className={`${s.feat} ${s.rev}`}>
              <div className={s.featVis}>
                <div className={s.live} role="img" aria-label="Illustration of live camera try-on: the outfit colour changes as the shopper picks products from a strip">
                  <div className={s.fig} />
                  <div className={s.scan} />
                  <div className={s.liveHud}>
                    <div className={s.liveTop}><span className={s.rec}><i />LIVE 00:38</span><span className={s.rec}>Snapshot</span></div>
                    <div className={s.strip}><i /><i /><i /></div>
                  </div>
                </div>
              </div>
              <div className={s.featCopy}>
                <span className={`${s.badge} ${s.badgeAlt}`}>Live camera · Plus plan</span>
                <h3>A fitting room<br />in the browser.</h3>
                <p className={s.lede}>The shopper turns on their camera and the outfit appears on them in real time. They move, it moves.</p>
                <ul>{LIVE_POINTS.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Zaha */}
        <section className={s.band} id="why" aria-labelledby="why-title">
          <div className={s.wrap}>
            <SecHead
              id="why-title"
              eyebrow="Why Zaha"
              title={<>Not another<br />FAQ bot</>}
              lede="Most store chat widgets answer shipping questions. Zaha is built to sell, and to show the product on the person buying it."
            />
            <ul className={s.whyList}>
              {WHY.map((row) => (
                <li key={row.title} className={s.why}>
                  <h3>{row.title}</h3>
                  <p className={s.them}>{row.them}</p>
                  <p className={s.us}>{row.us}</p>
                </li>
              ))}
            </ul>
            <ul className={s.stats}>
              {STATS.map((st) => <li key={st.label} className={s.stat}><b>{st.value}</b><span>{st.label}</span></li>)}
            </ul>
          </div>
        </section>

        {/* Integrations */}
        <section className={s.band} id="integrations" aria-labelledby="integrations-title">
          <div className={s.wrap}>
            <SecHead
              id="integrations-title"
              eyebrow="Integrations"
              title="Where it runs"
              lede="Shopify is ready today. For WordPress and custom-built stores, our team connects Zaha to your catalogue and cart for you."
            />
            <div className={s.intGrid}>
              {INTEGRATIONS.map((it) => (
                <article key={it.name} className={`${s.int} ${it.ready ? s.shopify : ''}`}>
                  <div className={s.intTop}><h3>{it.name}</h3><span className={`${s.state} ${it.ready ? s.ok : ''}`}>{it.state}</span></div>
                  <p>{it.text}</p>
                  <ul>{it.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Shopify setup guide */}
        <section className={`${s.band} ${s.guide}`} id="guide" aria-labelledby="guide-title">
          <div className={s.wrap}>
            <SecHead
              id="guide-title"
              eyebrow="Shopify setup guide"
              title={<>Live in your store<br />in six steps</>}
              lede="You need to be the store owner or a staff member with permission to manage apps and edit the theme."
            />
            <ol className={s.steps}>
              {GUIDE.map((step) => (
                <li key={step.title} className={s.step}>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
            <p className={s.time}>
              <span><b>Time needed:</b> about 20 minutes</span>
              <span><b>Code changes:</b> none</span>
              <span><b>Prefer not to do it yourself?</b> <a className={s.u} href="#hire">Book our team for ₹599</a></span>
            </p>
          </div>
        </section>

        {/* Hire an expert */}
        <section className={`${s.band} ${s.hire}`} id="hire" aria-labelledby="hire-title">
          <div className={s.wrap}>
            <div className={s.hireCard}>
              <div>
                <p className={s.eyebrow}>Hire an expert for a day</p>
                <h2 id="hire-title" className={s.display}>We set it up.<br />You sell.</h2>
                <p>A BrandZaha technical expert works on your store for one full day. They install Zaha, match it to your brand, set up try-on for the right products and test it with you before they sign off.</p>
                <div className={s.price}><b>₹599</b><span>for one working day</span></div>
              </div>
              <div className={s.hireList}>
                <ul>{HIRE_LIST.map((t) => <li key={t}>{t}</li>)}</ul>
                <Link className={`${s.btn} ${s.btnPrimary} ${s.btnDark}`} href={zaha.setupDayHref}>Book a setup day <Arrow /></Link>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className={s.band} id="pricing" aria-labelledby="pricing-title">
          <div className={s.wrap}>
            <SecHead
              id="pricing-title"
              eyebrow="Pricing"
              title="Plans in rupees"
              lede="Two plans, both with unlimited chats. Pay monthly, or yearly and get two months free, through BezyPay."
            />
            <div className={s.plans}>
              {PLANS.map((plan) => (
                <article key={plan.name} className={`${s.plan} ${plan.popular ? s.pop : ''}`}>
                  <h3 className={s.nm}>{plan.name}{plan.tag && <em>{plan.tag}</em>}</h3>
                  <p className={s.amt}>{plan.monthly}<small>/month</small></p>
                  <p className={s.yr}>or {plan.yearly} a year</p>
                  <ul>{plan.features.map((f, i) => <li key={i}>{f}</li>)}</ul>
                  <a className={`${s.btn} ${plan.popular ? s.btnPrimary : ''}`} href="#guide">Get started</a>
                </article>
              ))}
            </div>
            <p className={s.fine}>{"Prices exclude GST. If a plan ends and isn't renewed, the assistant switches off on your store; your settings and chats are kept for when you come back. Need more try-ons or live minutes? We can set a custom plan."}</p>
          </div>
        </section>

        {/* FAQ */}
        <section className={s.band} id="faq" aria-labelledby="faq-title">
          <div className={`${s.wrap} ${s.faq}`}>
            <div>
              <p className={s.eyebrow}>Questions</p>
              <h2 id="faq-title" className={`${s.display} ${s.h2}`}>Good to know</h2>
            </div>
            <Faq items={FAQ} />
          </div>
        </section>

        {/* Final CTA */}
        <section className={`${s.band} ${s.ctaEnd}`} aria-labelledby="cta-title">
          <div className={s.wrap}>
            <p className={s.eyebrow}>Ready when you are</p>
            <h2 id="cta-title" className={s.display}>Let shoppers<br />try it <span>on.</span></h2>
            <div className={s.heroCta}>
              <a className={`${s.btn} ${s.btnPrimary}`} href="#guide">Start on Shopify <Arrow /></a>
              <Link className={s.btn} href={zaha.setupDayHref}>Book a setup day · ₹599</Link>
            </div>
            <p className={s.loginStrip}>Already a merchant? <a className={s.u} href={zaha.loginUrl}>Log in <span aria-hidden="true">→</span></a></p>
          </div>
        </section>

        <footer className={s.footer}>
          <div className={`${s.wrap} ${s.footerInner}`}>
            <span>© {new Date().getFullYear()} BrandZaha. We design brands that move people.</span>
            <span>Zaha AI Shopping Assistant · <a className={s.u} href={zaha.loginUrl}>Merchant login</a> · <Link className={s.u} href="/contact">Contact</Link></span>
          </div>
        </footer>
      </main>
    </div>
  );
}
