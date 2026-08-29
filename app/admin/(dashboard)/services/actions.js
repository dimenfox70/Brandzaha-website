'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdminSession } from '@/lib/admin/session';
import { supabaseAdmin } from '@/lib/supabase/server';

const csv = (v) => String(v || '').split(',').map((s) => s.trim()).filter(Boolean);

function fromForm(formData) {
  return {
    title: String(formData.get('title') || '').trim(),
    icon: String(formData.get('icon') || '').trim() || null,
    tagline: String(formData.get('tagline') || '').trim(),
    summary: String(formData.get('summary') || '').trim(),
    points: csv(formData.get('points')),
    href: String(formData.get('href') || '').trim() || null,
    published: formData.get('published') === 'on',
    sort_order: Number(formData.get('sort_order')) || 0,
  };
}

export async function createService(formData) {
  await requireAdminSession();
  const db = supabaseAdmin();
  const payload = fromForm(formData);
  if (!payload.title) redirect('/admin/services/new?error=' + encodeURIComponent('Title is required.'));
  const { error } = await db.from('services').insert(payload);
  if (error) redirect('/admin/services/new?error=' + encodeURIComponent(error.message));
  revalidatePath('/services');
  revalidatePath('/');
  redirect('/admin/services?saved=1');
}

export async function updateService(id, formData) {
  await requireAdminSession();
  const db = supabaseAdmin();
  const payload = { ...fromForm(formData), updated_at: new Date().toISOString() };
  const { error } = await db.from('services').update(payload).eq('id', id);
  if (error) redirect(`/admin/services/${id}?error=` + encodeURIComponent(error.message));
  revalidatePath('/services');
  revalidatePath('/');
  redirect('/admin/services?saved=1');
}

export async function deleteService(id) {
  await requireAdminSession();
  const db = supabaseAdmin();
  await db.from('services').delete().eq('id', id);
  revalidatePath('/services');
  revalidatePath('/');
  redirect('/admin/services?deleted=1');
}
