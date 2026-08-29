import { NextResponse } from 'next/server';
import { site } from '@/lib/site';

export const runtime = 'nodejs';

/*
 * Contact / lead form handler.
 * All website forms POST here and are delivered to Brandzaha@gmail.com.
 *
 * Delivery order:
 *   1. Resend, if RESEND_API_KEY is set
 *   2. FormSubmit.co fallback (first live submit sends a confirmation
 *      email to Brandzaha@gmail.com — click Activate to start receiving)
 */

const LEAD_INBOX = process.env.CONTACT_TO || site.contact.email || 'Brandzaha@gmail.com';

const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => t > now - 600000);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 5;
}

async function deliver({ subject, body, replyTo, fields }) {
  const to = LEAD_INBOX;

  if (process.env.RESEND_API_KEY) {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || 'BrandZaha Website <no-reply@brandzaha.com>',
        to,
        subject,
        text: body,
        reply_to: replyTo,
      }),
    });
    if (!r.ok) {
      console.error('[contact] Resend error', await r.text());
      throw new Error('Resend failed');
    }
    return;
  }

  const r = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      _subject: subject,
      _template: 'box',
      _replyto: replyTo,
      ...fields,
      details: body,
    }),
  });
  const json = await r.json().catch(() => ({}));
  if (!r.ok || json.success === false || json.success === 'false') {
    console.error('[contact] FormSubmit error', json);
    throw new Error('Mail delivery failed');
  }
}

export async function POST(req) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'local';
    if (limited(ip)) return NextResponse.json({ success: false, message: 'Too many messages — try again shortly.' }, { status: 429 });

    const data = await req.json();
    if (data.website) return NextResponse.json({ success: true, message: 'Thanks — we’ll be in touch.' }); // honeypot

    const name = String(data.name || '').trim().slice(0, 120);
    const email = String(data.email || '').trim().slice(0, 160);
    const message = String(data.message || '').trim().slice(0, 5000);
    if (name.length < 2) return NextResponse.json({ success: false, message: 'Please enter your name.' });
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return NextResponse.json({ success: false, message: 'Please enter a valid email address.' });
    if (!message) return NextResponse.json({ success: false, message: 'Please add a short message.' });

    const fieldKeys = ['phone', 'project_type', 'budget', 'timeline', 'service', 'platform', 'duration', 'form_name', 'page_url'];
    const extra = fieldKeys.map((k) => (data[k] ? `${k}: ${data[k]}` : null)).filter(Boolean).join('\n');
    const body = `New enquiry via ${data.form_name || 'Website'}\n\nName: ${name}\nEmail: ${email}\n${extra}\n\nMessage:\n${message}`;

    const fields = {
      name,
      email,
      phone: data.phone || '',
      form: data.form_name || 'Website',
      page: data.page_url || '',
      project_type: data.project_type || '',
      budget: data.budget || '',
      timeline: data.timeline || '',
      service: data.service || '',
      message,
    };

    await deliver({
      subject: `[BrandZaha Lead] ${data.form_name || 'Website'} — ${name}`,
      body,
      replyTo: email,
      fields,
    });
    return NextResponse.json({ success: true, message: `Thank you, ${name}! We’ll be in touch within one business day.` });
  } catch {
    return NextResponse.json({ success: false, message: `Something went wrong — please email ${LEAD_INBOX}.` }, { status: 500 });
  }
}
