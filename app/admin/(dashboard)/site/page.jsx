import { getSite } from '@/lib/site';
import { saveSiteSettings } from './actions';

export default async function AdminSitePage({ searchParams }) {
  const site = await getSite();

  return (
    <div className="admin-page">
      <header className="admin-page__head">
        <div>
          <p className="admin-eyebrow">Content</p>
          <h1>Site settings</h1>
          <p className="admin-page__sub">Studio details shown across the site — header, footer, contact page and structured data.</p>
        </div>
      </header>

      {searchParams?.saved && <p className="admin-alert admin-alert--ok">Saved. Changes are live now.</p>}
      {searchParams?.error && <p className="admin-alert admin-alert--error">{searchParams.error}</p>}

      <form action={saveSiteSettings} className="admin-form">
        <section className="admin-panel">
          <h2>Studio</h2>
          <div className="admin-form-grid">
            <label className="admin-field"><span>Name</span><input name="name" defaultValue={site.name} required /></label>
            <label className="admin-field"><span>Tagline</span><input name="tagline" defaultValue={site.tagline} /></label>
            <label className="admin-field"><span>Domain (with https://)</span><input name="domain" defaultValue={site.domain} required /></label>
            <label className="admin-field"><span>Founded (year)</span><input type="number" name="founded" defaultValue={site.founded} /></label>
            <label className="admin-field"><span>Accent color</span><input type="text" name="accent" defaultValue={site.accent} /></label>
          </div>
        </section>

        <section className="admin-panel">
          <h2>Contact</h2>
          <div className="admin-form-grid">
            <label className="admin-field"><span>Email</span><input type="email" name="email" defaultValue={site.contact.email} required /></label>
            <label className="admin-field"><span>Phone (display)</span><input name="phone" defaultValue={site.contact.phone} /></label>
            <label className="admin-field"><span>Phone (digits only, for WhatsApp/tel links)</span><input name="phoneRaw" defaultValue={site.contact.phoneRaw} /></label>
            <label className="admin-field"><span>Hours</span><input name="hours" defaultValue={site.contact.hours} /></label>
            <label className="admin-field admin-field--full"><span>Address</span><input name="address" defaultValue={site.contact.address} /></label>
            <label className="admin-field"><span>City</span><input name="city" defaultValue={site.contact.city} /></label>
            <label className="admin-field"><span>Region / State</span><input name="region" defaultValue={site.contact.region} /></label>
            <label className="admin-field"><span>Postal code</span><input name="postal" defaultValue={site.contact.postal} /></label>
            <label className="admin-field"><span>Country code</span><input name="country" defaultValue={site.contact.country} /></label>
            <label className="admin-field admin-field--full"><span>Google Maps link</span><input name="maps" defaultValue={site.contact.maps} /></label>
          </div>
        </section>

        <section className="admin-panel">
          <h2>Social</h2>
          <div className="admin-form-grid">
            <label className="admin-field"><span>Instagram URL</span><input name="social_instagram" defaultValue={site.social.Instagram} /></label>
            <label className="admin-field"><span>LinkedIn URL</span><input name="social_linkedin" defaultValue={site.social.LinkedIn} /></label>
            <label className="admin-field"><span>Facebook URL</span><input name="social_facebook" defaultValue={site.social.Facebook} /></label>
          </div>
        </section>

        <section className="admin-panel">
          <h2>Analytics</h2>
          <div className="admin-form-grid">
            <label className="admin-field"><span>Google Tag Manager ID</span><input name="gtm" defaultValue={site.analytics.gtm} /></label>
            <label className="admin-field"><span>GA4 ID</span><input name="ga4" defaultValue={site.analytics.ga4} /></label>
          </div>
        </section>

        <section className="admin-panel">
          <h2>Navigation</h2>
          <p className="admin-hint">Advanced: raw JSON array of <code>{`{ "label": "...", "url": "...", "highlight": true }`}</code> entries.</p>
          <label className="admin-field admin-field--full">
            <textarea name="nav" rows={8} defaultValue={JSON.stringify(site.nav, null, 2)} spellCheck={false} />
          </label>
        </section>

        <div className="admin-form__actions">
          <button type="submit" className="admin-btn admin-btn--primary">Save changes</button>
        </div>
      </form>
    </div>
  );
}
