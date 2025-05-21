'use client';

import { ReactNode } from 'react';

import TopNav from '@/components/topnav/topnav';
import BottomNav from '@/components/bottomnav/bottomnav';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <section className="flex w-screen flex-col bg-[#271F17]">
      <div className="hidden lg:block">
        <TopNav />
      </div>
      {children}
      {/* <BottomNav /> */}
    </section>
  );
}
