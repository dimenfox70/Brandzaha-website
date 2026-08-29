import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase/server';

async function count(table, filter) {
  const db = supabaseAdmin();
  if (!db) return 0;
  let q = db.from(table).select('*', { count: 'exact', head: true });
  if (filter) q = filter(q);
  const { count: n } = await q;
  return n || 0;
}

export default async function AdminHomePage() {
  const [leads, newLeads, projects, services, products, testimonials, posts] = await Promise.all([
    count('leads'),
    count('leads', (q) => q.eq('status', 'new')),
    count('projects'),
    count('services'),
    count('products'),
    count('testimonials'),
    count('posts'),
  ]);

  const cards = [
    { label: 'New leads', value: newLeads, href: '/admin/leads', highlight: true },
    { label: 'Total leads', value: leads, href: '/admin/leads' },
    { label: 'Projects', value: projects, href: '/admin/projects' },
    { label: 'Services', value: services, href: '/admin/services' },
    { label: 'Products', value: products, href: '/admin/products' },
    { label: 'Testimonials', value: testimonials, href: '/admin/testimonials' },
    { label: 'Blog posts', value: posts, href: '/admin/posts' },
  ];

  return (
    <div className="admin-page">
      <header className="admin-page__head">
        <div>
          <p className="admin-eyebrow">Overview</p>
          <h1>Dashboard</h1>
        </div>
      </header>

      <div className="admin-grid-cards">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className={`admin-card ${c.highlight && c.value > 0 ? 'admin-card--highlight' : ''}`}>
            <span className="admin-card__value">{c.value}</span>
            <span className="admin-card__label">{c.label}</span>
          </Link>
        ))}
      </div>

      <section className="admin-panel">
        <h2>Quick tips</h2>
        <ul className="admin-list-plain">
          <li>Edits to content take effect on the live site within a minute (or instantly for most pages).</li>
          <li>New leads submitted through the website contact forms show up in <Link href="/admin/leads">Leads</Link> automatically.</li>
          <li>Unpublish an item instead of deleting it if you just want to hide it from the site temporarily.</li>
        </ul>
      </section>
    </div>
  );
}
