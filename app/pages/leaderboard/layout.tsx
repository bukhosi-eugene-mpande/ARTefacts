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
      {/* <AuthChecker /> */}
      <div className="hidden lg:block">
        <TopNav />
      </div>
      {children}
      <BottomNav />
    </div>
  );
}
