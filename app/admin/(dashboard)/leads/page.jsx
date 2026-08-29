import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase/server';

const STATUSES = ['new', 'contacted', 'qualified', 'won', 'lost'];

const fmt = (d) => new Date(d).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

export default async function AdminLeadsPage({ searchParams }) {
  const status = searchParams?.status || '';
  const db = supabaseAdmin();
  let query = db.from('leads').select('*').order('created_at', { ascending: false });
  if (status) query = query.eq('status', status);
  const { data: leads } = await query;

  return (
    <div className="admin-page">
      <header className="admin-page__head">
        <div>
          <p className="admin-eyebrow">Lead capture</p>
          <h1>Leads</h1>
          <p className="admin-page__sub">Every submission from the website&rsquo;s contact forms lands here automatically.</p>
        </div>
        <a href={`/admin/leads/export${status ? `?status=${status}` : ''}`} className="admin-btn admin-btn--ghost">Export CSV</a>
      </header>

      {searchParams?.saved && <p className="admin-alert admin-alert--ok">Saved.</p>}
      {searchParams?.deleted && <p className="admin-alert admin-alert--ok">Deleted.</p>}

      <form method="get" className="admin-filter-bar">
        <label className="admin-field">
          <span>Filter by status</span>
          <select name="status" defaultValue={status}>
            <option value="">All</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        <button type="submit" className="admin-btn admin-btn--ghost admin-btn--sm">Apply</button>
      </form>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>When</th><th>Name</th><th>Contact</th><th>Source</th><th>Status</th><th /></tr></thead>
          <tbody>
            {(leads || []).map((l) => (
              <tr key={l.id}>
                <td className="admin-table__nowrap">{fmt(l.created_at)}</td>
                <td><Link href={`/admin/leads/${l.id}`}>{l.name}</Link><div className="admin-table__meta">{l.message?.slice(0, 50)}{l.message?.length > 50 ? '…' : ''}</div></td>
                <td><div>{l.email}</div><div className="admin-table__meta">{l.phone}</div></td>
                <td>{l.form_name}</td>
                <td><span className={`admin-pill admin-pill--status-${l.status}`}>{l.status}</span></td>
                <td className="admin-table__actions"><Link href={`/admin/leads/${l.id}`} className="admin-btn admin-btn--ghost admin-btn--sm">Open</Link></td>
              </tr>
            ))}
            {!leads?.length && <tr><td colSpan={6} className="admin-table__empty">No leads yet — they&rsquo;ll show up here as soon as someone submits a form.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
