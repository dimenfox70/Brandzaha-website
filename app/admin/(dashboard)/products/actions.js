'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdminSession } from '@/lib/admin/session';
import { supabaseAdmin } from '@/lib/supabase/server';

const csv = (v) => String(v || '').split(',').map((s) => s.trim()).filter(Boolean);

function fromForm(formData) {
  return {
    name: String(formData.get('name') || '').trim(),
    tag: String(formData.get('tag') || '').trim(),
    icon: String(formData.get('icon') || '').trim() || null,
    blurb: String(formData.get('blurb') || '').trim(),
    stack: csv(formData.get('stack')),
    metric: String(formData.get('metric') || '').trim(),
    accent: String(formData.get('accent') || '').trim() || null,
    palette: csv(formData.get('palette')),
    published: formData.get('published') === 'on',
    sort_order: Number(formData.get('sort_order')) || 0,
  };
}

export async function createProduct(formData) {
  await requireAdminSession();
  const db = supabaseAdmin();
  const payload = fromForm(formData);
  if (!payload.name) redirect('/admin/products/new?error=' + encodeURIComponent('Name is required.'));
  const { error } = await db.from('products').insert(payload);
  if (error) redirect('/admin/products/new?error=' + encodeURIComponent(error.message));
  revalidatePath('/');
  revalidatePath('/work');
  redirect('/admin/products?saved=1');
}

export async function updateProduct(id, formData) {
  await requireAdminSession();
  const db = supabaseAdmin();
  const payload = { ...fromForm(formData), updated_at: new Date().toISOString() };
  const { error } = await db.from('products').update(payload).eq('id', id);
  if (error) redirect(`/admin/products/${id}?error=` + encodeURIComponent(error.message));
  revalidatePath('/');
  revalidatePath('/work');
  redirect('/admin/products?saved=1');
}

export async function deleteProduct(id) {
  await requireAdminSession();
  const db = supabaseAdmin();
  await db.from('products').delete().eq('id', id);
  revalidatePath('/');
  revalidatePath('/work');
  redirect('/admin/products?deleted=1');
}
