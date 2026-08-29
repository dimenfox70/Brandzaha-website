import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase/server';

export default async function AdminTestimonialsPage({ searchParams }) {
  const db = supabaseAdmin();
  const { data: testimonials } = await db.from('testimonials').select('*').order('sort_order', { ascending: true });

  return (
    <div className="admin-page">
      <header className="admin-page__head">
        <div><p className="admin-eyebrow">Content</p><h1>Testimonials</h1></div>
        <Link href="/admin/testimonials/new" className="admin-btn admin-btn--primary">New testimonial</Link>
      </header>

      {searchParams?.saved && <p className="admin-alert admin-alert--ok">Saved.</p>}
      {searchParams?.deleted && <p className="admin-alert admin-alert--ok">Deleted.</p>}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Quote</th><th>Name</th><th>Published</th><th /></tr></thead>
          <tbody>
            {(testimonials || []).map((t) => (
              <tr key={t.id}>
                <td><Link href={`/admin/testimonials/${t.id}`}>{t.quote.slice(0, 60)}{t.quote.length > 60 ? '…' : ''}</Link></td>
                <td>{t.name}</td>
                <td>{t.published ? <span className="admin-pill admin-pill--ok">Live</span> : <span className="admin-pill">Hidden</span>}</td>
                <td className="admin-table__actions"><Link href={`/admin/testimonials/${t.id}`} className="admin-btn admin-btn--ghost admin-btn--sm">Edit</Link></td>
              </tr>
            ))}
            {!testimonials?.length && <tr><td colSpan={4} className="admin-table__empty">No testimonials yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
