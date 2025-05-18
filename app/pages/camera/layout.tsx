'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

import BottomNav from '@/components/bottomnav';

export default function CameraLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <section>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          initial={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <BottomNav />
    </section>
  );
}
