import Link from 'next/link';
import { getSite } from '@/lib/site';
import { getServices } from '@/lib/services';
import Reveal from './Reveal';

export default async function Footer() {
  const [site, services] = await Promise.all([getSite(), getServices()]);
  return (
    <footer className="site-footer">
      <div className="wrap">
        <p className="eyebrow">Let’s build something</p>
        <Reveal as="h2" className="footer-cta" delay={0.05}>
          <Link href="/contact" data-cursor="Say hi">Start a<br />project <span aria-hidden="true">↗</span></Link>
        </Reveal>

        <div className="footer-grid">
          <div className="footer-col">
            <Link href="/" className="brand"><span className="brand__mark">B</span><span>Brand<em>Zaha</em></span></Link>
            <p className="muted mt-1" style={{ maxWidth: '34ch' }}>{site.tagline} based in Jaipur, crafting digital experiences that perform since {site.founded}.</p>
          </div>
          <div className="footer-col">
            <h4>Sitemap</h4>
            <ul>{site.nav.slice(0, 7).map((i) => <li key={i.label}><Link href={i.url} className="tlink">{i.label}</Link></li>)}</ul>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul>{services.slice(0, 6).map((s) => <li key={s.title}><Link href={s.href || '/services'} className="tlink">{s.title}</Link></li>)}</ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href={`mailto:${site.contact.email}`} className="tlink">{site.contact.email}</a></li>
              <li><a href={`tel:${site.contact.phone}`} className="tlink">{site.contact.phone}</a></li>
              <li className="muted">{site.contact.hours}</li>
              <li className="muted" style={{ maxWidth: '30ch' }}>{site.contact.address}</li>
            </ul>
            <div className="nav-socials mt-2">{Object.entries(site.social).map(([n, u]) => <a key={n} href={u} className="tlink" target="_blank" rel="noopener noreferrer">{n}</a>)}</div>
          </div>
        </div>

        <div className="footer-huge" aria-hidden="true">BrandZaha</div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span>Crafted in Jaipur · Built with Next.js</span>
        </div>
      </div>
    </footer>
  );
}
