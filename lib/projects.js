import { supabaseAdmin } from './supabase/server';
import { projects, getProject, getNext } from './data/projects';

export { projects, getProject, getNext };

function fromRow(row) {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category || [],
    year: row.year,
    client: row.client,
    industry: row.industry,
    platform: row.platform || undefined,
    summary: row.summary,
    challenge: row.challenge,
    solution: row.solution,
    results: row.results || [],
    services: row.services || [],
    palette: row.palette || [],
    accent: row.accent,
    testimonial: row.testimonial || undefined,
    liveUrl: row.live_url,
    featured: row.featured,
  };
}

// Server-only: CMS-backed reads, falling back to the defaults in lib/data/projects.js.
export async function getProjects() {
  const db = supabaseAdmin();
  if (!db) return projects;
  const { data, error } = await db
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true });
  if (error || !data || !data.length) return projects;
  return data.map(fromRow);
}

export async function getProjectBySlug(slug) {
  const list = await getProjects();
  return list.find((p) => p.slug === slug);
}

export async function getNextProject(slug, list) {
  const all = list || (await getProjects());
  const i = all.findIndex((p) => p.slug === slug);
  return all[(i + 1) % all.length];
}

export default projects;
