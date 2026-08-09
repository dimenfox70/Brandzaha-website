<?php
/**
 * BrandZaha — portfolio data layer.
 * Add a project = add one entry here + drop assets in /assets/work/<slug>/.
 * The project-detail template (project.php) and Work grid (work.php) render from this.
 *
 * `hero` / `gallery` images: if the file is missing the template falls back to a
 * generated gradient poster so the site always renders cleanly.
 */

return [

    'zenith-home' => [
        'slug'        => 'zenith-home',
        'title'       => 'Zenith Home',
        'category'    => ['Web Development', 'Branding'],
        'year'        => 2025,
        'client'      => 'Zenith Home',
        'industry'    => 'Interior & Furniture',
        'summary'     => 'A cinematic e-commerce experience that turned browsers into buyers for a premium home brand.',
        'challenge'   => 'Zenith Home had a beautiful catalogue trapped inside a slow, template-driven store. Bounce rates were high, product pages felt generic, and the brand’s premium positioning never came through on screen.',
        'solution'    => 'We rebuilt the storefront around the product photography — full-bleed hero rooms, tactile product cards with depth, and a checkout stripped to the essentials. A refreshed identity system gave every page a consistent, confident voice.',
        'results'     => [
            ['metric' => '+40%', 'label' => 'Conversion rate'],
            ['metric' => '-32%', 'label' => 'Bounce rate'],
            ['metric' => '2.1s', 'label' => 'Largest Contentful Paint'],
            ['metric' => '+68%', 'label' => 'Avg. session time'],
        ],
        'services'    => ['UI/UX Design', 'PHP Development', 'Brand Identity', 'SEO'],
        'hero'        => '/assets/work/zenith-home/hero.webp',
        'gallery'     => [
            '/assets/work/zenith-home/01.webp',
            '/assets/work/zenith-home/02.webp',
            '/assets/work/zenith-home/03.webp',
        ],
        'accent'      => '#d8ff36',
        'palette'     => ['#0e1013', '#1c2b1f', '#d8ff36'],
        'testimonial' => [
            'quote' => 'BrandZaha didn’t just redesign our website — they rebuilt how customers feel about the brand. Sales followed within weeks.',
            'name'  => 'Rohit Agarwal',
            'role'  => 'Founder, Zenith Home',
        ],
        'live_url'    => 'https://www.brandzaha.com',
        'featured'    => true,
    ],

    'fpf-foundation' => [
        'slug'        => 'fpf-foundation',
        'title'       => 'FPF Foundation',
        'category'    => ['Web Development', 'Digital Marketing'],
        'year'        => 2024,
        'client'      => 'FPF Foundation',
        'industry'    => 'Non-profit',
        'summary'     => 'A donation-first platform and campaign engine that grew online giving for a grassroots NGO.',
        'challenge'   => 'FPF Foundation ran real impact on the ground but had almost no digital presence. Donations were manual, campaigns lived on WhatsApp, and there was no way to show donors where their money went.',
        'solution'    => 'We designed a warm, story-led site with a frictionless donation flow, live campaign pages, and an impact dashboard. Paired with a focused digital marketing push, every rupee became traceable to an outcome.',
        'results'     => [
            ['metric' => '3.4×', 'label' => 'Online donations'],
            ['metric' => '12k+', 'label' => 'New monthly visitors'],
            ['metric' => '+220%', 'label' => 'Campaign reach'],
            ['metric' => '18', 'label' => 'Active campaigns'],
        ],
        'services'    => ['UX Strategy', 'Web Development', 'SEO', 'Social Campaigns'],
        'hero'        => '/assets/work/fpf-foundation/hero.webp',
        'gallery'     => [
            '/assets/work/fpf-foundation/01.webp',
            '/assets/work/fpf-foundation/02.webp',
        ],
        'accent'      => '#8ad7ff',
        'palette'     => ['#0a0f14', '#12303f', '#8ad7ff'],
        'testimonial' => [
            'quote' => 'For the first time our donors can see their impact. The team gave our mission a home online.',
            'name'  => 'Meena Sharma',
            'role'  => 'Director, FPF Foundation',
        ],
        'live_url'    => 'https://www.brandzaha.com',
        'featured'    => true,
    ],

    'property-bapu' => [
        'slug'        => 'property-bapu',
        'title'       => 'Property Bapu',
        'category'    => ['Web Development', 'Branding', 'Mobile App'],
        'year'        => 2024,
        'client'      => 'Property Bapu',
        'industry'    => 'Real Estate',
        'summary'     => 'A property-discovery brand and portal that made listings feel effortless across web and mobile.',
        'challenge'   => 'Property Bapu was launching into a crowded Jaipur real-estate market with no brand and a spreadsheet of listings. They needed to look established from day one and make search genuinely fast.',
        'solution'    => 'We created the full identity, then built a lightning-fast listings portal with map search, saved properties, and lead routing — mirrored in a companion mobile experience so agents could work on the move.',
        'results'     => [
            ['metric' => '9.7k', 'label' => 'Listings indexed'],
            ['metric' => '+150%', 'label' => 'Qualified leads'],
            ['metric' => '4.8★', 'label' => 'App store rating'],
            ['metric' => '<1.8s', 'label' => 'Search response'],
        ],
        'services'    => ['Brand Identity', 'Web Development', 'Mobile App', 'Lead Systems'],
        'hero'        => '/assets/work/property-bapu/hero.webp',
        'gallery'     => [
            '/assets/work/property-bapu/01.webp',
            '/assets/work/property-bapu/02.webp',
        ],
        'accent'      => '#ffb35c',
        'palette'     => ['#120d08', '#3a2410', '#ffb35c'],
        'testimonial' => [
            'quote' => 'We looked like the biggest name in the market on launch day. That confidence closed deals.',
            'name'  => 'Sunil Yadav',
            'role'  => 'Co-founder, Property Bapu',
        ],
        'live_url'    => 'https://www.brandzaha.com',
        'featured'    => true,
    ],

];
