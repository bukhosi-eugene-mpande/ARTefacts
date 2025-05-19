'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function AnimatedWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={pathname}
<<<<<<< HEAD
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
=======
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        initial={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.55 }}
>>>>>>> 4ddbc7310d820bef67c913f24eaf072e18bcbfc2
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
