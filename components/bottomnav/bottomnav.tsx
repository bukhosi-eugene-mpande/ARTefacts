'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation'; // To get the current route
import {
  HomeIcon,
  TrophyIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { toast } from 'react-hot-toast'; // For toast notifications

import { getTokens } from '@/lib/authStorage'; // Utility to get the tokens

export default function BottomNav() {
  const pathname = usePathname(); // Get the current route/pathname
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if the user is logged in

  useEffect(() => {
    const checkAuth = () => {
      const tokens = getTokens(); // Check if valid token exists

      if (tokens && tokens.accessToken) {
        setIsLoggedIn(true); // User is logged in
      } else {
        setIsLoggedIn(false); // User is not logged in
      }
    };

    checkAuth(); // Call the function to check if the user is logged in
  }, []);

  const handleLeaderboardClick = () => {
    if (!isLoggedIn) {
      // Show the toast if the user is not logged in
      toast.error('Please log in to access this feature!', {
        duration: 4000, // Duration of the toast in ms
        position: 'top-center', // Position of the toast
      });
      // Redirect to login if not logged in
      setTimeout(() => {
        router.push('/auth/login'); // Redirect to login page after the toast
      }, 4000);
    } else {
      // If logged in, proceed to the camera page or the desired page
      router.push('/pages/leaderboard');
    }
  };

  const getLinkClass = (path: string) => {
    // Apply styles based on the current path
    return pathname === path
      ? 'transition-all hover:opacity-75 bg-[#9F8763] p-2 rounded-full text-white' // Active link with dark circle background
      : 'transition-all hover:opacity-75'; // Inactive link without background
  };

  // Conditional color for the leaderboard icon
  const leaderboardIconColor = isLoggedIn ? '#231209' : '#B0B0B0'; // Lighter color when not logged in

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex w-full items-center justify-around rounded-t-3xl bg-[#e5c8a4] py-4 shadow-inner">
      <NavItem
        className={getLinkClass('/pages/home')} // Add dark circle background if active
        href="/pages/home"
        icon={<HomeIcon className="h-8 w-8 text-[#231209]" />}
      />
      <NavItem
        className={getLinkClass('/pages/camera')} // Add dark circle background if active
        href="/pages/camera"
        icon={<CustomSvgIcon />}
      />
      <NavItem
        className={getLinkClass('/pages/leaderboard')} // Add dark circle background if active
        href="/pages/leaderboard"
        icon={
          <TrophyIcon
            className="h-8 w-8"
            style={{ color: leaderboardIconColor }}
          />
        } // Apply conditional color
        onClick={handleLeaderboardClick}
      />
      <NavItem
        className={getLinkClass('/pages/profile')} // Add dark circle background if active
        href="/pages/profile"
        icon={<Cog6ToothIcon className="h-8 w-8 text-[#231209]" />}
      />
    </nav>
  );
}

function NavItem({
  icon,
  href,
  className,
  onClick,
}: {
  icon: React.ReactNode;
  href: string;
  className: string;
  onClick?: () => void;
}) {
  return (
    <Link className={className} href={href} onClick={onClick}>
      {icon}
    </Link>
  );
}

function CustomSvgIcon() {
  return (
    <svg
      fill="none"
      height="35"
      viewBox="0 0 35 35"
      width="35"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28.1398 25.9475V12.2956L15.0854 4.88641M28.1625 12.2836L33.6071 9.19343M20.5739 2.18618V4.13913M20.5739 6.87336V8.82631M20.5739 11.5604V13.5133M33.5351 22.972L30.9244 21.5205M28.5809 20.1904L26.2374 18.8603M23.6988 17.4194L21.5505 16.1684M17.254 17.3824L19.4022 16.1314M31.974 27.0351C30.713 28.7204 28.0026 29.8859 24.8624 29.8859C20.5185 29.8859 16.9971 27.6557 16.9971 24.9046C16.9971 24.2463 17.1987 23.618 17.5649 23.0428M2.52931 29.9712C2.36498 30.2562 2.27531 30.564 2.27531 30.8851C2.27531 32.3565 4.15877 33.5494 6.48212 33.5494C8.80548 33.5494 10.6889 32.3565 10.6889 30.8851C10.6889 30.5772 10.6064 30.2814 10.4547 30.0063M6.48235 18.0339C7.95871 18.0339 9.15554 16.8371 9.15554 15.3607C9.15554 13.8844 7.95871 12.6875 6.48235 12.6875C5.00599 12.6875 3.80916 13.8844 3.80916 15.3607C3.80916 16.8371 5.00599 18.0339 6.48235 18.0339ZM6.48235 18.0339C7.72306 18.0339 8.91299 18.5267 9.7903 19.404C10.6676 20.2813 11.1605 21.4712 11.1605 22.7119V24.7168H9.15559L8.48729 30.0632H4.47751L3.80921 24.7168H1.80432V22.7119C1.80432 21.4712 2.29719 20.2813 3.1745 19.404C4.05181 18.5267 5.24165 18.0339 6.48235 18.0339ZM33.063 8.60419L21.3453 1.9536C20.867 1.68213 20.2812 1.68213 19.8029 1.9536L15.6501 4.31062C15.161 4.58819 14.8589 5.10715 14.8589 5.66947L14.8596 17.8465C14.8596 18.4088 15.1618 18.9277 15.6508 19.2052L27.3686 25.8559C27.8469 26.1273 28.4326 26.1274 28.9108 25.856L33.0629 23.5002C33.552 23.2227 33.8542 22.7037 33.8542 22.1413V9.96295C33.8542 9.40066 33.552 8.88174 33.063 8.60419Z"
        stroke="#231209"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
