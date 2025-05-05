'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LeaderboardCard({ imgUrl }: { imgUrl?: string }) {
  const router = useRouter();

  return (
    <div
      className="w-full max-w-md rounded-2xl px-8 py-6"
      style={{ backgroundColor: '#463226' }}
    >
      <h1 className="mb-4 text-center text-[28px] font-bold text-[#D8A730]">
        TREASURE HUNT
      </h1>

      {/* 2-Column Main Layout */}
      <div className="mb-4 flex gap-4">
        {/* Left: Avatar */}
        <div className="flex-shrink-0">
          <Image
            alt="Player"
            className="h-24 w-24 rounded-full object-cover"
            width={40}
            height={40}
            src={
              imgUrl ??
              'https://ohsobserver.com/wp-content/uploads/2022/12/Guest-user.png'
            }
          />
        </div>

        {/* Right: Stats and Actions */}
        <div className="flex w-1/2 flex-col justify-start text-[#D8A730]">
          <h2 className="text-l mb-1 font-garamond font-semibold">
            Firstname Stats:
          </h2>

          {/* 60 pts | Level 5 */}
          <div className="mb-2 flex justify-between font-garamond text-sm">
            <span>60 pts</span>
            <span>Level 5</span>
          </div>

          {/* My Ranking Button */}
          <Link href="/pages/leaderboard" />
          <button className="mb-1 w-fit rounded-full bg-[#6F4100] px-5 text-center text-[14px] font-semibold">
            MY RANKING
          </button>

          {/* maybe we could have a cute comment for each level to motivate user? 
          or just change the number based on data in database */}
          {/* Motivation Text */}
          <p className="font-garamond text-[12px]">
            Keep going, almost at level 6
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative mb-4 h-4 rounded-full bg-[#2c1e1a]">
        <div
          className="absolute left-0 top-0 h-4 rounded-full bg-[#D8A730]"
          style={{ width: '83%' }} // CHANGE THIS PROGRESS TO BEING A PERCENTAGE OF DATA IN DATABASE
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between gap-4">
        <Link href="/pages/camera">
          <button className="flex-1 rounded-full bg-[#2c1e1a] px-10 py-1 font-semibold text-[#D8A730]">
            CONTINUE
          </button>
        </Link>
        <Link href="/pages/camera">
          <button
            className="flex-1 rounded-full bg-[#2c1e1a] px-10 py-1 font-semibold text-[#D8A730]"
            onClick={() => router.push('/pages/camera')}
          >
            START
          </button>
        </Link>
      </div>
    </div>
  );
}
