<?php
/**
 * BrandZaha — bootstrap.
 * Every page starts with: require __DIR__ . '/partials/bootstrap.php';
 * Loads config + helpers + data and sets sensible SEO defaults.
 */
declare(strict_types=1);

error_reporting(E_ALL & ~E_DEPRECATED & ~E_NOTICE);

$ROOT = dirname(__DIR__);
$SITE = require $ROOT . '/data/site.php';
require $ROOT . '/partials/functions.php';

// SEO defaults (pages override before including head.php)
$meta = [
    'title'     => $SITE['name'] . ' — ' . $SITE['tagline'] . ' in Jaipur',
    'desc'      => 'BrandZaha is a creative & digital agency in Jaipur crafting cinematic websites, brands, apps and growth marketing that perform.',
    'canonical' => '/',
    'og_image'  => '/assets/img/og-default.jpg',
    'page_class'=> '',
    'schema'    => [],
    'robots'    => 'index,follow',
];
