'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

import BottomNav from '@/components/bottomnav';

export default function HomeLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <section className="flex w-screen flex-col bg-[#271F17]">
      {children}
      {/* <BottomNav /> */}
    </section>
  );
}
