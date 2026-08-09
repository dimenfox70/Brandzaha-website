<?php
require __DIR__ . '/partials/bootstrap.php';

$projects = require $ROOT . '/data/projects.php';

// E-commerce work = projects tagged 'E-commerce'
$ecomWork = array_filter($projects, fn($p) => in_array('E-commerce', $p['category'], true));

$meta['title']     = 'E-commerce Development in Jaipur — Shopify, WooCommerce & Next.js | BrandZaha';
$meta['desc']      = 'Online stores that sell. BrandZaha builds Shopify & Shopify Plus, WooCommerce, and custom headless Next.js/React stores — fast, conversion-focused, and made to scale.';
$meta['canonical'] = '/ecommerce-development-jaipur/';

// Platforms
$platforms = [
    [
        'name'    => 'Shopify',
        'icon'    => 'bag',
        'tint'    => '#7ab55c',
        'tagline' => 'Launch fast. Scale faster.',
        'desc'    => 'The fastest route to a polished, reliable store. We build custom Shopify and Shopify Plus themes, integrate the apps you need, and tune everything for conversion — no servers to manage.',
        'points'  => ['Custom theme development', 'Shopify Plus & headless', 'Payments, shipping & tax', 'App integration & migration', 'Conversion rate optimisation'],
        'ideal'   => 'Brands that want to launch quickly, sell globally, and grow without infrastructure headaches.',
    ],
    [
        'name'    => 'WooCommerce',
        'icon'    => 'cart',
        'tint'    => '#9b6ec8',
        'tagline' => 'Own your store, end to end.',
        'desc'    => 'Built on WordPress, WooCommerce gives you total control and content-plus-commerce in one place. We craft custom stores, build plugins, and keep them fast — all fully owned by you.',
        'points'  => ['Custom WordPress + Woo builds', 'Content & commerce together', 'Custom plugins & extensions', 'Any payment gateway', 'Full ownership, no lock-in'],
        'ideal'   => 'Content-driven brands and businesses that want to own their platform outright.',
    ],
    [
        'name'    => 'Custom · Next.js',
        'icon'    => 'bolt',
        'tint'    => '#5cffce',
        'tagline' => 'Headless. Bespoke. Instant.',
        'desc'    => 'When you want a store like nothing else — a React/Next.js storefront on top of commerce APIs and a headless CMS. Near-instant loads, total design freedom, and SEO built in.',
        'points'  => ['Headless architecture', 'Next.js / React storefront', 'Custom checkout flows', 'API & CMS integration', 'Ultra-fast, SEO-first'],
        'ideal'   => 'Ambitious D2C brands that need a signature, lightning-fast experience.',
    ],
];

$faqs = [
    ['Which platform is right for my store?', 'It depends on your goals. Shopify is fastest to launch and easiest to run; WooCommerce gives you full ownership and content flexibility; a custom Next.js headless build gives you unmatched speed and design freedom. Tell us your priorities and we’ll recommend honestly — we build all three.'],
    ['Can you migrate my existing store?', 'Yes. We migrate stores between platforms — products, customers, orders and SEO — with redirects in place so you don’t lose rankings or traffic.'],
    ['Do you handle payments and shipping?', 'Absolutely. We set up payment gateways (Razorpay, Stripe, PayPal and more), shipping rules, taxes and integrations with your logistics and inventory systems.'],
    ['Will my store be fast and rank on Google?', 'Speed and SEO are built in from the start — optimised images, clean markup, structured data and Core Web Vitals tuning. Our headless builds regularly score 95+ on Lighthouse.'],
    ['Do you support the store after launch?', 'Yes — we offer ongoing maintenance, new features, and conversion optimisation so your store keeps improving after go-live.'],
];
$faqSchema = ['@context' => 'https://schema.org', '@type' => 'FAQPage', 'mainEntity' => []];
foreach ($faqs as $f) { $faqSchema['mainEntity'][] = ['@type' => 'Question', 'name' => $f[0], 'acceptedAnswer' => ['@type' => 'Answer', 'text' => $f[1]]]; }
$meta['schema'][] = $faqSchema;
$meta['schema'][] = [
    '@context' => 'https://schema.org', '@type' => 'Service',
    'serviceType' => 'E-commerce Development',
    'provider' => ['@type' => 'Organization', 'name' => $SITE['name']],
    'areaServed' => ['@type' => 'City', 'name' => 'Jaipur'],
    'description' => $meta['desc'],
];

