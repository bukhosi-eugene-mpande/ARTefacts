'use client';
import type { Leaderboard } from '@/app/actions/points/points.types';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { getLeaderboard, updatePoints } from '@/app/actions/points/points';
import { Input } from '@/components/ui/input';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<Leaderboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pointsToAdd, setPointsToAdd] = useState<string>('10');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const accessToken =
          typeof window !== 'undefined'
            ? (localStorage.getItem('accessToken') as string)
            : null;

        if (!accessToken) {
          const data = await getLeaderboard();

          setLeaderboard(data);
        } else {
          const data = await getLeaderboard(accessToken);

          setLeaderboard(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const handleUpdatePoints = async () => {
    const accessToken =
      typeof window !== 'undefined'
        ? (localStorage.getItem('accessToken') as string)
        : null;

    if (!accessToken) {
      throw new Error('No access token found in localStorage');
    }

    try {
      setIsUpdating(true);
      setUpdateMessage(null);
      const points = parseInt(pointsToAdd);

      if (isNaN(points)) {
        throw new Error('Please enter a valid number');
      }

      const response = await updatePoints(accessToken, points);

      setUpdateMessage(
        `Successfully ${response.action} points! New total: ${response.points}`
      );

      // Refresh leaderboard
      const updatedData = await getLeaderboard();

      setLeaderboard(updatedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update points');
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex h-screen items-center justify-center">
        Error: {error}
      </div>
    );

  return (
    <section className="relative py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-center text-3xl font-bold">Leaderboard</h1>

        {leaderboard?.user_stats && (
          <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Your Stats</h2>
            <div className="flex items-center space-x-4">
              <Image
                alt={leaderboard.user_stats.username}
                className="rounded-full"
                height={64}
                src={leaderboard.user_stats.avatar}
                width={64}
              />
              <div>
                <p className="font-medium">{leaderboard.user_stats.username}</p>
                <p>Position: #{leaderboard.user_stats.position}</p>
                <p>Points: {leaderboard.user_stats.points}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="mb-2 text-lg font-medium">Add Points</h3>
              <div className="flex gap-2">
                <Input
                  className="max-w-[200px]"
                  min="1"
                  type="number"
                  value={pointsToAdd}
                  onChange={(e) => setPointsToAdd(e.target.value)}
                />
                <button disabled={isUpdating} onClick={handleUpdatePoints}>
                  {isUpdating ? 'Updating...' : 'Add Points'}
                </button>
              </div>
              {updateMessage && (
                <p className="mt-2 text-green-600">{updateMessage}</p>
              )}
            </div>
          </div>
        )}

        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          <h2 className="border-b p-6 text-xl font-semibold">Top Players</h2>
          <div className="divide-y">
            {leaderboard?.top_users.map((player, index) => (
              <div
                key={index}
                className="flex items-center p-4 hover:bg-gray-50"
              >
                <span className="w-8 font-bold">#{player.position}</span>
                <Image
                  alt={player.username}
                  className="mx-4 rounded-full"
                  height={48}
                  src={player.avatar}
                  width={48}
                />
                <div className="flex-1">
                  <p className="font-medium">{player.username}</p>
                </div>
                <div className="font-bold">{player.points} pts</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
