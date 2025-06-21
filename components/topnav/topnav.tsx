'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  HomeIcon,
  TrophyIcon,
  Cog6ToothIcon,
  ViewfinderCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';

import { getTokens } from '@/lib/authStorage';

import logo from '../../public/assets/logo-gold.png';

export default function TopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const tokens = getTokens();

      if (tokens && tokens.accessToken) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  const handleLeaderboardClick = () => {
    router.push('/pages/leaderboard');
  };

  const getLinkClass = (path: string) => {
    return pathname === path
      ? 'transition-all hover:opacity-75 bg-[#231209] p-2 rounded-full text-[#D8A730]'
      : 'transition-all hover:opacity-75 hover:bg-[#d8b87d] hover:text-[#D8A730]';
  };

  const leaderboardIconColor = isLoggedIn ? '#231209' : '#B0B0B0';

  return (
    <div className="fixed left-0 right-0 top-0 z-50 bg-[#231209]">
      <div className="h-8" />
      <div className="flex flex-row">
        <div className="h-14 w-32 self-center rounded-br-xl rounded-tr-xl bg-[#e5c8a4]" />
        <nav className="h-14 w-full items-center lg:flex">
          <div className="flex items-center bg-[#231209]">
            <div className="block h-full w-8 bg-[#231209]" />
            <Link
              className="flex h-full items-center text-2xl font-bold text-[#231209]"
              href="/"
            >
              <Image
                alt="logo"
                className="h-full"
                height={80}
                src={logo}
                width={380}
              />
            </Link>
          </div>

          <div className="flex h-full w-full items-center justify-end gap-8 rounded-bl-xl rounded-tl-xl bg-[#e5c8a4] pr-64 text-xl">
            <NavItem
              className={getLinkClass('/pages/home')}
              href="/pages/home"
              icon={
                <HomeIcon
                  className={`h-6 w-6 ${pathname === '/pages/home' ? 'text-[#D8A730]' : 'text-[#231209]'}`}
                />
              }
              label="Home"
            />
            <NavItem
              className={getLinkClass('/pages/camera')}
              href="/pages/camera"
              icon={
                <ViewfinderCircleIcon
                  className={`h-6 w-6 ${pathname === '/pages/camera' ? 'text-[#D8A730]' : 'text-[#231209]'}`}
                />
              }
              label="Camera"
              onClick={() => {
                localStorage.setItem('gameMode', 'false');
              }}
            />
            <NavItem
              className={getLinkClass('/pages/leaderboard')}
              href="/pages/leaderboard"
              icon={
                <TrophyIcon
                  className={`h-6 w-6 ${pathname === '/pages/leaderboard' ? 'text-[#D8A730]' : 'text-[#231209]'}`}
                />
              }
              label="Leaderboard"
              onClick={handleLeaderboardClick}
            />
            <NavItem
              className={getLinkClass('/pages/profile')}
              href="/pages/profile"
              icon={
                <Cog6ToothIcon
                  className={`h-6 w-6 ${pathname === '/pages/profile' ? 'text-[#D8A730]' : 'text-[#231209]'}`}
                />
              }
              label="Settings"
            />
          </div>
        </nav>
      </div>

      <div className="h-8 bg-[#231209]" />
    </div>
  );
}

function NavItem({
  icon,
  href,
  className,
  onClick,
  label,
}: {
  icon: React.ReactNode;
  href: string;
  className: string;
  onClick?: () => void;
  label: string;
}) {
  const pathname = usePathname();

  return (
    <Link
      className={`${className} flex items-center gap-2 rounded-lg px-4 py-2`}
      href={href}
      onClick={onClick}
    >
      {icon}
      <span
        className={`font-medium ${pathname === href ? 'text-[#D8A730]' : 'text-[#231209]'}`}
      >
        {label}
      </span>
    </Link>
  );
}
