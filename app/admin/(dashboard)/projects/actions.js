'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdminSession } from '@/lib/admin/session';
import { supabaseAdmin } from '@/lib/supabase/server';

const csv = (v) => String(v || '').split(',').map((s) => s.trim()).filter(Boolean);

function parseJsonField(formData, key, fallback) {
  const raw = formData.get(key);
  if (!raw || !String(raw).trim()) return fallback;
  return JSON.parse(raw);
}

function fromForm(formData) {
  return {
    slug: String(formData.get('slug') || '').trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-'),
    title: String(formData.get('title') || '').trim(),
    category: csv(formData.get('category')),
    year: Number(formData.get('year')) || null,
    client: String(formData.get('client') || '').trim(),
    industry: String(formData.get('industry') || '').trim(),
    platform: String(formData.get('platform') || '').trim() || null,
    summary: String(formData.get('summary') || '').trim(),
    challenge: String(formData.get('challenge') || '').trim(),
    solution: String(formData.get('solution') || '').trim(),
    services: csv(formData.get('services')),
    palette: csv(formData.get('palette')),
    accent: String(formData.get('accent') || '').trim() || null,
    live_url: String(formData.get('live_url') || '').trim() || null,
    featured: formData.get('featured') === 'on',
    published: formData.get('published') === 'on',
    sort_order: Number(formData.get('sort_order')) || 0,
  };
}

export async function createProject(formData) {
  await requireAdminSession();
  const db = supabaseAdmin();
  const payload = fromForm(formData);
  try {
    payload.results = parseJsonField(formData, 'results', []);
    payload.testimonial = parseJsonField(formData, 'testimonial', null);
  } catch {
    redirect('/admin/projects/new?error=' + encodeURIComponent('Results / testimonial must be valid JSON.'));
  }
  if (!payload.slug || !payload.title) redirect('/admin/projects/new?error=' + encodeURIComponent('Slug and title are required.'));

  const { error } = await db.from('projects').insert(payload);
  if (error) redirect('/admin/projects/new?error=' + encodeURIComponent(error.message));

  revalidatePath('/work');
  revalidatePath('/');
  redirect('/admin/projects?saved=1');
}

export async function updateProject(id, formData) {
  await requireAdminSession();
  const db = supabaseAdmin();
  const payload = fromForm(formData);
  try {
    payload.results = parseJsonField(formData, 'results', []);
    payload.testimonial = parseJsonField(formData, 'testimonial', null);
  } catch {
    redirect(`/admin/projects/${id}?error=` + encodeURIComponent('Results / testimonial must be valid JSON.'));
  }
  payload.updated_at = new Date().toISOString();

  const { error } = await db.from('projects').update(payload).eq('id', id);
  if (error) redirect(`/admin/projects/${id}?error=` + encodeURIComponent(error.message));

  revalidatePath('/work');
  revalidatePath(`/work/${payload.slug}`);
  revalidatePath('/');
  revalidatePath('/ecommerce');
  redirect('/admin/projects?saved=1');
}

export async function deleteProject(id) {
  await requireAdminSession();
  const db = supabaseAdmin();
  await db.from('projects').delete().eq('id', id);
  revalidatePath('/work');
  revalidatePath('/');
  redirect('/admin/projects?deleted=1');
}
