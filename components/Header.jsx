'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { site as defaultSite } from '@/lib/data/site';
import Magnetic from './Magnetic';

export default function Header({ site: siteProp }) {
  const site = siteProp || defaultSite;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.classList.toggle('nav-open', open);
    if (window.__lenis) open ? window.__lenis.stop() : window.__lenis.start();
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="wrap site-header__inner">
          <Link href="/" className="brand" aria-label="BrandZaha home">
            <span className="brand__mark">B</span><span>Brand<em>Zaha</em></span>
          </Link>
          <div className="header-actions">
            <Magnetic className="header-cta-wrap">
              <Link href="/contact" className="btn header-cta"><span className="btn__label">Start a project</span><span className="btn__arrow" aria-hidden="true">↗</span></Link>
            </Magnetic>
            <button className="menu-toggle" aria-expanded={open} aria-controls="nav-overlay" onClick={() => setOpen((v) => !v)}>
              <span>Menu</span>
              <span className="menu-toggle__bars" aria-hidden="true"><span /><span /></span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="nav-overlay" className="nav-overlay" aria-label="Primary"
            initial={{ clipPath: 'circle(0% at calc(100% - 3rem) 3rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 3rem) 3rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 3rem) 3rem)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ pointerEvents: 'all' }}
          >
            <div className="wrap nav-overlay__grid">
              <ul className="nav-menu">
                {site.nav.map((item, i) => (
                  <li key={item.label} className={item.highlight ? 'is-highlight' : ''} style={{ overflow: 'hidden' }}>
                    <motion.span style={{ display: 'inline-block' }}
                      initial={{ y: '120%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '120%', opacity: 0 }}
                      transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}>
                      <Link href={item.url}><small>{String(i + 1).padStart(2, '0')}</small>{item.label}</Link>
                    </motion.span>
                  </li>
                ))}
              </ul>
              <aside className="nav-aside">
                <div>
                  <h4>Get in touch</h4>
                  <a href={`mailto:${site.contact.email}`} className="tlink">{site.contact.email}</a><br />
                  <a href={`tel:${site.contact.phone}`} className="tlink">{site.contact.phone}</a>
                </div>
                <div><h4>Studio</h4><p className="muted">{site.contact.address}</p></div>
                <div><h4>Follow</h4><div className="nav-socials">{Object.entries(site.social).map(([n, u]) => <a key={n} href={u} className="tlink" target="_blank" rel="noopener noreferrer">{n}</a>)}</div></div>
              </aside>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
