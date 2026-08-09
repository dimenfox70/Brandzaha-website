<?php
require __DIR__ . '/partials/bootstrap.php';

$pages = require $ROOT . '/data/landing.php';
$projects = require $ROOT . '/data/projects.php';

$slug = isset($_GET['service']) ? preg_replace('/[^a-z0-9\-]/', '', strtolower($_GET['service'])) : '';
if ($slug === '' || !isset($pages[$slug])) {
    http_response_code(404);
    require $ROOT . '/404.php';
    exit;
}

$d = $pages[$slug];
$accent = $d['accent'] ?? $SITE['accent'];
$isTraining = !empty($d['is_training']);

$meta['title']     = $d['title'];
$meta['desc']      = $d['desc'];
$meta['canonical'] = '/' . $slug . '/';

// FAQ schema
$faqSchema = ['@context' => 'https://schema.org', '@type' => 'FAQPage', 'mainEntity' => []];
foreach ($d['faqs'] as $f) {
    $faqSchema['mainEntity'][] = [
        '@type' => 'Question', 'name' => $f[0],
        'acceptedAnswer' => ['@type' => 'Answer', 'text' => $f[1]],
    ];
}
$meta['schema'][] = $faqSchema;

// Service / Course schema
if ($isTraining) {
    $meta['schema'][] = [
        '@context' => 'https://schema.org', '@type' => 'Course',
        'name' => 'IT Training & Internship — BrandZaha',
        'description' => $d['desc'],
        'provider' => ['@type' => 'EducationalOrganization', 'name' => $SITE['name'], 'url' => $SITE['domain']],
    ];
} else {
    $meta['schema'][] = [
        '@context' => 'https://schema.org', '@type' => 'Service',
        'serviceType' => $d['name'],
        'provider' => ['@type' => 'Organization', 'name' => $SITE['name']],
        'areaServed' => ['@type' => 'City', 'name' => 'Jaipur'],
        'description' => $d['desc'],
    ];
}

