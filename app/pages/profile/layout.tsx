'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

import TopNav from '@/components/topnav/topnav';
import BottomNav from '@/components/bottomnav/bottomnav';

export default function ProfileLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="h-full min-h-screen w-screen bg-[#231209]">
      <div className="hidden lg:block">
        <TopNav />
      </div>

      {children}

      <BottomNav />
    </div>
  );
}
