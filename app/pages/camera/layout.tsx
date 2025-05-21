'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import TopNav from '@/components/topnav/topnav';
import BottomNav from '@/components/bottomnav/bottomnav';

export default function CameraLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <section>
      <div className="hidden lg:block">
        <TopNav />
      </div>
      {children}
      <BottomNav />
    </section>
  );
}
