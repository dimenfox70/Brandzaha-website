import { supabaseAdmin } from './supabase/server';

// BrandZaha — testimonials. Defaults used until the CMS `testimonials` table has content.
export const testimonials = [
  { quote: 'BrandZaha rebuilt how customers feel about our brand. Sales followed within weeks.', name: 'Rohit Agarwal', role: 'Founder, Zenith Home' },
  { quote: 'For the first time our donors can see their impact. They gave our mission a home online.', name: 'Meena Sharma', role: 'Director, FPF Foundation' },
  { quote: 'We looked like the biggest name in the market on launch day. That confidence closed deals.', name: 'Sunil Yadav', role: 'Co-founder, Property Bapu' },
  { quote: 'The most detail-obsessed team we’ve worked with. Every pixel and every millisecond mattered.', name: 'Priya Nair', role: 'Marketing Head, Aurum Retail' },
];

function fromRow(row) {
  return { quote: row.quote, name: row.name, role: row.role };
}

export async function getTestimonials() {
  const db = supabaseAdmin();
  if (!db) return testimonials;
  const { data, error } = await db.from('testimonials').select('*').eq('published', true).order('sort_order', { ascending: true });
  if (error || !data || !data.length) return testimonials;
  return data.map(fromRow);
}

export default testimonials;
