import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase/server';

export default async function AdminServicesPage({ searchParams }) {
  const db = supabaseAdmin();
  const { data: services } = await db.from('services').select('*').order('sort_order', { ascending: true });

  return (
    <div className="admin-page">
      <header className="admin-page__head">
        <div>
          <p className="admin-eyebrow">Content</p>
          <h1>Services</h1>
        </div>
        <Link href="/admin/services/new" className="admin-btn admin-btn--primary">New service</Link>
      </header>

      {searchParams?.saved && <p className="admin-alert admin-alert--ok">Saved.</p>}
      {searchParams?.deleted && <p className="admin-alert admin-alert--ok">Deleted.</p>}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Title</th><th>Tagline</th><th>Published</th><th /></tr></thead>
          <tbody>
            {(services || []).map((s) => (
              <tr key={s.id}>
                <td><Link href={`/admin/services/${s.id}`}>{s.title}</Link></td>
                <td>{s.tagline}</td>
                <td>{s.published ? <span className="admin-pill admin-pill--ok">Live</span> : <span className="admin-pill">Hidden</span>}</td>
                <td className="admin-table__actions"><Link href={`/admin/services/${s.id}`} className="admin-btn admin-btn--ghost admin-btn--sm">Edit</Link></td>
              </tr>
            ))}
            {!services?.length && <tr><td colSpan={4} className="admin-table__empty">No services yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
