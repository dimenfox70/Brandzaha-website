import { supabaseAdmin } from './supabase/server';

// BrandZaha — services. Defaults used until the CMS `services` table has content.
export const services = [
  { title: 'Web Development', icon: 'code', tagline: 'Fast, bespoke websites & apps', summary: 'React/Next.js sites built for speed, SEO and conversion.', points: ['Next.js & React', 'Web apps', 'E-commerce', 'Core Web Vitals'] },
  { title: 'E-commerce Stores', icon: 'cart', tagline: 'Stores that convert', summary: 'Shopify, WooCommerce, or custom headless — built to sell.', points: ['Shopify & Shopify Plus', 'WooCommerce', 'Headless Next.js', 'Payments & migration'], href: '/ecommerce' },
  { title: 'Digital Marketing', icon: 'megaphone', tagline: 'Growth that compounds', summary: 'SEO, paid ads and lifecycle marketing that turns attention into revenue.', points: ['SEO', 'Google & Meta Ads', 'Email & CRM', 'Analytics & CRO'] },
  { title: 'Graphic Design', icon: 'palette', tagline: 'Visual identity with intent', summary: 'Identities, campaigns and collateral that make you unmistakable.', points: ['Logo & identity', 'Brand guidelines', 'Social creative', 'Print & packaging'] },
  { title: 'Mobile App Development', icon: 'device', tagline: 'Apps people keep', summary: 'Native-feel iOS & Android apps designed around real user journeys.', points: ['iOS & Android', 'UX prototyping', 'API integration', 'App Store launch'] },
  { title: 'AI & Automation', icon: 'spark', tagline: 'Chatbots, agents & workflows', summary: 'Chatbots, voice agents and automations that cut busywork.', points: ['AI chatbots', 'Voice agents', 'Workflow automation', 'LLM integration'] },
  { title: 'Cyber Security', icon: 'shield', tagline: 'Protect what you build', summary: 'Audits, hardening and monitoring to keep platforms and data safe.', points: ['Security audits', 'Penetration testing', 'Hardening', 'Monitoring'] },
  { title: 'Software Development', icon: 'grid', tagline: 'ERP · CRM · HRM', summary: 'Custom ERP, CRM and HRM tailored to how you actually operate.', points: ['ERP systems', 'CRM platforms', 'HRM & payroll', 'Automation'] },
];

function fromRow(row) {
  return { title: row.title, icon: row.icon, tagline: row.tagline, summary: row.summary, points: row.points || [], href: row.href || undefined };
}

export async function getServices() {
  const db = supabaseAdmin();
  if (!db) return services;
  const { data, error } = await db.from('services').select('*').eq('published', true).order('sort_order', { ascending: true });
  if (error || !data || !data.length) return services;
  return data.map(fromRow);
}

export default services;
