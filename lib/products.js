import { supabaseAdmin } from './supabase/server';

// BrandZaha — ready-to-launch tech products (own IP). Defaults used until the
// CMS `products` table has content.
export const products = [
  {
    name: 'ZahaCommerce',
    tag: 'Headless store starter',
    icon: 'cart',
    blurb: 'A production-ready Next.js headless commerce starter — storefront, cart, checkout and CMS wired up. Launch a premium store in days, not months.',
    stack: ['Next.js', 'Headless', 'Stripe/Razorpay'],
    metric: '2 weeks to live',
    accent: '#5cffce',
    palette: ['#08110e', '#0f2f28', '#5cffce'],
  },
  {
    name: 'ZahaCRM',
    tag: 'Sales & customer platform',
    icon: 'grid',
    blurb: 'A lightweight CRM for growing teams — leads, pipeline, tasks and reporting, tailored to your process and self-hosted or cloud.',
    stack: ['Next.js', 'Postgres', 'Role-based'],
    metric: 'Deploy in 1 week',
    accent: '#d8ff36',
    palette: ['#0e100c', '#232b16', '#d8ff36'],
  },
  {
    name: 'ZahaBot',
    tag: 'AI chat + voice agent',
    icon: 'spark',
    blurb: 'A drop-in AI assistant for your site — chat and voice, trained on your content, that answers questions and captures leads 24/7.',
    stack: ['LLM', 'RAG', 'Voice'],
    metric: 'Live on any site',
    accent: '#8ad7ff',
    palette: ['#0a0f14', '#12303f', '#8ad7ff'],
  },
  {
    name: 'ZahaLearn',
    tag: 'Training & LMS',
    icon: 'pen',
    blurb: 'A ready LMS powering our IT Training — courses, cohorts, assignments and certificates. White-label it for your own academy.',
    stack: ['Next.js', 'Payments', 'Certificates'],
    metric: 'Powers 500+ learners',
    accent: '#ffb35c',
    palette: ['#120d08', '#3a2410', '#ffb35c'],
  },
  {
    name: 'ZahaEstate',
    tag: 'Real-estate portal',
    icon: 'device',
    blurb: 'A fast listings portal with map search, saved properties and lead routing — the engine behind Property Bapu, ready to rebrand.',
    stack: ['Next.js', 'Maps', 'Lead engine'],
    metric: '9.7k listings tested',
    accent: '#c79bff',
    palette: ['#0f1114', '#241a2c', '#c79bff'],
  },
  {
    name: 'ZahaDine',
    tag: 'Restaurant ordering',
    icon: 'bag',
    blurb: 'QR-menu, online ordering and table management for restaurants and cafés — mobile-first and payment-ready out of the box.',
    stack: ['Next.js', 'QR menu', 'Payments'],
    metric: 'Order in 3 taps',
    accent: '#ff7a4d',
    palette: ['#140a06', '#3a170c', '#ff7a4d'],
  },
];

function fromRow(row) {
  return { name: row.name, tag: row.tag, icon: row.icon, blurb: row.blurb, stack: row.stack || [], metric: row.metric, accent: row.accent, palette: row.palette || [] };
}

export async function getProducts() {
  const db = supabaseAdmin();
  if (!db) return products;
  const { data, error } = await db.from('products').select('*').eq('published', true).order('sort_order', { ascending: true });
  if (error || !data || !data.length) return products;
  return data.map(fromRow);
}

export default products;
