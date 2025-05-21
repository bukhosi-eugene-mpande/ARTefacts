'use client';

import { ReactNode } from 'react';

import TopNav from '@/components/topnav/topnav';
import BottomNav from '@/components/bottomnav/bottomnav';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <section className="flex !w-screen flex-col overflow-hidden bg-[#231209] dark:bg-[#271F17] md:py-10">
      <div className="hidden lg:block">
        <TopNav />
      </div>
      <BottomNav />
      {children}
      {/* <BottomNav /> */}
    </section>
  );
}
