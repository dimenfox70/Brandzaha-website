'use client';
import { useRef, useState } from 'react';
import s from './zaha.module.css';

const EASE = 'cubic-bezier(.22, 1, .36, 1)';

// One question. Native <details>, so it works without JavaScript and with find-in-page.
// With JavaScript the answer slides open and closed.
function FaqItem({ q, a, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  const detailsRef = useRef(null);
  const answerRef = useRef(null);
  const anim = useRef(null);

  const onSummaryClick = (e) => {
    const details = detailsRef.current;
    const answer = answerRef.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !answer.animate) return;
    e.preventDefault();

    // A click mid-animation reverses it from wherever it has got to.
    const wasClosing = anim.current?.closing;
    const current = answer.getBoundingClientRect().height;
    anim.current?.cancel();
    anim.current = null;

    if (details.open && !wasClosing) {
      const a = answer.animate([{ height: `${current}px`, opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 260, easing: EASE });
      a.closing = true;
      a.onfinish = () => { details.open = false; anim.current = null; };
      anim.current = a;
    } else {
      const from = details.open ? current : 0;
      details.open = true;
      const to = answer.offsetHeight;
      const a = answer.animate([{ height: `${from}px`, opacity: from ? 1 : 0 }, { height: `${to}px`, opacity: 1 }], { duration: 320, easing: EASE });
      a.onfinish = () => { anim.current = null; };
      anim.current = a;
    }
  };

  return (
    <details ref={detailsRef} open={open} onToggle={(e) => setOpen(e.currentTarget.open)}>
      <summary onClick={onSummaryClick}>{q}</summary>
      <div ref={answerRef} className={s.answer} style={{ overflow: 'hidden' }}>
        <p>{a}</p>
      </div>
    </details>
  );
}

export default function Faq({ items }) {
  return (
    <div>
      {items.map((item, i) => <FaqItem key={item.q} q={item.q} a={item.a} defaultOpen={i === 0} />)}
    </div>
  );
}
