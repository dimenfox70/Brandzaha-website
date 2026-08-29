<?php
/**
 * BrandZaha — central site configuration.
 * Single source of truth for brand info, nav, SEO defaults and analytics.
 */

return [
    'name'        => 'BrandZaha',
    'tagline'     => 'Creative & Digital Agency',
    'domain'      => 'https://www.brandzaha.com',
    'founded'     => 2017,
    'copyright'   => '2019–' . date('Y') . ' BrandZaha',

    'contact' => [
        'address'    => '606 C, 7th Floor, Gordhan Sky, Jhotwara, Jaipur, Rajasthan 302012',
        'city'       => 'Jaipur',
        'region'     => 'Rajasthan',
        'postal'     => '302012',
        'country'    => 'IN',
        'phone'      => '+91-6376509220',
        'phone_raw'  => '916376509220',
        'email'      => 'Brandzaha@gmail.com',
        'hours'      => 'Mon–Sat, 10:00 AM – 7:00 PM',
        'maps'       => 'https://www.google.com/maps/search/?api=1&query=Gordhan+Sky+Jhotwara+Jaipur',
    ],

    'social' => [
        'Instagram' => 'https://www.instagram.com/brandzaha',
        'LinkedIn'  => 'https://www.linkedin.com/company/brandzaha',
        'Facebook'  => 'https://www.facebook.com/brandzaha',
    ],

    'analytics' => [
        'gtm' => 'GTM-PF8QR9LK',
        'ga4' => 'G-B2B6188HCL',
    ],

    'accent'  => '#d8ff36',

    // Primary navigation (full-screen menu order)
    'nav' => [
        ['label' => 'Home',        'url' => '/',            'highlight' => false],
        ['label' => 'Work',        'url' => '/work/',       'highlight' => false],
        ['label' => 'Services',    'url' => '/services/',   'highlight' => false],
        ['label' => 'E-commerce',  'url' => '/ecommerce-development-jaipur/', 'highlight' => false],
        ['label' => 'About',       'url' => '/about/',      'highlight' => false],
        ['label' => 'Blog',        'url' => '/blog/',       'highlight' => false],
        ['label' => 'Contact',     'url' => '/contact/',    'highlight' => false],
        ['label' => 'IT Training', 'url' => '/it-training-jaipur/', 'highlight' => true],
    ],
];
