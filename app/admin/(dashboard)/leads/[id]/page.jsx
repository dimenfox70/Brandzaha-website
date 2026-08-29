import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/server';
import { updateLead, deleteLead } from '../actions';
import DeleteButton from '../../DeleteButton';

const STATUSES = ['new', 'contacted', 'qualified', 'won', 'lost'];
const fmt = (d) => new Date(d).toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'short' });

const DETAIL_FIELDS = [
  ['email', 'Email'], ['phone', 'Phone'], ['form_name', 'Form'], ['page_url', 'Page'],
  ['project_type', 'Project type'], ['budget', 'Budget'], ['timeline', 'Timeline'],
  ['service', 'Service'], ['platform', 'Platform'], ['duration', 'Duration'], ['ip', 'IP address'],
];

export default async function LeadDetailPage({ params, searchParams }) {
  const db = supabaseAdmin();
  const { data: lead } = await db.from('leads').select('*').eq('id', params.id).maybeSingle();
  if (!lead) notFound();

  return (
    <div className="admin-page">
      <header className="admin-page__head">
        <div>
          <p className="admin-eyebrow">Lead</p>
          <h1>{lead.name}</h1>
          <p className="admin-page__sub">Submitted {fmt(lead.created_at)}</p>
        </div>
        <DeleteButton action={deleteLead.bind(null, lead.id)} confirmText="Delete this lead? This can’t be undone." />
      </header>

      {searchParams?.error && <p className="admin-alert admin-alert--error">{searchParams.error}</p>}

      <section className="admin-panel">
        <h2>Details</h2>
        <div className="admin-detail-grid">
          {DETAIL_FIELDS.map(([key, label]) => lead[key] ? (
            <div key={key} className="admin-detail-item"><span>{label}</span><strong>{lead[key]}</strong></div>
          ) : null)}
        </div>
        <div className="admin-detail-item admin-detail-item--full">
          <span>Message</span>
          <p className="admin-detail-message">{lead.message}</p>
        </div>
      </section>

      <form action={updateLead.bind(null, lead.id)} className="admin-form">
        <section className="admin-panel">
          <h2>Follow-up</h2>
          <div className="admin-form-grid">
            <label className="admin-field">
              <span>Status</span>
              <select name="status" defaultValue={lead.status}>
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>
            <label className="admin-field admin-field--full"><span>Internal notes</span><textarea name="notes" rows={4} defaultValue={lead.notes} /></label>
          </div>
        </section>
        <div className="admin-form__actions">
          <button type="submit" className="admin-btn admin-btn--primary">Save</button>
        </div>
      </form>
    </div>
  );
}
