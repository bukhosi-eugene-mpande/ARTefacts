'use client';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

import BottomNav from '@/components/bottomnav';

export default function ProfileLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <section className="flex h-full w-screen flex-col">
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1"
          exit={{ opacity: 0, y: -10 }}
          initial={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.7 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <BottomNav />
    </section>
  );
}
