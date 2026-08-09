<?php
/**
 * BrandZaha — shared helper functions.
 * Included by every page (bootstrap.php).
 */

if (!function_exists('e')) {
    /** HTML-escape */
    function e(?string $v): string {
        return htmlspecialchars((string) $v, ENT_QUOTES, 'UTF-8');
    }
}

/** Absolute URL for canonical / OG */
function abs_url(string $path = ''): string {
    global $SITE;
    return rtrim($SITE['domain'], '/') . '/' . ltrim($path, '/');
}

/** Generated gradient poster (SVG data-URI) used when an image asset is missing. */
function poster_svg(array $palette, string $label = '', string $seed = 'bz'): string {
    $p = array_values($palette + ['#101012', '#1b1b20', '#d8ff36']);
    [$c1, $c2, $accent] = [$p[0], $p[1], $p[2]];
    $n = crc32($seed);
    $a1 = ($n % 60) - 30;
    $svg = <<<SVG
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="{$c1}"/><stop offset="1" stop-color="{$c2}"/>
    </linearGradient>
    <radialGradient id="r" cx="70%" cy="25%" r="60%">
      <stop offset="0" stop-color="{$accent}" stop-opacity=".55"/>
      <stop offset="1" stop-color="{$accent}" stop-opacity="0"/>
    </radialGradient>
    <filter id="b"><feGaussianBlur stdDeviation="18"/></filter>
  </defs>
  <rect width="800" height="600" fill="url(#g)"/>
  <rect width="800" height="600" fill="url(#r)"/>
  <g opacity=".18" stroke="{$accent}" stroke-width="1" fill="none">
    <circle cx="640" cy="150" r="120" transform="rotate({$a1} 640 150)"/>
    <circle cx="640" cy="150" r="180"/>
    <path d="M-40 480 Q 400 360 840 520" />
    <path d="M-40 540 Q 400 420 840 580" />
  </g>
  <g opacity=".9" filter="url(#b)"><circle cx="180" cy="470" r="90" fill="{$accent}" opacity=".25"/></g>
</svg>
SVG;
    return 'data:image/svg+xml;base64,' . base64_encode($svg);
}

/**
 * Render a responsive image; falls back to a generated gradient poster
 * (as a CSS background) when the real asset does not exist on disk.
 */
function bz_image(string $src, string $alt, array $palette, array $opts = []): string {
    $docroot = $_SERVER['DOCUMENT_ROOT'] ?? dirname(__DIR__);
    $fs = $docroot . $src;
    $class = $opts['class'] ?? '';
    $loading = $opts['loading'] ?? 'lazy';
    $sizes = $opts['sizes'] ?? '(max-width: 800px) 100vw, 800px';
    $extra = $opts['attr'] ?? '';
    if (is_file($fs)) {
        return '<img src="' . e($src) . '" alt="' . e($alt) . '" class="' . e($class) . '" loading="' . e($loading) . '" decoding="async" sizes="' . e($sizes) . '" ' . $extra . '>';
    }
    // Poster fallback
    $poster = poster_svg($palette, $opts['label'] ?? '', $opts['seed'] ?? $src);
    return '<div class="' . e($class) . ' work-card__poster" role="img" aria-label="' . e($alt) . '" style="background:#101012 url(\'' . $poster . '\') center/cover no-repeat;width:100%;height:100%"></div>';
}

/** Icon set (inline SVG, stroke = currentColor) */
function bz_icon(string $name, int $size = 24): string {
    $s = $size;
    $icons = [
        'arrow'    => '<path d="M5 12h14M13 6l6 6-6 6"/>',
        'code'     => '<path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 4l-4 16"/>',
        'megaphone'=> '<path d="M3 11v2a1 1 0 0 0 1 1h2l9 5V5L6 10H4a1 1 0 0 0-1 1zM18 8a4 4 0 0 1 0 8"/>',
        'palette'  => '<path d="M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1.5-1.5 0-1 .8-1.5 1.5-1.5H17a4 4 0 0 0 4-4c0-5-4-8-9-8z"/><circle cx="7.5" cy="10.5" r="1"/><circle cx="12" cy="7.5" r="1"/><circle cx="16.5" cy="10.5" r="1"/>',
        'device'   => '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
        'star'     => '<path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z"/>',
        'pen'      => '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
        'shield'   => '<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/>',
        'grid'     => '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
        'whatsapp' => '<path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z"/><path d="M8.5 8.5c0 4 3 7 7 7 .6 0 1-.5 1-1l-.3-1.4-2 .7-1.4-1.4-1.4-1.4.7-2L9 8.2c-.5 0-1 .4-1 1z" fill="currentColor" stroke="none"/>',
        'phone'    => '<path d="M4 4h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 2 6a2 2 0 0 1 2-2z"/>',
        'mail'     => '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
        'pin'      => '<path d="M12 21s7-6.5 7-11a7 7 0 0 0-14 0c0 4.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
        'clock'    => '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
        'check'    => '<path d="M20 6L9 17l-5-5"/>',
        'spark'    => '<path d="M12 3v6M12 15v6M3 12h6M15 12h6"/>',
    ];
    $path = $icons[$name] ?? $icons['spark'];
    return '<svg width="' . $s . '" height="' . $s . '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' . $path . '</svg>';
}

/** Wrap words for split-text (server-rendered, JS enhances) */
function split_words(string $text): string {
    $out = '';
    foreach (preg_split('/(\s+)/', trim($text), -1, PREG_SPLIT_DELIM_CAPTURE) as $part) {
        if (trim($part) === '') { $out .= $part; continue; }
        $out .= '<span class="word">' . e($part) . '</span>';
    }
    return $out;
}
