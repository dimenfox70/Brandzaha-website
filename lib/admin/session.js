import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth/session';

// Defense in depth alongside middleware.js — verifies the session again
// inside server actions/pages so they're never reachable without it.
export async function requireAdminSession() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);
  if (!session) redirect('/admin/login');
  return session;
}

export async function getAdminSession() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}
