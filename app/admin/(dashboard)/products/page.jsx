import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase/server';

export default async function AdminProductsPage({ searchParams }) {
  const db = supabaseAdmin();
  const { data: products } = await db.from('products').select('*').order('sort_order', { ascending: true });

  return (
    <div className="admin-page">
      <header className="admin-page__head">
        <div><p className="admin-eyebrow">Content</p><h1>Products</h1><p className="admin-page__sub">Your own ready-to-launch IP shown on Home and Work.</p></div>
        <Link href="/admin/products/new" className="admin-btn admin-btn--primary">New product</Link>
      </header>

      {searchParams?.saved && <p className="admin-alert admin-alert--ok">Saved.</p>}
      {searchParams?.deleted && <p className="admin-alert admin-alert--ok">Deleted.</p>}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Tag</th><th>Published</th><th /></tr></thead>
          <tbody>
            {(products || []).map((p) => (
              <tr key={p.id}>
                <td><Link href={`/admin/products/${p.id}`}>{p.name}</Link></td>
                <td>{p.tag}</td>
                <td>{p.published ? <span className="admin-pill admin-pill--ok">Live</span> : <span className="admin-pill">Hidden</span>}</td>
                <td className="admin-table__actions"><Link href={`/admin/products/${p.id}`} className="admin-btn admin-btn--ghost admin-btn--sm">Edit</Link></td>
              </tr>
            ))}
            {!products?.length && <tr><td colSpan={4} className="admin-table__empty">No products yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
