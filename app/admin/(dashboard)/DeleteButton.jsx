'use client';

export default function DeleteButton({ action, confirmText = 'Delete this item? This can’t be undone.', label = 'Delete' }) {
  return (
    <form action={action} onSubmit={(e) => { if (!confirm(confirmText)) e.preventDefault(); }}>
      <button type="submit" className="admin-btn admin-btn--danger">{label}</button>
    </form>
  );
}
