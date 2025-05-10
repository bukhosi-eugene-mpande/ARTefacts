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
      if (data?.action === 'getLeaderboardResponse') {
        setLeaderboard(data.payload);
        setIsLoading(false);
      }
    };

    addMessageListener(handleMessage);

    return () => {
      removeMessageListener(handleMessage);
    };
  }, []);

  const fetchLeaderboard = () => {
    setIsLoading(true);

    const user_id = jwt ? decodeJWT(jwt).sub : undefined;

    sendMessage({
      action: 'getLeaderboard',
      ...(user_id && { user_id }),
    });
  };

  return {
    leaderboard,
    isLoading,
    fetchLeaderboard,
  };
}
