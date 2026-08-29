import ServiceForm from '../ServiceForm';
import { createService } from '../actions';

export default function NewServicePage({ searchParams }) {
  return (
    <div className="admin-page">
      <header className="admin-page__head"><div><p className="admin-eyebrow">Services</p><h1>New service</h1></div></header>
      <ServiceForm action={createService} error={searchParams?.error} />
    </div>
  );
}
