<?php
require __DIR__ . '/partials/bootstrap.php';

$posts = require $ROOT . '/data/posts.php';

$meta['title']     = 'Blog & Insights — BrandZaha | Design, Web & Marketing';
$meta['desc']      = 'Field notes on design, web development, branding and digital marketing from the BrandZaha studio in Jaipur.';
$meta['canonical'] = '/blog/';

require $ROOT . '/partials/head.php';
require $ROOT . '/partials/header.php';

$fmt = fn($d) => date('M j, Y', strtotime($d));
?>
<main id="main">

  <section class="page-head wrap">
    <div class="glow hero__glow-b" aria-hidden="true" style="opacity:.16"></div>
    <p class="eyebrow reveal">Insights</p>
    <h1 class="page-head__title" data-split data-split-hero>The<br><span class="text-accent">journal.</span></h1>
    <p class="page-head__lead lead reveal" data-delay="120">Ideas, playbooks and honest lessons on design, building and growing on the web.</p>
  </section>

  <?php $featured = $posts[0]; ?>
  <section class="section wrap">
    <a href="/blog/<?= e($featured['slug']) ?>/" class="work-card tilt" data-tilt="4" data-cursor="Read" style="aspect-ratio:21/9">
      <div class="tilt__inner">
        <div class="work-card__media"><?= bz_image('/assets/img/blog/' . $featured['seed'] . '.webp', $featured['title'], $featured['palette'], ['seed' => $featured['seed'], 'sizes' => '100vw']) ?></div>
        <div class="tilt__glare" aria-hidden="true"></div>
        <div class="work-card__overlay">
          <div class="work-card__top"><div class="work-card__cat"><span class="chip">Featured</span><span class="chip"><?= e($featured['category']) ?></span></div></div>
          <div class="work-card__bottom">
            <h3 style="max-width:20ch"><?= e($featured['title']) ?></h3>
            <p class="work-card__summary"><?= e($featured['excerpt']) ?></p>
          </div>
        </div>
      </div>
    </a>
  </section>

  <section class="section wrap" style="padding-top:0">
    <div class="post-grid">
      <?php foreach (array_slice($posts, 1) as $i => $post): ?>
      <article class="post-card reveal" data-delay="<?= ($i % 3) * 60 ?>">
        <a href="/blog/<?= e($post['slug']) ?>/" class="post-card__media" aria-label="<?= e($post['title']) ?>">
          <?= bz_image('/assets/img/blog/' . $post['seed'] . '.webp', $post['title'], $post['palette'], ['seed' => $post['seed'], 'sizes' => '(max-width:760px) 100vw, 380px']) ?>
        </a>
        <div class="post-card__body">
          <span class="post-card__meta"><?= e($post['category']) ?> · <?= e($fmt($post['date'])) ?></span>
          <h3><a href="/blog/<?= e($post['slug']) ?>/"><?= e($post['title']) ?></a></h3>
          <p class="muted"><?= e($post['excerpt']) ?></p>
          <a href="/blog/<?= e($post['slug']) ?>/" class="post-card__more">Read more →</a>
        </div>
      </article>
      <?php endforeach; ?>
    </div>
  </section>

  <section class="section wrap">
    <div class="cta-band reveal">
      <span class="glow cta-band__glow" aria-hidden="true"></span>
      <h2 class="h2 display" style="position:relative" data-split>Let’s build<br>your next chapter.</h2>
      <a href="/contact/" class="btn mt-3" data-magnetic="0.3" style="position:relative"><span class="btn__label">Start a project</span> <span class="btn__arrow" aria-hidden="true">↗</span></a>
    </div>
  </section>

</main>
<?php require $ROOT . '/partials/footer.php'; ?>