require $ROOT . '/partials/head.php';
require $ROOT . '/partials/header.php';
?>
<main id="main">

  <!-- HERO -->
  <section class="page-head wrap">
    <div class="glow hero__glow-a" aria-hidden="true" style="opacity:.2"></div>
    <p class="eyebrow reveal">E-commerce · Jaipur</p>
    <h1 class="page-head__title" data-split data-split-hero>Stores that<br><span class="text-accent">sell.</span></h1>
    <p class="page-head__lead lead reveal" data-delay="120">We design and build online stores that turn browsers into buyers — on <strong>Shopify</strong>, <strong>WooCommerce</strong>, or a fully custom <strong>Next.js</strong> headless build. Fast, beautiful, and made to scale.</p>
    <div class="pill-row mt-3 reveal" data-delay="160">
      <span class="pill"><?= bz_icon('bag', 16) ?> Shopify &amp; Shopify Plus</span>
      <span class="pill"><?= bz_icon('cart', 16) ?> WooCommerce</span>
      <span class="pill"><?= bz_icon('bolt', 16) ?> Headless Next.js</span>
    </div>
    <div class="mt-3 reveal" data-delay="200" style="display:flex;gap:1rem;flex-wrap:wrap">
      <a href="#enquire" class="btn" data-magnetic="0.3"><span class="btn__label">Start your store</span> <span class="btn__arrow" aria-hidden="true">↗</span></a>
      <a href="#work" class="btn btn--ghost" data-magnetic="0.3"><span class="btn__label">See store work</span></a>
    </div>
  </section>

  <!-- STATS -->
  <section class="section wrap" style="padding-block:clamp(2rem,4vw,3.5rem)">
    <div class="stats">
      <div class="stat reveal"><div class="stat__num" data-count="+52%">+52%</div><div class="stat__label">Avg. conversion lift</div></div>
      <div class="stat reveal" data-delay="60"><div class="stat__num" data-count="1.5s">1.5s</div><div class="stat__label">Avg. store load time</div></div>
      <div class="stat reveal" data-delay="120"><div class="stat__num" data-count="3">3</div><div class="stat__label">Platforms mastered</div></div>
      <div class="stat reveal" data-delay="180"><div class="stat__num" data-count="₹10Cr+">₹10Cr+</div><div class="stat__label">Client GMV powered</div></div>
    </div>
  </section>

  <!-- PLATFORMS -->
  <section class="section wrap" id="platforms">
    <div class="sec-head">
      <div>
        <p class="eyebrow reveal">Choose your platform</p>
        <h2 class="h2 sec-head__title reveal" data-delay="80" data-split>Three ways to build. One standard: excellence.</h2>
      </div>
    </div>

    <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))">
      <?php foreach ($platforms as $i => $pf): ?>
      <article class="tcard reveal tilt" data-tilt="6" data-delay="<?= $i * 80 ?>" style="display:flex;flex-direction:column;gap:1.1rem;--tint:<?= e($pf['tint']) ?>">
        <div class="tilt__inner" style="display:flex;flex-direction:column;gap:1.1rem;height:100%">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:1rem">
            <span class="flip__icon" style="color:<?= e($pf['tint']) ?>;margin:0"><?= bz_icon($pf['icon'], 46) ?></span>
            <span class="chip" style="border-color:<?= e($pf['tint']) ?>;color:<?= e($pf['tint']) ?>"><?= sprintf('0%d', $i + 1) ?></span>
          </div>
          <div>
            <h3 class="h3" style="font-size:var(--step-2)"><?= e($pf['name']) ?></h3>
            <p style="color:<?= e($pf['tint']) ?>;font-weight:600;margin-top:.3rem"><?= e($pf['tagline']) ?></p>
          </div>
          <p class="muted"><?= e($pf['desc']) ?></p>
          <ul class="flip__list" style="margin:.2rem 0">
            <?php foreach ($pf['points'] as $pt): ?><li style="--accent:<?= e($pf['tint']) ?>"><?= e($pt) ?></li><?php endforeach; ?>
          </ul>
          <p class="dim" style="margin-top:auto;padding-top:1rem;border-top:1px solid var(--line)"><strong style="color:var(--ink)">Ideal for:</strong> <?= e($pf['ideal']) ?></p>
        </div>
      </article>
      <?php endforeach; ?>
    </div>
    <p class="muted center mt-3" style="max-width:60ch;margin-inline:auto">Not sure which fits? <a href="#enquire" class="tlink text-accent">Tell us your goals</a> — we’ll recommend the right platform, honestly.</p>
  </section>

  <!-- E-COMMERCE WORK -->
  <section class="section wrap" id="work">
    <div class="sec-head">
      <div>
        <p class="eyebrow reveal">Store work</p>
        <h2 class="h2 sec-head__title reveal" data-delay="80" data-split>Brands we’ve helped sell more.</h2>
      </div>
      <a href="/work/" class="tlink reveal" data-delay="160" style="font-size:var(--step-1)">All work ↗</a>
    </div>

    <div class="work-list">
      <?php $i = 0; foreach ($ecomWork as $p): $wide = ($i % 3 === 0); $top = $p['results'][0] ?? null; ?>
      <div class="work-list__item <?= $wide ? 'is-wide' : '' ?>">
        <a href="/work/<?= e($p['slug']) ?>/" class="work-card tilt" data-tilt="7" data-cursor="View case">
          <div class="tilt__inner">
            <div class="work-card__media"><?= bz_image($p['hero'], $p['title'] . ' e-commerce case study', $p['palette'], ['seed' => $p['slug'], 'sizes' => $wide ? '100vw' : '(max-width:760px) 100vw, 700px']) ?></div>
            <div class="tilt__glare" aria-hidden="true"></div>
            <div class="work-card__overlay">
              <div class="work-card__top">
                <div class="work-card__cat">
                  <?php if (!empty($p['platform'])): ?><span class="chip"><?= e($p['platform']) ?></span><?php endif; ?>
                  <span class="chip"><?= e($p['industry']) ?></span>
                </div>
                <?php if ($top): ?><span class="work-card__year" style="font-size:1.6rem;color:var(--accent)"><?= e($top['metric']) ?></span><?php endif; ?>
              </div>
              <div class="work-card__bottom">
                <h3><?= e($p['title']) ?></h3>
                <p class="work-card__summary"><?= e($p['summary']) ?></p>
              </div>
            </div>
          </div>
        </a>
      </div>
      <?php $i++; endforeach; ?>
    </div>
  </section>

  <!-- PROCESS -->
  <section class="section wrap">
    <div class="sec-head"><div><p class="eyebrow reveal">How we build</p><h2 class="h2 sec-head__title reveal" data-delay="80" data-split>From idea to first sale.</h2></div></div>
    <div class="process">
      <?php
      $steps = [
        ['Strategy & platform', 'We understand your products, margins and customers — then recommend the platform that fits, not the one that’s easiest to sell.'],
        ['Design & UX', 'Store design built around your products and buying journey, prototyped and refined for maximum conversion.'],
        ['Build & integrate', 'Custom development, payments, shipping, inventory and app integrations — all fast, tested and secure.'],
        ['Launch & optimise', 'We go live, track everything, and keep optimising conversion, speed and AOV long after launch.'],
      ];
      foreach ($steps as $i => $s): ?>
      <div class="process__step reveal" data-delay="<?= $i * 60 ?>">
        <div class="process__num"><?= sprintf('%02d', $i + 1) ?></div>
        <h3><?= e($s[0]) ?></h3>
        <p><?= e($s[1]) ?></p>
      </div>
      <?php endforeach; ?>
    </div>
  </section>

  <!-- FEATURES -->
  <section class="section wrap">
    <div class="sec-head"><div><p class="eyebrow reveal">What’s included</p><h2 class="h2 sec-head__title reveal" data-delay="80" data-split>Everything a store needs.</h2></div></div>
    <div class="svc-grid">
      <?php
      $feats = [
        ['bolt', 'Blazing performance', 'Optimised images, clean code and Core Web Vitals tuning so pages load before shoppers lose patience.'],
        ['cart', 'Conversion-first design', 'Product pages, cart and checkout engineered to reduce friction and lift every key metric.'],
        ['layers', 'Payments & logistics', 'Razorpay, Stripe, PayPal, shipping rules, taxes and inventory — wired up and reliable.'],
        ['shield', 'Secure & scalable', 'Hardened, dependable stores that stay fast and safe as your orders grow.'],
        ['spark', 'SEO built in', 'Structured data, clean URLs and speed so your store is found, not just built.'],
        ['grid', 'Migration & support', 'Move from any platform without losing rankings — and keep improving after launch.'],
      ];
      foreach ($feats as $i => $f): ?>
      <div class="tcard reveal" data-delay="<?= ($i % 3) * 60 ?>" style="display:flex;flex-direction:column;gap:1rem">
        <span class="flip__icon" style="color:var(--accent);margin:0"><?= bz_icon($f[0], 44) ?></span>
        <h3 class="h3" style="font-size:var(--step-1)"><?= e($f[1]) ?></h3>
        <p class="muted"><?= e($f[2]) ?></p>
      </div>
      <?php endforeach; ?>
    </div>
  </section>

  <!-- FAQ + FORM -->
  <section class="section wrap" id="enquire">
    <div class="split" style="align-items:start;gap:clamp(2rem,6vw,5rem)">
      <div>
        <p class="eyebrow reveal">FAQ</p>
        <h2 class="h2 reveal mt-2" data-split>Before you start.</h2>
        <div class="faq mt-3">
          <?php foreach ($faqs as $i => $f): ?>
          <div class="faq__item <?= $i === 0 ? 'is-open' : '' ?>">
            <button class="faq__q" aria-expanded="<?= $i === 0 ? 'true' : 'false' ?>"><?= e($f[0]) ?> <i aria-hidden="true"></i></button>
            <div class="faq__a" <?= $i === 0 ? 'style="height:auto"' : '' ?>><div class="faq__a-inner"><?= e($f[1]) ?></div></div>
          </div>
          <?php endforeach; ?>
        </div>
      </div>

      <div class="tcard">
        <p class="eyebrow">Get a quote</p>
        <h3 class="h3 mt-1" style="font-size:var(--step-2)">Let’s build your store.</h3>
        <form class="stack mt-3" data-ajax action="/send_mail.php" method="post" novalidate>
          <input type="hidden" name="form_name" value="E-commerce Lead">
          <input type="hidden" name="service" value="E-commerce Development">
          <input type="hidden" name="page_url" value="/ecommerce-development-jaipur/">
          <div class="hp" aria-hidden="true"><label>Leave empty<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
          <div class="field"><label for="e-name">Name</label><input id="e-name" name="name" type="text" required placeholder="Your name"></div>
          <div class="field"><label for="e-email">Email</label><input id="e-email" name="email" type="email" required placeholder="you@brand.com"></div>
          <div class="field"><label for="e-phone">Phone</label><input id="e-phone" name="phone" type="tel" placeholder="+91…"></div>
          <div class="field"><label for="e-plat">Preferred platform</label>
            <select id="e-plat" name="subject"><option value="">Not sure — recommend one</option><option>Shopify / Shopify Plus</option><option>WooCommerce</option><option>Custom (Next.js / headless)</option></select>
          </div>
          <div class="field"><label for="e-msg">About your store</label><textarea id="e-msg" name="message" required placeholder="What do you sell? New store or migration? Any links?"></textarea></div>
          <button type="submit" class="btn" data-magnetic="0.25"><span class="btn__label">Send</span> <span class="btn__arrow" aria-hidden="true">↗</span></button>
          <p class="form-status" role="status" aria-live="polite"></p>
        </form>
      </div>
    </div>
  </section>

</main>
<?php require $ROOT . '/partials/footer.php'; ?>
