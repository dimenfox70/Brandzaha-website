'use client';
import { usePathname } from 'next/navigation';
import SmoothScroll from './SmoothScroll';
import Cursor from './Cursor';
import Preloader from './Preloader';
import Header from './Header';
import Chatbot from './Chatbot';

// The CMS admin panel lives under the same Next.js app (so it can share the
// Supabase-backed lib/*.js helpers) but shouldn't get the marketing site's
// custom cursor, smooth-scroll, preloader or floating chatbot.
// `footer` is passed in already-rendered from the (server) root layout since
// it's an async Server Component and can't be imported into a Client Component.
export default function SiteChrome({ site, footer, children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Preloader />
      <SmoothScroll />
      <Cursor />
      <Header site={site} />
      {children}
      {footer}
      <Chatbot />
    </>
  );
}
