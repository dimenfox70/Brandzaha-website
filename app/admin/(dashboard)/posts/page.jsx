import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase/server';

export default async function AdminPostsPage({ searchParams }) {
  const db = supabaseAdmin();
  const { data: posts } = await db.from('posts').select('*').order('date', { ascending: false });

  return (
    <div className="admin-page">
      <header className="admin-page__head">
        <div><p className="admin-eyebrow">Content</p><h1>Blog posts</h1></div>
        <Link href="/admin/posts/new" className="admin-btn admin-btn--primary">New post</Link>
      </header>

      {searchParams?.saved && <p className="admin-alert admin-alert--ok">Saved.</p>}
      {searchParams?.deleted && <p className="admin-alert admin-alert--ok">Deleted.</p>}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Title</th><th>Category</th><th>Date</th><th>Published</th><th /></tr></thead>
          <tbody>
            {(posts || []).map((p) => (
              <tr key={p.id}>
                <td><Link href={`/admin/posts/${p.id}`}>{p.title}</Link><div className="admin-table__meta">/{p.slug}</div></td>
                <td>{p.category}</td>
                <td>{p.date}</td>
                <td>{p.published ? <span className="admin-pill admin-pill--ok">Live</span> : <span className="admin-pill">Hidden</span>}</td>
                <td className="admin-table__actions"><Link href={`/admin/posts/${p.id}`} className="admin-btn admin-btn--ghost admin-btn--sm">Edit</Link></td>
              </tr>
            ))}
            {!posts?.length && <tr><td colSpan={5} className="admin-table__empty">No posts yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
