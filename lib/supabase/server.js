import { createClient } from '@supabase/supabase-js';

// Server-only client using the service-role key — bypasses RLS.
// Never import this from a 'use client' component or expose the key to the browser.
let cached;
export function supabaseAdmin() {
  if (cached) return cached;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  cached = createClient(url, key, { auth: { persistSession: false } });
  return cached;
}
