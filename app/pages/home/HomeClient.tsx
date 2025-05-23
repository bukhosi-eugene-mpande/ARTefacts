'use client';

import type { Artefact } from '@/app/actions/artefacts/artefacts.types';
import type { User } from '@/app/actions/user/user.types';

import React, { useState, useEffect, useRef } from 'react';
import { Spinner } from '@heroui/spinner';
import { motion } from 'framer-motion';

import { getAllArtefacts } from '@/app/actions/artefacts/artefacts';
import { getUserDetails } from '@/app/actions/user/user';
import Artefactcard from '@/components/artefactcard/artefactcard';
import LandingSection from '@/components/LandingSection';
import WelcomeCard from '@/components/WelcomeCard/WelcomeCard';

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

  const welcomeRef = useRef<HTMLElement>(null);

  const scrollToContent = () => {
    if (welcomeRef.current) {
      const offset = 120; // Adjust this value to control how much higher it scrolls
      const elementPosition = welcomeRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center">
      <LandingSection onScrollDown={scrollToContent} />

      {/* Welcome section with dark brown background */}
      <section ref={welcomeRef} className="w-full bg-[#3C2A21] py-10 md:py-10">
        <div className="mx-auto flex w-full max-w-7xl justify-center px-6 sm:px-8 md:px-4">
          {user && <WelcomeCard userName={user.name || 'User'} />}
          {!user && <WelcomeCard userName="Guest" />}
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl px-8 py-10 md:px-24">
        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
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
