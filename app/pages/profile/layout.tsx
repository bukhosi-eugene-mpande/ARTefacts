'use client';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

import BottomNav from '@/components/bottomnav';

export default function ProfileLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <section className="flex h-full w-screen flex-col">
      {children}
      <BottomNav />
    </section>
  );
}
