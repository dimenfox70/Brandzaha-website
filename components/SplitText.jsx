'use client';
import { motion } from 'framer-motion';

const child = {
  hidden: { y: '115%', rotateX: -55, opacity: 0 },
  show: { y: 0, rotateX: 0, opacity: 1 },
};

export default function SplitText({ text, className, hero = false }) {
  const words = String(text).split(' ');
  const trigger = hero ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true } };
  return (
    <span className={className} style={{ display: 'inline-block', perspective: 800 }}>
      {words.map((w, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
          <motion.span
            style={{ display: 'inline-block', transformOrigin: '0% 100%' }}
            variants={child}
            initial="hidden"
            {...trigger}
            transition={{ duration: 0.8, delay: 0.15 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
