<?php
/** BrandZaha — footer + script includes. Expects $SITE. */
$services = $services ?? require $ROOT . '/data/services.php';
?>
<footer class="site-footer">
  <div class="wrap">
    <p class="eyebrow reveal">Let’s build something</p>
    <h2 class="footer-cta reveal" data-delay="80">
      <a href="/contact/" data-cursor="Say hi">Start a<br>project <span aria-hidden="true">↗</span></a>
    </h2>

    <div class="footer-grid">
      <div class="footer-col">
        <a href="/" class="brand" data-no-transition><span class="brand__mark">B</span><span>Brand<em>Zaha</em></span></a>
        <p class="muted mt-1" style="max-width:34ch"><?= e($SITE['tagline']) ?> based in Jaipur, crafting digital experiences that perform since <?= e($SITE['founded']) ?>.</p>
      </div>
      <div class="footer-col">
        <h4>Sitemap</h4>
        <ul>
          <?php foreach ($SITE['nav'] as $item): ?>
          <li><a href="<?= e($item['url']) ?>" class="tlink"><?= e($item['label']) ?></a></li>
          <?php endforeach; ?>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <ul>
          <?php foreach (array_slice($services, 0, 6) as $svc): ?>
          <li><a href="<?= e($svc['url']) ?>" class="tlink"><?= e($svc['title']) ?></a></li>
          <?php endforeach; ?>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <ul>
          <li><a href="mailto:<?= e($SITE['contact']['email']) ?>" class="tlink"><?= e($SITE['contact']['email']) ?></a></li>
          <li><a href="tel:<?= e($SITE['contact']['phone']) ?>" class="tlink"><?= e($SITE['contact']['phone']) ?></a></li>
          <li class="muted"><?= e($SITE['contact']['hours']) ?></li>
          <li class="muted" style="max-width:30ch"><?= e($SITE['contact']['address']) ?></li>
        </ul>
        <div class="nav-socials mt-2">
          <?php foreach ($SITE['social'] as $name => $url): ?>
          <a href="<?= e($url) ?>" class="tlink" target="_blank" rel="noopener"><?= e($name) ?></a>
          <?php endforeach; ?>
        </div>
      </div>
    </div>

    <div class="footer-huge" aria-hidden="true">BrandZaha</div>

    <div class="footer-bottom">
      <span>© <span data-year><?= date('Y') ?></span> <?= e($SITE['name']) ?>. All rights reserved.</span>
      <span>Crafted in Jaipur · <a href="/it-training-jaipur/" class="tlink text-accent">IT Training &amp; Internship</a></span>
    </div>
  </div>
</footer>

<!-- Core site JS first (no dependencies) so the preloader + UI never wait on CDN -->
<script src="/assets/js/main.js?v=2" defer></script>
<!-- GSAP core + plugins -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/Flip.min.js" defer></script>
<!-- Lenis smooth scroll -->
<script src="https://unpkg.com/lenis@1.1.13/dist/lenis.min.js" defer></script>
<!-- Splitting.js -->
<script src="https://unpkg.com/splitting/dist/splitting.min.js" defer></script>
<!-- Motion layer (progressive enhancement, depends on GSAP) -->
<script src="/assets/js/motion.js?v=2" defer></script>
</body>
</html>
