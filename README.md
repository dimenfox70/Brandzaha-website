# BrandZaha — Website (Next.js)

A dark, cinematic, portfolio-first website for **BrandZaha**, a creative & digital
agency in Jaipur. Rebuilt in **Next.js (App Router)** with **Framer Motion** and
**Lenis** for rich animation and instant page transitions.

## Highlights

- **Booklet portfolio** (`/work`) — an interactive flip-book of projects: two-page
  spreads (picture + case-study details), drag / arrow-key page turns, a progress
  bar, and a **filmstrip scroller** to jump between projects.
- **AI chatbot** — "Ask Zaha AI" floating assistant (bottom-right) backed by
  `/api/chat`. Ships with a smart rule-based demo brain and is **ready to plug into
  a real LLM** — set `OPENAI_API_KEY` (and optionally `OPENAI_MODEL`) and it proxies
  to the model automatically. Voice agent is stubbed ("coming soon") for the next pass.
- **Animated E-commerce page** (`/ecommerce`) — a big Shopify bag bleeding off the
  hero with a live phone-store mockup, floating stat chips, and mouse-parallax depth;
  platform breakdown for **Shopify / WooCommerce / headless Next.js**.
- **Tech-ready products** section — our own IP (ZahaCommerce, ZahaCRM, ZahaBot,
  ZahaLearn, ZahaEstate, ZahaDine) shown on Home and Work.
- Full motion system: split-text reveals, 3D tilt cards, magnetic buttons, custom
  cursor, full-screen animated menu, preloader, marquees, animated counters — all
  `prefers-reduced-motion` aware.

## Stack

- **Next.js 14** (App Router, React Server Components) · **React 18**
- **Framer Motion** (animation) · **Lenis** (smooth scroll)
- **next/font** self-hosted Google fonts (Anton + Epilogue) — no CDN, fast LCP
- Hand-written CSS design system (`app/globals.css`) — no Tailwind, no UI kit
- API routes for the chatbot (`/api/chat`) and lead form (`/api/contact`)

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

## Deploy

Deploy to **Vercel** (recommended) or any Node host. Optional env vars:

| Variable | Purpose |
|----------|---------|
| `OPENAI_API_KEY` | Makes the chatbot answer with a real LLM (else demo brain). |
| `OPENAI_MODEL` | Override model (default `gpt-4o-mini`). |
| `RESEND_API_KEY` | Delivers contact-form emails via Resend (recommended in production). |
| `CONTACT_TO` | Override lead inbox (default `Brandzaha@gmail.com`). |

## Structure

```
app/
  layout.jsx  template.jsx  globals.css   page.jsx (Home)
  work/page.jsx  work/[slug]/page.jsx      services/page.jsx
  ecommerce/page.jsx  about/page.jsx  blog/  contact/page.jsx
  api/chat/route.js   api/contact/route.js   sitemap.js  robots.js  not-found.jsx
components/  Booklet, Chatbot, EcomHero, Header, Footer, Cursor, Preloader,
             SmoothScroll, Reveal, SplitText, TiltCard, Magnetic, Counter,
             Marquee, WorkCard, ServiceFlip, Products, ContactForm, Faq, Icon, Poster
lib/         site, projects, services, products, testimonials, posts, poster
```

## Content

All content lives in `lib/*.js`. Add a project = one entry in `lib/projects.js`
(it appears in the booklet, gets a `/work/<slug>` page, and joins the sitemap).
Images fall back to generated gradient posters until real assets are added.

## Legacy

The previous hand-built PHP version is preserved under **`legacy-php/`** for
reference (still deployable to shared hosting).

---

© 2019–2026 BrandZaha.
