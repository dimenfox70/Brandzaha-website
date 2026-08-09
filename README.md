# BrandZaha Website — v2

A lean, portfolio-first, cinematic agency website for **BrandZaha** (Jaipur).
Dark UI · lime `#d8ff36` accent · CSS-3D + GSAP motion system · **no framework, no database, no build step.**

Deployable to standard PHP shared hosting (PHP 8+, Apache with `mod_rewrite`).

---

## Stack

- **PHP 8+** server-rendered partials — no database, no build tooling.
- **Modern CSS** (`assets/css/main.css`) — custom properties, Grid/Flex, no Bootstrap.
- **Vanilla JS** (`assets/js/main.js`) — core UI, zero dependencies, runs first.
- **Motion layer** (`assets/js/motion.js`) — progressive enhancement using
  GSAP (ScrollTrigger, Flip), Lenis smooth scroll and Splitting.js (all via CDN, deferred).
- **Apache `.htaccess`** — clean URLs, 301 redirects, security headers, caching, gzip/brotli.

The site is **fully functional without JavaScript and without the CDN libraries**:
content is server-rendered, external CSS/JS load non-blocking, and a failsafe
guarantees the preloader never traps content.

## Structure

```
partials/    bootstrap.php, functions.php, head.php, header.php, footer.php
data/        site.php, projects.php, services.php, testimonials.php, posts.php, landing.php
assets/      css/main.css, js/main.js, js/motion.js, img/, work/<slug>/
index.php work.php project.php services.php about.php blog.php contact.php
service-landing.php  send_mail.php  sitemap.php  404.php
.htaccess  robots.txt
```

## Pages & routes

| URL | File |
|-----|------|
| `/` | `index.php` |
| `/work/` | `work.php` |
| `/work/<slug>/` | `project.php?slug=…` |
| `/services/` | `services.php` |
| `/about/` | `about.php` |
| `/blog/` | `blog.php` |
| `/contact/` | `contact.php` |
| 9 SEO pages (e.g. `/web-development-jaipur/`, `/it-training-jaipur/`) | `service-landing.php?service=…` |
| `/sitemap.xml` | `sitemap.php` (dynamic) |
| 404 | `404.php` |

All v1 → v2 **301 redirects** are configured in `.htaccess` (clients, team, case-studies,
old case-study URLs, erp/crm/hrm → software, contact-us, about-us).

## Adding a portfolio project

1. Add one entry to `data/projects.php` (copy an existing block).
2. Drop images in `assets/work/<slug>/` (`hero.webp`, `01.webp`, …).
   **Missing images fall back to a generated gradient poster** — the site always renders.
3. Done — it appears on `/work/`, gets a page at `/work/<slug>/`, and joins the
   next-project loop and sitemap automatically.

## Lead forms

All forms POST to `send_mail.php` (AJAX, JSON response) which is hardened with:
input sanitisation, header-injection guards, a honeypot field, and per-IP rate limiting.
Mail is sent via PHP `mail()` to `brandzaha@gmail.com`.

## Analytics

GTM `GTM-PF8QR9LK` and GA4 `G-B2B6188HCL` are installed in `partials/head.php`.

## Accessibility & motion

Semantic HTML, keyboard navigable, visible focus states, skip link, and full
`prefers-reduced-motion` support (all animation disabled, content static).

## Local preview

```bash
# from the project root
php -S localhost:8000
# then browse http://localhost:8000/  (clean URLs need Apache; the built-in
# server serves files directly — use the included router for full routing)
```

## To do before launch (assets)

- Replace generated gradient posters with real WebP/AVIF images in `assets/work/<slug>/`
  and `assets/img/` (studio, team, blog).
- Add `assets/img/og-default.jpg` (1200×630) and `apple-touch-icon.png`.

---

© 2019–2026 BrandZaha.
