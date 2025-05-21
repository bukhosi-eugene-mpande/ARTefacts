'use client';

import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import TopNav from '@/components/topnav/topnav';
import BottomNav from '@/components/bottomnav/bottomnav';
import AuthChecker from '@/components/authchecker';

export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      <AuthChecker />
      <TopNav />
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          animate={{ opacity: 1, y: 0 }}
          className="pb-20 pt-0 lg:pb-0 lg:pt-20"
          exit={{ opacity: 0, y: -20 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <BottomNav />
    </div>
  );
}
