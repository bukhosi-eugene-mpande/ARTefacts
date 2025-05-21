'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

import BottomNav from '@/components/bottomnav';

export default function HomeLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <section className="flex w-screen flex-col  bg-[#271F17]">
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* <BottomNav /> */}
    </section>
  );
}
