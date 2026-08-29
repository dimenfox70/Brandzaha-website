import { supabaseAdmin } from './supabase/server';
import { site } from './data/site';

export { site };

function fromRow(row) {
  if (!row) return site;
  return {
    name: row.name || site.name,
    tagline: row.tagline || site.tagline,
    domain: row.domain || site.domain,
    founded: row.founded || site.founded,
    contact: { ...site.contact, ...(row.contact || {}) },
    social: { ...site.social, ...(row.social || {}) },
    analytics: { ...site.analytics, ...(row.analytics || {}) },
    accent: row.accent || site.accent,
    nav: Array.isArray(row.nav) && row.nav.length ? row.nav : site.nav,
  };
}

// Server-only: reads the live CMS settings, falling back to the defaults in lib/data/site.js.
export async function getSite() {
  const db = supabaseAdmin();
  if (!db) return site;
  const { data, error } = await db.from('site_settings').select('*').eq('id', 1).maybeSingle();
  if (error || !data) return site;
  return fromRow(data);
}

export default site;
