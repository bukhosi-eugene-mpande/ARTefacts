'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import * as tmImage from '@teachablemachine/image';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/bottomnav';

export default function CameraLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      {children}
      <BottomNav />
    </section>
  );
}
