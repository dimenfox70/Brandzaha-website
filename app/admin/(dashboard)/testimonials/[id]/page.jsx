import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/server';
import TestimonialForm from '../TestimonialForm';
import { updateTestimonial, deleteTestimonial } from '../actions';
import DeleteButton from '../../DeleteButton';

export default async function EditTestimonialPage({ params, searchParams }) {
  const db = supabaseAdmin();
  const { data: testimonial } = await db.from('testimonials').select('*').eq('id', params.id).maybeSingle();
  if (!testimonial) notFound();

  return (
    <div className="admin-page">
      <header className="admin-page__head">
        <div><p className="admin-eyebrow">Testimonials</p><h1>{testimonial.name}</h1></div>
        <DeleteButton action={deleteTestimonial.bind(null, testimonial.id)} confirmText="Delete this testimonial? This can’t be undone." />
      </header>
      <TestimonialForm action={updateTestimonial.bind(null, testimonial.id)} testimonial={testimonial} error={searchParams?.error} />
    </div>
  );
}
