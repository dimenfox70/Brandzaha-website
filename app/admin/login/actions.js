'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/server';
import { verifyPassword } from '@/lib/auth/password';
import { createSessionToken, SESSION_COOKIE, sessionCookieOptions } from '@/lib/auth/session';

export async function login(formData) {
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const password = String(formData.get('password') || '');
  const next = String(formData.get('next') || '/admin');

  const fail = () => redirect(`/admin/login?error=1&next=${encodeURIComponent(next)}`);

  if (!email || !password) fail();

  const db = supabaseAdmin();
  if (!db) fail();

  const { data: user, error } = await db.from('admin_users').select('*').eq('email', email).maybeSingle();
  if (error || !user || !verifyPassword(password, user.password_hash)) fail();

  const token = await createSessionToken({ email: user.email });
  cookies().set(SESSION_COOKIE, token, sessionCookieOptions);
  redirect(next.startsWith('/admin') ? next : '/admin');
}

export async function logout() {
  cookies().delete(SESSION_COOKIE);
  redirect('/admin/login');
}
