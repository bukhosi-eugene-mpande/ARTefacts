// components/LandingSection.tsx

'use client';

import React from 'react';
import ScrollDownIcon from '../ScrollDownIcon/ScrollDownIcon';
import Landing from '../../public/assets/landing.jpg'; // Adjust the path as necessary
import Image from 'next/image';

interface LandingSectionProps {
  onScrollDown: () => void;
}

export default function LandingSection({ onScrollDown }: LandingSectionProps) {
  return (
    <div className="relative h-screen w-full overflow-x-hidden">
      <Image
        src={Landing}
        alt="Landing Background"
        fill
        className="object-cover opacity-[0.6] blur-[2px]"
        priority
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">

        <h1 className="text-4xl lg:text-5xl font-extrabold  text-white text-center drop-shadow-lg tracking-wide">
          BEGIN YOUR DISCOVERY!
        </h1>
        <button onClick={onScrollDown} className="mt-4 tracking-wide rounded-full bg-yellow-500 px-[50px] lg:px-[100px] py-3 text-xl text-black font-bold shadow-yellow-500 shadow-sm transition duration-300 ease-in-out hover:bg-yellow-600 hover:shadow-lg hover:scale-105">
          BEGIN EXPLORING
        </button>

        <p className="mt-4 font-arial font-medium text-white lg:text-xl">
          Uncover the stories behind every sculpture.
        </p>


        {/* Scroll Icon */}
        <ScrollDownIcon onClick={onScrollDown} />
      </div>
    </div>
  );
}
