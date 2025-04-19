"use client"
import React from 'react';

// import { ExpandableCard } from '@/components/artefactInfo/artefactInfo';
import Searchbar from '@/components/searchbar';
import Header from '@/components/header';
import ChallengeOfDay from '@/components/challengeofday';
import LeaderboardCard from '@/components/leaderboardCard';
import { ExpandableCard } from '@/components/artefactInfo/artefactInfo';

import Image from 'next/image';
import Player from '../../app/assets/img/player.svg';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center px-4 w-full h-full gap-4 md:py-10 mt-4">
      <Header />  
      {/* <Image src={Player} alt="Player" className="items-center w-16 h-16" /> */}

      {/* <Searchbar /> */}
      {/* <p className="text-[#D8A730] text-[36px] ">Hi, *user*</p> */}
      <h1 className="text-[#D8A730] text-[36px] text-center mt-[-20]">Welcome back, User</h1>
      <ChallengeOfDay />
      <LeaderboardCard />
      <div className="flex flex-col items-center w-full">
        <h1 className="text-3xl text-[#D8A730]">ARTEFACTS</h1>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((image, index) => (
            <ExpandableCard key={index} />
          ))}
        </div>
      </div>
    </div>

  );
}
