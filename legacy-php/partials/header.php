<?php
/** BrandZaha — site header + full-screen menu. Expects $SITE. */
$services = require $ROOT . '/data/services.php';
?>
<header class="site-header">
  <div class="wrap site-header__inner">
    <a href="/" class="brand" aria-label="BrandZaha home" data-no-transition>
      <span class="brand__mark">B</span>
      <span>Brand<em>Zaha</em></span>
    </a>
    <div class="header-actions">
      <a href="/contact/" class="btn header-cta" data-magnetic="0.3">
        <span class="btn__label">Start a project</span>
        <span class="btn__arrow" aria-hidden="true">↗</span>
      </a>
      <button class="menu-toggle" aria-expanded="false" aria-controls="nav-overlay">
        <span>Menu</span>
        <span class="menu-toggle__bars" aria-hidden="true"><span></span><span></span></span>
      </button>
    </div>
  </div>
</header>

<nav class="nav-overlay" id="nav-overlay" aria-hidden="true" aria-label="Primary">
  <div class="wrap nav-overlay__grid">
    <ul class="nav-menu">
      <?php foreach ($SITE['nav'] as $i => $item): ?>
      <li class="<?= !empty($item['highlight']) ? 'is-highlight' : '' ?>">
        <a href="<?= e($item['url']) ?>">
          <small><?= sprintf('%02d', $i + 1) ?></small><?= e($item['label']) ?>
        </a>
      </li>
      <?php endforeach; ?>
    </ul>
    <aside class="nav-aside">
      <div>
        <h4>Get in touch</h4>
        <a href="mailto:<?= e($SITE['contact']['email']) ?>" class="tlink"><?= e($SITE['contact']['email']) ?></a><br>
        <a href="tel:<?= e($SITE['contact']['phone']) ?>" class="tlink"><?= e($SITE['contact']['phone']) ?></a>
      </div>
      <div>
        <h4>Studio</h4>
        <p class="muted"><?= e($SITE['contact']['address']) ?></p>
      </div>
      <div>
        <h4>Follow</h4>
        <div class="nav-socials">
          <?php foreach ($SITE['social'] as $name => $url): ?>
          <a href="<?= e($url) ?>" class="tlink" target="_blank" rel="noopener"><?= e($name) ?></a>
          <?php endforeach; ?>
        </div>
      </div>
    </aside>
  </div>
</nav>
