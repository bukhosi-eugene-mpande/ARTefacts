'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

import oldMerensky from '../../assets/img/Merensky.jpg';

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <section className="absolute inset-0 flex flex-col overflow-hidden">
      {/* Background image overlay */}
      <div
        style={{
          backgroundImage: `url(${oldMerensky.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      />
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </section>
  );
}
