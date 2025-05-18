'use client';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getTokens } from '@/lib/authStorage'; // Import your auth utility to check for tokens
import { getUserDetails } from '@/app/actions/user/user'; // Import user details fetching function
import Link from 'next/link';
import { getLeaderboard } from '@/app/actions/points/points';
import type { Leaderboard } from '@/app/actions/points/points.types';

export default function LeaderboardCard() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if the user is logged in
  const [user, setUser] = useState<any | null>(null); // Store user data here
  const [loading, setLoading] = useState(true); // Loading state for user details

  useEffect(() => {
    const checkAuth = async () => {
      // Check if the user has a valid access token
      const tokens = getTokens(); // Assume `getTokens()` checks for valid tokens in localStorage or cookies
      if (tokens && tokens.accessToken) {
        setIsLoggedIn(true); // If the token exists, the user is logged in

        // Fetch the user details
        try {
          const userData = await getUserDetails(tokens.accessToken);
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      } else {
        setIsLoggedIn(false); // Otherwise, the user is not logged in
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleStartClick = () => {
    if (!isLoggedIn) {
      // Show the toast if the user is not logged in
      toast.error('Please log in to access this feature!', {
        duration: 4000, // Duration of the toast in ms
        position: 'top-center', // Position of the toast
      });
      // Redirect to login if not logged in
      setTimeout(() => {
        router.push('/auth/login'); // Redirect to login page after the toast
      }, 4000);
    } else {
      // If logged in, proceed to the camera page or the desired page
      router.push('/pages/camera');
    }
  };

  const handleRankClick = () => {
    if (!isLoggedIn) {
      // Show the toast if the user is not logged in
      toast.error('Please log in to access this feature!', {
        duration: 4000, // Duration of the toast in ms
        position: 'top-center', // Position of the toast
      });
      // Redirect to login if not logged in
      setTimeout(() => {
        router.push('/auth/login'); // Redirect to login page after the toast
      }, 4000);
    } else {
      // If logged in, proceed to the camera page or the desired page
      router.push('/pages/leaderboard');
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Optionally show a loading state while fetching user data
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
            src={
              user?.avatar ??
              'https://ohsobserver.com/wp-content/uploads/2022/12/Guest-user.png'
            }
            width={96}
          />
        </div>

        {/* Stats */}
        <div className="mt-2 flex w-1/2 flex-col justify-start text-[#D8A730]">
          <h2 className="text-l mb-1 font-garamond font-semibold">
            {user?.username ?? 'Guest'} Stats: {/* Display the username */}
          </h2>

          {/* Points and Level (can be replaced with actual user data) */}
          <div className="mb-2 flex justify-between font-garamond text-sm">
            <span>{user?.points ?? 0} pts</span>{' '}
            {/* Display the user's points */}
            <span>Question 5</span>{' '}
            {/* Placeholder for current question level */}
          </div>

          {/* My Ranking Button */}
          <div className="flex justify-center text-xl">
            <button
              className="w-fit rounded-full bg-[#6F4100] px-5 text-center text-[16px] font-semibold"
              onClick={handleRankClick}
            >
              MY RANKING
            </button>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      {/* <div className="relative mb-4 h-4 rounded-full bg-[#2c1e1a]">
        <div
          className="absolute left-0 top-0 h-4 rounded-full bg-[#D8A730]"
          style={{ width: '83%' }} // You can calculate this dynamically based on current question/total questions
        />
      </div> */}

      {/* Start button */}
      <div className="flex justify-center">
        <button
          className="rounded-full bg-[#231209] px-10 py-1 text-[24px] font-semibold text-[#D8A730]"
          onClick={handleStartClick} // Handle the button click with login check
        >
          START
        </button>
      </div>
    </div>
  );
}
