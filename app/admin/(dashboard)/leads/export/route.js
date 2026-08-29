import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin/session';
import { supabaseAdmin } from '@/lib/supabase/server';

export const runtime = 'nodejs';

const COLUMNS = ['created_at', 'name', 'email', 'phone', 'form_name', 'page_url', 'project_type', 'budget', 'timeline', 'service', 'platform', 'duration', 'status', 'notes', 'message'];

function csvEscape(v) {
  const s = v === null || v === undefined ? '' : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export async function GET(req) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = supabaseAdmin();
  const status = req.nextUrl.searchParams.get('status');
  let query = db.from('leads').select('*').order('created_at', { ascending: false });
  if (status) query = query.eq('status', status);
  const { data: leads, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const rows = [COLUMNS.join(',')];
  for (const l of leads || []) rows.push(COLUMNS.map((c) => csvEscape(l[c])).join(','));

  return new NextResponse(rows.join('\n'), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="leads-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
