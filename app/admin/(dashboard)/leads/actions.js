'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdminSession } from '@/lib/admin/session';
import { supabaseAdmin } from '@/lib/supabase/server';

const STATUSES = ['new', 'contacted', 'qualified', 'won', 'lost'];

export async function updateLead(id, formData) {
  await requireAdminSession();
  const db = supabaseAdmin();
  const status = String(formData.get('status') || 'new');
  const notes = String(formData.get('notes') || '');
  const payload = { notes };
  if (STATUSES.includes(status)) payload.status = status;

  const { error } = await db.from('leads').update(payload).eq('id', id);
  if (error) redirect(`/admin/leads/${id}?error=` + encodeURIComponent(error.message));

  revalidatePath('/admin/leads');
  revalidatePath('/admin');
  redirect('/admin/leads?saved=1');
}

export async function deleteLead(id) {
  await requireAdminSession();
  const db = supabaseAdmin();
  await db.from('leads').delete().eq('id', id);
  revalidatePath('/admin/leads');
  revalidatePath('/admin');
  redirect('/admin/leads?deleted=1');
}
