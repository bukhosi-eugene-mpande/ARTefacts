'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

export default function SignUpLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <section className="flex h-full max-h-screen flex-col items-center justify-center gap-4 bg-[#141313]">
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block max-w-lg justify-center text-center"
          exit={{ opacity: 0, scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
