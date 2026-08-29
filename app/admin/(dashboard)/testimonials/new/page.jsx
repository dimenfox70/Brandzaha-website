import TestimonialForm from '../TestimonialForm';
import { createTestimonial } from '../actions';

export default function NewTestimonialPage({ searchParams }) {
  return (
    <div className="admin-page">
      <header className="admin-page__head"><div><p className="admin-eyebrow">Testimonials</p><h1>New testimonial</h1></div></header>
      <TestimonialForm action={createTestimonial} error={searchParams?.error} />
    </div>
  );
}
