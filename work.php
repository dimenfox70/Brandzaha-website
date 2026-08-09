<?php
require __DIR__ . '/partials/bootstrap.php';

$projects = require $ROOT . '/data/projects.php';

// Build category filter list
$cats = [];
foreach ($projects as $p) { foreach ($p['category'] as $c) { $cats[$c] = true; } }
$cats = array_keys($cats);

$meta['title']     = 'Work & Portfolio — BrandZaha Case Studies | Jaipur Agency';
$meta['desc']      = 'Selected work from BrandZaha: cinematic websites, brand identities, apps and campaigns. Explore case studies with real results.';
$meta['canonical'] = '/work/';
$meta['schema'][]  = [
    '@context' => 'https://schema.org',
    '@type'    => 'CollectionPage',
    'name'     => 'BrandZaha Work',
    'url'      => abs_url('/work/'),
];

require $ROOT . '/partials/head.php';
require $ROOT . '/partials/header.php';
?>
<main id="main">

  <section class="page-head wrap">
    <div class="glow hero__glow-a" aria-hidden="true" style="opacity:.18"></div>
    <p class="eyebrow reveal">Portfolio · <?= count($projects) ?> projects</p>
    <h1 class="page-head__title" data-split data-split-hero>Selected<br><span class="text-accent">work.</span></h1>
    <p class="page-head__lead lead reveal" data-delay="120">Every project is a partnership. Here’s a look at brands we’ve helped design, build and grow — with the numbers to back it up.</p>
  </section>

  <section class="section wrap">
    <div class="filters" data-filters>
      <button class="filter-chip is-active" data-filter="all">All</button>
      <?php foreach ($cats as $c): ?>
      <button class="filter-chip" data-filter="<?= e($c) ?>"><?= e($c) ?></button>
      <?php endforeach; ?>
    </div>

    <div class="work-list">
      <?php $i = 0; foreach ($projects as $p): $wide = ($i % 3 === 0); ?>
      <div class="work-list__item <?= $wide ? 'is-wide' : '' ?>" data-cats="<?= e(implode(',', $p['category'])) ?>">
        <a href="/work/<?= e($p['slug']) ?>/" class="work-card tilt" data-tilt="7" data-cursor="View case">
          <div class="tilt__inner">
            <div class="work-card__media">
              <?= bz_image($p['hero'], $p['title'] . ' case study', $p['palette'], ['seed' => $p['slug'], 'sizes' => $wide ? '100vw' : '(max-width:760px) 100vw, 700px']) ?>
            </div>
            <div class="tilt__glare" aria-hidden="true"></div>
            <div class="work-card__overlay">
              <div class="work-card__top">
                <div class="work-card__cat">
                  <?php foreach ($p['category'] as $c): ?><span class="chip"><?= e($c) ?></span><?php endforeach; ?>
                </div>
                <span class="work-card__year"><?= e($p['year']) ?></span>
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

  <section class="section wrap">
    <div class="cta-band reveal">
      <span class="glow cta-band__glow" aria-hidden="true"></span>
      <h2 class="h2 display" style="position:relative" data-split>Your project<br>could be next.</h2>
      <a href="/contact/" class="btn mt-3" data-magnetic="0.3" style="position:relative"><span class="btn__label">Start a project</span> <span class="btn__arrow" aria-hidden="true">↗</span></a>
    </div>
  </section>

</main>
<?php require $ROOT . '/partials/footer.php'; ?>
