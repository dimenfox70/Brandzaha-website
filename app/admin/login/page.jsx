import '../admin.css';
import { login } from './actions';

export const metadata = { title: 'Admin login', robots: { index: false, follow: false } };

export default function AdminLoginPage({ searchParams }) {
  const error = searchParams?.error;
  const next = searchParams?.next || '/admin';

  return (
    <div className="admin-auth">
      <form className="admin-auth__card" action={login}>
        <p className="admin-eyebrow">BrandZaha</p>
        <h1 className="admin-auth__title">CMS admin</h1>
        <p className="admin-auth__sub">Sign in to manage site content and leads.</p>

        <input type="hidden" name="next" value={next} />

        <label className="admin-field">
          <span>Email</span>
          <input type="email" name="email" required autoComplete="username" autoFocus />
        </label>
        <label className="admin-field">
          <span>Password</span>
          <input type="password" name="password" required autoComplete="current-password" />
        </label>

        {error && <p className="admin-alert admin-alert--error">Invalid email or password.</p>}

        <button type="submit" className="admin-btn admin-btn--primary" style={{ width: '100%' }}>Sign in</button>
      </form>
    </div>
  );
}
