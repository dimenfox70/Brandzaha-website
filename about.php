<?php
require __DIR__ . '/partials/bootstrap.php';

$testimonials = require $ROOT . '/data/testimonials.php';

$team = [
    ['name' => 'Himanshi Shrivastav', 'role' => 'Creative Lead',        'seed' => 'himanshi'],
    ['name' => 'Aarav Mehta',         'role' => 'Design Director',      'seed' => 'aarav'],
    ['name' => 'Neha Gupta',          'role' => 'Engineering Lead',     'seed' => 'neha'],
    ['name' => 'Karan Singh',         'role' => 'Growth & Strategy',    'seed' => 'karan'],
    ['name' => 'Isha Verma',          'role' => 'Brand Designer',       'seed' => 'isha'],
    ['name' => 'Rohan Jain',          'role' => 'Full-stack Developer', 'seed' => 'rohan'],
];

$meta['title']     = 'About BrandZaha — A Creative Studio in Jaipur';
$meta['desc']      = 'Meet BrandZaha — a Jaipur creative & digital studio pairing strategy, design and engineering to build brands that perform. Founded 2017.';
$meta['canonical'] = '/about/';

require $ROOT . '/partials/head.php';
require $ROOT . '/partials/header.php';
?>
<main id="main">

  <section class="page-head wrap">
    <div class="glow hero__glow-b" aria-hidden="true" style="opacity:.2"></div>
    <p class="eyebrow reveal">Studio · Est. <?= e($SITE['founded']) ?></p>
    <h1 class="page-head__title" data-split data-split-hero>We’re<br>Brand<span class="text-accent">Zaha.</span></h1>
    <p class="page-head__lead lead reveal" data-delay="120">A tight-knit team of strategists, designers and engineers in Jaipur who believe great work comes from caring about the details nobody else notices.</p>
  </section>

  <!-- Story split -->
  <section class="section wrap">
    <div class="split">
      <div>
        <p class="eyebrow reveal">Our story</p>
        <h2 class="h2 reveal mt-2" data-split>From a small idea to a full-service studio.</h2>
        <div class="prose reveal mt-2" data-delay="80">
          <p>BrandZaha started in <?= e($SITE['founded']) ?> with a simple conviction: most agency work looks the same because it’s made the same way. We wanted to build differently — strategy, design and engineering sitting at one table, obsessed with craft and outcomes in equal measure.</p>
          <p>Today we partner with founders, non-profits and growing companies to design brands, build fast websites and apps, and run marketing that actually moves numbers. No bloated retainers, no template thinking — just work we’re proud to sign.</p>
        </div>
      </div>
      <div class="split__media tilt" data-tilt="6" data-parallax-wrap>
        <div class="tilt__inner" style="width:100%;height:100%" data-parallax="0.12">
          <?= bz_image('/assets/img/team.webp', 'The BrandZaha team', ['#131313', '#26301a', '#d8ff36'], ['seed' => 'team', 'sizes' => '(max-width:900px) 100vw, 640px']) ?>
        </div>
      </div>
    </div>
  </section>

  <!-- Values / stats -->
  <section class="section wrap">
    <div class="stats">
      <div class="stat reveal"><div class="stat__num" data-count="2017"><?= e($SITE['founded']) ?></div><div class="stat__label">Founded in Jaipur</div></div>
      <div class="stat reveal" data-delay="60"><div class="stat__num" data-count="200+">200+</div><div class="stat__label">Projects delivered</div></div>
      <div class="stat reveal" data-delay="120"><div class="stat__num" data-count="15">15</div><div class="stat__label">People in the studio</div></div>
      <div class="stat reveal" data-delay="180"><div class="stat__num" data-count="98%">98%</div><div class="stat__label">Would work with us again</div></div>
    </div>
  </section>

  <!-- Process -->
  <section class="section wrap">
    <div class="sec-head">
      <div>
        <p class="eyebrow reveal">Our approach</p>
        <h2 class="h2 sec-head__title reveal" data-delay="80" data-split>Care, at every step.</h2>
      </div>
    </div>
    <div class="process">
      <?php
      $steps = [
        ['Listen first', 'We start by understanding — your business, your customers, your constraints. The brief is a conversation, not a form.'],
        ['Design with intent', 'Nothing is decorative for its own sake. Every choice ladders up to a goal you can measure.'],
        ['Build to last', 'Clean, fast, accessible engineering that won’t crumble a year later or lock you into a stack you can’t maintain.'],
        ['Stay in it', 'We’re partners, not vendors. We stick around to measure, learn and keep the work sharp.'],
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

  <!-- Team -->
  <section class="section wrap">
    <div class="sec-head">
      <div>
        <p class="eyebrow reveal">The team</p>
        <h2 class="h2 sec-head__title reveal" data-delay="80" data-split>The people behind the pixels.</h2>
      </div>
    </div>
    <div class="team-grid">
      <?php foreach ($team as $i => $m): ?>
      <article class="team-card reveal tilt" data-tilt="6" data-delay="<?= ($i % 3) * 60 ?>">
        <div class="tilt__inner">
          <div class="team-card__media">
            <?= bz_image('/assets/img/team/' . $m['seed'] . '.webp', $m['name'], ['#141414', '#232323', '#d8ff36'], ['seed' => $m['seed'], 'sizes' => '240px']) ?>
          </div>
          <div class="team-card__body">
            <h3><?= e($m['name']) ?></h3>
            <span><?= e($m['role']) ?></span>
          </div>
        </div>
      </article>
      <?php endforeach; ?>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="section wrap">
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
  </section>

  <section class="section wrap">
    <div class="cta-band reveal">
      <span class="glow cta-band__glow" aria-hidden="true"></span>
      <h2 class="h2 display" style="position:relative" data-split>Want to build<br>with us?</h2>
      <a href="/contact/" class="btn mt-3" data-magnetic="0.3" style="position:relative"><span class="btn__label">Let’s talk</span> <span class="btn__arrow" aria-hidden="true">↗</span></a>
    </div>
  </section>

</main>
<?php require $ROOT . '/partials/footer.php'; ?>
