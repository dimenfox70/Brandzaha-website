<?php
/** BrandZaha — dynamic XML sitemap (served at /sitemap.xml via .htaccess). */
declare(strict_types=1);
$ROOT = __DIR__;
$SITE = require $ROOT . '/data/site.php';
$projects = require $ROOT . '/data/projects.php';
$landing  = require $ROOT . '/data/landing.php';
$posts    = require $ROOT . '/data/posts.php';

header('Content-Type: application/xml; charset=utf-8');

$base = rtrim($SITE['domain'], '/');
$today = date('Y-m-d');

$urls = [];
$add = function (string $loc, string $prio = '0.7', string $freq = 'monthly') use (&$urls, $base, $today) {
    $urls[] = ['loc' => $base . $loc, 'prio' => $prio, 'freq' => $freq, 'lastmod' => $today];
};

$add('/', '1.0', 'weekly');
$add('/work/', '0.9', 'weekly');
$add('/services/', '0.8', 'monthly');
$add('/about/', '0.7', 'monthly');
$add('/blog/', '0.7', 'weekly');
$add('/contact/', '0.6', 'yearly');

foreach ($projects as $p) { $add('/work/' . $p['slug'] . '/', '0.8', 'monthly'); }
foreach ($landing as $slug => $_) { $add('/' . $slug . '/', '0.8', 'monthly'); }
foreach ($posts as $post) { $add('/blog/' . $post['slug'] . '/', '0.6', 'monthly'); }

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
foreach ($urls as $u) {
    echo "  <url>\n";
    echo "    <loc>" . htmlspecialchars($u['loc'], ENT_XML1) . "</loc>\n";
    echo "    <lastmod>{$u['lastmod']}</lastmod>\n";
    echo "    <changefreq>{$u['freq']}</changefreq>\n";
    echo "    <priority>{$u['prio']}</priority>\n";
    echo "  </url>\n";
}
echo '</urlset>' . "\n";
