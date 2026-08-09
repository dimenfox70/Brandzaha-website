<?php
if (!isset($SITE)) {
    require __DIR__ . '/partials/bootstrap.php';
}
http_response_code(404);

$meta['title']     = 'Page not found — BrandZaha';
$meta['desc']      = 'The page you’re looking for doesn’t exist. Explore our work or head back home.';
$meta['canonical'] = '/404/';
$meta['robots']    = 'noindex,follow';
$meta['no_preloader'] = true;

require $ROOT . '/partials/head.php';
require $ROOT . '/partials/header.php';
?>
<main id="main">
  <section class="hero wrap" style="min-height:100svh;justify-content:center;text-align:center;align-items:center">
    <div class="glow hero__glow-a" aria-hidden="true"></div>
    <div>
      <div class="badge-404" aria-hidden="true">404</div>
      <p class="eyebrow reveal" style="justify-content:center;margin-top:1rem">Lost in space</p>
      <h1 class="h2 reveal mt-2" data-split>This page took a wrong turn.</h1>
      <p class="lead reveal mt-2" data-delay="80" style="max-width:44ch;margin-inline:auto">The link may be broken or the page may have moved. Let’s get you back to something good.</p>
      <div class="mt-3" style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap">
        <a href="/" class="btn" data-magnetic="0.3"><span class="btn__label">Back home</span> <span class="btn__arrow" aria-hidden="true">↗</span></a>
        <a href="/work/" class="btn btn--ghost" data-magnetic="0.3"><span class="btn__label">See our work</span></a>
      </div>
    </div>
  </section>
</main>
<?php require $ROOT . '/partials/footer.php'; ?>
