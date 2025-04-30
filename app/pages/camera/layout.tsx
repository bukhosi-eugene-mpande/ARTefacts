'use client';

import { ReactNode } from 'react';

import BottomNav from '@/components/bottomnav';

export default function CameraLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      {children}
      <BottomNav />
    </section>
  );
}
