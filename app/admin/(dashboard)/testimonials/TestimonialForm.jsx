export default function TestimonialForm({ action, testimonial, error }) {
  const t = testimonial || {};
  return (
    <form action={action} className="admin-form">
      {error && <p className="admin-alert admin-alert--error">{error}</p>}
      <section className="admin-panel">
        <div className="admin-form-grid">
          <label className="admin-field admin-field--full"><span>Quote</span><textarea name="quote" rows={3} defaultValue={t.quote} required /></label>
          <label className="admin-field"><span>Name</span><input name="name" defaultValue={t.name} required /></label>
          <label className="admin-field"><span>Role / company</span><input name="role" defaultValue={t.role} /></label>
          <label className="admin-field"><span>Sort order</span><input type="number" name="sort_order" defaultValue={t.sort_order ?? 0} /></label>
          <label className="admin-checkbox"><input type="checkbox" name="published" defaultChecked={t.published ?? true} /><span>Published</span></label>
        </div>
      </section>
      <div className="admin-form__actions">
        <button type="submit" className="admin-btn admin-btn--primary">Save testimonial</button>
      </div>
    </form>
  );
}
