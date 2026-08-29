'use client';
import { useState } from 'react';
import { site } from '@/lib/data/site';
import Icon from './Icon';

export default function ContactForm({ variant = 'full', formName = 'Contact', pageUrl = '/contact', hidden = {} }) {
  const [status, setStatus] = useState({ msg: '', ok: null });
  const [busy, setBusy] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setStatus({ msg: '', ok: null });
    const data = Object.fromEntries(new FormData(e.target).entries());
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const json = await res.json();
      setStatus({ msg: json.message, ok: json.success });
      if (json.success) e.target.reset();
    } catch {
      setStatus({ msg: `Network error — please try again or email ${site.contact.email}.`, ok: false });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="stack" onSubmit={onSubmit} noValidate>
      <input type="hidden" name="form_name" value={formName} />
      <input type="hidden" name="page_url" value={pageUrl} />
      {Object.entries(hidden).map(([k, v]) => <input key={k} type="hidden" name={k} value={v} />)}
      <div className="hp" aria-hidden="true"><label>Leave empty<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label></div>

      {variant === 'full' ? (
        <div className="form-grid">
          <div className="field"><label htmlFor="c-name">Name</label><input id="c-name" name="name" type="text" required autoComplete="name" placeholder="Your name" /></div>
          <div className="field"><label htmlFor="c-email">Email</label><input id="c-email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" /></div>
          <div className="field"><label htmlFor="c-phone">Phone</label><input id="c-phone" name="phone" type="tel" autoComplete="tel" placeholder="+91…" /></div>
          <div className="field"><label htmlFor="c-type">Project type</label>
            <select id="c-type" name="project_type"><option value="">Select…</option><option>Website / Web app</option><option>E-commerce store</option><option>Brand identity / Design</option><option>Digital marketing / SEO</option><option>Mobile app</option><option>AI chatbot / automation</option><option>Custom software</option><option>Something else</option></select>
          </div>
          <div className="field"><label htmlFor="c-budget">Budget range</label>
            <select id="c-budget" name="budget"><option value="">Select…</option><option>Under ₹50k</option><option>₹50k – ₹1.5L</option><option>₹1.5L – ₹5L</option><option>₹5L+</option></select>
          </div>
          <div className="field"><label htmlFor="c-timeline">Timeline</label>
            <select id="c-timeline" name="timeline"><option value="">Select…</option><option>ASAP</option><option>1–3 months</option><option>3–6 months</option><option>Just exploring</option></select>
          </div>
          <div className="field field--full"><label htmlFor="c-msg">Project details</label><textarea id="c-msg" name="message" required placeholder="What are you looking to build? Share goals, links, anything useful." /></div>
        </div>
      ) : (
        <>
          <div className="field"><label htmlFor="s-name">Name</label><input id="s-name" name="name" type="text" required placeholder="Your name" /></div>
          <div className="field"><label htmlFor="s-email">Email</label><input id="s-email" name="email" type="email" required placeholder="you@brand.com" /></div>
          <div className="field"><label htmlFor="s-phone">Phone</label><input id="s-phone" name="phone" type="tel" placeholder="+91…" /></div>
          <div className="field"><label htmlFor="s-msg">Your project</label><textarea id="s-msg" name="message" required placeholder="Tell us what you need." /></div>
        </>
      )}

      <button type="submit" className="btn" disabled={busy}><span className="btn__label">{busy ? 'Sending…' : 'Send message'}</span> {!busy && <span className="btn__arrow" aria-hidden="true">↗</span>}</button>
      {status.msg && <p className={`form-status ${status.ok ? 'is-ok' : 'is-err'}`} role="status" aria-live="polite">{status.msg}</p>}
    </form>
  );
}
