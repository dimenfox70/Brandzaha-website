import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase/server';

export default async function AdminProjectsPage({ searchParams }) {
  const db = supabaseAdmin();
  const { data: projects } = await db.from('projects').select('*').order('sort_order', { ascending: true });

  return (
    <div className="admin-page">
      <header className="admin-page__head">
        <div>
          <p className="admin-eyebrow">Content</p>
          <h1>Projects</h1>
          <p className="admin-page__sub">Case studies shown in the booklet portfolio and on the homepage.</p>
        </div>
        <Link href="/admin/projects/new" className="admin-btn admin-btn--primary">New project</Link>
      </header>

      {searchParams?.saved && <p className="admin-alert admin-alert--ok">Saved.</p>}
      {searchParams?.deleted && <p className="admin-alert admin-alert--ok">Deleted.</p>}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Title</th><th>Client</th><th>Year</th><th>Featured</th><th>Published</th><th /></tr></thead>
          <tbody>
            {(projects || []).map((p) => (
              <tr key={p.id}>
                <td><Link href={`/admin/projects/${p.id}`}>{p.title}</Link><div className="admin-table__meta">/{p.slug}</div></td>
                <td>{p.client}</td>
                <td>{p.year}</td>
                <td>{p.featured ? '★' : ''}</td>
                <td>{p.published ? <span className="admin-pill admin-pill--ok">Live</span> : <span className="admin-pill">Hidden</span>}</td>
                <td className="admin-table__actions"><Link href={`/admin/projects/${p.id}`} className="admin-btn admin-btn--ghost admin-btn--sm">Edit</Link></td>
              </tr>
            ))}
            {!projects?.length && <tr><td colSpan={6} className="admin-table__empty">No projects yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
