'use client';
import { useState } from 'react';
import { FaCrown } from 'react-icons/fa';

import BottomNav from '@/components/bottomnav';

const dummyLeaderboardRaw = [
  { id: 1, name: 'Bryan Wolf', points: 43, image: '/apple.png' },
  {
    id: 2,
    name: 'Meghan Jess',
    points: 40,
    isYou: true,
    image: '/android.png',
  },
  { id: 3, name: 'Alex Turner', points: 38, image: '/android.png' },
  { id: 4, name: 'Marsha Fisher', points: 36, image: '/android.png' },
  { id: 5, name: 'Juanita Cormier', points: 35, image: '/android.png' },
  {
    id: 6,
    name: 'Nicole Chares',
    points: 3,
    isYou: true,
    image: '/android.png',
  },
  { id: 7, name: 'Tamara Schmidt', points: 33, image: '/apple.png' },
  { id: 8, name: 'Ricardo Veum', points: 32, image: '/android.png' },
  { id: 9, name: 'Gary Sanford', points: 31, image: '/apple.png' },
  { id: 10, name: 'Becky Bartell', points: 30, image: '/android.png' },
  { id: 11, name: 'Becky Bartell', points: 30, image: '/android.png' },
];

const sortedLeaderboard = [...dummyLeaderboardRaw].sort(
  (a, b) => b.points - a.points
);

const dummyTopThree = sortedLeaderboard.slice(0, 3);

const restOfLeaderboard = sortedLeaderboard.slice(3);

export default function LeaderboardLayout() {
  const [isDarkMode, setIsDarkMode] = useState(false);
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

  return (
    <section>
      <div
        className={`${bg} font-bebas flex min-h-screen flex-col justify-between overflow-auto`}
      >
        <div className="p-4">
          <div className="relative mb-4 flex items-center justify-between px-2">
            <button
              className="rounded border px-2 py-1 text-sm"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <h2 className="absolute left-1/2 -translate-x-1/2 transform text-center text-lg font-semibold">
              Leaderboard
            </h2>
            <img alt="Logo" className="h-10 w-10" src="/Logo-489.png" />
          </div>

          <div className="relative mb-5 flex items-end justify-center gap-6">
            {dummyTopThree.map((user, index) => {
              const isFirstPlace = index === 0;

              return (
                <div
                  key={user.id}
                  className={`flex flex-col items-center ${
                    isFirstPlace
                      ? 'z-10 order-2'
                      : index === 1
                        ? 'order-1'
                        : 'order-3'
                  }`}
                >
                  <div className="relative flex flex-col items-center">
                    <img
                      alt={user.name}
                      className={`rounded-full border-4 ${
                        isFirstPlace
                          ? 'h-20 w-20 scale-110 border-yellow-400'
                          : 'h-16 w-16 border-gray-300'
                      }`}
                      src={user.image}
                    />
                    {isFirstPlace && (
                      <FaCrown className="absolute -top-6 left-1/2 -translate-x-1/2 text-2xl text-yellow-500" />
                    )}
                    <div className="font-bebas absolute -bottom-3 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-black">
                      {index + 1}
                    </div>
                  </div>
                  <span className="mt-4 text-center text-xs font-semibold">
                    {user.isYou ? 'You' : user.name}
                  </span>
                  <span className={`text-xs ${pointsColor}`}>
                    {user.points} pts
                  </span>
                </div>
              );
            })}
          </div>

          <div className={`${cardBg} space-y-2 rounded-2xl p-4`}>
            {restOfLeaderboard.map((user, i) => (
              <div
                key={user.id}
                className={`flex items-center gap-3 rounded-xl px-4 py-2 ${rowBg(user.isYou ?? false)}`}
              >
                <span className="w-6 text-center">#{i + 4}</span>
                <img
                  alt={user.name}
                  className="h-8 w-8 rounded-full border border-gray-300 object-cover"
                  src={user.image}
                />
                <span className="flex-1 truncate">
                  {user.isYou ? 'You' : user.name}
                </span>
                <span>{user.points} pts</span>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h2 className="font-bebas mb-2 flex justify-center font-semibold">
              Badges
            </h2>
            <div className="grid grid-cols-3 gap-1">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="mb-2 flex items-center justify-center">
                  <img
                    alt={`Badge ${n}`}
                    className="h-20 w-20"
                    src={`/badges/badge${n}.png`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </section>
  );
}
