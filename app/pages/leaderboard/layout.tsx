'use client';

import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

import BottomNav from '@/components/bottomnav';
import AuthChecker from '@/components/authchecker';

export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      <AuthChecker />
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
      <BottomNav />
    </>
  );
}
