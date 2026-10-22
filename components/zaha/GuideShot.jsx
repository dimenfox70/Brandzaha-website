'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Icon from '@/components/Icon';

// Setup-guide screenshot. Opens full size in a dialog (or a new tab without JS).
export default function GuideShot({ src, width, height, alt, step, enlargeLabel, closeLabel }) {
  const dialogRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return undefined;
    if (open && !d.open) { d.showModal(); window.__lenis?.stop(); }
    if (!open && d.open) d.close();
    const onClose = () => { setOpen(false); window.__lenis?.start(); };
    d.addEventListener('close', onClose);
    return () => d.removeEventListener('close', onClose);
  }, [open]);

  return (
    <>
      <a
        href={src}
        className="zh-shot"
        target="_blank"
        rel="noopener"
        onClick={(e) => { if (typeof HTMLDialogElement === 'function') { e.preventDefault(); setOpen(true); } }}
        aria-label={`${enlargeLabel}: ${alt}`}
      >
        <Image src={src} width={width} height={height} alt={alt} sizes="(min-width: 900px) 42vw, 92vw" />
        <span className="zh-shot__zoom" aria-hidden="true"><Icon name="expand" size={16} /></span>
      </a>
      <dialog
        ref={dialogRef}
        className="zh-lightbox"
        aria-label={`Step ${step}: ${alt}`}
        onClick={(e) => { if (e.target === dialogRef.current) setOpen(false); }}
      >
        {open && <Image src={src} width={width} height={height} alt={alt} sizes="94vw" />}
        <button type="button" className="zh-lightbox__close" onClick={() => setOpen(false)} aria-label={closeLabel}>
          <Icon name="close" size={20} />
        </button>
      </dialog>
    </>
  );
}
