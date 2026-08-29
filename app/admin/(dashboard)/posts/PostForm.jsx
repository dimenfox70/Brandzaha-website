export default function PostForm({ action, post, error }) {
  const p = post || {};
  return (
    <form action={action} className="admin-form">
      {error && <p className="admin-alert admin-alert--error">{error}</p>}
      <section className="admin-panel">
        <div className="admin-form-grid">
          <label className="admin-field"><span>Slug (URL, unique)</span><input name="slug" defaultValue={p.slug} required placeholder="my-post-title" /></label>
          <label className="admin-field"><span>Title</span><input name="title" defaultValue={p.title} required /></label>
          <label className="admin-field"><span>Category</span><input name="category" defaultValue={p.category} placeholder="Web Development" /></label>
          <label className="admin-field"><span>Author</span><input name="author" defaultValue={p.author} /></label>
          <label className="admin-field"><span>Date</span><input type="date" name="date" defaultValue={p.date} /></label>
          <label className="admin-field admin-field--full"><span>Palette (3 hex colors, comma-separated)</span><input name="palette" defaultValue={(p.palette || []).join(', ')} /></label>
          <label className="admin-field admin-field--full"><span>Excerpt</span><textarea name="excerpt" rows={2} defaultValue={p.excerpt} /></label>
          <label className="admin-field admin-field--full">
            <span>Full content (plain text, blank lines separate paragraphs — leave empty to show a &ldquo;coming soon&rdquo; placeholder)</span>
            <textarea name="content" rows={12} defaultValue={p.content} />
          </label>
          <label className="admin-checkbox"><input type="checkbox" name="published" defaultChecked={p.published ?? true} /><span>Published</span></label>
        </div>
      </section>
      <div className="admin-form__actions">
        <button type="submit" className="admin-btn admin-btn--primary">Save post</button>
      </div>
    </form>
  );
}
