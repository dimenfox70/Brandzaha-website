'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdminSession } from '@/lib/admin/session';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function saveSiteSettings(formData) {
  await requireAdminSession();
  const db = supabaseAdmin();

  let nav;
  try {
    nav = JSON.parse(formData.get('nav') || '[]');
  } catch {
    redirect('/admin/site?error=' + encodeURIComponent('Nav must be valid JSON.'));
  }

  const payload = {
    id: 1,
    name: String(formData.get('name') || '').trim(),
    tagline: String(formData.get('tagline') || '').trim(),
    domain: String(formData.get('domain') || '').trim(),
    founded: Number(formData.get('founded')) || null,
    accent: String(formData.get('accent') || '#d8ff36').trim(),
    contact: {
      address: String(formData.get('address') || '').trim(),
      city: String(formData.get('city') || '').trim(),
      region: String(formData.get('region') || '').trim(),
      postal: String(formData.get('postal') || '').trim(),
      country: String(formData.get('country') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      phoneRaw: String(formData.get('phoneRaw') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      hours: String(formData.get('hours') || '').trim(),
      maps: String(formData.get('maps') || '').trim(),
    },
    social: {
      Instagram: String(formData.get('social_instagram') || '').trim(),
      LinkedIn: String(formData.get('social_linkedin') || '').trim(),
      Facebook: String(formData.get('social_facebook') || '').trim(),
    },
    analytics: {
      gtm: String(formData.get('gtm') || '').trim(),
      ga4: String(formData.get('ga4') || '').trim(),
    },
    nav,
    updated_at: new Date().toISOString(),
  };

  const { error } = await db.from('site_settings').upsert(payload);
  if (error) redirect('/admin/site?error=' + encodeURIComponent(error.message));

  revalidatePath('/', 'layout');
  redirect('/admin/site?saved=1');
}
