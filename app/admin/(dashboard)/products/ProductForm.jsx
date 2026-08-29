export default function ProductForm({ action, product, error }) {
  const p = product || {};
  return (
    <form action={action} className="admin-form">
      {error && <p className="admin-alert admin-alert--error">{error}</p>}
      <section className="admin-panel">
        <div className="admin-form-grid">
          <label className="admin-field"><span>Name</span><input name="name" defaultValue={p.name} required /></label>
          <label className="admin-field"><span>Tag / one-liner</span><input name="tag" defaultValue={p.tag} /></label>
          <label className="admin-field"><span>Icon (Icon.jsx name)</span><input name="icon" defaultValue={p.icon} placeholder="cart" /></label>
          <label className="admin-field"><span>Metric</span><input name="metric" defaultValue={p.metric} placeholder="2 weeks to live" /></label>
          <label className="admin-field admin-field--full"><span>Blurb</span><textarea name="blurb" rows={3} defaultValue={p.blurb} /></label>
          <label className="admin-field"><span>Stack (comma-separated)</span><input name="stack" defaultValue={(p.stack || []).join(', ')} /></label>
          <label className="admin-field"><span>Accent color</span><input name="accent" defaultValue={p.accent} placeholder="#5cffce" /></label>
          <label className="admin-field admin-field--full"><span>Palette (3 hex colors, comma-separated)</span><input name="palette" defaultValue={(p.palette || []).join(', ')} /></label>
          <label className="admin-field"><span>Sort order</span><input type="number" name="sort_order" defaultValue={p.sort_order ?? 0} /></label>
          <label className="admin-checkbox"><input type="checkbox" name="published" defaultChecked={p.published ?? true} /><span>Published</span></label>
        </div>
      </section>
      <div className="admin-form__actions">
        <button type="submit" className="admin-btn admin-btn--primary">Save product</button>
      </div>
    </form>
  );
}
