'use client';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import s from './zaha.module.css';

// The conversation, in order. `step` is the numbered line on the left it belongs to.
const SCRIPT = [
  { step: 0, kind: 'me', text: 'Need a linen shirt for a beach wedding, under ₹3,000' },
  { step: 0, kind: 'typing' },
  { step: 1, kind: 'ai', text: 'Here are three breathable picks in your budget:' },
  { step: 1, kind: 'cards' },
  { step: 2, kind: 'me', text: 'Can I see the sage one on me?' },
  { step: 2, kind: 'typing' },
  { step: 2, kind: 'tryon' },
  { step: 3, kind: 'ai', text: 'Looks great on you. Size M is in stock. Add it to your bag?' },
  { step: 3, kind: 'me', text: 'Yes, size M' },
  { step: 3, kind: 'ai', text: 'Added ✓ Sage Camp Collar, M · ₹2,190' },
];
const PRODUCTS = [
  { name: 'Sand Linen Shirt', price: '₹2,490', color: '#c9b48a' },
  { name: 'Sage Camp Collar', price: '₹2,190', color: '#8fa58a' },
  { name: 'Ivory Mandarin', price: '₹2,790', color: '#e7e1d2' },
];
const TICK_MS = 1700;
// Each loop shows every line, then holds the finished chat for two more ticks.
const LOOP = SCRIPT.length + 2;
const LAST = SCRIPT.length - 1;

function Message({ item }) {
  if (item.kind === 'typing') {
    return <div className={`${s.msg} ${s.ai}`}><span className={s.typing}><i /><i /><i /></span></div>;
  }
  if (item.kind === 'cards') {
    return (
      <div className={s.cards}>
        {PRODUCTS.map((p) => (
          <div key={p.name} className={s.pc}>
            <div className={s.im} style={{ background: `linear-gradient(160deg, ${p.color}, #141418)` }}>
              <div className={s.fig} style={{ inset: '6% 14% 0', '--g': p.color }} />
            </div>
            <div className={s.tx}><b>{p.name}</b><span>{p.price}</span></div>
          </div>
        ))}
      </div>
    );
  }
  if (item.kind === 'tryon') {
    return (
      <div className={s.tryon}>
        <div><div className={s.fig} style={{ inset: '8% 16% 0', '--g': '#3d3d46' }} /><em>You</em></div>
        <div className={s.after}><div className={s.fig} style={{ inset: '8% 16% 0', '--g': '#8fa58a' }} /><em>Try-on</em></div>
      </div>
    );
  }
  return <div className={`${s.msg} ${item.kind === 'me' ? s.me : s.ai}`}>{item.text}</div>;
}

// Steps list plus the phone with the auto-playing chat. `children` is the section intro.
export default function DemoChat({ steps, children }) {
  const phoneRef = useRef(null);
  const bodyRef = useRef(null);
  const [count, setCount] = useState(0); // ticks since start
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  const tick = count % LOOP;
  const loop = Math.floor(count / LOOP);
  const upto = reduced ? LAST : Math.min(tick, LAST);
  const current = SCRIPT[upto].step;

  // Reduced motion: show the finished chat and never animate.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // Play only while the phone is on screen.
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 });
    io.observe(phoneRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || paused || reduced) return undefined;
    const id = window.setInterval(() => setCount((c) => c + 1), TICK_MS);
    return () => window.clearInterval(id);
  }, [visible, paused, reduced]);

  // Older messages slide up out of the chat. Hide any that no longer fit whole.
  const clip = useCallback(() => {
    const body = bodyRef.current;
    if (!body) return;
    const top = body.getBoundingClientRect().top + parseFloat(getComputedStyle(body).paddingTop) - 1;
    for (const el of body.children) {
      if (el.getBoundingClientRect().top < top) el.setAttribute('data-clipped', '');
      else el.removeAttribute('data-clipped');
    }
  }, []);
  useLayoutEffect(clip, [clip, upto, loop]);
  useEffect(() => {
    const ro = new ResizeObserver(clip);
    ro.observe(bodyRef.current);
    return () => ro.disconnect();
  }, [clip]);

  const shown = SCRIPT.slice(0, upto + 1)
    .map((item, i) => ({ item, i }))
    .filter(({ item, i }) => item.kind !== 'typing' || i === upto);

  return (
    <div className={`${s.wrap} ${s.demoGrid}`}>
      <div className={s.demoCopy}>
        {children}
        <ol>
          {steps.map((text, k) => (
            <li key={text} className={k === current ? s.on : undefined} aria-current={k === current ? 'step' : undefined}>{text}</li>
          ))}
        </ol>
      </div>
      <div ref={phoneRef} className={s.phone}>
        <div className={s.screen} role="img" aria-label="Animated example of a shopper chatting with Zaha">
          <div className={s.chatHead}>
            <div className={s.av}>Z</div>
            <div><b>Zaha</b><small>Your shopping assistant · online</small></div>
          </div>
          <div ref={bodyRef} className={s.chatBody}>
            {shown.map(({ item, i }) => <Message key={`${loop}-${i}`} item={item} />)}
          </div>
          <div className={s.chatInput}><span>Ask for anything…</span><b>↑</b></div>
        </div>
        {!reduced && (
          <button type="button" className={s.pause} onClick={() => setPaused((p) => !p)} aria-label={paused ? 'Play the chat demo' : 'Pause the chat demo'}>
            {paused
              ? <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1.5v9l7.5-4.5z" /></svg>
              : <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z" /></svg>}
          </button>
        )}
      </div>
    </div>
  );
}
