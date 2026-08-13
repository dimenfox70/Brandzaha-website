'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from './Icon';

const GREETING = "Hi! I'm Zaha, BrandZaha's AI assistant. Ask me about our work, services, e-commerce builds, pricing or IT training — or say hello 👋";
const CHIPS = ['What do you build?', 'E-commerce options', 'Get a quote', 'IT Training'];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'bot', text: GREETING }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, busy, open]);

  async function send(text) {
    const msg = (text ?? input).trim();
    if (!msg || busy) return;
    setInput('');
    const history = [...messages, { role: 'user', text: msg }];
    setMessages(history);
    setBusy(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history: history.slice(-8) }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: 'bot', text: data.reply || "Sorry, I didn't catch that — try rephrasing?" }]);
    } catch {
      setMessages((m) => [...m, { role: 'bot', text: 'I hit a snag connecting. You can reach the team at info@brandzaha.com or +91-6376509220.' }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {!open && (
        <motion.button
          className="chat-fab" onClick={() => setOpen(true)} aria-label="Open AI assistant"
          initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 18 }}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        >
          <span className="chat-fab__pulse" aria-hidden="true" />
          <span className="chat-fab__dot" aria-hidden="true" />
          Ask Zaha AI
        </motion.button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            className="chat-panel" role="dialog" aria-label="Zaha AI assistant"
            initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="chat-head">
              <span className="chat-head__avatar"><Icon name="spark" size={22} /></span>
              <div>
                <div className="chat-head__name">Zaha AI</div>
                <div className="chat-head__status">Online · replies instantly</div>
              </div>
              <button className="chat-head__close" onClick={() => setOpen(false)} aria-label="Close chat"><Icon name="close" size={22} /></button>
            </div>

            <div className="chat-body" ref={bodyRef}>
              {messages.map((m, i) => (
                <div key={i} className={`chat-msg chat-msg--${m.role}`}>{m.text}</div>
              ))}
              {busy && <div className="chat-typing" aria-label="Zaha is typing"><i /><i /><i /></div>}
            </div>

            {messages.length <= 2 && (
              <div className="chat-chips">
                {CHIPS.map((c) => <button key={c} className="chat-chip" onClick={() => send(c)}>{c}</button>)}
              </div>
            )}

            <div className="chat-voice"><Icon name="mic" size={13} style={{ display: 'inline', verticalAlign: '-2px' }} /> Voice agent <b>coming soon</b></div>

            <form className="chat-input" onSubmit={(e) => { e.preventDefault(); send(); }}>
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything…" aria-label="Message" />
              <button type="submit" disabled={busy || !input.trim()} aria-label="Send"><Icon name="send" size={18} /></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
