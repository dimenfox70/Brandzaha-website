// BrandZaha — central site configuration (single source of truth).
export const site = {
  name: 'BrandZaha',
  tagline: 'Creative & Digital Agency',
  domain: 'https://www.brandzaha.com',
  founded: 2017,
  contact: {
    address: '606 C, 7th Floor, Gordhan Sky, Jhotwara, Jaipur, Rajasthan 302012',
    city: 'Jaipur',
    region: 'Rajasthan',
    postal: '302012',
    country: 'IN',
    phone: '+91-6376509220',
    phoneRaw: '916376509220',
    email: 'info@brandzaha.com',
    hours: 'Mon–Sat, 10:00 AM – 7:00 PM',
    maps: 'https://www.google.com/maps/search/?api=1&query=Gordhan+Sky+Jhotwara+Jaipur',
  },
  social: {
    Instagram: 'https://www.instagram.com/brandzaha',
    LinkedIn: 'https://www.linkedin.com/company/brandzaha',
    Facebook: 'https://www.facebook.com/brandzaha',
  },
  analytics: { gtm: 'GTM-PF8QR9LK', ga4: 'G-B2B6188HCL' },
  accent: '#d8ff36',
  nav: [
    { label: 'Home', url: '/' },
    { label: 'Work', url: '/work' },
    { label: 'Services', url: '/services' },
    { label: 'E-commerce', url: '/ecommerce' },
    { label: 'About', url: '/about' },
    { label: 'Blog', url: '/blog' },
    { label: 'Contact', url: '/contact' },
    { label: 'IT Training', url: '/services', highlight: true },
  ],
};

export default site;
