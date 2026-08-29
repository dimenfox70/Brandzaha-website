import Link from 'next/link';
import '../admin.css';
import { requireAdminSession } from '@/lib/admin/session';
import { logout } from '../login/actions';

const NAV = [
  { href: '/admin', label: 'Dashboard', exact: true },
  { href: '/admin/leads', label: 'Leads' },
  { href: '/admin/site', label: 'Site settings' },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/services', label: 'Services' },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/testimonials', label: 'Testimonials' },
  { href: '/admin/posts', label: 'Blog posts' },
];

export const metadata = { title: 'Admin', robots: { index: false, follow: false } };

export default async function AdminDashboardLayout({ children }) {
  const session = await requireAdminSession();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <span className="admin-sidebar__mark">B</span>
          <div>
            <strong>BrandZaha</strong>
            <span>CMS admin</span>
          </div>
        </div>
        <nav className="admin-nav">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="admin-nav__link">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="admin-sidebar__footer">
          <Link href="/" className="admin-nav__link admin-nav__link--muted" target="_blank">View site ↗</Link>
          <p className="admin-sidebar__email">{session.email}</p>
          <form action={logout}>
            <button type="submit" className="admin-btn admin-btn--ghost" style={{ width: '100%' }}>Log out</button>
          </form>
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
