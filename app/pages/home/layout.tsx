import { ReactNode } from 'react';

import BottomNav from '@/components/bottomnav';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <section className="flex w-screen flex-col gap-4 bg-[#9F8763] dark:bg-[#271F17] px-4 md:py-10">
      {/* <h1>Home</h1> */}
      {children}
      <BottomNav />
    </section>
  );
}
