'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdminSession } from '@/lib/admin/session';
import { supabaseAdmin } from '@/lib/supabase/server';

function fromForm(formData) {
  return {
    quote: String(formData.get('quote') || '').trim(),
    name: String(formData.get('name') || '').trim(),
    role: String(formData.get('role') || '').trim(),
    published: formData.get('published') === 'on',
    sort_order: Number(formData.get('sort_order')) || 0,
  };
}

export async function createTestimonial(formData) {
  await requireAdminSession();
  const db = supabaseAdmin();
  const payload = fromForm(formData);
  if (!payload.quote || !payload.name) redirect('/admin/testimonials/new?error=' + encodeURIComponent('Quote and name are required.'));
  const { error } = await db.from('testimonials').insert(payload);
  if (error) redirect('/admin/testimonials/new?error=' + encodeURIComponent(error.message));
  revalidatePath('/');
  revalidatePath('/about');
  redirect('/admin/testimonials?saved=1');
}

export async function updateTestimonial(id, formData) {
  await requireAdminSession();
  const db = supabaseAdmin();
  const payload = { ...fromForm(formData), updated_at: new Date().toISOString() };
  const { error } = await db.from('testimonials').update(payload).eq('id', id);
  if (error) redirect(`/admin/testimonials/${id}?error=` + encodeURIComponent(error.message));
  revalidatePath('/');
  revalidatePath('/about');
  redirect('/admin/testimonials?saved=1');
}

export async function deleteTestimonial(id) {
  await requireAdminSession();
  const db = supabaseAdmin();
  await db.from('testimonials').delete().eq('id', id);
  revalidatePath('/');
  revalidatePath('/about');
  redirect('/admin/testimonials?deleted=1');
}
