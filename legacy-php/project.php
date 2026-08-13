<?php
require __DIR__ . '/partials/bootstrap.php';

$projects = require $ROOT . '/data/projects.php';

$slug = isset($_GET['slug']) ? preg_replace('/[^a-z0-9\-]/', '', strtolower($_GET['slug'])) : '';

if ($slug === '' || !isset($projects[$slug])) {
    http_response_code(404);
    require $ROOT . '/404.php';
    exit;
}

$p = $projects[$slug];

// Next project (loop through array order)
$keys = array_keys($projects);
$pos  = array_search($slug, $keys, true);
$next = $projects[$keys[($pos + 1) % count($keys)]];

$accent = $p['accent'] ?? $SITE['accent'];

$meta['title']     = $p['title'] . ' — Case Study | BrandZaha';
$meta['desc']      = $p['summary'];
$meta['canonical'] = '/work/' . $p['slug'] . '/';
$meta['schema'][]  = [
    '@context' => 'https://schema.org',
    '@type'    => 'CreativeWork',
    'name'     => $p['title'],
    'about'    => $p['summary'],
    'url'      => abs_url('/work/' . $p['slug'] . '/'),
    'creator'  => ['@type' => 'Organization', 'name' => $SITE['name']],
    'dateCreated' => (string) $p['year'],
    'keywords' => implode(', ', array_merge($p['category'], $p['services'])),
];

