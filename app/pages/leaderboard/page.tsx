'use client';

import type { Leaderboard, Player } from '@/app/actions/points/points.types';

import { useState, useEffect } from 'react';
import { FaCrown } from 'react-icons/fa';
import { Spinner } from '@heroui/react';
import Image from 'next/image';

import { getLeaderboard } from '@/app/actions/points/points';

export default function LeaderboardPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [leaderboard, setLeaderboard] = useState<Leaderboard>();
  const [topThree, setTopThree] = useState<Player[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cachedLeaderboard = sessionStorage.getItem('leaderboard');

    if (cachedLeaderboard) {
      const parsed = JSON.parse(cachedLeaderboard);

      setLeaderboard(JSON.parse(cachedLeaderboard));
      setTopThree(parsed.top_users.slice(0, 3));
      setLoading(false);

      return;
    }
    console.log('Top three:', topThree);
    const fetchLeaderboard = async () => {
      try {
        const accessToken =
          typeof window !== 'undefined'
            ? (localStorage.getItem('accessToken') as string)
            : null;

        const data = await getLeaderboard(accessToken ?? undefined);

        sessionStorage.setItem('leaderboard', JSON.stringify(data));
        setLeaderboard(data);
        setTopThree(data.top_users.slice(0, 3));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const bg = isDarkMode ? 'bg-[#271F17] text-white' : 'bg-white text-black';
  const cardBg = isDarkMode ? 'bg-[#5D4C3D]' : 'bg-[#F5EEDC]';
  const rowBg = (isYou: boolean) =>
    isYou
      ? isDarkMode
        ? 'bg-yellow-400 text-black font-semibold '
        : 'bg-[#D9A73E] text-white font-semibold'
      : isDarkMode
        ? 'bg-[#433329]'
        : 'bg-white text-black';
  const pointsColor = isDarkMode ? 'text-yellow-300' : 'text-yellow-500';

  if (loading) {
    return (
      <Spinner className="flex h-screen items-center justify-center">
        Loading...
      </Spinner>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-600">
        Error loading leaderboard: {error}
      </div>
    );
  }

  return (
    <section>
      <div
        className={`font-bebas flex min-h-screen w-screen flex-col justify-between overflow-y-hidden bg-[#231209] p-16 dark:bg-[#271F17]`}
      >
        <div className="p-4">
          <div className="relative mb-8 flex items-center justify-end px-2">
            <h2 className="absolute left-1/2 -translate-x-1/2 transform text-center text-2xl font-semibold text-[#d8a730]">
              Leaderboard
            </h2>
          </div>

          <div className="relative mb-5 flex items-center justify-center gap-6">
            {topThree?.map((user, index) => {
              const isFirstPlace = index === 0;

              return (
                <div
                  key={user.username}
                  className={`flex flex-col items-center ${
                    isFirstPlace
                      ? 'z-10 order-2'
                      : index === 1
                        ? 'order-1'
                        : 'order-3'
                  }`}
                >
                  <div className="relative flex flex-col items-center">
                    <Image
                      alt={user.username}
                      className={`rounded-full border-4 ${
                        isFirstPlace
                          ? 'scale-110 border-yellow-400'
                          : 'border-gray-300'
                      }`}
                      height={isFirstPlace ? 80 : 64}
                      src={user.avatar}
                      width={isFirstPlace ? 80 : 64}
                    />
                    {isFirstPlace && (
                      <FaCrown className="absolute -top-6 left-1/2 -translate-x-1/2 text-2xl text-yellow-500" />
                    )}
                    <div className="font-bebas absolute -bottom-3 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-black">
                      {index + 1}
                    </div>
                  </div>
                  <span className="mt-4 text-center text-xs font-semibold">
                    {user.username === leaderboard?.user_stats?.username
                      ? 'You'
                      : user.username}
                  </span>
                  <span className={`text-xs ${pointsColor}`}>
                    {user.points} pts
                  </span>
                </div>
              );
            })}
          </div>

          <div className="relative flex flex-col items-center">
            <div
              className={`w-full max-w-4xl space-y-2 rounded-2xl bg-[#e5c8a4] p-4 md:w-[45%]`}
            >
              {leaderboard?.top_users?.slice(3).map((user) => (
                <div
                  key={user.username}
                  className={`flex items-center gap-3 rounded-xl px-4 py-2 ${rowBg(
                    user.username === leaderboard?.user_stats?.username
                  )}`}
                >
                  <span className="w-6 text-center">#{user.position}</span>
                  <Image
                    alt={user.username}
                    className="rounded-full border border-gray-300 object-cover"
                    height={32}
                    src={user.avatar}
                    width={32}
                  />
                  <span className="flex-1 truncate">
                    {user.username === leaderboard?.user_stats?.username
                      ? 'You'
                      : user.username}
                  </span>
                  <span>{user.points} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
