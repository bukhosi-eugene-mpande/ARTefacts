'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

export default function SignUpConfirmationLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block max-w-lg justify-center text-center"
          exit={{ opacity: 0, y: -10 }}
          initial={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
