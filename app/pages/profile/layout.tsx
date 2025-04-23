import BottomNav from '@/components/bottomnav';
import { ReactNode } from 'react';

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <section className="flex flex-col w-full h-full">
      {children}
      <BottomNav />
    </section>
  );
}
 