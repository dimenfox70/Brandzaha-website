// Zaha AI Shopping Assistant: every word, price and link on /ai-shopping-assistant.
// Edit copy here. Components read from this file and never hard-code text.
//
// Optional media (rebuild after adding; missing files fall back to the animated mocks):
//   public/zaha/demo.mp4             screen recording, plays in the demo phone (portrait 9:19.5 looks best)
//   public/zaha/demo-poster.jpg      first frame shown before the video plays
//   public/zaha/tryon-before.jpg     photo try-on slider, before (add both before and after)
//   public/zaha/tryon-after.jpg      photo try-on slider, after
//   public/zaha/live.jpg             still for the live camera mock
//   public/zaha/guide/step-1.png … step-6.png   Shopify setup guide screenshots (.png, .jpg or .webp)

const setupDayLink = '/contact?subject=Zaha%20setup%20day';
const installLink = '/contact?subject=Zaha%20install%20link';

export const zaha = {
  slug: '/ai-shopping-assistant',

  seo: {
    title: 'Zaha AI Shopping Assistant for Shopify',
    description:
      'Zaha is an AI shopping assistant for your store. It finds products from your live catalogue, lets shoppers try clothes on from one photo or the live camera, and adds to bag inside the chat.',
    ogAlt: 'Zaha AI Shopping Assistant by BrandZaha',
  },

  links: {
    setupDay: setupDayLink,
    install: installLink,
  },

  // Files the page looks for in /public. Missing files fall back to placeholders.
  media: {
    demoVideo: '/zaha/demo.mp4',
    demoPoster: '/zaha/demo-poster.jpg',
    tryOnBefore: '/zaha/tryon-before.jpg',
    tryOnAfter: '/zaha/tryon-after.jpg',
    live: '/zaha/live.jpg',
  },

  /* 1 — Hero */
  hero: {
    pill: { tag: 'New', text: 'Live camera try-on' },
    title: ['Your store,', 'now with', 'a stylist.'],
    lead: 'Zaha is an AI shopping assistant that talks to your shoppers, finds the right product from your real catalogue, and lets them see it on themselves before they buy.',
    primary: { label: 'Watch the demo', href: '#demo' },
    secondary: { label: 'Add it to Shopify', href: '#shopify-guide' },
    note: 'By BrandZaha · Live on Shopify today',
  },

  /* 2 — Marquee */
  marquee: [
    'Plain-language search',
    'Photo try-on',
    'Live camera try-on',
    'Add to bag in chat',
    'Curated picks',
    'Voice input',
    'Wishlist',
    'Multi-currency',
    'Your brand, your rules',
  ],

  /* 3 — Demo */
  demo: {
    eyebrow: 'See it in action',
    title: 'One chat. Search to bag.',
    lead: 'How a shopper goes from a question to a full bag, without leaving the chat.',
    steps: [
      { title: 'Ask in plain words', text: 'The shopper types what they need, budget included.' },
      { title: 'See live products', text: 'Zaha searches your catalogue and shows matching items with real prices and stock.' },
      { title: 'Try it on', text: 'One photo, and the shopper sees the shirt on themselves.' },
      { title: 'Add to bag', text: 'Zaha checks the size and adds it to the bag, right in the chat.' },
    ],
    // When /public/zaha/demo.mp4 exists, these are the seconds where each step starts in the video.
    videoCues: [0, 4, 9, 14],
    assistant: { name: 'Zaha', status: 'Online' },
    chat: {
      ask: 'Need a linen shirt for a beach wedding, under ₹3,000',
      found: 'Here are 3 linen shirts under ₹3,000, all in stock:',
      products: [
        { name: 'Sand Linen Shirt', price: '₹2,490', color: '#d8c4a0', shade: '#b39d77' },
        { name: 'Sage Camp Collar', price: '₹2,190', color: '#9fb391', shade: '#7c8f6f' },
        { name: 'Ivory Mandarin', price: '₹2,790', color: '#efe8d8', shade: '#cfc6b2' },
      ],
      tryAsk: 'Can I see the sage one on me?',
      tryWorking: 'Trying it on…',
      tryDone: 'Here you go. Drag to compare.',
      sizeAsk: 'Size M is in stock. Add it to your bag?',
      sizes: ['S', 'M', 'L', 'XL'],
      sizePick: 'M',
      confirm: 'Yes, size M',
      added: 'Added ✓',
      addedItem: 'Sage Camp Collar · M · ₹2,190',
      inputPlaceholder: 'Ask Zaha anything…',
    },
    videoLabel: 'Screen recording of Zaha on a live store',
  },

  /* 4 — Capabilities (3 × 3) */
  capabilities: {
    eyebrow: 'What Zaha does',
    title: 'Everything a good shop assistant does.',
    items: [
      { icon: 'search', title: 'Plain-language search', text: 'Shoppers ask in their own words. Zaha searches your live products, prices, stock and variants.' },
      { icon: 'user', title: 'Photo try-on', text: 'One photo, and the shopper sees the outfit on themselves in about 15–30 seconds.' },
      { icon: 'video', title: 'Live camera try-on', text: 'Real-time try-on in the browser camera. The outfit moves with the shopper.', badge: 'New' },
      { icon: 'bag', title: 'Add to bag in chat', text: 'Product cards with variant and size pickers. Nobody leaves the chat to buy.' },
      { icon: 'pin', title: 'Curated picks', text: 'Pin the products you want Zaha to recommend first.' },
      { icon: 'mic', title: 'Voice and wishlist', text: 'Shoppers can speak instead of type, and save items for later.' },
      { icon: 'globe', title: 'Multi-currency', text: 'Prices follow the shopper’s market, in their currency.' },
      { icon: 'palette', title: 'Your brand, your rules', text: 'Set the name, greeting, colours, launcher position, try-on product types and daily limits.' },
      { icon: 'chart', title: 'Usage in your admin', text: 'See chats, try-ons and live minutes for the month.' },
    ],
  },

  /* 5 — What's new */
  whatsNew: {
    eyebrow: 'What’s new',
    title: 'Shoppers can see it on before they buy.',
    photo: {
      label: 'Photo try-on',
      title: 'One photo. The outfit, on them.',
      text: 'The shopper uploads one photo and sees the outfit on themselves in about 15–30 seconds.',
      points: [
        'Powered by Google’s virtual try-on model, plus a styling pass.',
        'Keeps the shopper’s face, body, size and background unchanged.',
        'Follows tuck, sleeve length and colours from the product photo.',
        'You choose “whole look” or “only this item”.',
        'Photos are used for the try-on, then discarded. Never stored.',
      ],
      before: 'Before',
      after: 'After',
      sliderLabel: 'Drag to compare before and after',
      altBefore: 'Shopper photo before try-on',
      altAfter: 'The same shopper wearing the sage camp collar shirt after try-on',
      illustration: 'Illustration',
    },
    live: {
      label: 'Live camera try-on',
      tag: 'New · Upgrade plan',
      title: 'Try it on, live.',
      text: 'Real-time try-on in the browser camera. The outfit moves with the shopper.',
      points: [
        'Switch products mid-session.',
        'Snapshot and Add to bag on the same screen.',
        'You set session length and sessions per shopper per day.',
        'Included in Pro + Live, with 60 live camera minutes a month.',
      ],
      alt: 'Live camera try-on running in a phone browser',
      rec: 'REC',
      liveBadge: 'Live',
      snapshot: 'Snapshot',
      addToBag: 'Add to bag',
      sessionLabel: 'Session',
      sessionSeconds: 180,
      outfits: [
        { name: 'Sage Camp Collar', color: '#9fb391', shade: '#7c8f6f' },
        { name: 'Sand Linen Shirt', color: '#d8c4a0', shade: '#b39d77' },
        { name: 'Ivory Mandarin', color: '#efe8d8', shade: '#cfc6b2' },
        { name: 'Indigo Overshirt', color: '#4d6fbf', shade: '#3a568f' },
      ],
    },
  },

  /* 6 — Why Zaha */
  why: {
    eyebrow: 'Why Zaha',
    title: 'Not another chat widget.',
    them: 'Most chat widgets',
    us: 'Zaha',
    rows: [
      { title: 'Knows your catalogue', them: 'Scripted answers and a link to search.', us: 'Reads your live products, prices and stock.' },
      { title: 'Shows, not tells', them: 'Text replies only.', us: 'Product cards, size pickers, photo try-on and live try-on in one chat.' },
      { title: 'Made for Indian brands', them: 'Priced in dollars, with foreign support hours.', us: 'Rupee plans, local payments and a team you can call.' },
      { title: 'You stay in control', them: 'One fixed look.', us: 'Your colours, greeting, pinned products and limits.' },
      { title: 'Set up by people', them: 'A help article.', us: 'Our team sets it up in a day for ₹599.' },
    ],
    stats: [
      { value: '~20s', label: 'Photo try-on' },
      { value: '14-day', label: 'Free Pro trial' },
      { value: '1', label: 'App embed to switch on' },
      { value: '0', label: 'Shopper photos stored' },
    ],
  },

  /* 7 — Integrations */
  integrations: {
    eyebrow: 'Where it works',
    title: 'Shopify today. Any store with our team.',
    note: 'Only Shopify is self-serve today. For WooCommerce and custom sites, our team connects Zaha for you.',
    items: [
      {
        name: 'Shopify',
        icon: 'bag',
        badge: 'Available now',
        badgeTone: 'shopify',
        text: 'Installs as a Shopify app with a theme app embed. No theme code changes.',
        points: ['Live products, variants and stock', 'Cart and wishlist', 'Photo and live try-on', 'Works with any Online Store 2.0 theme'],
        cta: { label: 'See the setup guide', href: '#shopify-guide' },
      },
      {
        name: 'WordPress / WooCommerce',
        icon: 'cart',
        badge: 'Setup by our team',
        text: 'We connect Zaha to your WooCommerce product feed and cart, and add the chat to your theme.',
        points: ['Product feed and cart connected', 'Chat added to your theme', 'Done by BrandZaha'],
        cta: { label: 'Book a setup day', href: setupDayLink },
      },
      {
        name: 'Custom sites',
        icon: 'code',
        badge: 'Setup by our team',
        text: 'Next.js, React, Laravel, anything. One script tag, connected to your product and cart APIs.',
        points: ['One script tag', 'Your product and cart APIs', 'Scoped after a short call'],
        cta: { label: 'Book a setup day', href: setupDayLink },
      },
    ],
  },

  /* 8 — Shopify setup guide */
  guide: {
    eyebrow: 'Shopify setup guide',
    title: 'Live in six steps.',
    lead: 'No code, no theme edits. Follow along in your Shopify admin.',
    // `image` is optional. Put screenshots at these paths (.png, .jpg or .webp all work).
    steps: [
      {
        title: 'Get your install link',
        text: 'Send us your yourstore.myshopify.com address. We send you a private install link. Zaha is installed privately for each store and is not on the App Store yet.',
        link: { label: 'Request your install link', href: installLink },
        image: '/zaha/guide/step-1.png',
        alt: 'Message with a private Zaha install link',
      },
      {
        title: 'Install the app',
        text: 'Open the link while signed in to your Shopify admin and click Install. Zaha then appears under Apps.',
        image: '/zaha/guide/step-2.png',
        alt: 'Shopify admin install screen for the Zaha app',
      },
      {
        title: 'Set up the assistant',
        text: 'Choose its name, greeting, colours and launcher position, and pin the products to recommend first.',
        image: '/zaha/guide/step-3.png',
        alt: 'Zaha app settings for name, greeting, colours and pinned products',
      },
      {
        title: 'Switch on the app embed',
        text: 'Go to Online Store → Themes → Customize → App embeds. Turn on “Zaha Assistant” and click Save.',
        image: '/zaha/guide/step-4.png',
        alt: 'Shopify theme editor with the Zaha Assistant app embed turned on',
      },
      {
        title: 'Turn on try-on',
        text: 'In the app’s Virtual try-on section, switch it on, choose the product types and set daily limits. Add live camera try-on if your plan includes it.',
        image: '/zaha/guide/step-5.png',
        alt: 'Zaha virtual try-on settings with product types and daily limits',
      },
      {
        title: 'Choose a plan',
        text: 'Open Plan & billing. Your 14-day Pro trial starts at install. Pay with UPI, card or net banking.',
        image: '/zaha/guide/step-6.png',
        alt: 'Zaha plan and billing screen',
      },
    ],
    footer: [
      { label: 'Time needed', value: 'about 20 minutes' },
      { label: 'Code changes', value: 'none' },
    ],
    footerCta: { prefix: 'Prefer not to?', label: 'Book our team for ₹599', href: setupDayLink },
    enlarge: 'Enlarge screenshot',
    close: 'Close',
  },

  /* 9 — Setup day */
  setupDay: {
    eyebrow: 'Hire an expert for a day',
    price: '₹599',
    priceNote: 'one full day',
    title: 'We set it up. You sell.',
    text: 'A BrandZaha technical expert works on your store for one full day.',
    checklist: [
      'Install and connect on Shopify, WordPress or a custom site',
      'Colours, greeting and launcher matched to your brand',
      'Try-on enabled for the right product types',
      'Curated picks and limits configured',
      'A walkthrough for your team',
    ],
    cta: { label: 'Book a setup day', href: setupDayLink },
  },

  /* 10 — Pricing */
  pricing: {
    eyebrow: 'Pricing',
    title: 'Plans in rupees.',
    lead: 'Prices are per month, excluding GST. Pay monthly or yearly through BezyPay.',
    period: '/month',
    tax: '+ GST',
    plans: [
      { name: 'Free', price: '₹0', features: ['100 chats a month', 'Product search and cards', 'Add to bag'] },
      { name: 'Basic', price: '₹999', features: ['2,000 chats a month', 'Curated picks', 'Voice and wishlist'] },
      { name: 'Pro', price: '₹2,499', highlight: 'Most stores', features: ['Unlimited chats', '300 photo try-ons a month', 'Everything in Basic'] },
      { name: 'Pro + Live', price: '₹9,999', features: ['Unlimited chats', '500 photo try-ons a month', '60 live camera minutes a month'] },
    ],
    cta: { label: 'Get your install link', href: installLink },
    note: 'Every store starts with a 14-day Pro trial. If a plan isn’t renewed, the store moves to Free and nothing is deleted. Custom plans available.',
    customCta: { label: 'Ask about a custom plan', href: '/contact?subject=Zaha%20custom%20plan' },
  },

  /* 11 — FAQ */
  faq: {
    eyebrow: 'FAQ',
    title: 'Good questions.',
    items: [
      ['Do I need a developer?', 'No. On Shopify you install the app, set it up and switch on the app embed in your theme. No code changes, about 20 minutes. If you’d rather not, our team does it for you for ₹599.'],
      ['Is it on the Shopify App Store?', 'Not yet. We install Zaha privately for each store. Send us your yourstore.myshopify.com address and we’ll send your install link.'],
      ['What happens to shoppers’ photos?', 'They are used for the try-on and then discarded. Zaha never stores them.'],
      ['Which products work with try-on?', 'Clothing: tops, shirts, dresses, kurtas, trousers, skirts and jackets. You choose which product types shoppers can try on, and set daily limits.'],
      ['Can it match my brand?', 'Yes. You set the assistant’s name, greeting, colours and launcher position, and pin the products it should recommend first.'],
      ['How do I pay?', 'Through BezyPay, our own payment gateway: UPI, cards or net banking. Pay monthly or yearly, and we remind you before renewal.'],
    ],
  },

  /* 12 — Closing CTA */
  closing: {
    title: 'Let shoppers try it on.',
    text: 'Start with a 14-day Pro trial on Shopify, or let our team set it up for you.',
    primary: { label: 'Start on Shopify', href: installLink },
    secondary: { label: 'Book a setup day · ₹599', href: setupDayLink },
  },

  /* Teaser shown on /ecommerce */
  teaser: {
    eyebrow: 'New from BrandZaha',
    title: 'Zaha, the AI shopping assistant.',
    text: 'It finds products from your live catalogue, lets shoppers try clothes on, and adds to bag inside the chat. Live on Shopify today.',
    cta: 'Meet Zaha',
  },
};

export default zaha;
