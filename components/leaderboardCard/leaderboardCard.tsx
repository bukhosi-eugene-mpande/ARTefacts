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
            height={40}
            src={
              imgUrl ??
              'https://ohsobserver.com/wp-content/uploads/2022/12/Guest-user.png'
            }
            width={40}
          />
        </div>

        {/* Right: Stats and Actions */}
        <div className="mt-2 flex w-1/2 flex-col justify-start text-[#D8A730]">
          <h2 className="text-l mb-1 font-garamond font-semibold">
            *Insert Username* Stats: {/* integrate user */}
          </h2>

          {/* 60 pts | Level 5 */}
          <div className="mb-2 flex justify-between font-garamond text-sm">
            <span>60 pts</span> {/* integrate user's points if there */}
            <span>Question 5</span> {/* integrate user's current level */}
          </div>

          {/* My Ranking Button */}
          <div className="flex justify-center text-xl">
            <Link href="/pages/leaderboard" />
            <button className="w-fit rounded-full bg-[#6F4100] px-5 text-center text-[16px] font-semibold">
              MY RANKING
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar for current question/total questions*/}
      <div className="relative mb-4 h-4 rounded-full bg-[#2c1e1a]">
        <div
          className="absolute left-0 top-0 h-4 rounded-full bg-[#D8A730]"
          style={{ width: '83%' }} // CHANGE THIS PROGRESS TO BEING A PERCENTAGE OF TOTAL QUESTIONS IN DATABASE (current question/total questions)
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-center">
        <Link href="/pages/camera">
          <button
            className="rounded-full bg-[#231209] px-10 py-1 text-[24px] font-semibold text-[#D8A730]"
            onClick={() => {
              router.push('/pages/camera');
              localStorage.setItem('gameMode', 'true');
            }}
          >
            START
          </button>
        </Link>
      </div>
    </div>
  );
}
