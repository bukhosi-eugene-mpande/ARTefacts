'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import TopNav from '@/components/topnav/topnav';
import BottomNav from '@/components/bottomnav/bottomnav';

export default function CameraLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      <div className="hidden lg:block">
        <TopNav />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          animate={{ opacity: 1, y: 0 }}
          className="pb-20 pt-0 lg:pb-0 lg:pt-20"
          exit={{ opacity: 0, y: -10 }}
          initial={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.7 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <BottomNav />
    </div>
  );
}
