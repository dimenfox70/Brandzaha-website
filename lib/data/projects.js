// Plain static defaults — safe to import from Client Components (no server-only
// dependencies). lib/projects.js re-exports this and adds the Supabase-backed getProjects().
export const projects = [
  {
    slug: 'zenith-home',
    title: 'Zenith Home',
    category: ['E-commerce', 'Web Development', 'Branding'],
    year: 2025,
    client: 'Zenith Home',
    industry: 'Interior & Furniture',
    summary: 'A cinematic e-commerce experience that turned browsers into buyers for a premium home brand.',
    challenge:
      'Zenith Home had a beautiful catalogue trapped inside a slow, template-driven store. Bounce rates were high, product pages felt generic, and the brand’s premium positioning never came through on screen.',
    solution:
      'We rebuilt the storefront around the product photography — full-bleed hero rooms, tactile product cards with depth, and a checkout stripped to the essentials. A refreshed identity system gave every page a consistent, confident voice.',
    results: [
      { metric: '+40%', label: 'Conversion rate' },
      { metric: '-32%', label: 'Bounce rate' },
      { metric: '2.1s', label: 'Largest Contentful Paint' },
      { metric: '+68%', label: 'Avg. session time' },
    ],
    services: ['UI/UX Design', 'Next.js Development', 'Brand Identity', 'SEO'],
    palette: ['#0e1013', '#1c2b1f', '#d8ff36'],
    accent: '#d8ff36',
    testimonial: {
      quote:
        'BrandZaha didn’t just redesign our website — they rebuilt how customers feel about the brand. Sales followed within weeks.',
      name: 'Rohit Agarwal',
      role: 'Founder, Zenith Home',
    },
    liveUrl: 'https://www.brandzaha.com',
    featured: true,
  },
  {
    slug: 'fpf-foundation',
    title: 'FPF Foundation',
    category: ['Web Development', 'Digital Marketing'],
    year: 2024,
    client: 'FPF Foundation',
    industry: 'Non-profit',
    summary: 'A donation-first platform and campaign engine that grew online giving for a grassroots NGO.',
    challenge:
      'FPF Foundation ran real impact on the ground but had almost no digital presence. Donations were manual, campaigns lived on WhatsApp, and there was no way to show donors where their money went.',
    solution:
      'We designed a warm, story-led site with a frictionless donation flow, live campaign pages, and an impact dashboard. Paired with a focused digital marketing push, every rupee became traceable to an outcome.',
    results: [
      { metric: '3.4×', label: 'Online donations' },
      { metric: '12k+', label: 'New monthly visitors' },
      { metric: '+220%', label: 'Campaign reach' },
      { metric: '18', label: 'Active campaigns' },
    ],
    services: ['UX Strategy', 'Web Development', 'SEO', 'Social Campaigns'],
    palette: ['#0a0f14', '#12303f', '#8ad7ff'],
    accent: '#8ad7ff',
    testimonial: {
      quote: 'For the first time our donors can see their impact. The team gave our mission a home online.',
      name: 'Meena Sharma',
      role: 'Director, FPF Foundation',
    },
    liveUrl: 'https://www.brandzaha.com',
    featured: true,
  },
  {
    slug: 'property-bapu',
    title: 'Property Bapu',
    category: ['Web Development', 'Branding', 'Mobile App'],
    year: 2024,
    client: 'Property Bapu',
    industry: 'Real Estate',
    summary: 'A property-discovery brand and portal that made listings feel effortless across web and mobile.',
    challenge:
      'Property Bapu was launching into a crowded Jaipur real-estate market with no brand and a spreadsheet of listings. They needed to look established from day one and make search genuinely fast.',
    solution:
      'We created the full identity, then built a lightning-fast listings portal with map search, saved properties, and lead routing — mirrored in a companion mobile experience so agents could work on the move.',
    results: [
      { metric: '9.7k', label: 'Listings indexed' },
      { metric: '+150%', label: 'Qualified leads' },
      { metric: '4.8★', label: 'App store rating' },
      { metric: '<1.8s', label: 'Search response' },
    ],
    services: ['Brand Identity', 'Web Development', 'Mobile App', 'Lead Systems'],
    palette: ['#120d08', '#3a2410', '#ffb35c'],
    accent: '#ffb35c',
    testimonial: {
      quote: 'We looked like the biggest name in the market on launch day. That confidence closed deals.',
      name: 'Sunil Yadav',
      role: 'Co-founder, Property Bapu',
    },
    liveUrl: 'https://www.brandzaha.com',
    featured: true,
  },
  {
    slug: 'aurum-retail',
    title: 'Aurum Retail',
    category: ['E-commerce', 'Branding'],
    year: 2025,
    client: 'Aurum Retail',
    industry: 'Fashion & Apparel',
    platform: 'Shopify Plus',
    summary: 'A Shopify Plus flagship store that gave a fast-growing fashion label a checkout as premium as its clothes.',
    challenge:
      'Aurum was scaling fast but their off-the-shelf theme couldn’t keep up — slow product pages, a clunky checkout, and no room for the editorial storytelling the brand is known for.',
    solution:
      'We rebuilt the store on Shopify Plus with a custom theme, a streamlined one-page checkout, dynamic lookbooks, and app integrations for loyalty and reviews — all tuned for speed and conversion.',
    results: [
      { metric: '+52%', label: 'Conversion rate' },
      { metric: '+38%', label: 'Average order value' },
      { metric: '1.9s', label: 'Store load time' },
      { metric: '-27%', label: 'Cart abandonment' },
    ],
    services: ['Shopify Plus', 'Custom Theme', 'CRO', 'Brand Identity'],
    palette: ['#0f0d08', '#2c2510', '#e7c65b'],
    accent: '#e7c65b',
    testimonial: {
      quote: 'Our store finally feels as considered as our collections. Revenue per visitor jumped almost overnight.',
      name: 'Priya Nair',
      role: 'Marketing Head, Aurum Retail',
    },
    liveUrl: 'https://www.brandzaha.com',
    featured: true,
  },
  {
    slug: 'kesar-foods',
    title: 'Kesar Foods',
    category: ['E-commerce', 'Web Development'],
    year: 2024,
    client: 'Kesar Foods',
    industry: 'Gourmet & FMCG',
    platform: 'WooCommerce',
    summary: 'A WooCommerce store pairing rich content with commerce for a heritage gourmet food brand.',
    challenge:
      'Kesar Foods had loyal offline customers but no way to sell their saffron and spice range online — and they wanted full ownership of the platform, not a locked-in SaaS.',
    solution:
      'We built a fast, content-rich WooCommerce store on WordPress: recipe-led product storytelling, subscription boxes, multiple payment gateways, and inventory synced to their warehouse — all owned outright by the brand.',
    results: [
      { metric: '4.2×', label: 'Online revenue' },
      { metric: '6.5k', label: 'Monthly orders' },
      { metric: '32%', label: 'Subscription share' },
      { metric: '2.3s', label: 'Load time' },
    ],
    services: ['WooCommerce', 'WordPress', 'Subscriptions', 'Payment Gateways'],
    palette: ['#140a06', '#3a170c', '#ff7a4d'],
    accent: '#ff7a4d',
    testimonial: {
      quote: 'They gave us a real business online — and we own every bit of it. Subscriptions changed everything.',
      name: 'Anil Gupta',
      role: 'Owner, Kesar Foods',
    },
    liveUrl: 'https://www.brandzaha.com',
    featured: true,
  },
  {
    slug: 'nova-labs',
    title: 'Nova Labs',
    category: ['E-commerce', 'Web Development', 'Mobile App'],
    year: 2025,
    client: 'Nova Labs',
    industry: 'Consumer Electronics',
    platform: 'Headless · Next.js',
    summary: 'A headless, Next.js commerce experience delivering near-instant storefront speed for a D2C tech brand.',
    challenge:
      'Nova Labs was launching premium hardware and wanted a storefront that felt as advanced as their products — instant, app-like, and free of the constraints of a templated platform.',
    solution:
      'We built a headless store: a Next.js/React storefront on the front, commerce APIs and a headless CMS behind it, and a custom checkout. The result loads instantly, ranks well, and gives the team total design freedom.',
    results: [
      { metric: '0.9s', label: 'Time to interactive' },
      { metric: '98', label: 'Lighthouse performance' },
      { metric: '+61%', label: 'Mobile conversion' },
      { metric: '+44%', label: 'Organic traffic' },
    ],
    services: ['Headless Commerce', 'Next.js / React', 'Custom Checkout', 'API & CMS'],
    palette: ['#08110e', '#0f2f28', '#5cffce'],
    accent: '#5cffce',
    testimonial: {
      quote: 'It’s the fastest store we’ve ever shipped — and we can build anything we imagine on top of it.',
      name: 'Rahul Khanna',
      role: 'Founder, Nova Labs',
    },
    liveUrl: 'https://www.brandzaha.com',
    featured: true,
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
export const getNext = (slug) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};

export default projects;
