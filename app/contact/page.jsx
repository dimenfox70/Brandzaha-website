import { getSite } from '@/lib/site';
import Reveal from '@/components/Reveal';
import SplitText from '@/components/SplitText';
import ContactForm from '@/components/ContactForm';
import Icon from '@/components/Icon';
import Magnetic from '@/components/Magnetic';

export const metadata = {
  title: 'Contact',
  description: 'Tell us about your project. Reach BrandZaha in Jaipur by form, WhatsApp, call or email. We reply within one business day.',
  alternates: { canonical: '/contact' },
};

export default async function ContactPage() {
  const site = await getSite();
  return (
    <main id="main">
      <section className="page-head wrap">
        <div className="glow hero__glow-a" aria-hidden="true" style={{ opacity: 0.16 }} />
        <p className="eyebrow"><Reveal as="span">Contact</Reveal></p>
        <h1 className="page-head__title"><SplitText hero text="Let’s" /><br /><span className="text-accent"><SplitText hero text="talk." /></span></h1>
        <Reveal as="p" className="page-head__lead lead" delay={0.15}>Tell us a little about your project and we’ll get back within one business day. Prefer to chat? WhatsApp or call us directly — or ask our AI assistant, bottom-right.</Reveal>
      </section>

      <section className="section wrap">
        <div className="split" style={{ alignItems: 'start', gap: 'clamp(2rem,6vw,5rem)' }}>
          <div><ContactForm variant="full" formName="Contact" pageUrl="/contact" /></div>
          <aside className="stack">
            <div className="info-list">
              <div className="info-list__item"><span>Email</span><a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></div>
              <div className="info-list__item"><span>Phone / WhatsApp</span><a href={`tel:${site.contact.phone}`}>{site.contact.phone}</a></div>
              <div className="info-list__item"><span>Studio</span><strong style={{ fontSize: 'var(--step-0)', lineHeight: 1.5 }}>{site.contact.address}</strong></div>
              <div className="info-list__item"><span>Hours</span><strong style={{ fontSize: 'var(--step-0)' }}>{site.contact.hours}</strong></div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Magnetic><a href={`https://wa.me/${site.contact.phoneRaw}`} className="btn" target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={20} /><span className="btn__label">WhatsApp</span></a></Magnetic>
              <Magnetic><a href={`tel:${site.contact.phone}`} className="btn btn--ghost"><Icon name="phone" size={20} /><span className="btn__label">Call us</span></a></Magnetic>
            </div>
            <div className="split__media" style={{ aspectRatio: '16/11', marginTop: '1rem' }}>
              <iframe title="BrandZaha studio location" src="https://www.google.com/maps?q=Gordhan+Sky+Jhotwara+Jaipur&output=embed" width="100%" height="100%" style={{ border: 0, filter: 'grayscale(1) invert(.92) contrast(.9)' }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
