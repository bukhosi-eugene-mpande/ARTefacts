'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import TopNav from '@/components/topnav/topnav';
import BottomNav from '@/components/bottomnav/bottomnav';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <section className="flex !w-screen flex-col overflow-hidden bg-[#231209] dark:bg-[#271F17] md:py-10">
      <div className="hidden lg:block">
        <TopNav />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="pt-0 lg:pb-0 lg:pt-20"
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
