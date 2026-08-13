'use client';
import { motion } from 'framer-motion';

// Re-mounts on each route change → gives an app-like page transition.
export default function Template({ children }) {
  return (
    <motion.div
      className="pt"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
