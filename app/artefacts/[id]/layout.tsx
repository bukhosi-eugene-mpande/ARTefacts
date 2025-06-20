import { ReactNode } from 'react';

import TopNav from '@/components/topnav/topnav';
import BottomNav from '@/components/bottomnav/bottomnav';
export default function ArtefactsLayout({ children }: { children: ReactNode }) {
  return (
    <section className="min-w-screen min-h-screen">
      <div className="hidden lg:block">
        <TopNav />
      </div>
      {children}
      <BottomNav />
    </section>
  );
}
