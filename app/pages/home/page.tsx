'use client';

import type { User } from '@/app/actions/user/user.types';

import React, { useState, useEffect } from 'react';
import { Spinner } from '@heroui/spinner';
import Link from 'next/link';

import Header from '@/components/header';
import LeaderboardCard from '@/components/leaderboardCard';
import Artefactcard from '@/components/artefactcard/artefactcard';
import { Artefact } from '@/app/actions/artefacts/artefacts.types';
import { getAllArtefacts } from '@/app/actions/artefacts/artefacts';
import { getUserDetails } from '@/app/actions/user/user';

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [artefacts, setArtefacts] = useState<Artefact[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [guestUser, setGuestUser] = useState(true);
  const [hasMore, setHasMore] = useState(true); // <-- NEW
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchArtefacts = async () => {
      setLoading(true);
      try {
        const data = await getAllArtefacts(page, ITEMS_PER_PAGE);

        setArtefacts((prev) => [...prev, ...data.artefacts]);

        // If fewer artefacts are returned than requested, no more data
        if (data.artefacts.length < ITEMS_PER_PAGE) {
          setHasMore(false);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchArtefacts();
  }, [page]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken =
          typeof window !== 'undefined'
            ? (localStorage.getItem('accessToken') as string)
            : null;

        if (!accessToken) {
          throw new Error('No access token found in localStorage');
        }

        if (accessToken.indexOf('guest') !== -1) {
          setGuestUser(true);
          return;
        }

        const userData = await getUserDetails(accessToken);
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      const isBottom = scrollTop + windowHeight >= fullHeight - 200;

      if (isBottom && !loading && hasMore) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  return (
    <div className="mt-4 flex h-full w-full flex-col items-center gap-4 px-4 md:py-10">
      <Link href="/pages/home">
        <Header />
      </Link>

      <h1 className="mt-[-20] text-center text-[36px] text-[#D8A730]">
        {guestUser ? 'Welcome Guest' : `Welcome ${user?.username}`}
      </h1>
      <LeaderboardCard />
      <div className="flex w-full flex-col items-center">
        <h1 className="mt-2 text-3xl text-[#D8A730]">ARTEFACTS</h1>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {artefacts.map((artefact, index) => (
            <div key={index} className="w-full">
              <Artefactcard {...artefact} />
            </div>
          ))}
        </div>
        {loading && (
          <div className="my-4 flex justify-center">
            <Spinner color="warning" />
          </div>
        )}
      </div>
    </div>
  );
}
