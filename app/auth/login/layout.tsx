'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

export default function LoginLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <section className="flex w-screen flex-col items-center justify-center gap-4 overflow-hidden py-8 md:py-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block max-w-lg justify-center text-center"
          exit={{ opacity: 0, scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
