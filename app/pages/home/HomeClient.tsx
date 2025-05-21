'use client';

import type { Artefact } from '@/app/actions/artefacts/artefacts.types';
import type { User } from '@/app/actions/user/user.types';

import React, { useState, useEffect, useRef } from 'react';
import { Spinner } from '@heroui/spinner';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { getAllArtefacts } from '@/app/actions/artefacts/artefacts';
import { getUserDetails } from '@/app/actions/user/user';
import Header from '@/components/header';
import LeaderboardCard from '@/components/leaderboardCard';
import Artefactcard from '@/components/artefactcard/artefactcard';

import LandingSection from '@/components/LandingSection';

export default function HomeClient({
  initialArtefacts,
}: {
  initialArtefacts: Artefact[];
}) {
  const [user, setUser] = useState<User | null>(null);
  const [artefacts, setArtefacts] = useState<Artefact[]>(initialArtefacts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [guestUser, setGuestUser] = useState(false);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const accessToken =
      typeof window !== 'undefined'
        ? (localStorage.getItem('accessToken') ?? '')
        : '';

    if (accessToken.includes('guest')) {
      setGuestUser(true);
    } else if (accessToken) {
      getUserDetails(accessToken).then(setUser).catch(console.error);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (
        scrollTop + windowHeight >= fullHeight - 200 &&
        !loading &&
        page > 1
      ) {
        console.log(page);
        setPage((prev) => prev - 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  useEffect(() => {
    if (page === 1) return;
    const fetchMore = async () => {
      setLoading(true);
      try {
        const res = await getAllArtefacts(page, ITEMS_PER_PAGE);

        setArtefacts((prev) => [...prev, ...res.artefacts]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMore();
  }, [page]);

  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToContent = () => {
    if (contentRef.current) {
      const offset = 120; // Adjust this value to control how much higher it scrolls
      const elementPosition = contentRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="flex h-full w-full flex-col">
      <LandingSection onScrollDown={scrollToContent} />

      <div className="flex flex-col items-center">
        <div ref={contentRef} className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {artefacts.map((artefact, index) => (
            <motion.div
              key={index}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
              initial={{ opacity: 0, y: 20 }}
              transition={{
                duration: 0.4,
                ease: 'easeOut',
                delay: index * 0.02,
              }}
            >
              <Artefactcard {...artefact} />
            </motion.div>
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
