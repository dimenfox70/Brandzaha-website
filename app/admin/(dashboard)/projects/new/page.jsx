import ProjectForm from '../ProjectForm';
import { createProject } from '../actions';

export default function NewProjectPage({ searchParams }) {
  return (
    <div className="admin-page">
      <header className="admin-page__head">
        <div>
          <p className="admin-eyebrow">Projects</p>
          <h1>New project</h1>
        </div>
      </header>
      <ProjectForm action={createProject} error={searchParams?.error} />
    </div>
  );
}
