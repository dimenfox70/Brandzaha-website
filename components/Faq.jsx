'use client';
import { useState } from 'react';

export default function Faq({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq">
      {items.map(([q, a], i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`faq__item ${isOpen ? 'is-open' : ''}`}>
            <button className="faq__q" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
              {q} <i aria-hidden="true" />
            </button>
            <div className="faq__a" style={{ height: isOpen ? 'auto' : 0 }}>
              <div className="faq__a-inner">{a}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
