import BottomNav from '@/components/bottomnav';
import { ReactNode } from 'react';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <section className="flex flex-col px-4 w-full gap-4 md:py-10 bg-[#9F8763]">
      {/* <h1>Home</h1> */}
      {children}
      <BottomNav />
    </section>
  );
}
