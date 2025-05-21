'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import TopNav from '@/components/topnav/topnav';
import BottomNav from '@/components/bottomnav/bottomnav';

export default function ProfileLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <section className="flex h-full w-screen flex-col">
      <div className="hidden lg:block">
        <TopNav />
      </div>
      {children}
      <BottomNav />
    </section>
  );
}
