'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getLeaderboard } from '@/app/actions/points/points';
import type { Leaderboard } from '@/app/actions/points/points.types';

export default function LeaderboardCard() {
  const router = useRouter();
  const [leaderboard, setLeaderboard] = useState<Leaderboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const accessToken =
          typeof window !== 'undefined'
            ? (localStorage.getItem('accessToken') ?? undefined)
            : undefined;

        const data = await getLeaderboard(accessToken);
        setLeaderboard(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const user = leaderboard?.user_stats;
  const totalQuestions = 1;
  const currentQuestion = 0;
  const progressPercent = Math.round((currentQuestion / totalQuestions) * 100);

  if (loading) {
    return <p className="text-center text-[#D8A730]">Loading...</p>;
  }

  if (error || !user) {
    return (
      <p className="text-center text-red-500">
        Failed to load leaderboard data.
      </p>
    );
  }

  return (
    <div
      className="w-full max-w-md rounded-2xl px-8 py-6"
      style={{ backgroundColor: '#463226' }}
    >
      <h1 className="mb-4 text-center text-[28px] font-bold text-[#D8A730]">
        TREASURE HUNT
      </h1>

      <div className="mb-4 flex gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <Image
            alt={user.username}
            className="h-24 w-24 rounded-full object-cover"
            height={96}
            width={96}
            src={
              user.avatar ||
              'https://ohsobserver.com/wp-content/uploads/2022/12/Guest-user.png'
            }
          />
        </div>

        {/* Stats */}
        <div className="mt-2 flex w-1/2 flex-col justify-start text-[#D8A730]">
          <h2 className="text-l mb-1 whitespace-pre-line font-garamond font-semibold">
            {user.username}
            {'\n'}
            <span>{user.points} pts</span>
          </h2>

          {/* <div className="mb-2 flex justify-between font-garamond text-sm">
            <span>{user.points} pts</span>
            <span>Question {currentQuestion}</span>
          </div> */}

          <div className="flex justify-center text-xl">
            <Link href="/pages/leaderboard">
              <button className="w-fit rounded-full bg-[#6F4100] px-5 text-[16px] font-semibold">
                MY RANKING
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      {/* <div className="relative mb-4 h-4 rounded-full bg-[#2c1e1a]">
        <div
          className="absolute left-0 top-0 h-4 rounded-full bg-[#D8A730]"
          style={{ width: `${progressPercent}%` }}
        />
      </div> */}

      {/* Start button */}
      <div className="flex justify-center">
        <button
          className="rounded-full bg-[#231209] px-10 py-1 text-[24px] font-semibold text-[#D8A730]"
          onClick={() => router.push('/pages/camera')}
        >
          START
        </button>
      </div>
    </div>
  );
}
