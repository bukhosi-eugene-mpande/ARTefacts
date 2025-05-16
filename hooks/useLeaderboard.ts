// src/hooks/useLeaderboard.ts
'use client';

import { useEffect, useState } from 'react';

import { Leaderboard } from '../app/actions/points/points.types';

import {
  connectWebSocket,
  sendMessage,
  addMessageListener,
  removeMessageListener,
} from '@/app/utils/websocketService';
import { decodeJWT } from '@/app/actions/utilities/utils';

const SOCKET_URL: string = process.env.NEXT_PUBLIC_SOCKET_URL!;

export function useLeaderboard(jwt?: string) {
  const [leaderboard, setLeaderboard] = useState<Leaderboard | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    connectWebSocket(SOCKET_URL);

    const handleMessage = (data: any) => {
      // Handle leaderboard fetch
      if (data?.action === 'getLeaderboardResponse') {
        setLeaderboard(data.payload);
        setIsLoading(false);
      }

      // Optionally handle confirmation or feedback from updateLeaderboard
      if (data?.message?.includes('updated for user')) {
        // Refetch leaderboard or update UI as needed
        console.log('Leaderboard updated:', data.message);
      }
    };

    addMessageListener(handleMessage);

    return () => {
      removeMessageListener(handleMessage);
    };
  }, []);

  // 👉 Fetch leaderboard (already implemented)
  const fetchLeaderboard = (
    type: 'daily' | 'weekly' | 'overall' = 'overall'
  ) => {
    setIsLoading(true);
    console.log('fetching leaderboard');
    const user_id = jwt ? decodeJWT(jwt).sub : undefined;

    sendMessage({
      action: 'getLeaderboard',
      ...(user_id && { user_id }),
      type, // e.g., 'daily,weekly'
    });
  };

  // ✅ New: Update leaderboard points
  const updateLeaderboard = ({
    user_id,
    points,
    type = 'overall',
  }: {
    user_id: string;
    points: number;
    type?: 'daily' | 'weekly' | 'overall';
  }) => {
    sendMessage({
      action: 'updateLeaderboard',
      user_id,
      points,
      type, // must be a string like "overall" or "daily"
    });
  };

  return {
    leaderboard,
    isLoading,
    fetchLeaderboard,
    updateLeaderboard, // 🔥 exposed for external use
  };
}
