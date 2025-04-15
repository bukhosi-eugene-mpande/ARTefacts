'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import {
  getTokens,
  isTokenExpired,
  refreshAccessToken,
} from '@/lib/authStorage';

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const publicPaths = [
        '/auth/signup',
        '/auth/login',
        '/auth/signup-confirmation',
        // Add more public pages here
      ];

      const isPublicPage = publicPaths.includes(pathname);
      const tokens = getTokens();

      // If on a public page, no need to check further
      if (isPublicPage) return;

      // If no access token, try to refresh
      if (!tokens.accessToken || isTokenExpired()) {
        const newAccessToken = await refreshAccessToken();

        // If refresh failed, redirect to signup
        if (!newAccessToken) {
          router.push('/auth/signup');
        }
      }
    };

    checkAuth();
  }, [pathname, router]);

  return null;
}
