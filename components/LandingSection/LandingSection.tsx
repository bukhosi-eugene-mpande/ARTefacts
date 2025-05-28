// components/LandingSection.tsx

'use client';

import React from 'react';
import Image from 'next/image';

import ScrollDownIcon from '../ScrollDownIcon/ScrollDownIcon';
import Landing from '../../public/assets/landing.jpg'; // Adjust the path as necessary

interface LandingSectionProps {
  onScrollDown: () => void;
}

export default function LandingSection({ onScrollDown }: LandingSectionProps) {
  return (
    <div className="relative h-[85vh] w-full overflow-x-hidden">
      <Image
        fill
        priority
        alt="Landing Background"
        className="object-cover opacity-[0.6] blur-[2px]"
        src={Landing}
      />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-white">
        <h1 className="text-center text-4xl font-extrabold tracking-wide text-white drop-shadow-lg lg:text-5xl">
          BEGIN YOUR DISCOVERY!
        </h1>
        <button
          className="mt-4 rounded-full bg-yellow-500 px-[50px] py-3 text-xl font-bold tracking-wide text-black shadow-sm shadow-yellow-500 transition duration-300 ease-in-out hover:scale-105 hover:bg-yellow-600 hover:shadow-lg lg:px-[100px]"
          onClick={onScrollDown}
        >
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
