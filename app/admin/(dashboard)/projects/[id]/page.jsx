import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/server';
import ProjectForm from '../ProjectForm';
import { updateProject, deleteProject } from '../actions';
import DeleteButton from '../../DeleteButton';

export default async function EditProjectPage({ params, searchParams }) {
  const db = supabaseAdmin();
  const { data: row } = await db.from('projects').select('*').eq('id', params.id).maybeSingle();
  if (!row) notFound();

  const project = { ...row, liveUrl: row.live_url };

  return (
    <div className="admin-page">
      <header className="admin-page__head">
        <div>
          <p className="admin-eyebrow">Projects</p>
          <h1>{row.title}</h1>
        </div>
        <DeleteButton action={deleteProject.bind(null, row.id)} confirmText="Delete this project? This can’t be undone." />
      </header>
      <ProjectForm action={updateProject.bind(null, row.id)} project={project} error={searchParams?.error} />
    </div>
  );
}
