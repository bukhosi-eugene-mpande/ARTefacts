'use client';

import React, { useState, useEffect } from 'react';

// import { ExpandableCard } from '@/components/artefactInfo/artefactInfo';
import Header from '@/components/header';
import ChallengeOfDay from '@/components/challengeofday';
import LeaderboardCard from '@/components/leaderboardCard';
import Artefactcard from '@/components/artefactcard/artefactcard';
import {
  Artefact,
  ArtefactsData,
} from '@/app/actions/artefacts/artefacts.types';
import { getAllArtefacts } from '@/app/actions/artefacts/artefacts';

export default function HomePage() {
  const [artefacts, setArtefacts] = useState<Artefact[]>([]);
  const [artefactsData, setArtefactsData] = useState<ArtefactsData | null>(
    null
  );
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchArtefacts = async () => {
      setLoading(true);
      try {
        const data = await getAllArtefacts(page, ITEMS_PER_PAGE);
        console.log(data);

        setArtefactsData(data);
        setArtefacts(data.artefacts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchArtefacts();
  }, [page]);

  return (
    <div className="mt-4 flex h-full w-full flex-col items-center gap-4 px-4 md:py-10">
      <Header />
      {/* <Image src={Player} alt="Player" className="items-center w-16 h-16" /> */}

      {/* <Searchbar /> */}
      {/* <p className="text-[#D8A730] text-[36px] ">Hi, *user*</p> */}
      <h1 className="mt-[-20] text-center text-[36px] text-[#D8A730]">
        Welcome back, User
      </h1>
      <ChallengeOfDay />
      <LeaderboardCard />
      <div className="flex w-full flex-col items-center">
        <h1 className="text-3xl text-[#D8A730]">ARTEFACTS</h1>
        {loading && (
          <div>loading...</div>
        )}
        <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {artefacts.map((artefact, index) => (
            <div key={index}>
              <Artefactcard {...artefact} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
