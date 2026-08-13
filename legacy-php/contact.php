<?php
require __DIR__ . '/partials/bootstrap.php';

$meta['title']     = 'Contact BrandZaha — Start a Project | Jaipur Agency';
$meta['desc']      = 'Tell us about your project. Get in touch with BrandZaha in Jaipur by form, WhatsApp, call or email. We reply within one business day.';
$meta['canonical'] = '/contact/';
$meta['schema'][]  = [
    '@context' => 'https://schema.org',
    '@type'    => 'ContactPage',
    'url'      => abs_url('/contact/'),
];

require $ROOT . '/partials/head.php';
require $ROOT . '/partials/header.php';
?>
<main id="main">

  <section class="page-head wrap">
    <div class="glow hero__glow-a" aria-hidden="true" style="opacity:.16"></div>
    <p class="eyebrow reveal">Contact</p>
    <h1 class="page-head__title" data-split data-split-hero>Let’s<br><span class="text-accent">talk.</span></h1>
    <p class="page-head__lead lead reveal" data-delay="120">Tell us a little about your project and we’ll get back within one business day. Prefer to chat? WhatsApp or call us directly.</p>
  </section>

  <section class="section wrap">
    <div class="split" style="align-items:start;gap:clamp(2rem,6vw,5rem)">
      <!-- Form -->
      <div>
        <form class="stack" data-ajax action="/send_mail.php" method="post" novalidate>
          <input type="hidden" name="form_name" value="Contact">
          <input type="hidden" name="page_url" value="/contact/">
          <div class="hp" aria-hidden="true"><label>Leave this empty<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>

          <div class="form-grid">
            <div class="field">
              <label for="name">Name</label>
              <input id="name" name="name" type="text" required autocomplete="name" placeholder="Your name">
            </div>
            <div class="field">
              <label for="email">Email</label>
              <input id="email" name="email" type="email" required autocomplete="email" placeholder="you@company.com">
            </div>
            <div class="field">
              <label for="phone">Phone</label>
              <input id="phone" name="phone" type="tel" autocomplete="tel" placeholder="+91…">
            </div>
            <div class="field">
              <label for="project_type">Project type</label>
              <select id="project_type" name="project_type">
                <option value="">Select…</option>
                <option>Website / Web app</option>
                <option>Brand identity / Design</option>
                <option>Digital marketing / SEO</option>
                <option>Mobile app</option>
                <option>Custom software (ERP/CRM/HRM)</option>
                <option>Something else</option>
              </select>
            </div>
            <div class="field">
              <label for="budget">Budget range</label>
              <select id="budget" name="budget">
                <option value="">Select…</option>
                <option>Under ₹50k</option>
                <option>₹50k – ₹1.5L</option>
                <option>₹1.5L – ₹5L</option>
                <option>₹5L+</option>
              </select>
            </div>
            <div class="field">
              <label for="timeline">Timeline</label>
              <select id="timeline" name="timeline">
                <option value="">Select…</option>
                <option>ASAP</option>
                <option>1–3 months</option>
                <option>3–6 months</option>
                <option>Just exploring</option>
              </select>
            </div>
            <div class="field field--full">
              <label for="message">Project details</label>
              <textarea id="message" name="message" required placeholder="What are you looking to build? Share goals, links, anything useful."></textarea>
            </div>
          </div>

          <button type="submit" class="btn" data-magnetic="0.25"><span class="btn__label">Send message</span> <span class="btn__arrow" aria-hidden="true">↗</span></button>
          <p class="form-status" role="status" aria-live="polite"></p>
        </form>
      </div>

      <!-- Info -->
      <aside class="stack">
        <div class="info-list">
          <div class="info-list__item">
            <span>Email</span>
            <a href="mailto:<?= e($SITE['contact']['email']) ?>"><?= e($SITE['contact']['email']) ?></a>
          </div>
          <div class="info-list__item">
            <span>Phone / WhatsApp</span>
            <a href="tel:<?= e($SITE['contact']['phone']) ?>"><?= e($SITE['contact']['phone']) ?></a>
          </div>
          <div class="info-list__item">
            <span>Studio</span>
            <strong style="font-size:var(--step-0);line-height:1.5"><?= e($SITE['contact']['address']) ?></strong>
          </div>
          <div class="info-list__item">
            <span>Hours</span>
            <strong style="font-size:var(--step-0)"><?= e($SITE['contact']['hours']) ?></strong>
          </div>
        </div>

        <div style="display:flex;gap:1rem;flex-wrap:wrap">
          <a href="https://wa.me/<?= e($SITE['contact']['phone_raw']) ?>" class="btn" target="_blank" rel="noopener" data-magnetic="0.3"><?= bz_icon('whatsapp', 20) ?><span class="btn__label">WhatsApp</span></a>
          <a href="tel:<?= e($SITE['contact']['phone']) ?>" class="btn btn--ghost" data-magnetic="0.3"><?= bz_icon('phone', 20) ?><span class="btn__label">Call us</span></a>
        </div>

        <div class="split__media" style="aspect-ratio:16/11;margin-top:1rem">
          <iframe title="BrandZaha studio location" src="https://www.google.com/maps?q=Gordhan+Sky+Jhotwara+Jaipur&output=embed" width="100%" height="100%" style="border:0;filter:grayscale(1) invert(.92) contrast(.9)" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </aside>
    </div>
  </section>

</main>
<?php require $ROOT . '/partials/footer.php'; ?>
