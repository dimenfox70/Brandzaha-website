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
- **CMS admin panel** (`/admin`) — a password-protected dashboard to edit every
  piece of site content (studio/site settings, projects, services, products,
  testimonials, blog posts) and manage captured leads, backed by Supabase.
  Changes go live immediately, no redeploy needed. See **CMS admin** below.
- Full motion system: split-text reveals, 3D tilt cards, magnetic buttons, custom
  cursor, full-screen animated menu, preloader, marquees, animated counters — all
  `prefers-reduced-motion` aware.

## Stack

- **Next.js 14** (App Router, React Server Components) · **React 18**
- **Framer Motion** (animation) · **Lenis** (smooth scroll)
- **next/font** self-hosted Google fonts (Anton + Epilogue) — no CDN, fast LCP
- Hand-written CSS design system (`app/globals.css`) — no Tailwind, no UI kit
- **Supabase** (Postgres) — CMS content + captured leads, read/written server-side
  only via the service-role key (never exposed to the browser)
- Custom cookie-based admin auth (scrypt password hashing + signed JWT session,
  no third-party auth needed for a single admin account)
- API routes for the chatbot (`/api/chat`) and lead form (`/api/contact`)

## Run locally

```bash
cp .env.example .env.local   # fill in SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ADMIN_SESSION_SECRET
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

Without the Supabase env vars set, the site still runs and renders fine — every
`lib/*.js` content module falls back to its built-in defaults. The `/admin`
panel itself needs `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` to work.

## CMS admin

Visit `/admin` and sign in (see **Admin login** below) to manage:

- **Site settings** — studio name, tagline, contact details, social links,
  analytics IDs, nav — shown in the header, footer, contact page and structured data.
- **Projects, Services, Products, Testimonials, Blog posts** — full create /
  edit / publish-unpublish / delete for each, with the same fields the
  original static site shipped with (results, testimonials, category tags, etc.)
- **Leads** — every contact-form submission across the site (main contact
  form, e-commerce quote form, etc.) is stored automatically, in addition to
  the existing email delivery. Filter by status (new / contacted / qualified
  / won / lost), add follow-up notes, and export to CSV.

Edits call `revalidatePath()` so the live site reflects changes within seconds
— no rebuild or redeploy required.

### Admin login

The database is seeded with one admin account:

- Email: `meit10swami@gmail.com`
- A one-time password was generated for this account when the CMS was set up
  — check the session that ran the setup, or reset it directly in Supabase:
  `select id from admin_users;` then update `password_hash` (see
  `lib/auth/password.js` for the `salt:scryptHash` format), or delete the row
  and re-insert one with a password you choose.

Admin routes are protected by `middleware.js` (session cookie check) with a
second check inside every server action (`lib/admin/session.js`) — defense in
depth even if the middleware config ever changes.

## Deploy

Deploy to **Vercel** (recommended) or any Node host. Env vars:

| Variable | Purpose |
|----------|---------|
| `SUPABASE_URL` | Your Supabase project URL — required for the CMS/admin panel and lead capture. |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase **service role** secret key (Project Settings → API). Server-only, bypasses RLS — required for the admin panel to read/write. |
| `ADMIN_SESSION_SECRET` | Random 32+ char string used to sign admin session cookies. Required for `/admin` login. |
| `OPENAI_API_KEY` | Makes the chatbot answer with a real LLM (else demo brain). |
| `OPENAI_MODEL` | Override model (default `gpt-4o-mini`). |
| `RESEND_API_KEY` | Delivers contact-form emails via Resend (recommended in production). |
| `CONTACT_FROM` | Override the "from" address used by Resend. |
| `CONTACT_TO` | Override the lead inbox email (else the CMS site-settings contact email). |

## Structure

```
app/
  layout.jsx  template.jsx  globals.css   page.jsx (Home)
  work/page.jsx  work/[slug]/page.jsx      services/page.jsx
  ecommerce/page.jsx  about/page.jsx  blog/  contact/page.jsx
  api/chat/route.js   api/contact/route.js   sitemap.js  robots.js  not-found.jsx
  admin/              CMS admin panel (login + protected dashboard, see below)
components/  Booklet, Chatbot, EcomHero, Header, Footer, Cursor, Preloader,
             SmoothScroll, Reveal, SplitText, TiltCard, Magnetic, Counter,
             Marquee, WorkCard, ServiceFlip, Products, ContactForm, Faq, Icon, Poster
lib/         site, projects, services, products, testimonials, posts, poster —
             each exports the original static defaults *and* an async
             `getX()` that reads the CMS (Supabase), falling back to the
             defaults if Supabase isn't configured or has no rows yet.
lib/supabase/  server-only Supabase client (service-role key)
lib/auth/      password hashing (scrypt) + signed session tokens (jose)
lib/admin/     requireAdminSession() helper used by every admin page/action
middleware.js  protects /admin/* — redirects to /admin/login if unauthenticated
```

Admin routes:

```
app/admin/login/                 sign-in form
app/admin/(dashboard)/           protected shell (sidebar nav + logout)
  page.jsx                       dashboard (content + lead counts)
  site/                          site settings
  projects/ services/ products/  content CRUD (list, new, [id] edit+delete)
  testimonials/ posts/
  leads/                         lead inbox (filter, CSV export, [id] detail)
```

## Content

Site content is managed through the **CMS admin panel** (`/admin`) backed by
Supabase — see above. `lib/*.js` still exports the original static arrays as
built-in defaults/fallback, so the site keeps working even if Supabase is
unreachable or not configured.

## Legacy

The previous hand-built PHP version is preserved under **`legacy-php/`** for
reference (still deployable to shared hosting).

---

© 2019–2026 BrandZaha.