require $ROOT . '/partials/head.php';
require $ROOT . '/partials/header.php';
?>
<main id="main" style="--accent:<?= e($accent) ?>">

  <!-- ============ 3D HERO ============ -->
  <section class="proj-hero" aria-label="<?= e($p['title']) ?>">
    <div class="proj-hero__media" data-unfold data-parallax-wrap>
      <div data-parallax="0.15" style="position:absolute;inset:-8% 0;">
        <?= bz_image($p['hero'], $p['title'] . ' hero', $p['palette'], ['loading' => 'eager', 'seed' => $p['slug'] . '-hero', 'sizes' => '100vw']) ?>
      </div>
    </div>
    <div class="wrap proj-hero__inner">
      <p class="eyebrow reveal"><?= e(implode(' · ', $p['category'])) ?></p>
      <h1 class="proj-hero__title" data-split data-split-hero><?= e($p['title']) ?></h1>
      <p class="lead reveal" data-delay="120" style="max-width:44ch"><?= e($p['summary']) ?></p>
      <div class="proj-meta-row reveal" data-delay="160">
        <div><span>Client</span><strong><?= e($p['client']) ?></strong></div>
        <div><span>Year</span><strong><?= e($p['year']) ?></strong></div>
        <div><span>Industry</span><strong><?= e($p['industry']) ?></strong></div>
        <div><span>Services</span><strong><?= e(implode(', ', $p['services'])) ?></strong></div>
        <?php if (!empty($p['live_url'])): ?>
        <div><span>Live</span><a href="<?= e($p['live_url']) ?>" class="tlink text-accent" target="_blank" rel="noopener">Visit site ↗</a></div>
        <?php endif; ?>
      </div>
    </div>
  </section>

  <!-- ============ OVERVIEW ============ -->
  <section class="section wrap">
    <div class="editorial">
      <div>
        <p class="eyebrow reveal">The challenge</p>
        <p class="lead reveal mt-2" data-delay="60"><?= e($p['challenge']) ?></p>
      </div>
      <div>
        <p class="eyebrow reveal">Our approach</p>
        <p class="lead reveal mt-2" data-delay="60"><?= e($p['solution']) ?></p>
      </div>
    </div>

    <div class="mt-3" style="margin-top:clamp(3rem,8vw,7rem)">
      <p class="pullquote reveal" data-fade-scrub data-split>
        <span class="accent">“</span><?= e($p['summary']) ?><span class="accent">”</span>
      </p>
    </div>
  </section>

  <!-- ============ SHOWCASE ============ -->
  <section class="section wrap" aria-label="Showcase">
    <div class="showcase">
      <?php $g = $p['gallery']; ?>
      <?php if (!empty($g[0])): ?>
      <div class="showcase__item reveal" data-pin-scale>
        <?= bz_image($g[0], $p['title'] . ' screen 1', $p['palette'], ['seed' => $p['slug'] . '-g0', 'sizes' => '100vw']) ?>
      </div>
      <?php endif; ?>

      <?php if (!empty($g[1]) || !empty($g[2])): ?>
      <div class="showcase__row">
        <?php if (!empty($g[1])): ?>
        <div class="showcase__item is-tall reveal tilt" data-tilt="5">
          <div class="tilt__inner" style="width:100%;height:100%"><?= bz_image($g[1], $p['title'] . ' screen 2', $p['palette'], ['seed' => $p['slug'] . '-g1']) ?></div>
        </div>
        <?php endif; ?>
        <?php if (!empty($g[2])): ?>
        <div class="showcase__item is-tall reveal tilt" data-tilt="5" data-delay="80">
          <div class="tilt__inner" style="width:100%;height:100%"><?= bz_image($g[2], $p['title'] . ' screen 3', $p['palette'], ['seed' => $p['slug'] . '-g2']) ?></div>
        </div>
        <?php else: ?>
        <div class="showcase__item is-tall reveal" data-delay="80" style="display:grid;place-items:center;padding:2rem">
          <div class="center">
            <span class="flip__icon" style="margin:0 auto"><?= bz_icon('spark', 56) ?></span>
            <p class="lead mt-2">Crafted with care, down to the last detail.</p>
          </div>
        </div>
        <?php endif; ?>
      </div>
      <?php endif; ?>
    </div>
  </section>

  <!-- ============ RESULTS ============ -->
  <section class="section wrap" aria-label="Results">
    <p class="eyebrow reveal">The results</p>
    <h2 class="h2 reveal mt-2" data-split>Numbers that moved.</h2>
    <div class="stats mt-3">
      <?php foreach ($p['results'] as $i => $r): ?>
      <div class="stat reveal" data-delay="<?= $i * 70 ?>">
        <div class="stat__num" data-count="<?= e($r['metric']) ?>"><?= e($r['metric']) ?></div>
        <div class="stat__label"><?= e($r['label']) ?></div>
      </div>
      <?php endforeach; ?>
    </div>
  </section>

  <!-- ============ TESTIMONIAL ============ -->
  <?php if (!empty($p['testimonial']['quote'])): $t = $p['testimonial']; ?>
  <section class="section wrap">
    <blockquote class="tcard reveal" style="max-width:920px;margin-inline:auto">
      <p class="tcard__quote"><?= e($t['quote']) ?></p>
      <footer class="tcard__by">
        <span class="tcard__avatar"><?= e(strtoupper($t['name'][0])) ?></span>
        <span><strong><?= e($t['name']) ?></strong><br><span class="dim"><?= e($t['role']) ?></span></span>
      </footer>
    </blockquote>
  </section>
  <?php endif; ?>

  <!-- ============ NEXT PROJECT ============ -->
  <section class="section wrap">
    <a href="/work/<?= e($next['slug']) ?>/" class="next-proj tilt" data-tilt="4" data-cursor="Next">
      <div class="next-proj__poster" style="background:#0a0a0a url('<?= poster_svg($next['palette'], '', $next['slug'] . '-next') ?>') center/cover">
        <span style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,10,10,.5),rgba(10,10,10,.75))"></span>
      </div>
      <div class="next-proj__inner">
        <span class="next-proj__label">Next project</span>
        <h2 class="next-proj__title"><?= e($next['title']) ?></h2>
        <span class="dim"><?= e(implode(' · ', $next['category'])) ?></span>
      </div>
    </a>
    <div class="center mt-3"><a href="/work/" class="tlink" style="font-size:var(--step-1)">← Back to all work</a></div>
  </section>

</main>
<?php require $ROOT . '/partials/footer.php'; ?>
