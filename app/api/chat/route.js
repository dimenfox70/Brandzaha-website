import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

/*
 * Zaha AI — chat endpoint.
 *
 * Demo brain now (rule-based, knows BrandZaha). To go fully live, set an API
 * key in the environment and the block below will proxy to a real LLM:
 *   - OPENAI_API_KEY   -> OpenAI Chat Completions
 *   - ANTHROPIC_API_KEY-> Anthropic Messages
 * The demo answers keep it useful (and free) until a key is provided.
 */

const KB = {
  greeting: "Hey there! 👋 I'm Zaha, BrandZaha's AI assistant. I can tell you about our work, services, e-commerce builds, pricing, or IT training. What are you working on?",
  services:
    "We're a full-stack creative & digital studio. We do: Web & app development (React/Next.js), E-commerce (Shopify, WooCommerce, headless Next.js), Branding & graphic design, Digital marketing & SEO, AI chatbots & automation, and custom software (ERP/CRM/HRM). Which one fits your goal?",
  ecommerce:
    "For online stores we build on three platforms: 🛍️ Shopify / Shopify Plus (fastest to launch), 🧩 WooCommerce (full ownership on WordPress), and ⚡ custom headless Next.js (fastest, fully bespoke). Not sure which? Tell me what you sell and I'll suggest one. See /ecommerce for details.",
  pricing:
    "Pricing depends on scope. As a rough guide, marketing sites start around ₹50k, e-commerce and web apps more. The best next step is a quick, free consult — share your goal at /contact or WhatsApp +91-6376509220 and we'll scope it honestly.",
  training:
    "Our IT Training & Internship runs 1, 3 and 6-month tracks: Web Design & Development, Digital Marketing & SEO, AI Tools & Automation, and Graphic Design. It's hands-on with real projects, a portfolio, and placement support. Want the enquiry link?",
  work:
    "Recent work includes Zenith Home (e-commerce, +40% conversions), Aurum Retail (Shopify Plus), Kesar Foods (WooCommerce), Nova Labs (headless Next.js), FPF Foundation and Property Bapu. Browse them in our booklet portfolio at /work.",
  products:
    "We also have ready-to-launch products you can rebrand fast: ZahaCommerce (headless store), ZahaCRM, ZahaBot (this chat + voice), ZahaLearn (LMS), ZahaEstate (property portal) and ZahaDine (restaurant ordering). Want details on any?",
  ai:
    "Yes! We build AI chatbots and voice agents (like me), plus workflow automations — trained on your content to answer questions and capture leads 24/7. This very assistant is one of our ZahaBot builds.",
  contact:
    "You can reach the team at 📧 info@brandzaha.com, 📞 +91-6376509220 (also WhatsApp), or the form at /contact. Studio hours: Mon–Sat, 10am–7pm, Jaipur.",
  location: "We're based in Jaipur, Rajasthan — 606 C, 7th Floor, Gordhan Sky, Jhotwara. We work with clients across India and beyond.",
  thanks: "Anytime! 🙌 If you'd like, tell me a bit about your project and I'll point you the right way — or reach the team at /contact.",
  fallback:
    "Good question! I can help with our services, e-commerce, pricing, portfolio, AI, IT training or contact details. Could you tell me a little more — or reach the team directly at info@brandzaha.com?",
};

function demoReply(message) {
  const t = message.toLowerCase();
  const has = (...w) => w.some((x) => t.includes(x));
  if (has('hi', 'hello', 'hey', 'namaste', 'howdy')) return KB.greeting;
  if (has('price', 'pricing', 'cost', 'quote', 'budget', 'charge', 'rate')) return KB.pricing;
  if (has('ecommerce', 'e-commerce', 'shopify', 'woocommerce', 'store', 'headless', 'checkout')) return KB.ecommerce;
  if (has('training', 'intern', 'course', 'learn', 'placement')) return KB.training;
  if (has('portfolio', 'work', 'case study', 'projects', 'clients', 'booklet')) return KB.work;
  if (has('product', 'ready', 'crm', 'erp', 'lms', 'zaha')) return KB.products;
  if (has('ai', 'chatbot', 'voice', 'automation', 'agent', 'bot')) return KB.ai;
  if (has('contact', 'email', 'phone', 'call', 'whatsapp', 'reach', 'talk')) return KB.contact;
  if (has('where', 'location', 'address', 'jaipur', 'office')) return KB.location;
  if (has('service', 'do you', 'what do', 'offer', 'help', 'build', 'make')) return KB.services;
  if (has('thank', 'thanks', 'great', 'cool', 'awesome')) return KB.thanks;
  return KB.fallback;
}

const SYSTEM = `You are Zaha, the friendly AI assistant for BrandZaha, a creative & digital agency in Jaipur, India.
Services: web & app development (React/Next.js), e-commerce (Shopify, WooCommerce, headless Next.js), branding, digital marketing & SEO, AI chatbots/automation, custom software (ERP/CRM/HRM), and IT training.
Contact: info@brandzaha.com, +91-6376509220, Jaipur. Be concise, warm and helpful; guide users toward /contact for quotes. Never invent prices beyond "marketing sites start around ₹50k".`;

async function liveReply(message, history) {
  // OpenAI
  if (process.env.OPENAI_API_KEY) {
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM },
          ...history.map((m) => ({ role: m.role === 'bot' ? 'assistant' : 'user', content: m.text })),
          { role: 'user', content: message },
        ],
        temperature: 0.5,
        max_tokens: 300,
      }),
    });
    const data = await r.json();
    return data?.choices?.[0]?.message?.content?.trim();
  }
  return null;
}

export async function POST(req) {
  try {
    const { message = '', history = [] } = await req.json();
    if (!message.trim()) return NextResponse.json({ reply: KB.fallback });
    let reply = null;
    try { reply = await liveReply(message, history); } catch { /* fall back to demo */ }
    if (!reply) reply = demoReply(message);
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: KB.fallback }, { status: 200 });
  }
}
