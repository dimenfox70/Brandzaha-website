export default function ServiceForm({ action, service, error }) {
  const s = service || {};
  return (
    <form action={action} className="admin-form">
      {error && <p className="admin-alert admin-alert--error">{error}</p>}
      <section className="admin-panel">
        <div className="admin-form-grid">
          <label className="admin-field"><span>Title</span><input name="title" defaultValue={s.title} required /></label>
          <label className="admin-field"><span>Icon (Icon.jsx name)</span><input name="icon" defaultValue={s.icon} placeholder="code" /></label>
          <label className="admin-field admin-field--full"><span>Tagline</span><input name="tagline" defaultValue={s.tagline} /></label>
          <label className="admin-field admin-field--full"><span>Summary</span><textarea name="summary" rows={2} defaultValue={s.summary} /></label>
          <label className="admin-field admin-field--full"><span>Points (comma-separated)</span><input name="points" defaultValue={(s.points || []).join(', ')} /></label>
          <label className="admin-field"><span>Link (optional, defaults to /services)</span><input name="href" defaultValue={s.href} placeholder="/ecommerce" /></label>
          <label className="admin-field"><span>Sort order</span><input type="number" name="sort_order" defaultValue={s.sort_order ?? 0} /></label>
          <label className="admin-checkbox"><input type="checkbox" name="published" defaultChecked={s.published ?? true} /><span>Published</span></label>
        </div>
      </section>
      <div className="admin-form__actions">
        <button type="submit" className="admin-btn admin-btn--primary">Save service</button>
      </div>
    </form>
  );
}
