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
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        initial={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.55 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
