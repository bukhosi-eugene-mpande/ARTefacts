'use client';

import { ReactNode } from 'react';

import TopNav from '@/components/topnav/topnav';
import BottomNav from '@/components/bottomnav/bottomnav';

export default function CameraLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="hidden lg:block">
        <TopNav />
      </div>
      {children}
      <BottomNav />
    </div>
  );
}
