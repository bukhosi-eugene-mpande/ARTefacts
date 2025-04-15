'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getTokens, isTokenExpired } from '@/lib/authStorage';

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const publicPaths = [
      '/auth/signup',
      '/auth/login',
      '/auth/signup-confirmation',
      // Add more public pages here
    ];

    const tokens = getTokens();

    // Only redirect if you're NOT on a public page and you're not logged in
    const isPublicPage = publicPaths.includes(pathname);

    if (!isPublicPage && (!tokens.accessToken || isTokenExpired())) {
      router.push('/auth/signup');
    }
  }, [pathname, router]);

  return null;
}
