'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/pages/home');
  }, [router]);

  return null; // or a loading spinner if you want
}
