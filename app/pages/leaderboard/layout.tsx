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
      {/* <AuthChecker /> */}
      {children}
      <BottomNav />
    </>
  );
}
