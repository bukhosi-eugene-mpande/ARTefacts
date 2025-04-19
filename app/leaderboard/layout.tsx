'use client';
import { ReactNode, useState } from 'react';
import { FaCrown } from "react-icons/fa";


const dummyLeaderboardRaw = [
  { id: 1, name: "Bryan Wolf", points: 43, image: "/apple.png" },
  { id: 2, name: "Meghan Jess", points: 40, isYou: true, image: "/android.png" },
  { id: 3, name: "Alex Turner", points: 38, image: "/android.png" },
  { id: 4, name: "Marsha Fisher", points: 36, image: "/android.png" },
  { id: 5, name: "Juanita Cormier", points: 35, image: "/android.png" },
  { id: 6, name: "Nicole Chares", points: 3, isYou: true, image: "/android.png" },
  { id: 7, name: "Tamara Schmidt", points: 33, image: "/apple.png" },
  { id: 8, name: "Ricardo Veum", points: 32, image: "/android.png" },
  { id: 9, name: "Gary Sanford", points: 31, image: "/apple.png" },
  { id: 10, name: "Becky Bartell", points: 30, image: "/android.png" },
  { id: 11, name: "Becky Bartell", points: 30, image: "/android.png" },
];

const sortedLeaderboard = [...dummyLeaderboardRaw].sort((a, b) => b.points - a.points);

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
      <div className={`${bg} min-h-screen font-bebas flex flex-col justify-between`}>
        <div className="p-4">
       
          <div className="relative flex items-center justify-between mb-4 px-2">
            <button className="text-sm px-2 py-1 border rounded" onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <h2 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold text-center">
              Leaderboard
            </h2>
            <img src="/Logo-489.png" alt="Logo" className="w-10 h-10" />
          </div>


          <div className="flex justify-center items-end gap-6 mb-5 relative">
              {dummyTopThree.map((user, index) => {
                const isFirstPlace = index === 0;
                return (
                  <div
                    key={user.id}
                    className={`flex flex-col items-center ${
                      isFirstPlace ? 'order-2 z-10' : index === 1 ? 'order-1' : 'order-3'
                    }`}
                  >
                    <div className="relative flex flex-col items-center">
                      <img src={user.image} alt={user.name} className={`rounded-full border-4 ${ isFirstPlace
                            ? 'w-20 h-20 border-yellow-400 scale-110'
                            : 'w-16 h-16 border-gray-300'
                        }`}
                      />
                      {isFirstPlace && (
                        <FaCrown className="absolute -top-6 left-1/2 -translate-x-1/2 text-yellow-500 text-2xl" />
                      )}
                      <div className="absolute -bottom-3 bg-yellow-400 text-black text-xs font-bebas font-bold w-5 h-5 flex items-center justify-center rounded-full">
                        {index + 1}
                      </div>
                    </div>
                    <span className="text-xs mt-4 text-center font-semibold">
                      {user.isYou ? 'You' : user.name}
                    </span>
                    <span className={`text-xs ${pointsColor}`}>{user.points} pts</span>
                  </div>
                );
              })}
            </div>

       
          <div className={`${cardBg} rounded-2xl p-4 space-y-2`}>
            {restOfLeaderboard.map((user, i) => (
              <div key={user.id}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl ${rowBg(user.isYou ?? false)}`}
              >
                <span className="w-6 text-center">#{i + 4}</span>
                <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-gray-300"
                />
                <span className="flex-1 truncate">{user.isYou ? 'You' : user.name}</span>
                <span>{user.points} pts</span>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h2 className="flex justify-center mb-2 font-semibold font-bebas">Badges</h2>
            <div className="grid grid-cols-3 gap-1">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="flex justify-center mb-2 items-center">
                  <img
                    src={`/badges/badge${n}.png`}
                    alt={`Badge ${n}`}
                    className="w-20 h-20"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}