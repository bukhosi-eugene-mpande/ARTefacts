'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Assuming you're using Next.js routing
import { getTokens, isTokenExpired } from '@/lib/authStorage'; // Import your methods

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = () => {
      const tokens = getTokens();

      if (!tokens.accessToken || isTokenExpired()) {
        // If no access token or token is expired, redirect to sign-up page
        router.push('/auth/signup');
      } else {
        // If the user is logged in and the token is valid, stay on home page
        // Proceed with rendering the home page content
        // No need to do anything here as this is already handled
      }
    };

    checkLoginStatus();
  }, [router]);

  return null; // No need to display anything on the Home page if the user is redirected.
}
