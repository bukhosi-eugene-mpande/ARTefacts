'use client';

import type { User } from '@/app/actions/user/user.types';

import React, { useState, useEffect } from 'react';
// import { ExpandableCard } from '@/components/artefactInfo/artefactInfo';
import { Spinner } from '@heroui/spinner';
import Link from 'next/link';

import Header from '@/components/header';
import ChallengeOfDay from '@/components/challengeofday';
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
  const [guestUser, setGuestUser] = useState(false);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchArtefacts = async () => {
      setLoading(true);
      try {
        const data = await getAllArtefacts(page, ITEMS_PER_PAGE);

        setArtefacts((prev) => [...prev, ...data.artefacts]);

        // Optional: stop loading if no more artefacts
        // if (data.artefacts.length < ITEMS_PER_PAGE) {
        //   Example: setHasMore(false);
        // }
      } catch (err) {
        setError(err instanceof Error ? err.message : error);
      } finally {
        setLoading(false);
      }
    };

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
        console.log(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchArtefacts();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= fullHeight - 200 && !loading) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <div className="mt-4 flex h-full w-full flex-col items-center gap-4 px-4 md:py-10">
      <Link href="/pages/home">
        <Header />
      </Link>
      {/* <Image src={Player} alt="Player" className="items-center w-16 h-16" /> */}

      {/* <Searchbar /> */}
      {/* <p className="text-[#D8A730] text-[36px] ">Hi, *user*</p> */}
      <h1 className="mt-[-20] text-center text-[36px] text-[#D8A730]">
        {guestUser ? 'Welcome guest user' : 'Welcome ' + user?.username}
      </h1>
      <LeaderboardCard imgUrl={user?.avatar} />
      <div className="flex w-full flex-col items-center">
        <h1 className="mt-2 text-3xl text-[#D8A730]">ARTEFACTS</h1>
        {loading && <Spinner className="my-2" color="warning" />}
        <div className="w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
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
