import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/server';
import ServiceForm from '../ServiceForm';
import { updateService, deleteService } from '../actions';
import DeleteButton from '../../DeleteButton';

export default async function EditServicePage({ params, searchParams }) {
  const db = supabaseAdmin();
  const { data: service } = await db.from('services').select('*').eq('id', params.id).maybeSingle();
  if (!service) notFound();

  return (
    <div className="admin-page">
      <header className="admin-page__head">
        <div><p className="admin-eyebrow">Services</p><h1>{service.title}</h1></div>
        <DeleteButton action={deleteService.bind(null, service.id)} confirmText="Delete this service? This can’t be undone." />
      </header>
      <ServiceForm action={updateService.bind(null, service.id)} service={service} error={searchParams?.error} />
    </div>
  );
}
