<?php
/**
 * BrandZaha — document head + opening body.
 * Expects $SITE and $meta (see bootstrap.php). Include after page overrides.
 */
$canonical = abs_url($meta['canonical']);
$orgSchema = [
    '@context' => 'https://schema.org',
    '@type'    => 'Organization',
    'name'     => $SITE['name'],
    'url'      => $SITE['domain'],
    'logo'     => abs_url('/assets/img/logo.png'),
    'email'    => $SITE['contact']['email'],
    'telephone'=> $SITE['contact']['phone'],
    'foundingDate' => (string) $SITE['founded'],
    'address'  => [
        '@type' => 'PostalAddress',
        'streetAddress'   => $SITE['contact']['address'],
        'addressLocality' => $SITE['contact']['city'],
        'addressRegion'   => $SITE['contact']['region'],
        'postalCode'      => $SITE['contact']['postal'],
        'addressCountry'  => $SITE['contact']['country'],
    ],
    'sameAs'   => array_values($SITE['social']),
];
$schemas = array_merge([$orgSchema], $meta['schema'] ?? []);
?>
<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<script>document.documentElement.classList.remove('no-js');document.documentElement.classList.add('js');</script>

<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','<?= e($SITE['analytics']['gtm']) ?>');</script>
<!-- End Google Tag Manager -->

<title><?= e($meta['title']) ?></title>
<meta name="description" content="<?= e($meta['desc']) ?>">
<meta name="robots" content="<?= e($meta['robots']) ?>">
<link rel="canonical" href="<?= e($canonical) ?>">
<meta name="theme-color" content="#0a0a0a">
<meta name="author" content="BrandZaha">

<!-- Open Graph / Twitter -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="<?= e($SITE['name']) ?>">
<meta property="og:title" content="<?= e($meta['title']) ?>">
<meta property="og:description" content="<?= e($meta['desc']) ?>">
<meta property="og:url" content="<?= e($canonical) ?>">
<meta property="og:image" content="<?= e(abs_url($meta['og_image'])) ?>">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="<?= e($meta['title']) ?>">
<meta name="twitter:description" content="<?= e($meta['desc']) ?>">
<meta name="twitter:image" content="<?= e(abs_url($meta['og_image'])) ?>">

<!-- Favicons -->
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">

<!-- Local design system CSS first (render-blocking, fast, self-hosted) -->
<link rel="stylesheet" href="/assets/css/main.css?v=2">

<!-- Fonts: Epilogue (body/UI) + Anton (display) — loaded non-blocking so a slow
     CDN never blocks rendering or scripts; fallback fonts show instantly. -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Epilogue:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Epilogue:wght@300;400;500;600;700;800&display=swap"></noscript>

<?php foreach ($schemas as $schema): ?>
<script type="application/ld+json"><?= json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) ?></script>
<?php endforeach; ?>
</head>
<body class="<?= e($meta['page_class']) ?>">

<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=<?= e($SITE['analytics']['gtm']) ?>" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

<a class="skip-link" href="#main" style="position:absolute;left:-9999px;top:0;z-index:9999;background:var(--accent);color:#000;padding:.6rem 1rem;border-radius:0 0 8px 0" onfocus="this.style.left='0'" onblur="this.style.left='-9999px'">Skip to content</a>

<div class="grain" aria-hidden="true"></div>
<div class="curtain" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>

<?php if (empty($meta['no_preloader'])): ?>
<div class="preloader" aria-hidden="true">
  <div class="preloader__inner">
    <div class="preloader__count">0%</div>
    <div class="preloader__bar"><i></i></div>
  </div>
</div>
<script>
/* Failsafe: never let the preloader trap content if scripts stall (slow CDN, JS error). */
(function(){var t=setTimeout(function(){var p=document.querySelector('.preloader');if(p&&!document.body.classList.contains('is-loaded')){p.style.transition='opacity .5s';p.style.opacity='0';p.style.visibility='hidden';document.body.classList.add('is-loaded');window.dispatchEvent(new Event('bz:loaded'));setTimeout(function(){p&&p.remove();},600);}},4000);window.addEventListener('bz:loaded',function(){clearTimeout(t);});})();
</script>
<?php endif; ?>
