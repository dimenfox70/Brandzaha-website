export default function ProjectForm({ action, project, error }) {
  const p = project || {};
  return (
    <form action={action} className="admin-form">
      {error && <p className="admin-alert admin-alert--error">{error}</p>}

      <section className="admin-panel">
        <h2>Basics</h2>
        <div className="admin-form-grid">
          <label className="admin-field"><span>Slug (URL, unique)</span><input name="slug" defaultValue={p.slug} required placeholder="zenith-home" /></label>
          <label className="admin-field"><span>Title</span><input name="title" defaultValue={p.title} required /></label>
          <label className="admin-field"><span>Client</span><input name="client" defaultValue={p.client} /></label>
          <label className="admin-field"><span>Industry</span><input name="industry" defaultValue={p.industry} /></label>
          <label className="admin-field"><span>Year</span><input type="number" name="year" defaultValue={p.year} /></label>
          <label className="admin-field"><span>Platform (optional)</span><input name="platform" defaultValue={p.platform} placeholder="Shopify Plus" /></label>
          <label className="admin-field"><span>Live URL</span><input name="live_url" defaultValue={p.liveUrl} /></label>
          <label className="admin-field"><span>Accent color</span><input name="accent" defaultValue={p.accent} placeholder="#d8ff36" /></label>
          <label className="admin-field"><span>Category (comma-separated)</span><input name="category" defaultValue={(p.category || []).join(', ')} placeholder="E-commerce, Branding" /></label>
          <label className="admin-field"><span>Services used (comma-separated)</span><input name="services" defaultValue={(p.services || []).join(', ')} /></label>
          <label className="admin-field admin-field--full"><span>Palette (3 hex colors, comma-separated)</span><input name="palette" defaultValue={(p.palette || []).join(', ')} placeholder="#0e1013, #1c2b1f, #d8ff36" /></label>
        </div>
      </section>

      <section className="admin-panel">
        <h2>Case study</h2>
        <label className="admin-field admin-field--full"><span>Summary</span><textarea name="summary" rows={2} defaultValue={p.summary} /></label>
        <label className="admin-field admin-field--full"><span>Challenge</span><textarea name="challenge" rows={4} defaultValue={p.challenge} /></label>
        <label className="admin-field admin-field--full"><span>Solution</span><textarea name="solution" rows={4} defaultValue={p.solution} /></label>
      </section>

      <section className="admin-panel">
        <h2>Results &amp; testimonial</h2>
        <p className="admin-hint">Advanced: raw JSON.</p>
        <label className="admin-field admin-field--full">
          <span>Results — array of {`{ "metric": "+40%", "label": "Conversion rate" }`}</span>
          <textarea name="results" rows={6} defaultValue={JSON.stringify(p.results || [], null, 2)} spellCheck={false} />
        </label>
        <label className="admin-field admin-field--full">
          <span>Testimonial — {`{ "quote": "...", "name": "...", "role": "..." }`} (leave empty for none)</span>
          <textarea name="testimonial" rows={4} defaultValue={p.testimonial ? JSON.stringify(p.testimonial, null, 2) : ''} spellCheck={false} />
        </label>
      </section>

      <section className="admin-panel">
        <h2>Visibility</h2>
        <div className="admin-form-grid">
          <label className="admin-field"><span>Sort order (lower = first)</span><input type="number" name="sort_order" defaultValue={p.sort_order ?? 0} /></label>
          <label className="admin-checkbox"><input type="checkbox" name="featured" defaultChecked={p.featured ?? true} /><span>Featured on homepage</span></label>
          <label className="admin-checkbox"><input type="checkbox" name="published" defaultChecked={p.published ?? true} /><span>Published (visible on site)</span></label>
        </div>
      </section>

      <div className="admin-form__actions">
        <button type="submit" className="admin-btn admin-btn--primary">Save project</button>
      </div>
    </form>
  );
}