require $ROOT . '/partials/head.php';
require $ROOT . '/partials/header.php';
?>
<main id="main" style="--accent:<?= e($accent) ?>">

  <!-- HERO -->
  <section class="page-head wrap">
    <div class="glow hero__glow-a" aria-hidden="true" style="opacity:.2;background:radial-gradient(circle,<?= e($accent) ?>,transparent 65%)"></div>
    <p class="eyebrow reveal"><?= $isTraining ? 'Learn with us · Jaipur' : 'Service · Jaipur' ?></p>
    <h1 class="page-head__title" data-split data-split-hero><?= e($d['h1'][0]) ?><br><span class="text-accent"><?= e($d['h1'][1]) ?></span></h1>
    <p class="page-head__lead lead reveal" data-delay="120"><?= e($d['intro']) ?></p>
    <div class="mt-3 reveal" data-delay="180" style="display:flex;gap:1rem;flex-wrap:wrap">
      <a href="#enquire" class="btn" data-magnetic="0.3"><span class="btn__label"><?= $isTraining ? 'Enquire now' : 'Get a quote' ?></span> <span class="btn__arrow" aria-hidden="true">↗</span></a>
      <a href="https://wa.me/<?= e($SITE['contact']['phone_raw']) ?>" class="btn btn--ghost" target="_blank" rel="noopener" data-magnetic="0.3"><span class="btn__label">WhatsApp</span></a>
    </div>
  </section>

  <!-- STATS -->
  <section class="section wrap" style="padding-block:clamp(2rem,4vw,3.5rem)">
    <div class="stats">
      <?php foreach ($d['stat'] as $i => $s): ?>
      <div class="stat reveal" data-delay="<?= $i * 60 ?>">
        <div class="stat__num" data-count="<?= e($s[0]) ?>"><?= e($s[0]) ?></div>
        <div class="stat__label"><?= e($s[1]) ?></div>
      </div>
      <?php endforeach; ?>
    </div>
  </section>

  <?php if ($isTraining && !empty($d['tracks'])): ?>
  <!-- COURSE TRACKS (training only) -->
  <section class="section wrap">
    <div class="sec-head"><div><p class="eyebrow reveal">Course tracks</p><h2 class="h2 sec-head__title reveal" data-delay="80" data-split>Pick your path.</h2></div></div>
    <div class="svc-grid">
      <?php foreach ($d['tracks'] as $i => $t): ?>
      <div class="flip reveal" data-delay="<?= ($i%4)*60 ?>">
        <div class="flip__inner">
          <div class="flip__face flip__face--front">
            <span class="flip__num"><?= sprintf('%02d', $i+1) ?></span>
            <span class="flip__icon"><?= bz_icon($t[0], 52) ?></span>
            <h3 class="flip__title" style="font-size:var(--step-1)"><?= e($t[1]) ?></h3>
          </div>
          <div class="flip__face flip__face--back">
            <div><h3 class="flip__title" style="font-size:var(--step-1)"><?= e($t[1]) ?></h3><p class="muted mt-1"><?= e($t[2]) ?></p></div>
            <a href="#enquire" class="flip__cta">Enquire <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
  </section>

  <!-- DURATIONS -->
  <section class="section wrap">
    <div class="sec-head"><div><p class="eyebrow reveal">Duration options</p><h2 class="h2 sec-head__title reveal" data-delay="80" data-split>1, 3 or 6 months.</h2></div></div>
    <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))">
      <?php foreach ($d['durations'] as $i => $dur): ?>
      <div class="tcard reveal tilt" data-tilt="5" data-delay="<?= $i*70 ?>">
        <div class="tilt__inner">
          <div class="stat__num" style="font-size:var(--step-3)"><?= e($dur[0]) ?></div>
          <h3 class="h3 mt-1" style="font-size:var(--step-1)"><?= e($dur[1]) ?></h3>
          <p class="muted mt-1"><?= e($dur[2]) ?></p>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
    <div class="pill-row mt-3">
      <?php foreach ($d['benefits'] as $b): ?><span class="pill"><?= bz_icon('check', 16) ?> <?= e($b) ?></span><?php endforeach; ?>
    </div>
  </section>
  <?php endif; ?>

  <!-- FEATURES -->
  <section class="section wrap">
    <div class="sec-head">
      <div><p class="eyebrow reveal">What you get</p><h2 class="h2 sec-head__title reveal" data-delay="80" data-split><?= $isTraining ? 'Why train with BrandZaha.' : 'What’s included.' ?></h2></div>
    </div>
    <div class="svc-grid">
      <?php foreach ($d['features'] as $i => $f): ?>
      <div class="tcard reveal" data-delay="<?= ($i%4)*60 ?>" style="display:flex;flex-direction:column;gap:1rem">
        <span class="flip__icon" style="color:var(--accent);margin:0"><?= bz_icon($f[0], 44) ?></span>
        <h3 class="h3" style="font-size:var(--step-1)"><?= e($f[1]) ?></h3>
        <p class="muted"><?= e($f[2]) ?></p>
      </div>
      <?php endforeach; ?>
    </div>
  </section>

  <!-- PROCESS -->
  <section class="section wrap">
    <div class="sec-head"><div><p class="eyebrow reveal">How it works</p><h2 class="h2 sec-head__title reveal" data-delay="80" data-split>A clear path forward.</h2></div></div>
    <div class="process">
      <?php foreach ($d['process'] as $i => $s): ?>
      <div class="process__step reveal" data-delay="<?= $i*60 ?>">
        <div class="process__num"><?= sprintf('%02d', $i+1) ?></div>
        <h3><?= e($s[0]) ?></h3>
        <p><?= e($s[1]) ?></p>
      </div>
      <?php endforeach; ?>
    </div>
  </section>

  <!-- RELATED WORK -->
  <section class="section wrap">
    <div class="sec-head"><div><p class="eyebrow reveal">Proof</p><h2 class="h2 sec-head__title reveal" data-delay="80" data-split>See it in the work.</h2></div>
      <a href="/work/" class="tlink reveal" data-delay="160" style="font-size:var(--step-1)">All work ↗</a>
    </div>
    <div class="work-list">
      <?php foreach (array_slice($projects, 0, 2) as $p): ?>
      <div class="work-list__item">
        <a href="/work/<?= e($p['slug']) ?>/" class="work-card tilt" data-tilt="7" data-cursor="View case">
          <div class="tilt__inner">
            <div class="work-card__media"><?= bz_image($p['hero'], $p['title'], $p['palette'], ['seed' => $p['slug']]) ?></div>
            <div class="tilt__glare" aria-hidden="true"></div>
            <div class="work-card__overlay">
              <div class="work-card__top"><div class="work-card__cat"><?php foreach ($p['category'] as $c): ?><span class="chip"><?= e($c) ?></span><?php endforeach; ?></div><span class="work-card__year"><?= e($p['year']) ?></span></div>
              <div class="work-card__bottom"><h3><?= e($p['title']) ?></h3><p class="work-card__summary"><?= e($p['summary']) ?></p></div>
            </div>
          </div>
        </a>
      </div>
      <?php endforeach; ?>
    </div>
  </section>

  <!-- FAQ + FORM -->
  <section class="section wrap" id="enquire">
    <div class="split" style="align-items:start;gap:clamp(2rem,6vw,5rem)">
      <div>
        <p class="eyebrow reveal">FAQ</p>
        <h2 class="h2 reveal mt-2" data-split>Good questions.</h2>
        <div class="faq mt-3">
          <?php foreach ($d['faqs'] as $i => $f): ?>
          <div class="faq__item <?= $i===0 ? 'is-open' : '' ?>">
            <button class="faq__q" aria-expanded="<?= $i===0?'true':'false' ?>"><?= e($f[0]) ?> <i aria-hidden="true"></i></button>
            <div class="faq__a" <?= $i===0 ? 'style="height:auto"' : '' ?>><div class="faq__a-inner"><?= e($f[1]) ?></div></div>
          </div>
          <?php endforeach; ?>
        </div>
      </div>

      <div class="tcard">
        <p class="eyebrow"><?= $isTraining ? 'Enquire' : 'Get a quote' ?></p>
        <h3 class="h3 mt-1" style="font-size:var(--step-2)"><?= $isTraining ? 'Start your journey.' : 'Tell us about it.' ?></h3>
        <form class="stack mt-3" data-ajax action="/send_mail.php" method="post" novalidate>
          <input type="hidden" name="form_name" value="<?= e($d['name']) ?><?= $isTraining ? ' Enquiry' : ' Lead' ?>">
          <input type="hidden" name="<?= $isTraining ? 'course' : 'service' ?>" value="<?= e($d['name']) ?>">
          <input type="hidden" name="page_url" value="/<?= e($slug) ?>/">
          <div class="hp" aria-hidden="true"><label>Leave empty<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
          <div class="field"><label for="l-name">Name</label><input id="l-name" name="name" type="text" required placeholder="Your name"></div>
          <div class="field"><label for="l-email">Email</label><input id="l-email" name="email" type="email" required placeholder="you@email.com"></div>
          <div class="field"><label for="l-phone">Phone</label><input id="l-phone" name="phone" type="tel" placeholder="+91…"></div>
          <?php if ($isTraining): ?>
          <div class="field"><label for="l-dur">Preferred duration</label>
            <select id="l-dur" name="duration"><option value="">Select…</option><option>1 Month</option><option>3 Months</option><option>6 Months (with internship)</option></select>
          </div>
          <?php endif; ?>
          <div class="field"><label for="l-msg"><?= $isTraining ? 'Your goal' : 'Project details' ?></label><textarea id="l-msg" name="message" required placeholder="<?= $isTraining ? 'What do you want to learn?' : 'What are you looking to build?' ?>"></textarea></div>
          <button type="submit" class="btn" data-magnetic="0.25"><span class="btn__label">Send</span> <span class="btn__arrow" aria-hidden="true">↗</span></button>
          <p class="form-status" role="status" aria-live="polite"></p>
        </form>
      </div>
    </div>
  </section>

</main>
<?php require $ROOT . '/partials/footer.php'; ?>
