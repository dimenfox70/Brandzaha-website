<?php
require __DIR__ . '/partials/bootstrap.php';

$projects     = require $ROOT . '/data/projects.php';
$services     = require $ROOT . '/data/services.php';
$testimonials = require $ROOT . '/data/testimonials.php';

$meta['title']     = 'BrandZaha — Creative & Digital Agency in Jaipur';
$meta['desc']      = 'A Jaipur creative & digital agency building cinematic websites, brands, apps and growth marketing. Portfolio-first work that performs. Since 2017.';
$meta['canonical'] = '/';

require $ROOT . '/partials/head.php';
require $ROOT . '/partials/header.php';
?>
<main id="main">

  <!-- ============ HERO ============ -->
  <section class="hero wrap" aria-label="Introduction">
    <div class="glow hero__glow-a" aria-hidden="true"></div>
    <div class="glow hero__glow-b" aria-hidden="true"></div>

    <p class="eyebrow reveal" style="margin-bottom:1.4rem">Creative &amp; Digital Agency · Jaipur</p>
    <h1 class="hero__title" data-split data-split-hero>
      <span class="line">We design</span>
      <span class="line"><span class="accent">brands</span> that</span>
      <span class="line"><span class="outline">move</span> people.</span>
    </h1>

    <div class="hero__meta">
      <p class="hero__lead lead reveal" data-delay="120">
        BrandZaha turns ambitious ideas into cinematic websites, sharp identities and campaigns that grow the businesses behind them.
      </p>
      <div class="reveal" data-delay="200">
        <a href="/work/" class="btn" data-magnetic="0.3" data-cursor="Explore">
          <span class="btn__label">View our work</span>
          <span class="btn__arrow" aria-hidden="true">↗</span>
        </a>
      </div>
    </div>

    <div class="hero__meta" style="margin-top:clamp(2.5rem,6vw,5rem)">
      <span class="hero__scroll"><i aria-hidden="true"></i> Scroll to explore</span>
      <div class="stats reveal" data-delay="120" style="max-width:520px;flex:1">
        <div class="stat"><div class="stat__num" data-count="200+">200+</div><div class="stat__label">Projects shipped</div></div>
        <div class="stat"><div class="stat__num" data-count="8">8</div><div class="stat__label">Years crafting</div></div>
        <div class="stat"><div class="stat__num" data-count="98%">98%</div><div class="stat__label">Client retention</div></div>
      </div>
    </div>
  </section>

  <!-- ============ MARQUEE ============ -->
  <div class="marquee" data-speed="34" aria-hidden="true">
    <div class="marquee__track">
      <span>Brand Identity</span><span>Web Development</span><span>Digital Marketing</span><span>UI / UX</span><span>Mobile Apps</span><span>SEO</span>
    </div>
  </div>

  <!-- ============ HORIZONTAL PROJECT STRIP ============ -->
  <section class="section" aria-label="Selected work">
    <div class="wrap">
      <div class="sec-head">
        <div>
          <p class="eyebrow reveal">Selected work</p>
          <h2 class="h2 sec-head__title reveal" data-delay="80" data-split>Work that speaks louder than decks.</h2>
        </div>
        <a href="/work/" class="tlink reveal" data-delay="160" style="font-size:var(--step-1)">All projects ↗</a>
      </div>
    </div>

    <div class="hstrip" data-hstrip>
      <div class="wrap">
        <div class="hstrip__track">
          <?php foreach (array_filter($projects, fn($p) => !empty($p['featured'])) as $p): ?>
          <article class="hstrip__item">
            <a href="/work/<?= e($p['slug']) ?>/" class="work-card tilt" data-tilt="8" data-cursor="View" data-cats="<?= e(implode(',', $p['category'])) ?>">
              <div class="tilt__inner">
                <div class="work-card__media">
                  <?= bz_image($p['hero'], $p['title'] . ' — case study', $p['palette'], ['loading' => 'lazy', 'seed' => $p['slug']]) ?>
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
          </article>
          <?php endforeach; ?>
          <article class="hstrip__item" style="display:flex;align-items:center">
            <a href="/work/" class="cta-band" style="min-height:100%;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:1rem;text-align:left;width:100%">
              <span class="glow cta-band__glow" aria-hidden="true"></span>
              <h3 class="h3" style="position:relative">See the full portfolio</h3>
              <span class="btn" style="position:relative"><span class="btn__label">Enter Work</span> <span aria-hidden="true">↗</span></span>
            </a>
          </article>
        </div>
        <div class="hstrip__progress" aria-hidden="true"><i></i></div>
      </div>
    </div>
  </section>

  <!-- ============ SERVICES TEASER ============ -->
  <section class="section" aria-label="What we do">
    <div class="wrap">
      <div class="sec-head">
        <div>
          <p class="eyebrow reveal">Capabilities</p>
          <h2 class="h2 sec-head__title reveal" data-delay="80" data-split>Everything your brand needs to win online.</h2>
        </div>
        <a href="/services/" class="tlink reveal" data-delay="160" style="font-size:var(--step-1)">All services ↗</a>
      </div>

      <div class="svc-grid">
        <?php foreach (array_slice($services, 0, 4) as $i => $svc): ?>
        <div class="flip reveal" data-delay="<?= $i * 60 ?>">
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
    </div>
  </section>

  <!-- ============ APPROACH / SPLIT ============ -->
  <section class="section" aria-label="Our approach">
    <div class="wrap split is-reverse">
      <div class="split__media tilt" data-tilt="6" data-parallax-wrap>
        <div class="tilt__inner" style="width:100%;height:100%" data-parallax="0.12">
          <?= bz_image('/assets/img/studio.webp', 'Inside the BrandZaha studio', ['#141414', '#1f2b16', '#d8ff36'], ['seed' => 'studio', 'sizes' => '(max-width:900px) 100vw, 640px']) ?>
        </div>
      </div>
      <div>
        <p class="eyebrow reveal">Why BrandZaha</p>
        <h2 class="h2 reveal" data-delay="80" data-split>We obsess over the details others skip.</h2>
        <p class="lead reveal mt-2" data-delay="140">Strategy, design and engineering under one roof — so nothing gets lost in translation. Every millisecond, every pixel, every word earns its place.</p>
        <div class="stats mt-3 reveal" data-delay="180">
          <div class="stat"><div class="stat__num" data-count="2.1s">2.1s</div><div class="stat__label">Avg. load time</div></div>
          <div class="stat"><div class="stat__num" data-count="90+">90+</div><div class="stat__label">Lighthouse scores</div></div>
        </div>
        <a href="/about/" class="btn btn--ghost mt-3 reveal" data-delay="220" data-magnetic="0.3"><span class="btn__label">Our story</span> <span class="btn__arrow" aria-hidden="true">↗</span></a>
      </div>
    </div>
  </section>

  <!-- ============ PROOF: logos + testimonial ============ -->
  <section class="section" aria-label="Proof">
    <div class="wrap">
      <p class="eyebrow reveal center" style="justify-content:center">Trusted by teams across India</p>
      <div class="logo-row reveal mt-3" style="justify-content:center" data-delay="80">
        <span>Zenith Home</span><span>FPF Foundation</span><span>Property Bapu</span><span>Aurum Retail</span><span>Nova Labs</span><span>Kesar Foods</span>
      </div>

      <div class="mt-3" style="margin-top:clamp(3rem,7vw,6rem)">
        <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))">
          <?php foreach (array_slice($testimonials, 0, 3) as $i => $t): ?>
          <blockquote class="tcard reveal" data-delay="<?= $i * 70 ?>">
            <p class="tcard__quote" style="font-size:var(--step-1)"><?= e($t['quote']) ?></p>
            <footer class="tcard__by">
              <span class="tcard__avatar"><?= e(strtoupper($t['name'][0])) ?></span>
              <span><strong><?= e($t['name']) ?></strong><br><span class="dim"><?= e($t['role']) ?></span></span>
            </footer>
          </blockquote>
          <?php endforeach; ?>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ CTA BAND ============ -->
  <section class="section wrap">
    <div class="cta-band reveal">
      <span class="glow cta-band__glow" aria-hidden="true"></span>
      <p class="eyebrow" style="justify-content:center;position:relative">Have a project in mind?</p>
      <h2 class="h1 display" style="margin-top:1rem" data-split>Let’s make it<br>unforgettable.</h2>
      <div class="mt-3" style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;position:relative">
        <a href="/contact/" class="btn" data-magnetic="0.3" data-cursor="Let's talk"><span class="btn__label">Start a project</span> <span class="btn__arrow" aria-hidden="true">↗</span></a>
        <a href="https://wa.me/<?= e($SITE['contact']['phone_raw']) ?>" class="btn btn--ghost" target="_blank" rel="noopener" data-magnetic="0.3"><span class="btn__label">WhatsApp us</span></a>
      </div>
    </div>
  </section>

</main>
<?php require $ROOT . '/partials/footer.php'; ?>
