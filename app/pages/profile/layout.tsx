import { ReactNode } from 'react';

import BottomNav from '@/components/bottomnav';

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <section className="flex h-full w-full flex-col">
      {children}
      <BottomNav />
    </section>
  );
}
