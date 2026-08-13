import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

/*
 * Contact / lead form handler.
 * Validates + honeypot + basic rate-limit. To actually deliver mail, set
 * RESEND_API_KEY (or wire your provider in `deliver()`), else it logs and
 * succeeds so the UX works in demo/dev.
 */

const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => t > now - 600000);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 5;
}

async function deliver(subject, body, replyTo) {
  const to = 'brandzaha@gmail.com';
  if (process.env.RESEND_API_KEY) {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
      body: JSON.stringify({ from: 'BrandZaha <no-reply@brandzaha.com>', to, subject, text: body, reply_to: replyTo }),
    });
    return true;
  }
  console.log('[contact]', subject, '\n', body); // dev fallback
  return true;
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

    const fields = ['phone', 'project_type', 'budget', 'timeline', 'service', 'platform', 'duration', 'form_name', 'page_url'];
    const extra = fields.map((k) => (data[k] ? `${k}: ${data[k]}` : null)).filter(Boolean).join('\n');
    const body = `New enquiry via ${data.form_name || 'Website'}\n\nName: ${name}\nEmail: ${email}\n${extra}\n\nMessage:\n${message}`;

    await deliver(`[BrandZaha Lead] ${data.form_name || 'Website'} — ${name}`, body, email);
    return NextResponse.json({ success: true, message: `Thank you, ${name}! We’ll be in touch within one business day.` });
  } catch {
    return NextResponse.json({ success: false, message: 'Something went wrong — please email info@brandzaha.com.' }, { status: 500 });
  }
}
