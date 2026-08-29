'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdminSession } from '@/lib/admin/session';
import { supabaseAdmin } from '@/lib/supabase/server';

const csv = (v) => String(v || '').split(',').map((s) => s.trim()).filter(Boolean);

function fromForm(formData) {
  return {
    slug: String(formData.get('slug') || '').trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-'),
    title: String(formData.get('title') || '').trim(),
    excerpt: String(formData.get('excerpt') || '').trim(),
    content: String(formData.get('content') || '').trim() || null,
    category: String(formData.get('category') || '').trim(),
    date: String(formData.get('date') || '').trim() || null,
    author: String(formData.get('author') || '').trim(),
    palette: csv(formData.get('palette')),
    published: formData.get('published') === 'on',
  };
}

export async function createPost(formData) {
  await requireAdminSession();
  const db = supabaseAdmin();
  const payload = fromForm(formData);
  if (!payload.slug || !payload.title) redirect('/admin/posts/new?error=' + encodeURIComponent('Slug and title are required.'));
  const { error } = await db.from('posts').insert(payload);
  if (error) redirect('/admin/posts/new?error=' + encodeURIComponent(error.message));
  revalidatePath('/blog');
  redirect('/admin/posts?saved=1');
}

export async function updatePost(id, formData) {
  await requireAdminSession();
  const db = supabaseAdmin();
  const payload = { ...fromForm(formData), updated_at: new Date().toISOString() };
  const { error } = await db.from('posts').update(payload).eq('id', id);
  if (error) redirect(`/admin/posts/${id}?error=` + encodeURIComponent(error.message));
  revalidatePath('/blog');
  revalidatePath(`/blog/${payload.slug}`);
  redirect('/admin/posts?saved=1');
}

export async function deletePost(id) {
  await requireAdminSession();
  const db = supabaseAdmin();
  await db.from('posts').delete().eq('id', id);
  revalidatePath('/blog');
  redirect('/admin/posts?deleted=1');
}
