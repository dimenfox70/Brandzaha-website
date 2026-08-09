<?php
require __DIR__ . '/partials/bootstrap.php';

$services = require $ROOT . '/data/services.php';

$meta['title']     = 'Services — Web, Branding, Marketing & Software | BrandZaha Jaipur';
$meta['desc']      = 'From websites and brand identity to digital marketing, apps and custom software — explore the full range of what BrandZaha builds.';
$meta['canonical'] = '/services/';

require $ROOT . '/partials/head.php';
require $ROOT . '/partials/header.php';
?>
<main id="main">

  <section class="page-head wrap">
    <div class="glow hero__glow-a" aria-hidden="true" style="opacity:.16"></div>
    <p class="eyebrow reveal">Capabilities</p>
    <h1 class="page-head__title" data-split data-split-hero>What we<br><span class="text-accent">do.</span></h1>
    <p class="page-head__lead lead reveal" data-delay="120">Strategy, design, engineering and growth — a full-stack creative team that takes ideas from blank page to measurable results. Hover any card.</p>
  </section>

  <section class="section wrap">
    <div class="svc-grid">
      <?php foreach ($services as $i => $svc): ?>
      <div class="flip reveal" data-delay="<?= ($i % 4) * 60 ?>">
        <div class="flip__inner">
          <div class="flip__face flip__face--front">
            <span class="flip__num"><?= sprintf('%02d', $i + 1) ?></span>
            <span class="flip__icon"><?= bz_icon($svc['icon'], 52) ?></span>
            <h3 class="flip__title"><?= e($svc['title']) ?></h3>
            <p class="flip__tag"><?= e($svc['tagline']) ?></p>
          </div>
          <div class="flip__face flip__face--back">
            <div>
              <h3 class="flip__title" style="font-size:var(--step-1)"><?= e($svc['title']) ?></h3>
              <p class="muted" style="margin-top:.5rem"><?= e($svc['summary']) ?></p>
              <ul class="flip__list">
                <?php foreach ($svc['points'] as $pt): ?><li><?= e($pt) ?></li><?php endforeach; ?>
              </ul>
            </div>
            <a href="<?= e($svc['url']) ?>" class="flip__cta">Explore <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
  </section>

  <!-- Process -->
  <section class="section wrap">
    <div class="sec-head">
      <div>
        <p class="eyebrow reveal">How we work</p>
        <h2 class="h2 sec-head__title reveal" data-delay="80" data-split>A process built for clarity.</h2>
      </div>
    </div>
    <div class="process">
      <?php
      $steps = [
        ['Discover', 'We dig into your business, audience and goals — no assumptions, just the right questions and honest research.'],
        ['Design',   'Concepts, systems and prototypes. We design in the open so you see the thinking, not just the polish.'],
        ['Build',    'Hand-crafted, performance-first engineering. Fast, accessible, and made to last without a bloated stack.'],
        ['Grow',     'Launch is the start. We measure, iterate and optimise so the work keeps paying off long after go-live.'],
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

  <section class="section wrap">
    <div class="cta-band reveal">
      <span class="glow cta-band__glow" aria-hidden="true"></span>
      <h2 class="h2 display" style="position:relative" data-split>Not sure where<br>to start?</h2>
      <p class="lead mt-2" style="position:relative">Tell us the goal — we’ll shape the path.</p>
      <a href="/contact/" class="btn mt-3" data-magnetic="0.3" style="position:relative"><span class="btn__label">Book a free consult</span> <span class="btn__arrow" aria-hidden="true">↗</span></a>
    </div>
  </section>

</main>
<?php require $ROOT . '/partials/footer.php'; ?>
