'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import {
  getTokens,
  isTokenExpired,
  refreshAccessToken,
} from '@/lib/authStorage';

const publicPaths = [
  '/', // add main page here if you want
  '/auth/signup',
  '/auth/login',
  '/auth/signup-confirmation',
  // add other public paths
];

export default function AuthChecker() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      if (publicPaths.includes(pathname)) return; // skip public paths

      const tokens = getTokens();

      if (!tokens.accessToken || isTokenExpired()) {
        const newAccessToken = await refreshAccessToken();

        if (!newAccessToken) {
          router.replace('/auth/login'); // redirect to login page
        }
      }
    };

    checkAuth();
  }, [pathname, router]);

  return null; // no UI
}
